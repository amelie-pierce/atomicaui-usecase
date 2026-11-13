// modules/design/atomic-aui/src/lib/checkbox-group/use-recipe.ts
//
// CheckboxGroup's AUTHORED leaf vocab + types (pure TS — no React, no Base UI wiring). MIRRORS
// Fieldset's use-recipe.ts: CheckboxGroup is a GROUPING component (the level above Checkbox), so it
// authors ONE styleable leaf — the visible GROUP-SURFACE frame — and reuses Fieldset's exact
// cascade-up machinery (field-context.tsx). Its Label/Description parts reuse the shipped Label core
// (checkbox-group.tsx), so there is no separate part vocab here.
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

// Public CheckboxGroup axis aliases mirror the siblings (Fieldset/Field).
export type CheckboxGroupColor = AuiRecipeColor;
export type CheckboxGroupPaint = AuiRecipePaint;
export type CheckboxGroupScale = AuiRecipeScale;
export type CheckboxGroupProfile = AuiScaleProfile;
export type CheckboxGroupShape = AuiRecipeShape;
export type CheckboxGroupElevation = AuiElevation;

/** Layout direction of the checkbox stack (an AtomicAUI-level prop — Base UI's group is a bare
 *  `<div>` with no layout). Default `'column'`. */
export type CheckboxGroupDirection = 'column' | 'row';

export const CHECKBOX_GROUP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const CHECKBOX_GROUP_DEFAULT_SCALE: CheckboxGroupScale = 'sm';
export const CHECKBOX_GROUP_DEFAULT_SHAPE: CheckboxGroupShape = 'soft';
export const CHECKBOX_GROUP_DEFAULT_DIRECTION: CheckboxGroupDirection = 'column';

// ─── CHECKBOX_GROUP_ROOT_VOCAB — the PAINTABLE GROUP-SURFACE frame (mirrors FIELDSET_ROOT_VOCAB) ──
// A frame that DEFAULTS to `paint: text` (TRANSPARENT — no fill/border) so an unstyled group shows no
// box, just the stacked checkboxes: `color: surface`, `paint: text`, `scale: sm`, `shape: soft`,
// `elevation: 0`, `profile: default`. Set `paint`/`sx` to opt into a visible bordered/filled group
// box. It OWNS `paint`/`profile` (per-part); its COLOR follows the cascade (own ?? inherited ??
// surface), JS-resolved in checkbox-group.tsx — the SAME inherited axes (color/scale/shape/elevation)
// ALSO seed the cascade for the child checkboxes + the Label/Description parts.
export const CHECKBOX_GROUP_ROOT_VOCAB = defineLeaf({
  marker: 'aui-checkbox-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CHECKBOX_GROUP_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: CHECKBOX_GROUP_DEFAULT_SCALE,
    shape: CHECKBOX_GROUP_DEFAULT_SHAPE,
    elevation: 0,
  },
});

/** The unified `aui` customisation shape for CheckboxGroup.Root — the FULL 7-axis frame appearance
 *  with the full-frame `sx`. ALSO the cascade seed for the child checkboxes + parts (the inherited
 *  axes color/scale/shape/elevation; paint/profile/sx are frame-local, not cascaded). No `states`
 *  (the group frame is not selectable — the child checkboxes carry selection). */
export type CheckboxGroupRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// ─── Recipe (stateless PropHook for the factory) ─────────────────────────────────
// The group frame is stateless (no aui.states). The only Base UI state axis is `disabled`, which
// flows in via render state (createVocabRecipe reads props.disabled) — mirrors Fieldset.
export const useCheckboxGroupRootRecipe = createVocabRecipe(CHECKBOX_GROUP_ROOT_VOCAB);
