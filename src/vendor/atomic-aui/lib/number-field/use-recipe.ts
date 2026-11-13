// modules/design/atomic-aui/src/lib/number-field/use-recipe.ts
//
// NumberField's AUTHORED leaf vocab + recipe (pure TS — no React, no Base UI wiring). NumberField is
// the NUMERIC sibling of Field: it COMPOSES the shipped Input (the inner control) + the shipped
// IconButton (the Increment/Decrement steppers) and REUSES Field's FieldAuiContext cascade verbatim.
// So it owns NO Input/Button/Icon vocab (those are composed siblings). It authors exactly ONE
// styleable leaf:
//   • NUMBER_FIELD_GROUP_VOCAB — the bordered control-row FRAME (a fixed-surface card, profile
//     default), MIRRORING Field.Control's frame. The Group always renders the bordered `.aui-frame`
//     and its color FOLLOWS the cascade (own ?? inherited ?? surface → the border recolors).
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

// Public NumberField axis aliases mirror the siblings (Field/Fieldset/Button/Select).
export type NumberFieldColor = AuiRecipeColor;
export type NumberFieldPaint = AuiRecipePaint;
export type NumberFieldScale = AuiRecipeScale;
export type NumberFieldProfile = AuiScaleProfile;
export type NumberFieldShape = AuiRecipeShape;
export type NumberFieldElevation = AuiElevation;

// The per-part `aui` shapes. `NumberField.Root`'s seed `aui` is the same shape (it just seeds the
// cascade; it renders no box). `NumberField.Group` is the only authored frame leaf; the Input +
// steppers are composed siblings with their own (Input/IconButton) `aui` shapes.
export type NumberFieldRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type NumberFieldGroupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type NumberFieldUnitAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const NUMBER_FIELD_DEFAULT_SCALE: NumberFieldScale = 'sm';
export const NUMBER_FIELD_DEFAULT_SHAPE: NumberFieldShape = 'soft';

// ─── 0. NumberField.Root — the field FRAME (mirrors Field.Root / FIELD_ROOT_VOCAB) ───────────────
// `<NumberField>` (the root) IS a full `.aui-frame` now (G13 — every box carries the full `aui`
// surface; the root was previously a BARE `aui-number-field` marker whose `aui`/`aui.sx` were DEAD
// no-ops — a composing root left as a bare marker makes its `scale`/`profile`/`sx` dead knobs). It
// renders NO fill by default (`paint: text` → transparent) and NO padding (`profile: no-padding` — a
// plain number field is not a bordered box; the bordered `.aui-frame` is the GROUP), so `no-padding-sm`
// = padding 0 is byte-identical to the pre-frame root look → ZERO visual regression. But now
// `aui.sx` styles the ROOT box (bg/border/radius/size/LAYOUT) — so `<NumberField aui={{ sx:{ flex:
// 'fill' } }}>` fills its row. `color` FOLLOWS the cascade (mirrors Field.Root/Fieldset root). The
// SAME element STILL seeds the per-part FieldAuiContext cascade (number-field.tsx).
export const NUMBER_FIELD_ROOT_VOCAB = defineLeaf({
  marker: 'aui-number-field',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: NUMBER_FIELD_DEFAULT_SCALE,
    shape: NUMBER_FIELD_DEFAULT_SHAPE,
    elevation: 0,
  },
});

// ─── NumberField.Group — the bordered control-row FRAME (mirrors Field.Control) ──
// A fixed-surface card: `color: surface`, `paint: fixed`, `scale: sm`, `shape: soft`,
// `elevation: 0`, `profile: default` → emits `aui-color-fixed-surface` + `aui-scale-default-sm`
// + `aui-shape-soft` + `aui-elevation-0`. It OWNS `paint=fixed`/`profile=default` (per-part). Its
// COLOR follows the cascade (border recolors) — JS-resolved in number-field.tsx (own ?? inherited ??
// surface). The frame holds the flex row (Input + steppers when INSIDE) + the tab-only focus outline.
// `disabled` flips the border to `aui-color-fixed-disabled` (createVocabRecipe reads props.disabled).
export const NUMBER_FIELD_GROUP_VOCAB = defineLeaf({
  marker: 'aui-number-field-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'fixed',
    scale: NUMBER_FIELD_DEFAULT_SCALE,
    shape: NUMBER_FIELD_DEFAULT_SHAPE,
    elevation: 0,
  },
});

// ─── NumberField.Unit — a non-interactive unit adornment (kg / mm / $ / %) ───────
// A transparent text label that rides INSIDE the Group, leading or trailing the value (engineering
// fields almost always carry a unit). Mirrors Field's COPY leaves (Label/Description): `paint text`
// (transparent — no box of its own), `color surface` PINNED (reads as quiet text over the Group's
// fill, does NOT follow the border chroma), `profile no-padding`, `shape none`; `scale` cascades so
// the unit matches the field size. It is `aria-hidden`-free but inert (a <span>, not a control); for
// screen readers the unit is part of the visible label context (consumers needing programmatic units
// can also pass Base UI `format={{ style:'unit', unit:'…' }}`). Color/sx overridable per-part.
export const NUMBER_FIELD_UNIT_VOCAB = defineLeaf({
  marker: 'aui-number-field-unit',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: NUMBER_FIELD_DEFAULT_SCALE,
    shape: 'none',
  },
});

// ─── Recipes (stateless PropHooks for the factory) ───────────────────────────────
// NumberField is wholly stateless (no aui.states; focus is CSS state, not a recipe state). The only
// Base UI state axis is `disabled`, fed in by number-field.tsx (the Group is a <div>, outside the
// Base UI render seam, so we read the Field/NumberField root disabled ourselves — mirrors
// Field.Control — and pass `disabled` so the recipe flips to the disabled chroma cell).
export const useNumberFieldRootRecipe = createVocabRecipe(NUMBER_FIELD_ROOT_VOCAB);
export const useNumberFieldGroupRecipe = createVocabRecipe(NUMBER_FIELD_GROUP_VOCAB);
export const useNumberFieldUnitRecipe = createVocabRecipe(NUMBER_FIELD_UNIT_VOCAB);
