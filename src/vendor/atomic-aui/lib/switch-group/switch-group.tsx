// modules/design/atomic-aui/src/lib/switch-group/switch-group.tsx
//
// The compound SwitchGroup — the GROUPING component above `Switch` (a shared label/description +
// the aui cascade for a set of switches). MIRRORS CheckboxGroup, but switches are INDEPENDENT booleans
// → there is NO Base UI group value primitive. So SwitchGroup is a PLAIN `<div role="group">`: a pure
// layout + cascade + label container with NO shared value model (don't look for a `value` prop).
//
//   • SwitchGroup (the root) SEEDS the `FieldAuiContext` (inherited color/scale/shape/elevation) that
//     nested `Switch`es + the Label/Description read (via useSwitchCascade), and is itself a paintable
//     group-surface FRAME (default `paint: text` → transparent).
//   • SwitchGroup.Label reuses the shipped Label core; SwitchGroup.Description is a muted `<p>`.
//   • A11Y: a plain div does NOT read the labelable context (no Base UI group), so aria-labelledby
//     (from the Label's registered labelId) AND aria-describedby (from the Description's messageIds)
//     are wired MANUALLY here in SwitchGroupBody (the RadioGroup.Description precedent).
import * as React from 'react';
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
  useSwitchGroupRootRecipe,
  SWITCH_GROUP_DEFAULT_SCALE,
  SWITCH_GROUP_DEFAULT_SHAPE,
  SWITCH_GROUP_DEFAULT_DIRECTION,
  type SwitchGroupRootAui,
  type SwitchGroupDirection,
} from './use-recipe';

export type {
  SwitchGroupColor,
  SwitchGroupPaint,
  SwitchGroupScale,
  SwitchGroupProfile,
  SwitchGroupShape,
  SwitchGroupElevation,
  SwitchGroupDirection,
  SwitchGroupRootAui,
} from './use-recipe';

// SSR-safe iso-layout-effect (the library compiles without lib.dom → probe `document` via globalThis).
const useIsoLayoutEffect =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as { document?: unknown }).document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

export interface SwitchGroupRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** The group-surface frame appearance — ALSO the cascade seed for every descendant (child switches +
   *  the Label/Description parts). Inherited axes (color/scale/shape/elevation) cascade; `paint`/
   *  `profile`/`sx` are per-part (frame-local, not cascaded). */
  aui?: SwitchGroupRootAui;
  /** Layout direction of the switch stack. Default `'column'`. */
  direction?: SwitchGroupDirection;
}

// A plain `<div>` frame (no Base UI value group) — stateless recipe → an intrinsic `'div'` base is safe
// (the factory's function-className as-guard only fires for STATEFUL recipes).
const _SwitchGroupFrame = createAtomicComponent('div', {
  extensions: [useSwitchGroupRootRecipe],
});

// The frame body — INSIDE the LabelableProvider, so it reads the registered Label id (aria-labelledby)
// and Description messageIds (aria-describedby) and applies them to the plain div (a bare div does NOT
// consume the labelable context the way Base UI's CheckboxGroup/RadioGroup do). Consumer values win.
interface SwitchGroupBodyProps {
  frameAui: SwitchGroupRootAui;
  direction: SwitchGroupDirection;
  inherited: FieldResolvedAui;
  forwardedRef: React.Ref<HTMLDivElement>;
  rest: Record<string, unknown>;
  children: React.ReactNode;
}
function SwitchGroupBody({ frameAui, direction, inherited, forwardedRef, rest, children }: SwitchGroupBodyProps) {
  const { labelId, messageIds } = useLabelableContext();
  const consumerLabelledBy = rest['aria-labelledby'] as string | undefined;
  const consumerDescribedBy = rest['aria-describedby'] as string | undefined;
  const labelledBy = consumerLabelledBy ?? labelId;
  const describedBy = consumerDescribedBy ?? (messageIds.length ? messageIds.join(' ') : undefined);
  return React.createElement(
    _SwitchGroupFrame as React.ElementType,
    {
      ref: forwardedRef,
      role: 'group',
      ...rest,
      'data-direction': direction,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      aui: frameAui,
    },
    React.createElement(FieldAuiProvider, { value: inherited }, children),
  );
}

const SwitchGroupRoot = React.forwardRef<HTMLDivElement, SwitchGroupRootProps>(
  function SwitchGroup({ aui, direction = SWITCH_GROUP_DEFAULT_DIRECTION, children, ...rest }, ref) {
    const ambient = useFieldAui();
    const inherited = React.useMemo<FieldResolvedAui>(
      () => mergeFieldAui(ambient, seedFieldAui(aui)),
      [ambient, aui],
    );
    const frameAui = React.useMemo<SwitchGroupRootAui>(
      () =>
        resolvePartAui(ambient, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'default',
          color: 'surface',
          scale: SWITCH_GROUP_DEFAULT_SCALE,
          shape: SWITCH_GROUP_DEFAULT_SHAPE,
          elevation: 0,
          followColor: true,
        }) as SwitchGroupRootAui,
      [ambient, aui],
    );
    return React.createElement(
      LabelableProvider,
      null,
      React.createElement(SwitchGroupBody, {
        frameAui,
        direction,
        inherited,
        forwardedRef: ref,
        rest: rest as Record<string, unknown>,
        children,
      }),
    );
  },
);
SwitchGroupRoot.displayName = 'SwitchGroup';

// ─── SwitchGroup.Label — the group label (reuses the shipped Label core) ─────────
export type SwitchGroupLabelProps = LabelProps;
const SwitchGroupLabel = React.forwardRef<HTMLElement, SwitchGroupLabelProps>(
  function SwitchGroupLabel({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const mergedAui = React.useMemo<LabelAui | undefined>(() => {
      const scale = aui?.scale ?? inherited.scale;
      if (scale === undefined) return aui;
      return { ...aui, scale };
    }, [aui, inherited.scale]);
    return React.createElement(Label, { ref, ...rest, aui: mergedAui });
  },
);
SwitchGroupLabel.displayName = 'SwitchGroup.Label';

// ─── SwitchGroup.Description — secondary descriptive text (muted helper) ─────────
// AUTO-WIRES aria-describedby: carries an `id` and registers it into the Root's LabelableProvider
// messageIds; SwitchGroupBody reads those ids and applies aria-describedby to the group div.
export interface SwitchGroupDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  aui?: LabelAui;
  /** Render element. Default `'p'`. */
  as?: React.ElementType;
  /** The element id used for aria-describedby wiring. Defaults to a generated React id. */
  id?: string;
}
const SwitchGroupDescription = React.forwardRef<HTMLElement, SwitchGroupDescriptionProps>(
  function SwitchGroupDescription({ aui, as, className, children, id, ...rest }, ref) {
    const inherited = useFieldAui();
    const reactId = React.useId();
    const descId = id ?? reactId;
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
SwitchGroupDescription.displayName = 'SwitchGroup.Description';

// ─── Assemble (Object.assign dot-namespace, the CheckboxGroup precedent) ──────────
interface SwitchGroupComponent
  extends React.ForwardRefExoticComponent<
    SwitchGroupRootProps & React.RefAttributes<HTMLDivElement>
  > {
  Label: typeof SwitchGroupLabel;
  Description: typeof SwitchGroupDescription;
}

export const SwitchGroup = Object.assign(SwitchGroupRoot, {
  Label: SwitchGroupLabel,
  Description: SwitchGroupDescription,
}) as SwitchGroupComponent;

export default SwitchGroup;
