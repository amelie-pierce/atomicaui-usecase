// modules/design/atomic-aui/src/lib/radio/radio.tsx
import * as React from 'react';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import type { RadioRootProps as BaseRadioRootProps } from '@base-ui/react/radio';
import type { RadioGroupChangeEventDetails } from '@base-ui/react/radio-group';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, hasPartChild, findPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { useStateLayer } from '../../core/state/use-state-layer';
import { useFieldAui } from '../field/field-context';
import { createControlLabel, renderLabeledControl } from '../label';
import type { ControlLabelProps } from '../label';
import type { PropHook } from '../../core/types';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';
import { useRadioRecipe, RADIO_VOCAB } from './use-recipe';
import type { RadioAui } from './use-recipe';

// ─── useRadioCascade — read the ambient FieldAuiContext (RadioGroup / Fieldset / Field) ───────────
// Mirrors useCheckboxCascade: merges the inherited cascade axes { color, scale, shape, elevation }
// UNDER the radio's OWN aui (own wins) BEFORE the recipe runs. A NO-OP when standalone (empty default
// context → byte-identical, zero blast radius). The child side of the RadioGroup cascade. `aui` is
// already a recipe hookProp so the merged object never reaches the DOM. First in the extensions list.
const useRadioCascade: PropHook<{ aui?: RadioAui }, { aui?: RadioAui }> = (props) => {
  const inherited = useFieldAui();
  const own = props.aui;
  const next: RadioAui = { ...own };
  let changed = false;
  if (own?.color === undefined && inherited.color !== undefined) {
    next.color = inherited.color;
    changed = true;
  }
  if (own?.scale === undefined && inherited.scale !== undefined) {
    next.scale = inherited.scale;
    changed = true;
  }
  if (own?.shape === undefined && inherited.shape !== undefined) {
    next.shape = inherited.shape;
    changed = true;
  }
  if (own?.elevation === undefined && inherited.elevation !== undefined) {
    next.elevation = inherited.elevation;
    changed = true;
  }
  return changed ? { aui: next } : {};
};
useRadioCascade.hookProps = new Set(['aui']);

// ── Base UI Radio wiring decision (verified @base-ui/react 1.5.0) ──────────────
// `Radio.Root` is VALUE-BASED: it requires a `value` prop and derives `checked` from a
// `RadioGroup` context — `RadioRoot.js` does `checked = groupContext ? checkedValue === value
// : value === ''`. There is NO boolean `checked`/`onCheckedChange` prop on the Root (unlike
// Checkbox/Switch). To expose a boolean-`selected` standalone radio we render a MINIMAL
// internal single-item `RadioGroup` around one `Radio.Root` with a fixed sentinel value:
// the group's `value` is the sentinel when `selected`, else `null`.
//   • controlled   → group `value={selected ? SENTINEL : null}`
//   • uncontrolled  → group `defaultValue={defaultSelected ? SENTINEL : undefined}`
//   • a click selects the radio → group fires onValueChange(SENTINEL) → onSelectedChange(true)
// Radio semantics: clicking a selected radio does NOT toggle it off (only one of N) — so the
// primitive fires onSelectedChange(true) on selection; "uncheck" is a group-level concern.
// The factory wraps `Radio.Root` (NOT the group) so the recipe / state layer / classNameForState
// + the `role="radio"` host + data-checked/-unchecked/-disabled all land on the radio itself.
const RADIO_VALUE = 'aui-radio';

// NOTE: RadioGroup moved to a STANDALONE component `lib/radio-group/` (2026-06-28) — it is NO longer
// `Radio.Group`. Import it from the package root (`import { RadioGroup } from '@sstvn-uiux/design-atomic-aui'`)
// or `lib/radio-group`. The internal Base UI `RadioGroupPrimitive` single-item adapter BELOW (the
// standalone-boolean-Radio wiring) is unrelated — it is the Base UI primitive, not the DS RadioGroup.

// The compound indicator part: a thin wrapper over Base UI's `Radio.Indicator` — the CONTAINER box
// (a <span> carrying data-checked/-unchecked/-disabled, kept mounted with `keepMounted`, reading
// its Root's state context with no wiring from us) that fills the radio and centers a `::before`
// dot. It bakes the `aui-radio-indicator` marker the dot CSS keys on. Pure cascade-reader by default
// (the dot fills with the inherited --paint-content).
//
// FULL-surface sx (2026-06-12): the indicator is a CONTAINER box (structurally identical to
// `Checkbox.Indicator`), so it exposes the SAME full 32-axis sx surface the box does (`FRAME_PART_SX_AXES`,
// `min*` INCLUDED + paired via `max()` to stay round) — its marker (`.aui-radio-indicator`) reads every
// anatomy hook. The `::before` dot
// is sized by `--aui-dot-size`; `iconSize`/`iconContainer` are var-correct-but-inert here (a dot,
// no icon). Consumers compose `<Radio><Radio.Indicator/></Radio>` for control; the simple case stays `<Radio/>`.
const RadioIndicator = createAtomicPart<
  React.ComponentProps<typeof RadioPrimitive.Indicator> & PartStyleProps
