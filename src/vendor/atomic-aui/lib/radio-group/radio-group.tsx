// modules/design/atomic-aui/src/lib/radio-group/radio-group.tsx
//
// The compound RadioGroup — the GROUPING component above `Radio` (the value-based set + a shared
// label/description + the aui cascade for a set of radios). MIRRORS CheckboxGroup / SwitchGroup, but
// radios share a SINGLE value via Base UI's `RadioGroup` primitive (a value-based set). So RadioGroup is
// a paintable `.aui-frame` `<div role="radiogroup">` wrapping Base UI's RadioGroup:
//
//   • RadioGroup (the root) SEEDS the `FieldAuiContext` (inherited color/scale/shape/elevation) that
//     nested `Radio`s + the Label/Description read (via useRadioCascade), and is itself a paintable
//     group-surface FRAME (default `paint: text` → transparent).
//   • RadioGroup.Label reuses the shipped Label core; RadioGroup.Description is a muted `<p>`.
//   • A11Y: Base UI's RadioGroup applies labelId (aria-labelledby) but NOT getDescriptionProps — so the
//     Description's aria-describedby is wired MANUALLY here in RadioGroupBody (it reads the registered
//     messageIds). Standalone component (NOT `Radio.Group`) since 2026-06-28 — mirrors CheckboxGroup /
//     SwitchGroup.
import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import type { RadioGroupProps as BaseRadioGroupProps } from '@base-ui/react/radio-group';
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
  useRadioGroupRootRecipe,
  RADIO_GROUP_DEFAULT_SCALE,
  RADIO_GROUP_DEFAULT_SHAPE,
  RADIO_GROUP_DEFAULT_DIRECTION,
  type RadioGroupRootAui,
  type RadioGroupDirection,
} from './use-recipe';

export type {
  RadioGroupColor,
  RadioGroupPaint,
  RadioGroupScale,
  RadioGroupProfile,
  RadioGroupShape,
  RadioGroupElevation,
  RadioGroupDirection,
  RadioGroupRootAui,
} from './use-recipe';

// SSR-safe iso-layout-effect (the library compiles without lib.dom → probe `document` via globalThis).
const useIsoLayoutEffect =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as { document?: unknown }).document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

// Public value-based GROUP-SURFACE frame (mirrors CheckboxGroup). `<RadioGroup>` is a PAINTABLE
// `.aui-frame` `<div role="radiogroup">` that SEEDS the aui cascade for the child radios + parts, wraps a
// `LabelableProvider` so a `RadioGroup.Label` child auto-associates (aria-labelledby), and exposes
// `RadioGroup.Label`/`RadioGroup.Description`. UNLIKE CheckboxGroup, Base UI's RadioGroup applies labelId
// (aria-labelledby) but NOT getDescriptionProps — so the Description's aria-describedby is wired MANUALLY
// here (RadioGroupBody reads the registered messageIds).
export type RadioGroupProps<Value = unknown> = Omit<BaseRadioGroupProps<Value>, 'color'> & {
  /** The group-surface frame appearance — ALSO the cascade seed for every descendant (child radios +
   *  the Label/Description parts). Inherited axes (color/scale/shape/elevation) cascade; `paint`/
   *  `profile`/`sx` are per-part (frame-local, not cascaded). */
  aui?: RadioGroupRootAui;
  /** Layout direction of the radio stack. Default `'column'`. */
  direction?: RadioGroupDirection;
};

interface RadioGroupComponent {
  <Value = unknown>(props: RadioGroupProps<Value> & React.RefAttributes<HTMLDivElement>): React.JSX.Element;
  displayName?: string;
  Label: typeof RadioGroupLabel;
  Description: typeof RadioGroupDescription;
}

const _RadioGroupFrame = createAtomicComponent(RadioGroupPrimitive, {
  extensions: [useRadioGroupRootRecipe],
});

