// modules/design/atomic-aui/src/families/select-item/state-key.ts
//
// State-key mapper for the `select-item` STATEFUL recipe family.
//
// WHY A SEPARATE FAMILY (not `toggleable`):
//   `toggleStateKey` (families/toggleable) hard-codes the `{checked, indeterminate}`
//   render-state vocabulary and reads `state.checked`. Base UI's Select Item has NO
//   `checked` — its render state is `{selected, highlighted, disabled}` (see
//   @base-ui/react SelectItemState). Reusing the toggleable mapper would read an
//   absent `checked` and misclassify EVERY item as unselected. So we clone the SHAPE
//   of the toggleable splitter (an enabled key + a disabled flag) and read Base UI's
//   `selected` render-state field instead.
//
// STATE-KEY VOCABULARY (canonical, aligned 2026-06-16):
//   The AtomicAUI state KEYS are the canonical `unselected` / `selected` (matching the
//   toggleable family + the system-wide `*.states.*` convention). We READ Base UI's
//   `selected` field and MAP it: `selected:true` → `'selected'`, otherwise
//   `'unselected'`. (Base UI Select Item has no `indeterminate`.)
//
// WHY `highlighted` IS DELIBERATELY IGNORED:
//   `highlighted` (the active/keyboard-focused row) is NOT a recipe dimension — it is
//   a CSS-only state-layer overlay handled elsewhere (the hand-authored state cascade
//   draws the highlight tint via `[data-highlighted]`). Folding it into the recipe key
//   would fork the persistent appearance into highlighted/unhighlighted variants the
//   recipe has no vocab for. The recipe resolves ONLY the persistent appearance states
//   (`unselected` / `selected`); the transient highlight is layered on top in CSS.

/** The persistent appearance states a select item resolves a recipe for. */
export type SelectItemStateKey = 'unselected' | 'selected';

/**
 * The Base UI Select Item render-state shape this mapper reads. Structurally typed —
 * we never import the Base UI component (the recipe is pure). `highlighted` is part of
 * the real `SelectItemState` but is intentionally absent here: it is not consumed.
 */
export type SelectItemState = { selected?: boolean; disabled?: boolean };

/**
 * Normalise a Base UI Select Item render state into `{ key, disabled }`.
 *
 * `selected:true` → key `'selected'`; otherwise `'unselected'`. `disabled` passes
 * through untouched. Mirrors the `(enabledKey, disabled)` split the toggleable recipe
 * relies on so the caller can hand both straight to
 * `buildLeafClasses(vocab, aui, key, disabled)`.
 *
 * Tolerates `null`/`undefined` and missing fields (defaults to unselected + not disabled).
 */
export function selectItemStateKey(
  state: SelectItemState | null | undefined,
): { key: SelectItemStateKey; disabled: boolean } {
  const s: SelectItemState = state && typeof state === 'object' ? state : {};
  return {
    key: s.selected ? 'selected' : 'unselected',
    disabled: !!s.disabled,
  };
}
