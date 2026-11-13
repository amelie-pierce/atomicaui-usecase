// modules/design/atomic-aui/src/lib/datepicker/datepicker.tsx
//
// The compound Datepicker — a single-date value picker built on Base UI's **Popover** (the first
// Popover consumer in the lib: Base UI ships NO calendar/date primitive, and Popover carries the
// identical overlay machinery our Select/Dropdown wrap). Base UI owns open/close + floating
// placement + focus return; AtomicAUI owns the value model (Datepicker.Root, via DatepickerContext),
// the localized month grid (the zero-dep `date-grid` Intl engine), and all appearance (per-part
// recipes). The Trigger/Popup mirror Select's tier-3 frames; the Calendar/Grid/Day are hand-owned
// (a WAI-ARIA roving grid) because no headless calendar exists to wrap.
//
// Part map (Object.assign dot-namespace, the Select precedent):
//   Datepicker (Root) · .Trigger · .Value · .Icon · .Portal · .Backdrop · .Positioner · .Popup ·
//   .Calendar · .Header · .Grid · .Week · .Day
import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { hasPartChild } from '../../core/factory/create-atomic-part';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { ContainedIcon, type ContainedIconAui, type IconFamily, type IconLayer, type IconWeight } from '../icon';
import { IconButton, type IconButtonAui } from '../icon-button';
import { Input } from '../input';
import type { InputAui } from '../input/use-recipe';
import { useFieldFocusOrigin } from '../field/use-focus-origin';
import { useFieldAui, type FieldResolvedAui } from '../field/field-context';
import type { PropHook } from '../../core/types';
import { useAuiIdentity, identityToDataAttrs } from '../identity';
import {
  AuiScaleProvider,
  useAuiScale,
  useScaleCascade,
  resolveAuiScale,
} from '../scale-cascade/use-aui-scale';
import {
  DatepickerProvider,
  useDatepickerContext,
  useDatepickerContextOptional,
  useControllableState,
  type DatepickerContextValue,
} from './datepicker-context';
import {
  useDatepickerTriggerRecipe,
  useDatepickerPopupRecipe,
  useDatepickerDayRecipe,
  useDatepickerInputRecipe,
  DATEPICKER_TRIGGER_VOCAB,
  type DatepickerTriggerAui,
  type DatepickerPopupAui,
  type DatepickerDayAui,
  type DatepickerInputAui,
  type DatepickerScale,
} from './use-recipe';
import {
  addDays,
  addMonths,
  addYears,
  buildMonthGrid,
  clampDate,
  formatDate,
  formatDateInput,
  getDateInputPattern,
  getLocaleFirstDayOfWeek,
  getMonthCaption,
  getWeekdayNames,
  isDayDisabled,
  isSameDay,
  isSameMonth,
  parseDateInput,
  startOfDay,
  startOfMonth,
  today as todayDate,
  type Weekday,
} from './date-grid';

export type {
  DatepickerColor,
  DatepickerPaint,
  DatepickerScale,
  DatepickerShape,
  DatepickerTriggerAui,
  DatepickerPopupAui,
  DatepickerDayAui,
  DatepickerInputAui,
} from './use-recipe';

// ─── Field-axis forwarding (2026-07-11 USER DECISION — fleet-wide, PINNED, scope widened to
// EVERY Field control family) ──────────────────────────────────────────────────────────────────
// Mirrors Select/Dropdown/Combobox: the axis-bearing parts (Trigger/InputButton/Input/Popup/Day)
// read the ambient `FieldAuiContext` directly and merge color/shape/elevation/sx UNDER their own
// `aui` (own axis always wins), mirroring `useMergedAutocompletePartAui` (autocomplete.tsx:84-105).
// `Field.Datepicker` (field.tsx) already re-provides the merged `FieldAuiContext` around
// `Datepicker.Root`, and `Field.Root` provides it to ALL children regardless — outside any `<Field>`
// `useFieldAui()` resolves to the empty default, so this is a no-op for standalone Datepicker usage.
// `Datepicker.Icon` stays scale-only — it does NOT merge Field color/shape/elevation, matching
// `Autocomplete.Icon`'s identical exclusion (a glyph inherits the composing box's content color).
type FieldMergeableAui = {
  color?: unknown;
  shape?: unknown;
  elevation?: unknown;
  sx?: unknown;
};

function mergeDatepickerFieldAxes<A extends FieldMergeableAui>(
  inherited: FieldResolvedAui,
  own: A | undefined,
): A {
  const out: Record<string, unknown> = { ...(own ?? {}) };
  if (own?.color === undefined && inherited.color !== undefined) out.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) out.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) out.elevation = inherited.elevation;
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx };
  }
  return out as A;
}

function useDatepickerFieldMergedAui<A extends FieldMergeableAui>(aui: A | undefined): A {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeDatepickerFieldAxes(inherited, aui), [inherited, aui]);
}

// ─── Stateful Field-axis forwarding — Datepicker.Day ONLY (2026-07-11 USER DECISION, widened) ─────
// DATEPICKER_DAY_VOCAB has THREE states (`unselected`/`selected`/`today`) — `selected` pins a
// DELIBERATE fixed look (`primary`/`solid`, the chosen-day affordance, matching Select/Combobox/
// Dropdown's own selected-state pin this same session). `today` DEFAULTS to the SAME flat look as
// `unselected` (`surface`/`text` — its own vocab comment: "today = flat like unselected … a
// consumer can override via aui.states.today to tint it") — it is NOT a distinct fixed affordance,
// so it follows ambient exactly like `unselected`. The naive top-level merge above
// (`mergeDatepickerFieldAxes`) lands ABOVE `vocab.states` in `buildLeafClasses`' layering, so
// applying it directly to `Datepicker.Day` would silently override the PINNED selected fill.
// Mirrors `select.tsx`'s `mergeSelectItemFieldAui`: ambient color/shape/elevation reach ONLY
// `unselected` + `today`, synthesized as `aui.states.<state>` merged UNDER the consumer's own
// `states.<state>`; `selected` is untouched by ambient (a consumer's own top-level or
// `aui.states.selected` override still reaches it, unaffected). `sx` still merges at the top level.
// GATING (own-axis-wins, not just own-state-wins): an ambient axis is injected into
// `states.unselected`/`states.today` ONLY when the consumer's OWN TOP-LEVEL `aui` does NOT already
// set that axis — `states[active]` is the HIGHEST layer, so an ungated injection would beat even a
// consumer's own top-level `aui.color`, which must never lose to ambient.
function mergeDatepickerDayFieldAui(
  inherited: FieldResolvedAui,
  own: DatepickerDayAui | undefined,
): DatepickerDayAui {
  const ambient: Record<string, unknown> = {};
  if (own?.color === undefined && inherited.color !== undefined) ambient.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) ambient.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) ambient.elevation = inherited.elevation;
  const ownStates = own?.states as { unselected?: object; today?: object } | undefined;
  const out: DatepickerDayAui = { ...own };
  if (Object.keys(ambient).length > 0 || ownStates?.unselected || ownStates?.today) {
    out.states = {
      ...own?.states,
      unselected: { ...ambient, ...ownStates?.unselected },
      today: { ...ambient, ...ownStates?.today },
    } as DatepickerDayAui['states'];
  }
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx } as DatepickerDayAui['sx'];
  }
  return out;
}

