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

export type SliderColor = AuiRecipeColor;
export type SliderPaint = AuiRecipePaint;
export type SliderScale = AuiRecipeScale;
export type SliderProfile = AuiScaleProfile;
export type SliderShape = AuiRecipeShape;
export type SliderElevation = AuiElevation;

/** Unified `aui` shape for the root. */
export type SliderAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const SLIDER_DEFAULT_SCALE: SliderScale = 'sm';
export const SLIDER_DEFAULT_COLOR: SliderColor = 'primary';

export const SLIDER_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const SLIDER_VOCAB = defineLeaf({
  marker: 'aui-slider',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SLIDER_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: SLIDER_DEFAULT_COLOR,
    paint: 'text',
    scale: SLIDER_DEFAULT_SCALE,
    shape: 'pill',
    elevation: 0,
  },
});

export const useSliderRecipe = createVocabRecipe(SLIDER_VOCAB);
