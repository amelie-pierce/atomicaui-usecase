// modules/design/atomic-aui/src/lib/label/use-recipe.ts
//
// Label's AUTHORED leaf vocab + types + the pure class builder (no React, no Base UI wiring).
//
// Label is a FULL frame leaf (every box `aui` axis + the full 32-axis `sx`) that renders a `<label>`.
// It is a real `.aui-frame` you CAN turn into a styled box (paint/shape/elevation/sx) — but DEFAULTS
// to `paint: text` (transparent) so an unstyled `<Label>` shows no box, just the text. Typography is
// NOT a separate identity layer (unlike Type): the label text is controlled entirely through `aui`
// and `aui.sx` (e.g. `aui.sx.fontSize`, `aui.sx.typographyStyle`) + the inherited typescale cascade.
//
// Defaults (locked by the user 2026-06-22): color surface / paint text / scale sm / shape none /
// profile no-padding / elevation 0. Only `scale` is inherited from a seeding parent (see label.tsx);
// every other axis takes the default unless the consumer sets it.
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
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

// Public Label axis aliases mirror the siblings (Field/Fieldset/View).
export type LabelColor = AuiRecipeColor;
export type LabelPaint = AuiRecipePaint;
export type LabelScale = AuiRecipeScale;
export type LabelProfile = AuiScaleProfile;
export type LabelShape = AuiRecipeShape;
export type LabelElevation = AuiElevation;

// ─── FULL-surface sx (G12/G13) — Label is a real box ─────────────────────────────
// `.aui-label` is an `.aui-frame` that reads every `--aui-*` anatomy hook, so it exposes the FULL
// 32-axis surface like View/Fieldset. EXPORTED so the Configurator's `'frame'` SxKind drives it
// (no re-listing) and the public API can advertise the knob set.
export const LABEL_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const LABEL_DEFAULT_SCALE: LabelScale = 'sm';

// ─── LABEL_VOCAB — the full frame leaf rendering <label> ─────────────────────────
// Defaults to `paint: text` (TRANSPARENT — no fill/border) so an unstyled label reads as plain text,
// and `profile: no-padding` so it sits FLUSH like a label (the Field.Label / Fieldset.Legend
// convention) — set `paint`/`profile`/`sx` to opt into a padded, visible box/chip.
export const LABEL_VOCAB = defineLeaf({
  marker: 'aui-label',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: LABEL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: LABEL_DEFAULT_SCALE,
    shape: 'none',
    elevation: 0,
  },
});

/** The unified `aui` customisation shape for Label — the FULL 7-axis frame appearance with the
 *  full-frame `sx`. No `states` (a label is not a selectable/stateful control). */
export type LabelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Pure: Label's `aui` → the `.aui-*` class string. A straight frame box (frame + color/paint/
 *  scale/profile/shape/elevation/sx) — no typography identity layer (that lives in `aui`/`aui.sx`). */
export function buildLabelClasses(aui: LabelAui | undefined): string {
  return buildLeafClasses(LABEL_VOCAB, aui);
}
