// modules/design/atomic-aui/src/lib/symbol/use-recipe.ts
//
// Symbol per-instance composition hook — the "props → render inputs" layer for the hand-crafted
// <Symbol> primitive (the same shape as lib/type/use-recipe.ts).
//
// Like <Type> (and unlike Button/Checkbox/…) <Symbol> is a hand-crafted `React.forwardRef` — no Base
// UI, no state layer, no factory. This hook reads the props, calls the pure `buildSymbolClasses`
// recipe, composes the user className (last), and returns the className + the identity data-attrs the
// component stamps. Two of Symbol's axes are IDENTITY data-attrs (not classes):
//   • `family` → `data-aui-typography` — picks the body/display/mono typescale. DEFAULTS TO `'mono'`
//     (the whole point of Symbol). Still overridable to display/body — `family` is an axis, not a pin.
//   • `script` → `data-aui-script` — the vertical-script mode the `_state-cascade.scss` rules key on.
//     DEFAULTS TO `'normal'` (baseline; the attr is then inert).
import { buildSymbolClasses } from './build-symbol-classes';
import type { SymbolScript } from './build-symbol-classes';
import type { TypeColor, TypeWeight, TypescaleRole } from '../type/build-type-classes';
import type { TypeFamily } from '../type/use-recipe';
import type { AuiEmphasis } from '../../tokens/index';

/** Inputs the Symbol hook needs from the component. */
export interface UseSymbolRecipeProps {
  /** OPTIONAL typescale role — omit to leave the typescale unset (inherits). */
  role?: TypescaleRole;
  /** Typeface family — IDENTITY. Default `'mono'`. Overridable to `display`/`body`. */
  family?: TypeFamily;
  weight?: TypeWeight;
  /** OPTIONAL text colour (510-Foreground); omit to inherit. */
  color?: TypeColor;
  /** OPTIONAL emphasis (231-Emphasis). `reduced` → muted; default omits. */
  emphasis?: AuiEmphasis;
  /** Vertical-script mode — IDENTITY. Default `'normal'`. */
  script?: SymbolScript;
  className?: string;
}

/** The ready-to-render bundle for the Symbol element. */
export interface UseSymbolRecipeResult {
  /** Composed className: recipe (frame + typescale + `aui-symbol` marker + emphasis) + user className (last). */
  className: string;
  /** Identity data-attrs stamped on the SAME element: the `[data-aui-typeface][data-aui-typography]`
   *  pair the 110-Typography cascade resolves the per-family typescale metrics on (here defaulting to
   *  the mono typeface), plus `data-aui-script` the script-axis CSS keys on. */
  dataAttrs: {
    'data-aui-typeface': string;
    'data-aui-typography': TypeFamily;
    'data-aui-script': SymbolScript;
  };
}

/** Per-instance composition for `<Symbol>` — build the recipe classes, compose the user className,
 *  and resolve the identity data-attrs (family DEFAULTS to mono, script to normal). */
export function useSymbolRecipe(props: UseSymbolRecipeProps): UseSymbolRecipeResult {
  const { role, family = 'mono', weight, color, emphasis, script = 'normal', className } = props;

  const recipeClasses = buildSymbolClasses({ role, weight, color, emphasis });
  const composedClassName = [recipeClasses, className].filter(Boolean).join(' ');

  return {
    className: composedClassName,
    dataAttrs: {
      // typeface = the workspace default ('engineering'); family DEFAULTS to mono (the Symbol identity).
      'data-aui-typeface': 'engineering',
      'data-aui-typography': family,
      'data-aui-script': script,
    },
  };
}