>(RadioPrimitive.Indicator, 'aui-radio-indicator', {
  baseProps: { keepMounted: true, 'aria-hidden': true },
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES, // container box → FULL sx surface (min* INCLUDED, paired via max() to stay round), like Checkbox.Indicator
});
RadioIndicator.displayName = 'Radio.Indicator';
export type RadioIndicatorProps = React.ComponentProps<typeof RadioIndicator>;

// `Radio.Label` is the caption part — the shipped `Label` (reuses the existing Label component) via
// the shared control-label factory. When composed as a child, Radio wraps a labeled ROW (see the
// render) so the label text scales WITH the radio + clicking it selects. Works standalone and inside
// a Base UI `Field.Item`. Identical mechanism to Checkbox.Label / Switch.Label.
export type RadioLabelProps = ControlLabelProps;
const RadioLabel = createControlLabel('Radio.Label');

// Base UI 1.5.0 `Radio.Root` renders a `<span role="radio">` with a hidden `<input>` beside it,
// so the host element / ref is HTMLElement. Radio has no indeterminate prop or mixed ARIA path.
// It emits data-checked / data-unchecked / data-disabled (also on the Indicator dot).
export interface RadioProps<Value = unknown>
  extends Omit<BaseRadioRootProps<Value>, 'color' | 'value'> {
  /** Unified customisation object: context axes (color/paint/scale/profile/shape/elevation) +
   *  per-state appearance + nested `sx` tier-2 atomic overrides (control surface only). A top-level
   *  axis applies to every state; `aui.states.<state>.<axis>` overrides it. Geometry (`scale`/`profile`)
   *  MAY now vary per-state (unified-states model), but Radio keeps it stable by default. */
  aui?: RadioAui;
  /** Base UI item value. Supplying it without boolean aliases joins the nearest `RadioGroup`. */
  value?: Value;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean, eventDetails: RadioGroupChangeEventDetails) => void;
  /** Form field name — forwarded to the internal RadioGroup so Base UI's hidden input
   *  carries it (the radio input's `name` is group-owned). Needed for native form submission. */
  name?: string;
  /** Form owner for the internal standalone RadioGroup. In grouped mode, put this on `Radio.Group`. */
  form?: string;
  /**
   * Dot escape hatch: replace the auto-rendered selection dot. For full control compose
   * `<Radio.Indicator>` as a child instead (the composed part wins; supplying both warns in dev).
   */
  indicator?: React.ReactNode;
}

// useStateLayer runs FIRST (appends stateful + focus-ring defaults), then useRadioRecipe
// runs LAST (recipe classes + bundled aui.sx). Because the recipe is the last fragment
// fed to mergeAuiClasses, its `aui.sx` overrides (e.g. aui.sx.focusColor) win by
// axis role over the state-layer defaults — honouring the §5 "sx always wins" contract.
// useRadioCascade FIRST — merge any ambient FieldAuiContext seed (RadioGroup/Fieldset/Field) UNDER the
// radio's own aui before the recipe runs (NO-OP standalone). Then useStateLayer, then useRadioRecipe.
const _RadioRoot = createAtomicComponent(RadioPrimitive.Root, {
  extensions: [useRadioCascade, useStateLayer, useRadioRecipe],
});

