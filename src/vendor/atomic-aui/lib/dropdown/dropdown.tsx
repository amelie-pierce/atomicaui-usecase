// modules/design/atomic-aui/src/lib/dropdown/dropdown.tsx
//
// Task P2 — the Dropdown (action menu): Dropdown.Root + Dropdown.Trigger + Dropdown.Portal +
// Dropdown.Positioner + Dropdown.Popup + Dropdown.Item. Assembled into the dot-namespace.
//
// Base UI owns all behavior (menu/menuitem ARIA, typeahead, roving focus, floating placement,
// modal trap); we own appearance via the per-part recipes (use-recipe.ts, P1).
//
// Contrast with Select: Select picks a value (value-group model, persistent `selected` row,
// ItemIndicator check). Dropdown fires an action and closes (no value, no selection, no indicator).
// They share the open-surface infra (portal re-stamp, popup surface, frame trigger) but diverge
// on the value/selection axis. The Trigger shows a STATIC label (children) + auto-chevron.
import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, hasPartChild, findPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { ScrollAreaViewport, ScrollAreaScrollbar, type ScrollAreaThumbColor } from '../view';
import {
  AuiScaleProvider,
  useAuiScale,
  useScaleCascade,
  resolveAuiScale,
} from '../scale-cascade/use-aui-scale';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { useAuiIdentity, identityToDataAttrs } from '../identity';
import {
  createChevronPart,
  splitTriggerChildren,
  composeChevron,
} from '../../families/chevron';
import {
  DROPDOWN_TRIGGER_VOCAB,
  DROPDOWN_SUBMENU_TRIGGER_VOCAB,
  useDropdownTriggerRecipe,
  useDropdownPopupRecipe,
  useDropdownItemRecipe,
  useDropdownGroupLabelRecipe,
  useDropdownCheckboxItemRecipe,
  useDropdownRadioItemRecipe,
  useDropdownSubmenuTriggerRecipe,
} from './use-recipe';
import type {
  DropdownTriggerAui,
  DropdownPopupAui,
  DropdownItemAui,
  DropdownGroupLabelAui,
  DropdownCheckableItemAui,
  DropdownSubmenuTriggerAui,
  DropdownScale,
} from './use-recipe';
import { useFieldAui, type FieldResolvedAui } from '../field/field-context';

// ─── Field-axis forwarding (2026-07-11 USER DECISION — fleet-wide, PINNED) ────────────────────────
// Popup-family parity audit finding #2 (`_vaults/atomicaui/raw/2026-07-11-popup-family-parity-audit.md`,
// row 11): Autocomplete forwards the Field ambient `aui` (color/shape/elevation/sx — scale already
// cascades via the separate `AuiScaleProvider` rail seeded below) to EVERY DOM-bearing part
// (`useMergedAutocompletePartAui`, `autocomplete.tsx:84-105`); Select/Dropdown/Combobox forwarded
// scale ONLY. Scale-only forwarding is the defect, not the law — this mirrors Autocomplete's shape
// exactly (own-axis-wins: an explicit part `aui.color`/`.shape`/`.elevation`/`.sx` is never clobbered).
// Dropdown has no `Field.Dropdown` root today (it is an action menu, not a value control — row 11
// of the audit marks that N/A) but wiring the parts is still correct: `useFieldAui()` resolves to the
// empty default context (a no-op merge) outside any `<Field>`, so this is inert everywhere Dropdown is
// composed standalone and only activates if a future composition nests it under a Field cascade.
type FieldMergeableAui = {
  color?: unknown;
  shape?: unknown;
  elevation?: unknown;
  sx?: unknown;
};

function mergeDropdownFieldAxes<A extends FieldMergeableAui>(
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

function useDropdownFieldMergedAui<A extends FieldMergeableAui>(aui: A | undefined): A {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeDropdownFieldAxes(inherited, aui), [inherited, aui]);
}

// ─── Stateful Field-axis forwarding — CheckboxItem/RadioItem ONLY (2026-07-11 USER DECISION,
// widened) ──────────────────────────────────────────────────────────────────────────────────────
// MENU_CHECKBOX_ITEM_VOCAB / MENU_RADIO_ITEM_VOCAB pin the SAME deliberate per-state look as
// SELECT_ITEM_VOCAB (selected/checked = `raised`/`solid`, a fixed affordance, this same session).
// The naive top-level merge above (`mergeDropdownFieldAxes`) lands ABOVE `vocab.states` in
// `buildLeafClasses`' layering, so applying it to these two parts would silently override the
// PINNED checked fill under an ambient Field color. Mirrors `select.tsx`'s
// `mergeSelectItemFieldAui` exactly: ambient color/shape/elevation reach ONLY the `unselected`
// (resting) state, synthesized as `aui.states.unselected` merged UNDER the consumer's own
// `states.unselected`; the selected/checked state is untouched by ambient (a consumer's own
// top-level or `aui.states.selected` override still reaches it, unaffected). `sx` still merges at
// the top level. GATING (own-axis-wins, not just own-state-wins): an ambient axis is injected into
// `states.unselected` ONLY when the consumer's OWN TOP-LEVEL `aui` does NOT already set that axis
// — `states[active]` is the HIGHEST layer, so an ungated injection would beat even a consumer's
// own top-level `aui.color`, which must never lose to ambient.
function mergeDropdownCheckableItemFieldAui(
  inherited: FieldResolvedAui,
  own: DropdownCheckableItemAui | undefined,
): DropdownCheckableItemAui {
  const ambientUnselected: Record<string, unknown> = {};
  if (own?.color === undefined && inherited.color !== undefined) ambientUnselected.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) ambientUnselected.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) ambientUnselected.elevation = inherited.elevation;
  const ownUnselected = (own?.states as { unselected?: object } | undefined)?.unselected;
  const out: DropdownCheckableItemAui = { ...own };
  if (Object.keys(ambientUnselected).length > 0 || ownUnselected) {
    out.states = {
      ...own?.states,
      unselected: { ...ambientUnselected, ...ownUnselected },
    } as DropdownCheckableItemAui['states'];
  }
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx } as DropdownCheckableItemAui['sx'];
  }
  return out;
}

function useDropdownCheckableItemFieldMergedAui(
  aui: DropdownCheckableItemAui | undefined,
): DropdownCheckableItemAui {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeDropdownCheckableItemFieldAui(inherited, aui), [inherited, aui]);
}

// Re-export the Base UI Root prop shape verbatim — the full menu model (open/defaultOpen/
// onOpenChange/disabled/modal/orientation/highlightItemOnHover/loopFocus/closeParentOnEsc/
// actionsRef). We do NOT narrow or shim it.
export type { MenuRootProps as DropdownRootProps } from '@base-ui/react/menu';
import type { MenuRootProps } from '@base-ui/react/menu';
// Phase 3 — re-export the Base UI SubmenuRoot prop shape verbatim (the submenu menu model:
// open/defaultOpen/onOpenChange/disabled/orientation/loopFocus + `closeParentOnEsc`; it omits
// `modal`/`openOnHover` vs MenuRootProps).
export type { MenuSubmenuRootProps as DropdownSubmenuRootProps } from '@base-ui/react/menu';
import type { MenuSubmenuRootProps } from '@base-ui/react/menu';

// Phase 4 — the `<Payload>` multi-trigger handle helper. Base UI ships `Menu.createHandle<Payload>()`
// (and the `Menu.Handle` class) on the `Menu` namespace (= our `MenuPrimitive`), but a CONSUMER who
// imports only `Dropdown` from this barrel can't reach the Base UI namespace ergonomically. So we
// re-export the creator as `createDropdownHandle` + the `DropdownHandle` type alias — a consumer
// makes a typed handle (`const menu = createDropdownHandle<MyPayload>()`), passes it to
// `<Dropdown handle={menu}>` AND to each detached `<Dropdown.Trigger handle={menu} payload={…}>`,
// and a render-function child of the Root receives the active trigger's `MyPayload`. The handle is
// what links a single popup to multiple triggers (the Viewport then animates the content swap).
//
// KNOWN TYPE LIMITATION (Codex Phase-4 integration review, confirmed by a type fixture): only the
// ROOT threads `<Payload>` — `Dropdown<MyPayload>`'s render-function child IS narrowed to
// `MyPayload` (a wrong-typed field access OR a mismatched `handle` payload IS a compile error). But
// `Dropdown.Trigger`'s `payload` prop is typed `unknown`, NOT narrowed to the handle's `Payload`:
// `DropdownTriggerProps` derives from `React.ComponentProps<typeof MenuPrimitive.Trigger>`, and
// taking `ComponentProps` of a generic component COLLAPSES its `<Payload>` to the default `unknown`
// — so `<Dropdown.Trigger payload={anything}>` compiles regardless of the handle's payload type. The
// RUNTIME threading is fully correct (proven by the runtime swap test); only the detached trigger's
// compile-time payload check is absent. This matches the spec scope (§3b: `<Payload>` on the Root
// only) and the `SelectComponent` precedent (Root-only generics). Narrowing the trigger payload
// would need a generic-preserving `DropdownTrigger` wrapper + a `DropdownTriggerComponent` cast
// (real complexity + .d.ts-emit risk through the `aui`-recipe forwardRef) — DEFERRED, not a defect.
export const createDropdownHandle = MenuPrimitive.createHandle;
// The handle type is DERIVED from the creator's return type — Base UI does NOT re-export the
// `MenuHandle` class at the package-root entry (`@base-ui/react/menu` exposes only `Menu.Handle`/
// `Menu.createHandle` on the namespace + the part PROP types), so a bare `import { MenuHandle }`
// won't resolve. `ReturnType<typeof MenuPrimitive.createHandle<Payload>>` recovers the same
// `MenuHandle<Payload>` instance type the consumer needs to annotate a handle variable.
export type DropdownHandle<Payload> = ReturnType<typeof MenuPrimitive.createHandle<Payload>>;

