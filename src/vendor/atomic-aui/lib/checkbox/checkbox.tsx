// modules/design/atomic-aui/src/lib/checkbox/checkbox.tsx
import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, findPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { useStateLayer } from '../../core/state/use-state-layer';
import { useFieldAui } from '../field/field-context';
import { createControlLabel, renderLabeledControl } from '../label';
import type { ControlLabelProps } from '../label';
import type { PropHook } from '../../core/types';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';
import { ContainedIcon } from '../icon';
import type { ContainedIconAui, ContainedIconProps } from '../icon';
import { useCheckboxRecipe, CHECKBOX_VOCAB } from './use-recipe';
import type { CheckboxAui } from './use-recipe';

// ─── useCheckboxCascade — read the ambient FieldAuiContext (CheckboxGroup / Fieldset / Field) ──────
// A PropHook that merges the inherited cascade axes { color, scale, shape, elevation } UNDER the
// checkbox's OWN aui (own axis always wins) BEFORE the recipe runs. A NO-OP when standalone (the
// default `FieldAuiContext` is empty → nothing merged → byte-identical to before; zero blast radius).
// It is the child side of the user-chosen 4-axis Fieldset-parity cascade for CheckboxGroup. Color
// cascades CLEANLY because every checkbox state is the SAME neutral `surface-alt` (CHECKBOX_VOCAB) —
// an inherited color UNIFORMLY retints the box; selection still lives in the mark glyph. `aui` is
// already a recipe hookProp, so the merged object never reaches the DOM. First in the extensions list.
const useCheckboxCascade: PropHook<{ aui?: CheckboxAui }, { aui?: CheckboxAui }> = (props) => {
  const inherited = useFieldAui();
  const own = props.aui;
  const next: CheckboxAui = { ...own };
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
useCheckboxCascade.hookProps = new Set(['aui']);

type BaseCheckboxRootProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
type BaseCheckboxIndicatorProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>;
type CheckboxIndicatorRenderFn = Extract<
  NonNullable<BaseCheckboxIndicatorProps['render']>,
  (...args: never[]) => React.ReactElement
>;
type CheckboxCheckedChangeHandler = NonNullable<BaseCheckboxRootProps['onCheckedChange']>;
type CheckboxChangeDetails = Parameters<CheckboxCheckedChangeHandler>[1];

// `Checkbox.Indicator` is the CONTAINER part — a thin wrapper over Base UI's `Checkbox.Indicator`
// (Base UI owns data-checked/-unchecked/-indeterminate + Root context). Its `aui` styles the
// container box with the STANDARD `aui` model (color/paint → the context cell, like any frame);
// it does NOT style the glyph. The mark glyph is a separate `Checkbox.Icon` rendered inside it.
const CheckboxIndicator = createAtomicPart<
  React.ComponentProps<typeof CheckboxPrimitive.Indicator> & PartStyleProps
>(CheckboxPrimitive.Indicator, 'aui-checkbox-indicator', {
  baseProps: { keepMounted: true, 'aria-hidden': true },
  styleable: true,
  // FULL-surface sx (2026-06-12): the indicator is a CONTAINER box, and its marker
  // (`.aui-checkbox-indicator` in `_state-cascade.scss`) reads every override hook (size from
  // `--aui-width/height`, padding via composed longhands, gap from `--aui-gap`), so it exposes the
  // SAME full 32-axis sx surface the box does — `min*` INCLUDED + paired via max() to stay square. The
  // shared `PART_SX_AXES` (color family) stays the default for narrow parts (Switch.Thumb, rows).
  sxAxes: FRAME_PART_SX_AXES,
});
CheckboxIndicator.displayName = 'Checkbox.Indicator';
export type CheckboxIndicatorProps = React.ComponentProps<typeof CheckboxIndicator>;

// `Checkbox.Icon` is the MARK GLYPH part — the shipped `ContainedIcon` composed as a checkbox
// part (the same pattern as `Button.Icon`). By default the checkbox auto-renders it (check /
// minus per state) so consumers never compose a raw `ContainedIcon`; to use a custom glyph they
// compose `<Checkbox.Icon name="…">`.
//
// MARK SIZING = pure shared-var INHERITANCE (2026-06-12): the default mark sets NO own
// `aui-icon-size`/`aui-icon-container` class — it INHERITS `--aui-icon-size`/`--aui-icon-container`
// from the checkbox box (both `@property inherits:true`). The box's active per-state scale cell
// (`aui-scale-checkable-<tier>`) sets `--aui-icon-size`, so the mark tracks the box per-state for
// free, AND a root `aui.sx.iconSize`/`iconContainer` (written on the box, 0,1,0) flows down to the
// mark — the model the user asked for: "if root doesn't specify, the icon uses the default context;
// root sx modifies that context; an explicit Checkbox.Icon follows its own." The box's stray
// `--aui-icon-container: 0` (from the checkable profile) is reset to the `100%` fallback in
// `_state-cascade.scss` (`:where(.aui-checkbox)`, 0,0,0) so an unset container fills the indicator
// instead of collapsing, while root sx still wins. `Checkbox.Icon`'s OWN `aui` (color/scale/sx +
// identity) still overrides per axis. Glyph SIZING is PROFILE-DRIVEN (2026-06-12): an explicit
// `scale` resizes the mark CONTAINER (`aui-icon-container-i<n>`) and seeds the glyph FALLBACK, but it
// is NOT a glyph-size override — the glyph follows the inherited authoritative `--aui-icon-size`. To
// resize the mark GLYPH specifically, use the layer-3 `sx.iconSize` (it sets the glyph's own
// authoritative `--aui-icon-size`, beating inheritance) — like every other axis. `color` here sets the
// ICON foreground (a glyph hue) — Icon's native model, the right place to recolor the mark (the
// container's `aui` paints the box, not the mark).
export interface CheckboxIconProps extends Omit<ContainedIconProps, 'aui'> {
  aui?: ContainedIconAui;
}
const CheckboxIcon = React.forwardRef<HTMLSpanElement, CheckboxIconProps>(function CheckboxIcon(
  { aui, ...rest },
  ref,
) {
  // No forced default scale — the mark inherits the box's icon shared-vars; the consumer's `aui`
  // still wins per axis (an explicit `scale` resizes the mark CONTAINER; the glyph-size override is
  // the layer-3 `sx.iconSize`). monotone + aria-hidden are the checkbox-mark defaults (single-path
  // glyph, decorative); a consumer prop in `rest` still overrides them.
  // The cast re-asserts the `name`-XOR-`children` union the distributive `Omit` widens (forwarded
  // verbatim — Checkbox.Icon supports a custom mark too); the discriminant is preserved at the call.
  return React.createElement(ContainedIcon, {
    ref,
    layer: 'monotone',
    'aria-hidden': true,
    ...rest,
    aui,
  } as ContainedIconProps & React.RefAttributes<HTMLSpanElement>);
});
CheckboxIcon.displayName = 'Checkbox.Icon';

// `Checkbox.Label` is the caption part — the shipped `Label` (the user's "refer to the existing Label
// component"), built via the shared control-label factory. When composed as a child, the Checkbox
// wraps a labeled ROW (see the render) so the label text scales WITH the checkbox and clicking it
// toggles the box. Works STANDALONE and inside a Base UI `Field.Item` (the user's two ways).
export type CheckboxLabelProps = ControlLabelProps;
const CheckboxLabel = createControlLabel('Checkbox.Label');

// Base UI `Checkbox.Root` renders a `<span role="checkbox">` with a hidden
// `<input>` beside it (NOT a `<button>`), so the host element / ref is HTMLElement.
export interface CheckboxProps
  extends Omit<BaseCheckboxRootProps, 'color' | 'checked' | 'defaultChecked' | 'onCheckedChange'> {
  /** Unified customisation object: context axes (color/paint/scale/profile/shape/elevation)
   *  + per-state appearance (`states.{unselected,selected,indeterminate}`) + nested `sx`
   *  tier-2 atomic overrides (control surface only — anatomy axes excluded). A top-level axis
   *  applies to every state; `aui.states.<state>.<axis>` overrides it for that state. Geometry
   *  (`scale`/`profile`) MAY now vary per-state, but defaults to stable. */
  aui?: CheckboxAui;
  checked?: BaseCheckboxRootProps['checked'];
  defaultChecked?: BaseCheckboxRootProps['defaultChecked'];
  onCheckedChange?: BaseCheckboxRootProps['onCheckedChange'];
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean, eventDetails: CheckboxChangeDetails) => void;
  /**
   * Mixed-state display, set by CODE ONLY (controlled). A user click resolves an
   * indeterminate box to selected (then unselected) — the consumer is expected to
   * clear `indeterminate` in `onSelectedChange`. Clicking never returns to mixed.
   */
  indeterminate?: boolean;
  disabled?: boolean;
  /**
   * Content escape hatch: replaces the default state-aware ContainedIcon in the
   * auto-rendered indicator.
   * For full control of the indicator element, compose `<Checkbox.Indicator>` as a child
   * instead (the composed part wins; supplying both warns in dev).
   */
  indicator?: React.ReactNode;
}

