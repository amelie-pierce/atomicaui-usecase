// modules/design/atomic-aui/src/core/recipe/square-profile.ts
//
// THE single source of truth (TS) for "which profiles are SQUARE-intent". The actual SQUARE realization
// is a CSS rule in `tokens/_state-cascade.scss` (a late-layer `@each` over THESE profiles × tiers that
// squares any FRAME carrying a `aui-scale-<square>-<tier>` class), so the shape of a box is determined
// by its PROFILE class alone — for any component, with no component code. This TS list MIRRORS that
// `@each` (an atomic-cli codegen could generate both from here so they never drift).
//
// A SQUARE-intent profile renders a definite SQUARE box (realizing `--aui-width-context`/
// `--aui-height-context`, paired). A non-square profile (the TEXT profiles `default`/`compact`, the bar
// `progress`, `switch`, the padding-modifier profiles, …) carries no square class → the box sizes to
// CONTENT via `.aui-frame` (a rectangle). Exceptions where a component's OWN later rule wins: a profiled
// `ContainedIcon` (its `.aui-contained-icon` box-cell sizing in `_icon.scss`, forwarded later) and a
// `Switch` with a square profile (its `.aui-switch` track sizing) — both intentional. `isSquareProfile`
// is exported for any code (Configurator/docs) that needs to know the shape intent without re-listing.
import type { AuiScaleProfile } from '../vocabulary/recipe-vocab';

/** The square-intent profiles. A box with one of these is rendered as a definite square (its profile
 *  box rail is realized). Single-sourced so every component decides squareness identically (no drift). */
export const SQUARE_PROFILES: ReadonlySet<AuiScaleProfile> = new Set<AuiScaleProfile>([
  'square',
  'square-compact',
  'checkable',
  'spinner',
  'contained',
]);

/** Whether a resolved profile is square-intent (→ realize the square box rail). The ONE check every
 *  square-capable component uses to decide whether to apply the shared `.aui-square` sizing marker. */
export function isSquareProfile(profile: AuiScaleProfile | undefined): boolean {
  return profile !== undefined && SQUARE_PROFILES.has(profile);
}
