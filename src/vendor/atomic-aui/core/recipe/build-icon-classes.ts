// modules/design/atomic-aui/src/core/recipe/build-icon-classes.ts
//
// Icon RECIPE — pure class-string builders for the two-element icon anatomy:
//   • GLYPH  — the `<i class="aui-icon …">` Font Awesome element (foreground-only).
//   • BOX    — the `<span class="aui-contained-icon …">` wrapper (transparent surface
//              that sizes/shapes the glyph container; the glyph color lives on the inner
//              glyph, forwarded by the component).
// Glyph and box target DIFFERENT elements, so they're separate builders with separate
// `sx` allow-lists. No React, no CSS — this is the consume-side recipe layer (core/recipe/).
import type { AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape, AuiScaleProfile, AuiElevation } from '../vocabulary/recipe-vocab';
import { STYLE_PROP_MAP, type AuiStyleProps } from '../../tokens/index';
import type { AuiStyleShorthands } from './build-style-props';
import { buildStyleProps } from './build-style-props';
import { buildPartClasses } from './part-classes';
import { mergeAuiClasses } from './merge-classes';

// ── Scale → glyph / container size maps ───────────────────────────────────────────────────
//
// F5.19 glyph sizes (the GLYPH font-size, in px) — the FALLBACK only. Glyph sizing is
// PROFILE-DRIVEN: `.aui-icon` reads `font-size: var(--aui-icon-size, var(--aui-icon-size-fallback,
// 1em))` (see `tokens/_icon.scss`). A profile cell up-tree (the icon's own `aui.profile`, or a
// profiled host like Button/IconButton) sets the authoritative `--aui-icon-size` (inherits:true,
// the Figma value) and WINS. This map only seeds `--aui-icon-size-FALLBACK` (via the hand-authored
// `aui-icon-size-fallback-<px>` utility in `_icon.scss`) so a bare, profile-less glyph still has a
// per-scale size instead of collapsing to `1em`. `sx.iconSize` sets `--aui-icon-size` directly
// (layer-3 override) and beats both. These are the generic no-padding sizes (default profile cell).
const ICON_GLYPH_SIZE: Record<AuiRecipeScale, string> = {
  xs: '10',
  sm: '14',
  md: '16',
  lg: '18',
  xl: '20',
};

// Per-tier line-height typescale rails (the DEFAULT-profile ladder: xs=l4 / sm=l3 / md=l2 / lg=h6 /
// xl=h5). An unprofiled ContainedIcon (Button.Icon) emits `aui-icon-lh-<tier>` so it carries a
// `--aui-line-height-context` value EVEN WHEN STANDALONE (no profiled host up-tree). The box's
// container then resolves to that line-height (the Figma `icon/container = font/line-height` model —
// every 200-Scale profile's `icon/container` is the text line-height), replacing the old fixed
// `CONTAINED_ICON_CONTAINER` px band (i20/i24/i28/i32/i40 — a fixed box that did NOT exist in Figma
// and inflated a default-sm Button-with-icon to 32px). See `_icon.scss` (the box reads
// `max(var(--aui-icon-container, var(--aui-line-height-context, 0px)), --aui-min-width)`). For a box
// nested in a PROFILED host (Button/IconButton) the host's own cell already sets `--aui-icon-container`
// (= its line-height, inherits:true) so the box tracks the HOST line-height; this rail only fills the
// standalone gap. It sets ONLY `--aui-line-height-context` (NOT `--aui-icon-size`), so the inner glyph
// still follows the host/fallback size — the box-size and glyph-size concerns stay independent.
const ICON_LINE_HEIGHT_TIER: Record<AuiRecipeScale, string> = {
  xs: 'l4',
  sm: 'l3',
  md: 'l2',
  lg: 'h6',
  xl: 'h5',
};

