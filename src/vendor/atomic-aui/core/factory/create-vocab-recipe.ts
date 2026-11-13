// modules/design/atomic-aui/src/core/create-vocab-recipe.ts
//
// Task 2.1 of the unified `aui` refactor: a STATELESS recipe factory that bridges
// `buildLeafClasses` into the `createAtomicComponent` PropHook mechanism.
//
// Stateless = resolves vocab.defaults + top-level appearance only (no activeState).
// Per-state logic lives in Task 2.2 (families/toggleable/create-toggleable-vocab-recipe).
//
// Usage:
//   const useRecipe = createVocabRecipe(BUTTON_VOCAB);
//   const Button = createAtomicComponent(BaseButton, { extensions: [useRecipe] });
//
// The hook reads `props.aui` (the `Appearance` object, may be undefined) and
// returns `{ className: buildLeafClasses(vocab, props.aui) }`.
// `hook.hookProps = new Set(['aui'])` so the factory strips `aui` from the DOM.
import type { PropHook, AnyProps } from '../types';
import type { LeafVocabulary, Appearance } from '../vocabulary/leaf-vocabulary';
import { buildLeafClasses } from '../recipe/build-leaf-classes';

/** Props shape for a vocab-recipe-powered component: accepts the unified `aui`
 *  customisation object. Extends `AnyProps` to satisfy the `PropHook` generic
 *  constraint under composite / isolatedModules builds. */
export interface VocabRecipeProps extends AnyProps {
  /** Unified customisation object for this component. May be `undefined` —
   *  the recipe falls back to `vocab.defaults` in that case. */
  aui?: Appearance;
}

/**
 * Build a stateless `aui`-prop PropHook: the single `aui` appearance object →
 * a full `.aui-*` class string, resolved over `vocab.defaults` via `buildLeafClasses`.
 *
 * The hook is STATELESS — it does not accept an `activeState` argument. Togglable
 * components that need per-state class resolution use `createToggleableRecipe`
 * (Task 2.2) instead.
 *
 * @param vocab - The static leaf vocabulary produced by `defineLeaf`.
 * @returns A `PropHook` compatible with `createAtomicComponent({ extensions: [...] })`.
 */
export function createVocabRecipe<P extends VocabRecipeProps = VocabRecipeProps>(
  vocab: LeafVocabulary,
): PropHook<P, { className: string }> {
  const hook: PropHook<P, { className: string }> = (props) => {
    const aui = props.aui as Appearance | undefined;
    // `disabled` is read but NOT stripped (not in hookProps): the Base UI primitive /
    // DOM consumes it natively, and it flips the chroma to the paint's disabled cell.
    // Mirrors `createUnstyledRecipe`, which reads `props.disabled` without stripping it.
    return { className: buildLeafClasses(vocab, aui, undefined, !!props.disabled) };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}
