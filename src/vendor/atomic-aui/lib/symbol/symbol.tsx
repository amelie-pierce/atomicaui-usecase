// modules/design/atomic-aui/src/lib/symbol/symbol.tsx
//
// Symbol — the MONO sibling of <Type>: a hand-crafted (non-Base-UI) AtomicAUI 6.0 text primitive for
// rendering units (inch / psi / °F), math symbols (∞), and the mono part of a mixed display+mono
// expression. Same shape as <Type> (plain `React.forwardRef`, no headless core, no state layer, no
// `selected`) and it SHARES Type's recipe (`buildTypeClasses`) — it is NOT a duplicate. This file is
// just the render shell; the per-instance glue (recipe classes, className compose, identity attrs)
// lives in `./use-recipe`.
//
// Symbol is NOT a box (like Type — text takes a colour, not a paint/profile/elevation). Its axes:
//   • IDENTITY — `family` (DEFAULTS to `'mono'`; still overridable to display/body), `role` (the
//     typescale), `weight` (a weight override), `script` (`normal`/`subscript`/`superscript` — the
//     vertical-script mode, rendered WITHOUT growing the line box; see `_state-cascade.scss`).
//   • COLOUR — `color` mirrors the 510-Foreground token and DEFAULTS TO INHERIT.
//   • EMPHASIS — `emphasis` (231-Emphasis): `reduced` is the muted/decorative treatment. Symbol is
//     the first component to expose this axis. An explicit `color` overrides the muted default.
//
// A mixed label composes Type + Symbol: `<Type>N</Type><Symbol script="subscript">ua</Symbol>`.
import * as React from 'react';
import { useSymbolRecipe } from './use-recipe';
import type { SymbolScript } from './build-symbol-classes';
import type { TypeColor, TypeWeight, TypescaleRole } from '../type/build-type-classes';
import type { TypeFamily } from '../type/use-recipe';
import type { AuiEmphasis } from '../../tokens/index';

// Re-export the public identity / colour / emphasis / script types so `./symbol` importers (and the
// barrel) get the whole surface from one module. Symbol mirrors Type's role/family/weight/color value
// spaces exactly — they are re-exported, never re-declared.
export { buildSymbolClasses } from './build-symbol-classes';
export type { SymbolScript } from './build-symbol-classes';
export type { TypeColor, TypeWeight, TypescaleRole } from '../type/build-type-classes';
export type { TypeFamily } from '../type/use-recipe';

export interface SymbolProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** OPTIONAL 300-Typography-Typescale role (`h1`…`h6` / `p1`…`p3` / `l1`…`l7`) → the typescale.
   *  Omit to leave it UNSET (inherits the ambient size). */
  role?: TypescaleRole;
  /** Typeface family — IDENTITY. Default `'mono'` (Symbol renders mono by default). Overridable to
   *  `'display'` / `'body'` — it is an axis, not a pin. Sets the `data-aui-typography` attr. */
  family?: TypeFamily;
  /** Optional 645-Typography-Style weight OVERRIDE → `aui-typography-style-<weight>`. */
  weight?: TypeWeight;
  /** OPTIONAL text colour — mirrors the 510-Foreground token → `aui-fg-<color>`. Omit to INHERIT the
   *  ambient colour. Overrides the `emphasis="reduced"` muted default. */
  color?: TypeColor;
  /** Vertical-script mode — IDENTITY. Default `'normal'`. `subscript` / `superscript` nudge a reduced
   *  glyph below / above the baseline WITHOUT growing the line box (no native `<sub>`/`<sup>`). */
  script?: SymbolScript;
  /** OPTIONAL emphasis (231-Emphasis). `'reduced'` → the muted/decorative treatment (`--theme-muted`).
   *  Default `'default'` (omits). */
  emphasis?: AuiEmphasis;
  /** Render element (polymorphism). Default `'span'` (Symbol is inline — units/math live in a line). */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const SymbolRoot = React.forwardRef<HTMLElement, SymbolProps>(function SymbolRoot(
  { role, family = 'mono', weight, color, script, emphasis, as, className, children, ...rest },
  ref,
) {
  const { className: composedClassName, dataAttrs } = useSymbolRecipe({
    role,
    family,
    weight,
    color,
    script,
    emphasis,
    className,
  });

  const Tag = (as ?? 'span') as React.ElementType;
  return (
    <Tag ref={ref} className={composedClassName} {...dataAttrs} {...rest}>
      {children}
    </Tag>
  );
});
SymbolRoot.displayName = 'Symbol';

export const Symbol = SymbolRoot;
export default Symbol;