export type {
  DropdownTriggerAui,
  DropdownPopupAui,
  DropdownItemAui,
  DropdownGroupLabelAui,
  DropdownCheckableItemAui,
  DropdownSubmenuTriggerAui,
  DropdownColor,
  DropdownPaint,
  DropdownScale,
  DropdownShape,
} from './use-recipe';

// ─── Dropdown.Root — generics-preserving wrapper (mirror SelectComponent) ────
// Base UI's `Menu.Root<Payload>` renders NO DOM element (behavior + context only). The `Payload`
// flows via `handle?: MenuHandle<Payload>` + `children?: ReactNode | PayloadChildRenderFunction<
// Payload>` — the "one popup opened by MULTIPLE triggers, content swaps per trigger" pattern: each
// detached `Menu.Trigger` carries a `payload`, and a render-function child receives the ACTIVE
// trigger's payload (typed `Payload`). Root is a plain GENERIC FUNCTION COMPONENT forwarding the
// full menu model verbatim. It takes NO `aui` (renders no box).
//
// Why a generic function (not createAtomicComponent): the factory's `forwardRef<unknown, AnyProps>`
// would ERASE the `<Payload>` generic (collapsing the render-function-child typing). So Root stays a
// plain generic passthrough, and the assembled `Dropdown` is cast to a `DropdownComponent` interface
// (below) that RESTORES the generic call signature (`Object.assign` on a generic fn collapses it).
// It renders no box itself, but accepts a NARROW `aui={{ scale }}` that SEEDS the scale-only cascade
// for the parts (Trigger / Popup / Item / CheckboxItem / RadioItem / SubmenuTrigger / LinkItem all
// fall back to it; an own `aui.scale` wins). Only `scale` cascades — color/paint/shape stay per-part
// (the Popup rounds while its rows stay flat; trigger and popup are separate surfaces).
type DropdownRootAui = { scale?: DropdownScale };
function DropdownRoot<Payload>(
  props: MenuRootProps<Payload> & { aui?: DropdownRootAui },
): React.JSX.Element {
  const { aui, children, ...rest } = props as MenuRootProps<Payload> & {
    aui?: DropdownRootAui;
    children?: React.ReactNode | ((payload: Payload) => React.ReactNode);
  };
  const scale = aui?.scale;
  // Children may be a render FUNCTION (the `<Payload>` multi-trigger pattern — Base UI calls it with
  // the active trigger's payload). Wrapping a function in a provider would break that, so wrap its
  // RESULT instead; otherwise wrap the element children directly.
  const seeded =
    typeof children === 'function'
      ? (payload: Payload) =>
          React.createElement(AuiScaleProvider, { value: scale }, (children as (p: Payload) => React.ReactNode)(payload))
      : React.createElement(AuiScaleProvider, { value: scale }, children as React.ReactNode);
  return React.createElement(MenuPrimitive.Root, rest as object, seeded as React.ReactNode);
}
DropdownRoot.displayName = 'Dropdown';

// ─── Dropdown.Trigger — tier-3 frame (main factory), Button-class ────────────
// useStateLayer runs FIRST (appends `aui-stateful` + focus-ring defaults), useDropdownTriggerRecipe
// runs LAST (recipe classes + bundled `aui.sx`) — so `aui.sx` wins by axis role over the
// state-layer defaults. The trigger's open/hover are CSS (state layer + `data-popup-open`). The
// recipe is a `classNameForState` hook (like Select.Trigger) — the factory resolves it with Base
// UI's MenuTriggerState so the disabled chroma flips off Base UI's render state (which carries the
// Root-context disabled), NOT a `props.disabled` the context-disabled trigger never gets.
// MenuPrimitive.Trigger is a COMPONENT → clears the factory's `as`-guard (which throws only for
// an INTRINSIC string `as`).
const _DropdownTrigger = createAtomicComponent(MenuPrimitive.Trigger, {
  extensions: [useScaleCascade, useStateLayer, useDropdownTriggerRecipe],
});

// ─── Dropdown.Chevron — the composable disclosure chevron (marker-only span) ──
// A composition-driven disclosure chevron via the shared `createChevronPart` family (mirrors
// Accordion.Chevron). It renders ONLY when composed in the Trigger children — there is NO
// auto-render. A composed-but-childless chevron IS the default `chevron-down` glyph (composed only
// to tweak its `aui`) and rotates 180° on open; a composed chevron WITH custom content is a
// replacement node, left static unless the consumer sets `data-aui-rotate`. The span is the
// structural/rotation affordance the Trigger keys `data-aui-rotate` off via the trigger's
// `data-popup-open`. Its `aui` is FORWARDED to the inner ContainedIcon (every glyph axis is live).
const DropdownChevron = createChevronPart('aui-dropdown-chevron');
DropdownChevron.displayName = 'Dropdown.Chevron';
export type DropdownChevronProps = React.ComponentProps<typeof DropdownChevron>;

// ─── Dropdown.Icon — a placeable general icon (a ContainedIcon, contained profile) ──
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so a leading/inline icon
// sits SNUG in the trigger/item row (the in-row icon convention, mirroring Accordion.Icon /
// Field.Icon). Otherwise it IS a ContainedIcon — same identity props (`name`/`family`/`layer`/
// `weight`) + the full box `aui` surface; a consumer can override the profile (or any axis) via
// `aui`. Placeable anywhere in trigger or item children. The icon sizes to the trigger's EFFECTIVE
// tier: own `aui.scale` ?? the dropdown scale cascade ?? the Trigger vocab default.
export type DropdownIconProps = ContainedIconProps;
const DropdownIcon = React.forwardRef<HTMLSpanElement, DropdownIconProps>(
  function DropdownIcon({ aui, ...rest }, ref) {
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inheritedScale,
      DROPDOWN_TRIGGER_VOCAB.defaults.scale as DropdownScale,
    );
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
DropdownIcon.displayName = 'Dropdown.Icon';

export interface DropdownTriggerProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.Trigger>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + per-state appearance
   *  (`states.unselected` = closed / `states.selected` = open) + nested `sx` tier-2 atomic
   *  overrides (full-frame surface — box geometry is author-overridable). The recipe bundles `sx`
   *  and runs LAST, so `aui.sx` wins over the state-layer focus defaults by axis role. With no
   *  `states` authored the appearance is identical to before. `disabled` stays native (not in aui). */
  aui?: DropdownTriggerAui;
}

