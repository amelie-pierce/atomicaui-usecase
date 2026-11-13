// modules/design/atomic-aui/src/core/build-style-props.ts
//
// Tier-2 typed layer-3 style-props → generated `.aui-<axis>-<value>` override classes.
// A SET prop emits a class that sets the `--aui-<axis>` HOOK the `.aui-frame` base map
// reads (`var(--aui-<axis>, <paint/role fallback>)`) → wins unconditionally over the
// active paint (mode-agnostic). An UNSET prop emits NO class → the `var()` fallback
// cascades (the `--aui-*` are `@property syntax:"*"` no-initial → unset = fallback).
//
// The map (`STYLE_PROP_MAP`) + the typed `AuiStyleProps` interface are GENERATED
// (`tokens/generated/style-props.ts`) from the same `LAYER3_MAP` the SCSS emitter uses —
// never hand-maintained. This builder is the pure consume-side.
import { STYLE_PROP_MAP } from '../../tokens/index';
import type {
  AuiStyleProps,
  AuiRadiusStartStartValue,
  AuiBorderBlockStartWidthValue,
} from '../../tokens/index';

/** Hand-curated shorthand layer in front of `buildStyleProps`. A SMALL, explicit expand-step
 *  — NOT an open shorthand system. Each shorthand fans out to the granular `AuiStyleProps` it
 *  abbreviates; a granular prop set alongside its shorthand WINS (expand first, granular last).
 *  The shorthand value types reuse the per-corner / per-side generated unions (all 4 share a
 *  type), so the shorthand stays token-snapped and drift-locked to the generator. */
export interface AuiStyleShorthands {
  /** Fans out to `radius{StartStart,StartEnd,EndStart,EndEnd}` (all 4 corners). */
  radius?: AuiRadiusStartStartValue;
  /** Fans out to `border{Block,Inline}{Start,End}Width` (all 4 sides). */
  borderWidth?: AuiBorderBlockStartWidthValue;
}

// ── Frame vs control archetype split (TS surface only — runtime is uniform) ──────────────
// Two tier-2 archetypes for the SAME `AuiStyleProps`/`AuiStyleShorthands` runtime builder:
//
//   • AuiFrameStyleProps  — the FULL surface (color + border + radius + focus + ANATOMY:
//     padding/size/gap/typography/icon/dot). For PLAIN `.aui-frame` consumers whose box
//     geometry is genuinely author-overridable — Button (and future Field, Select.Trigger).
//
//   • AuiControlStyleProps — color/border/radius/focus ONLY. For FIXED-ANATOMY controls
//     (Checkbox/Switch/Radio) whose marker classes HARD-SET their own geometry
//     (`.aui-switch{padding:0; inline-size; block-size}`, `.aui-checkbox`/`.aui-radio
//     {aspect-ratio:1}`). Those controls OWN their anatomy — the pill/circle math depends
//     on it — so an `paddingInline`/`width`/`gap`/… override would be silently MASKED by
//     the marker class (a false affordance). We omit those axes from the type so the
//     control never advertises an override it can't honor.
//
// The runtime (`STYLE_PROP_MAP`/`buildStyleProps`) stays UNIFORM: it
// no-ops any unset key, so narrowing is purely the compile-time prop surface.

/** The AuiStyleProps anatomy axes a FIXED-ANATOMY control (Checkbox/Switch/Radio) does NOT
 *  expose — its marker class hard-sets these, so an override would be silently masked. Hand-
 *  curated; each entry is a verified `AuiStyleProps` key (drift-checked against the generator). */
export const CONTROL_ANATOMY_AXES = [
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlockStart',
  'paddingBlockEnd',
  'gap',
  'rowGap',
  'columnGap',
  'width',
  'minWidth',
  'height',
  'minHeight',
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'iconSize',
  'iconContainer',
  'dotSize',
  // NOTE (Stage 2, 2026-06-27): the INNER-layout axes (display/flexDirection/flexWrap/
  // alignItems/justifyContent/flex) were REMOVED from this list. Fixed-anatomy control
  // markers no longer HARD-SET them at marker specificity — they yield via `:where(&)`
  // (0,0,0) in `_state-cascade.scss`, so an `aui.sx` layout override (0,1,0 static
  // utility) now WINS while the default still holds. The layout axes are LIVE on every
  // control, so they are no longer "axes a control can't honor."
] as const satisfies readonly (keyof AuiStyleProps)[];

