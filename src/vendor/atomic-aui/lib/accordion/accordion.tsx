// modules/design/atomic-aui/src/lib/accordion/accordion.tsx
//
// Accordion is an INLINE disclosure set: Root → Item → Header → Trigger → Panel. Base UI owns
// the value model, roving keyboard focus, ARIA, and panel mount/transition state. AtomicAUI owns
// only appearance, composition, and the public dot-namespace.
//
// IMPORTANT CONTRAST WITH Select/Dropdown/Toast: Accordion never portals. There is no Popup,
// Positioner, Viewport, or identity re-stamp here; the whole tree stays in normal document flow
// and inherits the app's existing AtomicAUI cascade naturally.
import * as React from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import type { AccordionRootProps as BaseAccordionRootProps } from '@base-ui/react/accordion';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import { ContainedIcon, type ContainedIconProps, type ContainedIconAui } from '../icon';
import {
  createChevronPart,
  splitTriggerChildren,
  composeChevron,
} from '../../families/chevron';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import type { PropHook } from '../../core/types';
import type { AuiElevation } from '../../core/vocabulary/recipe-vocab';
import {
  ACCORDION_TRIGGER_VOCAB,
  useAccordionItemRecipe,
  useAccordionPanelRecipe,
  useAccordionTriggerRecipe,
} from './use-recipe';
import type {
  AccordionColor,
  AccordionItemAui,
  AccordionPanelAui,
  AccordionScale,
  AccordionShape,
  AccordionTriggerAui,
} from './use-recipe';

export type {
  AccordionItemAui,
  AccordionTriggerAui,
  AccordionPanelAui,
  AccordionColor,
  AccordionPaint,
  AccordionScale,
  AccordionShape,
} from './use-recipe';

// ─── Accordion appearance cascade — scale + color + shape + elevation ────────────────────────
// Broader than the shared scale-ONLY `AuiScaleProvider` (2026-06-15, user request): a parent (Root OR
// Item) seeds these FOUR inheritable axes and every descendant part (Item / Trigger / Panel / Chevron)
// falls back to them — a part's OWN axis always wins. `paint`/`profile`/`sx` are intentionally NOT
// cascaded (a Trigger is interactive, an Item is a flat card, the Panel is a region — those stay
// per-part). The Item RE-SEEDS with its own RESOLVED values, so Item-level appearance flows down to its
// Trigger/Panel/Chevron. Mirrors the Field cascade model, scoped to the Accordion.
export interface AccordionCascade {
  scale?: AccordionScale;
  color?: AccordionColor;
  shape?: AccordionShape;
  elevation?: AuiElevation;
}
const EMPTY_ACCORDION_CASCADE: AccordionCascade = {};
const AccordionAuiContext = React.createContext<AccordionCascade>(EMPTY_ACCORDION_CASCADE);
const AccordionAuiProvider = AccordionAuiContext.Provider;
function useAccordionCascade(): AccordionCascade {
  return React.useContext(AccordionAuiContext);
}

/** The 4 cascaded axes of `inherited`, as a seed object (only DEFINED axes). */
function cascadeSeed(inherited: AccordionCascade): Record<string, unknown> {
  const seed: Record<string, unknown> = {};
  if (inherited.scale !== undefined) seed.scale = inherited.scale;
  if (inherited.color !== undefined) seed.color = inherited.color;
  if (inherited.shape !== undefined) seed.shape = inherited.shape;
  if (inherited.elevation !== undefined) seed.elevation = inherited.elevation;
  return seed;
}

/** Drop UNDEFINED-valued keys so an explicit `undefined` axis (e.g. `aui={{ shape: undefined }}` from a
 *  spread) can't CLOBBER an inherited/default value when spread last. */
function compactDefined(obj: Record<string, unknown> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj ?? {})) if (v !== undefined) out[k] = v;
  return out;
}

/** Merge the inherited cascade UNDER a part's own `aui` (own DEFINED axis wins; every non-cascaded own
 *  axis — paint/profile/sx — passes through untouched; an own `undefined` does NOT erase the cascade). */
