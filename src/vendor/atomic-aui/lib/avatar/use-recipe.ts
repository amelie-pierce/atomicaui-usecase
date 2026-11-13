// modules/design/atomic-aui/src/lib/avatar/use-recipe.ts
//
// Avatar's authored leaf vocab + types + stateless styling recipe.
//
// Avatar is a passive display frame over Base UI Avatar. It is not selectable, disabled,
// pressable, or state-layered: Base UI owns image loading/fallback visibility; AtomicAUI owns only
// the root frame appearance.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

// Public Avatar axis aliases mirror the stateless frame siblings.
export type AvatarColor = AuiRecipeColor;
export type AvatarPaint = AuiRecipePaint;
export type AvatarScale = AuiRecipeScale;
export type AvatarProfile = AuiScaleProfile;
export type AvatarShape = AuiRecipeShape;
export type AvatarElevation = AuiElevation;

/** Root-only Avatar customization: the full stateless frame surface. No `states`. */
export type AvatarAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const AVATAR_DEFAULT_COLOR: AvatarColor = 'surface-alt';
export const AVATAR_DEFAULT_PAINT: AvatarPaint = 'solid';
export const AVATAR_DEFAULT_SCALE: AvatarScale = 'md';
export const AVATAR_DEFAULT_PROFILE: AvatarProfile = 'square';
export const AVATAR_DEFAULT_SHAPE: AvatarShape = 'pill';
export const AVATAR_DEFAULT_ELEVATION: AvatarElevation = 0;

// Root-only `.aui-frame` leaf: expose the full frame sx surface for docs/configurator derivation.
export const AVATAR_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Root vocab only. Image/Fallback are marker-only Base UI parts and do not consume this recipe.
export const AVATAR_VOCAB = defineLeaf({
  marker: 'aui-avatar',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: AVATAR_SX_AXES,
  profile: AVATAR_DEFAULT_PROFILE,
  defaults: {
    color: AVATAR_DEFAULT_COLOR,
    paint: AVATAR_DEFAULT_PAINT,
    scale: AVATAR_DEFAULT_SCALE,
    shape: AVATAR_DEFAULT_SHAPE,
    elevation: AVATAR_DEFAULT_ELEVATION,
  },
});

// Stateless recipe: `hookProps = {'aui'}` strips root `aui`; no `classNameForState` is emitted.
export const useAvatarRecipe = createVocabRecipe(AVATAR_VOCAB);
