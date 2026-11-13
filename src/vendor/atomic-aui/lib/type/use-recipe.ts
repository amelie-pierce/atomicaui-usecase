// modules/design/atomic-aui/src/lib/type/use-recipe.ts
//
// Type per-instance composition hook — the "props → render inputs" layer for the hand-crafted
// <Type> primitive (the same shape as lib/icon/use-recipe.ts).
//
// IMPORTANT — this is a PLAIN composition hook, NOT the factory PropHook pattern. Like Icon,
// <Type> is a hand-crafted `React.forwardRef` (no Base UI, no state layer, no factory): it renders
// a single text element and has no headless behaviour to wrap. This hook reads the props, calls the
// pure `buildTypeClasses` recipe, composes the user className (last), and returns the className +
// the identity data-attrs the component stamps. No context (a Type is self-contained — no cascade).
import { buildTypeClasses } from './build-type-classes';
import type { TypeColor, TypeWeight, TypescaleRole } from './build-type-classes';
import type { AuiFrameStyleProps } from '../../core/recipe/build-style-props';

/** The typeface family — IDENTITY (top-level), NOT an `aui` axis. Maps to the `data-aui-typography`
 *  attr the 110-Typography collection keys its per-family typescale metrics on. Mirrors Icon's
 *  `family` identity axis. */
export type TypeFamily = 'display' | 'body' | 'mono';

/** Inputs the Type hook needs from the component. */
export interface UseTypeRecipeProps {
  /** OPTIONAL typescale role — omit to leave the typescale unset (see `TypeProps.role`). */
  role?: TypescaleRole;
  family?: TypeFamily;
  weight?: TypeWeight;
  /** OPTIONAL text colour (510-Foreground); omit to inherit. Shortcut for `sx.foreground`. */
  color?: TypeColor;
  /** OPTIONAL full layer-3 `aui.sx` override surface (from `TypeProps.aui.sx`). */
  sx?: AuiFrameStyleProps;
  className?: string;
}

/** The ready-to-render bundle for the Type element. */
export interface UseTypeRecipeResult {
  /** Composed className: recipe (incl. base `aui-frame` + the role typescale) + user className (last). */
  className: string;
  /** Identity data-attrs stamped on the SAME element so the 110-Typography compound selector
   *  `[data-aui-typeface][data-aui-typography]` resolves the per-family typescale metrics. */
  dataAttrs: {
    'data-aui-typeface': string;
    'data-aui-typography': TypeFamily;
  };
}

/** Per-instance composition for `<Type>` — build the recipe classes, compose the user className,
 *  and resolve the identity data-attrs. The component just destructures + renders the element. */
export function useTypeRecipe(props: UseTypeRecipeProps): UseTypeRecipeResult {
  const { role, family = 'body', weight, color, sx, className } = props;

  const recipeClasses = buildTypeClasses({ role, weight, color, sx });
  const composedClassName = [recipeClasses, className].filter(Boolean).join(' ');

  return {
    className: composedClassName,
    dataAttrs: {
      // typeface = the workspace default ('engineering'); family picks the body/display/mono typescale.
      'data-aui-typeface': 'engineering',
      'data-aui-typography': family,
    },
  };
}