// useStateLayer runs FIRST (appends stateful + focus-ring defaults), then useCheckboxRecipe
// runs LAST (recipe classes + bundled aui.sx). Because the recipe is the last fragment
// fed to mergeAuiClasses, its `aui.sx` overrides (e.g. aui.sx.focusColor) win by
// axis role over the state-layer defaults — honouring the §5 "sx always wins" contract.
const _CheckboxRoot = createAtomicComponent(CheckboxPrimitive.Root, {
  // useCheckboxCascade FIRST — merge any ambient FieldAuiContext seed (CheckboxGroup/Fieldset/Field)
  // into `aui` before the state layer + recipe run. No-op standalone. Then useStateLayer, then the
  // recipe LAST (so its aui.sx wins by axis role — the §5 "sx always wins" contract).
  extensions: [useCheckboxCascade, useStateLayer, useCheckboxRecipe],
});

// Build the indicator render-prop: shows the mark only when checked/indeterminate, and renders
// `mark` (a composed Checkbox.Icon / raw `indicator` content) or the default state-aware
// `Checkbox.Icon` (check / minus). The mark's per-state SIZE is handled by CSS inheritance (the
// box's active scale cell sets `--aui-icon-size`/`--aui-icon-container`, which the mark inherits),
// so there is no scale to thread through here — see the `Checkbox.Icon` note above.
function makeIndicatorRender(mark: React.ReactNode): CheckboxIndicatorRenderFn {
  return (indicatorProps, state) => {
    const show = !!state.checked || !!state.indeterminate;
    const content = mark !== undefined
      ? mark
      : React.createElement(CheckboxIcon, { name: state.indeterminate ? 'minus' : 'check' });
    return React.createElement('span', indicatorProps, show ? content : null);
  };
}

