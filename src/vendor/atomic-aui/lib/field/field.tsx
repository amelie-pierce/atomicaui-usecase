// modules/design/atomic-aui/src/lib/field/field.tsx
//
// The compound Field — wraps `@base-ui/react/field` (1.6.0), dot-namespaced via `Object.assign`
// (the Select precedent). Field COMPOSES the shipped siblings: Input (the DEFAULT-rendered
// control), an Icon GLYPH (inside Field.Icon's own solid-surface frame) and Button (the in-field
// Field.Button).
//
// Base UI owns ALL behavior (label↔control id, aria-describedby, validation, render state).
// AtomicAUI owns appearance via a per-part `aui` + a PER-PART CASCADE delivered by the
// `FieldAuiContext` (field-context.tsx). No portal, no identity re-stamp — the tree stays in
// normal document flow.
//
// THE NEW CASCADE MODEL — EVERY part reads the cascade:
//   • The context carries ONLY the inherited axes { color, scale, shape, elevation }.
//     `profile`/`paint`/`sx` are NOT cascaded (per-part).
//   • Field.Root seeds it from its aui; Field.Control RE-PROVIDES merge(root, controlOwn) so the
//     inner row parts inherit the Control's overrides.
//   • Each part JS-resolves its own aui (resolvePartAui): scale/shape/elevation follow
//     own??inherited??default; profile/paint are own??default (never inherited); color follows the
//     cascade ONLY for Control + Description, else PINS surface.
import * as React from 'react';
import { Field as FieldPrimitive } from '@base-ui/react/field';
import { useFieldRootContext } from '@base-ui/react/internals/field-root-context';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { hasPartChild } from '../../core/factory/create-atomic-part';
import type { PropHook } from '../../core/types';
import { useStateLayer } from '../../core/state/use-state-layer';
import { Input } from '../input';
import { Textarea } from '../textarea';
import type { TextareaProps } from '../textarea';
import { Button } from '../button';
import { Select } from '../select';
import { ContainedIcon } from '../icon';
import type { ContainedIconProps } from '../icon';
import type { ButtonProps, ButtonIconProps } from '../button';
import type { InputAui } from '../input/use-recipe';
import type {
  SelectRootProps,
  SelectTriggerProps,
  SelectPopupProps,
  SelectItemProps,
} from '../select';
import { NumberField } from '../number-field';
import type {
  NumberFieldRootProps,
  NumberFieldGroupProps,
  NumberFieldInputProps,
  NumberFieldUnitProps,
  NumberFieldIconProps,
  NumberFieldButtonProps,
  NumberFieldSteppersProps,
} from '../number-field';
import { Datepicker } from '../datepicker';
import type {
  DatepickerRootProps,
  DatepickerTriggerProps,
  DatepickerPopupProps,
  DatepickerInputProps,
} from '../datepicker';
import { Combobox } from '../combobox';
import type { ComboboxRootProps } from '../combobox';
import { Autocomplete } from '../autocomplete';
import type { AutocompleteRootProps, AutocompleteInlineLayoutAui, AutocompleteInlineCardAui } from '../autocomplete';
import { useLabelableContext, useLabelableId } from '@base-ui/react/internals/labelable-provider';
import {
  FieldAuiProvider,
  useFieldAui,
  mergeFieldAui,
  resolvePartAui,
  seedFieldAui,
  type FieldResolvedAui,
} from './field-context';
import { useFieldFocusOrigin } from './use-focus-origin';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import {
  useFieldRootRecipe,
  useFieldControlRecipe,
  useFieldLabelRecipe,
  useFieldDescriptionRecipe,
  useFieldErrorRecipe,
  FIELD_DEFAULT_SCALE,
  FIELD_DEFAULT_SHAPE,
  type FieldRootAui,
  type FieldControlAui,
  type FieldLabelAui,
  type FieldDescriptionAui,
  type FieldErrorAui,
} from './use-recipe';

export type {
  FieldColor,
  FieldPaint,
  FieldScale,
  FieldProfile,
  FieldShape,
  FieldElevation,
  FieldRootAui,
  FieldControlAui,
  FieldLabelAui,
  FieldDescriptionAui,
  FieldErrorAui,
  FieldIconAui,
} from './use-recipe';

// `aui` (a frame Appearance) → the INHERITED cascade snapshot the context carries (color/scale/
// shape/elevation only — paint/profile/sx are per-part, never inherited). Delegates to the shared
// `seedFieldAui` projection (field-context) so Field and Fieldset apply the SAME rule.
function toInherited(aui: FieldRootAui | FieldControlAui | undefined): FieldResolvedAui {
  return seedFieldAui(aui);
}

// ─── resolveFieldInputAui — the ONE input-aui projection (auto path + Field.Input share it) ────────
// Projects the RE-PROVIDED Field cascade (the value inside a `Field.Control`) into the `aui` the
// editable Base UI input carries — whether the Control auto-renders the input OR the consumer
// composes `<Field.Input>`. Extracted so the two paths CANNOT drift.
//
// The contract (unchanged from the original inline projection): paint PINS `text`, color PINS
// `surface` (the transparent text floats over the Control's `fixed` fill — does NOT follow the root
// chroma), profile PINS `no-padding` (the Control FRAME owns ALL the box padding + the row gap so
// the Field's height matches a Button/Select at the same tier), shape PINS `none` (the Control frame
// owns the rounded shape; the transparent inner input must not round, even when the Root cascades a
// shape), scale cascades. `own` (a `Field.Input aui` override) wins per-axis through `resolvePartAui`,
// then `shape: 'none'` is RE-PINNED after the merge (like `paint: 'text'`) so an override can't round
// the inner input. NOT a cascadeReader — `INPUT_VOCAB` is the SHARED standalone-Input vocab (flagging
// it would break bare `<Input>`), hence this EXPLICIT projection.
function resolveFieldInputAui(
  reprovided: FieldResolvedAui,
  ownAui?: FieldResolvedAui,
): InputAui {
  return {
    ...(resolvePartAui(reprovided, ownAui, {
      paint: 'text',
      profile: 'no-padding',
      color: 'surface',
      scale: FIELD_DEFAULT_SCALE,
      shape: FIELD_DEFAULT_SHAPE,
      followColor: false,
    }) as InputAui),
    shape: 'none',
  };
}

// ─── Field — the root: a full `.aui-frame` box + the cascade provider ─────────────
// `<Field>` IS the root (there is NO `Field.Root` — it was hard-removed; `Field` is the only root
// form). Base UI `Field.Root` renders a <div> and provides the field context (id/validation wiring);
// we make that <div> a full recipe FRAME (the `useFieldRootRecipe` emits `aui-field aui-frame` + the
// scale/profile/color/shape/elevation cells + the `aui.sx` layer-3 classes), so the root's OWN box
// carries EVERY `aui` + `aui.sx` axis: `aui.scale` drives the label↔control GAP, `aui.profile` opts
// into outer padding, `aui.sx` styles the root box (bg/border/radius/size/layout), all FRAME-LOCAL.
// This SUPERSEDES the earlier note that the root "renders no visible box" / its `profile` is "~no-op"
// and the 2026-06-13 root-`sx`-CASCADE (which existed ONLY because the root was a bare marker). The
// default is a NO-OP repaint: `paint:text` (transparent) + `profile:no-padding` (`no-padding-sm` =
// padding 0 + gap 6) + `shape:soft`/`elevation:0` on a fill-less box → byte-similar to the old field.
//
// The SAME element STILL seeds the per-part cascade via `FieldAuiProvider` (color/scale/shape/
// elevation — the inherited axes; `paint`/`profile`/`sx` stay frame-local now the root is a real box).
//
// CASCADE-UP: the cascade seed MERGES the ambient `FieldAuiContext` (a `Fieldset` above seeds it —
// fieldset.tsx) with its own, so a Fieldset's color/scale/shape/elevation flow into this Field unless
// the Field overrides them (`own ?? inherited`, via mergeFieldAui). For a STANDALONE Field (no
// Fieldset ancestor) the ambient context is EMPTY, so the seed reduces to the Field's own axes.
export interface FieldRootProps
  extends Omit<React.ComponentProps<typeof FieldPrimitive.Root>, 'color'> {
  /** Full-frame appearance for the root's OWN box (every `aui`/`aui.sx` axis — `aui.scale` drives the
   *  label↔control gap, `aui.profile` opts into outer padding, `aui.sx` styles the box, frame-local)
   *  that ALSO seeds the per-part cascade: the INHERITED axes (color/scale/shape/elevation) flow to
   *  every descendant part (own part axis wins); `paint`/`profile`/`sx` are frame-local (not cascaded). */
  aui?: FieldRootAui;
}

