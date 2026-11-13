// modules/design/atomic-aui/src/lib/collapsible/collapsible.tsx
//
// Collapsible is a SINGLE inline disclosure: Root → Trigger → Panel. Base UI owns the open model,
// keyboard/ARIA (`aria-expanded`/`aria-controls`), and panel mount/transition state. AtomicAUI owns
// only appearance, composition, and the public dot-namespace. It is the SIMPLER sibling of Accordion
// (lib/accordion/accordion.tsx) — there is NO Item or Header, because Collapsible discloses ONE region.
//
// Like Accordion, Collapsible never portals: the whole tree stays in normal document flow and inherits
// the app's existing AtomicAUI cascade naturally (no Popup/Positioner/Viewport/identity re-stamp).
//
// VERTICAL-ONLY: this is a pure vertical disclosure — the Panel animates block-size (HEIGHT) off Base
// UI's `--collapsible-panel-height` (CollapsiblePanelCssVars). The horizontal/column-collapse pattern
// lives in the Panels family (lib/panels) instead.
import * as React from 'react';
import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import type { CollapsibleRootProps as BaseCollapsibleRootProps } from '@base-ui/react/collapsible';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import { useStateLayer } from '../../core/state/use-state-layer';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import type { ContainedIconAui } from '../icon';
import {
  createChevronPart,
  splitTriggerChildren,
  composeChevron,
} from '../../families/chevron';
import type { PropHook } from '../../core/types';
import type { AuiElevation } from '../../core/vocabulary/recipe-vocab';
import {
  COLLAPSIBLE_ROOT_VOCAB,
  COLLAPSIBLE_TRIGGER_VOCAB,
  useCollapsibleHeaderRecipe,
  useCollapsiblePanelRecipe,
  useCollapsibleTriggerRecipe,
} from './use-recipe';
import type {
  CollapsibleColor,
  CollapsibleHeaderAui,
  CollapsiblePanelAui,
  CollapsibleRootAui,
  CollapsibleScale,
  CollapsibleShape,
  CollapsibleTriggerAui,
} from './use-recipe';

export type {
  CollapsibleRootAui,
  CollapsibleTriggerAui,
  CollapsiblePanelAui,
  CollapsibleHeaderAui,
  CollapsibleColor,
  CollapsiblePaint,
  CollapsibleScale,
  CollapsibleShape,
} from './use-recipe';

/** How the Trigger sizes within the header, stamped as `data-trigger-mode` on the Root so the CSS can
 *  key off it. `fill` (DEFAULT): the Trigger FILLS the header (inline-size:100%) — the full clickable
 *  header; the focus ring rings the CARD. `hug`: the Trigger HUGS to just a contained-square chevron
 *  (a rail/strip) — ONLY the chevron toggles; the focus ring moves to the Trigger. */
export type CollapsibleTriggerMode = 'fill' | 'hug';

// ─── Collapsible appearance cascade — scale + color + shape + elevation ──────────────────────
// Mirrors AccordionCascade: the Root seeds these FOUR inheritable axes and every descendant part
// (Trigger / Panel / Chevron) falls back to them — a part's OWN axis always wins. `paint`/`profile`/`sx`
// are intentionally NOT cascaded (a Trigger is interactive, the Panel is a region — those stay per-part).
export interface CollapsibleCascade {
  scale?: CollapsibleScale;
  color?: CollapsibleColor;
  shape?: CollapsibleShape;
  elevation?: AuiElevation;
}
const EMPTY_COLLAPSIBLE_CASCADE: CollapsibleCascade = {};
const CollapsibleAuiContext = React.createContext<CollapsibleCascade>(EMPTY_COLLAPSIBLE_CASCADE);
const CollapsibleAuiProvider = CollapsibleAuiContext.Provider;
function useCollapsibleCascade(): CollapsibleCascade {
  return React.useContext(CollapsibleAuiContext);
}

/** The 4 cascaded axes of `inherited`, as a seed object (only DEFINED axes). Mirrors Accordion. */
function cascadeSeed(inherited: CollapsibleCascade): Record<string, unknown> {
  const seed: Record<string, unknown> = {};
  if (inherited.scale !== undefined) seed.scale = inherited.scale;
  if (inherited.color !== undefined) seed.color = inherited.color;
  if (inherited.shape !== undefined) seed.shape = inherited.shape;
  if (inherited.elevation !== undefined) seed.elevation = inherited.elevation;
  return seed;
}

/** Drop UNDEFINED-valued keys so an explicit `undefined` axis can't CLOBBER an inherited/default value
 *  when spread last. Mirrors Accordion. */
