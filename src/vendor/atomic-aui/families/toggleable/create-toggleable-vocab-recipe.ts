import type { PropHook, AnyProps } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { LeafVocabulary, Appearance, StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { toggleStateKey, type EnabledStateKey, type ToggleState } from './state-key';

// ─── Unified-`aui` STATEFUL vocab recipe ─────────────────────────────────────
//
// The toggleable analog of `createVocabRecipe`: drives the SAME `buildLeafClasses`
// engine but per render state. Per-state DEFAULT appearance lives in
// `vocab.states[enabledKey]`; `buildLeafClasses` layers
//   vocab.defaults < vocab.states[active] < aui top-level < aui.states[active]
// then applies the disabled chroma flip — so we do NOT re-merge defaults here.

/** Props shape for an `aui`-driven togglable recipe. `aui` carries the unified
 *  customisation object (top-level + nested per-state). Extends `AnyProps` to satisfy
 *  the `PropHook` generic constraint under composite / isolatedModules builds. */
export interface ToggleableVocabRecipeProps extends AnyProps {
  /** Unified customisation object; may carry per-state overrides under `states`. */
  aui?: Appearance & { states?: Record<string, StateAppearance> };
}

/**
 * Build a STATEFUL `aui`-prop PropHook for a togglable (Checkbox/Switch/Radio).
 *
 * Returns `{ classNameForState }`: for each Base UI render state it derives the
 * StateKey (via `toggleStateKey`), splits off the `disabled-` prefix into the
 * enabled key + a disabled flag, then calls `buildLeafClasses(vocab, props.aui,
 * enabledKey, disabled)`. The enabled key (`'selected' | 'unselected' |
 * 'indeterminate'`) is passed as the activeState so both `vocab.states` and
 * `aui.states` resolve for that state; `disabled` flips the chroma to the paint's
 * `disabled` cell.
 *
 * `hookProps = {'aui'}` strips `aui` from the DOM; `disabled`/`checked` are native
 * and pass through untouched.
 *
 * @param vocab - The static leaf vocabulary produced by `defineLeaf`.
 */
export function createToggleableVocabRecipe<
  P extends ToggleableVocabRecipeProps = ToggleableVocabRecipeProps
>(vocab: LeafVocabulary): PropHook<P, { classNameForState: (state: unknown) => string }> {
  const hook: PropHook<P, { classNameForState: (state: unknown) => string }> = (props) => {
    const aui = props.aui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined;
    return {
      classNameForState: (state: unknown) => {
        const key = toggleStateKey(state as ToggleState);
        const disabled = key.startsWith('disabled-');
        const enabledKey: EnabledStateKey = disabled
          ? (key.slice('disabled-'.length) as EnabledStateKey)
          : (key as EnabledStateKey);
        return buildLeafClasses(vocab, aui, enabledKey, disabled);
      },
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}