// The root FRAME (createAtomicComponent — `useFieldRootRecipe` emits `aui-frame aui-field` + the
// scale/profile/color cells, so the root's OWN `aui.scale` drives the gap, `aui.profile` opts into
// padding, `aui.sx` is frame-local). Mirrors `Fieldset.Root`: the frame IS the visible box AND seeds
// the cascade. A `<div>` intrinsic host? No — `FieldPrimitive.Root` is a Base UI COMPONENT (like
// Fieldset), so the factory's intrinsic-`as` guard does not apply.
const _FieldRootFrame = createAtomicComponent(FieldPrimitive.Root, {
  extensions: [useFieldRootRecipe],
});

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(function FieldRoot(
  { aui, children, ...rest },
  ref,
) {
  const ambient = useFieldAui();
  // Cascade seed — the inherited axes ONLY (color/scale/shape/elevation). `sx`/`paint`/`profile` are
  // FRAME-LOCAL now the root is a real frame: this SUPERSEDES the 2026-06-13 root-`sx`-CASCADE (which
  // existed only because the root rendered no box). `aui.sx` now styles the ROOT box — so
  // `<Field aui={{ sx:{ flexDirection:'row', alignItems:'center' } }}>` is a same-row field (label
  // beside control), and `<Field aui={{ scale:'lg' }}>` widens the label/control gap.
  const inherited = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(ambient, seedFieldAui(aui)),
    [ambient, aui],
  );
  // The root FRAME's own aui: color FOLLOWS the cascade (own ?? ambient ?? surface); paint pins `text`
  // (transparent — opt into a visible box via paint/sx); profile pins `no-padding` (a plain field has
  // NO outer padding — UNLIKE `Fieldset`'s bordered-group `default`; `no-padding-sm` = padding 0 + gap
  // 6 is byte-identical to the pre-frame field); scale/shape/elevation cascade; sx frame-local.
  const frameAui = React.useMemo<FieldRootAui>(
    () =>
      resolvePartAui(ambient, aui as FieldResolvedAui, {
        paint: 'text',
        profile: 'no-padding',
        color: 'surface',
        scale: FIELD_DEFAULT_SCALE,
        shape: FIELD_DEFAULT_SHAPE,
        elevation: 0,
        followColor: true,
      }) as FieldRootAui,
    [ambient, aui],
  );
  return React.createElement(
    _FieldRootFrame as React.ElementType,
    { ref, ...rest, aui: frameAui },
    React.createElement(FieldAuiProvider, { value: inherited }, children),
  );
});
FieldRoot.displayName = 'Field';

// ─── Field.Label — copy leaf, color PINS surface ─────────────────────────────────
// Reads the cascade for scale/shape/elevation; paint=text, profile=no-padding (own-overridable),
// color PINS surface (own ?? surface — does NOT follow the root chroma).
const _FieldLabel = createAtomicComponent(FieldPrimitive.Label, {
  extensions: [useFieldLabelRecipe],
});
export interface FieldLabelProps
  extends Omit<React.ComponentProps<typeof FieldPrimitive.Label>, 'color'> {
  aui?: FieldLabelAui;
}
const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
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
        scale: FIELD_DEFAULT_SCALE,
        shape: 'none',
        followColor: false,
      }) as FieldLabelAui,
    [inherited, aui],
  );
  return React.createElement(_FieldLabel as React.ElementType, { ref, ...rest, aui: resolvedAui });
});
FieldLabel.displayName = 'Field.Label';

// ─── Field.Description — copy leaf, color FOLLOWS the root chroma ─────────────────
const _FieldDescription = createAtomicComponent(FieldPrimitive.Description, {
  extensions: [useFieldDescriptionRecipe],
});
export interface FieldDescriptionProps
  extends Omit<React.ComponentProps<typeof FieldPrimitive.Description>, 'color'> {
  aui?: FieldDescriptionAui;
}
const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  function FieldDescription({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const resolvedAui = React.useMemo(
      () =>
        resolvePartAui(inherited, aui as FieldResolvedAui, {
          paint: 'text',
          profile: 'no-padding',
          color: 'surface',
          scale: FIELD_DEFAULT_SCALE,
          shape: 'none',
          followColor: true, // Description follows the root chroma (text recolors)
        }) as FieldDescriptionAui,
      [inherited, aui],
    );
    return React.createElement(_FieldDescription as React.ElementType, {
      ref,
      ...rest,
      aui: resolvedAui,
    });
  },
);
FieldDescription.displayName = 'Field.Description';

// ─── Field.Error — copy leaf, color PINS surface ─────────────────────────────────
const _FieldError = createAtomicComponent(FieldPrimitive.Error, {
  extensions: [useFieldErrorRecipe],
});
export interface FieldErrorProps
  extends Omit<React.ComponentProps<typeof FieldPrimitive.Error>, 'color'> {
  aui?: FieldErrorAui;
}
const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(function FieldError(
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
        scale: FIELD_DEFAULT_SCALE,
        shape: 'none',
        followColor: false,
      }) as FieldErrorAui,
    [inherited, aui],
  );
  return React.createElement(_FieldError as React.ElementType, { ref, ...rest, aui: resolvedAui });
});
FieldError.displayName = 'Field.Error';

// ─── Field.Icon — a placeable general icon (a ContainedIcon, contained profile) ───
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so a leading/inline icon
// sits SNUG in the control row (the in-row icon convention, mirroring Dropdown.Icon / Select.Icon /
// Accordion.Icon). It is NO LONGER a solid-surface chip — it IS a ContainedIcon: a TRANSPARENT box
// (paint defaults to `text`) with the FULL box `aui` surface (color/paint/scale/profile/shape/
// elevation/sx). Same identity props (`name`/`family`/`layer`/`weight`); a consumer overrides the
// profile (or any axis) via `aui`. Placeable anywhere in the Field (or in a Field within a
// Fieldset). The icon sizes to the Field's EFFECTIVE tier: own `aui.scale` ?? the Field cascade
// scale (`useFieldAui().scale`) ?? the Control vocab default — so it tracks a Root/Control/Fieldset
// scale cascade exactly like the other parts. `Field.ButtonIcon` (the clear-button glyph) is
// SEPARATE and unchanged.
export type FieldIconProps = ContainedIconProps;
const FieldIcon = React.forwardRef<HTMLSpanElement, FieldIconProps>(function FieldIcon(
  { aui, ...rest },
  ref,
) {
  // Resolve the scale from the FIELD cascade (not the dropdown `useAuiScale()` rail — Field parts
  // read the `FieldAuiContext`): own `aui.scale` ?? the cascaded scale ?? the Control vocab default.
  const inherited = useFieldAui();
  const resolvedScale = resolveAuiScale(aui?.scale, inherited.scale, FIELD_DEFAULT_SCALE);
  const resolvedAui = React.useMemo(
    () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
    [aui, resolvedScale],
  );
  return React.createElement(ContainedIcon, { ref, ...rest, aui: resolvedAui });
});
FieldIcon.displayName = 'Field.Icon';

// ─── Field.Button — in-field clear action composing Button (color PINS surface) ───
// Reads the cascade (the Control re-provides), resolves { paint:'solid', color:'surface'(pinned),
// profile:'contained', scale/shape/elevation from the cascade } → `aui-color-solid-<surface|own>`
// + `aui-scale-contained-<tier>`. color PINS surface (does NOT follow the root chroma); a
// Button-level `aui.color` still wins. The `aui-field-button` marker hosts the row order.
//
// DEFAULT clear behavior: if the consumer passes NO `onClick`, the button CLEARS the nearest field
// control's input by DEFAULT; if the consumer DOES pass `onClick`, theirs runs instead (they own it).
export interface FieldButtonProps extends Omit<ButtonProps, 'aui'> {
  aui?: ButtonProps['aui'];
}

// Structural DOM shapes — this lib's tsconfig is DOM-light (no lib.dom globals), so we type the
// pieces we touch via `unknown`/structural types, mirroring use-focus-origin.ts. SSR-safe: every
// access is guarded on the event/target actually existing.
type ClearableInput = {
  tagName?: string;
  focus(): void;
  dispatchEvent(event: unknown): boolean;
};
type ClearButtonHost = {
  closest(selector: string): ({ querySelector(selector: string): unknown } | null) | null;
};

