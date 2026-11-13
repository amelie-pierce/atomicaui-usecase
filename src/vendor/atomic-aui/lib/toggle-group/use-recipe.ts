import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

/** Full-frame customization for the segmented-control rail. */
export type ToggleGroupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const TOGGLE_GROUP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

/**
 * The root is the shared segmented-control rail. Its default frame keeps every consumer on the same
 * compact geometry and uses equal tokenized inset on both axes; item paint remains consumer-owned.
 */
export const TOGGLE_GROUP_VOCAB = defineLeaf({
  marker: 'aui-toggle-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: TOGGLE_GROUP_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface' as const,
    paint: 'fixed' as const,
    scale: 'xs' as const,
    shape: 'soft' as const,
    elevation: 0 as const,
    sx: {
      display: 'flex' as const,
      alignItems: 'center' as const,
      gap: '2' as const,
      height: '28' as const,
      paddingBlockStart: '3' as const,
      paddingBlockEnd: '3' as const,
      paddingInlineStart: '3' as const,
      paddingInlineEnd: '3' as const,
      width: 'fill' as const,
      minWidth: '0' as const,
    },
  },
});

export const useToggleGroupRecipe = createVocabRecipe(TOGGLE_GROUP_VOCAB);
