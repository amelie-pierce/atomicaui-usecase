import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import type { AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import {
  defineLeaf,
  type Appearance,
} from '../../core/vocabulary/leaf-vocabulary';
import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
  AuiElevation,
} from '../../core/vocabulary/recipe-vocab';
import { STYLE_PROP_MAP, type AuiStyleProps } from '../../tokens/index';

export type TooltipColor = AuiRecipeColor;
export type TooltipPaint = AuiRecipePaint;
export type TooltipScale = AuiRecipeScale;
export type TooltipProfile = AuiScaleProfile;
export type TooltipShape = AuiRecipeShape;
export type TooltipElevation = AuiElevation;

export const TOOLTIP_POPUP_SX_AXES = Object.keys(
  STYLE_PROP_MAP
) as (keyof AuiStyleProps)[];

export const TOOLTIP_POPUP_VOCAB = defineLeaf({
  marker: 'aui-tooltip-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: TOOLTIP_POPUP_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'solid',
    scale: 'sm',
    shape: 'soft',
    elevation: 2,
  },
});

export type TooltipPopupAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export const useTooltipPopupRecipe = createVocabRecipe(TOOLTIP_POPUP_VOCAB);
