// modules/design/atomic-aui/src/lib/symbol/build-symbol-classes.ts
//
// Symbol RECIPE — the pure class-string builder for the hand-crafted <Symbol> primitive.
// Symbol is the MONO sibling of <Type>: ONE inline text element rendered through the same Core 6.0
// typography cascade, but defaulting to the `mono` typeface (family is still an overridable axis) so
// it can render units (inch / psi / °F), math symbols (∞), and the mono part of a mixed display+mono
// expression (`N` + a `ua` subscript).
//
// Symbol SHARES Type's recipe — it is NOT a duplicate. `buildTypeClasses` supplies the whole shared
// frame: `aui-frame` (the typescale-var reader) + the `no-padding` geometry reset (G14) + the
// `aui-bg-transparent` leak reset (G11) + the optional `role` typescale / `weight` style / `color`
// foreground. On top of that Symbol adds only its OWN two layers:
//   • the `aui-symbol` MARKER — the hook the hand-authored `_state-cascade.scss` script rules key on
//     (`.aui-symbol[data-aui-script=subscript|superscript]`). ALWAYS emitted (it is the identity).
//   • `emphasis` → `aui-emphasis-reduced` (231-Emphasis) — the decorative/muted treatment
//     (`--theme-muted`). Symbol is the first component to expose this axis. An explicit `color`
//     (`aui-fg-<color>`, specificity 0,1,0) deliberately WINS over the `:where(.aui-emphasis-reduced)`
//     muted default (0,0,0), so a colored symbol keeps its colour.
//
// NOTE — `family` (display/body/mono) and `script` (normal/subscript/superscript) are NOT classes:
// they are IDENTITY data-attrs stamped by the component (`data-aui-typography` / `data-aui-script`),
// the same pattern Type uses for `family`. They live in `./use-recipe` + `./symbol`, not here.
import { buildTypeClasses } from '../type/build-type-classes';
import type { TypeColor, TypeWeight, TypescaleRole } from '../type/build-type-classes';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import type { AuiEmphasis } from '../../tokens/index';

// Re-export the shared Type identity/colour types so `./symbol` importers get the whole surface from
// one module (Symbol mirrors Type's role/weight/color value spaces exactly — no parallel unions).
export type { TypeColor, TypeWeight, TypescaleRole } from '../type/build-type-classes';

/** The `script` axis — the vertical-script mode of the glyph. IDENTITY (a `data-aui-script` attr, set
 *  by the component), NOT a class. `normal` (default) renders on the baseline; `subscript` /
 *  `superscript` nudge a reduced glyph below / above the baseline WITHOUT growing the line box (see the
 *  hand-authored `.aui-symbol[data-aui-script=…]` rules in `_state-cascade.scss`). */
export type SymbolScript = 'normal' | 'subscript' | 'superscript';

/** Inputs for the Symbol recipe (the class-producing axes only — `family`/`script` are data-attrs). */
export interface BuildSymbolClassesProps {
  /** OPTIONAL typescale role. Omit → typescale unset (the text inherits its size). */
  role?: TypescaleRole;
  /** OPTIONAL weight override (645-Typography-Style cut). */
  weight?: TypeWeight;
  /** OPTIONAL text colour (510-Foreground). Omit → inherits the ambient colour. */
  color?: TypeColor;
  /** OPTIONAL emphasis (231-Emphasis). `reduced` → the muted/decorative treatment; `default` (or
   *  omitted) emits nothing. An explicit `color` overrides the muted default. */
  emphasis?: AuiEmphasis;
}

/** Pure: Symbol props → the `.aui-*` class string for the text element. Composes the shared Type
 *  recipe (frame + resets + typescale/weight/colour), then appends the `aui-symbol` marker and, when
 *  `emphasis==='reduced'`, the `aui-emphasis-reduced` role. `mergeAuiClasses` dedups by role so the
 *  combined set stays canonical. */
export function buildSymbolClasses(props: BuildSymbolClassesProps): string {
  const { role, weight, color, emphasis } = props;
  return mergeAuiClasses([
    // The SHARED Type recipe — frame + box-resets + the optional typescale/weight/foreground.
    buildTypeClasses({ role, weight, color }),
    // Symbol's identity marker — the hook the script-axis CSS keys on. ALWAYS present.
    'aui-symbol',
    // Emphasis (231-Emphasis) — only the `reduced` level emits a class.
    emphasis === 'reduced' && 'aui-emphasis-reduced',
  ]);
}
