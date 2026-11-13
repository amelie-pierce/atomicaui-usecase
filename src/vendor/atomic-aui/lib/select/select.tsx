// modules/design/atomic-aui/src/lib/select/select.tsx
//
// Task P1 — the CLOSED Select control: Select.Root (generics-preserving wrapper) +
// Select.Trigger (tier-3 frame via the MAIN factory) + Select.Value (tier-1 marker) +
// Select.Icon (tier-1 marker slot), assembled into the dot-namespace. The wrapper mirrors
// Base UI's public parts while only adding AtomicAUI markers/recipes where the visual system
// owns paint.
//
// Base UI owns all behavior (listbox/option ARIA, typeahead, roving focus, floating placement,
// form input); we own appearance via the per-part recipes (use-recipe.ts, P0.2).
import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, hasPartChild, findPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { guardTabIndexForAriaHidden } from '../icon/icon-a11y';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { useAuiIdentity, identityToDataAttrs } from '../identity';
import {
  AuiScaleProvider,
  useAuiScale,
  useScaleCascade,
  resolveAuiScale,
} from '../scale-cascade/use-aui-scale';
import {
  createChevronPart,
  splitTriggerChildren,
  composeChevron,
} from '../../families/chevron';
import { ScrollAreaViewport, ScrollAreaScrollbar, type ScrollAreaThumbColor } from '../view';
import { useSelectTriggerRecipe, useSelectPopupRecipe, useSelectItemRecipe, useSelectGroupLabelRecipe, SELECT_TRIGGER_VOCAB, SELECT_ITEM_VOCAB } from './use-recipe';
import type { SelectTriggerAui, SelectPopupAui, SelectItemAui, SelectGroupLabelAui, SelectScale } from './use-recipe';
import { useFieldAui, type FieldResolvedAui } from '../field/field-context';

// Re-export the Base UI Root prop shape verbatim — the full value model (value/defaultValue/
// onValueChange + the `| null` single-select clear-signal, multiple, name/required/disabled/
// readOnly, open-state, object-value helpers). We do NOT narrow or shim it (unlike Radio, which
// needed a boolean shim — Select.Root IS the controller).
export type { SelectRootProps } from '@base-ui/react/select';
import type { SelectRootProps } from '@base-ui/react/select';

// NOTE: the temporary P2.2 `SelectUnstyled` bridge (a raw `@base-ui/react/select` re-export, used
// by the demo so unstyled placeholder options shared THIS module's SelectRootContext) is GONE as of
// P3 — the real <Select.Item> below replaces it. The dup-`@base-ui` copy hazard it papered over
// (two hoisted copies → two SelectRootContexts → Base UI error #60 on a foreign Item) does NOT apply
// to in-package parts: Select.Item wraps SelectPrimitive.Item from the SAME copy as Select.Root.
export type { SelectTriggerAui, SelectPopupAui, SelectItemAui, SelectGroupLabelAui, SelectColor, SelectPaint, SelectScale, SelectShape } from './use-recipe';

// ─── Field-axis forwarding (2026-07-11 USER DECISION — fleet-wide, PINNED) ────────────────────────
// Popup-family parity audit finding #2 (`_vaults/atomicaui/raw/2026-07-11-popup-family-parity-audit.md`,
// row 11): Autocomplete forwards the Field ambient `aui` (color/shape/elevation/sx — scale already
// cascades via the separate `AuiScaleProvider` rail seeded below) to EVERY DOM-bearing part
// (`useMergedAutocompletePartAui`, `autocomplete.tsx:84-105`); Select/Dropdown/Combobox forwarded
// scale ONLY. Scale-only forwarding is the defect, not the law — this mirrors Autocomplete's shape
// exactly (own-axis-wins: an explicit part `aui.color`/`.shape`/`.elevation`/`.sx` is never clobbered).
type FieldMergeableAui = {
  color?: unknown;
  shape?: unknown;
  elevation?: unknown;
  sx?: unknown;
};

function mergeSelectFieldAxes<A extends FieldMergeableAui>(
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

function useSelectFieldMergedAui<A extends FieldMergeableAui>(aui: A | undefined): A {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeSelectFieldAxes(inherited, aui), [inherited, aui]);
}

// ─── Stateful Field-axis forwarding — Select.Item ONLY (2026-07-11 USER DECISION, widened) ────────
// SELECT_ITEM_VOCAB pins a DELIBERATE per-state look (`states.unselected`/`states.selected` — the
// selected row is a `raised`/`solid` fill, a fixed selection affordance, this same session). Base
// UI's layering (`build-leaf-classes.ts`) is `vocab.defaults < vocab.states[active] < aui top-level
// < aui.states[active]` — the naive top-level merge above (`mergeSelectFieldAxes`) lands ABOVE
// `vocab.states`, so applying it to `Select.Item` would silently override the PINNED selected fill
// (an ambient Field `color:'error'` would turn the SELECTED row red, not just the resting one — the
// exact bug the widened directive named). USER DECISION (2026-07-11): the selected affordance is
// PINNED — it must not shift under Field ambient; only an EXPLICIT consumer `aui` override (top-level
// or `aui.states.selected`) may change it, and those already flow through unaffected below (this
// function never touches `own`'s top-level color/shape/elevation, so a consumer's own top-level
// color still reaches BOTH states exactly as it always has, with or without a Field ancestor).
// Ambient color/shape/elevation reach ONLY the `unselected` (resting) state, synthesized as
// `aui.states.unselected` merged UNDER the consumer's own `states.unselected` (own wins per axis) —
// this lands at buildLeafClasses' HIGHEST layer for the unselected state ONLY, never touching
// selected. `sx` still merges at the top level uniformly (a geometry override, not part of the
// "look" the pin protects). GATING (own-axis-wins, not just own-state-wins): an ambient axis is
// injected into `states.unselected` ONLY when the consumer's OWN TOP-LEVEL `aui` does NOT already
// set that axis — `states[active]` is the HIGHEST layer, so an ungated ambient injection would
// beat even a consumer's own top-level `aui.color`, which must never lose to ambient.
function mergeSelectItemFieldAui(
  inherited: FieldResolvedAui,
  own: SelectItemAui | undefined,
): SelectItemAui {
  const ambientUnselected: Record<string, unknown> = {};
  if (own?.color === undefined && inherited.color !== undefined) ambientUnselected.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) ambientUnselected.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) ambientUnselected.elevation = inherited.elevation;
  const ownUnselected = (own?.states as { unselected?: object } | undefined)?.unselected;
  const out: SelectItemAui = { ...own };
  if (Object.keys(ambientUnselected).length > 0 || ownUnselected) {
    out.states = {
      ...own?.states,
      unselected: { ...ambientUnselected, ...ownUnselected },
    } as SelectItemAui['states'];
  }
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx } as SelectItemAui['sx'];
  }
  return out;
}

