// modules/design/atomic-aui/src/families/menu-checkbox-item/state-key.ts
//
// State-key mapper for the `menu-checkbox-item` STATEFUL recipe family.
//
// WHY A SEPARATE FAMILY (clone of `select-item`, NOT `toggleable`):
//   Base UI's Menu CheckboxItem / RadioItem render state is `{disabled, highlighted,
//   checked}` (see MenuCheckboxItemState / MenuRadioItemState). The persistent appearance
//   axis is `checked` (NOT Select's `selected`, NOT the Checkbox's `{checked, indeterminate}`).
//   ONE family serves BOTH CheckboxItem and RadioItem because they share this exact state
//   shape. We clone the SHAPE of the select-item splitter (an enabled key + a disabled flag).
//
// STATE-KEY VOCABULARY (canonical, aligned 2026-06-16):
//   The AtomicAUI state KEYS are the canonical `unselected` / `selected` (matching the
//   toggleable family + the system-wide `*.states.*` convention) — NOT the Base UI field
//   name. We READ Base UI's `checked` render-state field and MAP it: `checked:true` →
//   `'selected'`, otherwise `'unselected'`. (Base UI Menu CheckboxItem/RadioItem are binary —
//   no `indeterminate`.)
//
// WHY `highlighted` IS DELIBERATELY IGNORED:
//   `highlighted` (the active/keyboard-focused row) is NOT a recipe dimension — it is a
//   CSS-only state-layer overlay (the hand-authored state cascade draws the highlight tint
//   via `[data-highlighted]`). The recipe resolves ONLY the persistent appearance states
//   (`unselected` / `selected`); the transient highlight is layered on top in CSS. Mirrors
//   `select-item/state-key.ts` exactly.

/** The persistent appearance states a menu checkable row resolves a recipe for. */
export type MenuCheckableStateKey = 'unselected' | 'selected';

/**
 * The Base UI Menu CheckboxItem / RadioItem render-state shape this mapper reads.
 * Structurally typed — we never import the Base UI component (the recipe is pure).
 * `highlighted` is part of the real render state but is intentionally absent here: it
 * is not consumed.
 */
export type MenuCheckableState = { checked?: boolean; disabled?: boolean; highlighted?: boolean };

/**
 * Normalise a Base UI Menu CheckboxItem / RadioItem render state into `{ key, disabled }`.
 *
 * `checked:true` → key `'selected'`; otherwise `'unselected'`. `disabled` passes through
 * untouched. Mirrors the `(enabledKey, disabled)` split the select-item recipe relies on
 * so the caller can hand both straight to
 * `buildLeafClasses(vocab, aui, key, disabled)`.
 *
 * Tolerates `null`/`undefined` and missing fields (defaults to unselected + not disabled).
 * `highlighted` is read off the type but never affects the output.
 */
export function menuCheckableStateKey(
  state: MenuCheckableState | null | undefined,
): { key: MenuCheckableStateKey; disabled: boolean } {
  const s: MenuCheckableState = state && typeof state === 'object' ? state : {};
  return {
    key: s.checked ? 'selected' : 'unselected',
    disabled: !!s.disabled,
  };
}