// ── GLYPH `sx` allow-list — LIVE axes ONLY (narrowed 2026-06-14) ─────────────────────────────
// The glyph is a SINGLE-FILL Font Awesome `<i>` with NO box: `.aui-icon` (tokens/_icon.scss) reads
// EXACTLY two `sx`-driven hooks — `font-size: var(--aui-icon-size, …)` and `color: var(--aui-fg, …)`.
// So the ONLY live glyph `sx` axes are:
//   • `foreground` — the glyph hue (`--aui-fg`; also driven by the `aui.color` top-level axis)
//   • `iconSize`   — the glyph's OWN font-size (the box's `iconContainer` lives on ContainedIcon)
// EXCLUDED (a glyph is NOT a box — the uniform-32 box standard does NOT apply): `border*Width` +
// `borderWidth`, `radius*` + `radius`, `borderColor`, `focusColor`/`focusWidth` — `.aui-icon` paints
// no border, corner, or focus ring (it is decorative/aria-hidden; the focusable boxed variant is
// `ContainedIcon`/`IconButton`). These were DEAD knobs (a `decorative stroke/corner` the CSS never
// implemented) — removed so the configurator (derived from this list) shows only working knobs. Also
// EXCLUDED: `iconStyle` (FA weight = a class name, not a CSS axis); `iconContainer`/`background` (box-only).
const ICON_SX_AXES_KEYS = [
  'foreground',
  'iconSize',
] as const satisfies readonly (keyof (AuiStyleProps & AuiStyleShorthands))[];

/** Runtime guard Set: keys allowed in a glyph's `aui.sx`. The recipe filters to this set
 *  (defensively, no warn — the component layer owns dev-warn) before `buildStyleProps`. */
export const ICON_SX_AXES: ReadonlySet<string> = new Set<string>(ICON_SX_AXES_KEYS);

/** The subset of `AuiStyleProps & AuiStyleShorthands` a glyph's `sx` may accept. Anatomy /
 *  typography / dot / container / background axes are intentionally absent — the glyph is
 *  foreground-only and its container lives on the box. */
export type IconSxProps = Pick<AuiStyleProps & AuiStyleShorthands, (typeof ICON_SX_AXES_KEYS)[number]>;

// ── BOX `sx` allow-list — the FULL surface (the sx STANDARD, 2026-06-12) ─────────────────────
// The contained-icon BOX is a real box (background/border/radius/size), so it exposes the SAME
// full sx surface the box leaf + the widened container part do — `full − min*` (a definite box has
// no use for a lone min). This keeps EVERY `aui.sx` section uniform (the user's standard). How the
// axes manifest on `.aui-contained-icon` (see `tokens/_icon.scss`): color/border/radius/background
// already live; `iconContainer`/`width`/`height` size the box; `padding*` inset the glyph; `iconSize`
// sizes the inner glyph via the inheriting `--aui-icon-size`. The remaining axes (`gap`, `fontSize`/
// `lineHeight`/`letterSpacing`/`typographyStyle`/`textAlign`, `dotSize`) are VAR-CORRECT but visually
// inert on a single FA glyph (no text/dot) — the same "present + var applies, no target" contract the
// box's typography axes follow. `iconStyle` is still NOT a CSS axis (FA weight = a class). Derived
// from `STYLE_PROP_MAP` so the list can't drift. `min*` ARE included (2026-06-12): the box reads
// `min-inline-size: max(--aui-icon-container, --aui-min-width)` (the profile-drives-box model), so
// `sx.minWidth`/`minHeight` are LIVE (they clamp the box like the profile) — and the box is NOT a
// paired square (min* are independent, no deform), so unlike the Checkbox/Radio box it keeps them.
// This makes a ContainedIcon (e.g. Button.Icon) the FULL 32-axis surface, matching its host frame.
export const CONTAINED_ICON_SX_AXES: ReadonlySet<string> = new Set<string>([
  ...(Object.keys(STYLE_PROP_MAP) as string[]),
  'radius',
  'borderWidth',
]);

/** The FULL `AuiStyleProps & AuiStyleShorthands` surface a contained-icon box's `sx` accepts (32 axes —
 *  matches a plain frame). `iconStyle` is absent (FA weight is a class, not a CSS axis). */
export type ContainedIconSxProps = AuiStyleProps & AuiStyleShorthands;

/** Filter an `sx` bag to the keys in `allow`, returning a fresh object. Defensive — drops any
 *  non-allowed key silently (the component layer dev-warns; the recipe just emits clean classes). */
function filterSx<T extends object>(
  sx: T | undefined,
  allow: ReadonlySet<string>,
): Partial<AuiStyleProps & AuiStyleShorthands> {
  if (!sx) return {};
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(sx)) {
    if (allow.has(key)) out[key] = (sx as Record<string, unknown>)[key];
  }
  return out as Partial<AuiStyleProps & AuiStyleShorthands>;
}