function mergeCascadeAui(
  own: Record<string, unknown> | undefined,
  inherited: AccordionCascade,
): Record<string, unknown> {
  return { ...cascadeSeed(inherited), ...compactDefined(own) };
}

/** Resolve a parent's effective cascade (own ?? inherited) for RE-SEEDING (the Item). */
function resolveCascade(own: AccordionCascade, inherited: AccordionCascade): AccordionCascade {
  return {
    scale: own.scale ?? inherited.scale,
    color: own.color ?? inherited.color,
    shape: own.shape ?? inherited.shape,
    elevation: own.elevation ?? inherited.elevation,
  };
}

/** PropHook: inject the inherited cascade into a part's `aui` before its recipe runs (own wins).
 *  Replaces the scale-only `useScaleCascade` on Accordion parts. */
const useAccordionCascadeProps: PropHook<{ aui?: Record<string, unknown> }, { aui?: Record<string, unknown> }> = (
  props,
) => ({ aui: mergeCascadeAui(props.aui, useAccordionCascade()) });

// Base UI 1.5.0 names the multi-open behavior prop `multiple`; the AtomicAUI component API uses
// `openMultiple` to read like the other behavior props. Keep `multiple` as a compatibility alias
// because consumers may know the Base UI surface. If both are supplied, `openMultiple` wins so the
// result is deterministic and the dev warning points at the duplicate source of truth.
export interface AccordionRootProps<Value = unknown>
  extends Omit<BaseAccordionRootProps<Value>, 'multiple' | 'color'> {
  /** AtomicAUI behavior prop for allowing more than one item to stay open. */
  openMultiple?: boolean;
  /** Alias for Base UI's `multiple`. `openMultiple` wins when both are provided. */
  multiple?: boolean;
  /** Seeds the shared appearance for every part (Item / Trigger / Panel / Chevron) — a part's own
   *  axis always wins. The cascaded axes are `scale` + `color` + `shape` + `elevation` (2026-06-15);
   *  `paint`/`profile` stay per-part (a Trigger is interactive, an Item is a flat card). The Item
   *  re-seeds with its own resolved values, so Item-level appearance flows to its Trigger/Panel/Chevron. */
  aui?: AccordionCascade;
}

// ─── Accordion.Root — generic behavior wrapper, marker only ─────────────────
// Root is the exported `Accordion` call signature, not a `.Root` static. It takes value/defaultValue/
// onValueChange/openMultiple/disabled/orientation and NO `aui`: the Root is the behavior group and
// layout rail; the styleable frame surfaces are Item, Trigger, and Panel.
//
// Why a plain generic function (not `forwardRef` or createAtomicComponent): Base UI's Root is a
// generic component (`AccordionRootProps<Value>`), and `forwardRef` would erase the `Value` generic
// from controlled `value`/`onValueChange`. The props object still carries `ref` through to Base UI.
function AccordionRoot<Value = unknown>(props: AccordionRootProps<Value>): React.JSX.Element {
  const {
    openMultiple,
    multiple,
    className,
    orientation,
    disabled,
    aui,
    children,
    ...rest
  } = props;

  if (
    process.env.NODE_ENV !== 'production' &&
    openMultiple !== undefined &&
    multiple !== undefined
  ) {
    console.warn(
      '[atomic-aui] <Accordion> got both `openMultiple` and `multiple`; `openMultiple` wins.'
    );
  }

  const resolvedOrientation = orientation ?? 'vertical';
  const resolvedMultiple = openMultiple ?? multiple;

  return React.createElement(
    AccordionPrimitive.Root,
    {
      ...rest,
      disabled,
      orientation: resolvedOrientation,
      multiple: resolvedMultiple,
      ...(disabled ? { 'data-disabled': '' } : {}),
      'data-orientation': resolvedOrientation,
      className: prependMarkerClassName('aui-accordion', className),
    } as object,
    // Seed the appearance cascade (scale + color + shape + elevation) for every part; own axis wins.
    React.createElement(AccordionAuiProvider, { value: aui ?? EMPTY_ACCORDION_CASCADE }, children),
  );
}
AccordionRoot.displayName = 'Accordion';