const RadioRoot = React.forwardRef<HTMLElement, RadioProps>(function Radio(
  {
    selected,
    defaultSelected,
    onSelectedChange,
    disabled,
    readOnly,
    required,
    name,
    form,
    value,
    indicator,
    children,
    className,
    ...rest
  },
  ref
) {
  // SHAPE: Radio is a circle purely because it carries a square-intent profile class (`checkable` by
  // default) + `pill` shape — the global "square-intent profile → square box" CSS rule realizes the
  // square box, with NO component code. `.aui-radio` carries only identity.
  // The ambient group/Fieldset/Field scale (seeded by RadioGroup via FieldAuiProvider) — drives the
  // composed `Radio.Label` caption scale below so the label text tracks the group (the box already does
  // via useRadioCascade). Empty default context standalone → undefined → no-op.
  const inheritedScale = useFieldAui().scale;
  const isControlled = selected !== undefined;
  const hasBooleanAdapter =
    selected !== undefined || defaultSelected !== undefined || onSelectedChange !== undefined;
  const standalone = value === undefined || hasBooleanAdapter;
  const itemValue = standalone && value === undefined ? RADIO_VALUE : value;
  // A composed `Radio.Label` caption (the shipped Label) — rendered in a labeled ROW beside the radio
  // (see the wrap below), NOT inside the role=radio element.
  const labelEl = findPartChild(children, RadioLabel);
  // Auto-render the default dot UNLESS a <Radio.Indicator> is composed (then the consumer
  // owns it). The flat `indicator` prop is the shortcut for the auto path; composing wins.
  const composedIndicator = hasPartChild(children, RadioIndicator);
  if (process.env.NODE_ENV !== 'production') {
    if (composedIndicator && indicator !== undefined) {
      console.warn(
        '[atomic-aui] <Radio> got both an `indicator` prop and a composed <Radio.Indicator>; ' +
          'the composed child wins — drop one.'
      );
    } else if (!composedIndicator && !labelEl && React.Children.count(children) > 0) {
      console.warn(
        '[atomic-aui] <Radio> received children but no <Radio.Indicator> among them; they are ' +
          'ignored. Compose <Radio.Indicator> (optionally fragment-wrapped) or use the `indicator` prop.'
      );
    }
  }
  const content = composedIndicator
    ? // MINUS any Radio.Label (it is hoisted into the labeled row beside the radio, not inside it).
      (labelEl
        ? React.Children.toArray(children).filter((c) => !(React.isValidElement(c) && c.type === RadioLabel))
        : children)
    : React.createElement(
        RadioIndicator,
        indicator !== undefined ? { className: 'aui-radio-indicator--custom' } : undefined,
        indicator
      );

  const radioEl = React.createElement(
    _RadioRoot as React.ElementType,
    {
      ref,
      // The `aui-radio` marker (identity) is emitted by RADIO_VOCAB.marker; the box geometry is the
      // global square-intent-profile rule (the `checkable` profile class squares it). The dot is sized
      // by `--aui-dot-size`. Consumer className passes through untouched (factory folds last).
      ...rest,
      className,
      value: itemValue,
      disabled,
      readOnly,
      required,
    },
    // The dot subtree: a composed <Radio.Indicator> or the auto-rendered default. Both wrap
    // Base UI's Indicator (data-checked/-unchecked/-disabled; CSS shows/hides the dot).
    content
  );

  // The radio control: grouped mode renders the bare radio; standalone mode wraps a minimal internal
  // single-item group (the standalone-vs-group seam collapses to one item, so the boolean `selected`
  // maps to the group's value: sentinel | null/none). `display:contents` so it never alters layout.
  const radioControl = standalone
    ? React.createElement(
        RadioGroupPrimitive,
        {
          style: { display: 'contents' },
          disabled,
          readOnly,
          required,
          // `name` is group-owned in Base UI — forward it so the hidden radio input carries it
          // for native form submission (the radio's own input name comes from the group context).
          name,
          form,
          value: isControlled ? (selected ? itemValue : null) : undefined,
          defaultValue: isControlled ? undefined : defaultSelected ? itemValue : undefined,
          onValueChange: onSelectedChange
            ? (next: unknown, details: RadioGroupChangeEventDetails) => onSelectedChange(next === itemValue, details)
            : undefined,
        },
        radioEl,
      )
    : radioEl;

  // No `Radio.Label` child → the bare radio control, EXACTLY as before (zero blast radius). Otherwise
  // wrap a labeled row: [radio] [scale-following Label], associated + click-to-select via the helper.
  if (!labelEl) return radioControl;
  // The caption scale follows: own ?? ambient group/Fieldset/Field cascade ?? vocab default. Reading
  // `useFieldAui().scale` makes the LABEL text track a RadioGroup/Fieldset scale (the box already does,
  // via useRadioCascade) — mirrors Checkbox.Label (checkbox.tsx). Empty context standalone = no-op.
  const resolvedScale: AuiRecipeScale =
    (rest.aui as RadioAui | undefined)?.scale ??
    (inheritedScale as AuiRecipeScale | undefined) ??
    (RADIO_VOCAB.defaults?.scale as AuiRecipeScale | undefined) ??
    'sm';
  return renderLabeledControl({ boxElement: radioControl, labelEl, resolvedScale });
});
RadioRoot.displayName = 'Radio';

// Compound component: `Radio` + its `Radio.Indicator` / `Radio.Label` parts (Base UI / Radix idiom).
// `Radio.Group` was REMOVED 2026-06-28 — RadioGroup is now a STANDALONE component (`lib/radio-group/`,
// import `{ RadioGroup }` from the package root), mirroring CheckboxGroup / SwitchGroup.
interface RadioComponent extends React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLElement>
> {
  Indicator: typeof RadioIndicator;
  Label: typeof RadioLabel;
}

export const Radio = Object.assign(RadioRoot, {
  Indicator: RadioIndicator,
  Label: RadioLabel,
}) as RadioComponent;
export default Radio;
