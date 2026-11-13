// modules/design/atomic-aui/src/lib/switch-group/use-recipe.ts
//
// SwitchGroup's AUTHORED leaf vocab + types (pure TS — no React, no Base UI wiring). MIRRORS
// CheckboxGroup/Fieldset: SwitchGroup is a GROUPING component (the level above Switch), so it authors
// ONE styleable leaf — the visible GROUP-SURFACE frame — and reuses Field's cascade-up machinery
// (field-context.tsx). Its Label/Description parts reuse the shipped Label core (switch-group.tsx).
//
// UNLIKE Checkbox/Radio groups, switches are INDEPENDENT booleans — there is no Base UI group value
// primitive, so SwitchGroup is a PLAIN `<div role="group">`: a pure layout + cascade + label container
// with NO shared value model. The recipe is stateless (only `disabled` flows via render state).
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

// Public SwitchGroup axis aliases mirror the siblings (CheckboxGroup/Fieldset).
export type SwitchGroupColor = AuiRecipeColor;
export type SwitchGroupPaint = AuiRecipePaint;
export type SwitchGroupScale = AuiRecipeScale;
export type SwitchGroupProfile = AuiScaleProfile;
export type SwitchGroupShape = AuiRecipeShape;
export type SwitchGroupElevation = AuiElevation;

/** Layout direction of the switch stack (an AtomicAUI-level prop). Default `'column'`. */
export type SwitchGroupDirection = 'column' | 'row';

export const SWITCH_GROUP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const SWITCH_GROUP_DEFAULT_SCALE: SwitchGroupScale = 'sm';
export const SWITCH_GROUP_DEFAULT_SHAPE: SwitchGroupShape = 'soft';
export const SWITCH_GROUP_DEFAULT_DIRECTION: SwitchGroupDirection = 'column';

// ─── SWITCH_GROUP_ROOT_VOCAB — the PAINTABLE GROUP-SURFACE frame (mirrors CHECKBOX_GROUP_ROOT_VOCAB) ──
// A frame that DEFAULTS to `paint: text` (TRANSPARENT — no fill/border) so an unstyled group shows no
// box, just the stacked switches. Set `paint`/`sx` to opt into a visible bordered/filled group box. It
// OWNS `paint`/`profile` (per-part); its COLOR follows the cascade (own ?? inherited ?? surface),
// JS-resolved in switch-group.tsx. The SAME inherited axes (color/scale/shape/elevation) seed the
// cascade for the child switches + the Label/Description parts.
export const SWITCH_GROUP_ROOT_VOCAB = defineLeaf({
  marker: 'aui-switch-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SWITCH_GROUP_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: SWITCH_GROUP_DEFAULT_SCALE,
    shape: SWITCH_GROUP_DEFAULT_SHAPE,
    elevation: 0,
  },
});

/** The unified `aui` customisation shape for SwitchGroup — the FULL 7-axis frame appearance with the
 *  full-frame `sx`. ALSO the cascade seed for the child switches + parts. No `states`. */
export type SwitchGroupRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// Stateless PropHook for the factory (the group frame's only Base UI state axis is `disabled`).
export const useSwitchGroupRootRecipe = createVocabRecipe(SWITCH_GROUP_ROOT_VOCAB);
