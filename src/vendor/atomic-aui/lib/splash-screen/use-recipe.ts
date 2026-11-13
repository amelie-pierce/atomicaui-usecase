// modules/design/atomic-aui/src/lib/splash-screen/use-recipe.ts
//
// SplashScreen's AUTHORED leaf vocabs + types + the stateless styling recipes (no React, no timing
// logic — that lives in `splash-screen.tsx`).
//
// SplashScreen is a PASSIVE, content-driven boot overlay. The NEW (2026-07-05) simplified design is a
// LIGHT rounded ELEVATED card of exactly TWO bands (Figma ADC Kit `k8FukCxNuhOr4SaKhTiDSC` node
// `5272:1688`):
//   1. a HERO image band — a single consumer-supplied `<img>` that fills the card width (logo, title,
//      badges, copyright are all baked INTO the artwork), radius-clipped to the card top, reserving its
//      box via `aspect-ratio` so there is no layout shift while it loads; and
//   2. a bottom STRIP — the shipped indeterminate Progress bar + a left/right status row.
// The old dark-hero content anatomy (Logo/Title/Subtitle/Badges/Badge/Art + the Card `theme` island +
// the Logo `plate`) is SUPERSEDED — the artwork now carries all of it. BREAKING change; see the
// consume-doc `wiki/component-classes/splash-screen.md`.
//
// TWO recipe-bearing frame leaves (the rest of the anatomy is markers / thin wrappers over shipped
// siblings): the Root (the backdrop scrim) and the Card (the light elevated two-band surface). The
// Footer strip is now a plain TRANSPARENT marker (it reads the card surface through — Figma shows the
// strip transparent on the white card), so it no longer bears a recipe. Each frame leaf mirrors
// Chip/Progress — a plain `.aui-frame` consumer + `createVocabRecipe`, NON-interactive (no
// `useStateLayer`, no `aui.states`). Every surface paints through `.aui-*` classes + `--theme-*`/`--p-*`
// role tokens ONLY, so it AUTOMATICALLY follows the ambient `AuiIdentityProvider` (brand/theme/typeface)
// with zero hex, zero font literals, shadows via the elevation axis.
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

// Public SplashScreen axis aliases mirror the siblings (Button/Chip/Progress) — token-derived,
// owned by core/.
export type SplashScreenColor = AuiRecipeColor;
export type SplashScreenPaint = AuiRecipePaint;
export type SplashScreenScale = AuiRecipeScale;
export type SplashScreenProfile = AuiScaleProfile;
export type SplashScreenShape = AuiRecipeShape;
export type SplashScreenElevation = AuiElevation;

/** The unified `aui` customisation shape for a SplashScreen frame leaf — the FULL 7-axis frame
 *  appearance with the full-frame `sx`. NO `states` (a passive overlay is not selectable — the
 *  Chip/Progress precedent). Each frame leaf is a plain `.aui-frame` consumer, so every layer-3 axis is
 *  author-overridable. */
export type SplashScreenAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type SplashScreenCardAui = SplashScreenAui;

export const SPLASH_SCREEN_DEFAULT_SCALE: SplashScreenScale = 'sm';

/** Default minimum-appear window (ms) — `0` disables the hold (§3.1). A number, not a token: it is a
 *  React-timing input the consumer overrides (ADC passes a motion-token-derived value). */
export const SPLASH_SCREEN_DEFAULT_MIN_VISIBLE_MS = 0;

/** The exit-transition duration (ms) mirrored between the JS removal timer and the CSS
 *  `[data-exiting]` opacity fade. Equals the `--p-ms-240` motion cell (`_000-primitives.scss:48`)
 *  — the JS constant is the jsdom-safe fallback for the CSS transition (jsdom never fires
 *  `transitionend`, §3.1). Keep the two in lockstep: if the marker's transition duration token
 *  changes, change this. */
export const SPLASH_SCREEN_EXIT_MS = 240;

// FULL-surface sx (the no-missing-knobs STANDARD — G12/G13). Each SplashScreen frame leaf is a plain
// `.aui-frame` consumer whose marker reads every anatomy hook → every layer-3 axis is live. EXPORTED
// (the Button/Chip/Progress precedent) so the Configurator derives the knob lists from these
// constants — the knob list can never drift from the recipe allow-list.
export const SPLASH_SCREEN_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// ─── Root vocab — the fixed-inset backdrop scrim ──────────────────────────────────────────────────
// DEFAULTS: color `surface-alt` (the page-tinted backdrop that dims the app behind the card), paint
// `solid` (an opaque themed scrim), scale `sm`, shape `none` (the full-bleed overlay has no corners),
// elevation 0 (the backdrop casts no shadow; the CARD carries the elevation). The fixed positioning /
// max z-index / grid centering are STRUCTURAL and authored in the `.aui-splash-screen` marker
// (`_state-cascade.scss`), not a token value.
export const SPLASH_SCREEN_VOCAB = defineLeaf({
  marker: 'aui-splash-screen',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SPLASH_SCREEN_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface-alt',
    paint: 'solid',
    scale: SPLASH_SCREEN_DEFAULT_SCALE,
    shape: 'none',
    elevation: 0,
  },
});

// ─── Card vocab — the light elevated two-band surface ─────────────────────────────────────────────
// DEFAULTS (Figma node 5272:1688 card frame): color `surface` (the LIGHT card surface — Figma resolves
// `#ffffff` = the light theme `--theme-surface`; the card FOLLOWS the ambient theme through the role
// token, standing a shade off the `surface-alt` scrim), paint `solid`, scale `sm`, shape `soft` (Figma
// card radius resolves to `--p-px-4` = the `soft` cell — the shipped shape enum is none/soft/smooth/pill;
// the old build's `smooth`/8px is superseded), elevation 6 (Figma's frame has a 0-shadow default, but the
// task pins "a LIGHT rounded ELEVATED card" — 6 is the nearest strong floating-card tier on the 0–8 rail:
// offset 8 / blur 24 / `--theme-shadow-25`, which auto-adapts per theme, `_670-elevation.scss:52-58`; the
// prior build already resolved this tier for the focal splash surface, kept for continuity over
// Dialog.Popup's quieter 4). The two-band flex-column layout + hero radius-clip live in the
// `.aui-splash-screen-card` marker.
export const SPLASH_SCREEN_CARD_VOCAB = defineLeaf({
  marker: 'aui-splash-screen-card',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SPLASH_SCREEN_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'solid',
    scale: SPLASH_SCREEN_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 6,
  },
});

// Styling recipes: unified `aui` appearance prop → full `.aui-*` class string. `hookProps = {'aui'}`
// — the factory strips `aui` from the DOM. Stateless (no `classNameForState`).
export const useSplashScreenRecipe = createVocabRecipe(SPLASH_SCREEN_VOCAB);
export const useSplashScreenCardRecipe = createVocabRecipe(SPLASH_SCREEN_CARD_VOCAB);
