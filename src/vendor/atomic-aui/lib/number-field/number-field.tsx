// modules/design/atomic-aui/src/lib/number-field/number-field.tsx
//
// The compound NumberField — wraps `@base-ui/react/number-field` (1.5.0), dot-namespaced via
// `Object.assign` (the Field/Fieldset/Select precedent). NumberField is the NUMERIC sibling of
// Field and follows the SAME compose model: thin public parts you BUILD UP (it is NOT a
// self-assembling widget). You compose `NumberField.Group > [NumberField.Button, NumberField.Input,
// NumberField.Unit, …]` yourself, exactly like `Field.Control > [Field.Icon, Field.Button, Input]`.
//
// Base UI owns ALL behavior (value/min/max/step, increment/decrement stepping, aria wiring).
// AtomicAUI owns appearance via a per-part `aui` + the PER-PART CASCADE delivered by the SHARED
// `FieldAuiContext` (field-context.tsx — deep-imported, lib-internal, exactly like Fieldset).
//
// THE CASCADE MODEL (reused from Field):
//   • The context carries ONLY the inherited axes { color, scale, shape, elevation }.
//     `profile`/`paint`/`sx` are per-part (never cascaded).
//   • NumberField.Root SEEDS it (merging any ambient Field/Fieldset cascade above — cascade-up);
//     NumberField.Group RE-PROVIDES merge(root, groupOwn) for the inner row.
//   • Each part JS-resolves its own aui (resolvePartAui): scale/shape/elevation follow
//     own ?? inherited ?? part-default; profile/paint are own ?? part-default (NOT inherited);
//     color: Group FOLLOWS the cascade (own ?? inherited ?? surface); Input + Unit PIN surface;
//     NumberField.Button PINS surface-alt + solid.
//   • Per-part profile defaults: Group = default; Input/Unit = no-padding; Button = contained.
import * as React from 'react';
import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { useFieldRootContext } from '@base-ui/react/internals/field-root-context';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import type { PropHook } from '../../core/types';
import { useStateLayer } from '../../core/state/use-state-layer';
import { Input } from '../input';
import type { InputAui } from '../input/use-recipe';
import { IconButton } from '../icon-button';
import type { IconButtonAui } from '../icon-button';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import {
  FieldAuiProvider,
  useFieldAui,
  mergeFieldAui,
  resolvePartAui,
  seedFieldAui,
  type FieldResolvedAui,
} from '../field/field-context';
import { useFieldFocusOrigin } from '../field/use-focus-origin';
import {
  useNumberFieldRootRecipe,
  useNumberFieldGroupRecipe,
  useNumberFieldUnitRecipe,
  NUMBER_FIELD_DEFAULT_SCALE,
  NUMBER_FIELD_DEFAULT_SHAPE,
  type NumberFieldRootAui,
  type NumberFieldGroupAui,
  type NumberFieldUnitAui,
  type NumberFieldScale,
} from './use-recipe';

export type {
  NumberFieldColor,
  NumberFieldPaint,
  NumberFieldScale,
  NumberFieldProfile,
  NumberFieldShape,
  NumberFieldElevation,
  NumberFieldRootAui,
  NumberFieldGroupAui,
  NumberFieldUnitAui,
} from './use-recipe';

/** Which stepper a `NumberField.Button` drives. */
export type NumberFieldButtonAction = 'increment' | 'decrement';

// ─── NumberField-local context — carries the Root `disabled` ──────────────────────
// The Group needs the Root's own `disabled` to grey its border — Base UI's NumberFieldRoot does NOT
// re-provide a FieldRootContext carrying its own disabled (it only OWNS a `disabled` prop), so a
// `<NumberField disabled>` can't be read off `useFieldRootContext` from the Group. This tiny local
// context bridges it, seeded by NumberField.Root.
interface NumberFieldLocalContext {
  disabled?: boolean;
}
const NumberFieldLocalContext = React.createContext<NumberFieldLocalContext>({});
function useNumberFieldLocal(): NumberFieldLocalContext {
  return React.useContext(NumberFieldLocalContext);
}

