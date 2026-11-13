// modules/design/atomic-aui/src/lib/fieldset/fieldset.tsx
//
// The compound Fieldset — wraps `@base-ui/react/fieldset` (1.5.0), dot-namespaced via
// `Object.assign` (the Field/Select precedent). A Fieldset GROUPS several `Field` components under
// one legend — it is the level ABOVE Field.
//
// Base UI owns ALL behavior: the `legend↔fieldset` `aria-labelledby` association (the legend is a
// <div> associated by an id round-trip — NOT a native <legend>) and DISABLED PROPAGATION (a
// disabled Fieldset auto-disables every nested Field/RadioGroup via `FieldsetRootContext`). We do
// NOT re-implement a disabled fan-out — forwarding `disabled` to `Fieldset.Root` is enough.
//
// THE CASCADE-UP MODEL — Fieldset reuses Field's SAME `FieldAuiContext` (field-context.tsx), one
// level up:
//   • Fieldset.Root SEEDS the context from its aui (the inherited axes { color, scale, shape,
//     elevation }; paint/profile/sx are per-part, never inherited).
//   • A nested `Field.Root` MERGES that ambient seed with its own aui (field.tsx) → the Fieldset's
//     axes flow into every nested Field unless the Field/part overrides (`own ?? inherited`).
//   • Fieldset.Legend reads the cascade (scale/shape) but PINS surface color (mirrors Field.Label).
// No portal, no identity re-stamp — the tree stays in normal document flow.
import * as React from 'react';
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import {
  FieldAuiProvider,
  useFieldAui,
  mergeFieldAui,
  resolvePartAui,
  seedFieldAui,
  type FieldResolvedAui,
} from '../field/field-context';
import {
  useFieldsetRootRecipe,
  useFieldsetLegendRecipe,
  FIELDSET_DEFAULT_SCALE,
  FIELDSET_DEFAULT_SHAPE,
  type FieldsetRootAui,
  type FieldsetLegendAui,
} from './use-recipe';

export type {
  FieldsetColor,
  FieldsetPaint,
  FieldsetScale,
  FieldsetProfile,
  FieldsetShape,
  FieldsetElevation,
  FieldsetRootAui,
  FieldsetLegendAui,
} from './use-recipe';

// ─── Fieldset — the root: a visible GROUP-SURFACE frame + the cascade-up provider ─
// `<Fieldset>` IS the root (there is NO `Fieldset.Root` — hard-removed 2026-06-17; `Fieldset` is the
// only root form). Base UI `Fieldset.Root` renders a <fieldset> and provides the fieldset context
// (legendId + disabled). We make that <fieldset> a recipe FRAME (the `aui-fieldset` marker + `.aui-frame`):
//   1. the visible FRAME — `useFieldsetRootRecipe` resolves the Root's OWN aui (color FOLLOWS the
//      cascade → the group border recolors; paint pins fixed, profile pins default; scale/shape/
//      elevation cascade; sx is per-part). Mirrors Field.Control's box.
//   2. the cascade PROVIDER — the SAME aui ALSO seeds `FieldAuiProvider` (color/scale/shape/
//      elevation) so every nested Field + the Legend inherits it.
// `disabled` is a NATIVE <fieldset> attr, so it both greys the frame border (the recipe reads
// `props.disabled`) AND Base UI propagates it to every nested Field/RadioGroup — no strip hook
// (unlike Field.Control's <div>) and no manual fan-out.
//
// Ambient MERGE (mirrors Field.Root): a Fieldset nested inside another Fieldset still inherits —
// `mergeFieldAui(ambient, seed)`. At the top level the ambient context is empty, so it is a no-op.
const _FieldsetRootFrame = createAtomicComponent(FieldsetPrimitive.Root, {
  extensions: [useFieldsetRootRecipe],
});
export interface FieldsetRootProps
  extends Omit<React.ComponentProps<typeof FieldsetPrimitive.Root>, 'color'> {
  /** The group-surface frame appearance — ALSO the cascade seed for every descendant (nested
   *  Fields + the Legend). The inherited axes (color/scale/shape/elevation) cascade;
   *  `paint`/`profile`/`sx` are per-part (frame-local, not cascaded). */
  aui?: FieldsetRootAui;
}

