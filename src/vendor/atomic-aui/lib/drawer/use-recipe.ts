import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import type { AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import {
  buildFramePartClasses,
  type FramePartAui,
  type FramePartClassName,
} from '../../families/frame-part/create-frame-part-classes';
import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

export type DrawerColor = AuiRecipeColor;
export type DrawerPaint = AuiRecipePaint;
export type DrawerScale = AuiRecipeScale;
export type DrawerShape = AuiRecipeShape;
export type DrawerProfile = AuiScaleProfile;

/** The Drawer popup is a passive elevated surface. Open/close state remains owned by Base UI. */
export const DRAWER_POPUP_VOCAB = defineLeaf({
  marker: 'aui-drawer-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

export type DrawerPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useDrawerPopupRecipe = createVocabRecipe(DRAWER_POPUP_VOCAB);

export type DrawerFramePartAui = FramePartAui;
export type DrawerTitleAui = DrawerFramePartAui;
export type DrawerDescriptionAui = DrawerFramePartAui;
export type DrawerContentAui = DrawerFramePartAui;
export type DrawerPartClassName<S = unknown> = FramePartClassName<S>;

export const buildDrawerFramePartClasses = buildFramePartClasses;
