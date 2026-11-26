import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import type { AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { STYLE_PROP_MAP, type AuiStyleProps } from '../../tokens';

export type AvatarGroupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export const AVATAR_GROUP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const AVATAR_GROUP_VOCAB = defineLeaf({
  marker: 'aui-avatar-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: AVATAR_GROUP_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'md', shape: 'pill', elevation: 0 },
});
export const useAvatarGroupRecipe = createVocabRecipe(AVATAR_GROUP_VOCAB);