// ─── Accordion.Item — tier-3 passive card frame ─────────────────────────────
// Item is a real Base UI part and a real `.aui-frame`, but it is not itself interactive. Do NOT add
// useStateLayer here: hover/press/focus feedback belongs on the Trigger button. The local recipe is
// state-aware only for disabled chroma because root-level disabled arrives through Base UI render
// state, not as an own prop on every Item.
const _AccordionItem = createAtomicComponent(AccordionPrimitive.Item, {
  extensions: [useAccordionCascadeProps, useAccordionItemRecipe],
});

export interface AccordionItemProps
  extends Omit<React.ComponentProps<typeof AccordionPrimitive.Item>, 'color'> {
  /** Unified customisation object for the card surface. `disabled` stays a Base UI prop. */
  aui?: AccordionItemAui;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { aui, children, ...rest },
  ref,
) {
  // RE-SEED the appearance cascade for the Item's subtree (mirrors Accordion.Root). The
  // `useAccordionCascadeProps` extension on `_AccordionItem` resolves the Item FRAME's own appearance
  // (own ?? Root); it does NOT re-provide. Without this re-seed, an `Accordion.Item aui={{ shape }}`
  // would style the card but its Trigger/Panel/Chevron would keep reading the ROOT cascade. Seed the
  // Item's RESOLVED cascade (own ?? inherited Root) so the whole item renders coherently; an own axis
  // on a child still wins.
  const resolved = resolveCascade((aui ?? {}) as AccordionCascade, useAccordionCascade());
  return React.createElement(
    _AccordionItem as React.ElementType,
    { ref, aui, ...rest },
    React.createElement(AccordionAuiProvider, { value: resolved }, children),
  );
});
AccordionItem.displayName = 'Accordion.Item';

// ─── Accordion.Header — tier-1 heading marker ───────────────────────────────
// Header is Base UI's semantic heading wrapper (`<h3>` by default). It is box-less and styleless:
// CSS only resets native heading margins so the Item/Trigger geometry stays token-driven.
const AccordionHeader = createAtomicPart<React.ComponentProps<typeof AccordionPrimitive.Header>>(
  AccordionPrimitive.Header,
  'aui-accordion-header',
);
AccordionHeader.displayName = 'Accordion.Header';
export type AccordionHeaderProps = React.ComponentProps<typeof AccordionHeader>;

// ─── Accordion.Chevron — the composable disclosure chevron (marker-only span) ─────────────────
// A composition-driven disclosure chevron via the shared `createChevronPart` family (identical to
// Dropdown.Chevron / Select.Chevron — the inlined copy that used to live here was lifted into
// `families/chevron`). It renders ONLY when composed in the Trigger children — there is NO auto-render.
// A composed-but-childless chevron IS the default `chevron-down` glyph (composed only to tweak its
// `aui`) and rotates 180° on open; a composed chevron WITH custom content is a replacement node, left
// static unless the consumer sets `data-aui-rotate`. The span is the structural/rotation affordance the
// Trigger keys `data-aui-rotate` off via its `data-panel-open`. Its `aui` is FORWARDED to the inner
// ContainedIcon (every glyph axis is live — color/paint/scale/profile/shape/elevation/contained-icon sx).
//
// The marker class `aui-accordion-chevron` is PRESERVED (it predates the family) so the existing
// `_state-cascade.scss` rotate selector still matches. The shared `defaultChevron` carries NO `shape`
// default, so the Accordion's historical `shape: 'soft'` (a painted/bordered chevron matches the rounded
// card) is injected via `composeChevron(..., { inheritAui: { shape: 'soft' } })` in the Trigger below —
// it merges UNDER the chevron's own `aui` (own axis still wins).
const AccordionChevron = createChevronPart('aui-accordion-chevron');
AccordionChevron.displayName = 'Accordion.Chevron';
export type AccordionChevronProps = React.ComponentProps<typeof AccordionChevron>;