// The Trigger wrapper: COMPOSITION-DRIVEN. It renders the label body + (only if the consumer
// composed a `<Dropdown.Chevron>`) the disclosure chevron. There is NO auto-render and NO `chevron`/
// `rotateOnOpen` prop (removed — the model is now composition like Accordion). `splitTriggerChildren`
// separates a composed `<Dropdown.Chevron>` from the label body by part identity (recursing through
// fragments); `composeChevron` then injects the scale-matched default glyph + stamps `data-aui-rotate`
// (childless → default glyph + auto-rotate; custom-content → as authored). If no chevron is composed,
// NO chevron renders. Ref is typed `HTMLElement` (NOT `HTMLButtonElement`): Base UI's Menu.Trigger
// exposes `RefAttributes<HTMLElement>` because its `render` prop can replace the underlying `<button>`.
const DropdownTrigger = React.forwardRef<HTMLElement, DropdownTriggerProps>(
  function DropdownTrigger({ children, ...rest }, ref) {
    // a11y (WCAG 4.1.2): dev-warn on an icon-only trigger with no accessible name (only a decorative
    // Dropdown.Icon / Dropdown.Chevron, no aria-label/-labelledby/title). NO-OP in production.
    warnIfNoAccessibleName(children, rest as Record<string, unknown>, 'Dropdown.Trigger');
    const inheritedScale = useAuiScale();
    // The chevron is sized by the trigger's EFFECTIVE TIER (profile-independent): own `aui.scale` ??
    // the cascaded component scale (Dropdown `aui={{ scale }}`) ?? the Trigger vocab default. READ the
    // vocab default (not a literal) so the chevron can NEVER drift from the tier the trigger BOX renders
    // at — a stale literal `'md'` after the 2026-06-14 md→sm change made the chevron one tier too big.
    const triggerScale: DropdownScale = resolveAuiScale(
      (rest as { aui?: DropdownTriggerAui }).aui?.scale,
      inheritedScale,
      DROPDOWN_TRIGGER_VOCAB.defaults.scale as DropdownScale,
    );
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade
    // (color/shape/elevation/sx) under the trigger's own `aui` — own axis always wins.
    const mergedAui = useDropdownFieldMergedAui((rest as { aui?: DropdownTriggerAui }).aui);
    // Split the composed chevron from the label body (by part identity, recursing fragments). The
    // chevron's GLYPH inherits the trigger's resolved scale; its own `aui` still wins per-axis.
    const { body, chevrons } = splitTriggerChildren(children, DropdownChevron);
    const composedChevron = composeChevron(chevrons[0], {
      scale: triggerScale,
      rotateOnOpen: true,
    });
    return React.createElement(
      _DropdownTrigger as React.ElementType,
      { ref, ...rest, aui: mergedAui },
      <>
        {body}
        {composedChevron}
      </>
    );
  }
);
DropdownTrigger.displayName = 'Dropdown.Trigger';

// ─── Dropdown.Portal — structural passthrough ────────────────────────────────
// Base UI's Portal renders the popup tree to `document.body` by default. Theming is handled by
// <Dropdown.Positioner> re-stamping identity `data-aui-*` attrs on the portaled host. A thin
// wrapper so the part is named by its role and lives in the dot-namespace; all Base UI Portal
// props (incl. `container`) pass straight through.
const DropdownPortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuPrimitive.Portal>
>(function DropdownPortal(props, ref) {
  return React.createElement(
    MenuPrimitive.Portal as React.ElementType,
    { ref, ...props }
  );
});
DropdownPortal.displayName = 'Dropdown.Portal';
export type DropdownPortalProps = React.ComponentProps<typeof DropdownPortal>;

// ─── Dropdown.Positioner — THE cascade re-stamp ──────────────────────────────
// A portaled overlay renders OUTSIDE the themed root (`[data-aui-brand][data-aui-theme]`), so the
// `--theme-*`/`--paint-*` rails (normal inheriting props) never reach it → the Popup + Items
// would paint UNSTYLED. The Positioner reads the ambient identity via `useAuiIdentity()` (carried
// across the portal by React context) and RE-STAMPS the same `data-aui-*` attrs on the Base UI
// Positioner element, re-rooting the theme selector there so the rails re-emit + inherit into
// the popup subtree.
//
// Precedence: consumer-supplied `data-aui-*` is spread FIRST, then the identity attrs LAST, so
// the ambient identity WINS (the re-stamp is authoritative — the popup must match its themed root).
// `aui-dropdown-positioner` is a marker (NOT an `.aui-frame`) — just the re-stamp host; it carries
// no recipe. side/align/sideOffset/alignOffset + children + ref + any other div props pass through.
const DropdownPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuPrimitive.Positioner>
>(function DropdownPositioner({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(
    MenuPrimitive.Positioner as React.ElementType,
    {
      ref,
      ...rest, // consumer data-aui-* (if any) FIRST …
      ...dataAttrs, // … ambient identity LAST → identity wins (authoritative re-stamp)
      // Base UI parts accept `className?: string | ((state) => string)`. Prepend the marker
      // to BOTH forms — resolve a function className with the part's render `state` (else
      // `mergeAuiClasses` would `.split()` a function and crash + drop state-aware classes).
      className: prependMarkerClassName('aui-dropdown-positioner', className),
    }
  );
});
DropdownPositioner.displayName = 'Dropdown.Positioner';
export type DropdownPositionerProps = React.ComponentProps<typeof DropdownPositioner>;

// ─── Dropdown.Popup — tier-3 surface frame, NO useStateLayer ─────────────────
// The floating menu surface: a tier-3 `.aui-frame` surface card via the MAIN factory, recipe
// ONLY (useDropdownPopupRecipe) — NO `useStateLayer`: a surface has no hover/focus overlay. The
// recipe gives the bordered surface (surface/solid/md/soft) AND the default float shadow:
// `elevation: 4` is now pinned in DROPDOWN_POPUP_VOCAB.defaults, so buildLeafClasses emits
// `aui-elevation-4` for an un-customized popup. A consumer overrides it via `aui={{ elevation }}`
// or `className="aui-elevation-N"` (mergeAuiClasses dedups the role, last-wins).
const _DropdownPopup = createAtomicComponent(MenuPrimitive.Popup, {
  extensions: [useScaleCascade, useDropdownPopupRecipe],
});

// ─── Dropdown.ScrollArea — CONFIG-CARRIER override for the built-in DS-scroll wrapper ────────────
// A config sentinel (SAME detection mechanism as `Textarea.ScrollArea` — `textarea.tsx:169-172`'s
// "the ONLY accepted child … composing it opts [it] into the DS-scrolled mode" contract, detected via
// `findPartChild(children, TextareaScrollArea)` at `textarea.tsx:466`): renders NOTHING itself.
// Compose it as a SIBLING of the real `Dropdown.Item`s (never a replacement for them — Popup's
// children are the actual menu, unlike Textarea's single-value child) to override the auto-rendered
// wrapper's DS-thumb styling (the SAME `scrollbarSize`/`scrollbarThumbHover`/`scrollbarColor` prop
// surface `View.ScrollArea`/`Textarea.ScrollArea` expose) WITHOUT the internal wrapper ever
// double-wrapping: Popup always renders EXACTLY one ScrollArea.Root/Viewport/Scrollbar; composing
// this part only PARAMETERIZES it (USER DIRECTIVE 3b, 2026-07-10 — "a consumer-passed *.ScrollArea
// overrides the built-in one … the internal wrapper detects the explicit child and steps aside, never
// double-wrap"; team-lead's pin, same date: built-in = zero-config default, explicit = full control).
export interface DropdownScrollAreaProps {
  /** DS scroll-thumb thickness — forwarded to the wrapping Scrollbar/Thumb (number → `--p-px-<n>`
   *  rail; string → verbatim). Unset = the CSS 8px fallback every AtomicAUI View.ScrollArea uses. */
  scrollbarSize?: number | string;
  /** Thumb HOVER color override — any CSS color; sets `--aui-scrollbar-thumb-hover`. */
  scrollbarThumbHover?: string;
  /** Resting thumb COLOR — the foreground anchor (same value space as `aui.sx.foreground`). Unset
   *  mirrors the ambient foreground. */
  scrollbarColor?: ScrollAreaThumbColor;
}
/** Config-carrier — never rendered. The parent Dropdown.Popup reads its props to parameterize the
 *  always-on wrap; it contributes NO DOM (a bare `() => null`), so it is safe to compose alongside
 *  the real menu items with zero visual/structural side effect. */
const DropdownScrollArea: React.FC<DropdownScrollAreaProps> = () => null;
DropdownScrollArea.displayName = 'Dropdown.ScrollArea';

export interface DropdownPopupProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.Popup>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + the `elevation`
   *  axis (default `4` → `aui-elevation-4`) + nested `sx` tier-2 atomic overrides (full-frame
   *  surface — the card surface/border/radius/anatomy are author-overridable via `sx`). The
   *  recipe runs LAST so `aui.sx` wins by axis role; `aui.elevation` overrides the default float. */
  aui?: DropdownPopupAui;
  /** Match the popup width to the trigger (anchor) width EXACTLY. Sets
   *  `--aui-width: var(--anchor-width)` (Base UI sets `--anchor-width` on the Positioner; it
   *  inherits to the Popup) so the popup both grows AND shrinks to the trigger; long item text
   *  wraps within that width. Not an `aui` axis — destructured out, never hits the DOM; consumer
   *  `style` wins. */
  matchTriggerWidth?: boolean;
  /** Cap the menu height. UNSET (default) = AUTO: the popup fits the space between the trigger and the
   *  viewport edge (`--available-height`) and scrolls. SET = SPECIFIED: cap at this height, but STILL
   *  shrink to the viewport so it never overflows (`min(maxHeight, available)`). A `number` is `px`; a
   *  string is any CSS length (`'20rem'`, `'50vh'`). Sets the `--aui-popup-max-block-size` hook — NOT
   *  an `aui` axis; destructured out, never a DOM attr; consumer `style` wins. Mirrors Select.Popup. */
  maxHeight?: number | string;
}