// ─── In-Group context — drives the stepper's DEFAULT profile by placement ─────────
// A NumberField.Button INSIDE the Group defaults to `profile: contained` (snug, in-field); a Button
// OUTSIDE the Group (a Root-level sibling flanking it — the "split" arrangement) defaults to
// `profile: square` (its own equal-aspect box). The Group provides `true` to its children; Root-level
// buttons see the default `false`. An own `aui.profile` always wins over this default.
const NumberFieldInGroupContext = React.createContext<boolean>(false);

function seed(aui: NumberFieldRootAui | NumberFieldGroupAui | undefined): FieldResolvedAui {
  return seedFieldAui(aui);
}

// ─── NumberField.Group — the bordered control-row FRAME + the cascade re-provider ──
// THE bordered `.aui-frame`, mirroring Field.Control's frame (it is the visible box; Root/Input emit
// no border): color FOLLOWS the cascade (own ?? inherited ?? surface → the border recolors), paint
// pins fixed, profile pins default, scale/shape/elevation cascade. It owns the tab-only :focus-within
// ring, REUSING Field's `useFieldFocusOrigin`, and RE-PROVIDES merge(rootInherited, groupOwn) via
// FieldAuiProvider so its inner row (Input + Buttons + Unit) inherit the Group's overrides. `disabled`
// greys the border (read from the NumberField-local context, OR'd with any ambient Field disabled),
// is fed to the recipe, then STRIPPED from the <div> (mirrors Field.Control's useStripDisabled). The
// Group is the layout host (a flex row) — the consumer places the Input + Buttons + Unit in DOM order.
const useStripDisabled: PropHook<{ className?: string }, Record<string, never>> = () => ({});
useStripDisabled.hookProps = new Set(['disabled']);

const _NumberFieldGroupFrame = createAtomicComponent(NumberFieldPrimitive.Group, {
  extensions: [useStateLayer, useNumberFieldGroupRecipe, useStripDisabled],
});

export interface NumberFieldGroupProps
  extends Omit<React.ComponentProps<typeof NumberFieldPrimitive.Group>, 'color'> {
  aui?: NumberFieldGroupAui;
}

const NumberFieldGroup = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  function NumberFieldGroup({ aui, children, ...rest }, ref) {
    const rootInherited = useFieldAui();
    const local = useNumberFieldLocal();
    const fieldRootContext = useFieldRootContext(true);
    const isDisabled = !!local.disabled || !!fieldRootContext.disabled;

    // The Group's own inherited-axis values merge OVER the root cascade and become the re-provided
    // value the inner row reads (color/scale/shape/elevation only).
    const own = React.useMemo<FieldResolvedAui>(() => seed(aui as NumberFieldGroupAui), [aui]);
    const reprovided = React.useMemo<FieldResolvedAui>(
      () => mergeFieldAui(rootInherited, own),
      [rootInherited, own],
    );

    // The Group FRAME's OWN aui: color FOLLOWS the cascade (border recolors), paint pins fixed,
    // profile pins default; scale/shape/elevation cascade.
    const frameAui = React.useMemo<NumberFieldGroupAui>(
      () =>
        resolvePartAui(rootInherited, aui as FieldResolvedAui, {
          paint: 'fixed',
          profile: 'default',
          color: 'surface',
          scale: NUMBER_FIELD_DEFAULT_SCALE,
          shape: NUMBER_FIELD_DEFAULT_SHAPE,
          elevation: 0,
          followColor: true, // Group border follows the cascade chroma
          followElevation: true, // the Group IS the surface — it floats with a Root-seeded elevation
        }) as NumberFieldGroupAui,
      [rootInherited, aui],
    );

    const focusOriginHandlers = useFieldFocusOrigin();

    return React.createElement(
      FieldAuiProvider,
      { value: reprovided },
      React.createElement(
        _NumberFieldGroupFrame as React.ElementType,
        {
          ref,
          ...rest,
          aui: frameAui,
          // Drives the disabled border chroma; stripped from the DOM by `useStripDisabled`.
          disabled: isDisabled,
          ...focusOriginHandlers,
        },
        // children INSIDE the Group → steppers default to `profile: contained` (in-field look).
        React.createElement(NumberFieldInGroupContext.Provider, { value: true }, children),
      ),
    );
  },
);
NumberFieldGroup.displayName = 'NumberField.Group';

