// modules/design/atomic-aui/src/lib/type/type.tsx
//
// Type — a hand-crafted (non-Base-UI) AtomicAUI 6.0 primitive: ONE block/inline text element
// rendered through the Core 6.0 typography cascade. Like Icon (and unlike Button/Checkbox/…) it
// does NOT use `createAtomicComponent` — there is no headless core, no state layer, no `selected`.
// A plain `React.forwardRef` whose per-instance glue (recipe classes, className compose, identity
// data-attrs) lives in `./use-recipe` (`useTypeRecipe`). This file is just the render shell.
//
// Type is NOT a box — a full `aui` box surface made no sense on text and was removed. Its layers:
//   • IDENTITY (top-level) — `role` (the typescale), `family` (the typeface), `weight` (a weight
//     override). Typography is NEVER an `aui` axis — it is the element's intrinsic identity.
//   • COLOUR — `color` mirrors the 510-Foreground token (`aui.sx.foreground`) and DEFAULTS TO
//     INHERIT (omit it → the element keeps `currentColor`). It is the ONLY appearance axis.
import * as React from 'react';
import { useTypeRecipe } from './use-recipe';
import type { TypeFamily } from './use-recipe';
import type { TypeAui, TypeColor, TypeWeight, TypescaleRole } from './build-type-classes';

// Re-export the public identity + colour + sx types so `./type` importers (and the barrel) have the
// whole surface from one module.
export { AUI_TYPESCALE_ROLES, TYPE_SX_AXES } from './build-type-classes';
export type { TypescaleRole, TypeWeight, TypeColor, TypeAui } from './build-type-classes';
export type { TypeFamily } from './use-recipe';

export interface TypeProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** OPTIONAL. The 300-Typography-Typescale role (`h1`…`h6` / `p1`…`p3` / `l1`…`l7`) — the text's
   *  intrinsic typographic identity → `aui-typography-typescale-<role>`. Omit to leave the typescale
   *  UNSET: the text inherits its size from the ambient cascade, so `role` never silently overrides
   *  an inherited size. */
  role?: TypescaleRole;
  /** Typeface family — IDENTITY (top-level). Default `'body'`. Sets the `data-aui-typography` attr
   *  so the per-family typescale metrics resolve. */
  family?: TypeFamily;
  /** Optional 645-Typography-Style weight OVERRIDE → `aui-typography-style-<weight>`. Omit to keep
   *  the role's default weight. Mirrors Icon's `weight` identity prop. */
  weight?: TypeWeight;
  /** OPTIONAL text colour — mirrors the 510-Foreground token (same value space as
   *  `aui.sx.foreground`) → `aui-fg-<color>`. Omit to INHERIT the ambient colour (`currentColor`).
   *  An ERGONOMIC SHORTCUT for `aui.sx.foreground` (an explicit `aui.sx.foreground` wins). */
  color?: TypeColor;
  /** OPTIONAL `aui` slot — the FULL layer-3 `aui.sx` override surface (the same axes as Label:
   *  `fontSize`/`typographyStyle`/`foreground`/spacing/border/radius/…). Type is TEXT, not a box, so
   *  `aui` carries ONLY `sx` — there are no `color/paint/scale/...` box axes (role/family/weight/color
   *  ARE Type's top-level surface). An explicit `aui.sx.foreground`/`typographyStyle` overrides the
   *  `color`/`weight` shortcut. */
  aui?: TypeAui;
  /** Render element (polymorphism). Default `'p'`. */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

const TypeRoot = React.forwardRef<HTMLElement, TypeProps>(function Type(
  { role, family = 'body', weight, color, aui, as, className, children, ...rest },
  ref,
) {
  const { className: composedClassName, dataAttrs } = useTypeRecipe({
    role,
    family,
    weight,
    color,
    sx: aui?.sx,
    className,
  });

  const Tag = (as ?? 'p') as React.ElementType;
  return (
    <Tag ref={ref} className={composedClassName} {...dataAttrs} {...rest}>
      {children}
    </Tag>
  );
});
TypeRoot.displayName = 'Type';

export const Type = TypeRoot;
export default Type;
