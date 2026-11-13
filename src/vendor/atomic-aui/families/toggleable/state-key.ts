export type EnabledStateKey = 'unselected' | 'selected' | 'indeterminate';
export type ToggleStateKey = EnabledStateKey | `disabled-${EnabledStateKey}`;
// The canonical render-state shape a togglable normalizes into a StateKey (the per-core
// adapter — e.g. a Base UI Checkbox/Switch — already maps its render state to this shape).
export type ToggleState = { checked?: boolean; indeterminate?: boolean; disabled?: boolean };

export function toggleStateKey(state: ToggleState | null | undefined): ToggleStateKey {
  const s: ToggleState = state && typeof state === 'object' ? state : {};
  const base: EnabledStateKey = s.indeterminate ? 'indeterminate' : s.checked ? 'selected' : 'unselected';
  return s.disabled ? `disabled-${base}` : base;
}
