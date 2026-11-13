// modules/design/atomic-aui/src/core/recipe/part-classes.ts
//
// Cascade-reader PART recipe surface (extracted from build-unstyled-classes.ts):
//   • `buildPartClasses`      — cascade-reader PART color anchor emitter
//   • `PartAuiSlot`/`PartStyleProps`/`PART_STYLE_KEYS` — part prop surface
//   • `PART_SX_AXES`/`PartSxProps` — part `sx` allow-list (COLOR FAMILY only)
import type { AuiRecipeColor, AuiScaleProfile } from '../vocabulary/recipe-vocab';
import { STYLE_PROP_MAP, type AuiStyleProps } from '../../tokens/index';
import { buildStyleProps, type AuiStyleShorthands } from './build-style-props';
import type { AppearanceProps } from '../vocabulary/leaf-vocabulary';

// ── Part sx allow-list (COLOR FAMILY only) ────────────────────────────────────────────────
// A part is a SINGLE-FILL puck/glyph — its marker class hard-sets geometry (width/height/
// padding/gap). Accepting anatomy axes in `aui.sx` would be a false affordance: the marker
// wins at equal specificity, so the class would silently do nothing. The allowed axes are:
//
//   • COLOR:   `background`, `foreground`, `borderColor`, `focusColor`, `focusWidth`
//   • SHAPE:   `radiusStartStart/End`, `radiusEndStart/End` (granular) + `radius` shorthand.
//              A puck's corner-radius is NOT anatomy — changing it doesn't break pill math
//              (the marker sets padding/size, not border-radius). Allowed.
//   • BORDER:  `border{Block,Inline}{Start,End}Width` (granular) + `borderWidth` shorthand.
//              Width-only: borderColor is above; width is stroke thickness, not geometry.
//              Allowed — the puck can have a decorative stroke.
//   • EXCLUDED: all anatomy/typography/icon/dot axes (padding*/gap/width/height/min*/
//               font*/lineHeight/letterSpacing/typographyStyle/iconSize/iconContainer/
//               iconStyle/dotSize) — the marker owns these.
//
// RUNTIME enforcement: `createAtomicPart` filters `aui.sx` to this set before calling
// `buildStyleProps` and dev-warns on dropped keys (production silently drops).
// TYPE enforcement: `PartAuiSlot.sx` is a `Pick` of this allow-list so typed consumers
// are guided at authoring time.
const PART_SX_AXES_KEYS = [
  // Color family
  'background', 'foreground', 'borderColor', 'focusColor', 'focusWidth',
  // Border width (stroke, not anatomy)
  'borderBlockStartWidth', 'borderBlockEndWidth',
  'borderInlineStartWidth', 'borderInlineEndWidth',
  // Shape / radius (corner-radius, not anatomy — puck geometry is padding/size, not radius)
  'radiusStartStart', 'radiusStartEnd', 'radiusEndStart', 'radiusEndEnd',
  // Curated shorthands (expand to the granular keys above before class emit)
  'radius', 'borderWidth',
] as const satisfies readonly (keyof (AuiStyleProps & AuiStyleShorthands))[];

/** Runtime guard Set: keys allowed in a part's `aui.sx`. Used by `createAtomicPart`
 *  to filter before `buildStyleProps`. */
export const PART_SX_AXES: ReadonlySet<string> = new Set<string>(PART_SX_AXES_KEYS);

// ── FULL-surface part sx allow-list (G12, 2026-06-12) ─────────────────────────────────────────
// A CONTAINER box part whose marker is reworked to READ every override hook (the `.aui-checkbox`
// box treatment) can expose the SAME full sx surface a frame leaf does — NOT just the color family.
// Opt a part into this via `createAtomicPart(..., { sxAxes: FRAME_PART_SX_AXES })`; its marker MUST
// then read the anatomy hooks (size from `--aui-width/height`, padding via composed longhands, gap
// from `--aui-gap`) or the new knobs would be false affordances.
const FRAME_PART_SX_EXCLUDE = new Set<string>([]);
export const FRAME_PART_SX_AXES: ReadonlySet<string> = new Set<string>([
  ...(Object.keys(STYLE_PROP_MAP) as string[]).filter((k) => !FRAME_PART_SX_EXCLUDE.has(k)),
  'radius',
  'borderWidth',
]);