function compactDefined(obj: Record<string, unknown> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj ?? {})) if (v !== undefined) out[k] = v;
  return out;
}

/** Merge the inherited cascade UNDER a part's own `aui` (own DEFINED axis wins; every non-cascaded own
 *  axis — paint/profile/sx — passes through untouched). Mirrors Accordion. */
function mergeCascadeAui(
  own: Record<string, unknown> | undefined,
  inherited: CollapsibleCascade,
): Record<string, unknown> {
  return { ...cascadeSeed(inherited), ...compactDefined(own) };
}

/** Resolve a parent's effective cascade (own ?? inherited). Mirrors Accordion. */
function resolveCascade(own: CollapsibleCascade, inherited: CollapsibleCascade): CollapsibleCascade {
  return {
    scale: own.scale ?? inherited.scale,
    color: own.color ?? inherited.color,
    shape: own.shape ?? inherited.shape,
    elevation: own.elevation ?? inherited.elevation,
  };
}

/** PropHook: inject the inherited cascade into a part's `aui` before its recipe runs (own wins).
 *  Mirrors useAccordionCascadeProps. */
const useCollapsibleCascadeProps: PropHook<{ aui?: Record<string, unknown> }, { aui?: Record<string, unknown> }> = (
  props,
) => ({ aui: mergeCascadeAui(props.aui, useCollapsibleCascade()) });

export interface CollapsibleRootProps extends BaseCollapsibleRootProps {
  /** How the Trigger sizes within the header. `fill` (DEFAULT) → the Trigger fills the header (the full
   *  clickable surface; focus ring on the CARD). `hug` → the Trigger hugs to a contained-square chevron
   *  rail (ONLY the chevron toggles; focus ring on the TRIGGER). Stamped as `data-trigger-mode` on the
   *  Root so `_state-cascade.scss` can pick the size + outline behavior. */
  triggerMode?: CollapsibleTriggerMode;
  /** The FULL frame surface of the section CARD (color/paint/scale/shape/elevation + sx) AND the seed of
   *  the shared cascade for every part — a part's own axis always wins. The CARD uses the full `aui`; the
   *  CASCADED axes are `scale` + `color` + `shape` + `elevation` only (`paint`/`sx` stay on the card, so
   *  the Trigger/Panel keep their transparent `text` defaults). Mirrors the Accordion Item + Root combined. */
  aui?: CollapsibleRootAui;
}

// ─── Collapsible.Root — generic behavior wrapper, marker only ───────────────
// Root is the exported `Collapsible` call signature, not a `.Root` static (mirror Accordion/Select).
// It takes open/defaultOpen/onOpenChange/disabled + our `triggerMode` and the frame `aui` (the Root is
// the solid section CARD). It stamps `data-trigger-mode` so the CSS picks the size/outline behavior, and
// seeds the appearance cascade.
function CollapsibleRoot(props: CollapsibleRootProps): React.JSX.Element {
  const {
    className,
    triggerMode,
    disabled,
    aui,
    children,
    ...rest
  } = props;

  const resolvedTriggerMode: CollapsibleTriggerMode = triggerMode ?? 'fill';

  return React.createElement(
    CollapsiblePrimitive.Root,
    {
      ...rest,
      disabled,
      ...(disabled ? { 'data-disabled': '' } : {}),
      'data-trigger-mode': resolvedTriggerMode,
      // The Root IS the solid section CARD (Base UI Collapsible has no Item) — render the full frame off
      // COLLAPSIBLE_ROOT_VOCAB (surface / paint:solid / shape:soft, mirroring the Accordion Item), then
      // append the consumer className LAST. The cascade it seeds below stays scale/color/shape/elevation
      // only, so the Trigger/Panel keep their transparent `text` defaults on the card.
      className: [
        buildLeafClasses(COLLAPSIBLE_ROOT_VOCAB, aui, undefined, disabled),
        className,
      ]
        .filter(Boolean)
        .join(' '),
    } as object,
    // Seed the appearance cascade for every part.
    React.createElement(
      CollapsibleAuiProvider,
      {
        // Seed ONLY the cascade axes (scale/color/shape/elevation) — NOT paint/sx, which stay on the
        // card frame — so the Trigger/Panel keep their transparent `text` defaults on the solid card.
        value: aui
          ? { scale: aui.scale, color: aui.color, shape: aui.shape, elevation: aui.elevation }
          : EMPTY_COLLAPSIBLE_CASCADE,
      },
      children,
    ),
  );
}
CollapsibleRoot.displayName = 'Collapsible';

