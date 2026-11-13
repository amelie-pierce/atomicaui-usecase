// modules/design/atomic-aui/src/lib/button/use-recipe.ts
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

// Public Button names alias the shared core recipe vocabulary (token-derived, owned by core/).
export type ButtonColor = AuiRecipeColor;
export type ButtonPaint = AuiRecipePaint;
export type ButtonScale = AuiRecipeScale;
export type ButtonProfile = AuiScaleProfile;
export type ButtonShape = AuiRecipeShape;
export type ButtonElevation = AuiElevation;

/** The unified customisation shape for Button — the full Appearance (all four context
 *  axes + full-frame sx). Button is a plain `.aui-frame` consumer: every layer-3
 *  axis is author-overridable (no fixed-anatomy exclusions). `sx` is widened to
 *  `AuiFrameStyleProps` (= `AuiStyleProps & AuiStyleShorthands`) so Button authors
 *  can use the curated shorthands (`radius`, `borderWidth`) alongside granular keys. */
export type ButtonAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const BUTTON_DEFAULT_SCALE: ButtonScale = 'sm';
export const BUTTON_DEFAULT_SHAPE: ButtonShape = 'soft';

// FULL-surface sx (the no-missing-knobs STANDARD — 32 knobs on every box). Button is a plain
// `.aui-frame` consumer, so its marker reads every anatomy hook → every layer-3 axis is live. EXPORTED
// (alongside the SWITCH_SX_AXES/RADIO_SX_AXES/CHECKBOX_SX_AXES precedent) so the Configurator derives
// the Button-root knob list from this constant instead of the generic `'frame'` fallback — the knob
// list can then never drift from the recipe allow-list.
export const BUTTON_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Button's leaf vocabulary — all four context axes, full-frame sx allow-list, and
// the user-directed defaults (surface-alt / solid / sm / soft / elevation-0). `marker:'aui-button'` is
// intentionally structural, not a paint hook: Button needs a component-scoped flex
// row so text + ContainedIcon children align without changing every `.aui-frame`
// consumer in the system.
export const BUTTON_VOCAB = defineLeaf({
  marker: 'aui-button',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: BUTTON_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface-alt',
    paint: 'solid',
    scale: BUTTON_DEFAULT_SCALE,
    shape: BUTTON_DEFAULT_SHAPE,
    elevation: 0,
  },
});

// Button's styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
// Replaces the old `createUnstyledRecipe` (flat color/paint/scale/shape props).
// `hookProps = {'aui'}` — factory strips `aui` from the DOM; `disabled` passes through.
export const useButtonRecipe = createVocabRecipe(BUTTON_VOCAB);
