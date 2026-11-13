// modules/design/atomic-aui/src/families/trigger-toggle/state-key.ts
//
// State-key mapping for a CANONICAL-STATE trigger — a Base-UI-context trigger that has a real OPEN
// state worth styling per-state (Dropdown/Select/Menubar trigger), unlike the stateless
// `trigger-state` recipe (open/hover are CSS only there). Reuses the canonical toggleable state-key
// union (`'unselected' | 'selected' | 'indeterminate'`) so a trigger and a togglable share the same
// per-state vocab shape.
import type { EnabledStateKey } from '../toggleable/state-key';

export type { EnabledStateKey } from '../toggleable/state-key';

/** Base UI trigger render-state shape we read. Structurally typed — we never import the Base UI
 *  state type, so the recipe stays decoupled. `open`/`panelOpen`/`active` map to 'selected';
 *  `disabled` flips the chroma. `active` is the Base UI Tabs.Tab render-state field (Tabs has no
 *  open/panelOpen; the active tab is the selected one). */
export type TriggerToggleState = {
  open?: boolean;
  panelOpen?: boolean;
  active?: boolean;
  disabled?: boolean;
};

/**
 * Map a Base UI trigger render state to the canonical key + a disabled flag.
 *
 * `state.open === true || state.panelOpen === true || state.active === true` → `'selected'`, else
 * `'unselected'`. The `active` arm serves Tabs (Base UI Tabs.Tab exposes `active`, never
 * `open`/`panelOpen`); the existing consumers all expose `open` (Dropdown/Select/Menubar via the
 * Menu/Select trigger, Accordion via Accordion.Trigger) and NEVER set `active`, so this is zero-diff
 * for them. `panelOpen` is a defensive alias — no installed Base UI trigger currently emits it (it
 * stays mapped for forward-compat).
 * `'indeterminate'` is NEVER auto-derived from render state — it is reserved for an authored
 * `aui.states.indeterminate` (the type carries it so the vocab/aui can address that state, but no
 * trigger render state produces it). `disabled = !!state.disabled`.
 */
export function triggerToggleStateKey(state: TriggerToggleState | null | undefined): {
  key: EnabledStateKey;
  disabled: boolean;
} {
  const s: TriggerToggleState = state && typeof state === 'object' ? state : {};
  const key: EnabledStateKey =
    s.open === true || s.panelOpen === true || s.active === true ? 'selected' : 'unselected';
  return { key, disabled: !!s.disabled };
}