const FieldsetRoot = React.forwardRef<HTMLElement, FieldsetRootProps>(function FieldsetRoot(
  { aui, children, ...rest },
  ref,
) {
  const ambient = useFieldAui();
  // The cascade seed: own + ambient (color/scale/shape/elevation only — paint/profile/sx per-part).
  const inherited = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(ambient, seedFieldAui(aui)),
    [ambient, aui],
  );
  // The Root FRAME's own aui: color FOLLOWS the cascade (own ?? ambient ?? surface), paint DEFAULTS
  // to text (transparent — set paint/sx to opt into a visible box), profile pins default;
  // scale/shape/elevation cascade; sx per-part.
  const frameAui = React.useMemo<FieldsetRootAui>(
    () =>
      resolvePartAui(ambient, aui as FieldResolvedAui, {
        paint: 'text',
        profile: 'default',
        color: 'surface',
        scale: FIELDSET_DEFAULT_SCALE,
        shape: FIELDSET_DEFAULT_SHAPE,
        elevation: 0,
        followColor: true, // when painted, the group box follows the cascade chroma
      }) as FieldsetRootAui,
    [ambient, aui],
  );
  return React.createElement(
    _FieldsetRootFrame as React.ElementType,
    { ref, ...rest, aui: frameAui },
    React.createElement(FieldAuiProvider, { value: inherited }, children),
  );
});
FieldsetRoot.displayName = 'Fieldset';

// ─── Fieldset.Legend — the group label (copy leaf; color PINS surface) ────────────
// Reads the cascade for scale/shape/elevation; paint=text, profile=no-padding (own-overridable),
// color PINS surface (own ?? surface — does NOT follow the cascade chroma; the legend is the group
// heading). Base UI associates it to the <fieldset> via the legendId → `aria-labelledby` round-trip
// (it MUST stay inside Fieldset.Root). Mirrors Field.Label exactly.
const _FieldsetLegend = createAtomicComponent(FieldsetPrimitive.Legend, {
  extensions: [useFieldsetLegendRecipe],
});
export interface FieldsetLegendProps
  extends Omit<React.ComponentProps<typeof FieldsetPrimitive.Legend>, 'color'> {
  aui?: FieldsetLegendAui;
}
const FieldsetLegend = React.forwardRef<HTMLDivElement, FieldsetLegendProps>(function FieldsetLegend(
  { aui, ...rest },
  ref,
) {
  const inherited = useFieldAui();
  const resolvedAui = React.useMemo(
    () =>
      resolvePartAui(inherited, aui as FieldResolvedAui, {
        paint: 'text',
        profile: 'no-padding',
        color: 'surface',
        scale: FIELDSET_DEFAULT_SCALE,
        shape: 'none',
        followColor: false,
      }) as FieldsetLegendAui,
    [inherited, aui],
  );
  return React.createElement(_FieldsetLegend as React.ElementType, { ref, ...rest, aui: resolvedAui });
});
FieldsetLegend.displayName = 'Fieldset.Legend';

// ─── Assemble (Object.assign dot-namespace, the Field/Select precedent) ───────────
// `<Fieldset>` IS the root — there is NO `Fieldset.Root` (hard-removed 2026-06-17). Only `Legend`
// stays dot-namespaced.
interface FieldsetComponent
  extends React.ForwardRefExoticComponent<
    FieldsetRootProps & React.RefAttributes<HTMLElement>
  > {
  Legend: typeof FieldsetLegend;
}

export const Fieldset = Object.assign(FieldsetRoot, {
  Legend: FieldsetLegend,
}) as FieldsetComponent;

export default Fieldset;