// ─── NumberField.Input — the transparent inner number input ───────────────────────
// Composes the shipped `Input` THROUGH the Base UI NumberField.Input part (Base UI owns the value
// wiring + aria-roledescription="Number field"). paint pins text → transparent; color PINS surface
// (does NOT follow the cascade chroma — the text floats over the Group's fixed fill); profile pins
// no-padding (the Group frame owns ALL the field padding); shape pins none (the Group owns the
// rounded shape). scale cascades.
export interface NumberFieldInputProps
  extends Omit<React.ComponentProps<typeof NumberFieldPrimitive.Input>, 'color'> {
  aui?: InputAui;
}
const NumberFieldInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  function NumberFieldInput({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const inputAui = React.useMemo<InputAui>(
      () => ({
        ...(resolvePartAui(inherited, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'no-padding',
          color: 'surface',
          scale: NUMBER_FIELD_DEFAULT_SCALE,
          shape: NUMBER_FIELD_DEFAULT_SHAPE,
          followColor: false,
        }) as InputAui),
        shape: 'none',
      }),
      [inherited, aui],
    );
    return React.createElement(NumberFieldPrimitive.Input as React.ElementType, {
      ...rest,
      render: React.createElement(Input, { ref, aui: inputAui }),
    });
  },
);
NumberFieldInput.displayName = 'NumberField.Input';

// ─── NumberField.Unit — a non-interactive unit adornment (kg / mm / $ / %) ────────
// A quiet text label that rides INSIDE the Group, leading or trailing the value (engineering fields
// almost always carry a unit). An AUTHORED text leaf (a <span>, NOT a Base UI part) mirroring Field's
// copy leaves: paint text (transparent), color PINS surface, profile no-padding, shape none; scale
// cascades. Inert (not a control). You compose it inside the Group in DOM order. NOTE: this is a
// VISUAL adornment — for a machine-readable unit also pass Base UI `format={{ style:'unit', unit:'…' }}`.
const _NumberFieldUnitLeaf = createAtomicComponent('span', {
  extensions: [useNumberFieldUnitRecipe],
});
export interface NumberFieldUnitProps extends Omit<React.ComponentProps<'span'>, 'color'> {
  aui?: NumberFieldUnitAui;
}
const NumberFieldUnit = React.forwardRef<HTMLSpanElement, NumberFieldUnitProps>(
  function NumberFieldUnit({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const resolvedAui = React.useMemo<NumberFieldUnitAui>(
      () =>
        resolvePartAui(inherited, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'no-padding',
          color: 'surface',
          scale: NUMBER_FIELD_DEFAULT_SCALE,
          shape: 'none',
          followColor: false,
        }) as NumberFieldUnitAui,
      [inherited, aui],
    );
    return React.createElement(_NumberFieldUnitLeaf as React.ElementType, {
      ref,
      ...rest,
      aui: resolvedAui,
    });
  },
);
NumberFieldUnit.displayName = 'NumberField.Unit';

