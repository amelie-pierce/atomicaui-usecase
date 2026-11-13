// modules/design/atomic-aui/src/lib/fieldset/use-recipe.ts
//
// Fieldset's AUTHORED leaf vocabs + types (pure TS — no React, no Base UI wiring). Fieldset is a
// GROUPING component one level ABOVE Field: it owns NO control/input/icon/button vocab. It authors
// two styleable leaves:
//   • FIELDSET_ROOT_VOCAB — the visible GROUP-SURFACE frame (a bordered box, mirrors Field.Control:
//     paint fixed / color follows the cascade / profile default / scale sm / shape soft). The same
//     element ALSO seeds the cascade for nested Fields (fieldset.tsx).
//   • FIELDSET_LEGEND_VOCAB — the group label, a copy leaf MIRRORING Field.Label
//     (profile no-padding, paint text, color PINS surface).
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

// Public Fieldset axis aliases mirror the siblings (Field/Button/Select).
export type FieldsetColor = AuiRecipeColor;
export type FieldsetPaint = AuiRecipePaint;
export type FieldsetScale = AuiRecipeScale;
export type FieldsetProfile = AuiScaleProfile;
export type FieldsetShape = AuiRecipeShape;
export type FieldsetElevation = AuiElevation;

// The per-part `aui` shapes. `Fieldset.Root`'s seed `aui` carries only the cascaded axes (it renders
// no box; its own profile/paint are accepted but ~no-op). `Fieldset.Legend` takes the full frame
// Appearance with the curated `sx`, matching Field.Label.
export type FieldsetRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type FieldsetLegendAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const FIELDSET_DEFAULT_SCALE: FieldsetScale = 'sm';
export const FIELDSET_DEFAULT_SHAPE: FieldsetShape = 'soft';

// ─── Fieldset.Root — the PAINTABLE GROUP-SURFACE frame ───────────────────────────
// A frame that defaults to `paint: text` (TRANSPARENT — no fill, no border) so an unstyled group
// shows no box: `color: surface`, `paint: text`, `scale: sm`, `shape: soft`, `elevation: 0`,
// `profile: default` → emits `aui-color-text-surface` + `aui-scale-default-sm` + `aui-shape-soft`.
// (profile `default` keeps the group's inner padding so that opting into a `paint` yields a
// properly padded card — the transparent default therefore has that inset, it is not flush.)
// Set `paint` (fixed/tonal/solid) — or any `sx` — to opt INTO a visible
// bordered/filled group box. It OWNS `paint`/`profile` (per-part). Its COLOR follows the cascade
// (own ?? inherited ?? surface), JS-resolved in fieldset.tsx — the SAME color also seeds the cascade
// for nested Fields. `disabled` is a native `<fieldset>` attr, so the recipe greys it AND Base UI
// propagates it (no strip hook).
export const FIELDSET_ROOT_VOCAB = defineLeaf({
  marker: 'aui-fieldset',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: FIELDSET_DEFAULT_SCALE,
    shape: FIELDSET_DEFAULT_SHAPE,
    elevation: 0,
  },
});

// ─── Fieldset.Legend — the group label (copy leaf; mirrors Field.Label) ──────────
// `paint: text` + `profile: no-padding` → emits `aui-color-text-<c>` (no box padding). It reads
// the cascade for scale/shape (so a `Fieldset.Root aui.scale` re-sizes the legend) but PINS its
// color to surface (the legend is the group heading, not chroma-following) — field.tsx-style
// JS-resolution in fieldset.tsx hands it an explicit resolved color. `defaults.color` is the
// fallback the recipe uses if fieldset.tsx ever omits color (it always passes one).
export const FIELDSET_LEGEND_VOCAB = defineLeaf({
  marker: 'aui-fieldset-legend',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: FIELDSET_DEFAULT_SCALE,
    shape: 'none',
  },
});

// ─── Recipe (stateless PropHook for the factory) ─────────────────────────────────
// Fieldset is wholly stateless (no aui.states). The only Base UI state axis is `disabled`, which
// flows in natively via render state when present (createVocabRecipe reads props.disabled).
export const useFieldsetRootRecipe = createVocabRecipe(FIELDSET_ROOT_VOCAB);
export const useFieldsetLegendRecipe = createVocabRecipe(FIELDSET_LEGEND_VOCAB);
