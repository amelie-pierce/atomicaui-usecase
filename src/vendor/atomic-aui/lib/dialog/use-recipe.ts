// modules/design/atomic-aui/src/lib/dialog/use-recipe.ts
//
// Dialog mirrors AlertDialog's surface recipe, but keeps Base UI Dialog's non-alert behavior:
// regular `dialog` role, configurable modal mode, and optional pointer dismissal.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
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

export type DialogColor = AuiRecipeColor;
export type DialogPaint = AuiRecipePaint;
export type DialogScale = AuiRecipeScale;
export type DialogShape = AuiRecipeShape;
export type DialogProfile = AuiScaleProfile;

// Popup is the only full recipe-bearing Dialog part. Backdrop/Viewport are marker-only in
// `dialog.tsx`; Title/Description/Body/Actions are full `.aui-frame` boxes that now OWN their padding
// (each emits its own `aui-scale-default-<tier>` cell at the Popup's inherited tier — see
// `buildFramePartClasses` `inheritedScale`).
//
// PROFILE — `profile: 'no-padding'`: the Popup is only the outer clipped/elevated SHELL; the section
// padding belongs to Title/Description/Body/Actions. The `aui-scale-no-padding-<tier>` cell zeroes the
// Popup's OWN box padding via the CELL (a profile, like Select/Dropdown popups) — REPLACING the former
// hand-zeroed `:where(.aui-dialog-popup){--aui-padding-*:0}` marker. The `--aui-padding-*` hooks are
// `inherits:true`, so this 0 DOES inherit into the sections — but each section overrides it with its
// OWN default-profile cell, so the sections keep their padding (the 2026-06-14 model: shell no-padding,
// sections default). `aui.sx.padding*` still wins (0,1,0 over the 0,0,0 cell).
export const DIALOG_POPUP_VOCAB = defineLeaf({
  marker: 'aui-dialog-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

/** Unified customisation shape for `Dialog.Popup` — a passive `.aui-frame` surface card. */
export type DialogPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Popup styling recipe: unified `aui` appearance prop -> full `.aui-*` class string. */
export const useDialogPopupRecipe = createVocabRecipe(DIALOG_POPUP_VOCAB);

/** Frame-like marker parts inside the Popup. Aliased to the shared `FramePartAui`
 *  (lifted to `families/frame-part`, shared byte-identically with AlertDialog).
 *  Full frame sx is allowed because these sections own their padding/radius rails;
 *  scale/shape stay opt-in so unset sections keep inheriting Popup geometry. */
export type DialogFramePartAui = FramePartAui;

export type DialogTitleAui = DialogFramePartAui;
export type DialogDescriptionAui = DialogFramePartAui;
export type DialogBodyAui = DialogFramePartAui;
export type DialogActionsAui = DialogFramePartAui;

export type DialogPartClassName<S = unknown> = FramePartClassName<S>;

/** Builds frame-section classes without promoting every section to a full leaf recipe.
 *  Thin alias over the shared `buildFramePartClasses`. */
export const buildDialogFramePartClasses = buildFramePartClasses;