// Clear the nearest field control's <input>/<textarea> in a way Base UI Field observes (updates
// dirty/filled/validation): set the value via the NATIVE prototype setter (so React's onChange
// fires) then dispatch a bubbling 'input' event, then refocus. Load-bearing: the native setter +
// synthetic 'input' is the only way to mutate a controlled React input from the outside such that
// React + Base UI Field both re-derive state. We read the prototype setter lazily/guarded so the
// module stays SSR-safe (no top-level DOM access).
function clearNearestFieldControl(currentTarget: unknown): void {
  const host = currentTarget as ClearButtonHost | null | undefined;
  if (!host || typeof host.closest !== 'function') return;
  const scope = host.closest('.aui-field-control') ?? host.closest('.aui-field');
  if (!scope || typeof scope.querySelector !== 'function') return;
  const input = scope.querySelector('input, textarea') as ClearableInput | null;
  if (!input) return;

  const g = globalThis as {
    HTMLInputElement?: { prototype: object };
    HTMLTextAreaElement?: { prototype: object };
    Event?: new (type: string, init?: { bubbles?: boolean }) => unknown;
  };
  const proto =
    input.tagName === 'TEXTAREA'
      ? g.HTMLTextAreaElement?.prototype
      : g.HTMLInputElement?.prototype;
  const setter = proto
    ? Object.getOwnPropertyDescriptor(proto, 'value')?.set
    : undefined;
  if (setter) {
    setter.call(input, '');
  }
  if (typeof g.Event === 'function') {
    input.dispatchEvent(new g.Event('input', { bubbles: true }));
  }
  input.focus();
}

const FieldButton = React.forwardRef<HTMLElement, FieldButtonProps>(function FieldButton(
  { aui, className, onClick, ...rest },
  ref,
) {
  const inherited = useFieldAui();
  const resolvedAui = React.useMemo(
    () =>
      resolvePartAui(inherited, aui as FieldResolvedAui, {
        paint: 'solid',
        profile: 'contained',
        color: 'surface', // PIN surface (own ?? surface — does NOT follow the root chroma)
        scale: FIELD_DEFAULT_SCALE,
        shape: FIELD_DEFAULT_SHAPE,
        elevation: 0,
        followColor: false,
      }) as ButtonProps['aui'],
    [inherited, aui],
  );

  // If the consumer wired `onClick`, they fully own the click (no auto-clear). Otherwise the
  // default handler clears the nearest field control's input.
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(event as never);
        return;
      }
      clearNearestFieldControl(event.currentTarget);
    },
    [onClick],
  );

  return React.createElement(Button, {
    ref,
    ...rest,
    onClick: handleClick,
    aui: resolvedAui,
    className: ['aui-field-button', typeof className === 'string' ? className : undefined]
      .filter(Boolean)
      .join(' '),
  });
});
FieldButton.displayName = 'Field.Button';

// ─── Field.ButtonIcon — the clear-button's glyph, host-namespaced ──────────────────
// The glyph inside `Field.Button` is INTRINSIC to Field, so per the namespace convention
// (wiki/patterns/component-namespace-convention.md) it must be reachable under FIELD's namespace,
// NOT the foreign `Button.Icon`. Thin re-export of the shipped Button.Icon (same ContainedIcon
// glyph + identity props); the only change is the host-correct displayName.
export type FieldButtonIconProps = ButtonIconProps
const FieldButtonIcon = React.forwardRef<HTMLSpanElement, FieldButtonIconProps>(
  function FieldButtonIcon(props, ref) {
    return React.createElement(Button.Icon, { ...props, ref });
  },
);
FieldButtonIcon.displayName = 'Field.ButtonIcon';

// ─── Field.Input — the COMPOSABLE editable control (adornment order by DOM position) ──────────────
// The same Base UI input `Field.Control` auto-renders, exposed as a composable part so the consumer
// controls adornment order by CHILD DOM ORDER (the row is a flex row — input flex:1, adornments
// flex:0 — and visual order IS document order; there is NO CSS `order`). Compose `<Field.Icon>`
// BEFORE `<Field.Input>` for a LEADING icon, AFTER it for a TRAILING icon. When a `Field.Input` is
// composed, `Field.Control` does NOT also auto-render its input (exactly ONE `FieldPrimitive.Control`).
//
// It reads the Field cascade (`useFieldAui()` — the value RE-PROVIDED inside a `Field.Control`),
// resolves the input `aui` via the SHARED `resolveFieldInputAui` projection (so it can't drift from
// the auto path), stamps `data-field-control` (the row-flex selector + the focus/filled detection
// read it), and wraps in `FieldPrimitive.Control`. It accepts the native input props
// (defaultValue/value/placeholder/onChange/…), an optional `aui` override, and the Base UI `render`
// prop (swap the rendered element). Place anywhere in the Control row.
export interface FieldInputProps
  extends Omit<React.ComponentProps<typeof FieldPrimitive.Control>, 'color'> {
  /** Per-axis override over the Field cascade for the editable input. shape PINS `none` regardless. */
  aui?: FieldControlAui;
}
const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(function FieldInput(
  { aui, render, ...rest },
  ref,
) {
  // The cascade here is the Control's RE-PROVIDED value (Field.Control wraps its children in the
  // FieldAuiProvider before they render), so a standalone Field.Input reads the Root cascade and a
  // composed one reads the Control's overrides — same as the auto input.
  const reprovided = useFieldAui();
  const inputAui = React.useMemo<InputAui>(
    () => resolveFieldInputAui(reprovided, aui as FieldResolvedAui),
    [reprovided, aui],
  );

  // The rendered control element — our <Input> by default, or the consumer's `render`. Stamp
  // `data-field-control` so the row-flex selector is REAL (Base UI's Field.Control does NOT stamp it)
  // and a custom control flexes like the default Input — see field.scss.
  const controlElement = (render ?? React.createElement(Input, { aui: inputAui })) as React.ReactElement;
  const stampedControl = React.cloneElement(controlElement, {
    'data-field-control': '',
  } as React.Attributes & Record<string, unknown>);

  return React.createElement(FieldPrimitive.Control as React.ElementType, {
    ...rest,
    ref,
    render: stampedControl,
  });
});
FieldInput.displayName = 'Field.Input';

// ─── Field.Textarea — the multi-line control (a REFERENCE-IDENTICAL re-export of Textarea) ─────────
// Like the `Field.NumberField` family (and DELIBERATELY unlike the PROJECTED `Field.Input`): Field.Textarea
// IS our standalone `<Textarea>`, brought WHOLE into the Field with its OWN frame / border / skin / focus
// ring / `Textarea.ScrollArea` composition — identical to the atomic-play rendering (the user's ask). No
// projection wrapper is needed because our Textarea wraps Base UI's `Input`, and Base UI `Input` renders
// `Field.Control` internally (`node_modules/@base-ui/react/input/Input.js` → `<Field.Control {...props}/>`).
// So a bare `<Textarea>` inside a `<Field>` SELF-REGISTERS as the field control: `<Field.Label>` ↔ the
// textarea (label-click focuses it) + required/validate run against it (→ `Field.Error`), all FREE — the
// SAME mechanism the NumberField re-export relies on (NumberFieldInput → useRegisterFieldControl).
//
// Compose it STANDALONE in the Field (NOT inside `<Field.Control>` — that would double the frame). Its Base
// UI Field.Control still gates Enter-commit to `tagName === 'INPUT'`, so Enter = newline. It takes the full
// `TextareaProps` (`aui`, `rows`, `resize`, `autoGrow`, the `Textarea.ScrollArea` child, native attrs).
// NOTE: unlike NumberField it does NOT self-cascade the Field's scale/color (Textarea reads only its own
// `aui`), so it renders with its own appearance — set `aui` explicitly to match a scaled/tinted Field.
export type FieldTextareaProps = TextareaProps;
const FieldTextarea = Textarea;

// ─── Field.Control — the visible control-row FRAME + the Base UI render seam ───────
// Two layers:
//   1. the visible FRAME — a factory-built <div> (useStateLayer → `aui-stateful` + focus ring,
//      then the control recipe). It resolves its OWN aui per the cascade: color FOLLOWS the root
//      chroma (own ?? inherited ?? surface → the border recolors), paint pins `fixed`, profile
//      pins `default`, scale/shape/elevation cascade. It owns the tab-only :focus-within outline.
//   2. the editable CONTROL — Base UI `Field.Control` rendered AS our `<Input>` (the render seam).
// The Control RE-PROVIDES merge(rootInherited, controlOwn{color,scale,shape,elevation}) so the
// row siblings (the auto Input + Icon + Button) inherit the Control's overrides.
// The Control FRAME is a plain <div> — NOT a Base UI render seam — so it never sees the Field's
// disabled through render state (unlike the inner Input, which Base UI's Field.Control disables
// natively). We therefore drive the frame's disabled chroma OURSELVES: FieldControl reads the
// Field.Root disabled from `useFieldRootContext` (OR a control-level `disabled` prop) and passes
// `disabled` to this frame so `useFieldControlRecipe` (createVocabRecipe → buildLeafClasses) flips
// the border to the `aui-color-fixed-disabled` cell — matching the Input's disabled chroma.
//
// `disabled` is a non-standard attr on a <div> (React would render `disabled=""`), so this no-op
// hook claims it via `hookProps`: the factory STRIPS it from the DOM after the recipe has already
// read it from `merged.disabled` (the strip loop runs last). The recipe still sees disabled.
const useStripDisabled: PropHook<{ className?: string }, Record<string, never>> = () => ({});
useStripDisabled.hookProps = new Set(['disabled']);