/** GLYPH recipe → class string for the `<i class="aui-icon …">`.
 *  • base `aui-icon` always.
 *  • `color` → `aui-fg-<c>` (via `buildPartClasses`).
 *  • `scale` → `aui-icon-size-fallback-<px>` (F5.19 generic size) — the LAST-RESORT fallback only;
 *    an up-tree profile cell's `--aui-icon-size` (inherits:true) wins, and `sx.iconSize` (authoritative
 *    `--aui-icon-size`) beats both. See `ICON_GLYPH_SIZE` above + `tokens/_icon.scss`.
 *  • `sx` → filtered to `ICON_SX_AXES`, then `buildStyleProps`. `sx.iconSize` emits the authoritative
 *    `aui-icon-size-<v>`; since `mergeAuiClasses` dedups it to the SAME `aui-icon-size` role as the
 *    fallback, an explicit `sx.iconSize` replaces the fallback class (and wins in CSS regardless).
 *  Composed via `mergeAuiClasses` (role-dedup, last-wins). */
export function buildIconClasses(props: {
  color?: AuiRecipeColor;
  scale?: AuiRecipeScale;
  sx?: IconSxProps;
}): string {
  const sizeClass = props.scale ? `aui-icon-size-fallback-${ICON_GLYPH_SIZE[props.scale]}` : '';
  return mergeAuiClasses([
    'aui-icon',
    buildPartClasses({ color: props.color }),
    sizeClass,
    buildStyleProps(filterSx(props.sx, ICON_SX_AXES)),
  ]);
}

/** BOX recipe → class string for the `<span class="aui-contained-icon …">`.
 *  The box now takes the FULL appearance (2026-06-11): `color`/`paint` resolve the standard
 *  context cell on the box (`--paint-*` rails the box CSS reads), with `paint` defaulting to
 *  **`text`** — so a bare `color` makes a transparent box whose CONTENT color the inner glyph
 *  follows (a one-knob colored icon), while `paint: 'solid'|'tonal'` fills the box. `profile`
 *  defaults to **`no-padding`** and `elevation` to **`0`**.
 *  • base `aui-contained-icon` always.
 *  • `color`/`paint` → `aui-color-<paint ?? 'text'>-<chroma>` (+ the shared scale-aware
 *    `aui-frame--inset` contract for tonal/fixed).
 *  • `scale` (UNPROFILED box) → `aui-icon-lh-<tier>` (sets `--aui-line-height-context` so the box
 *    container = the text line-height, the Figma `icon/container = font/line-height` model; standalone-safe).
 *  • `profile` → `aui-scale-<profile>-<tier>` ONLY for a non-default profile (no-padding = the default).
 *  • `shape` → `aui-shape-<shape>`; `elevation` → `aui-elevation-<n>` (0 default → no shadow).
 *  • `sx` → filtered to `CONTAINED_ICON_SX_AXES`, then `buildStyleProps`.
 *  Composed via `mergeAuiClasses` (role-dedup, last-wins). */