function useDatepickerDayFieldMergedAui(aui: DatepickerDayAui | undefined): DatepickerDayAui {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeDatepickerDayFieldAui(inherited, aui), [inherited, aui]);
}

// A stable ISO-ish key for a day (local, day-granular) — used to register/focus roving day nodes.
function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ─── Datepicker.Root — owns the value model + seeds the scale cascade ─────────────────────────────
// Wraps `Popover.Root` (open/close) and layers the DATE value on top (Popover has none). Value +
// open are each controlled-or-uncontrolled. Selecting a day sets the value AND closes the popover.
// Renders no box itself (like Select.Root); seeds the scale-only cascade via `AuiScaleProvider` so
// every part (Trigger/Popup/Day) sizes at one tier. Only `scale` cascades (color/shape are per-part).
export interface DatepickerRootProps {
  /** The selected date (controlled). Use with `onValueChange`. `null` = nothing selected. */
  value?: Date | null;
  /** The initial selected date (uncontrolled). */
  defaultValue?: Date | null;
  /** Called when the value changes — with the newly-selected date, or `null` when the value is
   *  CLEARED (the input mode's empty-blur clears it, MUI-style `onChange(null)`). */
  onValueChange?: (value: Date | null) => void;
  /** Inclusive lower bound — earlier days are disabled. */
  minDate?: Date | null;
  /** Inclusive upper bound — later days are disabled. */
  maxDate?: Date | null;
  /** Per-day disable predicate (subsumes disabled-lists). Runs in addition to min/max. */
  isDateDisabled?: (date: Date) => boolean;
  /** BCP-47 locale for month/weekday names + value formatting. Default: the runtime locale. */
  locale?: string;
  /** Override the locale's first day of week (0 = Sun … 6 = Sat). Default: `Intl.Locale` week-info. */
  firstDayOfWeek?: Weekday;
  /** Weekday-header width (`Intl` weekday). Default `'narrow'` ("M"). */
  weekdayFormat?: 'narrow' | 'short' | 'long';
  /** Trigger value `Intl.DateTimeFormat` dateStyle. Default `'medium'`. */
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  /** Escape hatch: fully custom formatting of the trigger's value text. */
  formatValue?: (date: Date, locale?: string) => string;
  /** Disable the whole control (trigger can't open). */
  disabled?: boolean;
  /** Popover open state (controlled). */
  open?: boolean;
  /** Initial popover open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the popover opens/closes. */
  onOpenChange?: (open: boolean) => void;
  /** Cascade-seed appearance — only `scale` cascades to the parts. */
  aui?: { scale?: DatepickerScale };
  children?: React.ReactNode;
}

function DatepickerRoot(props: DatepickerRootProps): React.JSX.Element {
  const {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    minDate,
    maxDate,
    isDateDisabled,
    locale,
    firstDayOfWeek,
    weekdayFormat = 'narrow',
    dateStyle = 'medium',
    formatValue,
    disabled,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    aui,
    children,
  } = props;

  const [value, setValue] = useControllableState<Date | null>({
    controlled: valueProp,
    default: defaultValue,
    // Notify on EVERY change, including a clear to `null` (the input mode's empty-blur). The old
    // `if (v)` guard swallowed the clear — MUI's onChange(null) precedent is now honored.
    onChange: (v) => onValueChange?.(v),
  });
  const [open, setOpen] = useControllableState<boolean>({
    controlled: openProp,
    default: defaultOpen,
    onChange: onOpenChange,
  });

  const captionId = React.useId();
  const resolvedFirstDay: Weekday = firstDayOfWeek ?? getLocaleFirstDayOfWeek(locale);

  // ── Input-mode wiring: the anchor (an <input> can't be a Popover.Trigger), the open-from-input
  //    grid-focus suppression, and the value setter that DOESN'T close (live typing). ──
  // The anchor is held in STATE (the element), not just a ref: Base UI's positioner re-resolves the
  // Floating UI reference on element-identity change, so a stable element beats the ref-only path
  // (which only re-reads on open and mis-anchored when the ref churned). A synced ref backs the
  // outside-press `contains()` check. `registerInputAnchor` is a STABLE useCallback([]) so the Input's
  // callback-ref + unmount cleanup don't churn (the un-anchored-popup root cause).
  const inputAnchorRef = React.useRef<Element | null>(null);
  const [inputAnchorEl, setInputAnchorEl] = React.useState<Element | null>(null);
  const [gridAutoFocus, setGridAutoFocus] = React.useState(true);

  const registerInputAnchor = React.useCallback((node: Element | null) => {
    inputAnchorRef.current = node;
    setInputAnchorEl(node);
  }, []);

  // When the popover CLOSES for ANY reason (day-pick, Escape, outside-press), Base UI returns focus to
  // the input frame — and the input's `onFocus` would REOPEN it, so the popup could never be closed while
  // the field stays focused (the "popup always showing / field can't unfocus" loop). This consume-once
  // guard suppresses exactly that one focus-return: it is ARMED on every real close and CONSUMED by the
  // very next input focus (the return). A genuine later focus finds it clear → opens. A safety timeout
  // clears a STRANDED arm (a close whose focus went elsewhere, e.g. outside-press) so a later focus still
  // opens; it is set longer than the popup EXIT motion (~120ms) so the return still consumes it. Only the
  // INPUT mode reads it; the Trigger mode is unaffected.
  const suppressReopenRef = React.useRef(false);
  const consumeSuppressReopen = React.useCallback(() => {
    const v = suppressReopenRef.current;
    suppressReopenRef.current = false;
    return v;
  }, []);
  const armSuppressReopen = React.useCallback(() => {
    suppressReopenRef.current = true;
    setTimeout(() => {
      suppressReopenRef.current = false;
    }, 250);
  }, []);
  const selectDate = React.useCallback(
    (date: Date) => {
      armSuppressReopen();
      setValue(startOfDay(date));
      setOpen(false);
    },
    [setValue, setOpen, armSuppressReopen],
  );

  // Set the value WITHOUT closing (live input typing / blur-clear). `null` clears it.
  const commitValue = React.useCallback(
    (date: Date | null) => setValue(date ? startOfDay(date) : null),
    [setValue],
  );

  // The Popover's OWN close path: when Base UI would close from an OUTSIDE-PRESS whose target is
  // inside the registered input frame (the anchor is outside the popup, so clicking/focusing the
  // input reads as an outside-press), CANCEL the close so the input stays interactive with the popup
  // open. Any real close resets `gridAutoFocus` so the next Trigger-mode open auto-focuses the grid.
  const handlePopoverOpenChange = React.useCallback(
    (next: boolean, details?: DatepickerPopoverChangeDetails) => {
      if (!next && details?.reason === 'outside-press') {
        // DOM-light tsconfig: type structurally by the one method we call (`contains`) — mirrors the
        // day-node `{ focus }` structural typing elsewhere in this file.
        const target = details.event?.target ?? null;
        const anchor = inputAnchorRef.current as unknown as { contains(node: unknown): boolean } | null;
        if (anchor && target && anchor.contains(target)) {
          details.cancel?.();
          return;
        }
      }
      // A real close (Escape / outside-press) — Base UI will return focus to the input frame next; ARM the
      // reopen guard so that focus-return does NOT reopen the popup (else Escape/outside can never close it
      // while the field stays focused). Consumed by the Input's next `onFocus`; see `armSuppressReopen`.
      if (!next) {
        armSuppressReopen();
        setGridAutoFocus(true);
      }
      setOpen(next);
    },
    [setOpen, armSuppressReopen],
  );

  const ctx = React.useMemo<DatepickerContextValue>(
    () => ({
      value,
      selectDate,
      consumeSuppressReopen,
      commitValue,
      open,
      setOpen,
      registerInputAnchor,
      inputAnchorEl,
      inputAnchorRef,
      gridAutoFocus,
      setGridAutoFocus,
      min: minDate,
      max: maxDate,
      isDateDisabled,
      locale,
      firstDayOfWeek: resolvedFirstDay,
      weekdayFormat,
      dateStyle,
      formatValue,
      disabled,
      captionId,
    }),
    [value, selectDate, consumeSuppressReopen, commitValue, open, setOpen, registerInputAnchor, inputAnchorEl, gridAutoFocus, minDate, maxDate, isDateDisabled, locale, resolvedFirstDay, weekdayFormat, dateStyle, formatValue, disabled, captionId],
  );

  return React.createElement(
    PopoverPrimitive.Root,
    { open, onOpenChange: handlePopoverOpenChange as (open: boolean, details: unknown) => void },
    React.createElement(
      DatepickerProvider,
      { value: ctx },
      React.createElement(AuiScaleProvider, { value: aui?.scale }, children),
    ),
  );
}

