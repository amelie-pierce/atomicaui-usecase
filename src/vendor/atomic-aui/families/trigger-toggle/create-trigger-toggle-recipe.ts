// modules/design/atomic-aui/src/families/trigger-toggle/create-trigger-toggle-recipe.ts
//
// The CANONICAL-STATE trigger recipe — the open-aware analog of `createTriggerStateRecipe`. Mirrors
// `createToggleableVocabRecipe` exactly (same shape/types, same `buildLeafClasses` engine) but uses
// the TRIGGER state-key: Base UI's `open`/`panelOpen` render state → the `'selected'`/`'unselected'`
// activeState, so `vocab.states` AND `aui.states` resolve per open-state; `disabled` flips the chroma.
//
// Zero-diff superset of `createTriggerStateRecipe`: with NO `states` on the vocab and NO `aui.states`,
// the resolver never touches the per-state layers, so it yields the IDENTICAL class string as the
// stateless trigger recipe for every `{open, disabled}` combo.
import type { PropHook, AnyProps } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { LeafVocabulary, Appearance, StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { triggerToggleStateKey, type TriggerToggleState } from './state-key';

/** Props shape for an `aui`-driven canonical-state trigger recipe. `aui` carries the unified
 *  customisation object (top-level + nested per-state). Extends `AnyProps` to satisfy the `PropHook`
 *  generic constraint under composite / isolatedModules builds. */
export interface TriggerToggleRecipeProps extends AnyProps {
  /** Unified customisation object; may carry per-state overrides under `states`. */
  aui?: Appearance & { states?: Record<string, StateAppearance> };
}

/**
 * Build a STATEFUL `aui`-prop PropHook for a canonical-state trigger (Dropdown/Select/Menubar
 * trigger).
 *
 * Returns `{ classNameForState }`: for each Base UI render state it derives the `{ key, disabled }`
 * (via `triggerToggleStateKey`), then calls `buildLeafClasses(vocab, props.aui, key, disabled)`. The
 * key (`'selected' | 'unselected'`; `'indeterminate'` only when authored) is the activeState so both
 * `vocab.states` and `aui.states` resolve for that open-state; `disabled` flips the chroma to the
 * paint's `disabled` cell.
 *
 * `hookProps = {'aui'}` strips `aui` from the DOM; `disabled` is native and passes through untouched.
 *
 * @param vocab - The static leaf vocabulary produced by `defineLeaf`.
 */
export function createTriggerToggleRecipe<
  P extends TriggerToggleRecipeProps = TriggerToggleRecipeProps
>(vocab: LeafVocabulary): PropHook<P, { classNameForState: (state: unknown) => string }> {
  const hook: PropHook<P, { classNameForState: (state: unknown) => string }> = (props) => {
    const aui = props.aui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined;
    return {
      classNameForState: (state: unknown) => {
        const { key, disabled } = triggerToggleStateKey(state as TriggerToggleState);
        return buildLeafClasses(vocab, aui, key, disabled);
      },
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}