export function buildContainedIconClasses(props: {
  color?: AuiRecipeColor;
  paint?: AuiRecipePaint;
  scale?: AuiRecipeScale;
  profile?: AuiScaleProfile;
  shape?: AuiRecipeShape;
  elevation?: AuiElevation;
  sx?: ContainedIconSxProps;
}): string {
  // PROFILE drives the box (2026-06-12): when a non-`no-padding` profile is set, the box size is the
  // profile cell's `--aui-icon-container` (= the text line-height per Figma — 2026-06-24 resync) and
  // `--aui-min-width`/`--aui-min-height` (per-tier values in tokens/generated/layer-2/_200-scale.scss).
  // So a profiled box DROPS any own container rail and lets the profile cell drive the box; the inner
  // glyph is still sized by the forwarded `scale` on the `<Icon>` (a separate element).
  //
  // UNPROFILED box (Button.Icon): the box container = the host's text LINE-HEIGHT, not a fixed px
  // (2026-06-24 — Figma `icon/container = font/line-height` for EVERY 200-Scale profile). The old fixed
  // `aui-icon-container-i<n>` band (i20…i40) did NOT exist in Figma and inflated a default-sm Button
  // icon box to 24/32px. Now an unprofiled box emits `aui-icon-lh-<tier>` (sets ONLY
  // `--aui-line-height-context`); `_icon.scss` floors the box at
  // `max(var(--aui-icon-container, var(--aui-line-height-context, 0px)), --aui-min-width)`. Nested in a
  // profiled host the box INHERITS the host's `--aui-icon-container` (= the host line-height) and tracks
  // it; standalone, the emitted `--aui-line-height-context` fallback gives the same line-height.
  const profiled = props.profile && props.profile !== 'no-padding';
  const bordered = props.paint === 'tonal' || props.paint === 'fixed';
  const lineHeightClass = props.scale && !profiled
    ? `aui-icon-lh-${ICON_LINE_HEIGHT_TIER[props.scale]}`
    : '';
  // The box's context cell. Emitted when color OR paint is set; `paint` defaults to `text`
  // (transparent box + content-colored glyph), `chroma` to `surface`. When NEITHER is set, the box
  // paints nothing of its own — but `--paint-fill` INHERITS, so a bare box inside a painted host
  // would pick up the host fill. The default `text`-paint transparency therefore lives HERE (props
  // side): emit `aui-bg-transparent` (`--aui-bg: transparent`, non-inheriting) so the box stays
  // transparent + static. `--paint-content` is left inheriting so the glyph follows the host content.
  const cellClasses: string[] = [];
  if (props.color !== undefined || props.paint !== undefined) {
    const paint = props.paint ?? 'text';
    const chroma = props.color ?? 'surface';
    cellClasses.push(`aui-color-${paint}-${chroma}`);
    if (paint === 'tonal' || paint === 'fixed') cellClasses.push('aui-frame--inset');
  } else {
    cellClasses.push('aui-bg-transparent');
  }
  // PROFILE drives the box (2026-06-12): a non-`no-padding` profile emits its scale cell, which sets
  // BOTH its box size (`--aui-min-width`/`--aui-min-height` — square-compact 28 / square / contained,
  // read by `_icon.scss` as `max(icon-container, min-width)`) AND its glyph inset (`--aui-padding-*` +
  // `--aui-gap` — e.g. square-compact = 2px). All anatomy hooks are `@property inherits:true`, so a
  // NO-PROFILE / `no-padding` icon nested in a PADDED/sized host (a Button band) would INHERIT that
  // host's padding/gap/min and inflate. So a no-profile icon emits an explicit 0,1,0 HUG-RESET (min* +
  // padding* + gap → 0) so it HUGS the glyph (icon-container band) regardless of nesting. A PROFILED
  // icon emits NO reset — its own profile cell sets every anatomy hook (so it both keeps its profile
  // padding/box AND overrides host inheritance, since any value set on the element beats inheritance).
  // (The reset can't be a `:where(.aui-contained-icon)` rule in `_icon.scss` — that file is forwarded
  // LAST, so a 0,0,0 `:where` reset would beat the profile cell's 0,0,0 `:where` padding by source
  // order and clobber a profiled icon's inset. The recipe class is conditional and 0,1,0, so it only
  // fires for no-profile icons and `mergeAuiClasses` role-dedup drops it when `sx` sets the same axis.)
  // Tier fallback `sm` (the system-wide default tier): a profiled ContainedIcon with no
  // explicit `scale` (e.g. a bare `Accordion.Icon`) emits `aui-scale-<profile>-sm`, NOT a stale tier
  // that would render too big. A host (Button/Field/Accordion) that forwards its own resolved
  // scale still wins.
  // A bordered no-profile / `no-padding` box still needs an OWN scale cell so its inset width follows
  // xs→xl rather than falling back to a fixed 1px. The existing hug-reset below keeps no-padding's
  // min/padding/gap at zero, so adding the scale cell changes only the context rails the bordered box
  // actually needs (not its hug geometry). An unbordered no-profile icon keeps the historical lean path.
  const profileClass = profiled
    ? `aui-scale-${props.profile}-${props.scale ?? 'sm'}`
    : bordered && props.scale
      ? `aui-scale-no-padding-${props.scale}`
      : '';
  const hugResetClasses = profiled
    ? []
    : [
        'aui-min-width-0', 'aui-min-height-0',
        'aui-padding-inline-start-0', 'aui-padding-inline-end-0',
        'aui-padding-block-start-0', 'aui-padding-block-end-0',
        'aui-gap-0',
      ];
  const shapeClass = props.shape ? `aui-shape-${props.shape}` : '';
  const elevationClass = props.elevation ? `aui-elevation-${props.elevation}` : '';
  return mergeAuiClasses([
    'aui-contained-icon',
    lineHeightClass,
    ...cellClasses,
    profileClass,
    ...hugResetClasses,
    shapeClass,
    elevationClass,
    buildStyleProps(filterSx(props.sx, CONTAINED_ICON_SX_AXES)),
  ]);
}