// ─── Collapsible.Chevron — the composable disclosure chevron (marker-only span) ────────────────
// A composition-driven disclosure chevron via the shared `createChevronPart` family (identical to
// Accordion.Chevron / Dropdown.Chevron / Select.Chevron). It renders ONLY when composed in the Trigger
// children — there is NO auto-render. A composed-but-childless chevron IS the default `chevron-down`
// glyph and rotates 180° on open; a composed chevron WITH custom content is left static unless the
// consumer sets `data-aui-rotate`. The Trigger keys the rotate selector off its `data-panel-open`.
const CollapsibleChevron = createChevronPart('aui-collapsible-chevron');
CollapsibleChevron.displayName = 'Collapsible.Chevron';
export type CollapsibleChevronProps = React.ComponentProps<typeof CollapsibleChevron>;

// ─── Collapsible.Header — the composable disclosure-header View frame ───────────────────────────
// A View-class structural FRAME (a full `.aui-frame`, the user-locked design) that wraps the Trigger
// (+ any header content) so the consumer FULLY composes the header — the styleable-View analogue of
// Accordion.Header (which is a box-less heading marker, accordion.tsx:219). It is STATELESS (the
// interactive affordance lives on the contained Trigger) → `useCollapsibleHeaderRecipe` is a plain
// `createVocabRecipe`, NO `useStateLayer`. It is a cascade reader (`useCollapsibleCascadeProps`) so it
// inherits scale/color/shape/elevation from the Root (own axis wins), and exposes the FULL frame `aui`
// surface (every box axis + sx). Renders a plain `<div>` by default (polymorphic via `as`).
const _CollapsibleHeader = createAtomicComponent('div', {
  extensions: [useCollapsibleCascadeProps, useCollapsibleHeaderRecipe],
});

export interface CollapsibleHeaderProps
  extends Omit<React.ComponentProps<typeof _CollapsibleHeader>, 'color'> {
  /** The FULL frame surface of the header band (color/paint/scale/shape/elevation + sx). View-shaped
   *  defaults: surface / solid / sm / no-padding / none / 0. Inherits the Root cascade (own axis wins). */
  aui?: CollapsibleHeaderAui;
}

const CollapsibleHeader = React.forwardRef<HTMLDivElement, CollapsibleHeaderProps>(
  function CollapsibleHeader({ ...rest }, ref) {
    return React.createElement(_CollapsibleHeader as React.ElementType, { ref, ...rest });
  },
);
CollapsibleHeader.displayName = 'Collapsible.Header';

// ─── Collapsible.Spacer — a flex-grow spacer that fills the Header's empty space ────────────────
// A box-less structural marker (`flex:1 1 auto`, CSS in _state-cascade.scss) composed INSIDE the Header
// to push the Trigger (or header content) to the far side. The Header is a flex ROW, so `flex:1 1 auto`
// grows along the inline axis → fills horizontally. NO `aui`, NO recipe — pure layout. Mirrors
// Menubar.Spacer (lib/menubar/menubar.tsx:149).
export interface CollapsibleSpacerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {}
const CollapsibleSpacer = createAtomicPart<CollapsibleSpacerProps>('div', 'aui-collapsible-spacer');
CollapsibleSpacer.displayName = 'Collapsible.Spacer';

// ─── Collapsible.Trigger — interactive disclosure row ───────────────────────
// useStateLayer runs FIRST (hover/press/focus affordance), useCollapsibleTriggerRecipe runs LAST
// (recipe + `aui.sx`). Disabled comes from Base UI render state through the shared trigger-state family,
// so root-disabled collapsibles flip the trigger chroma. Mirrors Accordion.Trigger.
const _CollapsibleTrigger = createAtomicComponent(CollapsiblePrimitive.Trigger, {
  extensions: [useCollapsibleCascadeProps, useStateLayer, useCollapsibleTriggerRecipe],
});

export interface CollapsibleTriggerProps
  extends Omit<React.ComponentProps<typeof CollapsiblePrimitive.Trigger>, 'color'> {
  /** Unified customisation object for the interactive row: context axes (color/paint/scale/shape) +
   *  per-state appearance (`states.unselected` = closed / `states.selected` = open) + full-frame `sx`.
   *  `disabled` stays native/Base UI. */
  aui?: CollapsibleTriggerAui;
}

