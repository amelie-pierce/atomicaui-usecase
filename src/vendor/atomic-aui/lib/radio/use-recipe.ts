import { createToggleableVocabRecipe } from '../../families/toggleable/create-toggleable-vocab-recipe';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

// FULL-surface sx (the no-missing-knobs STANDARD — 32 knobs on every box, `min*` INCLUDED, no
// exclusions; 2026-06-12). The radio box exposes EVERY layer-3 axis. Its marker (`.aui-radio` in
// _state-cascade.scss) reads the `--aui-*` override hooks so an `aui.sx` geometry override WINS instead
// of being masked. `min*` ARE included: the box is square BY DEFAULT (`checkable` profile, `pill` shape
// → a round ring), and the marker PAIRS the min axes (`min-inline/block-size: max(--aui-min-width,
// --aui-min-height)`) so a lone `sx.minWidth` grows BOTH → the ring stays a CIRCLE at a larger size
// (the conceptual-square rule — mirrors Checkbox). The dot is sized separately via `--aui-dot-size`.
export const RADIO_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Radio: a circular checkable control. The reconciled `checkable` profile's
// width/height tokens match the live Composition Radio source, and `shape:'pill'`
// turns that square box into the outer ring. The dot remains a real Indicator puck.
// Radio has NO runtime indeterminate behavior; the third vocab key is Figma parity only.
// The marker reads every `--aui-*` geometry hook (full-surface sx, 2026-06-12) —
// see `.aui-radio` in `tokens/_state-cascade.scss`.
export const RADIO_VOCAB = defineLeaf({
  marker: 'aui-radio',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: RADIO_SX_AXES,
  profile: 'checkable' as const,
  defaults: { scale: 'sm' as const, shape: 'pill' as const, elevation: 0 as const },
  states: {
    unselected: { color: 'surface-alt', paint: 'solid' },
    selected: { color: 'surface-alt', paint: 'solid' },
    // Figma-parity appearance only. Radio has no indeterminate prop/attr/runtime path.
    indeterminate: { color: 'surface-alt', paint: 'solid' },
  },
});

// Unified aui customisation shape for Radio.
// Per the unified-states model (2026-06-11) a per-state entry may set EVERY axis, including
// the geometry axes `scale`/`profile` — so a state CAN resize/reshape the box (e.g. a larger
// `selected` box). Stable geometry remains the default; vary it deliberately. `sx` is the FULL
// `AuiFrameStyleProps` surface (2026-06-12) — the marker reads the override hooks, so every
// layer-3 axis is honoured (no anatomy exclusion). Radio never reaches `indeterminate` — the
// recipe type carries the key for Figma-parity, but the author-facing surface is the two
// reachable enabled states only.
export type RadioSx = AuiFrameStyleProps;
export type RadioAui = Omit<Appearance, 'sx'> & {
  sx?: RadioSx;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: RadioSx }>>;
};

// Radio's stateful vocab recipe: reads props.aui, returns { classNameForState }.
// hookProps = {'aui'} — factory strips `aui` from the DOM.
export const useRadioRecipe = createToggleableVocabRecipe(RADIO_VOCAB);

// NOTE: the RadioGroup root vocab/recipe/types (RADIO_GROUP_*) MOVED to lib/radio-group/use-recipe.ts
// (2026-06-28) when RadioGroup became a standalone component.