/** The subset of Base UI's Popover `onOpenChange` details we read (structural — the DOM-light lib
 *  config doesn't re-export Base UI's `PopoverRoot.ChangeEventDetails`). `reason` is the change cause
 *  (`'outside-press'` etc.), `event` the native event, `cancel()` vetoes Base UI's handling. */
interface DatepickerPopoverChangeDetails {
  reason?: string;
  event?: { target?: unknown } | null;
  cancel?: () => void;
}
DatepickerRoot.displayName = 'Datepicker';

// ─── Datepicker.Value — marker span showing the formatted date / placeholder ──────────────────────
export interface DatepickerValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text shown before a date is selected. */
  placeholder?: React.ReactNode;
}
const DatepickerValue = React.forwardRef<HTMLSpanElement, DatepickerValueProps>(function DatepickerValue(
  { placeholder, className, ...rest },
  ref,
) {
  const ctx = useDatepickerContext();
  const text =
    ctx.value != null
      ? ctx.formatValue?.(ctx.value, ctx.locale) ?? formatDate(ctx.value, ctx.locale, ctx.dateStyle)
      : placeholder;
  return React.createElement(
    'span',
    {
      ref,
      ...rest,
      className: prependMarkerClassName('aui-datepicker-value', className),
      // Mirrors Base UI Select.Value's `data-placeholder` so the muted-placeholder CSS keys on it.
      ...(ctx.value == null ? { 'data-placeholder': '' } : {}),
    },
    text,
  );
});
DatepickerValue.displayName = 'Datepicker.Value';

// ─── Datepicker.Icon — placeable calendar glyph (a ContainedIcon, contained profile) ──────────────
// Mirrors Select.Icon: a thin ContainedIcon defaulting `profile:'contained'` + `name:'calendar-days'`
// so the trigger's calendar affordance sits snug in the row. Sizes to the trigger's effective tier.
// Explicit prop shape (NOT `Omit<ContainedIconProps, …>` — ContainedIconProps is a name-XOR-children
// discriminated union that `Omit` collapses badly). The FA-glyph identity fields + the box `aui`,
// with `name` OPTIONAL (defaults to `calendar-days`).
export interface DatepickerIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
  name?: string;
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  aui?: ContainedIconAui;
}
const DatepickerIcon = React.forwardRef<HTMLSpanElement, DatepickerIconProps>(function DatepickerIcon(
  { aui, name, ...rest },
  ref,
) {
  const inheritedScale = useAuiScale();
  const resolvedScale = resolveAuiScale(
    aui?.scale,
    inheritedScale,
    DATEPICKER_TRIGGER_VOCAB.defaults.scale as DatepickerScale,
  );
  const resolvedAui = React.useMemo(
    () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
    [aui, resolvedScale],
  );
  return React.createElement(ContainedIcon, {
    ref,
    'aria-hidden': true,
    ...rest,
    name: name ?? 'calendar-days',
    aui: resolvedAui,
  });
});
DatepickerIcon.displayName = 'Datepicker.Icon';

// ─── Datepicker.Trigger — tier-3 frame (main factory), open-aware trigger-toggle recipe ───────────
// A Button-class field: Popover.Trigger through the MAIN factory. useStateLayer FIRST (focus ring +
// hover overlay), the recipe LAST (so `aui.sx` wins by role). The recipe is `classNameForState` keyed
// off Popover's `{open, disabled}` render state — legal because Popover.Trigger is a COMPONENT. The
// Trigger auto-renders <Datepicker.Value> + <Datepicker.Icon> unless the consumer composes them.
const _DatepickerTrigger = createAtomicComponent(PopoverPrimitive.Trigger, {
  extensions: [useScaleCascade, useStateLayer, useDatepickerTriggerRecipe],
});

