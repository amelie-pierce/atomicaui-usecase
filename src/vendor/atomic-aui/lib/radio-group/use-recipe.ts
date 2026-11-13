// modules/design/atomic-aui/src/lib/radio-group/use-recipe.ts
//
// RadioGroup root — the GROUP-SURFACE frame vocab (mirrors CHECKBOX_GROUP_ROOT_VOCAB / SWITCH_GROUP_ROOT_VOCAB).
// RadioGroup is the GROUPING component above Radio (the value-based set). Like CheckboxGroup/Fieldset it
// authors ONE styleable leaf — the visible group-surface frame — and reuses Field's cascade-up machinery
// (field-context.tsx). Its Label/Description parts reuse the shipped Label core. Moved out of
// lib/radio/use-recipe.ts (2026-06-28) so RadioGroup is a standalone component (NOT `Radio.Group`).
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

export type RadioGroupColor = AuiRecipeColor;
export type RadioGroupPaint = AuiRecipePaint;
export type RadioGroupScale = AuiRecipeScale;
export type RadioGroupProfile = AuiScaleProfile;
export type RadioGroupShape = AuiRecipeShape;
export type RadioGroupElevation = AuiElevation;

/** Layout direction of the radio stack (an AtomicAUI-level prop — Base UI's group is a bare `<div>`
 *  with no layout). Default `'column'`. */
export type RadioGroupDirection = 'column' | 'row';

export const RADIO_GROUP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const RADIO_GROUP_DEFAULT_SCALE: RadioGroupScale = 'sm';
export const RADIO_GROUP_DEFAULT_SHAPE: RadioGroupShape = 'soft';
export const RADIO_GROUP_DEFAULT_DIRECTION: RadioGroupDirection = 'column';

// A frame that DEFAULTS to `paint: text` (TRANSPARENT — no fill/border) so an unstyled group shows no
// box, just the stacked radios. Set `paint`/`sx` to opt into a visible bordered/filled group box. It
// OWNS `paint`/`profile` (per-part); its COLOR follows the cascade (own ?? inherited ?? surface),
// JS-resolved in radio-group.tsx. The SAME inherited axes (color/scale/shape/elevation) seed the cascade
// for the child radios + the Label/Description parts. IDENTICAL to CHECKBOX_GROUP_ROOT_VOCAB.
export const RADIO_GROUP_ROOT_VOCAB = defineLeaf({
  marker: 'aui-radio-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: RADIO_GROUP_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: RADIO_GROUP_DEFAULT_SCALE,
    shape: RADIO_GROUP_DEFAULT_SHAPE,
    elevation: 0,
  },
});

/** The unified `aui` customisation shape for RadioGroup — the FULL 7-axis frame appearance with the
 *  full-frame `sx`. ALSO the cascade seed for the child radios + parts. No `states`. */
export type RadioGroupRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// Stateless PropHook for the factory (the group frame's only Base UI state axis is `disabled`).
export const useRadioGroupRootRecipe = createVocabRecipe(RADIO_GROUP_ROOT_VOCAB);