/** The subset of `AuiStyleProps & AuiStyleShorthands` a part's `sx` may accept.
 *  Anatomy axes (padding/gap/width/height/font/icon/dot) are intentionally absent —
 *  the marker class owns them and would silently mask any override. */
export type PartSxProps = Pick<AuiStyleProps & AuiStyleShorthands, (typeof PART_SX_AXES_KEYS)[number]>;

/** The override slot a styleable PART exposes via the unified `aui` namespace — the FULL
 *  {@link AppearanceProps} (the same seven axes a frame leaf accepts), resolved the SAME way as
 *  a frame leaf (NO special "retint" mode — that was removed 2026-06-11 to keep parts uniform
 *  with every other `aui`). How each axis manifests:
 *
 *   • `color` + `paint` → the STANDARD context cell `aui-color-<paint>-<chroma>` on an `aui-frame`
 *     (paint defaults `solid`, chroma defaults `surface`) — a part with `color` paints/borders its
 *     box exactly like a frame would. To recolor a GLYPH (not a box), use the glyph part itself
 *     (a `ContainedIcon` / `Checkbox.Icon`, whose `color` sets the icon foreground).
 *   • `scale`/`profile` → the compound `aui-scale-<profile>-<tier>` geometry rail.
 *   • `shape` → `aui-shape-<shape>`; `elevation` → `aui-elevation-<n>`.
 *   • `sx` → granular tier-2 overrides, RUNTIME-narrowed to the COLOR FAMILY allow-list
 *     (`PART_SX_AXES`): anatomy axes (padding/gap/width/height/font/icon/dot) are the marker's
 *     to own and are dropped + dev-warned. The TYPE stays the full `sx` for surface uniformity.
 *   • No `aui` set → marker-only (inherits the cascade — the default). */
export type PartAuiSlot = AppearanceProps;
/** The unified `aui` prop shape a styleable part accepts. */
export interface PartStyleProps {
  aui?: PartAuiSlot;
}

/** Build the recipe class fragment (everything EXCEPT the marker, which the factory prepends)
 *  for a styleable PART from its `aui` {@link PartAuiSlot}. The part resolves the SAME way as a
 *  frame leaf — NO special foreground "retint": `color`/`paint` form the standard context cell
 *  `aui-color-<paint>-<chroma>`. Once a part carries ANY `aui` it becomes an `aui-frame aui-part`,
 *  so it READS the full `--aui-*` hook set ON ITS OWN LAYER — every `sx` prop (background/border/
 *  radius/…) is live, not just color. This is LAYER-LOCAL, NOT a cascade: the `--aui-*` hooks are all
 *  `@property inherits:false`, so they stay on this element and never reach a descendant. `.aui-part`
 *  neutralises the anatomy axes the frame brings (padding/gap) that the fixed-anatomy part doesn't
 *  own. With NO color/paint, `aui-bg-transparent` keeps the transparent frame from inheriting a host
 *  `--paint-fill`. Geometry/shape/elevation rails emit when set; `sx` is filtered to the color-family
 *  allow-list. Returns the joined class string + the dropped (anatomy) sx keys so the caller can
 *  dev-warn. Emits NOTHING when no `aui` is set — a bare part stays marker-only (default unchanged). */