const _FieldControlFrame = createAtomicComponent('div', {
  extensions: [useStateLayer, useFieldControlRecipe, useStripDisabled],
});

export interface FieldControlProps
  extends Omit<React.ComponentProps<typeof FieldPrimitive.Control>, 'color'> {
  aui?: FieldControlAui;
}

const FieldControl = React.forwardRef<HTMLInputElement, FieldControlProps>(function FieldControl(
  { aui, render, children, ...rest },
  ref,
) {
  const rootInherited = useFieldAui();
  // The Field's disabled state for the visible FRAME. Base UI disables the inner control natively
  // (Field.Root disabled flows to it via render state), but the frame is a plain <div> outside that
  // seam. Source of truth = Base UI's Field root context (`disabled` = the Field.Root disabled,
  // FieldRootContext.js:19) OR a control-level `disabled` prop — mirrors FieldControl.js:54
  // (`fieldDisabled || disabledProp`). `useFieldRootContext(true)` is optional (no throw outside a
  // Field.Root). When true, the frame recipe flips to `aui-color-fixed-disabled` (matches Input).
  const fieldRootContext = useFieldRootContext(true);
  const isDisabled =
    !!fieldRootContext.disabled || !!(rest as { disabled?: unknown }).disabled;
  // The Control's own inherited-axis values merge OVER the root cascade and become the re-provided
  // value the row siblings read (color/scale/shape/elevation only).
  const own = React.useMemo<FieldResolvedAui>(() => toInherited(aui as FieldControlAui), [aui]);
  const reprovided = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(rootInherited, own),
    [rootInherited, own],
  );

  // The Control FRAME's OWN aui: color FOLLOWS the root chroma (border recolors), paint pins fixed,
  // profile pins default. scale/shape/elevation cascade. Resolved against the ROOT cascade (the
  // Control's own value is read from `aui`).
  //
  // `aui.states` (the canonical per-state appearance — for API uniformity with the other stateful
  // frames) is re-attached AFTER `resolvePartAui` because that resolver only projects the context axes
  // (color/paint/scale/shape/elevation/profile/sx) and does NOT carry `states` through. The control
  // recipe always resolves the `unselected` active state, so an authored `aui.states.unselected` layers
  // over this resolved base; `selected`/`indeterminate` are reserved/inert. Threaded own-aui-only (the
  // root cascade never carries per-state appearance).
  const frameAui = React.useMemo<FieldControlAui>(
    () => {
      const resolved = resolvePartAui(rootInherited, aui as FieldResolvedAui, {
        paint: 'fixed',
        profile: 'default',
        color: 'surface',
        scale: FIELD_DEFAULT_SCALE,
        shape: FIELD_DEFAULT_SHAPE,
        elevation: 0,
        followColor: true, // Control border follows the root chroma
        followElevation: true, // the Control IS the surface — it floats with a Root-seeded elevation
      }) as FieldControlAui;
      return aui?.states !== undefined ? { ...resolved, states: aui.states } : resolved;
    },
    [rootInherited, aui],
  );

  // The auto Input is JS-RESOLVED off the RE-PROVIDED cascade via the SHARED `resolveFieldInputAui`
  // projection (the SAME one `Field.Input` uses — so the auto path and the composable part CANNOT
  // drift): paint pins text, color PINS surface (transparent text floats over the Control's fixed
  // fill — does NOT follow the root chroma), profile PINS no-padding (the Control FRAME owns ALL the
  // box padding + row gap so the Field's height matches a Button/Select at the same tier), shape PINS
  // none (the Control frame owns the rounding; the inner input must not round), scale cascades.
  const inputAui = React.useMemo<InputAui>(
    () => resolveFieldInputAui(reprovided),
    [reprovided],
  );

  // Composition seam: if the consumer composed a `<Field.Input>` among the children, it OWNS the
  // editable control (and its DOM position governs adornment order). We then render the frame with
  // ONLY `children` and do NOT auto-render the input — there must be exactly ONE `FieldPrimitive.Control`.
  // Back-compat: with no composed Field.Input, we keep the auto path (defaultControl first, then children).
  // (`Field.Textarea` is a self-framed re-export composed STANDALONE in the Field, not inside Field.Control,
  // so it does not participate here — it brings its own frame + self-registers, like the NumberField family.)
  const hasComposedInput = hasPartChild(children, FieldInput);

  // The rendered control element — our <Input> by default, or the consumer's `render`. We stamp
  // `data-field-control` onto it so the row-flex selector is REAL (Base UI's Field.Control does NOT
  // stamp it) and a CUSTOM control flexes like the default Input — see field.scss.
  const controlElement = (render ?? React.createElement(Input, { aui: inputAui })) as React.ReactElement;
  const stampedControl = React.cloneElement(controlElement, {
    'data-field-control': '',
  } as React.Attributes & Record<string, unknown>);

  const defaultControl = React.createElement(FieldPrimitive.Control as React.ElementType, {
    ...rest,
    ref,
    render: stampedControl,
  });

  // Capture-phase focus-origin handlers on the CONTROL FRAME (not the inner input). field.scss
  // gates the frame's :focus-within outline on this CONTROL-OWNED attr (keyboard-only).
  const focusOriginHandlers = useFieldFocusOrigin();

  // Track whether the control has a value → stamp `data-aui-filled` on the FRAME so field.scss can
  // reveal the in-field clear Button ONLY when the field is non-empty (and hide it again when the
  // clear resets the value — the clear dispatches a bubbling `input` event). The bubbled input
  // event carries the inner control as `target`; the frame is `currentTarget`. Works for the
  // default Input AND a consumer `render`. DOM-light tsconfig → structural types (cf. use-focus-origin).
  const handleFilledInput = React.useCallback(
    (event: { currentTarget?: unknown; target?: unknown }) => {
      const frame = event.currentTarget as
        | { setAttribute(name: string, value: string): void; removeAttribute(name: string): void }
        | null;
      if (!frame) return;
      const value = (event.target as { value?: unknown } | null)?.value;
      if (typeof value === 'string' && value.length > 0) frame.setAttribute('data-aui-filled', '');
      else frame.removeAttribute('data-aui-filled');
    },
    [],
  );

  // The `onInput` handler only fires on EDITS — a `defaultValue`/controlled initial value would
  // leave the clear Button hidden on mount. A callback ref on the FRAME stamps `data-aui-filled`
  // once at mount if the rendered control already has a value (refs fire child→parent, so the inner
  // input is mounted with its value when this runs). Structural types (DOM-light tsconfig).
  const frameRef = React.useCallback(
    (node: { querySelector?(sel: string): { value?: unknown } | null; setAttribute(n: string, v: string): void } | null) => {
      if (!node || typeof node.querySelector !== 'function') return;
      const value = node.querySelector('input, textarea')?.value;
      if (typeof value === 'string' && value.length > 0) node.setAttribute('data-aui-filled', '');
    },
    [],
  );

  // Adornment slots (Icon/Button) + the editable control live in the frame's flex row. Visual order
  // follows CHILD DOM ORDER (the input is flex:1, adornments flex:0 — NO CSS `order`; see field.scss).
  // • COMPOSED `Field.Input` → render ONLY `children` (the composed input is the single
  //   `FieldPrimitive.Control`; its DOM position governs whether an Icon is leading or trailing).
  // • NO composed input → keep the auto path: `defaultControl` FIRST (trailing-by-default), then
  //   `children` (back-compat — `<Field.Icon>` always lands after the auto input).
  return React.createElement(
    FieldAuiProvider,
    { value: reprovided },
    React.createElement(
      _FieldControlFrame as React.ElementType,
      {
        ref: frameRef,
        aui: frameAui,
        // Drives the disabled border chroma; stripped from the DOM by `useStripDisabled`.
        disabled: isDisabled,
        ...focusOriginHandlers,
        onInput: handleFilledInput,
      },
      ...(hasComposedInput ? [children] : [defaultControl, children]),
    ),
  );
});
FieldControl.displayName = 'Field.Control';

