import type { PropHook, AnyProps } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { LeafVocabulary, Appearance } from '../../core/vocabulary/leaf-vocabulary';

// ─── Trigger-state recipe factory ────────────────────────────────────────────
//
// A shared, component-agnostic `classNameForState` recipe factory for any
// Base-UI-context-disabled trigger: Select, Menu/Dropdown, Popover, and any
// other component where the disabled signal comes from a Root via context (not
// as a `props.disabled` reaching the element).
//
// These triggers share a common pattern: stateless appearance (no activeState —
// open/hover are CSS), but the disabled chroma MUST flip off Base UI's render
// state rather than `props.disabled` (which the context-disabled trigger never
// receives). A thin `classNameForState` PropHook is therefore the right shape
// over a plain `createVocabRecipe`.
//
// The factory is pure TypeScript (no React, no Base UI imports) so the recipe
// stays testable and buildable in isolation.

/** Base UI's render state passed to the Trigger's function className.
 *  Structurally typed — we never import the Base UI state type; the recipe
 *  stays decoupled. Only `disabled` is consumed. */
export type TriggerRenderState = { disabled?: boolean };

/** Props shape for an `aui`-driven trigger-state recipe.
 *  `aui` carries the unified customisation object (Appearance).
 *  Extends `AnyProps` to satisfy the `PropHook` generic constraint under
 *  composite / isolatedModules builds. */
export interface TriggerStateRecipeProps extends AnyProps {
  aui?: Appearance;
}

/**
 * Build a `classNameForState` PropHook for any Base-UI-context-disabled trigger
 * (Select, Menu/Dropdown, Popover…).
 *
 * Returns `{ classNameForState }`: reads `props.aui` for the unified appearance,
 * then for each Base UI render-state call it reads `state.disabled` and calls
 * `buildLeafClasses(vocab, aui, undefined, disabled)`. There is NO activeState
 * (the trigger is stateless from a recipe perspective — open/hover live in CSS).
 *
 * `hookProps = {'aui'}` strips `aui` from the DOM so it never reaches the
 * underlying element.
 *
 * @param vocab - The static leaf vocabulary produced by `defineLeaf`.
 */
export function createTriggerStateRecipe<
  P extends TriggerStateRecipeProps = TriggerStateRecipeProps
>(vocab: LeafVocabulary): PropHook<P, { classNameForState: (state: unknown) => string }> {
  const hook: PropHook<P, { classNameForState: (state: unknown) => string }> = (props) => {
    const aui = props.aui as Appearance | undefined;
    return {
      // No activeState (stateless appearance); flip the chroma off Base UI's disabled.
      classNameForState: (state: unknown) =>
        buildLeafClasses(vocab, aui, undefined, !!(state as TriggerRenderState | null)?.disabled),
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}
