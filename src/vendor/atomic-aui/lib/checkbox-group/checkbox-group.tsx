// modules/design/atomic-aui/src/lib/checkbox-group/checkbox-group.tsx
//
// The compound CheckboxGroup — wraps `@base-ui/react/checkbox-group`, dot-namespaced via
// `Object.assign` (the Fieldset/Field/Select precedent). A CheckboxGroup GROUPS several `Checkbox`
// components under one shared value + an optional Label/Description — it is the level ABOVE Checkbox.
//
// REFER CLOSELY TO FIELDSET (the user's steer): the CASCADE-UP model reuses Field's SAME
// `FieldAuiContext` (field-context.tsx), one level up — IDENTICAL to Fieldset:
//   • CheckboxGroup.Root SEEDS the context from its aui (the inherited axes { color, scale, shape,
//     elevation }; paint/profile/sx are per-part, never inherited).
//   • A nested `Checkbox` MERGES that ambient seed UNDER its own aui (checkbox.tsx, useCheckboxCascade)
//     → the group's axes flow into every child checkbox unless the checkbox overrides (own ?? inherited).
//   • CheckboxGroup.Label reads the cascade (scale only — the Label part contract) and reuses the
//     shipped Label core (so it auto-associates to the group via Base UI's labelable substrate).
//
// Base UI owns ALL value behavior: the shared `value: string[]`, the parent/select-all
// (`useCheckboxGroupParent`), and `disabled` propagation (via its CheckboxGroupContext). We forward
// those props untouched. The Label↔group ASSOCIATION uses Base UI's labelable substrate: the Root
// wraps a `LabelableProvider`, so a `CheckboxGroup.Label` child registers its id and the Base UI group
// (which reads `useLabelableContext().labelId` for its `aria-labelledby`) picks it up — the SAME
// mechanism Label already uses, no bespoke id round-trip.
import * as React from 'react';
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import { LabelableProvider, useLabelableContext } from '@base-ui/react/internals/labelable-provider';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import {
  FieldAuiProvider,
  useFieldAui,
  mergeFieldAui,
  resolvePartAui,
  seedFieldAui,
  type FieldResolvedAui,
} from '../field/field-context';
import { Label, buildLabelClasses, type LabelAui } from '../label';
import type { LabelProps } from '../label';
import {
  useCheckboxGroupRootRecipe,
  CHECKBOX_GROUP_DEFAULT_SCALE,
  CHECKBOX_GROUP_DEFAULT_SHAPE,
  CHECKBOX_GROUP_DEFAULT_DIRECTION,
  type CheckboxGroupRootAui,
  type CheckboxGroupDirection,
} from './use-recipe';

export type {
  CheckboxGroupColor,
  CheckboxGroupPaint,
  CheckboxGroupScale,
  CheckboxGroupProfile,
  CheckboxGroupShape,
  CheckboxGroupElevation,
  CheckboxGroupDirection,
  CheckboxGroupRootAui,
} from './use-recipe';

// ─── CheckboxGroup — the root: a visible GROUP-SURFACE frame + the cascade-up + labelable providers ──
// `<CheckboxGroup>` IS the root (there is NO `CheckboxGroup.Root` — the Fieldset precedent). Base UI
// `CheckboxGroup` renders a `<div role="group">` and owns the shared value state. We make that div a
// recipe FRAME (the `aui-checkbox-group` marker + `.aui-frame`), seed the aui cascade for the child
// checkboxes + parts, and wrap a `LabelableProvider` so a `CheckboxGroup.Label` child auto-associates.
const _CheckboxGroupFrame = createAtomicComponent(CheckboxGroupPrimitive, {
  extensions: [useCheckboxGroupRootRecipe],
});

export interface CheckboxGroupRootProps
  extends Omit<React.ComponentProps<typeof CheckboxGroupPrimitive>, 'color'> {
  /** The group-surface frame appearance — ALSO the cascade seed for every descendant (child
   *  checkboxes + the Label/Description parts). The inherited axes (color/scale/shape/elevation)
   *  cascade; `paint`/`profile`/`sx` are per-part (frame-local, not cascaded). */
  aui?: CheckboxGroupRootAui;
  /** Layout direction of the checkbox stack. Default `'column'`. (Base UI's group is a bare `<div>`
   *  with no layout — this drives the `data-direction` attr the `.aui-checkbox-group` flex reads.) */
  direction?: CheckboxGroupDirection;
}

const CheckboxGroupRoot = React.forwardRef<HTMLDivElement, CheckboxGroupRootProps>(
  function CheckboxGroup({ aui, direction = CHECKBOX_GROUP_DEFAULT_DIRECTION, children, ...rest }, ref) {
    const ambient = useFieldAui();
    // The cascade seed: own + ambient (color/scale/shape/elevation only — paint/profile/sx per-part).
    const inherited = React.useMemo<FieldResolvedAui>(
      () => mergeFieldAui(ambient, seedFieldAui(aui)),
      [ambient, aui],
    );
    // The Root FRAME's own aui: color FOLLOWS the cascade (own ?? ambient ?? surface), paint DEFAULTS
    // to text (transparent — set paint/sx to opt into a visible box), profile pins default;
    // scale/shape/elevation cascade; sx per-part. IDENTICAL to Fieldset.Root.
    const frameAui = React.useMemo<CheckboxGroupRootAui>(
      () =>
        resolvePartAui(ambient, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'default',
          color: 'surface',
          scale: CHECKBOX_GROUP_DEFAULT_SCALE,
          shape: CHECKBOX_GROUP_DEFAULT_SHAPE,
          elevation: 0,
          followColor: true,
        }) as CheckboxGroupRootAui,
      [ambient, aui],
    );
    return React.createElement(
      LabelableProvider,
      null,
      React.createElement(
        _CheckboxGroupFrame as React.ElementType,
        { ref, ...rest, 'data-direction': direction, aui: frameAui },
        React.createElement(FieldAuiProvider, { value: inherited }, children),
      ),
    );
  },
);
CheckboxGroupRoot.displayName = 'CheckboxGroup';