// ─── Field.Select — the cascade-driving control root for a Select-in-a-Field ───────
// The SELECT analogue of `Field.Control`: it REPLACES `Field.Control` when the field's editable
// control is a `Select` (a value picker) rather than a text `Input`. Base UI's `Select.Root`
// auto-registers as the field control (`useRegisterFieldControl`) and the trigger pulls the field
// label id (`resolveAriaLabelledBy(fieldLabelId, …)`) → `Field.Label` ↔ trigger association +
// validation come FREE (no hand-wiring — the old `Select.Label` is gone).
//
// Renders NO box itself (like Select.Root — unlike `<Field>`, which IS a frame now). It reads the
// Field cascade (`useFieldAui`),
// resolves the merged cascade (own inherited-axes OVER the root, via `toInherited`/`mergeFieldAui` —
// the SAME projection Field.Control uses), then (1) SEEDS the Select scale rail via
// `<Select aui={{ scale }}>` (Select.Root's `AuiScaleProvider`) so EVERY part scales with the field,
// and (2) RE-PROVIDES the merged Field cascade via `FieldAuiProvider` (React context crosses the
// Select portal → the popup/items read it too). `Field.SelectTrigger`/`Field.SelectPopup` read that
// re-provided cascade and merge color/shape/elevation UNDER their own aui (see `mergeSelectPartAui`
// below — correct for both, neither vocab carries a `states` pin). `Field.SelectItem` (2026-07-11
// UPDATE) does NOT pre-merge — it passes through to `Select.Item`, which reads the SAME re-provided
// cascade itself via a STATE-AWARE merge that protects the PINNED `selected` fill from ambient (see
// `Field.SelectItem`'s own comment below). Their own `aui.sx` stays local; no Field root `sx` is
// seeded into this path.
//
// Preserves Select's `<Value, Multiple>` generics via an explicit call-signature interface (the
// select.tsx `SelectComponent` typing seam) — `Object.assign`/a plain cast would collapse them.
export type FieldSelectProps<Value = unknown, Multiple extends boolean | undefined = false> =
  SelectRootProps<Value, Multiple> & {
    /** Cascade-seed appearance (the INHERITED axes color/scale/shape/elevation drive the select's
     *  parts; paint/profile/sx/states are dropped — Field.Select renders no box). Own axes win over
     *  the ambient Field/Fieldset cascade. */
    aui?: FieldControlAui;
  };

function FieldSelect<Value, Multiple extends boolean | undefined = false>(
  props: FieldSelectProps<Value, Multiple>,
): React.JSX.Element {
  const { aui, children, ...rest } = props;
  const rootInherited = useFieldAui();
  // Merge the Field.Select's OWN inherited axes OVER the ambient cascade (same projection as
  // Field.Control) → the value re-provided to the select's parts + the scale rail seed.
  const own = React.useMemo<FieldResolvedAui>(() => toInherited(aui as FieldControlAui), [aui]);
  const reprovided = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(rootInherited, own),
    [rootInherited, own],
  );
  // Seed ONLY the scale rail on Select.Root (its `aui` carries just `scale`); color/shape/elevation
  // reach the wrappers through the re-provided FieldAuiContext. Root sx is frame-local; part sx stays
  // local unless a wrapper explicitly passes an sx-bearing value. Omit the aui
  // entirely when no scale cascades so the parts keep their own vocab-default tiers.
  const selectAui = reprovided.scale !== undefined ? { scale: reprovided.scale } : undefined;
  return React.createElement(
    FieldAuiProvider,
    { value: reprovided },
    React.createElement(
      Select as (p: SelectRootProps<Value, Multiple> & { aui?: { scale?: FieldResolvedAui['scale'] } }) => React.JSX.Element,
      { ...(rest as SelectRootProps<Value, Multiple>), aui: selectAui },
      children,
    ),
  );
}
FieldSelect.displayName = 'Field.Select';

interface FieldSelectComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: FieldSelectProps<Value, Multiple>,
  ): React.JSX.Element;
  displayName?: string;
}

// Merge the Field cascade's color/shape/elevation UNDER a select part's OWN aui (own wins). Scale is
// NOT injected — it flows through the seeded scale rail (Select.Trigger/Item/Popup read
// `useAuiScale()`). A field-UNSET axis is left off entirely so the underlying Select part keeps its
// OWN vocab default (the trigger's native surface-alt/solid look must NOT be clobbered). `sx` is not
// projected by the root seed; if a wrapper value already contains sx, merge per-key with own keys
// winning, otherwise the part's own `aui.sx` remains local.
function mergeSelectPartAui<A extends { color?: unknown; shape?: unknown; elevation?: unknown; sx?: unknown }>(
  inherited: FieldResolvedAui,
  own: A | undefined,
): A {
  const out: Record<string, unknown> = { ...(own ?? {}) };
  if (own?.color === undefined && inherited.color !== undefined) out.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) out.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) out.elevation = inherited.elevation;
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx };
  }
  return out as A;
}

