// modules/design/atomic-aui/src/lib/alert-dialog/use-recipe.ts
//
// AlertDialog's only new styleable leaf recipe is Popup. Trigger and Close are NOT recipes here:
// they compose the shipped AtomicAUI <Button> via Base UI's `render` prop, so they stay in lockstep
// with Button instead of drifting into a duplicate button recipe. Backdrop / Viewport / Title /
// Description are marker parts with hand-authored CSS in _state-cascade.scss.
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

export type AlertDialogColor = AuiRecipeColor;
export type AlertDialogPaint = AuiRecipePaint;
export type AlertDialogScale = AuiRecipeScale;
export type AlertDialogShape = AuiRecipeShape;
export type AlertDialogProfile = AuiScaleProfile;

// The modal confirmation surface mirrors Select.Popup / Dropdown.Popup: a passive elevated
// surface-card frame, not an interactive control. It therefore has no state layer and no semantic
// severity prop; destructive/benign semantics belong to the composed action Buttons.
export const ALERT_DIALOG_POPUP_VOCAB = defineLeaf({
  marker: 'aui-alert-dialog-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  // `profile: 'no-padding'` (2026-06-14): the Popup is the outer clipped/elevated SHELL — section
  // padding belongs to Title/Description/Actions (each emits its OWN default-profile cell at the
  // inherited tier). Zeroing the Popup box padding via the CELL (not a hand-zeroed `:where()` hook)
  // mirrors Dialog + the Select/Dropdown popups. `--aui-padding-*` is `inherits:true` so this 0
  // inherits into the sections, but each section overrides it with its own default cell.
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

/** Unified customisation shape for `AlertDialog.Popup` — a plain `.aui-frame` surface card.
 *  Full-frame `sx` is allowed because the dialog surface owns box geometry, and `aui.elevation`
 *  overrides the default modal float. */
export type AlertDialogPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Popup styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
 *  Stateless by design: a modal surface has no hover/press/focus overlay of its own. */
export const useAlertDialogPopupRecipe = createVocabRecipe(ALERT_DIALOG_POPUP_VOCAB);

/** Frame-like marker parts inside the Popup. Aliased to the shared `FramePartAui`
 *  (lifted to `families/frame-part`, shared byte-identically with Dialog). Unlike
 *  Popup itself, these parts do not stamp a default scale class: unset scale/shape
 *  inherit the active Popup rails, while an explicit `aui.scale` / `aui.shape`
 *  locally overrides them. */
export type AlertDialogFramePartAui = FramePartAui;

export type AlertDialogTitleAui = AlertDialogFramePartAui;
export type AlertDialogDescriptionAui = AlertDialogFramePartAui;
export type AlertDialogActionsAui = AlertDialogFramePartAui;

export type AlertDialogPartClassName<S = unknown> = FramePartClassName<S>;

/** Builds frame-section classes without promoting every section to a full leaf recipe.
 *  Thin alias over the shared `buildFramePartClasses`. */
export const buildAlertDialogFramePartClasses = buildFramePartClasses;