export function buildStyleablePartClasses(
  aui: PartAuiSlot | undefined,
  sxAllow: ReadonlySet<string> = PART_SX_AXES,
  colorMode: PartColorMode = 'box',
  defaultProfile: AuiScaleProfile = 'default',
  colorOnly = false,
): { classes: string; droppedSx: string[] } {
  if (!aui) return { classes: '', droppedSx: [] };
  const frags: string[] = [];
  const foreground = colorMode === 'foreground';

  // COLOR-ONLY parts (View.ScrollAreaThumb): a part whose Base UI core OWNS its main-axis size
  // (the proportional `--scroll-area-thumb-height/-width`). It must NEVER become an `.aui-frame`
  // (which reads `--aui-min-width/-height`) and must NEVER emit a `scale`/`profile` geometry rail
  // (a scale cell POPULATES `--aui-min-*` → a main-axis min-size that overrides Base UI's transform
  // → a full-length thumb shoved out of the box: the exact discard cause). It exposes ONLY the
  // FOREGROUND tint (`aui-fg-<c>`, which the marker reads) + the color-family `sx` — NO box frame,
  // NO scale/profile/shape/elevation. `colorOnly` REQUIRES `colorMode:'foreground'` (a bare-glyph
  // surface) and a color-family `sxAllow` (the caller passes `PART_SX_AXES`).
  if (colorOnly) {
    if (foreground && aui.color !== undefined) frags.push(`aui-fg-${aui.color}`);
    const { classes: sxOnly, dropped } = buildPartSxClasses(aui.sx, sxAllow);
    if (sxOnly) frags.push(sxOnly);
    // Report scale/profile/shape/elevation (and any box paint) as dropped so the caller dev-warns —
    // these axes have NO safe realisation on a Base-UI-sized part.
    const droppedAxes = [...dropped];
    if (aui.scale !== undefined) droppedAxes.push('scale');
    if (aui.profile !== undefined) droppedAxes.push('profile');
    if (aui.shape !== undefined) droppedAxes.push('shape');
    if (aui.elevation !== undefined) droppedAxes.push('elevation');
    if (aui.paint !== undefined) droppedAxes.push('paint');
    return { classes: frags.join(' '), droppedSx: droppedAxes };
  }

  // 1. frame base + color. Once a styleable part carries ANY `aui`, it is an `.aui-frame`, so
  //    it READS the full `--aui-*` hook set on its OWN layer — every `sx` prop is live (background/
  //    border/radius/focus/…), not just `color`. This is NOT a cascade: the `--aui-*` hooks are all
  //    `@property inherits:false`, so they stay on THIS element and never reach a descendant.
  //
  //    TWO color modes:
  //    • `'box'` (default — Checkbox/Radio.Indicator): STANDARD `aui` semantics — `color`/`paint` →
  //      the paint cell `aui-color-<paint>-<chroma>` (`paint` defaults `solid`, `chroma` `surface`),
  //      painting the part's BOX background+border like a frame.
  //    • `'foreground'` (Switch.Thumb): the part is a SOLID puck whose visible surface IS its
  //      background, painted by the marker as `var(--aui-fg, currentColor)` (a contrast puck riding
  //      the track color by default). So `color` here tints that FILL via the `aui-fg-<c>`
  //      foreground anchor (sets `--aui-fg`), NOT the box cell — emitting `aui-color-*` (→ `--paint-fill`)
  //      would be DEAD because the marker never reads `--paint-fill`. `paint` is inert in this mode.
  //    With NEITHER color nor paint (or foreground mode), emit `aui-bg-transparent` so the transparent
  //    frame does NOT pick up an inherited host `--paint-fill` (the "weird box" guard, G11); an
  //    `sx.background` still overrides it (it merges LAST → wins the `--aui-bg` role dedup).
  if (!foreground && (aui.color !== undefined || aui.paint !== undefined)) {
    const paint = aui.paint ?? 'solid';
    const bordered = paint === 'tonal' || paint === 'fixed';
    const chroma = aui.color ?? 'surface';
    frags.push('aui-frame', 'aui-part', `aui-color-${paint}-${chroma}`);
    // The shared inset frame owns both the scale-aware stroke width and the local effective-padding
    // subtraction (F5.46/G53). A fixed width utility here would override the active scale rail.
    if (bordered) frags.push('aui-frame--inset');
  } else {
    frags.push('aui-frame', 'aui-part', 'aui-bg-transparent');
    // Foreground recolor: `color` tints the puck's OWN fill via `--aui-fg` (the marker reads it).
    if (foreground && aui.color !== undefined) frags.push(`aui-fg-${aui.color}`);
  }

  // 2. geometry rail — the compound scale class when scale OR profile is set. The profile falls back
  //    to `defaultProfile` (default `'default'`; Switch.Thumb pins `'switch'`) so a part's OWN `scale`
  //    resolves the SAME cell the PARENT would at that tier — e.g. `<Switch.Thumb aui={{scale:'xl'}}>`
  //    emits `aui-scale-switch-xl`, giving the puck the identical `--aui-dot-size` the parent's
  //    `scale:'xl'` cascades. Without this the part defaulted to the `default` profile, whose `xl`
  //    dot-size differs (much smaller) → a thumb `scale` that didn't match its own parent.
  if (aui.scale || aui.profile) frags.push(`aui-scale-${aui.profile ?? defaultProfile}-${aui.scale ?? 'md'}`);

  // 3. shape (corner radius) + 4. elevation.
  if (aui.shape) frags.push(`aui-shape-${aui.shape}`);
  if (aui.elevation !== undefined) frags.push(`aui-elevation-${aui.elevation}`);

  // 5. sx → the part's allow-list (color-family by default; the full surface for a marker-reads-
  //    every-hook container part). Keys outside the allow-list are dropped (caller dev-warns).
  const { classes: sxClasses, dropped } = buildPartSxClasses(aui.sx, sxAllow);
  if (sxClasses) frags.push(sxClasses);

  return { classes: frags.join(' '), droppedSx: dropped };
}