// ─── Accordion.Icon — the leading header adornment (a ContainedIcon, contained profile) ────
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so the header icon sits
// SNUG in the Trigger row (the in-row icon convention, matching Field.Icon). Otherwise it IS a
// ContainedIcon — same identity props (`name`/`family`/`layer`/`weight`) + the full box `aui`
// surface; a consumer can override the profile (or any axis) via `aui`. Exposing it as a named part
// keeps the consumer from re-typing `<ContainedIcon … aui={{ profile: 'contained' }} />` per header.
export type AccordionIconProps = ContainedIconProps
const AccordionIcon = React.forwardRef<HTMLSpanElement, AccordionIconProps>(
  function AccordionIcon({ aui, ...rest }, ref) {
    // The icon sizes to the Trigger's EFFECTIVE tier: own `aui.scale` ?? the accordion scale cascade
    // ?? the Trigger vocab default. WITHOUT this, a `profile: 'contained'` icon with no scale would
    // emit `aui-scale-contained-MD` (the profile forces a scale cell whose tier defaults to md) and
    // render one tier too big — taller than the sm trigger row (the 2026-06-14 icon-too-big bug).
    const inherited = useAccordionCascade();
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inherited.scale,
      ACCORDION_TRIGGER_VOCAB.defaults.scale as AccordionScale,
    );
    // `profile: 'contained'` + the cascaded color/shape/elevation are DEFAULTS (own `aui` overrides),
    // and the resolved tier sizes it to the row.
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...cascadeSeed(inherited), ...aui, scale: resolvedScale }),
      [aui, inherited, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
AccordionIcon.displayName = 'Accordion.Icon';

// ─── Accordion.Trigger — tier-3 interactive disclosure row ─────────────────
// useStateLayer runs FIRST (hover/press/focus affordance), and useAccordionTriggerRecipe runs LAST
// (recipe + `aui.sx`). Disabled comes from Base UI render state through the shared trigger-state
// family, so root-disabled accordions flip the trigger chroma even though `props.disabled` does not
// reach every trigger as an own prop.
const _AccordionTrigger = createAtomicComponent(AccordionPrimitive.Trigger, {
  extensions: [useAccordionCascadeProps, useStateLayer, useAccordionTriggerRecipe],
});

export interface AccordionTriggerProps
  extends Omit<React.ComponentProps<typeof AccordionPrimitive.Trigger>, 'color'> {
  /** Unified customisation object for the interactive row: context axes (color/paint/scale/shape) +
   *  per-state appearance (`states.unselected` = closed / `states.selected` = open) + full-frame `sx`.
   *  With no `states` authored the resolved appearance is identical to before (the
   *  `createTriggerToggleRecipe` zero-diff superset). `disabled` stays native/Base UI. */
  aui?: AccordionTriggerAui;
}

// The Trigger wrapper: COMPOSITION-DRIVEN (mirrors Dropdown.Trigger / Select.Trigger — the `chevron`/
// `rotateOnOpen` props were REMOVED). It renders the label body + (only if the consumer composed a
// `<Accordion.Chevron>`) the disclosure chevron. There is NO auto-render. `splitTriggerChildren`
// separates a composed `<Accordion.Chevron>` from the label body by part identity (recursing through
// fragments); `composeChevron` then injects the scale-matched default glyph + stamps `data-aui-rotate`
// (childless → default glyph + auto-rotate; custom-content → as authored). The historical `shape: 'soft'`
// chevron-box default is injected via `inheritAui` so a painted/bordered chevron still matches the
// rounded card (the chevron's own `aui` and the cascaded shape/elevation still win per-axis). The body
// stays wrapped in `aui-accordion-trigger-content` so the existing layout CSS is unchanged.
const AccordionTrigger = React.forwardRef<HTMLElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, ...rest }, ref) {
    warnIfNoAccessibleName(children, rest as Record<string, unknown>, 'Accordion.Trigger');
    const inherited = useAccordionCascade();

    // The Trigger's RESOLVED cascade (own ?? inherited) is what its chevron inherits. Chevron sizes to
    // the Trigger's EFFECTIVE scale: own ?? cascade ?? vocab default (READ the vocab default — not a
    // literal — so the chevron can't drift from the trigger box tier; the 2026-06-14 md→sm bug).
    const triggerCascade = resolveCascade((rest as { aui?: AccordionTriggerAui }).aui as AccordionCascade ?? {}, inherited);
    const triggerScale: AccordionScale =
      (triggerCascade.scale as AccordionScale | undefined) ?? (ACCORDION_TRIGGER_VOCAB.defaults.scale as AccordionScale);
    // The chevron GLYPH inherits the trigger's resolved SHAPE + ELEVATION (color flows via the box
    // `currentColor`, so it is NOT forced here) PLUS the historical `soft` box-shape default; the
    // chevron's own `aui` still wins per-axis. Only DEFINED axes are carried — an undefined cascade
    // value would clobber the `soft` default. `shape: 'soft'` is the base; a cascaded `shape` overrides.
    const chevronInherit: ContainedIconAui = {
      shape: (triggerCascade.shape as ContainedIconAui['shape']) ?? 'soft',
      ...(triggerCascade.elevation !== undefined ? { elevation: triggerCascade.elevation } : {}),
    };

    // Split the composed chevron from the label body (by part identity, recursing fragments). The
    // chevron's GLYPH inherits the trigger's resolved scale + the chevronInherit defaults; its own
    // `aui` still wins per-axis. If no chevron is composed, NO chevron renders.
    const { body, chevrons } = splitTriggerChildren(children, AccordionChevron);
    const composedChevron = composeChevron(chevrons[0], {
      scale: triggerScale,
      inheritAui: chevronInherit,
      rotateOnOpen: true,
    });
    const content = (
      <>
        <span className="aui-accordion-trigger-content">{body}</span>
        {composedChevron}
      </>
    );

    return React.createElement(_AccordionTrigger as React.ElementType, { ref, ...rest }, content);
  },
);
AccordionTrigger.displayName = 'Accordion.Trigger';

