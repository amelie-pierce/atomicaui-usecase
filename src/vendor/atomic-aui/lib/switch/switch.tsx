// modules/design/atomic-aui/src/lib/switch/switch.tsx
import * as React from 'react';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, hasPartChild, findPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { useStateLayer } from '../../core/state/use-state-layer';
import { useFieldAui } from '../field/field-context';
import { createControlLabel, renderLabeledControl } from '../label';
import type { ControlLabelProps } from '../label';
import type { PropHook } from '../../core/types';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';
import { useSwitchRecipe, SWITCH_VOCAB } from './use-recipe';
import type { SwitchAui } from './use-recipe';

// ─── useSwitchCascade — read the ambient FieldAuiContext (SwitchGroup / Fieldset / Field) ─────────
// Mirrors useCheckboxCascade/useRadioCascade: merges the inherited cascade axes { color, scale, shape,
// elevation } UNDER the switch's OWN aui (own wins) BEFORE the recipe runs. NO-OP standalone (empty
// default context → byte-identical, zero blast radius). The child side of the SwitchGroup cascade.
// `aui` is already a recipe hookProp so the merged object never reaches the DOM. First in extensions.
const useSwitchCascade: PropHook<{ aui?: SwitchAui }, { aui?: SwitchAui }> = (props) => {
  const inherited = useFieldAui();
  const own = props.aui;
  const next: SwitchAui = { ...own };
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
useSwitchCascade.hookProps = new Set(['aui']);

type BaseSwitchRootProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;
type SwitchCheckedChangeHandler = NonNullable<BaseSwitchRootProps['onCheckedChange']>;
type SwitchChangeDetails = Parameters<SwitchCheckedChangeHandler>[1];
type SwitchHostOwnedRootProp =
  | 'color'
  | 'checked'
  | 'defaultChecked'
  | 'onCheckedChange'
  | 'role'
  | 'aria-checked'
  | 'indeterminate';

// The compound thumb part wraps Base UI's `Switch.Thumb`: a real knob element that
// receives checked/unchecked/disabled data attrs from Base UI and slides through the
// `.aui-switch-thumb` marker CSS. The puck is a SOLID circle whose visible surface IS its
// background, which the marker paints as `var(--aui-fg, currentColor)` — a contrast puck riding
// the track's resolved content color by default. So the thumb uses `colorMode: 'foreground'`:
// `aui.color` tints that fill via the `aui-fg-<c>` foreground anchor (the box context cell would
// set `--paint-fill`, which the puck marker never reads → a dead knob).
//
// FULL-surface sx (G12/G13, 2026-06-28): the thumb is a CONTAINER box, so it exposes the SAME full
// sx surface a frame part does (`FRAME_PART_SX_AXES`) — like Checkbox.Indicator / Radio.Indicator. Its
// marker (`.aui-switch .aui-switch-thumb`) reads EVERY anatomy hook: `--aui-width`/`--aui-height`
// OVERRIDE the dot-size (first var() args), `min*` are PAIRED via max() so a lone `sx.minWidth` keeps
// the puck round, and the padding longhands default 0. The slide TRAVEL derives from `--switch-thumb-size`
// (the same hook), so it stays correct whether the size is the coupled dot-size default or an
// `sx.width`/`height`/`dotSize` override. INERT-BUT-UNIFORM (G13): `paint`/`gap`/typography/`iconSize`
// and `aui.sx.background`/`focusColor`/`focusWidth` set valid hooks the single-fill puck doesn't read.
const SwitchThumb = createAtomicPart<React.ComponentProps<typeof SwitchPrimitive.Thumb> & PartStyleProps>(
  SwitchPrimitive.Thumb,
  'aui-switch-thumb',
  // color → puck fill via --aui-fg; scale resolves under the `switch` profile so a thumb-level
  // `scale` matches the parent's cascade at the same tier (same `--aui-dot-size`). Cascade is default.
  // LIVE: color (→ --aui-fg), scale/dotSize (→ --switch-thumb-size + travel), width/height/min*/padding
  // (the marker reads every hook), elevation, sx foreground/radius*/border*.
  { styleable: true, colorMode: 'foreground', defaultProfile: 'switch', sxAxes: FRAME_PART_SX_AXES }
);
SwitchThumb.displayName = 'Switch.Thumb';
export type SwitchThumbProps = React.ComponentProps<typeof SwitchThumb>;

// `Switch.Label` is the caption part — the shipped `Label` (reuses the existing Label component) via
// the shared control-label factory. When composed as a child, Switch wraps a labeled ROW (see the
// render) so the label text scales WITH the switch + clicking it toggles. Works standalone and inside
// a Base UI `Field.Item`. Identical mechanism to Checkbox.Label / Radio.Label.
export type SwitchLabelProps = ControlLabelProps;
const SwitchLabel = createControlLabel('Switch.Label');

// Base UI 1.5.x `Switch.Root` renders the ARIA switch host plus the hidden
// input used for form semantics, so the host element / ref is HTMLElement.
// Unlike Checkbox it has NO indeterminate / mixed state. The indeterminate
// recipe key is Figma parity only; runtime state is strictly boolean.
// Base UI emits data-checked / data-unchecked / data-disabled on root and thumb.
export interface SwitchProps
  extends Omit<BaseSwitchRootProps, SwitchHostOwnedRootProp> {
  /** Unified customisation object: color/paint/scale/profile/shape/elevation, per-state
   *  appearance, and nested `sx` tier-2 atomic overrides (control surface only; anatomy axes
   *  excluded). A top-level axis applies to every state; `aui.states.<state>.<axis>` overrides it.
   *  Geometry (`scale`/`profile`) MAY now vary per-state (unified-states model), but Switch keeps
   *  it stable by default. Per-state `sx` wins over top-level `sx` by axis role. */
  aui?: SwitchAui;
  checked?: BaseSwitchRootProps['checked'];
  defaultChecked?: BaseSwitchRootProps['defaultChecked'];
  onCheckedChange?: BaseSwitchRootProps['onCheckedChange'];
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean, eventDetails: SwitchChangeDetails) => void;
  disabled?: boolean;
  /**
   * Thumb escape hatch: replace the auto-rendered sliding thumb. For full control compose
   * `<Switch.Thumb>` as a child instead (the composed part wins; supplying both warns in dev).
   */
  thumb?: React.ReactNode;
}