// Composition-driven (mirror Accordion.Trigger): renders the label body + (only if the consumer composed
// a `<Collapsible.Chevron>`) the disclosure chevron. NO auto-render. `splitTriggerChildren` separates a
// composed chevron from the body by part identity; `composeChevron` injects the scale-matched default
// glyph + stamps `data-aui-rotate` (childless → default glyph + auto-rotate; custom → as authored).
const CollapsibleTrigger = React.forwardRef<HTMLElement, CollapsibleTriggerProps>(
  function CollapsibleTrigger({ children, ...rest }, ref) {
    warnIfNoAccessibleName(children, rest as Record<string, unknown>, 'Collapsible.Trigger');
    const inherited = useCollapsibleCascade();

    // The Trigger's RESOLVED cascade (own ?? inherited) is what its chevron inherits. Chevron sizes to
    // the Trigger's EFFECTIVE scale: own ?? cascade ?? vocab default (READ the vocab default — not a
    // literal — so the chevron can't drift from the trigger box tier).
    const triggerCascade = resolveCascade(
      (rest as { aui?: CollapsibleTriggerAui }).aui as CollapsibleCascade ?? {},
      inherited,
    );
    const triggerScale: CollapsibleScale =
      (triggerCascade.scale as CollapsibleScale | undefined) ??
      (COLLAPSIBLE_TRIGGER_VOCAB.defaults.scale as CollapsibleScale);
    // The chevron GLYPH inherits the trigger's resolved SHAPE + ELEVATION plus the historical `soft`
    // box-shape default (matches the rounded-card precedent on Accordion); the chevron's own `aui` still
    // wins per-axis. Only DEFINED axes are carried so undefined cannot clobber the `soft` default.
    const chevronInherit: ContainedIconAui = {
      shape: (triggerCascade.shape as ContainedIconAui['shape']) ?? 'soft',
      ...(triggerCascade.elevation !== undefined ? { elevation: triggerCascade.elevation } : {}),
    };

    const { body, chevrons } = splitTriggerChildren(children, CollapsibleChevron);
    const composedChevron = composeChevron(chevrons[0], {
      scale: triggerScale,
      inheritAui: chevronInherit,
      rotateOnOpen: true,
    });
    const content = (
      <>
        <span className="aui-collapsible-trigger-content">{body}</span>
        {composedChevron}
      </>
    );

    return React.createElement(_CollapsibleTrigger as React.ElementType, { ref, ...rest }, content);
  },
);
CollapsibleTrigger.displayName = 'Collapsible.Trigger';

// ─── Collapsible.Panel — light frame with Base UI collapse vars ─────────────
// Panel is a frame so it can be styled through `aui`, but it omits useStateLayer: it is a region, not a
// control. The height animation is authored in `_state-cascade.scss` against Base UI's
// `--collapsible-panel-height` var and transition data attrs; React does not own open/closed visuals.
const _CollapsiblePanel = createAtomicComponent(CollapsiblePrimitive.Panel, {
  extensions: [useCollapsibleCascadeProps, useCollapsiblePanelRecipe],
});

export interface CollapsiblePanelProps
  extends Omit<React.ComponentProps<typeof CollapsiblePrimitive.Panel>, 'color'> {
  /** Unified customisation object for the collapsible content frame. */
  aui?: CollapsiblePanelAui;
}

const CollapsiblePanel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(function CollapsiblePanel(
  { ...rest },
  ref,
) {
  return React.createElement(_CollapsiblePanel as React.ElementType, { ref, ...rest });
});
CollapsiblePanel.displayName = 'Collapsible.Panel';

// ─── Assemble + lockstep typing seam ─────────────────────────────────────────
// Keep these statics in lockstep with the `CollapsibleComponent` interface: a drift would expose a part
// at type level that runtime does not have, or hide a runtime part from consumers.
interface CollapsibleComponent {
  (props: CollapsibleRootProps): React.JSX.Element;
  displayName?: string;
  Header: typeof CollapsibleHeader;
  Spacer: typeof CollapsibleSpacer;
  Trigger: typeof CollapsibleTrigger;
  Panel: typeof CollapsiblePanel;
  Chevron: typeof CollapsibleChevron;
}

// Compound component (dot-namespace). `Collapsible` is the Root (no `.Root` self-alias; mirror
// Accordion/Select/Dropdown). Keep these statics in lockstep with `CollapsibleComponent`.
export const Collapsible = Object.assign(CollapsibleRoot, {
  Header: CollapsibleHeader,
  Spacer: CollapsibleSpacer,
  Trigger: CollapsibleTrigger,
  Panel: CollapsiblePanel,
  Chevron: CollapsibleChevron,
}) as CollapsibleComponent;

export default Collapsible;