// The frame body — INSIDE the LabelableProvider, so it can read the registered Description messageIds
// to MANUALLY apply aria-describedby (Base UI RadioGroup does not, unlike CheckboxGroup). A consumer's
// own `aria-describedby` (in rest) wins.
interface RadioGroupBodyProps {
  frameAui: RadioGroupRootAui;
  direction: RadioGroupDirection;
  inherited: FieldResolvedAui;
  forwardedRef: React.Ref<HTMLDivElement>;
  rest: Record<string, unknown>;
  children: React.ReactNode;
}
function RadioGroupBody({ frameAui, direction, inherited, forwardedRef, rest, children }: RadioGroupBodyProps) {
  const { messageIds } = useLabelableContext();
  const consumerDescribedBy = rest['aria-describedby'] as string | undefined;
  const describedBy = consumerDescribedBy ?? (messageIds.length ? messageIds.join(' ') : undefined);
  return React.createElement(
    _RadioGroupFrame as React.ElementType,
    { ref: forwardedRef, ...rest, 'data-direction': direction, 'aria-describedby': describedBy, aui: frameAui },
    React.createElement(FieldAuiProvider, { value: inherited }, children),
  );
}

const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupProps<unknown>>(
  function RadioGroup({ aui, direction = RADIO_GROUP_DEFAULT_DIRECTION, children, ...rest }, ref) {
    const ambient = useFieldAui();
    const inherited = React.useMemo<FieldResolvedAui>(
      () => mergeFieldAui(ambient, seedFieldAui(aui)),
      [ambient, aui],
    );
    const frameAui = React.useMemo<RadioGroupRootAui>(
      () =>
        resolvePartAui(ambient, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'default',
          color: 'surface',
          scale: RADIO_GROUP_DEFAULT_SCALE,
          shape: RADIO_GROUP_DEFAULT_SHAPE,
          elevation: 0,
          followColor: true,
        }) as RadioGroupRootAui,
      [ambient, aui],
    );
    return React.createElement(
      LabelableProvider,
      null,
      React.createElement(RadioGroupBody, {
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
RadioGroupRoot.displayName = 'RadioGroup';

// ─── RadioGroup.Label — the group label (reuses the shipped Label core) ─────────
// Renders the real `<Label>`, inheriting ONLY `scale` from the group cascade. Auto-associates to the
// group via Base UI's labelable substrate (aria-labelledby). Mirrors CheckboxGroup.Label.
export type RadioGroupLabelProps = LabelProps;
const RadioGroupLabel = React.forwardRef<HTMLElement, RadioGroupLabelProps>(
  function RadioGroupLabel({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const mergedAui = React.useMemo<LabelAui | undefined>(() => {
      const scale = aui?.scale ?? inherited.scale;
      if (scale === undefined) return aui;
      return { ...aui, scale };
    }, [aui, inherited.scale]);
    return React.createElement(Label, { ref, ...rest, aui: mergedAui });
  },
);
RadioGroupLabel.displayName = 'RadioGroup.Label';

// ─── RadioGroup.Description — secondary descriptive text (muted helper) ─────────
// A `<p>` styled through the Label class builder, inheriting ONLY `scale`. AUTO-WIRES aria-describedby:
// it carries an `id` (generated, or a consumer `id`) and registers it into the Root's LabelableProvider
// `messageIds`; RadioGroupBody reads those ids and applies aria-describedby to the group (Base UI
// RadioGroup doesn't do this itself). Outside a group the `setMessageIds` default is a NOOP (harmless).
export interface RadioGroupDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  aui?: LabelAui;
  /** Render element. Default `'p'`. */
  as?: React.ElementType;
  /** The element id used for aria-describedby wiring. Defaults to a generated React id. */
  id?: string;
}
const RadioGroupDescription = React.forwardRef<HTMLElement, RadioGroupDescriptionProps>(
  function RadioGroupDescription({ aui, as, className, children, id, ...rest }, ref) {
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
RadioGroupDescription.displayName = 'RadioGroup.Description';

// Assemble the generic RadioGroup with its Label/Description statics (Object.assign would collapse the
// `<Value>` generic, so cast through the call-signature interface — the Select.Root precedent).
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Label: RadioGroupLabel,
  Description: RadioGroupDescription,
}) as RadioGroupComponent;

export default RadioGroup;