export interface DatepickerTriggerProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive.Trigger>, 'color'> {
  aui?: DatepickerTriggerAui;
  /** Placeholder shortcut for the AUTO-rendered <Datepicker.Value>. */
  placeholder?: React.ReactNode;
}
const DatepickerTrigger = React.forwardRef<HTMLButtonElement, DatepickerTriggerProps>(
  function DatepickerTrigger({ children, placeholder, disabled, aui, ...rest }, ref) {
    const ctx = useDatepickerContext();
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // trigger's own `aui` — own axis always wins.
    const mergedAui = useDatepickerFieldMergedAui(aui);
    const composedValue = hasPartChild(children, DatepickerValue);
    const composedIcon = hasPartChild(children, DatepickerIcon);

    if (process.env.NODE_ENV !== 'production') {
      // The Value always renders visible text (the selected date OR the placeholder), so the trigger
      // has an accessible name whenever a placeholder is set or a value exists. Warn only when both
      // are absent AND no label is wired (mirrors Select.Trigger's intent).
      const placeholderName =
        placeholder === undefined ||
        (typeof placeholder === 'string' ? placeholder.trim() !== '' : placeholder != null)
          ? 'value'
          : ctx.value != null
            ? 'value'
            : undefined;
      warnIfNoAccessibleName(
        [children, composedValue ? 'value' : placeholderName],
        rest as Record<string, unknown>,
        'Datepicker.Trigger',
      );
    }

    // Body first (composed parts, in author order), then fill the missing auto parts (Value, then
    // Icon). With nothing composed this is `<Value/><Icon/>`.
    const content = (
      <>
        {children}
        {!composedValue && React.createElement(DatepickerValue, { placeholder })}
        {!composedIcon && React.createElement(DatepickerIcon, null)}
      </>
    );

    return React.createElement(
      _DatepickerTrigger as React.ElementType,
      { ref, ...rest, disabled: disabled || ctx.disabled, aui: mergedAui },
      content,
    );
  },
);
DatepickerTrigger.displayName = 'Datepicker.Trigger';

// ─── Datepicker.InputButton — the trailing calendar affordance for the INPUT mode (a real IconButton) ─
// Mirrors NumberField.Button's "compose the shipped IconButton" pattern: a REAL IconButton (name
// `calendar-days`, transparent `paint:text`, `profile:contained` so it sits snug at the row's end)
// whose click TOGGLES the popup. Carries the popover-affordance a11y: `aria-haspopup='dialog'`,
// `aria-expanded` tracks the open state, and a default `aria-label:'Choose date'`. Auto-rendered by
// `Datepicker.Input` unless the consumer composes one (the Trigger's `hasPartChild` auto-part pattern).
export interface DatepickerInputButtonProps
  extends Omit<React.ComponentProps<typeof IconButton>, 'aui' | 'name' | 'aria-label'> {
  /** The FA glyph. Defaults to `calendar-days`. */
  name?: string;
  /** Accessible name. Defaults to `Choose date`. */
  'aria-label'?: string;
  aui?: IconButtonAui;
}
const DatepickerInputButton = React.forwardRef<HTMLButtonElement, DatepickerInputButtonProps>(
  function DatepickerInputButton({ aui, name, 'aria-label': ariaLabel, onClick, disabled, ...rest }, ref) {
    const ctx = useDatepickerContext();
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // button's own `aui` BEFORE scale resolution — own axis always wins; scale is untouched by the
    // merge. Mirrors `Autocomplete.Clear`/`Combobox.Clear`.
    const fieldMergedAui = useDatepickerFieldMergedAui(aui);
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      fieldMergedAui?.scale,
      inheritedScale,
      DATEPICKER_TRIGGER_VOCAB.defaults.scale as DatepickerScale,
    );
    // Default look: transparent, in-row calendar affordance (own `aui` axis wins per axis; an
    // ambient Field color/shape also wins over this default when the consumer sets neither).
    const resolvedAui = React.useMemo<IconButtonAui>(
      () => ({ paint: 'text', profile: 'contained', color: 'surface', ...fieldMergedAui, scale: resolvedScale }),
      [fieldMergedAui, resolvedScale],
    );
    const handleClick = React.useCallback<NonNullable<React.ComponentProps<typeof IconButton>['onClick']>>(
      (e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        ctx.setOpen(!ctx.open);
      },
      [onClick, ctx],
    );
    return React.createElement(IconButton, {
      ref,
      ...rest,
      name: name ?? 'calendar-days',
      'aria-label': ariaLabel ?? 'Choose date',
      'aria-haspopup': 'dialog',
      'aria-expanded': ctx.open,
      disabled: disabled || ctx.disabled,
      onClick: handleClick,
      aui: resolvedAui,
    } as React.ComponentProps<typeof IconButton>);
  },
);
DatepickerInputButton.displayName = 'Datepicker.InputButton';

// ─── Datepicker.Input — the TYPEABLE field row (frame + inner input + trailing button) ─────────────
// The alternative anatomy to the Trigger (industry-standard MUI/Ant): a `.aui-frame` row (the
// NumberField.Group anatomy) hosting a TRANSPARENT inner `<input>` you can TYPE a date into, plus a
// trailing calendar button. The frame is the popover ANCHOR (an <input> can't nest in a
// Popover.Trigger). Behavior: focusing the input OPENS the popup (focus stays in the input — the grid
// does NOT steal it until ArrowDown); typing LIVE-parses (a valid, enabled date updates value + view
// without closing; invalid/incomplete no-ops); blur NORMALIZES (valid → canonical text, invalid →
// revert, empty → clear to null); Enter commits + closes; picking a day fills the text + closes.
// `disabled` is not stripped by createVocabRecipe (it flips the chroma), so a local hook strips it off
// the <div> — the NumberField.Group `useStripDisabled` pattern.
const useStripDisabled: PropHook<{ className?: string }, Record<string, never>> = () => ({});
useStripDisabled.hookProps = new Set(['disabled']);

const _DatepickerInputFrame = createAtomicComponent('div', {
  extensions: [useStateLayer, useDatepickerInputRecipe, useStripDisabled],
});