// ─── Field.SelectTrigger — cascade-reading wrapper over Select.Trigger ─────────────
export type FieldSelectTriggerProps = SelectTriggerProps;
const FieldSelectTrigger = React.forwardRef<HTMLButtonElement, FieldSelectTriggerProps>(
  function FieldSelectTrigger({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const merged = React.useMemo(
      () => mergeSelectPartAui(inherited, aui as SelectTriggerProps['aui']),
      [inherited, aui],
    );
    return React.createElement(Select.Trigger, { ref, ...rest, aui: merged });
  },
);
FieldSelectTrigger.displayName = 'Field.SelectTrigger';

// ─── Field.SelectPopup — cascade-reading wrapper over Select.Popup ─────────────────
export type FieldSelectPopupProps = SelectPopupProps;
const FieldSelectPopup = React.forwardRef<HTMLDivElement, FieldSelectPopupProps>(
  function FieldSelectPopup({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const merged = React.useMemo(
      () => mergeSelectPartAui(inherited, aui as SelectPopupProps['aui']),
      [inherited, aui],
    );
    return React.createElement(Select.Popup, { ref, ...rest, aui: merged });
  },
);
FieldSelectPopup.displayName = 'Field.SelectPopup';

// ─── Field.SelectItem — cascade-reading wrapper over Select.Item ───────────────────
// UPDATED (2026-07-11 USER DECISION — the STATEFUL fix, applied under USER-EDIT-WINS): `Select.Item`
// (select.tsx) now reads `useFieldAui()` itself and performs a STATE-AWARE, GATED merge internally
// (`useSelectItemFieldMergedAui`) — ambient color/shape/elevation reach ONLY the `unselected`
// (resting) state; the `raised`/`solid` `selected` fill is PINNED (2026-07-11 raised-selected
// decision) and is never touched by ambient, only by an explicit consumer override. `Field.SelectItem`
// is rendered INSIDE the SAME `FieldAuiProvider` `Field.Select` establishes, so `Select.Item` reads
// the IDENTICAL ambient context on its own. The PRIOR wrapper-local pre-merge here (the generic,
// UN-gated `mergeSelectPartAui`, shared with Trigger/Popup below) baked the ambient color into the
// TOP-LEVEL `aui` BEFORE `Select.Item` ever saw it — making it indistinguishable from a genuine
// consumer override and letting it reach `states.selected`, defeating the pin. Passing `props`
// straight through COMPOSES `Select.Item`'s already-correct internal merge instead of duplicating
// (and re-breaking) that logic here — `mergeSelectPartAui` remains correct for Trigger/Popup below
// (neither has a `vocab.states` pin to protect: `SELECT_TRIGGER_VOCAB`/`SELECT_POPUP_VOCAB` carry no
// `states` key, so there is nothing for a top-level merge to bypass).
export type FieldSelectItemProps = SelectItemProps;
const FieldSelectItem = React.forwardRef<HTMLElement, FieldSelectItemProps>(
  function FieldSelectItem(props, ref) {
    return React.createElement(Select.Item, { ref, ...props });
  },
);
FieldSelectItem.displayName = 'Field.SelectItem';

// ─── Flat Field.Select* LEAF re-exports — reference-identical to Select.* ──────────
// These parts don't need the cascade (they follow their parent trigger/item + the seeded scale rail),
// and Value/Chevron MUST stay reference-identical so Select.Trigger's `splitTriggerChildren` /
// `c.type === SelectValue` detection still works when composed inside a Field.SelectTrigger. Cosmetic
// tradeoff: their displayName reads `Select.*` (no Select-detection refactor — option (a)).
const FieldSelectValue = Select.Value;
const FieldSelectChevron = Select.Chevron;
const FieldSelectIcon = Select.Icon;
const FieldSelectPortal = Select.Portal;
const FieldSelectBackdrop = Select.Backdrop;
const FieldSelectPositioner = Select.Positioner;
const FieldSelectList = Select.List;
const FieldSelectGroup = Select.Group;
const FieldSelectGroupLabel = Select.GroupLabel;
const FieldSelectSeparator = Select.Separator;
const FieldSelectItemText = Select.ItemText;
const FieldSelectItemIndicator = Select.ItemIndicator;
const FieldSelectArrow = Select.Arrow;
const FieldSelectScrollUpArrow = Select.ScrollUpArrow;
const FieldSelectScrollDownArrow = Select.ScrollDownArrow;

// ─── Flat Field.NumberField* re-exports — the NUMERIC control path (reference-identical) ──────────
// NumberField is the NUMERIC analogue of Field.Control / Field.Select (the Field namespaced API:
// Field.Control = text, Field.Select = select, Field.NumberField = numeric). Unlike Field.Select, these
// need NO cascade wrappers: NumberField SELF-CASCADES (NumberField.Root reads/re-provides the SHARED
// `FieldAuiContext` via `mergeFieldAui(ambient, seed(aui))` — number-field.tsx:456-460 — so it inherits
// a Field/Fieldset color/scale/shape/elevation) AND Base UI's `@base-ui/react/number-field` REGISTERS as
// a field control (`NumberFieldInput` calls `useRegisterFieldControl` + reads the field `labelId` →
// `aria-labelledby` — node_modules/@base-ui/react/number-field/input/NumberFieldInput.mjs:80,112). So
// composing `<Field><Field.Label/><Field.NumberField>…</Field.NumberField></Field>` gets the cascade +
// FREE Field.Label association — a plain reference re-export SUFFICES (the Field.Select LEAF-re-export
// pattern, NOT the Field.Select axis-wrapper pattern). Import direction is field → number-field ONLY
// (NumberField imports `field/field-context` + `field/use-focus-origin`, NEVER field.tsx — no cycle).
// NumberField has NO Label part (labelling belongs to Field), so none is re-exported.
export type FieldNumberFieldProps = NumberFieldRootProps;
export type FieldNumberFieldGroupProps = NumberFieldGroupProps;
export type FieldNumberFieldInputProps = NumberFieldInputProps;
export type FieldNumberFieldUnitProps = NumberFieldUnitProps;
export type FieldNumberFieldIconProps = NumberFieldIconProps;
export type FieldNumberFieldButtonProps = NumberFieldButtonProps;
export type FieldNumberFieldSteppersProps = NumberFieldSteppersProps;

const FieldNumberField = NumberField;
const FieldNumberFieldGroup = NumberField.Group;
const FieldNumberFieldInput = NumberField.Input;
const FieldNumberFieldUnit = NumberField.Unit;
const FieldNumberFieldIcon = NumberField.Icon;
const FieldNumberFieldButton = NumberField.Button;
const FieldNumberFieldSteppers = NumberField.Steppers;

// ─── Field.Datepicker — the DATE-picker control path (cascade + label association) ─────────────────
// The Datepicker analogue of `Field.Select`: a value picker whose control is a trigger BUTTON, not a
// native input. UNLIKE Select.Root (which self-registers as the Base UI field control via
// `useRegisterFieldControl` + pulls the field label id INTERNALLY), our Datepicker is built on
// Popover, which has no field-control concept — so `Field.DatepickerTrigger` does the association
// itself, mirroring what Base UI's Select.Trigger does internally: it reads the field label id from
// the LabelableContext + registers the trigger's id via `useLabelableId`, then stamps
// `aria-labelledby` so `<Field.Label>` ↔ the trigger button associate (label click focuses it, the
// trigger takes the label as its accessible name). Cascade (scale/color/shape/elevation) flows exactly
// as for Field.Select: the root re-provides the Field cascade + seeds the scale rail; the Trigger/Popup
// wrappers merge the cascade UNDER their own aui.
//
// v1 boundary (documented): Base UI's programmatic VALIDATION (required/validate running against the
// selected date, driving Field.Error) is NOT wired — that needs a value-reporting control registration
// Popover doesn't expose. Label association + cascade + the visible error/description slots still work;
// full validation registration is the follow-up.

/** Join two `aria-labelledby` id sources (the field label + any explicit one), dropping empties.
 *  Mirrors Base UI's internal `resolveAriaLabelledBy`. */
function resolveAriaLabelledBy(...ids: (string | undefined)[]): string | undefined {
  const joined = ids.filter((x): x is string => typeof x === 'string' && x.length > 0).join(' ');
  return joined.length > 0 ? joined : undefined;
}

export type FieldDatepickerProps = Omit<DatepickerRootProps, 'aui'> & {
  /** Cascade-seed appearance (the INHERITED axes color/scale/shape/elevation drive the datepicker's
   *  parts). Own axes win over the ambient Field/Fieldset cascade. */
  aui?: FieldControlAui;
};
function FieldDatepicker(props: FieldDatepickerProps): React.JSX.Element {
  const { aui, children, ...rest } = props;
  const rootInherited = useFieldAui();
  const own = React.useMemo<FieldResolvedAui>(() => toInherited(aui as FieldControlAui), [aui]);
  const reprovided = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(rootInherited, own),
    [rootInherited, own],
  );
  // Seed only the scale rail on Datepicker root (its aui carries just `scale`); color/shape/elevation
  // reach the parts through the re-provided FieldAuiContext (the wrappers merge them).
  const seedAui = reprovided.scale !== undefined ? { scale: reprovided.scale } : undefined;
  return React.createElement(
    FieldAuiProvider,
    { value: reprovided },
    React.createElement(Datepicker, { ...(rest as DatepickerRootProps), aui: seedAui }, children),
  );
}
FieldDatepicker.displayName = 'Field.Datepicker';

// ─── Field.DatepickerTrigger — cascade-reading wrapper + the label association ─────────────────────
export type FieldDatepickerTriggerProps = DatepickerTriggerProps;
const FieldDatepickerTrigger = React.forwardRef<HTMLButtonElement, FieldDatepickerTriggerProps>(
  function FieldDatepickerTrigger({ aui, id: idProp, 'aria-labelledby': ariaLabelledByProp, ...rest }, ref) {
    const inherited = useFieldAui();
    const merged = React.useMemo(
      () => mergeSelectPartAui(inherited, aui as DatepickerTriggerProps['aui']),
      [inherited, aui],
    );
    // Base UI field↔label wiring (the exact Select.Trigger mechanism): register the trigger id as the
    // labelable control (so a `<Field.Label htmlFor>` focuses it) + read the field label id for aria.
    const { labelId } = useLabelableContext();
    const id = useLabelableId({ id: idProp as string | undefined });
    const ariaLabelledBy = resolveAriaLabelledBy(ariaLabelledByProp as string | undefined, labelId);
    return React.createElement(Datepicker.Trigger, {
      ref,
      id,
      'aria-labelledby': ariaLabelledBy,
      ...rest,
      aui: merged,
    });
  },
);
FieldDatepickerTrigger.displayName = 'Field.DatepickerTrigger';

// ─── Field.DatepickerInput — cascade-reading wrapper + label association (the TYPEABLE control) ─────
// The INPUT-mode analogue of Field.DatepickerTrigger: the field control is a TYPEABLE date row
// (Datepicker.Input) rather than a trigger button. The Base UI field↔label wiring is IDENTICAL to
// Field.DatepickerTrigger (useLabelableContext + useLabelableId + resolveAriaLabelledBy), except the
// id/`aria-labelledby` target the INNER native <input> — Datepicker.Input forwards them there (via its
// `...rest` spread onto the composed Input), so a `<Field.Label htmlFor>` focuses the input and the
// input takes the label as its accessible name. Cascade (scale/color/shape/elevation) flows exactly as
// for Field.DatepickerTrigger: the field cascade merges UNDER the frame's own aui; scale via the rail.
export type FieldDatepickerInputProps = DatepickerInputProps;
const FieldDatepickerInput = React.forwardRef<HTMLInputElement, FieldDatepickerInputProps>(
  function FieldDatepickerInput({ aui, id: idProp, 'aria-labelledby': ariaLabelledByProp, ...rest }, ref) {
    const inherited = useFieldAui();
    const merged = React.useMemo(
      () => mergeSelectPartAui(inherited, aui as DatepickerInputProps['aui']),
      [inherited, aui],
    );
    const { labelId } = useLabelableContext();
    const id = useLabelableId({ id: idProp as string | undefined });
    const ariaLabelledBy = resolveAriaLabelledBy(ariaLabelledByProp as string | undefined, labelId);
    return React.createElement(Datepicker.Input, {
      ref,
      id,
      'aria-labelledby': ariaLabelledBy,
      ...rest,
      aui: merged,
    });
  },
);
FieldDatepickerInput.displayName = 'Field.DatepickerInput';

// ─── Field.DatepickerPopup — cascade-reading wrapper over Datepicker.Popup ─────────────────────────
export type FieldDatepickerPopupProps = DatepickerPopupProps;
const FieldDatepickerPopup = React.forwardRef<HTMLDivElement, FieldDatepickerPopupProps>(
  function FieldDatepickerPopup({ aui, ...rest }, ref) {
    const inherited = useFieldAui();
    const merged = React.useMemo(
      () => mergeSelectPartAui(inherited, aui as DatepickerPopupProps['aui']),
      [inherited, aui],
    );
    return React.createElement(Datepicker.Popup, { ref, ...rest, aui: merged });
  },
);
FieldDatepickerPopup.displayName = 'Field.DatepickerPopup';

// ─── Flat Field.Datepicker* LEAF re-exports (reference-identical — no cascade wiring needed) ────────
// Value/Icon/Portal/Backdrop/Positioner/Calendar/Header/Grid/Week/Day follow the trigger + the seeded
// scale rail; they need no per-part cascade merge (they carry their own vocab defaults + read the
// Datepicker + scale contexts that cross the Popover portal).
const FieldDatepickerInputButton = Datepicker.InputButton;
const FieldDatepickerValue = Datepicker.Value;
const FieldDatepickerIcon = Datepicker.Icon;
const FieldDatepickerPortal = Datepicker.Portal;
const FieldDatepickerBackdrop = Datepicker.Backdrop;
const FieldDatepickerPositioner = Datepicker.Positioner;
const FieldDatepickerCalendar = Datepicker.Calendar;
const FieldDatepickerHeader = Datepicker.Header;
const FieldDatepickerGrid = Datepicker.Grid;
const FieldDatepickerWeek = Datepicker.Week;
const FieldDatepickerDay = Datepicker.Day;

interface FieldDatepickerComponent {
  (props: FieldDatepickerProps): React.JSX.Element;
  displayName?: string;
}

// ─── Field.Combobox — the cascade-driving control root for a Combobox-in-a-Field ───────
// Base UI's `Combobox.Root`, like `Select.Root`, renders NO box itself. The installed 1.6.0
// `AriaCombobox` self-registers the Field control, so Field.Combobox is NOT patching a registration
// gap. The wrapper remains for the Field-owned no-DOM control-root seam: it merges the ambient Field
// axes with its own seed and forwards the resolved scale into Combobox.Root's scale rail, AND
// re-provides the merged `FieldAuiContext` (`reprovided` below) so descendant parts can read it.
// UPDATED (2026-07-11 USER DECISION — popup-family parity audit finding #2, fleet-wide Field-axis
// forwarding): Combobox's OWN parts (`combobox.tsx` — InputGroup/Input/Trigger/Popup/Status/Empty/
// Clear/Item/ItemIndicator/Chip/GroupLabel) now read `useFieldAui()` directly and merge
// color/shape/elevation/sx under their own `aui` (own axis always wins), mirroring
// `useMergedAutocompletePartAui` (`autocomplete.tsx:84-105`) — the SAME re-provided context this root
// seeds. Scale-only forwarding was the defect, not the law; this comment previously (incorrectly)
// documented scale-only as permanent. Select/Dropdown parts (`select.tsx`/`dropdown.tsx`) adopted the
// identical mechanism in the same slice — see each file's own `useMergedXxxPartAui` block.
export type FieldComboboxProps<Value = unknown, Multiple extends boolean | undefined = false> =
  ComboboxRootProps<Value, Multiple> & {
    /** Cascade-seed appearance for the no-DOM control root. The resolved scale drives Combobox's
     *  scale rail; paint/profile/sx/states are dropped because Field.Combobox renders no box. Own
     *  axes win over the ambient Field/Fieldset cascade. */
    aui?: FieldControlAui;
  };

function FieldCombobox<Value, Multiple extends boolean | undefined = false>(
  props: FieldComboboxProps<Value, Multiple>,
): React.JSX.Element {
  const { aui, children, ...rest } = props;
  const rootInherited = useFieldAui();
  const own = React.useMemo<FieldResolvedAui>(() => toInherited(aui as FieldControlAui), [aui]);
  const reprovided = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(rootInherited, own),
    [rootInherited, own],
  );
  // Seed ONLY the scale rail on Combobox.Root (its `aui` carries just `scale`). The re-provided
  // FieldAuiContext carries color/shape/elevation for Field-owned descendants, but current direct
  // Combobox parts do not merge it; root/control sx remains frame-local.
  const comboboxAui = reprovided.scale !== undefined ? { scale: reprovided.scale } : undefined;
  return React.createElement(
    FieldAuiProvider,
    { value: reprovided },
    React.createElement(
      Combobox as (p: ComboboxRootProps<Value, Multiple> & { aui?: { scale?: FieldResolvedAui['scale'] } }) => React.JSX.Element,
      { ...(rest as ComboboxRootProps<Value, Multiple>), aui: comboboxAui },
      children,
    ),
  );
}
FieldCombobox.displayName = 'Field.Combobox';

