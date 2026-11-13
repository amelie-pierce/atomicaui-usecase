// modules/design/atomic-aui/src/lib/progress/use-recipe.ts
//
// Progress's AUTHORED leaf vocab + types + the stateless styling recipe (no React, no Base UI
// wiring).
//
// Progress is a PASSIVE value-driven BAR — a thin wrapper over `@base-ui/react/progress`
// (Root/Track/Indicator). It mirrors Chip (a plain `.aui-frame` consumer + `createVocabRecipe`)
// and is NON-interactive (no `useStateLayer`, no `aui.states` — the Chip stateless precedent):
// Base UI expresses status via data attrs (`data-progressing`/`data-complete`/
// `data-indeterminate`), not the togglable state cascade.
//
// Profile: `progress` — the Figma-synced 200-Scale bar profile (source: ADC Kit `Progress`
// 2327:523, authored at md — its geometry matches the generated md cell). All FIVE tiers are
// generated
// (`aui-scale-progress-{xs,sm,md,lg,xl}`, tokens/generated/layer-2/_200-scale.scss:806-905):
// bar height 4/6/8/10/12 (--aui-height-context/--aui-min-height) + min-width 48/64/80/96/128
// (--aui-min-width) + padding 0. The `.aui-progress*` markers in _state-cascade.scss READ these
// rails — geometry is never hard-set (G12).
//
// The ROOT context cell paints the TRACK (the visible rail): color `raised` (#e2e8f0 =
// --theme-raised, Figma-grounded) / paint `solid`. The filled BAR is `Progress.Indicator`'s OWN
// context cell (solid-primary default) — see progress.tsx.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

// Public Progress axis aliases mirror the siblings (Button/Chip/View) — token-derived, owned by core/.
export type ProgressColor = AuiRecipeColor;
export type ProgressPaint = AuiRecipePaint;
export type ProgressScale = AuiRecipeScale;
export type ProgressProfile = AuiScaleProfile;
export type ProgressShape = AuiRecipeShape;
export type ProgressElevation = AuiElevation;

/** The unified `aui` customisation shape for Progress — the FULL 7-axis frame appearance with the
 *  full-frame `sx`. NO `states` (a passive display bar is not selectable — the Chip precedent).
 *  Progress is a plain `.aui-frame` consumer, so every layer-3 axis is author-overridable. */
export type ProgressAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const PROGRESS_DEFAULT_SCALE: ProgressScale = 'sm';

// FULL-surface sx (the no-missing-knobs STANDARD — G12/G13). Progress is a plain `.aui-frame`
// consumer, so its marker reads every anatomy hook → every layer-3 axis is live. EXPORTED (the
// Button/Chip/View precedent) so the Configurator derives the root knob list from this constant —
// the knob list can never drift from the recipe allow-list.
export const PROGRESS_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Progress's leaf vocabulary — the four context axes, full-frame sx allow-list, the `progress`
// bar profile, and the track-cell defaults.
//
// DEFAULTS: color `raised` (the Figma track #e2e8f0 = --theme-raised), paint `solid`, scale `sm`,
// shape `soft`, elevation 0.
//
// ⚠️ `shape: 'soft'` is USER-LOCKED (a deliberate divergence from the Figma pill, cornerRadius
// 999). Do NOT "fix" it back to `pill` on a Figma reconcile — a consumer wanting the Figma look
// passes `aui={{ shape: 'pill' }}`. See wiki/component-classes/progress.md.
export const PROGRESS_VOCAB = defineLeaf({
  marker: 'aui-progress',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: PROGRESS_SX_AXES,
  profile: 'progress' as const,
  defaults: {
    color: 'raised',
    paint: 'solid',
    scale: PROGRESS_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
});

// Progress's styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
// `hookProps = {'aui'}` — the factory strips `aui` from the DOM. Stateless (no `classNameForState`).
export const useProgressRecipe = createVocabRecipe(PROGRESS_VOCAB);