export interface DatepickerInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'value' | 'defaultValue'> {
  /** Frame appearance (the outlined field row — mirrors NumberField.Group). */
  aui?: DatepickerInputAui;
  /** Inner-input appearance (transparent by default — the Group owns the border/fill). */
  inputAui?: InputAui;
  /** Placeholder for the inner input. Defaults to the locale pattern (e.g. `mm/dd/yyyy`). */
  placeholder?: string;
  /** A composed `<Datepicker.InputButton>` (suppresses the auto-rendered default). */
  children?: React.ReactNode;
}
const DatepickerInput = React.forwardRef<HTMLInputElement, DatepickerInputProps>(function DatepickerInput(
  { aui, inputAui, placeholder, children, className, onFocus, onBlur, onKeyDown, onChange, ...rest },
  ref,
) {
  const ctx = useDatepickerContext();
  const inheritedScale = useAuiScale();

  // Register the FRAME as the popover anchor (unregister on unmount). Key BOTH the callback-ref and the
  // cleanup on the STABLE `registerInputAnchor` (useCallback([]) in the Root) — NOT `ctx`, which is a
  // fresh object every render: a `[ctx]` dep re-attached the ref + re-ran the cleanup each render,
  // nulling the anchor mid-life so Base UI's positioner read a null reference (the un-anchored popup).
  const { registerInputAnchor } = ctx;
  const setFrameRef = React.useCallback(
    (node: HTMLDivElement | null) => registerInputAnchor(node),
    [registerInputAnchor],
  );
  React.useEffect(() => () => registerInputAnchor(null), [registerInputAnchor]);

  // The editable text mirrors the value, but the value→text sync is SKIPPED while the input is
  // focused (typing owns the text then); a day-pick / external change (input unfocused) reformats it.
  const [text, setText] = React.useState<string>(() =>
    ctx.value ? formatDateInput(ctx.value, ctx.locale) : '',
  );
  const focusedRef = React.useRef(false);
  React.useEffect(() => {
    if (focusedRef.current) return;
    setText(ctx.value ? formatDateInput(ctx.value, ctx.locale) : '');
  }, [ctx.value, ctx.locale]);

  const dateEnabled = React.useCallback(
    (d: Date) => !isDayDisabled(d, { min: ctx.min, max: ctx.max, isDateDisabled: ctx.isDateDisabled }),
    [ctx.min, ctx.max, ctx.isDateDisabled],
  );

  // Blur/Enter normalization: valid → canonical text + commit; empty → clear (null); invalid → revert.
  const normalize = React.useCallback(() => {
    if (text.trim() === '') {
      ctx.commitValue(null);
      setText('');
      return;
    }
    const parsed = parseDateInput(text, ctx.locale);
    if (parsed && dateEnabled(parsed)) {
      ctx.commitValue(parsed);
      setText(formatDateInput(parsed, ctx.locale));
    } else {
      setText(ctx.value ? formatDateInput(ctx.value, ctx.locale) : '');
    }
  }, [text, ctx, dateEnabled]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // DOM-light tsconfig: read `value` structurally (mirrors field.tsx's `{ value?: unknown }` reads).
      const raw = (e.target as unknown as { value: string }).value;
      setText(raw);
      const parsed = parseDateInput(raw, ctx.locale);
      if (parsed && dateEnabled(parsed)) ctx.commitValue(parsed); // live update, stays OPEN
      onChange?.(e);
    },
    [ctx, dateEnabled, onChange],
  );
  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      focusedRef.current = true;
      // A focus-return fired by a close (day-pick, Escape, outside-press) must NOT reopen the popup — else
      // the field could never be closed while focused. The Root ARMS the guard on every close; consume it
      // here. A genuine focus (the guard clear) opens. (Reopen explicitly via ArrowDown while focused.)
      if (!ctx.consumeSuppressReopen()) {
        ctx.setGridAutoFocus(false); // the grid must NOT steal focus from the input
        ctx.setOpen(true);
      }
      onFocus?.(e);
    },
    [ctx, onFocus],
  );
  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      focusedRef.current = false;
      normalize();
      onBlur?.(e);
    },
    [normalize, onBlur],
  );
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        ctx.setGridAutoFocus(true); // move focus INTO the grid (the roving day)
        ctx.setOpen(true);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        normalize();
        ctx.setOpen(false);
      }
      onKeyDown?.(e);
    },
    [ctx, normalize, onKeyDown],
  );

  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // rail frame's own `aui` — own axis always wins.
  const fieldMergedAui = useDatepickerFieldMergedAui(aui);
  const frameAui = React.useMemo<DatepickerInputAui>(
    () => ({
      ...fieldMergedAui,
      scale: resolveAuiScale(fieldMergedAui?.scale, inheritedScale, DATEPICKER_TRIGGER_VOCAB.defaults.scale as DatepickerScale),
    }),
    [fieldMergedAui, inheritedScale],
  );
  const resolvedInputAui = React.useMemo<InputAui>(
    () => ({
      paint: 'text',
      profile: 'no-padding',
      color: 'surface',
      ...inputAui,
      scale: resolveAuiScale(inputAui?.scale, inheritedScale, DATEPICKER_TRIGGER_VOCAB.defaults.scale as DatepickerScale),
      shape: 'none',
    }),
    [inputAui, inheritedScale],
  );

  const composedButton = hasPartChild(children, DatepickerInputButton);
  const placeholderText = placeholder ?? getDateInputPattern(ctx.locale).placeholder;
  // Tab-only :focus-within ring on the FRAME (the single visible affordance) — REUSES Field's
  // focus-origin helper, exactly like NumberField.Group. _state-cascade.scss gates the outline on
  // `data-aui-focus-origin` (keyboard → ring, pointer → suppressed).
  const focusOriginHandlers = useFieldFocusOrigin();

  return React.createElement(
    _DatepickerInputFrame as React.ElementType,
    {
      ref: setFrameRef,
      className,
      disabled: ctx.disabled,
      'data-open': ctx.open ? '' : undefined,
      ...focusOriginHandlers,
      aui: frameAui,
    },
    React.createElement(Input, {
      ref,
      ...rest,
      value: text,
      placeholder: placeholderText,
      disabled: ctx.disabled,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      aui: resolvedInputAui,
    } as React.ComponentProps<typeof Input>),
    children,
    !composedButton && React.createElement(DatepickerInputButton, null),
  );
});
DatepickerInput.displayName = 'Datepicker.Input';

// ─── Datepicker.Portal — passthrough over Popover.Portal ──────────────────────────────────────────
const DatepickerPortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof PopoverPrimitive.Portal>
>(function DatepickerPortal(props, ref) {
  return React.createElement(PopoverPrimitive.Portal as React.ElementType, { ref, ...props });
});
DatepickerPortal.displayName = 'Datepicker.Portal';
export type DatepickerPortalProps = React.ComponentProps<typeof DatepickerPortal>;

