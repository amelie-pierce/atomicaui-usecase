// modules/design/atomic-aui/src/lib/checkbox/use-recipe.ts
import { createToggleableVocabRecipe } from '../../families/toggleable/create-toggleable-vocab-recipe';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

// FULL-surface sx (the no-missing-knobs STANDARD — 32 knobs on every box, `min*` INCLUDED, no
// exclusions; 2026-06-12). The checkbox box exposes EVERY layer-3 axis. Its marker (`.aui-checkbox` in
// _state-cascade.scss) reads the `--aui-*` override hooks (`var(--aui-width, …)`, zeroed-then-composed
// padding) so an `aui.sx` geometry override WINS instead of being masked. `min*` ARE included: the box
// is square BY DEFAULT (its `checkable` profile sets equal box rails), and the marker PAIRS the min
// axes (`min-inline/block-size: max(--aui-min-width, --aui-min-height)`) so a lone `sx.minWidth` grows
// BOTH → the checkbox stays a SQUARE at a larger size, not a rectangle (the conceptual-square rule —
// unlike IconButton, which is rectangle-capable). The mark is sized via the `Checkbox.Icon` part.
export const CHECKBOX_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Checkbox: neutral solid surface for every enabled state; marks communicate selection.
// `profile: 'checkable'` is the Figma-reconciled box geometry profile: xs..xl width/height
// match the live Composition Checkbox source, so the component must not compensate in CSS.
export const CHECKBOX_VOCAB = defineLeaf({
  marker: 'aui-checkbox',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CHECKBOX_SX_AXES,
  profile: 'checkable' as const,
  defaults: { scale: 'sm' as const, shape: 'soft' as const, elevation: 0 as const },
  states: {
    unselected: { color: 'surface-alt', paint: 'solid' },
    selected: { color: 'surface-alt', paint: 'solid' },
    indeterminate: { color: 'surface-alt', paint: 'solid' },
  },
});

// Unified aui customisation shape for Checkbox.
// Per the unified-states model (2026-06-11) a per-state entry may set EVERY axis, including
// the geometry axes `scale`/`profile` — so a state CAN resize/reshape the box (e.g. a larger
// `selected` box). Stable geometry remains the default; vary it deliberately. `sx` is the FULL
// `AuiFrameStyleProps` surface (2026-06-12) — the marker reads the override hooks, so every
// layer-3 axis is honoured (no anatomy exclusion).
export type CheckboxSx = AuiFrameStyleProps;
export type CheckboxAui = Omit<Appearance, 'sx'> & {
  sx?: CheckboxSx;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: CheckboxSx }>>;
};

// Checkbox's stateful vocab recipe: reads props.aui, returns { classNameForState }.
// hookProps = {'aui'} — factory strips `aui` from the DOM.
export const useCheckboxRecipe = createToggleableVocabRecipe(CHECKBOX_VOCAB);