// ─── The ALWAYS-ON DS-scroll wrapper (fleet parity w/ Textarea's View.ScrollArea; USER DIRECTIVE 3,
// 2026-07-10) ──────────────────────────────────────────────────────────────────────────────────
// Base UI's plain `Menu.Popup` does NO imperative scroll/height management of its own (verified
// against the installed `MenuPopup.js` — unlike `Select.Popup`'s `alignItemWithTrigger` choreography,
// see the sibling-parity note on `SelectPopup` below), so it is SAFE to move scroll ownership one
// level down: Popup itself no longer scrolls (its native `overflow-y:auto` in `.aui-dropdown-popup`
// is now INERT — nothing ever overflows Popup once its child clips), and a nested Base UI
// `ScrollArea.Root` (RAW/unstyled — Popup is already the `.aui-frame` surface, so the Root carries no
// recipe) hosts the SAME styled `View.ScrollAreaViewport` + `ScrollAreaScrollbar` Textarea composes
// (the shared DS thumb, `--aui-scrollbar-size` CSS-default 8px, no extra props needed).
//
// The bound MOVES from Popup's own `max-block-size` to the Viewport's, computed from the SAME
// `--aui-popup-max-block-size` (the `maxHeight` prop hook, unchanged below) / `--available-height`
// (Base UI, set on the Positioner, inherits) pair Popup used to read directly — minus Popup's OWN
// resolved block padding (`--aui-padding-block-start`/`-end`, `@property inherits:true`, G14), so the
// wrapped content area matches the unwrapped popup's content-box: that padding used to be carved out
// of Popup's own max-block-size (border-box); now it must be carved out of the Viewport's cap instead,
// or the total popup height would grow by the padding amount. Popup's own `max-block-size` is
// neutralized inline (`maxBlockSize:'none'`) so the two bounds never double-clamp.
const DROPDOWN_SCROLL_MAX_BLOCK_SIZE =
  'min(' +
  'calc(var(--aui-popup-max-block-size, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px)), ' +
  'calc(var(--available-height, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px))' +
  ')';