// ─── Datepicker.Backdrop — portaled overlay marker + identity re-stamp ────────────────────────────
const DatepickerBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof PopoverPrimitive.Backdrop>
>(function DatepickerBackdrop({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(PopoverPrimitive.Backdrop as React.ElementType, {
    ref,
    // DS-wide popup motion: the shared `[data-aui-popup-motion="backdrop"]` opacity fade (state-cascade).
    'data-aui-popup-motion': 'backdrop',
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-datepicker-backdrop', className),
  });
});
DatepickerBackdrop.displayName = 'Datepicker.Backdrop';
export type DatepickerBackdropProps = React.ComponentProps<typeof DatepickerBackdrop>;

// ─── Datepicker.Positioner — THE cascade re-stamp (mirrors Select.Positioner) ─────────────────────
// A portaled overlay renders OUTSIDE the themed root, so it re-stamps the ambient identity `data-aui-*`
// so `--theme-*`/`--paint-*` re-emit + inherit into the popup subtree. MANDATORY (browser-only effect).
const DatepickerPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof PopoverPrimitive.Positioner>
>(function DatepickerPositioner({ className, anchor, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  const ctx = useDatepickerContextOptional();
  // INPUT mode: the frame (not a Popover.Trigger) is the anchor — pass the registered ELEMENT when an
  // Input registered one AND the consumer didn't pass an explicit `anchor`. Trigger mode: no input
  // anchor (`inputAnchorEl` null) → Base UI falls back to the trigger (the default). Passing the
  // ELEMENT (not a ref) lets Base UI re-resolve the Floating UI reference on identity change.
  const resolvedAnchor = anchor ?? ctx?.inputAnchorEl ?? undefined;
  return React.createElement(PopoverPrimitive.Positioner as React.ElementType, {
    ref,
    ...rest, // consumer data-aui-* FIRST …
    ...(resolvedAnchor !== undefined ? { anchor: resolvedAnchor } : {}),
    ...dataAttrs, // … ambient identity LAST → identity wins (authoritative re-stamp)
    className: prependMarkerClassName('aui-datepicker-positioner', className),
  });
});
DatepickerPositioner.displayName = 'Datepicker.Positioner';
export type DatepickerPositionerProps = React.ComponentProps<typeof DatepickerPositioner>;

// ─── Datepicker.Popup — tier-3 surface frame, NO useStateLayer (mirrors Select.Popup) ─────────────
// The floating calendar surface: a tier-3 `.aui-frame` card via the MAIN factory, recipe ONLY. The
// default `elevation: 4` floats it (pinned in the vocab). NO matchTriggerWidth (a calendar is
// intrinsically sized, unlike a listbox). `initialFocus` defaults to `false` so the Grid's mount
// effect can land focus on the selected-or-today cell (not the Header's prev-month button).
const _DatepickerPopup = createAtomicComponent(PopoverPrimitive.Popup, {
  extensions: [useScaleCascade, useDatepickerPopupRecipe],
});

export interface DatepickerPopupProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive.Popup>, 'color'> {
  aui?: DatepickerPopupAui;
  /** Cap the popup height (viewport-safe: `min(maxHeight, available)`). A number is `px`. */
  maxHeight?: number | string;
}
const DatepickerPopup = React.forwardRef<HTMLDivElement, DatepickerPopupProps>(function DatepickerPopup(
  { maxHeight, style, initialFocus, aui, ...rest },
  ref,
) {
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // popup's own `aui` — own axis always wins.
  const mergedAui = useDatepickerFieldMergedAui(aui);
  const heightStyle =
    maxHeight != null
      ? ({ '--aui-popup-max-block-size': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } as React.CSSProperties)
      : undefined;
  let mergedStyle: DatepickerPopupProps['style'] | undefined;
  if (typeof style === 'function') {
    const styleFn = style;
    mergedStyle = (state: unknown) => ({ ...heightStyle, ...(styleFn as (s: unknown) => React.CSSProperties)(state) });
  } else if (heightStyle || style) {
    mergedStyle = { ...heightStyle, ...style };
  }
  return React.createElement(_DatepickerPopup as React.ElementType, {
    ref,
    // Default: don't auto-move focus into the popup — the Grid focuses the roving day on mount.
    initialFocus: initialFocus ?? false,
    // DS-wide popup motion: the shared `[data-aui-popup-motion="anchored"]` scale+fade (state-cascade).
    'data-aui-popup-motion': 'anchored',
    ...(mergedStyle !== undefined ? { style: mergedStyle } : {}),
    ...rest,
    aui: mergedAui,
  });
});
DatepickerPopup.displayName = 'Datepicker.Popup';

// ─── The internal Calendar view state (viewMonth + roving focus) ──────────────────────────────────
interface CalendarContextValue {
  viewMonth: Date;
  goToMonth: (d: Date) => void;
  focusedDate: Date;
  moveFocus: (next: Date) => void;
  registerDay: (key: string, node: HTMLButtonElement | null) => void;
}
const CalendarContext = React.createContext<CalendarContextValue | null>(null);
function useCalendarContext(): CalendarContextValue {
  const ctx = React.useContext(CalendarContext);
  if (!ctx) {
    throw new Error('[atomic-aui] a Datepicker calendar part was rendered outside <Datepicker.Calendar>.');
  }
  return ctx;
}

// ─── Datepicker.Calendar — the stateful view owner (auto-renders Header + Grid) ───────────────────
export type DatepickerCalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Appearance forwarded to EVERY auto-rendered day cell (the analogue of passing `aui` to each
   *  composed `Select.Item`) — the days are generated, so this is the seam to theme them uniformly
   *  (`states.{unselected,selected,today}`). Ignored when you compose the Grid/Day subtree yourself. */
  dayAui?: DatepickerDayAui;
};
const DatepickerCalendar = React.forwardRef<HTMLDivElement, DatepickerCalendarProps>(
  function DatepickerCalendar({ className, children, dayAui, ...rest }, ref) {
    const ctx = useDatepickerContext();
    // Seed once from the value/today at mount (a lazy useState initializer runs exactly once — the
    // calendar remounts each open under the default unmount-on-close popover, so it re-seeds per open).
    const [seed] = React.useState(() => clampDate(ctx.value ?? todayDate(), ctx.min, ctx.max));
    const [viewMonth, setViewMonth] = React.useState<Date>(() => startOfMonth(seed));
    const [focusedDate, setFocusedDate] = React.useState<Date>(() => seed);
    // DOM-light tsconfig: type nodes structurally by the one method we call (`focus`) — mirrors
    // input.tsx / field.tsx's structural DOM typing.
    const dayNodes = React.useRef<Map<string, { focus: () => void }>>(new Map());
    // When opened FROM the input (`gridAutoFocus:false`), the grid must NOT auto-focus on mount —
    // focus stays in the input until ArrowDown flips `gridAutoFocus` true (the effect below).
    const pendingFocus = React.useRef<string | null>(ctx.gridAutoFocus ? dayKey(seed) : null);

    const registerDay = React.useCallback((key: string, node: HTMLButtonElement | null) => {
      if (node) dayNodes.current.set(key, node as unknown as { focus: () => void });
      else dayNodes.current.delete(key);
    }, []);

    const goToMonth = React.useCallback((d: Date) => setViewMonth(startOfMonth(d)), []);

    const moveFocus = React.useCallback((next: Date) => {
      const n = startOfDay(next);
      setFocusedDate(n);
      setViewMonth((m) => (m.getFullYear() === n.getFullYear() && m.getMonth() === n.getMonth() ? m : startOfMonth(n)));
      pendingFocus.current = dayKey(n);
    }, []);

    // ArrowDown-into-grid: when `gridAutoFocus` flips true while the popup is already open (opened from
    // the input), queue a focus onto the current roving cell. Read `focusedDate` via a ref so this
    // fires ONLY on the flip, not on every roving move. Declared BEFORE the focus-landing effect so
    // `pendingFocus` is set before that effect reads it on the same render.
    const focusedDateRef = React.useRef(focusedDate);
    focusedDateRef.current = focusedDate;
    React.useEffect(() => {
      if (ctx.gridAutoFocus) pendingFocus.current = dayKey(focusedDateRef.current);
    }, [ctx.gridAutoFocus]);

    // Typing a date in the input (input mode) updates `ctx.value` while the popup is open — follow it
    // to that month so the grid shows the typed date. Read `viewMonth` via a ref so this reacts only
    // to a value change (Trigger mode never changes the value while open, so this is inert there).
    const viewMonthRef = React.useRef(viewMonth);
    viewMonthRef.current = viewMonth;
    React.useEffect(() => {
      if (ctx.value && !isSameMonth(ctx.value, viewMonthRef.current)) goToMonth(ctx.value);
    }, [ctx.value, goToMonth]);

    // After every render (incl. the mount + any month page), imperatively land focus on the roving
    // cell if a focus move is pending and its node now exists.
    React.useEffect(() => {
      const key = pendingFocus.current;
      if (!key) return;
      const node = dayNodes.current.get(key);
      if (node) {
        node.focus();
        pendingFocus.current = null;
      }
    });

    const calCtx = React.useMemo<CalendarContextValue>(
      () => ({ viewMonth, goToMonth, focusedDate, moveFocus, registerDay }),
      [viewMonth, goToMonth, focusedDate, moveFocus, registerDay],
    );

    // Auto-render Header + Grid unless the consumer composed a subtree. `dayAui` flows to the auto Grid.
    const content = children ?? (
      <>
        {React.createElement(DatepickerHeader, null)}
        {React.createElement(DatepickerGrid, { dayAui })}
      </>
    );

    return React.createElement(
      CalendarContext.Provider,
      { value: calCtx },
      React.createElement(
        'div',
        { ref, ...rest, className: prependMarkerClassName('aui-datepicker-calendar', className) },
        content,
      ),
    );
  },
);
DatepickerCalendar.displayName = 'Datepicker.Calendar';

// ─── Datepicker.Header — caption + prev/next month IconButtons ────────────────────────────────────
export interface DatepickerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** aria-label for the previous-month button. Default "Previous month". */
  previousLabel?: string;
  /** aria-label for the next-month button. Default "Next month". */
  nextLabel?: string;
}
const DatepickerHeader = React.forwardRef<HTMLDivElement, DatepickerHeaderProps>(function DatepickerHeader(
  { className, previousLabel = 'Previous month', nextLabel = 'Next month', ...rest },
  ref,
) {
  const ctx = useDatepickerContext();
  const cal = useCalendarContext();
  const inheritedScale = useAuiScale();
  const navScale = resolveAuiScale(undefined, inheritedScale, DATEPICKER_TRIGGER_VOCAB.defaults.scale as DatepickerScale);
  const caption = getMonthCaption(cal.viewMonth, ctx.locale);
  // The month-nav buttons are a flat, transparent text affordance (not a solid chip), sized to the
  // datepicker's cascaded tier.
  const navAui = { color: 'surface' as const, paint: 'text' as const, profile: 'square' as const, scale: navScale };
  return React.createElement(
    'div',
    { ref, ...rest, className: prependMarkerClassName('aui-datepicker-header', className) },
    React.createElement(IconButton, {
      name: 'chevron-left',
      'aria-label': previousLabel,
      className: 'aui-datepicker-nav',
      onClick: () => cal.goToMonth(addMonths(cal.viewMonth, -1)),
      aui: navAui,
    }),
    React.createElement('span', { className: 'aui-datepicker-caption', id: ctx.captionId }, caption),
    React.createElement(IconButton, {
      name: 'chevron-right',
      'aria-label': nextLabel,
      className: 'aui-datepicker-nav',
      onClick: () => cal.goToMonth(addMonths(cal.viewMonth, 1)),
      aui: navAui,
    }),
  );
});
DatepickerHeader.displayName = 'Datepicker.Header';