interface FieldComboboxComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: FieldComboboxProps<Value, Multiple>,
  ): React.JSX.Element;
  displayName?: string;
}

// ─── Field.Autocomplete — the cascade-driving control root for an Autocomplete-in-a-Field ───────
// Standalone root only: it replaces Field.Control exactly like Field.Select/Field.Combobox, but it does
// not render a box and does not expose Field.Autocomplete* part aliases. The installed Autocomplete root
// delegates to AriaCombobox, which registers the field control, and Autocomplete.Input consumes Base UI's
// field label context; this wrapper therefore only seeds the Autocomplete scale rail and re-provides the
// FieldAuiContext so direct Autocomplete parts, including portaled Popup/Item, read the field cascade.
type FieldAutocompleteGroupedItems = readonly { items: readonly unknown[] }[];
// `inlineLayout`/`inlineCard` are NOT cascade axes (color/scale/shape/elevation) — they are direct
// per-part overrides for the Root-synthesized `Autocomplete.InlineLayout` column and
// `Autocomplete.InlineCard` results card (the `inline` mode surfaces), so they bypass
// `toInherited`/`mergeFieldAui` entirely and pass through verbatim below. Without this,
// `FieldControlAui` (neither key) would silently strip a consumer's override the moment
// Autocomplete was composed through `Field.Autocomplete` instead of the bare `Autocomplete` — the
// exact mask class this file kept re-introducing each time Root grew a new per-part `aui` field;
// both keys are threaded through the SAME mechanism so a third one only needs the same 3 edits.
type FieldAutocompleteAui = FieldControlAui & {
  inlineLayout?: AutocompleteInlineLayoutAui;
  inlineCard?: AutocompleteInlineCardAui;
};
export type FieldAutocompleteProps<ItemValue = unknown> =
  AutocompleteRootProps<ItemValue> & {
    /** Cascade-seed appearance (the inherited axes color/scale/shape/elevation drive Autocomplete's
     *  parts; paint/profile/sx/states are dropped because Field.Autocomplete renders no box). Own axes
     *  win over the ambient Field/Fieldset cascade. `inlineLayout`/`inlineCard` are direct
     *  passthroughs to the `inline`-mode `Autocomplete.InlineLayout` column and
     *  `Autocomplete.InlineCard` results card — not part of the cascade. */
    aui?: FieldAutocompleteAui;
  };
type FieldAutocompleteGroupedProps<Items extends FieldAutocompleteGroupedItems> =
  Omit<AutocompleteRootProps<Items[number]['items'][number]>, 'items'> & {
    items: Items;
    aui?: FieldAutocompleteAui;
  };
type FieldAutocompleteImplementationProps =
  | (AutocompleteRootProps<unknown> & { aui?: FieldAutocompleteAui })
  | (Omit<AutocompleteRootProps<unknown>, 'items'> & {
      items: FieldAutocompleteGroupedItems;
      aui?: FieldAutocompleteAui;
    });
type FieldAutocompleteRuntimeProps = FieldAutocompleteImplementationProps & {
  aui?: {
    scale?: FieldResolvedAui['scale'];
    inlineLayout?: AutocompleteInlineLayoutAui;
    inlineCard?: AutocompleteInlineCardAui;
  };
};