// ─── NumberField.Icon — a placeable general icon (a ContainedIcon, contained profile) ──
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so a leading/inline icon
// sits SNUG in the field row (the in-row icon convention, mirroring Dropdown.Icon / Field.Icon — but
// the TRANSPARENT ContainedIcon flavour, not Field.Icon's solid-surface frame). Otherwise it IS a
// ContainedIcon — same identity props (`name`/`family`/`layer`/`weight`) + the full box `aui` surface;
// a consumer can override the profile (or any axis) via `aui`. Placeable anywhere in the field (e.g.
// a leading icon in the Group, in DOM order). Its scale follows the SAME FieldAuiContext cascade the
// other NumberField parts read (own `aui.scale` ?? the cascaded root scale ?? the NumberField default).
export type NumberFieldIconProps = ContainedIconProps;
const NumberFieldIcon = React.forwardRef<HTMLSpanElement, NumberFieldIconProps>(
  function NumberFieldIcon({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const resolvedScale = resolveAuiScale(
      aui?.scale as NumberFieldScale | undefined,
      inherited.scale as NumberFieldScale | undefined,
      NUMBER_FIELD_DEFAULT_SCALE,
    );
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
NumberFieldIcon.displayName = 'NumberField.Icon';

// ─── NumberField.Button — the stepper button (an IconButton) you build up with ────
// The direct analog of `Field.Button` (a styled button you drop into the frame) — except the action
// is wired to Base UI's stepping: `action="increment"|"decrement"` mounts the IconButton THROUGH the
// matching Base UI part (`NumberField.Increment`/`Decrement`) via its render-prop, so Base UI owns the
// value-stepping (press-and-hold auto-repeat + Shift→largeStep). The IconButton carries NO own onClick.
//
// STYLING: the button IS an IconButton. If you specify `aui`, those axes WIN; otherwise it defaults to
// the stepper look — `paint solid` + `color surface-alt` (does NOT follow the cascade chroma) +
// `profile contained`; scale/shape/elevation cascade. The glyph defaults per action (plus / minus) and
// is overridable via `name`; `family`/`layer`/`weight` flow through to the glyph. aria-label defaults
// to Increase / Decrease.
//
// ESCAPE HATCH: pass `render` (the Base UI render-prop) to REPLACE the IconButton with your OWN element
// (a different IconButton, a Button, anything). Base UI still merges the step behavior onto it; your
// element then owns its appearance + accessible name.
type StepperPart = typeof NumberFieldPrimitive.Increment | typeof NumberFieldPrimitive.Decrement;
const STEPPER_PART: Record<NumberFieldButtonAction, StepperPart> = {
  increment: NumberFieldPrimitive.Increment,
  decrement: NumberFieldPrimitive.Decrement,
};
const STEPPER_GLYPH: Record<NumberFieldButtonAction, string> = { increment: 'plus', decrement: 'minus' };
const STEPPER_LABEL: Record<NumberFieldButtonAction, string> = {
  increment: 'Increase',
  decrement: 'Decrease',
};

type NumberFieldButtonCommon = Omit<
  React.ComponentProps<typeof IconButton>,
  'aui' | 'name' | 'aria-label' | 'aria-labelledby'
> & {
  /** Stepper appearance. If specified, your axes WIN; otherwise the default stepper look (solid /
   *  surface-alt + a placement-aware profile: contained INSIDE the Group, square OUTSIDE). */
  aui?: IconButtonAui;
};

/** STEPPER mode — `action` wires the button to Base UI's Increment / Decrement (Base UI owns the
 *  stepping; the button carries NO own onClick). Glyph (plus/minus) + aria-label (Increase/Decrease)
 *  default per action. */
export type NumberFieldStepperButtonProps = NumberFieldButtonCommon & {
  action: NumberFieldButtonAction;
  /** The FA glyph name. Defaults per action (increment → plus, decrement → minus). */
  name?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Replace the IconButton with a custom element (Base UI render-prop). STEPPER mode only. */
  render?: React.ComponentProps<typeof NumberFieldPrimitive.Increment>['render'];
};

/** CUSTOM mode — OMIT `action` to get a stepper-STYLED button you wire yourself (your `onClick` is
 *  the action, e.g. set the value to ∞). It renders the SAME styled IconButton but is NOT wired to
 *  Base UI stepping. Because it is icon-only, a glyph `name` + an accessible name are required. */
export type NumberFieldCustomButtonProps = NumberFieldButtonCommon & {
  action?: undefined;
  /** The FA glyph name (required — the button is icon-only). */
  name: string;
} & ({ 'aria-label': string } | { 'aria-labelledby': string });

export type NumberFieldButtonProps =
  | NumberFieldStepperButtonProps
  | NumberFieldCustomButtonProps;

const NumberFieldButton = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
  function NumberFieldButton(props, ref) {
    // Flattened internal view — the PUBLIC type is the discriminated union (stepper vs custom); the
    // accessible-name one-of makes its keys non-common, so we destructure from a flattened cast.
    const {
      action,
      aui,
      name,
      family,
      layer,
      weight,
      render: customRender,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...rest
    } = props as NumberFieldButtonCommon & {
      action?: NumberFieldButtonAction;
      name?: string;
      'aria-label'?: string;
      'aria-labelledby'?: string;
      render?: React.ComponentProps<typeof NumberFieldPrimitive.Increment>['render'];
    };
    const inherited = useFieldAui();
    const inGroup = React.useContext(NumberFieldInGroupContext);
    // DEFAULT profile by placement: INSIDE the Group → contained; OUTSIDE (split) → square. An own
    // `aui.profile` overrides this default.
    const defaultProfile: IconButtonAui['profile'] = inGroup ? 'contained' : 'square';
    // glyph + label are guaranteed at runtime by the prop union (stepper → defaulted per action;
    // custom → `name` + accessible name required).
    const glyph = name ?? (action ? STEPPER_GLYPH[action] : undefined);
    const label = ariaLabel ?? (action ? STEPPER_LABEL[action] : undefined);

    // Default stepper look; an own `aui` axis WINS per axis (resolvePartAui = own ?? default).
    const resolvedAui = React.useMemo<IconButtonAui>(
      () =>
        resolvePartAui(inherited, aui as FieldResolvedAui, {
          paint: 'solid',
          profile: defaultProfile,
          color: 'surface-alt', // PIN surface-alt + solid — does NOT follow the cascade chroma
          scale: NUMBER_FIELD_DEFAULT_SCALE,
          shape: NUMBER_FIELD_DEFAULT_SHAPE,
          elevation: 0,
          followColor: false,
        }) as IconButtonAui,
      [inherited, aui, defaultProfile],
    );

    // The styled visual is ALWAYS the shipped IconButton (own-aui-wins stepper look). The seam cast
    // acknowledges that `name`/`aria-label` are union-guaranteed at runtime (TS sees them optional).
    const iconButtonProps = {
      ref,
      'aria-label': label,
      'aria-labelledby': ariaLabelledby,
      name: glyph,
      family,
      layer,
      weight,
      aui: resolvedAui,
    } as React.ComponentProps<typeof IconButton>;

    // CUSTOM (no `action`): the IconButton IS the button — the consumer's `onClick`/props (`rest`)
    // wire it; it is NOT wrapped in a Base UI stepper part (so the `render` escape hatch, a
    // Base-UI-stepper concept, does not apply here).
    if (!action) {
      return React.createElement(IconButton, { ...iconButtonProps, ...rest });
    }

    // STEPPER (`action`): mount the IconButton THROUGH the Base UI Increment/Decrement part so Base
    // UI owns the value-stepping. `rest` (className/data-*) → the Base UI Part (merged onto the button).
    const element = customRender ?? React.createElement(IconButton, iconButtonProps);
    return React.createElement(STEPPER_PART[action] as React.ElementType, {
      ...rest,
      // when a custom render is used, forward a Button-level aria-label so Base UI merges it onto the
      // custom element (the built-in IconButton already carries it).
      ...(customRender && ariaLabel != null ? { 'aria-label': ariaLabel } : {}),
      render: element,
    });
  },
);
NumberFieldButton.displayName = 'NumberField.Button';

// ─── NumberField.Steppers — the OPTIONAL vertical ▲▼ spinner wrapper ──────────────
// A composable wrapper that arranges its two NumberField.Buttons (Increment ABOVE Decrement) as a
// VERTICAL column. It is IN-FLOW (not an absolute overlay) so it never overlaps the value/unit. Each
// button is HALF a contained button's height (`--scale-height / 2`) with a scale-aware chevron, so the
// two together equal ONE contained button — matching the inline / sibling steppers' total size. The
// column is an in-flow item, so the Group row grows to fit it. The state-cascade stylesheet
// (`src/tokens/_state-cascade.scss`) owns the column layout + the joined-seam corners. Place a
// `<NumberField.Steppers>` inside the Group with two `<NumberField.Button>`s (use chevron glyphs).
export type NumberFieldSteppersProps = React.ComponentProps<'span'>
const NumberFieldSteppers = React.forwardRef<HTMLSpanElement, NumberFieldSteppersProps>(
  function NumberFieldSteppers({ className, children, ...rest }, ref) {
    return React.createElement(
      'span',
      {
        ref,
        ...rest,
        className: ['aui-number-field-steppers', typeof className === 'string' ? className : undefined]
          .filter(Boolean)
          .join(' '),
        'data-orientation': 'vertical',
      },
      children,
    );
  },
);
NumberFieldSteppers.displayName = 'NumberField.Steppers';

// ─── NumberField — the root: a full `.aui-frame` box + the cascade SEED ─────────────
// `<NumberField>` IS the root (there is NO `NumberField.Root` — it was hard-removed; `NumberField`
// is the only root form, mirroring Field/Fieldset). Base UI `NumberField.Root` renders a <div> and
// owns the numeric behavior; we make that <div> a full recipe FRAME (the `useNumberFieldRootRecipe`
// emits `aui-frame aui-number-field` + the scale/profile/color/shape/elevation cells + the `aui.sx`
// layer-3 classes) — MIRRORING Field.Root's `_FieldRootFrame` — so the root's OWN box carries EVERY
// `aui`/`aui.sx` axis. This SUPERSEDES the earlier BARE-MARKER root whose `aui`/`aui.sx` were DEAD
// no-ops (e.g. `aui.sx={{ flex:'fill' }}` emitted no class → the field couldn't fill a row). The
// default is a NO-OP repaint: `paint:text` (transparent) + `profile:no-padding` (padding 0) + `shape:
// soft`/`elevation:0` on a fill-less box → byte-identical to the old bare-marker field (zero blast
// radius). The `.aui-number-field` layout CSS (`:where(&){display:flex;align-items:center}`) stays
// 0,0,0 so an `aui.sx` layout override wins (G29).
//
// The SAME element STILL seeds the SAME `FieldAuiContext` EXACTLY like Field.Root/Fieldset.Root —
// `mergeFieldAui(ambient, seed(aui))` (the deep-imported, lib-internal context from
// '../field/field-context', NOT a parallel context) — carrying the INHERITED axes (color/scale/shape/
// elevation ONLY; `paint`/`profile`/`sx` stay frame-local now the root is a real box). CASCADE-UP: a
// NumberField nested under a Field/Fieldset inherits that ancestor's color/scale/shape/elevation unless
// this Root overrides them. For a STANDALONE NumberField the ambient context is EMPTY, so
// `mergeFieldAui({}, seed(aui)) === seed(aui)`. Also seeds the local disabled context for the Group.
// The Root does NOT auto-assemble — you COMPOSE the parts as children (build up).
export interface NumberFieldRootProps
  extends Omit<React.ComponentProps<typeof NumberFieldPrimitive.Root>, 'color'> {
  /** Full-frame appearance for the root's OWN box (every `aui`/`aui.sx` axis — `aui.sx` styles the
   *  box: bg/border/radius/size/layout, frame-local) that ALSO seeds the per-part cascade: the
   *  INHERITED axes (color/scale/shape/elevation) flow to every descendant part (own part axis wins);
   *  `paint`/`profile`/`sx` are frame-local (not cascaded). */
  aui?: NumberFieldRootAui;
}

// The root FRAME (createAtomicComponent — `useNumberFieldRootRecipe` emits `aui-frame aui-number-field`
// + the scale/profile/color cells, so the root's OWN `aui.sx` styles the box). Mirrors Field.Root's
// `_FieldRootFrame`: the frame IS the visible box AND seeds the cascade. `NumberFieldPrimitive.Root` is
// a Base UI COMPONENT (like Fieldset), so the factory's intrinsic-`as` guard does not apply.
const _NumberFieldRootFrame = createAtomicComponent(NumberFieldPrimitive.Root, {
  extensions: [useNumberFieldRootRecipe],
});

const NumberFieldRoot = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
  function NumberFieldRoot({ aui, children, disabled, ...rest }, ref) {
    const ambient = useFieldAui();
    // Cascade seed — the inherited axes ONLY (color/scale/shape/elevation). `sx`/`paint`/`profile` are
    // FRAME-LOCAL now the root is a real frame.
    const inherited = React.useMemo<FieldResolvedAui>(
      () => mergeFieldAui(ambient, seed(aui)),
      [ambient, aui],
    );
    // The root FRAME's own aui: color FOLLOWS the cascade (own ?? ambient ?? surface); paint pins `text`
    // (transparent — opt into a visible box via paint/sx); profile pins `no-padding` (a plain number
    // field has NO outer padding — the bordered box is the GROUP); scale/shape/elevation cascade; sx
    // frame-local. Mirrors Field.Root's `frameAui`.
    const frameAui = React.useMemo<NumberFieldRootAui>(
      () =>
        resolvePartAui(ambient, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'no-padding',
          color: 'surface',
          scale: NUMBER_FIELD_DEFAULT_SCALE,
          shape: NUMBER_FIELD_DEFAULT_SHAPE,
          elevation: 0,
          followColor: true,
        }) as NumberFieldRootAui,
      [ambient, aui],
    );
    const localValue = React.useMemo<NumberFieldLocalContext>(
      () => ({ disabled: !!disabled }),
      [disabled],
    );

    return React.createElement(
      _NumberFieldRootFrame as React.ElementType,
      {
        ref,
        ...rest,
        // `disabled` reaches Base UI's Root (owns the numeric behavior); the recipe also reads it (a
        // no-op chroma flip on the transparent `paint:text` default). Seeds the local disabled context.
        disabled,
        aui: frameAui,
      },
      React.createElement(
        NumberFieldLocalContext.Provider,
        { value: localValue },
        React.createElement(FieldAuiProvider, { value: inherited }, children),
      ),
    );
  },
);
NumberFieldRoot.displayName = 'NumberField';

// ─── Assemble (Object.assign dot-namespace, the Field/Fieldset/Select precedent) ──
// `<NumberField>` IS the root — there is NO `NumberField.Root` (hard-removed): the root function is
// the only root form. All OTHER parts stay dot-namespaced.
export interface NumberFieldComponent
  extends React.ForwardRefExoticComponent<
    NumberFieldRootProps & React.RefAttributes<HTMLDivElement>
  > {
  Group: typeof NumberFieldGroup;
  Input: typeof NumberFieldInput;
  Unit: typeof NumberFieldUnit;
  Icon: typeof NumberFieldIcon;
  Button: typeof NumberFieldButton;
  Steppers: typeof NumberFieldSteppers;
}

export const NumberField = Object.assign(NumberFieldRoot, {
  Group: NumberFieldGroup,
  Input: NumberFieldInput,
  Unit: NumberFieldUnit,
  Icon: NumberFieldIcon,
  Button: NumberFieldButton,
  Steppers: NumberFieldSteppers,
}) as NumberFieldComponent;

export default NumberField;