// ─── Datepicker.Day — the hand-owned STATEFUL cell (intrinsic <button>, static-className recipe) ──
// Base UI ships no calendar, so the cell is ours: a factory `<button>` (useScaleCascade → useStateLayer
// → the day recipe, all STATIC classNames — legal on an intrinsic host). State (selected/today/
// disabled/outside) is resolved from context. Uses `aria-disabled` (NOT native `disabled`) so a
// disabled day stays in roving focus. Registers its node so the Grid can imperatively focus the
// roving cell; roving tabindex is driven by the Calendar's `focusedDate`.
const _DatepickerDay = createAtomicComponent('button', {
  extensions: [useScaleCascade, useStateLayer, useDatepickerDayRecipe],
});
export interface DatepickerDayProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'value'> {
  /** The day this cell represents. */
  date: Date;
  /** True when the cell belongs to the adjacent month (a leading/trailing filler). */
  outside?: boolean;
  aui?: DatepickerDayAui;
}
const DatepickerDay = React.forwardRef<HTMLButtonElement, DatepickerDayProps>(function DatepickerDay(
  { date, outside = false, aui, className, onClick, onKeyDown, ...rest },
  ref,
) {
  const ctx = useDatepickerContext();
  const cal = useCalendarContext();
  // Field-axis forwarding (2026-07-11 USER DECISION, widened): the STATEFUL merge — ambient
  // reaches `unselected`/`today`; the `primary`/`solid` selected fill is PINNED (see
  // `mergeDatepickerDayFieldAui`'s comment above).
  const mergedAui = useDatepickerDayFieldMergedAui(aui);
  const selected = isSameDay(ctx.value, date);
  const isToday = isSameDay(todayDate(), date);
  const disabled = isDayDisabled(date, { min: ctx.min, max: ctx.max, isDateDisabled: ctx.isDateDisabled });
  const isRoving = isSameDay(cal.focusedDate, date);
  const key = dayKey(date);

  const setRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      cal.registerDay(key, node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [cal, key, ref],
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (!disabled) ctx.selectDate(date);
    },
    [onClick, disabled, ctx, date],
  );

  return React.createElement(_DatepickerDay as React.ElementType, {
    ref: setRef,
    type: 'button',
    role: 'gridcell',
    'aria-selected': selected,
    'aria-disabled': disabled || undefined,
    'aria-current': isToday ? 'date' : undefined,
    tabIndex: isRoving ? 0 : -1,
    'data-selected': selected ? '' : undefined,
    'data-today': isToday ? '' : undefined,
    'data-outside-month': outside ? '' : undefined,
    'data-disabled': disabled ? '' : undefined,
    className,
    onClick: handleClick,
    onKeyDown,
    // Recipe-only props (stripped from the DOM by the day recipe's hookProps).
    selected,
    today: isToday,
    disabled,
    aui: mergedAui,
    ...rest,
    children: date.getDate(),
  });
});
DatepickerDay.displayName = 'Datepicker.Day';

