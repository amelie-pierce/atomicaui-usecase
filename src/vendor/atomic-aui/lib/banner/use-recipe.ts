import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

export type BannerAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export const BANNER_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const BANNER_VOCAB = defineLeaf({
  marker: 'aui-banner',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: BANNER_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface-alt',
    paint: 'solid',
    scale: 'md',
    shape: 'soft',
    elevation: 2,
  },
});

export const useBannerRecipe = createVocabRecipe(BANNER_VOCAB);
