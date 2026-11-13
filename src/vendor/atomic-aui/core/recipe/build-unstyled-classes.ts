// modules/design/atomic-aui/src/core/recipe/build-unstyled-classes.ts
//
// Core class-building primitive shared by the leaf/vocab recipe engine:
//   • `buildUnstyledClasses`  — typed ingredients → `.aui-*` class string (frame/scale/paint/shape)
import type {
  AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape, AuiScaleProfile,
} from '../vocabulary/recipe-vocab';

/** The recipe "ingredients" for the headless styling strategy. `scale` is required (the
 *  caller always resolves a default); everything else is optional. `profile` is the
 *  `200-Scale` profile axis (default `'default'`). */
interface UnstyledClassInput {
  color?: AuiRecipeColor;
  paint?: AuiRecipePaint;
  scale: AuiRecipeScale;
  profile?: AuiScaleProfile;
  shape?: AuiRecipeShape;
  /** Disabled = the context-independent flip → the active paint's `disabled` chroma cell. */
  disabled?: boolean;
  /** Context-reader frame parts omit their default paint cell so they inherit parent paint rails. */
  omitPaintContext?: boolean;
}

/** Compose the `.aui-*` recipe class string from typed ingredients. Class order is
 *  canonical-but-cosmetic — `mergeAuiClasses` role-dedup + equal CSS specificity make the
 *  attribute order irrelevant to rendering. Core 6.0 compound matrix: `color`+`paint` →
 *  the single cell `aui-color-<paint>-<chroma>`; `profile`+`scale` → `aui-scale-<profile>-<tier>`.
 *  When `disabled`, the chroma flips to the paint's materialized `disabled` cell
 *  (`aui-color-<paint>-disabled`) — no emphasis class (the muted/minimal emphasis level was
 *  dropped in Core 6.0; disabled is its own chroma). Bordered paints (`tonal`/`fixed`) add the
 *  shared scale-aware inset frame. The `?? 'solid'` / `?? 'surface'` fallbacks are inert when the
 *  caller always supplies color/paint (Button + every togglable per-state map). The bordered cell's
 *  `aui-frame--inset` now ALSO carries the SCALE-AWARE border width via `:where(.aui-frame--inset)`
 *  (`--aui-stroke-width-context`, 1px sm…2px xl) — so no fixed `aui-border-*-width-1` quartet, and an
 *  `aui.sx.borderWidth` (0,1,0) still overrides it. */
export function buildUnstyledClasses(p: UnstyledClassInput): string {
  const paint = p.paint ?? 'solid';
  const bordered = paint === 'tonal' || paint === 'fixed';
  const chroma = p.disabled ? 'disabled' : (p.color ?? 'surface');
  return [
    'aui-frame',
    `aui-scale-${p.profile ?? 'default'}-${p.scale}`,
    'aui-typography-typescale-default',
    ...(p.shape ? [`aui-shape-${p.shape}`] : []),
    ...(p.omitPaintContext ? [] : [`aui-color-${paint}-${chroma}`]),
    ...(bordered && !p.omitPaintContext ? ['aui-frame--inset'] : []),
  ].join(' ');
}