// Thin forwardRef wrapper for the correct displayName + ref type. Elevation is now a vocab axis
// (DROPDOWN_POPUP_VOCAB.defaults.elevation: 4) so the recipe emits the default float — no className
// injection needed. `className` passes through natively and still wins the elevation role last.
//
// `matchTriggerWidth` (Feature W): a boolean structural prop (NOT an `aui` axis) — destructured out
// so it never reaches the DOM. When set, it injects an inline `--aui-width: var(--anchor-width)`
// (Base UI sets `--anchor-width` on the Positioner; it INHERITS down to the Popup, an unregistered
// custom prop). The frame base map reads `width: var(--aui-width, auto)` — so the popup width becomes
// EXACTLY the trigger width (it both grows AND shrinks; a `min-width` floor never shrank a wider
// popup, which read as "not matching"). Long item text wraps within that width. We set the `--aui-*`
// HOOK (the .aui-frame rule), never raw `width`. The literal `'--anchor-width'` string is hardcoded
// (NOT imported from a Base UI enum — dup-`@base-ui` hazard). Consumer `style` is spread LAST so an
// explicit `style={{ '--aui-width': … }}` wins.
const DropdownPopup = React.forwardRef<HTMLDivElement, DropdownPopupProps>(function DropdownPopup(
  { matchTriggerWidth, maxHeight, style, children, ...rest },
  ref
) {
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // popup's own `aui` — own axis always wins.
  const mergedAui = useDropdownFieldMergedAui((rest as { aui?: DropdownPopupAui }).aui);
  // Inline hooks: the trigger-width match + the explicit height cap, PLUS the always-on neutralize of
  // Popup's own max-block-size (scroll ownership moved to the nested Viewport below). A consumer
  // `style` is spread LAST so it wins. `maxHeight` number → px.
  const widthStyle = {
    ...(matchTriggerWidth ? { '--aui-width': 'var(--anchor-width)' } : {}),
    ...(maxHeight != null ? { '--aui-popup-max-block-size': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
    maxBlockSize: 'none',
  } as React.CSSProperties;
  // Base UI Popup accepts `style` as either an object OR a `(state) => CSSProperties` FUNCTION.
  // Preserve both: for a function form, wrap it so the hooks are applied UNDER the resolved consumer
  // style (consumer wins). A plain spread of a function would collapse to `{}` and drop the consumer's
  // state-aware styles. The hook style is now ALWAYS present (maxBlockSize:'none' is unconditional),
  // so `mergedStyle` is always computed.
  let mergedStyle: DropdownPopupProps['style'];
  if (typeof style === 'function') {
    const styleFn = style;
    mergedStyle = (state: unknown) =>
      ({ ...widthStyle, ...(styleFn as (s: unknown) => React.CSSProperties)(state) });
  } else {
    mergedStyle = { ...widthStyle, ...style };
  }
  // USER DIRECTIVE 3b — a composed `<Dropdown.ScrollArea/>` OVERRIDES the built-in wrap's thumb
  // styling; it is a config-carrier SIBLING of the real items (renders null itself, so leaving it in
  // `children` costs nothing — no filtering needed). The wrapper NEVER double-wraps: exactly one
  // Root/Viewport/Scrollbar renders either way, only its props change.
  const scrollAreaPart = findPartChild(children, DropdownScrollArea);
  const scrollAreaProps = scrollAreaPart?.props as DropdownScrollAreaProps | undefined;
  const rootThumbStyle = {
    ...(scrollAreaProps?.scrollbarSize != null
      ? { '--aui-scrollbar-size': typeof scrollAreaProps.scrollbarSize === 'number' ? `var(--p-px-${scrollAreaProps.scrollbarSize})` : scrollAreaProps.scrollbarSize }
      : {}),
    ...(scrollAreaProps?.scrollbarThumbHover != null ? { '--aui-scrollbar-thumb-hover': scrollAreaProps.scrollbarThumbHover } : {}),
  } as React.CSSProperties;
  return React.createElement(
    _DropdownPopup as React.ElementType,
    {
      ref,
      // DS-wide popup motion (shared with ContextMenu + Menubar, which reuse Dropdown.Popup): the
      // `[data-aui-popup-motion="anchored"]` scale+fade (state-cascade).
      'data-aui-popup-motion': 'anchored',
      ...rest,
      style: mergedStyle,
      aui: mergedAui,
    },
    // The RAW Base UI ScrollArea.Root — context-only (no atomic recipe; Popup already IS the frame).
    // Its Scrollbar auto-renders NOTHING when the axis doesn't overflow (Base UI's own gate), so a
    // SHORT list is byte-for-byte inert (no visible bar, no layout change) — the hard blast-radius
    // constraint. Viewport carries the (padding-aware) cap; Scrollbar is the shared DS thumb, PARAM-
    // ETERIZED by a composed `Dropdown.ScrollArea` when present (never a second wrap).
    //
    // VERTICAL-ONLY (USER DIRECTIVE 5, 2026-07-10): `overflowX: 'hidden'` is a `style` PROP, not a
    // stylesheet rule — the existing `.aui-view-scroll-area-viewport` comment ("NEVER re-set overflow
    // [via CSS]; Base UI owns overflow:scroll inline; a class can't clip one axis") is load-bearing:
    // Base UI's `ScrollAreaViewport.js` sets `style:{overflow:'scroll'}` INLINE and merges consumer
    // `elementProps` LAST (`props:[props, elementProps]` in its own `useRenderElement` call) — so ONLY
    // an inline longhand from OUR side can win that axis; no CSS specificity, however high, beats an
    // inline shorthand. This is the SAME mechanism `View.ScrollArea`'s own `scrollAxis` prop already
    // uses (`view/scroll-area.tsx` `viewportOverflowStyle()`), applied directly here since Dropdown
    // composes the raw parts rather than the full `View.ScrollArea` wrapper. Only ONE Scrollbar is
    // EVER composed below (`orientation:'vertical'`) — no horizontal bar exists to hide in the first
    // place; this longhand is what stops horizontal SCROLLING (not just the bar) for an unwrappable
    // token wider than the popup.
    React.createElement(
      ScrollAreaPrimitive.Root as React.ElementType,
      Object.keys(rootThumbStyle).length > 0 ? { style: rootThumbStyle } : null,
      React.createElement(
        ScrollAreaViewport,
        { style: { maxBlockSize: DROPDOWN_SCROLL_MAX_BLOCK_SIZE, overflowX: 'hidden' } as React.CSSProperties },
        children,
      ),
      React.createElement(ScrollAreaScrollbar, {
        orientation: 'vertical',
        ...(scrollAreaProps?.scrollbarColor != null ? { thumbColor: scrollAreaProps.scrollbarColor } : {}),
      }),
    ),
  );
});
DropdownPopup.displayName = 'Dropdown.Popup';

// ─── Dropdown.Item — tier-3 action row (main factory) ────────────────────────
// A real Base UI Menu Item (a <div role="menuitem">), going through the MAIN factory.
// useStateLayer runs FIRST (appends `aui-stateful` + focus-ring defaults), useDropdownItemRecipe
// runs LAST — its LOCAL static hook reads `props.disabled` (a REAL own-prop of Menu.Item,
// verified MenuItem.js:18-28, NOT context-merged) and returns a STATIC `{ className }`.
//
// NO auto-wrap (Menu has no ItemText/ItemIndicator) — `children` ARE the label; pass straight
// through. No `hasPartChild`, no partial-compose warn.
//
// `onClick` / `closeOnClick` / `label` / `disabled` pass through natively.
const _DropdownItem = createAtomicComponent(MenuPrimitive.Item, {
  extensions: [useScaleCascade, useStateLayer, useDropdownItemRecipe],
});

export interface DropdownItemProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.Item>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + FULL-frame `sx`
   *  (`AuiFrameStyleProps` — the row marker reads the `--aui-*` anatomy hooks, so every box axis
   *  is a live knob — G12 2026-06-13).
   *  NOTE: NO `states` key — there is no `selected`/per-state appearance axis. Action items
   *  are fired and forgotten; the Dropdown has no value model. `disabled` stays native. */
  aui?: DropdownItemAui;
}

// Thin forwardRef wrapper for a clean HTMLElement ref type and the correct displayName.
// Since Menu.Item renders a <div>, HTMLElement is correct (vs HTMLDivElement, which is also fine
// but HTMLElement is what Base UI itself uses in its .d.ts signature).
const DropdownItem = React.forwardRef<HTMLElement, DropdownItemProps>(function DropdownItem(
  { aui, ...rest },
  ref
) {
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // item's own `aui` — own axis always wins.
  const mergedAui = useDropdownFieldMergedAui(aui);
  return React.createElement(_DropdownItem as React.ElementType, { ref, ...rest, aui: mergedAui });
});
DropdownItem.displayName = 'Dropdown.Item';

// ─── Phase 1 — Sectioning parts (tier-1 markers, CSS in _state-cascade.scss) ──
// Group / Separator are box-less STRUCTURAL parts — pure tier-1 markers (createAtomicPart with NO
// `styleable`/`baseProps`). They render their Base UI core element + the marker class the CSS keys
// on; they carry NO `aui` recipe (a `defineLeaf` would hard-emit an `aui-frame` — wrong for a wrapper
// / a hairline; the Icon lesson). Appearance lives in `_state-cascade.scss` (Separator = a hairline).
// (GroupLabel is now a FULL BOX frame — see below.)

// Dropdown.Group — the section wrapper (<div role="group">). Empty visual state; it exists so
// Base UI can associate the GroupLabel with the items via aria-labelledby.
export type DropdownGroupProps = React.ComponentProps<typeof MenuPrimitive.Group>;
const DropdownGroup = createAtomicPart<DropdownGroupProps>(MenuPrimitive.Group, 'aui-dropdown-group');
DropdownGroup.displayName = 'Dropdown.Group';

// Dropdown.GroupLabel — a caption row labelling its Group (<div>, Base UI wires aria-labelledby).
// A FULL BOX frame, MIRRORING Dropdown.Item's geometry (it reads the scale cascade and emits the
// same `aui-color-text-surface` + `aui-scale-default-<tier>` cells), so its inline padding matches
// the items beneath it and tracks the tier — instead of the old hand-coded `--p-px-12` literal that
// drifted when the default went md→sm. A flat `text`-paint box = NO fill; the caption look (muted
// color, small uppercase typescale, semibold, caption block rhythm) overrides in `_state-cascade.scss`.
const _DropdownGroupLabel = createAtomicComponent(MenuPrimitive.GroupLabel, {
  extensions: [useScaleCascade, useDropdownGroupLabelRecipe],
});
export interface DropdownGroupLabelProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.GroupLabel>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + FULL-frame `sx`
   *  (`AuiFrameStyleProps`). Same box shape as `Dropdown.Item`; defaults to a flat fill-less caption. */
  aui?: DropdownGroupLabelAui;
}
const DropdownGroupLabel = React.forwardRef<HTMLDivElement, DropdownGroupLabelProps>(
  function DropdownGroupLabel({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // group label's own `aui` — own axis always wins.
    const mergedAui = useDropdownFieldMergedAui(aui);
    return React.createElement(_DropdownGroupLabel as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
DropdownGroupLabel.displayName = 'Dropdown.GroupLabel';

// Dropdown.Separator — a hairline divider (<div role="separator">). `orientation` passes through
// natively → CSS keys the vertical case off [data-orientation="vertical"].
//
// PROPS TYPE NOTE: `MenuPrimitive.Separator` is re-exported from a deep `@base-ui/react/esm/
// separator/Separator` path, so deriving its props via `React.ComponentProps<typeof …Separator>`
// makes the inferred `Dropdown` namespace type (from `Object.assign`) un-nameable in the emitted
// .d.ts (TS2742). We hand-author `DropdownSeparatorProps` instead — standard div props + the
// `orientation` passthrough Base UI's Separator adds — so the public type is self-contained and
// portable. The marker part forwards every prop verbatim at runtime regardless.
export interface DropdownSeparatorProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {
  /** Divider axis. `horizontal` (default) → a 1px-tall full-bleed rule; `vertical` → a 1px-wide
   *  column. Passes straight through to Base UI's Separator (`[data-orientation]`). */
  orientation?: 'horizontal' | 'vertical';
}
const DropdownSeparator = createAtomicPart<DropdownSeparatorProps>(
  MenuPrimitive.Separator as React.ElementType,
  'aui-dropdown-separator'
);
DropdownSeparator.displayName = 'Dropdown.Separator';

// ─── Dropdown.Arrow — tier-1 marker (visual pointer), CSS in _state-cascade.scss ──
// The pointer triangle that points from the popup back at its anchor trigger — a pure-visual
// tier-1 marker (createAtomicPart, NO `aui`, NO recipe). A `defineLeaf` would hard-emit an
// `.aui-frame` + a paint cell — WRONG for a decorative diamond (the Icon lesson). All appearance
// lives in `_state-cascade.scss`: a rotated-square diamond whose body fill auto-matches the popup
// fill via the inheriting `--aui-bg` (the COLOR hooks `--aui-bg`/`--aui-fg`/`--aui-border-color`
// ARE `inherits:true`, while intrinsic geometry/width hooks stay `inherits:false`), so it
// auto-matches a custom-painted popup, plus a hairline on the two exposed edges. Base UI handles
// the positioner translate + stamps `[data-side]`/`[data-align]`/`[data-uncentered]`; the CSS
// flips which two edges carry the hairline per `[data-side]` so the point always faces the anchor.
//
// PLACEMENT: a CHILD of `<Dropdown.Popup>` (so it inherits the popup's `--paint-*` cascade). If a
// scrolling popup is later used (`overflow` set), the Arrow must sit OUTSIDE the scroll region.
//
// PROPS TYPE NOTE: same deep-path issue as `DropdownSeparatorProps` — `MenuPrimitive.Arrow` is
// re-exported from a deep `@base-ui/react/menu/arrow/MenuArrow` path, so deriving its props via
// `React.ComponentProps<typeof …Arrow>` makes the inferred `Dropdown` namespace type (from
// `Object.assign`) un-nameable in the emitted .d.ts (TS2742). We hand-author `DropdownArrowProps`
// instead (Base UI's MenuArrow renders a plain `<div>` with no extra props) so the public type is
// self-contained and portable. The marker part forwards every prop verbatim at runtime regardless.
export interface DropdownArrowProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {}
const DropdownArrow = createAtomicPart<DropdownArrowProps>(
  MenuPrimitive.Arrow as React.ElementType,
  'aui-dropdown-arrow'
);
DropdownArrow.displayName = 'Dropdown.Arrow';

// ─── Dropdown.Backdrop — tier-1 marker (modal scrim), CSS in _state-cascade.scss ──
// The dim overlay that sits BENEATH the popup in a modal menu — a pure-visual tier-1 marker
// (createAtomicPart, NO `aui`, NO recipe). A `defineLeaf` would hard-emit an `.aui-frame` + a paint
// cell — WRONG for a full-viewport scrim (the Icon/Arrow lesson). All appearance lives in
// `_state-cascade.scss`: a `position:fixed; inset:0;` darkening wash.
//
// MOUNTING + STACKING (precise): Base UI's MenuBackdrop renders a plain `<div>` and gates its
// presence on the open/transition lifecycle (`hidden: !mounted`, stamping `[data-open]` +
// `[data-starting-style]`/`[data-ending-style]`). It does NOT own a `z-index` — the scrim sits
// BENEATH the popup purely by DOM ORDER (the Backdrop is rendered BEFORE the Positioner inside the
// Portal) plus the absence of any competing `z-index`. We intentionally do NOT hand-set a
// `z-index`; honor the source order (Backdrop first, then Positioner/Popup).
//
// THEME-AWARENESS: the Backdrop is a Portal sibling rendered BEFORE the Positioner, so — unlike
// the Popup subtree — it is NOT covered by the Positioner's identity re-stamp. The wrapper below
// therefore re-stamps identity ITSELF (`--theme-overlay` exists only under
// `[data-aui-brand][data-aui-theme]` selectors, never `:root`), making the scrim theme-aware:
// `color-mix(in srgb, var(--theme-overlay, currentColor) 56%, transparent)` (raised from 32% in
// the 2026-07-11 fleet visibility pass; see `.aui-dropdown-backdrop` in `_state-cascade.scss`).
//
// PLACEMENT: inside `<Dropdown.Portal>`, as a sibling BEFORE `<Dropdown.Positioner>`. Only
// meaningful in `modal` mode (Root `modal` defaults TRUE); a `modal={false}` menu would render it
// but the scrim is conventionally omitted there.
//
// PROPS TYPE NOTE: unlike `DropdownArrowProps`/`DropdownSeparatorProps`, deriving the props via
// `React.ComponentProps<typeof MenuPrimitive.Backdrop>` builds CLEAN here (no TS2742 un-nameable
// type in the emitted .d.ts), so we keep the DERIVED form — it carries Base UI's full public typing
// surface (`render`, the state-aware `className`/`style` functions over `{ open, transitionStatus }`),
// which a hand-authored plain-div type would drop (relevant for authored backdrop transitions).
export type DropdownBackdropProps = React.ComponentProps<typeof MenuPrimitive.Backdrop>;
const _DropdownBackdrop = createAtomicPart<DropdownBackdropProps>(
  MenuPrimitive.Backdrop as React.ElementType,
  'aui-dropdown-backdrop'
);
// Thin wrapper so the backdrop emits the DS-wide popup-motion attr (shared with ContextMenu + Menubar
// via direct reference aliases — this wrapper heals all three) AND re-stamps identity: the Backdrop is
// a Portal sibling rendered BEFORE the Positioner, so the Positioner's re-stamp never covers it, and
// `--theme-overlay` (the scrim role the CSS reads at 56%) is defined ONLY under
// `[data-aui-brand][data-aui-theme]` selectors — never `:root` — so WITHOUT the re-stamp the token is
// undefined on the body-portaled element and the scrim silently falls back to `currentColor`
// (2026-07-11 parity audit #A; Select/Combobox/Autocomplete backdrops already re-stamp — this mirrors
// SelectBackdrop). Precedence: consumer props first, identity attrs LAST (identity wins), same as the
// Positioner's own re-stamp contract.
const DropdownBackdrop = React.forwardRef<HTMLDivElement, DropdownBackdropProps>(
  function DropdownBackdrop(props, ref) {
    const identity = useAuiIdentity();
    const dataAttrs = identityToDataAttrs(identity);
    return React.createElement(_DropdownBackdrop as React.ElementType, {
      ref,
      'data-aui-popup-motion': 'backdrop',
      ...props,
      ...dataAttrs,
    });
  },
);
DropdownBackdrop.displayName = 'Dropdown.Backdrop';

// ─── Dropdown.Viewport — tier-1 marker (content-transition container), CSS in _state-cascade.scss ──
// The content-transition container — the wrapper that animates a payload-driven content SWAP when
// ONE popup is opened by MULTIPLE triggers and the content changes per trigger (the `<Payload>`
// render-function pattern, 3b below). A pure-structural tier-1 marker (createAtomicPart, NO `aui`,
// NO recipe). A `defineLeaf` would hard-emit an `.aui-frame` + paint cell — WRONG for a transparent
// structural wrapper (the Icon/Arrow/Backdrop lesson). Appearance is minimal CSS in
// `_state-cascade.scss`: `position:relative; display:block;` + an optional opacity/transform
// transition gated on Base UI's swap attrs (`[data-transitioning]`/`[data-activation-direction]`/
// `[data-instant]`) — Base UI drives the swap; we don't author keyframes.
//
// NOT the long-menu scroll container — long-menu scrolling is the Popup's own `max-height`/`overflow`
// (a separate, deferred Popup affordance), NOT the Viewport. See the consume-doc Deferred section.
//
// PLACEMENT: a CHILD of `<Dropdown.Popup>`, WRAPPING the swapped content. Keep it a structural
// wrapper that doesn't fight the Popup's padding (the CSS adds no box geometry of its own).
//
// PROPS TYPE NOTE: like `DropdownBackdropProps`, the derived `React.ComponentProps<typeof
// MenuPrimitive.Viewport>` builds CLEAN here (no TS2742 un-nameable type in the emitted .d.ts), so we
// keep the DERIVED form — it carries Base UI's full public typing surface (`children`, the
// state-aware `className`/`style`/`render` over `{ activationDirection, transitioning, instant }`),
// which a hand-authored plain-div type would drop (relevant for authored swap transitions).
export type DropdownViewportProps = React.ComponentProps<typeof MenuPrimitive.Viewport>;
const DropdownViewport = createAtomicPart<DropdownViewportProps>(
  MenuPrimitive.Viewport as React.ElementType,
  'aui-dropdown-viewport'
);
DropdownViewport.displayName = 'Dropdown.Viewport';

// ─── Phase 2 — Selectable items (the `menu-checkbox-item` family + indicators) ─
// CheckboxItem (independent toggle) + RadioItem (single-select within a RadioGroup) are
// tier-3 STATEFUL rows: real Base UI Menu CheckboxItem / RadioItem (a <div role="menuitemcheckbox"
// / "menuitemradio">), going through the MAIN factory with [useStateLayer, <family recipe>].
// useStateLayer runs FIRST (highlight `::after` overlay host + focus); the family recipe runs
// LAST — its `classNameForState` is resolved by the factory with Base UI's `{checked, disabled,
// highlighted}` render state (the recipe reads `{checked, disabled}`, ignores `highlighted`).
//
// Base UI default `closeOnClick:false` for BOTH (the menu stays open while toggling) — a
// consume-doc gotcha; it passes through natively. Unlike Select there is NO ItemText part —
// the label is the DIRECT children (like Dropdown.Item), so auto-render = `{children}` + a
// trailing indicator (NOT wrapped in a text part).

// The default check glyph (the same inline SVG check as Select.Item — NOT <Icon>, for
// consistency with the other indicator pucks; sized off `--scale-icon-size` via the marker CSS).
const DefaultCheckGlyph = (
  <svg className="aui-dropdown-item-glyph" viewBox="0 0 16 16" focusable="false" width="1em" height="1em">
    <path d="M3.5 8.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// The default dot glyph (a filled circle — the radio-selected affordance; same `currentColor`
// fill + `--scale-icon-size` sizing convention as the check glyph).
const DefaultDotGlyph = (
  <svg className="aui-dropdown-item-glyph" viewBox="0 0 16 16" focusable="false" width="1em" height="1em">
    <circle cx="8" cy="8" r="4" fill="currentColor" />
  </svg>
);

// Dropdown.CheckboxItemIndicator — tier-2 styleable puck (cascade-reader). A thin wrapper over
// Base UI's CheckboxItemIndicator (a <span>) baking the marker + `keepMounted: true`. Base UI
// UNMOUNTS the indicator when unchecked → we keepMounted it and gate visibility off the ROW's
// `[data-checked]` in CSS (robust regardless of the indicator's own attrs), reserving the column
// so toggling doesn't reflow the row. `styleable` opts into the narrow `aui={{color?, sx?}}` slot.
const _DropdownCheckboxItemIndicator = createAtomicPart<
  React.ComponentProps<typeof MenuPrimitive.CheckboxItemIndicator> & PartStyleProps
>(MenuPrimitive.CheckboxItemIndicator, 'aui-dropdown-checkbox-item-indicator', {
  baseProps: { keepMounted: true, 'aria-hidden': true },
  styleable: true,
});
export type DropdownCheckboxItemIndicatorProps = React.ComponentProps<typeof _DropdownCheckboxItemIndicator>;

// Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
// indicator's own `aui` — own axis always wins.
const DropdownCheckboxItemIndicator = React.forwardRef<HTMLSpanElement, DropdownCheckboxItemIndicatorProps>(
  function DropdownCheckboxItemIndicator({ aui, ...rest }, ref) {
    const mergedAui = useDropdownFieldMergedAui(aui);
    return React.createElement(_DropdownCheckboxItemIndicator as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
DropdownCheckboxItemIndicator.displayName = 'Dropdown.CheckboxItemIndicator';

// Dropdown.RadioItemIndicator — tier-2 styleable puck. Same shape as the checkbox indicator;
// default glyph is a filled dot (the radio-selected affordance).
const _DropdownRadioItemIndicator = createAtomicPart<
  React.ComponentProps<typeof MenuPrimitive.RadioItemIndicator> & PartStyleProps
>(MenuPrimitive.RadioItemIndicator, 'aui-dropdown-radio-item-indicator', {
  baseProps: { keepMounted: true, 'aria-hidden': true },
  styleable: true,
});
export type DropdownRadioItemIndicatorProps = React.ComponentProps<typeof _DropdownRadioItemIndicator>;

// Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
// indicator's own `aui` — own axis always wins.
const DropdownRadioItemIndicator = React.forwardRef<HTMLSpanElement, DropdownRadioItemIndicatorProps>(
  function DropdownRadioItemIndicator({ aui, ...rest }, ref) {
    const mergedAui = useDropdownFieldMergedAui(aui);
    return React.createElement(_DropdownRadioItemIndicator as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
DropdownRadioItemIndicator.displayName = 'Dropdown.RadioItemIndicator';

// Dropdown.RadioGroup — tier-1 marker (a <div role="group">) owning `value`/`onValueChange`
// passthrough for single-select among its RadioItems. NO recipe (no box paint).
export type DropdownRadioGroupProps = React.ComponentProps<typeof MenuPrimitive.RadioGroup>;
const DropdownRadioGroup = createAtomicPart<DropdownRadioGroupProps>(
  MenuPrimitive.RadioGroup,
  'aui-dropdown-radio-group'
);
DropdownRadioGroup.displayName = 'Dropdown.RadioGroup';

// ─── Dropdown.CheckboxItem — tier-3 stateful checkable row ────────────────────
const _DropdownCheckboxItem = createAtomicComponent(MenuPrimitive.CheckboxItem, {
  extensions: [useScaleCascade, useStateLayer, useDropdownCheckboxItemRecipe],
});

export interface DropdownCheckboxItemProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.CheckboxItem>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + per-state
   *  appearance (`states.unselected` / `states.selected`) + nested FULL-frame `sx`
   *  (`AuiFrameStyleProps` — the row marker reads the `--aui-*` anatomy hooks; every box axis is
   *  a live knob — G12 2026-06-13).
   *  `scale` stays top-level. `checked`/`onCheckedChange`/`closeOnClick`/`disabled` stay
   *  native (Base UI props, not in aui). */
  aui?: DropdownCheckableItemAui;
}

// AUTO-render the row body — `{children}` (the label, a DIRECT child — Menu has no ItemText) +
// a trailing <Dropdown.CheckboxItemIndicator> (default check glyph) — UNLESS the consumer composed
// an indicator among children (then they own the row subtree; composed wins). Mirrors Select.Item's
// auto-render, minus the ItemText wrap (no such part here).
const DropdownCheckboxItem = React.forwardRef<HTMLElement, DropdownCheckboxItemProps>(
  function DropdownCheckboxItem({ children, aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION, widened): the STATEFUL merge — ambient
    // reaches only the resting `unselected` state; the `raised`/`solid` checked fill is PINNED
    // (see `mergeDropdownCheckableItemFieldAui`'s comment above).
    const mergedAui = useDropdownCheckableItemFieldMergedAui(aui);
    const composedIndicator = hasPartChild(children, DropdownCheckboxItemIndicator);
    // PARTIAL composition is a smell: composing an indicator opts the whole body into manual
    // control. We dev-warn ONLY when an indicator is composed AND there's no plain label child to
    // pair it with would be ambiguous — but unlike Select (which also has a text part) there's no
    // text-only partial-compose case. Composing the indicator = manual mode; children pass through.
    const content = composedIndicator ? (
      children
    ) : (
      <>
        {children}
        {React.createElement(DropdownCheckboxItemIndicator, null, DefaultCheckGlyph)}
      </>
    );
    return React.createElement(_DropdownCheckboxItem as React.ElementType, { ref, ...rest, aui: mergedAui }, content);
  }
);
DropdownCheckboxItem.displayName = 'Dropdown.CheckboxItem';

// ─── Dropdown.RadioItem — tier-3 stateful checkable row (SAME family) ─────────
const _DropdownRadioItem = createAtomicComponent(MenuPrimitive.RadioItem, {
  extensions: [useScaleCascade, useStateLayer, useDropdownRadioItemRecipe],
});

export interface DropdownRadioItemProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.RadioItem>, 'color'> {
  /** Unified customisation object (same shape as CheckboxItem). `value` is REQUIRED (the value
   *  set in the enclosing RadioGroup when selected) + `closeOnClick`/`disabled` stay native. */
  aui?: DropdownCheckableItemAui;
}

// AUTO-render `{children}` (label) + a trailing <Dropdown.RadioItemIndicator> (default dot glyph)
// unless an indicator is composed. `value` passes through natively.
const DropdownRadioItem = React.forwardRef<HTMLElement, DropdownRadioItemProps>(
  function DropdownRadioItem({ children, aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION, widened): the STATEFUL merge — ambient
    // reaches only the resting `unselected` state; the `raised`/`solid` checked fill is PINNED
    // (see `mergeDropdownCheckableItemFieldAui`'s comment above).
    const mergedAui = useDropdownCheckableItemFieldMergedAui(aui);
    const composedIndicator = hasPartChild(children, DropdownRadioItemIndicator);
    const content = composedIndicator ? (
      children
    ) : (
      <>
        {children}
        {React.createElement(DropdownRadioItemIndicator, null, DefaultDotGlyph)}
      </>
    );
    return React.createElement(_DropdownRadioItem as React.ElementType, { ref, ...rest, aui: mergedAui }, content);
  }
);
DropdownRadioItem.displayName = 'Dropdown.RadioItem';

// ─── Phase 3 — Submenu (SubmenuRoot + SubmenuTrigger) + LinkItem ──────────────
// A submenu is composed as:
//   <Dropdown.SubmenuRoot>
//     <Dropdown.SubmenuTrigger>More</Dropdown.SubmenuTrigger>   ← the row that opens it
//     <Dropdown.Portal><Dropdown.Positioner><Dropdown.Popup>    ← the nested popup
//       …items…
//     </Dropdown.Popup></Dropdown.Positioner></Dropdown.Portal>
//   </Dropdown.SubmenuRoot>
// The EXISTING Portal/Positioner/Popup/Item parts are REUSED inside the SubmenuRoot — the
// Positioner re-stamp themes the nested body-portaled popup exactly as it does the root popup.

// ─── Dropdown.SubmenuRoot — plain passthrough (mirror DropdownRoot) ──────────
// MenuSubmenuRoot renders NO DOM (context only, like Menu.Root) — a plain function forwarding
// MenuSubmenuRootProps verbatim. NO `aui` (renders no box). NON-GENERIC: payload threading
// (the <Payload> generic + DropdownComponent interface cast) stays DEFERRED — a basic submenu of
// actions needs no payload. Widening this to generic later is non-breaking for existing call sites.
function DropdownSubmenuRoot(props: MenuSubmenuRootProps): React.JSX.Element {
  return React.createElement(MenuPrimitive.SubmenuRoot, props as object);
}
DropdownSubmenuRoot.displayName = 'Dropdown.SubmenuRoot';

// ─── Dropdown.SubmenuTrigger — tier-3 item row + trailing submenu chevron ─────
// A real Base UI SubmenuTrigger (a <div role="menuitem"> that opens a submenu), going through the
// MAIN factory with [useStateLayer, useDropdownSubmenuTriggerRecipe]. useStateLayer runs FIRST
// (highlight `::after` overlay host + focus); the recipe runs LAST — its `classNameForState` is
// resolved by the factory with Base UI's `{disabled, highlighted, open}` render state (the recipe
// reads `disabled`, which Base UI computes as `disabledProp || rootDisabled`). Same flat row
// appearance as Dropdown.Item, with a trailing RIGHT chevron indicating "opens to the side".
const _DropdownSubmenuTrigger = createAtomicComponent(MenuPrimitive.SubmenuTrigger, {
  extensions: [useScaleCascade, useStateLayer, useDropdownSubmenuTriggerRecipe],
});

export interface DropdownSubmenuTriggerProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + FULL-frame `sx`
   *  (`AuiFrameStyleProps` — the row marker reads the `--aui-*` anatomy hooks; every box axis is
   *  a live knob — G12 2026-06-13).
   *  Same shape as `DropdownItemAui` (NO `states` — a submenu trigger has no value axis).
   *  `disabled`/`label`/`openOnHover`/`delay`/`closeDelay` stay native. */
  aui?: DropdownSubmenuTriggerAui;
}

// The wrapper renders `{children}` (the label) + a trailing submenu affordance: a
// <span class="aui-dropdown-submenu-icon"> wrapping a <ContainedIcon name="chevron-right">.
// The chevron is sized by the row's TIER (profile-independent) — the resolved scale
// (`aui.scale`, default `md`) feeds the ContainedIcon's own `scale` axis (same convention as the
// Trigger's default chevron). The submenu chevron points RIGHT and does NOT rotate — it indicates
// "opens to the side", not up/down → NO `data-aui-rotate`, NO open-rotate CSS.
const submenuChevron = (scale: DropdownScale) => (
  <ContainedIcon name="chevron-right" aria-hidden aui={{ scale }} />
);

const DropdownSubmenuTrigger = React.forwardRef<HTMLElement, DropdownSubmenuTriggerProps>(
  function DropdownSubmenuTrigger({ children, ...rest }, ref) {
    const inheritedScale = useAuiScale();
    const triggerScale: DropdownScale = resolveAuiScale(
      (rest as { aui?: DropdownSubmenuTriggerAui }).aui?.scale,
      inheritedScale,
      DROPDOWN_SUBMENU_TRIGGER_VOCAB.defaults.scale as DropdownScale,
    );
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // row's own `aui` — own axis always wins.
    const mergedAui = useDropdownFieldMergedAui((rest as { aui?: DropdownSubmenuTriggerAui }).aui);
    return React.createElement(
      _DropdownSubmenuTrigger as React.ElementType,
      { ref, ...rest, aui: mergedAui },
      <>
        {children}
        <span className="aui-dropdown-submenu-icon" aria-hidden>
          {submenuChevron(triggerScale)}
        </span>
      </>
    );
  }
);
DropdownSubmenuTrigger.displayName = 'Dropdown.SubmenuTrigger';

// ─── Dropdown.LinkItem — the Item row appearance on an <a> host ───────────────
// A real Base UI Menu LinkItem (an <a> element), going through the MAIN factory with
// [useStateLayer, useDropdownItemRecipe] — REUSING the action Item's recipe (it's element-agnostic;
// LinkItem has NO `disabled` prop, so the recipe's `props.disabled` is just undefined → no flip).
// It looks IDENTICAL to Dropdown.Item, just on an <a> (href/target/rel… pass through). The recipe
// already stamps the shared `aui-dropdown-item` marker, so the existing item-row CSS applies with
// ZERO new CSS — no distinct marker needed.
const _DropdownLinkItem = createAtomicComponent(MenuPrimitive.LinkItem, {
  extensions: [useScaleCascade, useStateLayer, useDropdownItemRecipe],
});

export interface DropdownLinkItemProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.LinkItem>, 'color'> {
  /** Unified customisation object — same shape as `DropdownItemAui` (FULL-frame `AuiFrameStyleProps`;
   *  the row marker reads the `--aui-*` anatomy hooks — G12; NO `states`). `href`/`target`/`rel`/`closeOnClick`/`label`
   *  stay native (Base UI anchor props). */
  aui?: DropdownItemAui;
}

// Thin forwardRef wrapper for the correct displayName. Ref is typed `Element` (NOT
// `HTMLAnchorElement`): Base UI's Menu.LinkItem exposes `RefAttributes<Element>` because its
// `render` prop can replace the underlying `<a>` host — narrowing to `HTMLAnchorElement` would
// mistype a `render`-composed ref (same reasoning as DropdownTrigger's `HTMLElement` ref). The
// default host is still an `<a>`; `render` is the documented escape hatch.
const DropdownLinkItem = React.forwardRef<Element, DropdownLinkItemProps>(
  function DropdownLinkItem({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // row's own `aui` — own axis always wins.
    const mergedAui = useDropdownFieldMergedAui(aui);
    return React.createElement(_DropdownLinkItem as React.ElementType, { ref, ...rest, aui: mergedAui });
  }
);
DropdownLinkItem.displayName = 'Dropdown.LinkItem';

// ─── Assemble + the typing seam (mirror SelectComponent) ──────────────────────
// `Object.assign` on a generic function LOSES the generic call signature (TS collapses
// `DropdownRoot<Payload>` to a non-generic call). So we declare the assembled type EXPLICITLY — a
// `DropdownComponent` interface carrying the generic call signature (preserving `<Payload>`) PLUS
// every part static — and cast the runtime `Object.assign` result to it. This is the exact
// SelectComponent seam (select.tsx) adapted to the Menu's single `<Payload>` generic.
//
// LOCKSTEP CONTRACT: the statics in THIS interface and the keys in the `Object.assign` below MUST
// stay 1:1 — a drift (a static present in one but not the other) is a REAL bug (the consumer would
// see a part the runtime doesn't expose, or vice-versa). Same P1-reviewer note as Select. When
// adding a part: add it to BOTH the interface and the assign, together.
interface DropdownComponent {
  <Payload>(props: MenuRootProps<Payload> & { aui?: { scale?: DropdownScale } }): React.JSX.Element;
  displayName?: string;
  Trigger: typeof DropdownTrigger;
  Chevron: typeof DropdownChevron;
  Icon: typeof DropdownIcon;
  Portal: typeof DropdownPortal;
  Positioner: typeof DropdownPositioner;
  Popup: typeof DropdownPopup;
  ScrollArea: typeof DropdownScrollArea;
  Item: typeof DropdownItem;
  Group: typeof DropdownGroup;
  GroupLabel: typeof DropdownGroupLabel;
  Separator: typeof DropdownSeparator;
  Arrow: typeof DropdownArrow;
  Backdrop: typeof DropdownBackdrop;
  Viewport: typeof DropdownViewport;
  CheckboxItem: typeof DropdownCheckboxItem;
  CheckboxItemIndicator: typeof DropdownCheckboxItemIndicator;
  RadioGroup: typeof DropdownRadioGroup;
  RadioItem: typeof DropdownRadioItem;
  RadioItemIndicator: typeof DropdownRadioItemIndicator;
  SubmenuRoot: typeof DropdownSubmenuRoot;
  SubmenuTrigger: typeof DropdownSubmenuTrigger;
  LinkItem: typeof DropdownLinkItem;
}

// Compound component (dot-namespace). Keep these statics in LOCKSTEP with the `DropdownComponent`
// interface above (see the lockstep contract). The cast restores the `<Payload>` call signature
// that `Object.assign` collapsed.
export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Chevron: DropdownChevron,
  Icon: DropdownIcon,
  Portal: DropdownPortal,
  Positioner: DropdownPositioner,
  Popup: DropdownPopup,
  ScrollArea: DropdownScrollArea,
  Item: DropdownItem,
  Group: DropdownGroup,
  GroupLabel: DropdownGroupLabel,
  Separator: DropdownSeparator,
  Arrow: DropdownArrow,
  Backdrop: DropdownBackdrop,
  Viewport: DropdownViewport,
  CheckboxItem: DropdownCheckboxItem,
  CheckboxItemIndicator: DropdownCheckboxItemIndicator,
  RadioGroup: DropdownRadioGroup,
  RadioItem: DropdownRadioItem,
  RadioItemIndicator: DropdownRadioItemIndicator,
  SubmenuRoot: DropdownSubmenuRoot,
  SubmenuTrigger: DropdownSubmenuTrigger,
  LinkItem: DropdownLinkItem,
}) as DropdownComponent;

export default Dropdown;
