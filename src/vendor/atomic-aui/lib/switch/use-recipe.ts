import { createToggleableVocabRecipe } from '../../families/toggleable/create-toggleable-vocab-recipe';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

// FULL-surface sx (G12/G13, 2026-06-15): the `.aui-switch` marker now READS every anatomy hook
// (width/height OVERRIDE the computed track; all 4 padding sides; min* drive track + travel; the
// thumb reads dot-size/radius/foreground), so the Switch box exposes the FULL 32-axis surface like
// every other box. Switch is a PILL (rectangle-capable) → min*/width/height are INDEPENDENT (a lone
// `sx.minWidth` widens the track), so — unlike the Checkbox/Radio square — min* are INCLUDED, not
// paired/excluded. EXPORTED so the Configurator's `'frame'` SxKind drives it (no re-listing). The
// gap/typography/icon* axes are var-correct-but-inert on a pill with one absolutely-positioned thumb
// (the G13 uniform-presence standard), and `dotSize` IS live (the thumb).
export const SWITCH_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Switch: a pill track with a sliding dot. The Figma-reconciled `switch`
// profile supplies the visible track rails and dot sizes, so the component
// must not compensate in CSS or recolor the default selected track.
// Switch has NO runtime indeterminate behavior; the third vocab key is Figma
// parity only so the shared togglable recipe shape remains complete.
export const SWITCH_VOCAB = defineLeaf({
  marker: 'aui-switch',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SWITCH_SX_AXES,
  profile: 'switch' as const,
  defaults: { scale: 'sm' as const, shape: 'pill' as const, elevation: 0 as const },
  states: {
    unselected: { color: 'surface-alt', paint: 'solid' },
    selected: { color: 'surface-alt', paint: 'solid' },
    // Figma-parity appearance only. Switch has no indeterminate prop/attr/runtime path.
    indeterminate: { color: 'surface-alt', paint: 'solid' },
  },
});

// Unified aui customisation shape for Switch.
// Per the unified-states model (2026-06-11) a per-state entry may set EVERY axis, incl. geometry
// (`scale`/`profile`); Switch keeps geometry stable by default. `sx` is the FULL-frame
// `AuiFrameStyleProps` surface (the marker reads every anatomy hook — G12/G13 2026-06-15).
// Switch never reaches `indeterminate` — the recipe type carries the key for Figma
// parity and the shared 3-key shape, but runtime state remains boolean only.
export type SwitchAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

// Switch's stateful vocab recipe: reads props.aui, returns { classNameForState }.
// hookProps = {'aui'} — factory strips `aui` from the DOM.
export const useSwitchRecipe = createToggleableVocabRecipe(SWITCH_VOCAB);