/** Filter a part's `aui.sx` to the COLOR-FAMILY allow-list (`PART_SX_AXES`) and emit classes.
 *  Returns the class string + the dropped anatomy keys. Shorthands (`radius`/`borderWidth`) are
 *  in the allow-list and survive to `buildStyleProps`, which expands them. */
function buildPartSxClasses(
  sx: PartAuiSlot['sx'] | undefined,
  allow: ReadonlySet<string> = PART_SX_AXES,
): { classes: string; dropped: string[] } {
  if (!sx) return { classes: '', dropped: [] };
  const allowed: Record<string, unknown> = {};
  const dropped: string[] = [];
  for (const [k, v] of Object.entries(sx)) {
    if (allow.has(k)) allowed[k] = v;
    else dropped.push(k);
  }
  const classes = Object.keys(allowed).length
    ? buildStyleProps(allowed as Partial<AuiStyleProps & AuiStyleShorthands>)
    : '';
  return { classes, dropped };
}
/** How a styleable part's `aui.color` is realised:
 *  • `'box'` (default) — the standard context cell `aui-color-<paint>-<chroma>` paints the part's
 *    BOX background+border (Checkbox.Indicator, Radio.Indicator).
 *  • `'foreground'` — the part is a SOLID puck/dot whose marker paints `var(--aui-fg, currentColor)`,
 *    so `color` tints that fill via the `aui-fg-<c>` foreground anchor (Switch.Thumb). */
export type PartColorMode = 'box' | 'foreground';

/** Prop keys the part recipe consumes — stripped from the DOM/core spread. */
export const PART_STYLE_KEYS = ['aui'] as const;

/** Narrow `useUnstyled` emitter for a cascade-reader PART's color anchor. Emits NOTHING when no
 *  `color` is set — the part inherits the parent's resolved box `color` (the default; marker-only).
 *
 *  When set, it tints the part's OWN glyph/fill the color's HUE by setting the FOREGROUND override
 *  role `--aui-fg` on the part via the generated `aui-fg-<c>` utility (`--aui-fg` is `@property
 *  inherits:false`, so it is cleanly part-LOCAL — it never leaks from / to the host). Each part
 *  marker then resolves its color/fill through `var(--aui-fg, currentColor)`:
 *    • no override → `--aui-fg` is unset → marker falls back to `currentColor` (the inherited box
 *      color chain — accent → fg → emphasis → paint — UNCHANGED from the cascade default);
 *    • override set → `--aui-fg` is the hue → the glyph/dot/puck recolors, with NO box paint.
 *
 *  This deliberately does NOT emit `aui-frame` / `aui-color-tonal-*`: on a part whose marker fills
 *  the box (`inline-size/block-size:100%`), `.aui-frame` would paint a full background+border (the
 *  tonal `--paint-fill` ≈ near-white "on-<c>"), masking the control's own selected fill — the
 *  "weird box" bug. We retint the FOREGROUND only, never paint a box. Accepts the inner color-only
 *  shape (NOT the full `PartStyleProps` — call with `buildPartClasses({ color: aui?.color })`). */
export function buildPartClasses(p: { color?: AuiRecipeColor }): string {
  if (!p.color) return '';
  return `aui-fg-${p.color}`;
}