function useSelectItemFieldMergedAui(aui: SelectItemAui | undefined): SelectItemAui {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeSelectItemFieldAui(inherited, aui), [inherited, aui]);
}

// ─── Select.Label REMOVED (2026-07-01) ────────────────────────────────────────
// The old bare `Select.Label` marker is gone. A labelled select is now composed via the Field
// compound: `<Field><Field.Label/><Field.Select>…</Field.Select></Field>` — Base UI registers the
// Select as the field control (SelectRoot `useRegisterFieldControl`) and the trigger pulls the field
// label id (`resolveAriaLabelledBy(fieldLabelId, selectLabelId)`), so `Field.Label` ↔ trigger
// association + validation come free. See `lib/field/field.tsx` (`Field.Select` + the flat
// `Field.Select*` parts) and the field consume-doc.

// ─── Select.Value — tier-1 cascade-reader (marker only, no aui) ──────────────────
// The selected-label <span>. Cascade-reader: its color comes from the inherited Trigger box
// color. We attach ONLY the `aui-select-value` marker (the muted-placeholder CSS keys on
// `data-placeholder`, which Base UI sets and we never strip). Base UI's render-prop `children`
// (a `(value) => ReactNode` formatter) + `placeholder` pass straight through.
const SelectValue = createAtomicPart<React.ComponentProps<typeof SelectPrimitive.Value>>(
  SelectPrimitive.Value,
  'aui-select-value'
);
SelectValue.displayName = 'Select.Value';
export type SelectValueProps = React.ComponentProps<typeof SelectValue>;

// ─── Select.Icon — a placeable general icon (a ContainedIcon, contained profile) ──
// REPURPOSED 2026-06-16 (was the tier-1 chevron-container marker slot). Now a thin wrapper over
// `ContainedIcon` that DEFAULTS `profile: 'contained'` so a leading/inline icon sits SNUG in the
// trigger row — the in-row icon convention, IDENTICAL to `Dropdown.Icon` / `Accordion.Icon`. It IS
// a ContainedIcon: same identity props (`name`/`family`/`layer`/`weight`) + the full box `aui`
// surface; a consumer can override the profile (or any axis) via `aui`. Placeable ANYWHERE in the
// trigger children (it is NOT the disclosure chevron — that is `Select.Chevron`). Sizes to the
// trigger's EFFECTIVE tier: own `aui.scale` ?? the Select scale cascade ?? the Trigger vocab default.
export type SelectIconProps = ContainedIconProps;
const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  function SelectIcon({ aui, ...rest }, ref) {
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inheritedScale,
      SELECT_TRIGGER_VOCAB.defaults.scale as SelectScale,
    );
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
SelectIcon.displayName = 'Select.Icon';

// ─── Select.Chevron — the composable disclosure chevron (marker-only span) ──
// A composition-driven disclosure chevron via the shared `createChevronPart` family (IDENTICAL to
// Dropdown.Chevron / Accordion.Chevron). It renders ONLY when composed in the Trigger children —
// there is NO auto-render. A composed-but-childless chevron IS the default `chevron-down` glyph
// (composed only to tweak its `aui`) and rotates 180° on open; a composed chevron WITH custom
// content is a replacement node, left static unless the consumer sets `data-aui-rotate`. The span
// is the rotation affordance the Trigger keys `data-aui-rotate` off via the trigger's
// `data-popup-open` (Base UI stamps `data-popup-open` on the Select Trigger when the popup opens).
// Its `aui` is FORWARDED to the inner ContainedIcon (every glyph axis is live).
const SelectChevron = createChevronPart('aui-select-chevron');
SelectChevron.displayName = 'Select.Chevron';
export type SelectChevronProps = React.ComponentProps<typeof SelectChevron>;

// ─── Select.Trigger — tier-3 frame (main factory + Object.assign), Button-class ──
// useStateLayer runs FIRST (appends `aui-stateful` + focus-ring defaults), useSelectTriggerRecipe
// runs LAST (recipe classes + bundled `aui.sx`) — so `aui.sx` wins by axis role over the
// state-layer defaults, per button.tsx / the §5 "sx always wins" contract. The trigger's
// open/hover are CSS (state layer + `data-popup-open`). E1.4: the recipe is now a
// `classNameForState` hook (like the Item) — the factory resolves it with Base UI's
// `SelectTriggerState` so the disabled chroma flips off Base UI's render state (which carries
// the Root-context disabled), NOT a `props.disabled` the context-disabled trigger never gets.
// SelectPrimitive.Trigger is a COMPONENT, so the function className clears the factory's
// `as`-guard (which throws only for an INTRINSIC string `as`).
const _SelectTrigger = createAtomicComponent(SelectPrimitive.Trigger, {
  extensions: [useScaleCascade, useStateLayer, useSelectTriggerRecipe],
});

export interface SelectTriggerProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + nested `sx` tier-2
   *  atomic overrides (full-frame surface — box geometry is author-overridable). The recipe
   *  bundles `sx` and runs LAST, so `aui.sx` wins over the state-layer focus defaults by axis
   *  role. `disabled` stays native (not in aui). */
  aui?: SelectTriggerAui;
  /** Placeholder shortcut for the AUTO-rendered <Select.Value>. Ignored (dev-warn) when a
   *  <Select.Value> is composed among children — the composed part owns the placeholder. */
  placeholder?: React.ReactNode;
}