// SSR-safe iso-layout-effect (mirrors Base UI's useIsoLayoutEffect): useLayoutEffect on the client,
// useEffect during SSR (where useLayoutEffect warns + can't run). Used to register the Description id
// into the group's labelable messageIds synchronously before paint. The library tsconfig compiles
// WITHOUT lib.dom, so probe for the `document` global via `globalThis` (string key, no DOM-lib types).
const useIsoLayoutEffect =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as { document?: unknown }).document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

// ─── CheckboxGroup.Label — the group label (reuses the shipped Label core) ─────────
// Renders the real `<Label>`, inheriting ONLY `scale` from the group cascade (the Label part
// contract; own `aui.scale` still wins). It auto-associates to the group via Base UI's labelable
// substrate (Label registers its id into the Root's LabelableProvider; the group reads it for
// `aria-labelledby`) — no manual id wiring. Every other Label axis takes the Label default.
export type CheckboxGroupLabelProps = LabelProps;
const CheckboxGroupLabel = React.forwardRef<HTMLElement, CheckboxGroupLabelProps>(
  function CheckboxGroupLabel({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const mergedAui = React.useMemo<LabelAui | undefined>(() => {
      const scale = aui?.scale ?? inherited.scale;
      if (scale === undefined) return aui;
      return { ...aui, scale };
    }, [aui, inherited.scale]);
    return React.createElement(Label, { ref, ...rest, aui: mergedAui });
  },
);
CheckboxGroupLabel.displayName = 'CheckboxGroup.Label';

// ─── CheckboxGroup.Description — the secondary descriptive text (muted helper) ─────
// A `<p>` of descriptive text for the group, styled through the SAME Label class builder (so it
// shares the frame/typography surface) and inheriting ONLY `scale` from the group. It is a VISUAL
// slot (not a labelable element — no htmlFor); style it muted/smaller via `aui` / `aui.sx`.
//
// A11Y: the Description AUTO-WIRES into the group's `aria-describedby` — it carries an `id` and
// registers it into the Root's `LabelableProvider` `messageIds` (the SAME substrate Base UI's
// `Field.Description` uses). Base UI's CheckboxGroup root reads `getDescriptionProps` → applies
// `aria-describedby` pointing at this id, so the group is programmatically described with NO manual
// wiring. A consumer `id` overrides the generated one. Outside a group the `setMessageIds` context
// default is a NOOP, so a standalone Description is harmless.
export interface CheckboxGroupDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  aui?: LabelAui;
  /** Render element. Default `'p'`. */
  as?: React.ElementType;
  /** The element id used for `aria-describedby` wiring. Defaults to a generated React id. */
  id?: string;
}
const CheckboxGroupDescription = React.forwardRef<HTMLElement, CheckboxGroupDescriptionProps>(
  function CheckboxGroupDescription({ aui, as, className, children, id, ...rest }, ref) {
    const inherited = useFieldAui();
    const reactId = React.useId();
    const descId = id ?? reactId;
    // Register the id into the Root's labelable messageIds so the group acquires `aria-describedby`.
    // Mirrors Base UI's FieldDescription (iso-layout-effect, add on mount / remove on unmount). The
    // context's `setMessageIds` is a NOOP outside a LabelableProvider, so this is a no-op standalone.
    const { setMessageIds } = useLabelableContext();
    useIsoLayoutEffect(() => {
      if (!descId) return undefined;
      setMessageIds((prev) => prev.concat(descId));
      return () => {
        setMessageIds((prev) => prev.filter((item) => item !== descId));
      };
    }, [descId, setMessageIds]);
    const mergedAui = React.useMemo<LabelAui | undefined>(() => {
      const scale = aui?.scale ?? inherited.scale;
      if (scale === undefined) return aui;
      return { ...aui, scale };
    }, [aui, inherited.scale]);
    const Tag = (as ?? 'p') as React.ElementType;
    const composed = [buildLabelClasses(mergedAui), className].filter(Boolean).join(' ');
    return React.createElement(Tag, { ref, ...rest, id: descId, className: composed }, children);
  },
);
CheckboxGroupDescription.displayName = 'CheckboxGroup.Description';

// ─── Assemble (Object.assign dot-namespace, the Fieldset/Field precedent) ──────────
// `<CheckboxGroup>` IS the root. Label + Description are dot-namespaced parts. The parent/select-all
// is NOT a part — it is an ordinary child `<Checkbox parent>` + the group's `allValues` (Base UI).
interface CheckboxGroupComponent
  extends React.ForwardRefExoticComponent<
    CheckboxGroupRootProps & React.RefAttributes<HTMLDivElement>
  > {
  Label: typeof CheckboxGroupLabel;
  Description: typeof CheckboxGroupDescription;
}

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Label: CheckboxGroupLabel,
  Description: CheckboxGroupDescription,
}) as CheckboxGroupComponent;

export default CheckboxGroup;