// useStateLayer runs FIRST (state + focus-ring defaults), then useSwitchRecipe
// runs LAST (recipe classes + bundled aui.sx). Because the recipe is the last
// fragment fed to mergeAuiClasses, `aui.sx` overrides such as focusColor win by
// axis role over the state-layer defaults.
const _SwitchRoot = createAtomicComponent(SwitchPrimitive.Root, {
  extensions: [useSwitchCascade, useStateLayer, useSwitchRecipe],
});

function stripHostOwnedSwitchDomProps<T extends object>(props: T): Omit<T, 'role' | 'aria-checked' | 'indeterminate'> {
  const next = { ...props } as T & {
    role?: unknown;
    'aria-checked'?: unknown;
    indeterminate?: unknown;
  };
  delete next.role;
  delete next['aria-checked'];
  delete next.indeterminate;
  return next as Omit<T, 'role' | 'aria-checked' | 'indeterminate'>;
}

const SwitchRoot = React.forwardRef<HTMLElement, SwitchProps>(function Switch(
  {
    selected,
    defaultSelected,
    onSelectedChange,
    checked,
    defaultChecked,
    onCheckedChange,
    thumb,
    children,
    className,
    ...rest
  },
  ref
) {
  const isSelectedControlled = selected !== undefined;
  const isControlled = isSelectedControlled || checked !== undefined;
  // The ambient group/Fieldset/Field scale (seeded by SwitchGroup via FieldAuiProvider) — drives the
  // composed Switch.Label caption scale below so the label text tracks the group (the box already does
  // via useSwitchCascade). Empty default context standalone → undefined → no-op.
  const inheritedScale = useFieldAui().scale;
  // A composed `Switch.Label` caption (the shipped Label) — rendered in a labeled ROW beside the
  // track (see the wrap below), NOT inside the switch element.
  const labelEl = findPartChild(children, SwitchLabel);
  // Auto-render the default thumb UNLESS a <Switch.Thumb> is composed (then the consumer
  // owns it). The flat `thumb` prop is the shortcut for the auto path; composing wins.
  const composedThumb = hasPartChild(children, SwitchThumb);
  if (process.env.NODE_ENV !== 'production') {
    if (composedThumb && thumb !== undefined) {
      console.warn(
        '[atomic-aui] <Switch> got both a `thumb` prop and a composed <Switch.Thumb>; ' +
          'the composed child wins — drop one.'
      );
    } else if (!composedThumb && !labelEl && React.Children.count(children) > 0) {
      console.warn(
        '[atomic-aui] <Switch> received children but no <Switch.Thumb> among them; they are ' +
          'ignored. Compose <Switch.Thumb> (optionally fragment-wrapped) or use the `thumb` prop.'
      );
    }
  }
  // The thumb subtree: a composed <Switch.Thumb> (MINUS any Switch.Label, hoisted to the row) or the
  // auto-rendered default.
  const content = composedThumb
    ? (labelEl
        ? React.Children.toArray(children).filter((c) => !(React.isValidElement(c) && c.type === SwitchLabel))
        : children)
    : thumb ?? React.createElement(SwitchThumb);
  // Base UI computes role="switch" and boolean aria-checked. Consumers can still
  // smuggle DOM-ish props through spreads, so strip host-owned semantics here.
  const rootProps = stripHostOwnedSwitchDomProps(rest);

  const boxElement = React.createElement(
    _SwitchRoot as React.ElementType,
    {
      ref,
      ...rootProps,
      // The `aui-switch` marker (pill track width/height + thumb anatomy in _state-cascade.scss)
      // is now the SOLE responsibility of SWITCH_VOCAB.marker, emitted by the recipe via
      // buildLeafClasses. We pass the consumer className through untouched (the factory folds it
      // in LAST, overriding axis roles only).
      className,
      checked: isControlled ? (isSelectedControlled ? selected : checked) : undefined,
      defaultChecked: isControlled ? undefined : (defaultSelected ?? defaultChecked),
      onCheckedChange: (next: boolean, details: SwitchChangeDetails) => {
        onCheckedChange?.(next, details);
        onSelectedChange?.(next, details);
      },
    },
    // The thumb subtree: a composed <Switch.Thumb> or the auto-rendered default. Both wrap
    // Base UI's Thumb (data-checked/-unchecked/-disabled; CSS slides it via translateX).
    content
  );

  // No `Switch.Label` child → the bare switch, EXACTLY as before (zero blast radius). Otherwise wrap a
  // labeled row: [switch] [scale-following Label], associated + click-to-toggle via the shared helper.
  if (!labelEl) return boxElement;
  // The caption scale follows: own ?? ambient group/Fieldset/Field cascade ?? vocab default — mirrors
  // Checkbox.Label so the label tracks a SwitchGroup/Fieldset scale (groupTextScale fix 2026-06-28).
  const resolvedScale: AuiRecipeScale =
    (rest.aui as SwitchAui | undefined)?.scale ??
    (inheritedScale as AuiRecipeScale | undefined) ??
    (SWITCH_VOCAB.defaults?.scale as AuiRecipeScale | undefined) ??
    'sm';
  return renderLabeledControl({ boxElement, labelEl, resolvedScale });
});
SwitchRoot.displayName = 'Switch';

// Compound component: `Switch` + its `Switch.Thumb` part + the `Switch.Label` caption (Radix idiom).
export const Switch = Object.assign(SwitchRoot, { Thumb: SwitchThumb, Label: SwitchLabel });
export default Switch;
