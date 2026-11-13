// modules/design/atomic-aui/src/lib/type/build-type-classes.ts
//
// Type RECIPE — the pure class-string builder for the hand-crafted <Type> primitive.
// Type renders ONE block/inline text element through the Core 6.0 typography cascade.
//
// Type is NOT a box. A full 7-axis `aui` box surface made no sense on a piece of text (a paragraph
// doesn't take a paint/profile/elevation), so it was removed. Type's ONLY appearance axis is the
// text COLOUR (`color`), which mirrors the 510-Foreground token (`aui.sx.foreground`) and DEFAULTS
// TO INHERIT (omit it → the element keeps `currentColor`). Everything else is the typographic
// IDENTITY layer:
//   • `role`   → `aui-typography-typescale-<role>` (300-Typography-Typescale: size/line-height/
//                weight/tracking). OPTIONAL — omit to leave the typescale unset (inherits).
//   • `weight` → `aui-typography-style-<weight>` (645-Typography-Style; overrides only the weight).
//   • `family` → the `data-aui-typography` attr (set by the component, not here — see type.tsx).
//   • `color`  → `aui-fg-<color>` (510-Foreground; the SAME class `aui.sx.foreground` emits).
import { type AuiTypographyStyleValue, type AuiForegroundValue, STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { buildStyleProps, type AuiFrameStyleProps } from '../../core/recipe/build-style-props';

// ── The 16 typescale roles (300-Typography-Typescale, MINUS the frame-neutral `default`) ──────
// Authored here as the runtime const + the derived literal union (mirrors AUI_SCALE_TIERS).
export const AUI_TYPESCALE_ROLES = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p1', 'p2', 'p3',
  'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7',
] as const;

/** A 300-Typography-Typescale role (`h1`…`h6` / `p1`…`p3` / `l1`…`l7`). The element's intrinsic
 *  typographic identity — NOT an `aui` appearance axis. */
export type TypescaleRole = (typeof AUI_TYPESCALE_ROLES)[number];

/** The `weight` override union — every 645-Typography-Style cut EXCEPT `default` (which is the
 *  role's own weight; omit `weight` to keep it). Mirrors how Icon's `weight` aliases an FA cut. */
export type TypeWeight = Exclude<AuiTypographyStyleValue, 'default'>;

/** The text COLOUR — mirrors the 510-Foreground token (the SAME value space as `aui.sx.foreground`).
 *  Omit it to INHERIT the ambient colour (the element keeps `currentColor`). */
export type TypeColor = AuiForegroundValue;

// ─── FULL-surface sx (G12) — Type gains `aui.sx` like Label ───────────────────────────────────────
// Type is TEXT, NOT a box (its box-paint model was deliberately removed — role/family/weight/color are
// its identity + colour surface, NOT `aui` box axes). But per the user ruling ("components should have
// all the aui.sx to customize things"), Type exposes the FULL `aui.sx` layer-3 override surface — the
// SAME axis set as Label (`LABEL_SX_AXES = Object.keys(STYLE_PROP_MAP)`), NOT narrowed (G12: default to
// FULL). Var-correct-inert axes on text (e.g. `iconSize`/`dotSize`) are KEPT for uniformity. The
// top-level box axes (paint/profile/scale/shape/elevation) are intentionally NOT added — text has no
// box, and Type's `role`/`color`/`weight` already ARE its top-level surface.
export const TYPE_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

/** Type's `aui` slot — the sx surface ONLY (Type has no box, so no `color/paint/scale/...` axes; those
 *  live in the identity props). The full `AuiFrameStyleProps` sx (same as Label). */
export type TypeAui = { sx?: AuiFrameStyleProps };

/** Inputs for the Type recipe. */
export interface BuildTypeClassesProps {
  /** OPTIONAL typescale role. Omit → typescale unset (the text inherits its size). */
  role?: TypescaleRole;
  /** OPTIONAL weight override (645-Typography-Style cut). ERGONOMIC SHORTCUT for `sx.typographyStyle`. */
  weight?: TypeWeight;
  /** OPTIONAL text colour (510-Foreground). ERGONOMIC SHORTCUT for `sx.foreground`. Omit → inherits. */
  color?: TypeColor;
  /** OPTIONAL full layer-3 `aui.sx` override surface (`fontSize`/`typographyStyle`/`foreground`/
   *  spacing/border/radius/…). An explicit `sx.foreground`/`sx.typographyStyle` WINS over the `color`/
   *  `weight` shortcut (emitted after them → last wins the role dedup). */
  sx?: AuiFrameStyleProps;
}

/** Pure: Type props → the `.aui-*` class string for the text element.
 *  ALWAYS emits `aui-frame` (the typescale-var reader: it maps `--aui-font-size`/`--aui-line-height`/
 *  … onto real font properties) + the `no-padding` geometry cell. The cell is non-negotiable:
 *  `--aui-padding-*`/`--aui-gap` are inheriting `@property` hooks, so ANY padded `.aui-frame`
 *  ancestor leaks its spacing into a bare `<Type>` (G14) — the cell RE-SETS those hooks to 0.
 *  `color` → `aui-fg-<color>` (text colour; omit to inherit), `weight` → the style override, and the
 *  role typescale is appended LAST (when set) so it wins the dedup. */
export function buildTypeClasses(props: BuildTypeClassesProps): string {
  const { role, weight, color, sx } = props;
  const fragments: (string | false | null | undefined)[] = [
    'aui-frame',
    // Reset the inheriting box hooks so a padded `.aui-frame` ancestor can't leak spacing into the
    // text. `no-padding` zeroes padding/gap; the `sm` tier's other geometry (min/icon/dot) is inert
    // for a text element.
    'aui-scale-no-padding-sm',
    // Type is TEXT, not a box — reset the inheriting `--aui-bg` so a colored `.aui-frame` ancestor
    // (a solid View / surface) can't leak its fill onto the text. `--aui-bg` is `inherits:true`
    // (_component-tokens.scss:37) and `.aui-frame` paints `background:var(--aui-bg)`, so WITHOUT this a
    // bare `<Type>` inside a solid View paints the View's background (and would also COVER the View's
    // `::after` hover overlay). Emit the generated transparent class — the SAME G11 default-in-the-
    // recipe pattern ContainedIcon uses (build-icon-classes.ts:188), never a `:where()` reset.
    'aui-bg-transparent',
  ];

  // text COLOUR (510-Foreground) — the ONLY appearance axis. Omit to inherit (`currentColor`).
  if (color) fragments.push(`aui-fg-${color}`);

  // `weight` override (645-Typography-Style) — before the role so the role's size/line-height/
  // tracking still win while the weight is the explicit one.
  if (weight) fragments.push(`aui-typography-style-${weight}`);

  // The FULL `aui.sx` layer-3 surface AFTER the color/weight shortcuts, so an explicit
  // `sx.foreground`/`sx.typographyStyle` WINS the role dedup over the shortcut (mergeAuiClasses = last
  // per role). Non-conflicting sx axes (fontSize/spacing/border/…) just add.
  if (sx) {
    const sxClasses = buildStyleProps(sx);
    if (sxClasses) fragments.push(sxClasses);
  }

  // The ROLE typescale LAST (when set) — so it wins the `aui-typography-typescale` dedup.
  if (role) fragments.push(`aui-typography-typescale-${role}`);

  return mergeAuiClasses(fragments);
}