// The Trigger wrapper (COMPOSITION-DRIVEN chevron, 2026-06-16). The selected-value display ALWAYS
// renders (it is a value picker): the auto <Select.Value> shows UNLESS the consumer composed their
// own <Select.Value>. The disclosure chevron is COMPOSITION-ONLY (IDENTICAL to Dropdown/Accordion):
// it renders ONLY if the consumer composes a <Select.Chevron> — there is NO auto chevron and NO
// `rotateOnOpen` prop (removed). `splitTriggerChildren` separates a composed <Select.Chevron> from
// the body by part identity (recursing fragments); `composeChevron` injects the scale-matched default
// glyph + stamps `data-aui-rotate` (childless → default glyph + auto-rotate; custom content → as
// authored). A placeable <Select.Icon> simply flows through the body.
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { children, placeholder, ...rest },
  ref
) {
  const inheritedScale = useAuiScale();
  // The chevron is sized by the trigger's EFFECTIVE TIER (profile-independent): own `aui.scale` ??
  // the cascaded component scale (Select.Root `aui={{ scale }}`) ?? the Trigger vocab default. READ
  // the vocab default rather than a literal so the chevron can't drift from the trigger tier.
  const triggerScale: SelectScale = resolveAuiScale(
    (rest as { aui?: SelectTriggerAui }).aui?.scale,
    inheritedScale,
    SELECT_TRIGGER_VOCAB.defaults.scale as SelectScale,
  );
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade
  // (color/shape/elevation/sx) under the trigger's own `aui` — own axis always wins.
  const mergedAui = useSelectFieldMergedAui((rest as { aui?: SelectTriggerAui }).aui);
  // Split the composed disclosure chevron from the label body (by part identity, recursing AND
  // FLATTENING fragments — `splitTriggerChildren` pushes a fragment's children flat into `body`).
  const { body, chevrons } = splitTriggerChildren(children, SelectChevron);
  // Detect a composed <Select.Value> from the FLATTENED body (NOT `hasPartChild(children)`, which
  // only walks DIRECT children — a fragment-wrapped `<><Select.Value/><Select.Chevron/></>` would
  // slip past it and double-render the value alongside the auto one). The split already flattened
  // fragments, so a fragment-wrapped Value is now in `body` and detected here.
  const composedValue = body.some((c) => React.isValidElement(c) && c.type === SelectValue);
  const composedChevron = composeChevron(chevrons[0], {
    scale: triggerScale,
    rotateOnOpen: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    if (composedValue && placeholder !== undefined) {
      console.warn(
        '[atomic-aui] <Select.Trigger> got a `placeholder` prop alongside a composed ' +
          '<Select.Value>; the composed part owns the placeholder — set `placeholder` on the ' +
          'composed <Select.Value> instead, or drop it to use the auto <Select.Value>.'
      );
    }
    // a11y (WCAG 4.1.2): warn on a nameless trigger. Select is a value picker — the auto/composed
    // <Select.Value> ALWAYS renders the selected value (or, before selection, the `placeholder`) as
    // visible text, so the trigger carries a visible accessible name AS LONG AS the picker has a
    // non-empty placeholder OR a selectable value. We can't see the runtime value here, so treat a
    // non-empty `placeholder` as the name source (covers the unselected state); a composed
    // <Select.Value> with its own placeholder/children is likewise a name. We ONLY warn when the
    // author has BOTH blanked the placeholder (empty string) AND supplied no label/visible children —
    // the deliberately-nameless case. (Default `placeholder === undefined` is treated as named since
    // Base UI's Value still shows the selected value text.)
    const placeholderName =
      placeholder === undefined ||
      (typeof placeholder === 'string' ? placeholder.trim() !== '' : placeholder != null)
        ? 'value'
        : undefined;
    warnIfNoAccessibleName(
      [children, composedValue ? 'value' : placeholderName],
      rest as Record<string, unknown>,
      'Select.Trigger',
    );
  }

  // Value ALWAYS renders (it is a value picker): the BODY first (any composed Value + a leading
  // placeable <Select.Icon> + label content, in the consumer's order), then the auto <Select.Value>
  // when none is composed (so a leading `<Select.Icon/>` precedes the value, not after it), then the
  // composition-only chevron. With a composed <Select.Value> the body owns ordering verbatim.
  const content = (
    <>
      {composedValue ? body : (
        <>
          {body}
          {React.createElement(SelectValue, { placeholder })}
        </>
      )}
      {composedChevron}
    </>
  );

  return React.createElement(
    _SelectTrigger as React.ElementType,
    { ref, ...rest, aui: mergedAui },
    content
  );
});
SelectTrigger.displayName = 'Select.Trigger';

// ─── Select.Portal — structural passthrough (P2.2) ───────────────────────────────
// Base UI's Portal renders the popup tree to `document.body` by default. That's FINE in the
// MVP: theming no longer depends on the portal's mount location, because <Select.Positioner>
// re-stamps the identity `data-aui-*` attrs on the portaled host (see below) so `--theme-*`/
// `--paint-*` resolve there and inherit into the Popup + Items. We do NOT inject a `container`
// in the MVP (container injection was deferred per the refined §4 — the re-stamp IS the
// mechanism). A thin wrapper, purely so the part is named by its role and lives in the
// dot-namespace; all Base UI Portal props (incl. `container`) pass straight through.
const SelectPortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Portal>
>(function SelectPortal(props, ref) {
  // Portal forwards a ref to the FloatingPortal node; pass it (and all props) through verbatim.
  return React.createElement(
    SelectPrimitive.Portal as React.ElementType,
    { ref, ...props }
  );
});
SelectPortal.displayName = 'Select.Portal';
export type SelectPortalProps = React.ComponentProps<typeof SelectPortal>;