// ─── Accordion.Panel — tier-3 light frame with Base UI height vars ──────────
// Panel is a frame so it can be styled through `aui`, but it deliberately omits useStateLayer:
// it is a region, not a control. The height/width animation is authored in `_state-cascade.scss`
// against Base UI's `--accordion-panel-height` / `--accordion-panel-width` vars and transition
// data attrs; React does not own open/closed visuals.
const _AccordionPanel = createAtomicComponent(AccordionPrimitive.Panel, {
  extensions: [useAccordionCascadeProps, useAccordionPanelRecipe],
});

export interface AccordionPanelProps
  extends Omit<React.ComponentProps<typeof AccordionPrimitive.Panel>, 'color'> {
  /** Unified customisation object for the collapsible content frame. */
  aui?: AccordionPanelAui;
}

const AccordionPanel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(function AccordionPanel(
  { ...rest },
  ref,
) {
  return React.createElement(_AccordionPanel as React.ElementType, { ref, ...rest });
});
AccordionPanel.displayName = 'Accordion.Panel';

// ─── Assemble + lockstep typing seam ────────────────────────────────────────
// `Object.assign` collapses the generic call signature of `AccordionRoot`, so the public component
// type is declared explicitly. Keep these statics in lockstep with the interface: a drift would
// expose a part at type level that runtime does not have, or hide a runtime part from consumers.
interface AccordionComponent {
  <Value = unknown>(props: AccordionRootProps<Value>): React.JSX.Element;
  displayName?: string;
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Trigger: typeof AccordionTrigger;
  Panel: typeof AccordionPanel;
  Chevron: typeof AccordionChevron;
  Icon: typeof AccordionIcon;
}

// Compound component (dot-namespace). Keep these statics in lockstep with the `AccordionComponent`
// interface above. `Accordion` is the Root (no `.Root` self-alias; mirror Select/Dropdown).
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
  Chevron: AccordionChevron,
  Icon: AccordionIcon,
}) as AccordionComponent;

export default Accordion;