/** FULL tier-2 surface: every layer-3 axis + the curated shorthands. For plain `.aui-frame`
 *  consumers (Button; future Field/Select.Trigger) whose box geometry is author-overridable. */
export type AuiFrameStyleProps = AuiStyleProps & AuiStyleShorthands;

/** COLOR/border/radius/focus-only tier-2 surface (anatomy axes omitted). For fixed-anatomy
 *  controls (Checkbox/Switch/Radio) that own their padding/size/gap via marker classes — a
 *  geometry override would break the pill/circle math and is silently masked, so it's not
 *  advertised. */
export type AuiControlStyleProps = Omit<AuiStyleProps, (typeof CONTROL_ANATOMY_AXES)[number]> &
  AuiStyleShorthands;

/** Expand the curated shorthands into their granular `AuiStyleProps` keys, then layer the
 *  explicit granular props ON TOP so a granular prop overrides the shorthand it shares a value
 *  with (e.g. `{ radius: 'pill', radiusStartStart: 'none' }` → 3 corners pill, one none). The
 *  shorthand keys themselves are dropped (they are not `STYLE_PROP_MAP` keys, so they would be
 *  inert anyway, but we strip them for a clean object). */
export function expandShorthands(props: Partial<AuiStyleProps & AuiStyleShorthands>): Partial<AuiStyleProps> {
  const { radius, borderWidth, ...granular } = props;
  const expanded: Partial<AuiStyleProps> = {};
  if (radius !== undefined) {
    expanded.radiusStartStart = radius;
    expanded.radiusStartEnd = radius;
    expanded.radiusEndStart = radius;
    expanded.radiusEndEnd = radius;
  }
  if (borderWidth !== undefined) {
    expanded.borderBlockStartWidth = borderWidth;
    expanded.borderBlockEndWidth = borderWidth;
    expanded.borderInlineStartWidth = borderWidth;
    expanded.borderInlineEndWidth = borderWidth;
  }
  // Granular props win over the shorthand expansion.
  return { ...expanded, ...granular };
}

/** Pure: typed layer-3 overrides (granular + curated shorthands) → a `.aui-<axis>-<value>`
 *  class string. Shorthands (`radius`/`borderWidth`) expand to their granular keys first, then
 *  any explicit granular prop overrides the shorthand. Iterates `STYLE_PROP_MAP`; for each key
 *  whose value is set, emits `${prefix}-${value}`; joins with spaces. Returns `''` when no prop
 *  is set (→ the cascade fallback fires). An unset prop is the only "inherit the cascade" path —
 *  the Core 6.0 value unions no longer carry an `'inherit'` member (the old inherit modes are gone). */
export function buildStyleProps(props: Partial<AuiStyleProps & AuiStyleShorthands>): string {
  const resolved = expandShorthands(props);
  const out: string[] = [];
  for (const key of Object.keys(STYLE_PROP_MAP) as (keyof typeof STYLE_PROP_MAP)[]) {
    const value = resolved[key];
    if (value === undefined) continue;
    out.push(`${STYLE_PROP_MAP[key]}-${value}`);
  }
  return out.join(' ');
}

const SHORTHAND_KEYS = ['radius', 'borderWidth'] satisfies (keyof AuiStyleShorthands)[];

/** Keys that must NEVER reach a cascade-reader LEAF part (`createAtomicPart`): the tier-1 recipe
 *  axes a leaf can't express (`paint`/`scale`/`shape`) plus every tier-2 `sx` key (a leaf has no
 *  box model). A leaf exposes the unified `aui` slot ONLY (`aui.color` = a local tint, `aui.sx` =
 *  granular overrides — both nested, so they never appear as top-level keys here). `createAtomicPart`
 *  strips these and dev-warns, so a spread/cast (`{...props}` carrying `paint`) can't silently leak
 *  to the DOM. */
export const PART_FORBIDDEN_STYLE_KEYS: ReadonlySet<string> = new Set<string>([
  'paint', 'scale', 'shape',
  ...Object.keys(STYLE_PROP_MAP),
  ...SHORTHAND_KEYS,
]);