// ─── Select.Backdrop — portaled overlay marker + identity re-stamp ────────────
// Backdrop can be a sibling of Positioner inside Portal, so it cannot rely on Positioner to
// re-root theme variables. Re-stamp identity directly like Dialog/AlertDialog backdrops.
const SelectBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Backdrop>
>(function SelectBackdrop({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(SelectPrimitive.Backdrop as React.ElementType, {
    ref,
    // DS-wide popup motion: the shared `[data-aui-popup-motion="backdrop"]` opacity fade (state-cascade).
    'data-aui-popup-motion': 'backdrop',
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-select-backdrop', className),
  });
});
SelectBackdrop.displayName = 'Select.Backdrop';
export type SelectBackdropProps = React.ComponentProps<typeof SelectBackdrop>;

// ─── Select.Positioner — THE cascade re-stamp (P2.2, most important) ──────────────
// A portaled overlay renders OUTSIDE the themed root (`[data-aui-brand][data-aui-theme]` on the
// app's `.v6-shell`), so the `--theme-*`/`--paint-*` rails (normal inheriting props) never reach
// it → the Popup + Items would paint UNSTYLED. The Positioner reads the ambient identity via
// `useAuiIdentity()` (carried across the portal by React context) and RE-STAMPS the same
// `data-aui-*` attrs on the Base UI Positioner element, re-rooting the theme selector there so the
// rails re-emit + inherit into the popup subtree. (Browser-only effect — jsdom sees the attrs but
// can't compute the cascade; verified in PROD at P2.3.)
//
// Precedence: a consumer-supplied `data-aui-*` is spread FIRST, then the identity attrs LAST, so
// the ambient identity WINS (the re-stamp is authoritative — the popup must match its themed root).
// `aui-select-positioner` is a marker (NOT an `.aui-frame`) — just the re-stamp host; it carries
// no recipe. side/align/sideOffset/alignOffset + children + ref + any other div props pass through.
//
// ─── `alignItemWithTrigger` — DS default override + the context signal Select.Popup reads ────────
// Base UI's OWN default is `alignItemWithTrigger: true` (the item-aligned OVERLAP-popup mode). Its
// imperative `scrollTop`/`scrollHeight` choreography on the Popup/List in THAT mode (installed
// `SelectPopup.js`) is exactly what makes an unconditional DS-scroll wrap unsafe (see `SelectPopup`'s
// own comment below) — so the two decisions are coupled: which mode is the DS default, and how the
// wrap reacts to it.
//
// USER DECISION (2026-07-10, PINNED — supersedes the earlier `scrollArea` opt-in interim): the DS
// OVERRIDES Base UI's default to `alignItemWithTrigger: false` (the anchored-popover mode — same
// anatomy family as Dropdown's popup). Evidence: EVERY ADC Select call site hand-writes
// `alignItemWithTrigger={false} side="bottom"` (`apps/adc/src/.../BaseMaterialSection.tsx:299-302`,
// comment: "open BELOW the trigger, not overlaying it") — the overlap mode was never actually
// consumed. A consumer may still opt back IN per-instance (`alignItemWithTrigger={true}`); the
// context below lets `Select.Popup` detect that live and step its wrap aside automatically — never a
// silent scrollTop conflict (GUARD, not a manual escape-hatch prop).
const SelectAlignItemWithTriggerContext = React.createContext<boolean>(false);
const SelectPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Positioner>
>(function SelectPositioner({ className, alignItemWithTrigger = false, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(
    SelectAlignItemWithTriggerContext.Provider,
    { value: alignItemWithTrigger },
    React.createElement(
      SelectPrimitive.Positioner as React.ElementType,
      {
        ref,
        alignItemWithTrigger, // the DS-defaulted value (false unless the consumer opts back in)
        ...rest, // consumer data-aui-* (if any) FIRST …
        ...dataAttrs, // … ambient identity LAST → identity wins (authoritative re-stamp)
        // Base UI parts accept `className?: string | ((state) => string)`. Prepend the marker
        // BOTH forms — resolve a function className with the part's render `state` (else
        // `mergeAuiClasses` would `.split()` a function and crash + drop state-aware classes).
        className: prependMarkerClassName('aui-select-positioner', className),
      }
    )
  );
});
SelectPositioner.displayName = 'Select.Positioner';
export type SelectPositionerProps = React.ComponentProps<typeof SelectPositioner>;

// ─── Select.Popup — tier-3 surface frame (P2.2), NO useStateLayer ────────────────
// The floating listbox surface: a tier-3 `.aui-frame` surface card via the MAIN factory, recipe
// ONLY (useSelectPopupRecipe) — NO `useStateLayer`: a surface has no hover/focus overlay. The
// recipe gives the bordered surface (surface/solid/md/soft) AND the default float shadow:
// `elevation: 4` is now pinned in SELECT_POPUP_VOCAB.defaults, so buildLeafClasses emits
// `aui-elevation-4` for an un-customized popup. A consumer overrides it via `aui={{ elevation }}`
// or `className="aui-elevation-N"` (mergeAuiClasses dedups the role, last-wins).
const _SelectPopup = createAtomicComponent(SelectPrimitive.Popup, {
  extensions: [useScaleCascade, useSelectPopupRecipe],
});

// ─── Select.ScrollArea — CONFIG-CARRIER override for the ALWAYS-ON DS-scroll wrapper ─────────────
// A config sentinel (SAME detection mechanism as `Textarea.ScrollArea`/`Dropdown.ScrollArea` —
// `textarea.tsx:169-172`'s "the ONLY accepted child … composing it opts [it] into the DS-scrolled
// mode" contract, detected via `findPartChild(children, TextareaScrollArea)` at `textarea.tsx:466`):
// renders NOTHING itself. Compose it as a SIBLING of the real `Select.Item`s to override the wrap's
// DS-thumb styling (`scrollbarSize`/`scrollbarThumbHover`/`scrollbarColor`). POST the 2026-07-10
// always-on decision (see `SelectPositioner`'s `alignItemWithTrigger` doc above) the wrap is ALREADY
// active by default, so this part's role is now IDENTICAL to `Dropdown.ScrollArea`'s — pure
// parameterization, never an activation signal. It has NO effect (dev-warned) while
// `alignItemWithTrigger={true}` is active, since the wrap itself steps aside then. Never
// double-wraps: exactly one Root/Viewport/Scrollbar renders; composing this part only parameterizes
// it (USER DIRECTIVE 3b, 2026-07-10; team-lead's pin, same date: built-in = zero-config default,
// explicit = full control).
export interface SelectScrollAreaProps {
  /** DS scroll-thumb thickness — forwarded to the wrapping Scrollbar/Thumb (number → `--p-px-<n>`
   *  rail; string → verbatim). Unset = the CSS 8px fallback every AtomicAUI View.ScrollArea uses. */
  scrollbarSize?: number | string;
  /** Thumb HOVER color override — any CSS color; sets `--aui-scrollbar-thumb-hover`. */
  scrollbarThumbHover?: string;
  /** Resting thumb COLOR — the foreground anchor (same value space as `aui.sx.foreground`). Unset
   *  mirrors the ambient foreground. */
  scrollbarColor?: ScrollAreaThumbColor;
}
/** Config-carrier — never rendered. Contributes no DOM, so it is safe to compose alongside the real
 *  Select.Item rows with zero visual/structural side effect. */
const SelectScrollArea: React.FC<SelectScrollAreaProps> = () => null;
SelectScrollArea.displayName = 'Select.ScrollArea';

export interface SelectPopupProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.Popup>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + the `elevation`
   *  axis (default `4` → `aui-elevation-4`) + nested `sx` tier-2 atomic overrides (full-frame
   *  surface — the card surface/border/radius/anatomy are author-overridable via `sx`). The
   *  recipe runs LAST so `aui.sx` wins by axis role; `aui.elevation` overrides the default float. */
  aui?: SelectPopupAui;
  /** Match the popup width to the trigger (anchor) width EXACTLY. Sets
   *  `--aui-width: var(--anchor-width)` (Base UI sets `--anchor-width` on the Positioner; it
   *  inherits to the Popup) so the popup both grows AND shrinks to the trigger; long text wraps
   *  within that width. Not an `aui` axis — destructured out, never hits the DOM; consumer `style`
   *  wins. Mirrors Dropdown.Popup. */
  matchTriggerWidth?: boolean;
  /** Cap the listbox height. UNSET (default) = AUTO: the popup fits the space between the trigger and
   *  the viewport edge (`--available-height`) and scrolls. SET = SPECIFIED: cap at this height, but
   *  STILL shrink to the viewport so it never overflows (`min(maxHeight, available)`). A `number` is
   *  treated as `px`; a string is any CSS length (`'20rem'`, `'50vh'`). Sets the
   *  `--aui-popup-max-block-size` hook — NOT an `aui` axis; destructured out, never a DOM attr;
   *  consumer `style` wins. Mirrors Dropdown.Popup. */
  maxHeight?: number | string;
}

// The bound moves from Popup's own `max-block-size` to the nested Viewport's — see `SelectPositioner`'s
// `alignItemWithTrigger` doc above for why the wrap is ALWAYS-ON except in aligned mode. Mirrors
// `DROPDOWN_SCROLL_MAX_BLOCK_SIZE` verbatim (byte-identical sibling mechanism): `min(cap, available)`
// minus Popup's own resolved block padding (`--aui-padding-block-start`/`-end`, `@property
// inherits:true`, G14), so the wrapped content area matches the unwrapped popup's content-box exactly.
const SELECT_SCROLL_MAX_BLOCK_SIZE =
  'min(' +
  'calc(var(--aui-popup-max-block-size, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px)), ' +
  'calc(var(--available-height, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px))' +
  ')';

// Thin forwardRef wrapper for the correct displayName + ref type. Elevation is now a vocab axis
// (SELECT_POPUP_VOCAB.defaults.elevation: 4) so the recipe emits the default float — no className
// injection needed. `className` passes through natively and still wins the elevation role last.
//
// `matchTriggerWidth` (mirrors Dropdown.Popup): a boolean structural prop (NOT an `aui` axis) —
// destructured out so it never reaches the DOM. When set, it injects an inline
// `--aui-width: var(--anchor-width)` (Base UI sets `--anchor-width` on the Positioner; it INHERITS
// down to the Popup). The frame base map reads `width: var(--aui-width, auto)`, so the popup's width
// becomes EXACTLY the trigger width — it both grows AND shrinks to match (min-width only floored it,
// which never shrank a wider popup → it read as "not matching"). Long item text wraps within that
// width, as in a native select listbox. We set the `--aui-*` HOOK, never raw `width`. The
// `'--anchor-width'` literal is hardcoded (not imported — dup-`@base-ui` hazard). Consumer `style`
// is spread LAST so an explicit override wins.
//
// ── The ALWAYS-ON DS-scroll wrap (USER DECISION 2026-07-10, supersedes the earlier `scrollArea` opt-in
// prop — REMOVED, no back-compat shim needed: nothing in-tree referenced it) ──────────────────────────
// The wrap is active UNLESS `alignItemWithTrigger={true}` is active on the ANCESTOR `Select.Positioner`
// (read via `SelectAlignItemWithTriggerContext` — see its doc on `SelectPositioner` above). This is a
// GUARD, not a manual prop: Base UI's OWN imperative scrollTop choreography in aligned mode is the one
// case a naive wrap would silently fight, so the wrap steps ASIDE automatically the instant a consumer
// opts back into that mode — never a silent conflict, and never something the consumer has to remember
// to toggle off. Byte-identical mechanism to `Dropdown.Popup` otherwise (mirrors it verbatim: raw
// unstyled `ScrollArea.Root` + the styled Viewport/Scrollbar, `maxBlockSize:'none'` neutralizing
// Popup's own CSS rule).
const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(function SelectPopup(
  { matchTriggerWidth, maxHeight, style, children, ...rest },
  ref
) {
  const alignItemWithTriggerActive = React.useContext(SelectAlignItemWithTriggerContext);
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // popup's own `aui` — own axis always wins.
  const mergedAui = useSelectFieldMergedAui((rest as { aui?: SelectPopupAui }).aui);
  const scrollAreaPart = findPartChild(children, SelectScrollArea);
  const scrollAreaProps = scrollAreaPart?.props as SelectScrollAreaProps | undefined;
  // ALWAYS-ON except when the ancestor Positioner has opted back into Base UI's own aligned-mode
  // scroll choreography — see the block comment above.
  const useScrollArea = !alignItemWithTriggerActive;

  if (process.env.NODE_ENV !== 'production' && alignItemWithTriggerActive) {
    // Base UI's ScrollUpArrow/ScrollDownArrow AND a composed <Select.ScrollArea/> both target/
    // Composed ScrollUpArrow/ScrollDownArrow are NOT warned here — aligned mode is exactly where
    // they're VALID (their original, still-correct designed use case).
    if (scrollAreaPart != null) {
      console.warn(
        '[atomic-aui] <Select.ScrollArea/> composed while <Select.Positioner alignItemWithTrigger={true}> ' +
          'is active — the DS-scroll wrap steps aside in aligned mode (Base UI owns scrollTop there via ' +
          "installed SelectPopup.js), so this part's config has no effect. Drop `alignItemWithTrigger` " +
          'or the composed part.'
      );
    }
  } else if (process.env.NODE_ENV !== 'production' && useScrollArea) {
    // Base UI's ScrollUpArrow/ScrollDownArrow read/write `scrollTop` DIRECTLY on `listElement ??
    // popupRef.current` (installed `SelectScrollArrow.js`) — the SAME element the wrap makes inert
    // (scroll ownership moves to the nested Viewport) whenever it's ACTIVE, i.e. now the DEFAULT.
    // VERDICT (re-decided for always-on, 2026-07-10): NOT trivial to retarget them at the Viewport —
    // `SelectScrollArrow` is an `@internal` Base UI component reading its OWN root-context refs, not a
    // public extension point; forking it would fight Base UI. They remain valid ONLY in aligned mode.
    if (hasPartChild(children, SelectScrollUpArrow) || hasPartChild(children, SelectScrollDownArrow)) {
      console.warn(
        '[atomic-aui] <Select.ScrollUpArrow>/<Select.ScrollDownArrow> composed while the DS-scroll wrap ' +
          'is active (the default, unless <Select.Positioner alignItemWithTrigger={true}>) — Base UI\'s ' +
          'scroll arrows manipulate the Popup/List scrollTop directly, which the wrap makes inert. They ' +
          'apply ONLY in aligned mode; the DS thumb is the scroll affordance otherwise.'
      );
    }
  }
  // Inline hooks: the trigger-width match, the explicit height cap, and (unless aligned) neutralizing
  // Popup's own max-block-size once the wrap moves the bound to the nested Viewport. A consumer
  // `style` is spread LAST so it wins. `maxHeight` number → px.
  const widthStyle = {
    ...(matchTriggerWidth ? { '--aui-width': 'var(--anchor-width)' } : {}),
    ...(maxHeight != null ? { '--aui-popup-max-block-size': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
    ...(useScrollArea ? { maxBlockSize: 'none' } : {}),
  } as React.CSSProperties;
  const hasHookStyle = matchTriggerWidth != null || maxHeight != null || useScrollArea;
  // Base UI Popup `style` may be an object OR a `(state) => CSSProperties` function; preserve both
  // and keep the width hook UNDER the resolved consumer style (consumer wins). Pass nothing when
  // neither is set.
  let mergedStyle: SelectPopupProps['style'] | undefined;
  if (typeof style === 'function') {
    const styleFn = style;
    mergedStyle = (state: unknown) =>
      ({ ...widthStyle, ...(styleFn as (s: unknown) => React.CSSProperties)(state) });
  } else if (hasHookStyle || style) {
    mergedStyle = { ...widthStyle, ...style };
  }
  // ALWAYS-ON (unless aligned — the GUARD above): the SAME raw Base UI ScrollArea.Root + styled
  // Viewport/Scrollbar Dropdown composes unconditionally wraps the listbox content, moving scroll
  // ownership off Popup. In aligned mode: byte-identical to the pre-existing native `overflow-y:auto`
  // popup. A composed `<Select.ScrollArea/>` PARAMETERIZES the SAME single wrap (never a second one)
  // — USER DIRECTIVE 3b.
  const rootThumbStyle = {
    ...(scrollAreaProps?.scrollbarSize != null
      ? { '--aui-scrollbar-size': typeof scrollAreaProps.scrollbarSize === 'number' ? `var(--p-px-${scrollAreaProps.scrollbarSize})` : scrollAreaProps.scrollbarSize }
      : {}),
    ...(scrollAreaProps?.scrollbarThumbHover != null ? { '--aui-scrollbar-thumb-hover': scrollAreaProps.scrollbarThumbHover } : {}),
  } as React.CSSProperties;
  // VERTICAL-ONLY (USER DIRECTIVE 5, 2026-07-10): `overflowX: 'hidden'` is a `style` PROP, not a
  // stylesheet rule — mirrors `Dropdown.Popup` verbatim (see its comment for the full mechanism:
  // Base UI's `ScrollAreaViewport.js` sets `style:{overflow:'scroll'}` inline and merges consumer
  // `elementProps` LAST, so only an inline longhand from our side can win that axis — the SAME
  // mechanism `View.ScrollArea`'s own `scrollAxis` prop already uses). Only ONE Scrollbar is EVER
  // composed below (`orientation:'vertical'`).
  const content = useScrollArea
    ? React.createElement(
        ScrollAreaPrimitive.Root as React.ElementType,
        Object.keys(rootThumbStyle).length > 0 ? { style: rootThumbStyle } : null,
        React.createElement(
          ScrollAreaViewport,
          { style: { maxBlockSize: SELECT_SCROLL_MAX_BLOCK_SIZE, overflowX: 'hidden' } as React.CSSProperties },
          children,
        ),
        React.createElement(ScrollAreaScrollbar, {
          orientation: 'vertical',
          ...(scrollAreaProps?.scrollbarColor != null ? { thumbColor: scrollAreaProps.scrollbarColor } : {}),
        }),
      )
    : children;
  return React.createElement(
    _SelectPopup as React.ElementType,
    {
      ref,
      // DS-wide popup motion: the shared `[data-aui-popup-motion="anchored"]` scale+fade (state-cascade).
      'data-aui-popup-motion': 'anchored',
      ...(mergedStyle !== undefined ? { style: mergedStyle } : {}),
      ...rest,
      aui: mergedAui,
    },
    content,
  );
});
SelectPopup.displayName = 'Select.Popup';

// ─── Select.List — tier-1 marker (P2.2) ──────────────────────────────────────────
// The item container / scroll viewport. Marker only (no aui) — its appearance is the inherited
// Popup surface; layout/scroll behavior is Base UI's.
const SelectList = createAtomicPart<React.ComponentProps<typeof SelectPrimitive.List>>(
  SelectPrimitive.List,
  'aui-select-list'
);
SelectList.displayName = 'Select.List';
export type SelectListProps = React.ComponentProps<typeof SelectList>;

// ─── Select.Arrow + scroll affordances — marker-only Base UI parts ────────────
// The arrow is a decorative rotated diamond whose marker HARDCODES its fill + edge color
// (`_state-cascade.scss` `.aui-select-arrow`), so it cannot honor an `aui.sx` box surface — it is
// genuinely marker-only. (It carried a stray `styleable: true` that advertised an `aui` slot it could
// never apply; removed 2026-06-11 so it stops claiming a false affordance.)
const SelectArrow = createAtomicPart<
  React.ComponentProps<typeof SelectPrimitive.Arrow>
>(SelectPrimitive.Arrow, 'aui-select-arrow');
SelectArrow.displayName = 'Select.Arrow';
export type SelectArrowProps = React.ComponentProps<typeof SelectArrow>;

const SelectScrollUpArrow = createAtomicPart<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>
>(
  SelectPrimitive.ScrollUpArrow,
  'aui-select-scroll-up-arrow'
);
SelectScrollUpArrow.displayName = 'Select.ScrollUpArrow';
export type SelectScrollUpArrowProps = React.ComponentProps<typeof SelectScrollUpArrow>;

const SelectScrollDownArrow = createAtomicPart<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>
>(
  SelectPrimitive.ScrollDownArrow,
  'aui-select-scroll-down-arrow'
);
SelectScrollDownArrow.displayName = 'Select.ScrollDownArrow';
export type SelectScrollDownArrowProps = React.ComponentProps<typeof SelectScrollDownArrow>;

// ─── Select groups + separator — Base UI structure with Atomic markers ────────
const SelectGroup = createAtomicPart<React.ComponentProps<typeof SelectPrimitive.Group>>(
  SelectPrimitive.Group,
  'aui-select-group'
);
SelectGroup.displayName = 'Select.Group';
export type SelectGroupProps = React.ComponentProps<typeof SelectGroup>;

// Select.GroupLabel — a caption row labelling its Group (<div>, Base UI wires aria-labelledby).
// A FULL BOX frame (USER DIRECTIVE 11, 2026-07-10 — byte-identical mirror of Dropdown.GroupLabel,
// `dropdown.tsx:527-547`), MIRRORING Select.Item's geometry (it reads the scale cascade and emits
// the same `aui-color-text-surface` + `aui-scale-default-<tier>` cells), so its inline padding
// matches the items beneath it and tracks the tier — instead of the old bare marker whose CSS
// hand-coded a `--p-px-12` literal that drifted when the default went md→sm. A flat `text`-paint
// box = NO fill; the caption look (muted color, small uppercase typescale, semibold, caption block
// rhythm) overrides in `_state-cascade.scss`.
const _SelectGroupLabel = createAtomicComponent(SelectPrimitive.GroupLabel, {
  extensions: [useScaleCascade, useSelectGroupLabelRecipe],
});
export interface SelectGroupLabelProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.GroupLabel>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + FULL-frame `sx`
   *  (`AuiFrameStyleProps`). Same box shape as `Select.Item`; defaults to a flat fill-less caption. */
  aui?: SelectGroupLabelAui;
}
const SelectGroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  function SelectGroupLabel({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // group label's own `aui` — own axis always wins.
    const mergedAui = useSelectFieldMergedAui(aui);
    return React.createElement(_SelectGroupLabel as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
SelectGroupLabel.displayName = 'Select.GroupLabel';

const SelectSeparator = createAtomicPart<React.ComponentProps<typeof SelectPrimitive.Separator>>(
  SelectPrimitive.Separator,
  'aui-select-separator'
);
SelectSeparator.displayName = 'Select.Separator';
export type SelectSeparatorProps = React.ComponentProps<typeof SelectSeparator>;

// ─── Select.ItemText — tier-1 marker (the row label) ─────────────────────────────
// The row's text label (Base UI also reads it for typeahead matching). Marker only (no
// aui) — its color is the inherited row box color. displayName 'Select.ItemText'.
const SelectItemText = createAtomicPart<React.ComponentProps<typeof SelectPrimitive.ItemText>>(
  SelectPrimitive.ItemText,
  'aui-select-item-text'
);
SelectItemText.displayName = 'Select.ItemText';
export type SelectItemTextProps = React.ComponentProps<typeof SelectItemText>;

// ─── Select.ItemIndicator — tier-2 check puck (cascade-reader, styleable) ─────────
// Mirrors Checkbox.Indicator: a thin wrapper over Base UI's `Select.ItemIndicator` (a
// <span>) that bakes the `aui-select-item-indicator` marker + `keepMounted: true`. Base UI
// UNMOUNTS the indicator when the item is unselected — so we keep it mounted, and rather than
// keying visibility off the indicator's OWN attrs we gate it off the ITEM's `[data-selected]`
// (robust regardless of the indicator's own state attrs / keepMounted), reserving the check
// column so selection doesn't reflow the row. `styleable` opts into
// the narrow `aui={{color?, sx?}}` slot (`color` → the part-local `aui-fg-<c>` foreground
// anchor; the default glyph fills `currentColor` → inherits the row's resolved color). The
// default glyph is the same inline SVG check the Checkbox indicator uses (consistency).
// FULL-surface sx (G12 container-part opt-in, 2026-06-16): the indicator is a styleable CONTAINER
// box (IDENTICAL to Checkbox.Indicator), so it exposes the WHOLE 32-axis sx surface +
// color/paint/scale/profile/shape/elevation. Its marker (`.aui-select-item-indicator` in
// `_state-cascade.scss`) READS every anatomy override hook; the DEFAULT size stays the icon-size
// check column (unlike Checkbox's 100% fill) unless `aui.sx.width`/`height` overrides it.
const _SelectItemIndicator = createAtomicPart<
  React.ComponentProps<typeof SelectPrimitive.ItemIndicator> & PartStyleProps
>(SelectPrimitive.ItemIndicator, 'aui-select-item-indicator', {
  // `children: null` DEFAULT (2026-06-26, user-reported #74): Base UI's `Select.ItemIndicator`
  // hard-codes a default child `children: '✔️'` (a heavy-check EMOJI — see
  // @base-ui/react/select/item-indicator/SelectItemIndicator.js). A consumer composing a CHILDLESS
  // `<Select.ItemIndicator />` (intending "no glyph") passes `children: undefined`, which does NOT
  // override the Base UI default → the ✔️ emoji leaks into the row. Baking `children: null` here makes
  // a childless indicator render nothing; the AUTO path + any consumer that passes explicit children
  // (e.g. the DS `DefaultCheckGlyph`) still override it via `...domProps` (createAtomicPart merges
  // baseProps BEFORE consumer props).
  baseProps: { keepMounted: true, 'aria-hidden': true, children: null },
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'no-padding',
});
_SelectItemIndicator.displayName = 'Select.ItemIndicator';

export type SelectItemIndicatorProps = React.ComponentProps<typeof _SelectItemIndicator>;

// The indicator DEFAULTS to `profile: 'no-padding'` (a bare glyph column — no box padding). G14
// gotcha: `--aui-padding-*` is `@property inherits:true` and the generated scale cells SET it, so a
// child that doesn't emit its OWN scale cell INHERITS the row's `aui-scale-default-sm` padding (the
// `no-padding` default would be silently inert — the marker reads the inherited padded hook). So the
// indicator emits its OWN `aui-scale-no-padding-<tier>` cell at the CASCADED tier (resolved from the
// scale cascade — `scale` still tracks the row, it's just materialized so the no-padding cell can
// RE-SET `--aui-padding-*: 0`). A consumer `aui.profile`/`aui.scale` still wins. `color` cascades
// (the glyph fills `--aui-fg`/currentColor); paint/shape/elevation default to the no-box styleable
// defaults (no class emitted).
const SelectItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  function SelectItemIndicator({ aui, tabIndex, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // indicator's own `aui` BEFORE scale resolution — own axis always wins; scale is untouched by
    // the merge (Field forwards color/shape/elevation/sx only — scale flows via the scale rail).
    const fieldMergedAui = useSelectFieldMergedAui(aui as FieldMergeableAui | undefined);
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      (fieldMergedAui as { scale?: SelectScale } | undefined)?.scale,
      inheritedScale,
      SELECT_ITEM_VOCAB.defaults.scale as SelectScale,
    );
    const resolvedAui = React.useMemo(
      () => ({ profile: 'no-padding' as const, ...(fieldMergedAui as object), scale: resolvedScale }),
      [fieldMergedAui, resolvedScale],
    );
    // The indicator is ALWAYS decorative (baked `aria-hidden: true` on `_SelectItemIndicator`), so a
    // consumer-passed `tabIndex` must never make it focusable — force it to `-1` (hidden tab stop).
    return React.createElement(_SelectItemIndicator as React.ElementType, {
      ref,
      ...rest,
      tabIndex: guardTabIndexForAriaHidden(tabIndex as number | undefined, true),
      aui: resolvedAui,
    });
  },
);
SelectItemIndicator.displayName = 'Select.ItemIndicator';

// The default check glyph (mirrors checkbox.tsx's inline SVG — NOT <Icon>, for consistency
// with the other indicator parts; sized off `--scale-icon-size` via the indicator marker CSS).
const DefaultCheckGlyph = (
  <svg className="aui-select-item-glyph" viewBox="0 0 16 16" focusable="false" width="1em" height="1em">
    <path d="M3.5 8.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Select.Item — tier-3 stateful ROW (main factory + select-item recipe) ────────
// A real Base UI Select Item (a <div role="option">), so it goes through the MAIN factory
// (NOT createAtomicPart — tiers 1–2 only). useStateLayer runs FIRST (appends `aui-stateful`
// → the highlight `::after` overlay host + focus), useSelectItemRecipe runs LAST — its
// `classNameForState` is resolved by the factory with Base UI's `{selected, highlighted,
// disabled}` render state (the recipe reads `{selected, disabled}`, ignores `highlighted`),
// painting the per-state row appearance. The factory's function-className `as`-guard throws
// ONLY for an INTRINSIC string `as`; SelectPrimitive.Item is a COMPONENT, so the per-state
// function className is fine. The recipe's marker `aui-select-item` lands on the rendered
// <div> — so the P0.3 state CSS ([data-highlighted]/[data-selected]) targets it automatically.
const _SelectItem = createAtomicComponent(SelectPrimitive.Item, {
  extensions: [useScaleCascade, useStateLayer, useSelectItemRecipe],
});

export interface SelectItemProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + per-state
   *  appearance (`states.unselected` / `states.selected`) + nested `sx` (the FULL `AuiFrameStyleProps`
   *  surface — G12 row-part rework 2026-06-13: the row reads its anatomy hooks, so an sx geometry
   *  override resolves live; `min*` included). `scale` stays top-level (geometry must not shift
   *  per-state); `disabled` stays native (Base UI Item prop, not in aui). */
  aui?: SelectItemAui;
}

// AUTO-render the row body — an <Select.ItemText> label (carrying `children`) + a trailing
// <Select.ItemIndicator> check — UNLESS the consumer composed either part among children
// (then they own the row subtree; composed wins). Mirrors checkbox.tsx's auto-render +
// hasPartChild pattern. A consumer writes either `<Select.Item value="x">Apple</Select.Item>`
// (auto) or the fully-composed `<Select.Item><Select.ItemText>…</Select.ItemText>
// <Select.ItemIndicator/></Select.Item>`.
const SelectItem = React.forwardRef<HTMLElement, SelectItemProps>(function SelectItem(
  { children, ...rest },
  ref
) {
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // item's own `aui` — own axis always wins.
  const mergedAui = useSelectItemFieldMergedAui((rest as { aui?: SelectItemAui }).aui);
  const composedText = hasPartChild(children, SelectItemText);
  const composedIndicator = hasPartChild(children, SelectItemIndicator);
  // Composing EITHER part opts the whole row body into manual control (the children are passed
  // straight through). PARTIAL composition is a smell: composing only <Select.ItemText> drops
  // the auto check; composing only <Select.ItemIndicator> leaves the label as a raw text node
  // OUTSIDE <Select.ItemText> (Base UI reads ItemText for typeahead matching, so the label is
  // then unmatched). Dev-warn so the suppressed auto part is visible, not silent — mirroring the
  // checkbox "children but no Indicator" warning intent.
  const composed = composedText || composedIndicator;

  if (process.env.NODE_ENV !== 'production' && composed && !(composedText && composedIndicator)) {
    console.warn(
      '[atomic-aui] <Select.Item> composed only ' +
        (composedText ? '<Select.ItemText>' : '<Select.ItemIndicator>') +
        '; the other auto part is suppressed. Compose BOTH <Select.ItemText> and ' +
        '<Select.ItemIndicator> for full control, or pass a plain label child to use the auto ' +
        'path (which wraps the label in <Select.ItemText> + appends the check indicator).'
    );
  }

  // Composed: pass children straight through to the Base UI Item. Auto: wrap the label in
  // <Select.ItemText> + append the trailing <Select.ItemIndicator> (default check glyph).
  const content = composed ? (
    children
  ) : (
    <>
      {React.createElement(SelectItemText, null, children)}
      {React.createElement(SelectItemIndicator, null, DefaultCheckGlyph)}
    </>
  );

  return React.createElement(
    _SelectItem as React.ElementType,
    { ref, ...rest, aui: mergedAui },
    content
  );
});
SelectItem.displayName = 'Select.Item';

// ─── Select.Root — generics-preserving wrapper (NOT createAtomicComponent) ───────
// Base UI's `Select.Root<Value, Multiple>` renders NO DOM element (behavior + context only).
// The factory's `forwardRef<unknown, AnyProps>` would erase the `<Value, Multiple>` generics
// (and the `onValueChange` `| null` clear-signal), so Root is a plain GENERIC FUNCTION
// COMPONENT that forwards the full value model verbatim. It renders no box itself, but it accepts
// a NARROW `aui={{ scale }}` that SEEDS the scale-only cascade for the parts (Trigger / Popup /
// Item all fall back to it; an own `aui.scale` wins). Only `scale` cascades — color/paint/shape
// are deliberately per-part (a menu's Popup rounds while its rows stay flat; the trigger and popup
// are separate surfaces), so the Root `aui` carries scale and nothing else.
type SelectRootAui = { scale?: SelectScale };
function SelectRoot<Value, Multiple extends boolean | undefined = false>(
  props: SelectRootProps<Value, Multiple> & { aui?: SelectRootAui }
): React.JSX.Element {
  const { aui, children, ...rest } = props;
  return React.createElement(
    SelectPrimitive.Root,
    rest as object,
    React.createElement(AuiScaleProvider, { value: aui?.scale }, children),
  );
}
SelectRoot.displayName = 'Select';

// ─── Assemble + the typing seam ──────────────────────────────────────────────────
// `Object.assign` on a generic function loses the generic call signature (TS collapses it to a
// non-generic call). So we declare the assembled type EXPLICITLY — an interface carrying the
// generic call signature (preserving `<Value, Multiple>`) PLUS the part statics — and cast the
// runtime `Object.assign` result to it. This mirrors button.tsx's `as React.ForwardRefExoticComponent`
// typing seam, adapted to preserve generics through the compound assembly. (Spec §12.2.)
interface SelectComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: SelectRootProps<Value, Multiple> & { aui?: { scale?: SelectScale } }
  ): React.JSX.Element;
  displayName?: string;
  Trigger: typeof SelectTrigger;
  Value: typeof SelectValue;
  Icon: typeof SelectIcon;
  Chevron: typeof SelectChevron;
  // P2.2 — open-surface parts (Portal → Positioner → Popup → List).
  Portal: typeof SelectPortal;
  Backdrop: typeof SelectBackdrop;
  Positioner: typeof SelectPositioner;
  Popup: typeof SelectPopup;
  ScrollArea: typeof SelectScrollArea;
  Arrow: typeof SelectArrow;
  ScrollUpArrow: typeof SelectScrollUpArrow;
  ScrollDownArrow: typeof SelectScrollDownArrow;
  List: typeof SelectList;
  Group: typeof SelectGroup;
  GroupLabel: typeof SelectGroupLabel;
  Separator: typeof SelectSeparator;
  // P3 — the stateful row + its parts (Item → ItemText + ItemIndicator).
  Item: typeof SelectItem;
  ItemText: typeof SelectItemText;
  ItemIndicator: typeof SelectItemIndicator;
}

// Compound component (dot-namespace, like Checkbox/Radio). Keep these statics in sync with
// the `SelectComponent` interface above (the P1 reviewer's note).
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Chevron: SelectChevron,
  Portal: SelectPortal,
  Backdrop: SelectBackdrop,
  Positioner: SelectPositioner,
  Popup: SelectPopup,
  ScrollArea: SelectScrollArea,
  Arrow: SelectArrow,
  ScrollUpArrow: SelectScrollUpArrow,
  ScrollDownArrow: SelectScrollDownArrow,
  List: SelectList,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
}) as SelectComponent;

export default Select;