// ─── Datepicker.Week — role=row wrapper (marker) ──────────────────────────────────────────────────
export type DatepickerWeekProps = React.HTMLAttributes<HTMLDivElement>
const DatepickerWeek = React.forwardRef<HTMLDivElement, DatepickerWeekProps>(function DatepickerWeek(
  { className, ...rest },
  ref,
) {
  return React.createElement('div', {
    ref,
    role: 'row',
    ...rest,
    className: prependMarkerClassName('aui-datepicker-week', className),
  });
});
DatepickerWeek.displayName = 'Datepicker.Week';

// ─── Datepicker.Grid — role=grid: weekday header + 6 week rows of Day cells + the keyboard model ──
export type DatepickerGridProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Appearance forwarded to every auto-rendered day cell (see `Datepicker.Calendar#dayAui`). */
  dayAui?: DatepickerDayAui;
};
const DatepickerGrid = React.forwardRef<HTMLDivElement, DatepickerGridProps>(function DatepickerGrid(
  { className, dayAui, ...rest },
  ref,
) {
  const ctx = useDatepickerContext();
  const cal = useCalendarContext();
  const weeks = React.useMemo(
    () => buildMonthGrid(cal.viewMonth, ctx.firstDayOfWeek),
    [cal.viewMonth, ctx.firstDayOfWeek],
  );
  const weekdayNames = React.useMemo(
    () => getWeekdayNames(ctx.firstDayOfWeek, ctx.locale, ctx.weekdayFormat),
    [ctx.firstDayOfWeek, ctx.locale, ctx.weekdayFormat],
  );

  // The WAI-ARIA grid keyboard model (delegated on the grid container). Arrows ±1/±7, Home/End week
  // bounds, PageUp/Down ±month (+Shift ±year), Enter/Space select. All preventDefault to stop scroll.
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const f = cal.focusedDate;
      let next: Date | null = null;
      switch (e.key) {
        case 'ArrowLeft': next = addDays(f, -1); break;
        case 'ArrowRight': next = addDays(f, 1); break;
        case 'ArrowUp': next = addDays(f, -7); break;
        case 'ArrowDown': next = addDays(f, 7); break;
        case 'Home': next = addDays(f, -(((f.getDay() - ctx.firstDayOfWeek) + 7) % 7)); break;
        case 'End': next = addDays(f, 6 - (((f.getDay() - ctx.firstDayOfWeek) + 7) % 7)); break;
        case 'PageUp': next = e.shiftKey ? addYears(f, -1) : addMonths(f, -1); break;
        case 'PageDown': next = e.shiftKey ? addYears(f, 1) : addMonths(f, 1); break;
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (!isDayDisabled(f, { min: ctx.min, max: ctx.max, isDateDisabled: ctx.isDateDisabled })) {
            ctx.selectDate(f);
          }
          return;
        }
        default:
          return;
      }
      e.preventDefault();
      cal.moveFocus(next);
    },
    [cal, ctx],
  );

  return React.createElement(
    'div',
    {
      ref,
      role: 'grid',
      'aria-labelledby': ctx.captionId,
      onKeyDown: handleKeyDown,
      ...rest,
      className: prependMarkerClassName('aui-datepicker-grid', className),
    },
    // Weekday header row (columnheaders).
    React.createElement(
      'div',
      { role: 'row', className: 'aui-datepicker-weekdays' },
      weekdayNames.map((name, i) =>
        React.createElement('span', { key: i, role: 'columnheader', className: 'aui-datepicker-weekday' }, name),
      ),
    ),
    // Week rows.
    weeks.map((week, wi) =>
      React.createElement(
        DatepickerWeek,
        { key: wi },
        week.map((cell) =>
          React.createElement(DatepickerDay, {
            key: dayKey(cell.date),
            date: cell.date,
            outside: cell.outside,
            aui: dayAui,
          }),
        ),
      ),
    ),
  );
});
DatepickerGrid.displayName = 'Datepicker.Grid';

// ─── Assemble (Object.assign dot-namespace, the Select precedent) ─────────────────────────────────
interface DatepickerComponent {
  (props: DatepickerRootProps): React.JSX.Element;
  displayName?: string;
  Trigger: typeof DatepickerTrigger;
  Input: typeof DatepickerInput;
  InputButton: typeof DatepickerInputButton;
  Value: typeof DatepickerValue;
  Icon: typeof DatepickerIcon;
  Portal: typeof DatepickerPortal;
  Backdrop: typeof DatepickerBackdrop;
  Positioner: typeof DatepickerPositioner;
  Popup: typeof DatepickerPopup;
  Calendar: typeof DatepickerCalendar;
  Header: typeof DatepickerHeader;
  Grid: typeof DatepickerGrid;
  Week: typeof DatepickerWeek;
  Day: typeof DatepickerDay;
}

export const Datepicker = Object.assign(DatepickerRoot, {
  Trigger: DatepickerTrigger,
  Input: DatepickerInput,
  InputButton: DatepickerInputButton,
  Value: DatepickerValue,
  Icon: DatepickerIcon,
  Portal: DatepickerPortal,
  Backdrop: DatepickerBackdrop,
  Positioner: DatepickerPositioner,
  Popup: DatepickerPopup,
  Calendar: DatepickerCalendar,
  Header: DatepickerHeader,
  Grid: DatepickerGrid,
  Week: DatepickerWeek,
  Day: DatepickerDay,
}) as DatepickerComponent;

export default Datepicker;
