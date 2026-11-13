// modules/design/atomic-aui/src/lib/icon/icon.tsx
//
// Icon — the FIRST hand-crafted (non-Base-UI) AtomicAUI 6.0 component. A single
// FontAwesome 7 glyph rendered through the Core 6.0 token cascade on the unified `aui`
// namespace. Render engine = the FA Kit (`<i className="fa-…">`), Web Font mode required.
//
// Unlike Button/Checkbox/Switch/Radio this does NOT use `createAtomicComponent` — the
// factory always renders its element (can't suppress for an invalid name) and buys nothing
// here (no Base UI, no state layer). Icon is a plain `forwardRef` whose per-instance glue
// (context-resolved identity, name validation, FA mapping, recipe classes, a11y, the webfont
// dev-guard) lives in `./use-recipe` (`useIconRecipe`) — a PLAIN composition hook, NOT the
// factory PropHook pattern (see use-recipe.ts header). This file is now just the render shell.
// (Spec §0, §4, §5.1, §6, §8.)
import * as React from 'react';
import type { IconSxProps } from '../../core/recipe/build-icon-classes';
import { useIconRecipe } from './use-recipe';
import type { IconColor, IconScale } from './use-recipe';
import type { IconFamily, IconLayer, IconWeight } from './fa-mapping';

// Public appearance namespace + identity types are homed in ./use-recipe (the recipe layer),
// mirroring how `ButtonAui` lives in button/use-recipe.ts. Re-export them here so the Icon
// public surface (and `./icon` importers) is unchanged.
export type { IconAui } from './use-recipe';
export type { IconColor, IconScale } from './use-recipe';
export type { IconFamily, IconLayer, IconWeight } from './fa-mapping';

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** REQUIRED. FA web icon name (`house`, `circle-user`); validated kebab-case. An invalid
   *  name dev-warns + renders an inspectable fallback `<i>` (never null, never throws). A
   *  well-formed but nonexistent name renders blank (FA webfont behavior) — no warning. */
  name: string;
  /** Icon family — IDENTITY (top-level). Default: ctx ?? 'classic'. */
  family?: IconFamily;
  /** Mono- vs duo-tone — IDENTITY (top-level). Default: ctx ?? 'monotone'. */
  layer?: IconLayer;
  /** FA cut/weight — IDENTITY (top-level). Default: ctx ?? 'solid'. */
  weight?: IconWeight;
  /** Appearance: color / scale / sx. NO paint, NO states. */
  aui?: { color?: IconColor; scale?: IconScale; sx?: IconSxProps };
}

const IconRoot = React.forwardRef<HTMLElement, IconProps>(function Icon(
  { name, family, layer, weight, aui, className, ...rest },
  ref
) {
  // All per-instance glue (webfont guard, identity resolve, validation, FA mapping, recipe
  // classes, className compose + fa-smuggle guard, a11y) lives in the recipe hook.
  const { className: composedClassName, dataAttrs, a11y, isInvalid, invalidName } =
    useIconRecipe({ name, family, layer, weight, aui, className, rest });

  return React.createElement('i', {
    ref,
    ...rest,
    className: composedClassName,
    ...dataAttrs,
    ...(isInvalid ? { 'data-aui-icon-invalid': invalidName } : null),
    ...a11y,
  });
});
IconRoot.displayName = 'Icon';

export const Icon = IconRoot;
export default Icon;

// Re-export the TEST-ONLY webfont once-latch reset so `import { __resetWebfontWarnForTest }
// from './icon'` (icon.spec.tsx + contained-icon.spec.tsx) keeps resolving — the flag itself
// moved into ./use-recipe with the dev-guard.
export { __resetWebfontWarnForTest } from './use-recipe';

export { IconographyProvider, useIconography } from './iconography-provider';
export type { Iconography, IconographyProviderProps } from './iconography-provider';
