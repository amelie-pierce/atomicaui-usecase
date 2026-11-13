// modules/design/atomic-aui/src/lib/label/control-label.tsx
//
// The SHARED `*.Label` part + labeled-control wrapper for the togglable controls (Checkbox/Switch/
// Radio). The user's contract: each control has its OWN `*.Label` part so it can be used
// INDEPENDENTLY (a standalone labeled control whose text scales WITH the control), while STILL being
// composable inside a Base UI `Field.Item` (the native checkbox/radio-group item wrapper).
//
// NO NEW MECHANISM (the user's "no invention" law): the `*.Label` part is the shipped `Label` (it
// already renders a real `<label>`, auto-associates via Base UI's `useLabel`, and scale-follows via
// `useAuiScale`). The host wraps Base UI's `LabelableProvider` (the SAME substrate `Field.Item`
// renders internally) + an `AuiScaleProvider` around the `[control][label]` row.
//
// IMPORTANT — the `*.Label` is the SOLE label for its control. `renderLabeledControl` ALWAYS provides
// its OWN isolated `LabelableProvider`; this isolation is REQUIRED so that, inside a `CheckboxGroup`,
// each labeled child checkbox keeps its own label↔input scope WITHOUT polluting the group's own
// `labelId` (the group label stays separately associated). The consequence: when a `*.Label`-bearing
// control is placed inside a `Field.Item`, the inner provider shadows the item's — so do NOT ALSO use
// `Field.Label` (or rely on `Field.Description`/`Field.Error`) for that SAME control; pick ONE labeling
// path (the `*.Label`, or the `Field.Label` pattern with a bare control). Both work; they don't combine.
import * as React from 'react';
import { LabelableProvider } from '@base-ui/react/internals/labelable-provider';
import { AuiScaleProvider } from '../scale-cascade/use-aui-scale';
import { Label } from './label';
import type { LabelProps } from './label';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';

/** A control's `*.Label` props — the full Label surface (aui/as/htmlFor/native attrs). */
export type ControlLabelProps = LabelProps;

/**
 * Factory: a host's `*.Label` part. Returns the shipped `Label` tagged with the host displayName so
 * (a) the host can DETECT it among children via `findPartChild`, and (b) devtools/docs show e.g.
 * `Checkbox.Label`. It IS the same `Label` (renders `<label>`, auto-`htmlFor`, scale-follows) — only
 * the identity (component reference + displayName) differs per host, which is exactly what a part needs.
 *
 * CALL ONCE per host at MODULE scope and keep the returned reference STABLE (the host's `findPartChild`
 * matches by `c.type === ControlLabel` reference equality). Never call this inside a render function or
 * a test `beforeEach` — a fresh reference each render would make the host fail to detect the part.
 */
export function createControlLabel(displayName: string) {
  const ControlLabel = React.forwardRef<HTMLElement, ControlLabelProps>(function ControlLabel(
    props,
    ref,
  ) {
    return React.createElement(Label, { ref, ...props });
  });
  ControlLabel.displayName = displayName;
  return ControlLabel;
}

/**
 * Wrap a control's box + its `*.Label` into a labeled ROW. Used by the host ONLY when a `*.Label`
 * child is composed (zero blast radius otherwise — an unlabeled control renders exactly as before):
 *   • `LabelableProvider` — auto-generates the `controlId` the Base UI control reads as its input id
 *     AND the `Label` reads as `htmlFor` → clicking the label toggles the control (native a11y name),
 *     standalone. Inside a `Field.Item` the item's provider already covers this.
 *   • `AuiScaleProvider` seeds the control's RESOLVED scale, so the `Label` text scales WITH the control.
 *   • `.aui-control-row` — the `[control] [label]` inline-flex layout.
 * `ref`/`className`/`aui` stay on the control box (the row is layout only).
 */
export function renderLabeledControl(args: {
  boxElement: React.ReactNode;
  labelEl: React.ReactNode;
  resolvedScale: AuiRecipeScale;
}): React.ReactElement {
  const { boxElement, labelEl, resolvedScale } = args;
  return React.createElement(
    LabelableProvider,
    null,
    React.createElement(
      AuiScaleProvider,
      { value: resolvedScale },
      React.createElement('span', { className: 'aui-control-row' }, boxElement, labelEl),
    ),
  );
}
