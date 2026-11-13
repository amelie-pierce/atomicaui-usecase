import type { PropHook, AnyProps } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { LeafVocabulary, Appearance, StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import type { AuiRecipePaint } from '../../core/vocabulary/recipe-vocab';
import { menuCheckableStateKey, type MenuCheckableState } from './state-key';

// ─── Disabled = a fixed grey FILL (matches the disabled Trigger) ─────────────
//
// The resting menu-checkable appearance is FLAT (`paint:'text'` — no fill). With that
// paint, the `disabled` chroma flip yields `aui-color-text-disabled` = muted TEXT with
// NO surface — so a disabled item would read like an unselected one (just dimmer text),
// NOT like the disabled Trigger, which renders a grey SOLID fill (`aui-color-solid-disabled`).
//
// A disabled item is a disabled CONTROL and must read the same as the disabled Trigger:
// a grey filled cell + muted content. So we special-case the DISABLED branch only —
// forcing the FILLED `solid` paint into the resolved appearance so `buildLeafClasses`
// emits `aui-color-solid-disabled` (the SAME cell the Trigger uses), regardless of the
// row's unselected/selected resting `text` paint. The chroma is always `disabled` in this
// branch (the flip is paint-keyed, not color-keyed), so only the PAINT need be forced;
// the row keeps its own scale/shape/geometry. The unselected + selected (non-disabled)
// appearance is completely untouched. Mirrors `select-item`'s `forceDisabledFillPaint`.
const DISABLED_FILL_PAINT: AuiRecipePaint = 'solid';

/**
 * Inject the fixed disabled-fill paint as the HIGHEST-priority appearance layer for the
 * active state, so the disabled cell is always the trigger-matching `solid` fill.
 *
 * `buildLeafClasses` resolves paint low→high as
 *   vocab.defaults < vocab.states[active] < aui (top-level) < aui.states[active].
 * Stamping `paint` onto `aui.states[activeKey]` (layer 4) makes it win over both the
 * vocab's resting `text` paint and any consumer paint — the disabled look is a policy,
 * not a negotiable default. We build a shallow clone (never mutate the consumer's `aui`)
 * and preserve every other key the consumer set for that state.
 */
function forceDisabledFillPaint(
  aui: (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
  activeKey: string,
): Appearance & { states?: Record<string, StateAppearance> } {
  const base = aui ?? {};
  const states = { ...(base.states ?? {}) };
  states[activeKey] = { ...(states[activeKey] ?? {}), paint: DISABLED_FILL_PAINT };
  return { ...base, states };
}

// ─── Unified-`aui` STATEFUL vocab recipe (Menu CheckboxItem / RadioItem) ─────
//
// The menu-checkable analog of `createSelectItemVocabRecipe`: drives the SAME
// `buildLeafClasses` engine + the SAME layer ordering, per render state. Only the
// state-key mapper differs — `menuCheckableStateKey` reads Base UI's
// `{checked, disabled}` Menu CheckboxItem / RadioItem render state (NOT `{selected}`)
// and DELIBERATELY ignores `highlighted` (a CSS-only state-layer overlay, not a
// recipe dimension — see state-key.ts).
//
// Per-state DEFAULT appearance lives in `vocab.states[enabledKey]`; `buildLeafClasses`
// layers
//   vocab.defaults < vocab.states[active] < aui top-level < aui.states[active]
// then applies the disabled chroma flip — so we do NOT re-merge defaults here.

/** Props shape for an `aui`-driven menu-checkable recipe. `aui` carries the unified
 *  customisation object (top-level + nested per-state). Extends `AnyProps` to satisfy
 *  the `PropHook` generic constraint under composite / isolatedModules builds. */
export interface MenuCheckableVocabRecipeProps extends AnyProps {
  /** Unified customisation object; may carry per-state overrides under `states`. */
  aui?: Appearance & { states?: Record<string, StateAppearance> };
}

/**
 * Build a STATEFUL `aui`-prop PropHook for a Menu CheckboxItem / RadioItem.
 *
 * Returns `{ classNameForState }`: for each Base UI render state it derives
 * `{ key, disabled }` (via `menuCheckableStateKey`) then calls
 * `buildLeafClasses(vocab, props.aui, key, disabled)`. The state key
 * (`'unselected' | 'selected'`) is passed as the activeState so both `vocab.states` and
 * `aui.states` resolve for that state; `disabled` flips the chroma to the paint's
 * `disabled` cell. `highlighted` is ignored by the mapper.
 *
 * `hookProps = {'aui'}` strips `aui` from the DOM; `disabled` is native and passes
 * through untouched.
 *
 * @param vocab - The static leaf vocabulary produced by `defineLeaf`.
 */
export function createMenuCheckableVocabRecipe<
  P extends MenuCheckableVocabRecipeProps = MenuCheckableVocabRecipeProps
>(vocab: LeafVocabulary): PropHook<P, { classNameForState: (state: unknown) => string }> {
  const hook: PropHook<P, { classNameForState: (state: unknown) => string }> = (props) => {
    const aui = props.aui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined;
    return {
      classNameForState: (state: unknown) => {
        const { key, disabled } = menuCheckableStateKey(state as MenuCheckableState);
        // DISABLED branch only: force the trigger-matching `solid` fill so the disabled
        // item reads `aui-color-solid-disabled` (grey fill + muted content), not the flat
        // `aui-color-text-disabled` (muted text, no surface). Non-disabled is untouched.
        const resolvedAui = disabled ? forceDisabledFillPaint(aui, key) : aui;
        return buildLeafClasses(vocab, resolvedAui, key, disabled);
      },
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}