const CheckboxRoot = React.forwardRef<HTMLElement, CheckboxProps>(function Checkbox(
  {
    selected,
    defaultSelected,
    onSelectedChange,
    checked,
    defaultChecked,
    onCheckedChange,
    indeterminate,
    indicator,
    children,
    className,
    ...rest
  },
  ref
) {
  // SHAPE: Checkbox is square purely because it carries a square-intent profile class (`checkable` by
  // default) — the global "square-intent profile → square box" CSS rule (tokens/_state-cascade.scss)
  // realizes it, with NO component code. `.aui-checkbox` carries only identity/padding.
  // `indeterminate` is a CODE-ONLY display prop: a parent computes "mixed" and is
  // expected to control `selected`. When it's combined with the UNCONTROLLED
  // `defaultSelected` (no `selected`), Base UI's internal uncontrolled `checked`
  // diverges from the `true` this wrapper's callback reports — the box stays stuck
  // on `mixed` while the callback says selected. To keep the rendered state from
  // contradicting the callback, drive `checked` for that one degenerate case
  // (controlled-for-this-interaction): seed from `defaultSelected`, resolve mixed →
  // selected on the first click. Genuine controlled usage (`selected` provided) is
  // untouched. We also warn in dev so consumers move to the supported controlled path.
  const isSelectedControlled = selected !== undefined;
  const isCheckedControlled = checked !== undefined;
  const isControlled = isSelectedControlled || isCheckedControlled;
  const indeterminateUncontrolled = !!indeterminate && !isControlled;
  // Local state for the degenerate uncontrolled-mixed path only: `mixedChecked` is the
  // driven `checked`; `mixedResolved` records that a click cleared the mixed display
  // (the consumer can't clear `indeterminate` because `selected` isn't controlled).
  const [mixedChecked, setMixedChecked] = React.useState<boolean>(!!(defaultSelected ?? defaultChecked));
  const [mixedResolved, setMixedResolved] = React.useState(false);
  // Reset the resolved flag on an `indeterminate` rising edge so a later code-driven
  // re-entry into the mixed state (uncontrolled path) is honoured again. Uses React's
  // canonical "adjust state when a prop changes" pattern (a guarded setState in render,
  // comparing a prev-state snapshot) — pure, no Effect (no double paint), no ref write
  // during render.
  const [prevIndeterminate, setPrevIndeterminate] = React.useState(!!indeterminate);
  if (!!indeterminate !== prevIndeterminate) {
    setPrevIndeterminate(!!indeterminate);
    if (!!indeterminate && mixedResolved) setMixedResolved(false);
  }

  const warnedRef = React.useRef(false);
  if (
    process.env.NODE_ENV !== 'production' &&
    indeterminateUncontrolled &&
    (defaultSelected !== undefined || defaultChecked !== undefined) &&
    !warnedRef.current
  ) {
    warnedRef.current = true;
    console.warn(
      '[atomic-aui] <Checkbox indeterminate> is a code-only, controlled display prop; ' +
        'combine it with a controlled `selected`, not `defaultSelected`. ' +
        'Uncontrolled `defaultSelected + indeterminate` is degenerate.'
    );
  }

  const resolvedChecked = isControlled
    ? (isSelectedControlled ? selected : checked)
    : indeterminateUncontrolled
      ? mixedChecked
      : undefined;
  // Suppress the mixed display once a click has resolved it in the uncontrolled path,
  // so the rendered box matches the driven `checked` (and never contradicts the callback).
  const resolvedIndeterminate = indeterminateUncontrolled && mixedResolved ? false : indeterminate;
  const handleCheckedChange = (next: boolean, details: CheckboxChangeDetails) => {
    // Code-only contract: a click on a mixed box resolves to SELECTED (true), never
    // unselected — even when the underlying value was truthy.
    const reported = resolvedIndeterminate ? true : next;
    if (indeterminateUncontrolled) {
      setMixedChecked(reported);
      setMixedResolved(true);
    }
    onCheckedChange?.(reported, details);
    onSelectedChange?.(reported, details);
  };

  // Composition model — the Indicator is the CONTAINER, the Icon is the MARK glyph:
  //  • compose <Checkbox.Indicator aui={…}> (empty, or wrapping a <Checkbox.Icon>) → CARRIER: its
  //    props style the container while the checkbox still auto-assembles the mark + per-state scale
  //    context inside. So a bare styled indicator STILL shows the mark.
  //  • compose <Checkbox.Icon name="…"> → custom glyph in the auto container.
  //  • compose <Checkbox.Indicator> with NON-Icon children → FULL manual control (verbatim).
  //  • `indicator` prop → raw glyph/content escape hatch.
  //  • nothing → default: auto container + the state-aware default <Checkbox.Icon> (check / minus).
  // The ambient cascade scale (CheckboxGroup/Fieldset/Field), for sizing a composed Checkbox.Label.
  const inheritedScale = useFieldAui().scale;
  // A composed `Checkbox.Label` caption (the shipped Label) — rendered in a labeled ROW beside the
  // box (see the wrap below), NOT inside the box. Detected like the indicator/icon parts.
  const labelEl = findPartChild(children, CheckboxLabel);
  const indicatorEl = findPartChild(children, CheckboxIndicator);
  const indicatorChildren = (indicatorEl?.props as { children?: React.ReactNode } | undefined)?.children;
  const iconEl = findPartChild(children, CheckboxIcon) ?? findPartChild(indicatorChildren, CheckboxIcon);
  // A composed Indicator whose children are NOT a Checkbox.Icon = full manual control (verbatim).
  const indicatorManual = !!indicatorEl
    && React.Children.toArray(indicatorChildren).some((c) => React.isValidElement(c) && c.type !== CheckboxIcon);
  if (process.env.NODE_ENV !== 'production') {
    if (indicatorEl && indicator !== undefined) {
      console.warn(
        '[atomic-aui] <Checkbox> got both an `indicator` prop and a composed ' +
          '<Checkbox.Indicator>; the composed child wins — drop one.'
      );
    } else if (!indicatorEl && !iconEl && !labelEl && indicator === undefined && React.Children.count(children) > 0) {
      console.warn(
        '[atomic-aui] <Checkbox> received children but no <Checkbox.Icon>/<Checkbox.Indicator> among ' +
          'them; they are ignored. Compose <Checkbox.Icon name="…"> for a custom glyph, or ' +
          '<Checkbox.Indicator> to style the container.'
      );
    }
  }
  let content: React.ReactNode;
  if (indicatorManual) {
    // Full manual control — render the consumer's subtree verbatim, MINUS any Checkbox.Label (it is
    // hoisted into the labeled row beside the box, not rendered inside the role=checkbox element).
    content = labelEl
      ? React.Children.toArray(children).filter(
          (c) => !(React.isValidElement(c) && c.type === CheckboxLabel),
        )
      : children;
  } else {
    // Carrier: apply the composed Indicator's props (aui/className/…) to the auto container, and
    // render the composed Checkbox.Icon (or raw `indicator`, or the default) inside it. The mark's
    // per-state size is handled by CSS inheritance (box scale cell → `--aui-icon-*`), so no scale is
    // threaded here. `children`/`render` are stripped — the checkbox owns assembly.
    // Strip `children`/`render` without binding throwaway locals — the checkbox owns assembly.
    const indicatorProps = Object.fromEntries(
      Object.entries(
        (indicatorEl?.props as Record<string, unknown> | undefined) ?? {},
      ).filter(([key]) => key !== 'children' && key !== 'render'),
    );
    const mark: React.ReactNode = iconEl ?? indicator;
    content = React.createElement(CheckboxIndicator, {
      ...indicatorProps,
      render: makeIndicatorRender(mark),
    });
  }

  const boxElement = React.createElement(
    _CheckboxRoot as React.ElementType,
    {
      ref,
      ...rest,
      // The `aui-checkbox` marker (identity) is emitted by CHECKBOX_VOCAB.marker; the box geometry is the
      // global square-intent-profile rule (the `checkable` profile class squares it). Consumer className
      // passes through untouched (folded in last by the factory).
      className,
      checked: resolvedChecked,
      // Only forward `defaultChecked` when the control is genuinely uncontrolled AND
      // not driven by the indeterminate-uncontrolled path (which controls `checked`).
      defaultChecked: isControlled || indeterminateUncontrolled
        ? undefined
        : (defaultSelected ?? defaultChecked),
      // Indeterminate is code-only: clicking a mixed box must resolve to SELECTED,
      // never to unselected — even when `selected` happened to be truthy (Base UI
      // would otherwise toggle the underlying `checked` off and fire `false`). The
      // consumer is expected to clear `indeterminate` in this handler, so subsequent
      // clicks follow Base UI's normal selected ↔ unselected toggle.
      onCheckedChange: handleCheckedChange,
      indeterminate: resolvedIndeterminate,
    },
    // The disabled visual is not modeled here as a child state: the vocab recipe receives
    // Base UI's disabled render state and flips the resolved chroma to the disabled cell.
    content
  );

  // No `Checkbox.Label` child → the bare box, EXACTLY as before (zero blast radius). Otherwise wrap a
  // labeled row: [box] [scale-following Label], associated + click-to-toggle via the shared helper.
  if (!labelEl) return boxElement;
  const resolvedScale: AuiRecipeScale =
    (rest.aui as CheckboxAui | undefined)?.scale ??
    inheritedScale ??
    (CHECKBOX_VOCAB.defaults?.scale as AuiRecipeScale | undefined) ??
    'sm';
  return renderLabeledControl({ boxElement, labelEl, resolvedScale });
});
CheckboxRoot.displayName = 'Checkbox';

// Compound component: `Checkbox` + the `Checkbox.Indicator` container part + the `Checkbox.Icon`
// mark-glyph part (the shipped ContainedIcon). Base UI / Radix dot-namespace idiom.
export const Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
  Icon: CheckboxIcon,
  Label: CheckboxLabel,
});
export default Checkbox;
