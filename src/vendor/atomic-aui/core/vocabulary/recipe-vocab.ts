// Shared recipe-prop vocabulary, derived from the Core 6.0 230-Color / 200-Scale token
// unions — reused by every recipe-driven component (Button + the toggleable family).
// Lives in core/ so no component "owns" another's vocabulary. core → tokens only.
//
// AuiScaleProfile and AuiElevation are derived from generated tokens (Task 7.3)
// so they can never drift from the generated SCSS:
//   - AuiScaleProfile  — alias for AuiScaleProfileGenerated (emitted from 200-Scale
//                        family extension suffixes by atomic-cli). The "Generated"
//                        suffix keeps the raw emitted name out of the public API; this
//                        file owns the canonical consumer-facing `AuiScaleProfile` export.
//   - AuiElevation     — alias for AuiElevationLevel (generated numeric union 0..8).
import type {
  AuiColor,
  AuiPaint,
  AuiScale,
  AuiScaleProfileGenerated,
  AuiShape,
  AuiElevationLevel,
} from '../../tokens/index';

// `color` = the chroma axis of the compound `230-Color` matrix (10 author-facing
// intents; `disabled` is excluded by `AuiColor` — it's reached via the recipe's
// disabled state, not a prop).
export type AuiRecipeColor = AuiColor;
// `paint` = the four extension siblings of the `230-Color` family. Concatenated with
// `color` by the recipe into one compound class `aui-color-<paint>-<chroma>`.
export type AuiRecipePaint = AuiPaint;
// `scale` = the TIER axis of the compound `200-Scale` matrix (shared across states).
export type AuiRecipeScale = AuiScale;
// `profile` = the PROFILE axis of `200-Scale` (absorbed the old `210-Density`).
// EMITTED by atomic-cli from generated tokens — can't drift. Concatenated with `scale`
// into one compound class `aui-scale-<profile>-<tier>`.
export type AuiScaleProfile = AuiScaleProfileGenerated;
export type AuiRecipeShape = AuiShape;
// `elevation` = the drop-shadow level → `aui-elevation-<n>`. A visual `aui` axis (NOT
// geometry), resolvable per-state like color/paint.
// EMITTED by atomic-cli from generated tokens — can't drift (numeric 0..8).
export type AuiElevation = AuiElevationLevel;