function FieldAutocomplete<Items extends FieldAutocompleteGroupedItems>(
  props: FieldAutocompleteGroupedProps<Items>,
): React.JSX.Element;
function FieldAutocomplete<ItemValue = unknown>(
  props: FieldAutocompleteProps<ItemValue>,
): React.JSX.Element;
function FieldAutocomplete(
  props: FieldAutocompleteImplementationProps,
): React.JSX.Element {
  const { aui, children, ...rest } = props;
  const rootInherited = useFieldAui();
  const own = React.useMemo<FieldResolvedAui>(() => toInherited(aui as FieldControlAui), [aui]);
  const reprovided = React.useMemo<FieldResolvedAui>(
    () => mergeFieldAui(rootInherited, own),
    [rootInherited, own],
  );
  const inlineLayoutAui = (aui as FieldAutocompleteAui | undefined)?.inlineLayout;
  const inlineCardAui = (aui as FieldAutocompleteAui | undefined)?.inlineCard;
  const autocompleteAui = React.useMemo(() => {
    if (reprovided.scale === undefined && inlineLayoutAui === undefined && inlineCardAui === undefined) {
      return undefined;
    }
    return {
      ...(reprovided.scale !== undefined ? { scale: reprovided.scale } : {}),
      ...(inlineLayoutAui !== undefined ? { inlineLayout: inlineLayoutAui } : {}),
      ...(inlineCardAui !== undefined ? { inlineCard: inlineCardAui } : {}),
    };
  }, [reprovided.scale, inlineLayoutAui, inlineCardAui]);
  return React.createElement(
    FieldAuiProvider,
    { value: reprovided },
    React.createElement(
      Autocomplete as (p: FieldAutocompleteRuntimeProps) => React.JSX.Element,
      { ...(rest as Omit<FieldAutocompleteRuntimeProps, 'aui'>), aui: autocompleteAui },
      children,
    ),
  );
}
FieldAutocomplete.displayName = 'Field.Autocomplete';

interface FieldAutocompleteComponent {
  <Items extends FieldAutocompleteGroupedItems>(
    props: FieldAutocompleteGroupedProps<Items>,
  ): React.JSX.Element;
  <ItemValue = unknown>(props: FieldAutocompleteProps<ItemValue>): React.JSX.Element;
  displayName?: string;
}

// ─── Field.Validity — Base UI render-prop seam, re-exported as-is (NO aui) ─────────
const FieldValidity = FieldPrimitive.Validity;

// ─── Assemble (Object.assign dot-namespace, the Select precedent) ─────────────────
// `<Field>` IS the root — there is NO `Field.Root` (hard-removed 2026-06-17): the root function is
// the only root form. All OTHER parts stay dot-namespaced.
interface FieldComponent
  extends React.ForwardRefExoticComponent<
    FieldRootProps & React.RefAttributes<HTMLDivElement>
  > {
  Label: typeof FieldLabel;
  Control: typeof FieldControl;
  Input: typeof FieldInput;
  Textarea: typeof FieldTextarea;
  Description: typeof FieldDescription;
  Error: typeof FieldError;
  Icon: typeof FieldIcon;
  Button: typeof FieldButton;
  ButtonIcon: typeof FieldButtonIcon;
  Validity: typeof FieldValidity;
  // ── The Select control path (flat Field.Select* parts) ──
  Select: FieldSelectComponent;
  SelectTrigger: typeof FieldSelectTrigger;
  SelectPopup: typeof FieldSelectPopup;
  SelectItem: typeof FieldSelectItem;
  SelectValue: typeof FieldSelectValue;
  SelectChevron: typeof FieldSelectChevron;
  SelectIcon: typeof FieldSelectIcon;
  SelectPortal: typeof FieldSelectPortal;
  SelectBackdrop: typeof FieldSelectBackdrop;
  SelectPositioner: typeof FieldSelectPositioner;
  SelectList: typeof FieldSelectList;
  SelectGroup: typeof FieldSelectGroup;
  SelectGroupLabel: typeof FieldSelectGroupLabel;
  SelectSeparator: typeof FieldSelectSeparator;
  SelectItemText: typeof FieldSelectItemText;
  SelectItemIndicator: typeof FieldSelectItemIndicator;
  SelectArrow: typeof FieldSelectArrow;
  SelectScrollUpArrow: typeof FieldSelectScrollUpArrow;
  SelectScrollDownArrow: typeof FieldSelectScrollDownArrow;
  // ── The NumberField control path (flat Field.NumberField* parts — reference-identical) ──
  NumberField: typeof FieldNumberField;
  NumberFieldGroup: typeof FieldNumberFieldGroup;
  NumberFieldInput: typeof FieldNumberFieldInput;
  NumberFieldUnit: typeof FieldNumberFieldUnit;
  NumberFieldIcon: typeof FieldNumberFieldIcon;
  NumberFieldButton: typeof FieldNumberFieldButton;
  NumberFieldSteppers: typeof FieldNumberFieldSteppers;
  // ── The Datepicker control path (flat Field.Datepicker* parts) ──
  Datepicker: FieldDatepickerComponent;
  DatepickerTrigger: typeof FieldDatepickerTrigger;
  DatepickerInput: typeof FieldDatepickerInput;
  DatepickerInputButton: typeof FieldDatepickerInputButton;
  DatepickerPopup: typeof FieldDatepickerPopup;
  DatepickerValue: typeof FieldDatepickerValue;
  DatepickerIcon: typeof FieldDatepickerIcon;
  DatepickerPortal: typeof FieldDatepickerPortal;
  DatepickerBackdrop: typeof FieldDatepickerBackdrop;
  DatepickerPositioner: typeof FieldDatepickerPositioner;
  DatepickerCalendar: typeof FieldDatepickerCalendar;
  DatepickerHeader: typeof FieldDatepickerHeader;
  DatepickerGrid: typeof FieldDatepickerGrid;
  DatepickerWeek: typeof FieldDatepickerWeek;
  DatepickerDay: typeof FieldDatepickerDay;
  // ── The Combobox control path (the axis-seeding root; parts composed directly from `lib/combobox`) ──
  Combobox: FieldComboboxComponent;
  // ── The Autocomplete control path (the axis-seeding root; parts composed directly from `lib/autocomplete`) ──
  Autocomplete: FieldAutocompleteComponent;
}

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
  Input: FieldInput,
  Textarea: FieldTextarea,
  Description: FieldDescription,
  Error: FieldError,
  Icon: FieldIcon,
  Button: FieldButton,
  ButtonIcon: FieldButtonIcon,
  Validity: FieldValidity,
  Select: FieldSelect as FieldSelectComponent,
  SelectTrigger: FieldSelectTrigger,
  SelectPopup: FieldSelectPopup,
  SelectItem: FieldSelectItem,
  SelectValue: FieldSelectValue,
  SelectChevron: FieldSelectChevron,
  SelectIcon: FieldSelectIcon,
  SelectPortal: FieldSelectPortal,
  SelectBackdrop: FieldSelectBackdrop,
  SelectPositioner: FieldSelectPositioner,
  SelectList: FieldSelectList,
  SelectGroup: FieldSelectGroup,
  SelectGroupLabel: FieldSelectGroupLabel,
  SelectSeparator: FieldSelectSeparator,
  SelectItemText: FieldSelectItemText,
  SelectItemIndicator: FieldSelectItemIndicator,
  SelectArrow: FieldSelectArrow,
  SelectScrollUpArrow: FieldSelectScrollUpArrow,
  SelectScrollDownArrow: FieldSelectScrollDownArrow,
  NumberField: FieldNumberField,
  NumberFieldGroup: FieldNumberFieldGroup,
  NumberFieldInput: FieldNumberFieldInput,
  NumberFieldUnit: FieldNumberFieldUnit,
  NumberFieldIcon: FieldNumberFieldIcon,
  NumberFieldButton: FieldNumberFieldButton,
  NumberFieldSteppers: FieldNumberFieldSteppers,
  Datepicker: FieldDatepicker as FieldDatepickerComponent,
  DatepickerTrigger: FieldDatepickerTrigger,
  DatepickerInput: FieldDatepickerInput,
  DatepickerInputButton: FieldDatepickerInputButton,
  DatepickerPopup: FieldDatepickerPopup,
  DatepickerValue: FieldDatepickerValue,
  DatepickerIcon: FieldDatepickerIcon,
  DatepickerPortal: FieldDatepickerPortal,
  DatepickerBackdrop: FieldDatepickerBackdrop,
  DatepickerPositioner: FieldDatepickerPositioner,
  DatepickerCalendar: FieldDatepickerCalendar,
  DatepickerHeader: FieldDatepickerHeader,
  DatepickerGrid: FieldDatepickerGrid,
  DatepickerWeek: FieldDatepickerWeek,
  DatepickerDay: FieldDatepickerDay,
  Combobox: FieldCombobox as FieldComboboxComponent,
  Autocomplete: FieldAutocomplete as FieldAutocompleteComponent,
}) as FieldComponent;

export default Field;
