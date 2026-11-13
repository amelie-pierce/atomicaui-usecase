// modules/design/atomic-aui/src/lib/card-group/card-group.tsx
//
// CardGroup — a selection-group container over rich Card content. It wraps the installed Base UI
// ToggleGroup/Toggle (`@base-ui/react` 1.6.0) the way RadioGroup/CheckboxGroup group primitive controls,
// renders each choice THROUGH the shipped Card composition, and supports card-grid + list display plus
// client-side search. The group owns the value; each CardGroup.Item (a Base UI Toggle = a native
// `<button aria-pressed>`) owns its pressed/selected treatment; Card stays a stateless visual leaf.
//
// ── VALUE SHAPE (D4, 2026-07-12) ── The public value is NORMALIZED per mode: single (default) is
// `string | null` (RadioGroup-style), multiple is `string[]` (CheckboxGroup-style). The wrapper
// normalizes to/from the installed ToggleGroup's always-array value at the boundary — a consumer never
// sees the array in single mode.
//
// ── ITEM PAINT (View/List.Item sibling parity) ── The selected chroma (`aui-color-solid-raised`) lands
// on the PRESSABLE button root itself (buildCardGroupItemClasses → the Toggle's className function), NOT
// an inner surface — exactly like `View interactive selected` / `List.Item[data-selected]`. This is the
// resolution of Lane 1's held-open risk (a): the pressable root carries the paint.
import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { buildStyleProps, expandShorthands } from '../../core/recipe/build-style-props';
import { type PartAuiSlot } from '../../core/recipe/part-classes';
import type { AuiStates } from '../../core/vocabulary/leaf-vocabulary';
import {
  ScrollAreaViewport as ViewScrollAreaViewport,
  ScrollAreaScrollbar as ViewScrollAreaScrollbar,
  type ScrollAreaThumbColor,
} from '../view';
import { LabelableProvider, useLabelableContext } from '@base-ui/react/internals/labelable-provider';
import { Field } from '../field';
import { IconButton, type IconButtonAui } from '../icon-button';
import { Label, type LabelProps, type LabelAui } from '../label';
import {
  Card,
  type CardBodyAui,
  type CardBodyProps,
  type CardImageContainerAui,
  type CardImageContainerProps,
  type CardImageProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardActionProps,
  type CardContentProps,
  type CardFooterProps,
} from '../card';
import { Type } from '../type';
import { ContainedIcon } from '../icon';
import {
  buildCardGroupItemClasses,
  buildCardGroupItemsTrayClasses,
  useCardGroupRootRecipe,
  CARD_GROUP_DEFAULT_SCALE,
  buildCardGroupViewToggleClasses,
  type CardGroupDisplay,
  type CardGroupItemAui,
  type CardGroupItemsAui,
  type CardGroupRootAui,
  type CardGroupScale,
} from './use-recipe';

export {
  CARD_GROUP_DEFAULT_SCALE,
  CARD_GROUP_ITEM_VOCAB,
  CARD_GROUP_ITEM_SX_AXES,
  CARD_GROUP_ITEMS_VOCAB,
  CARD_GROUP_ITEMS_SX_AXES,
  CARD_GROUP_ROOT_VOCAB,
  CARD_GROUP_SX_AXES,
  buildCardGroupItemClasses,
  buildCardGroupItemsTrayClasses,
  useCardGroupRootRecipe,
} from './use-recipe';
export type {
  CardGroupColor,
  CardGroupPaint,
  CardGroupScale,
  CardGroupProfile,
  CardGroupShape,
  CardGroupElevation,
  CardGroupDisplay,
  CardGroupItemAui,
  CardGroupItemsAui,
  CardGroupItemStateKey,
  CardGroupRootAui,
} from './use-recipe';

// The interactive-surface class string (mirrors View / List.Item): the `.aui-stateful` hover/active/
// focus overlay host + the shared info/2px focus-ring defaults. Appended to every Item so a pressable
// card gets the fleet interactive affordance (cursor + ring authored in `_state-cascade.scss`).
const STATE_LAYER_CLASSES = 'aui-stateful aui-focus-color-info aui-focus-width-2';

// Grid defaults (D7): the card-display grid is 3 columns × a 3-visible-row scroll viewport by default.
const CARD_GROUP_DEFAULT_COLUMNS = 3;
const CARD_GROUP_DEFAULT_ROWS = 3;

// SSR-safe iso-layout-effect (the library compiles without lib.dom → probe `document` via globalThis) —
// the radio-group/switch-group pattern (radio-group.tsx:52). Used for the D7 rows→viewport measurement.
const useIsoLayoutEffect =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as { document?: unknown }).document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

// Structural DOM shapes for the D7 rows measurement (the build tsconfig has no `lib: dom`).
type MeasureItem = { getBoundingClientRect(): { height: number } };
type MeasureGrid = { children: ArrayLike<MeasureItem> };
type ResizeObserverLike = { observe(target: unknown): void; disconnect(): void };

// Structural DOM shapes for the D10 2D arrow navigation.
type NavItem = { hasAttribute(name: string): boolean; getAttribute(name: string): string | null; focus(): void };
type NavGrid = { querySelectorAll(sel: string): ArrayLike<NavItem> };
function navItemDisabled(el: NavItem): boolean {
  return el.hasAttribute('data-disabled') || el.getAttribute('aria-disabled') === 'true';
}

// ─── Value normalization (D4) ────────────────────────────────────────────────────────────────────
/** Public value shape — `string | null` in single mode, `string[]` in multiple mode. */
export type CardGroupValue = string | null | readonly string[];

function toGroupValue(value: CardGroupValue | undefined): readonly string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value as readonly string[];
  // single: string | null → the installed ToggleGroup's array shape (multiple already an array above).
  return value == null ? [] : [value as string];
}

// Inverse of toGroupValue, on the value Base UI hands back. Single mode: the installed ToggleGroup emits
// `[]` for BOTH "nothing selected" AND "re-pressed the already-selected item" (`nextPressed ? [newValue]
// : []`, ToggleGroup.js:69-71) — so returning `null` on an empty array yields the RadioGroup-style
// "re-press clears the selection" for free; there is no explicit clear branch here because the primitive
// owns that transition.
function fromGroupValue(groupValue: readonly string[], multiple: boolean): string | string[] | null {
  if (multiple) return [...groupValue];
  return groupValue.length > 0 ? groupValue[0] : null;
}

// ─── CardGroup context (display + query + match state, shared by the parts) ───────────────────────
interface CardGroupContextValue {
  query: string;
  setQuery: (query: string) => void;
  display: CardGroupDisplay;
  setDisplay: (display: CardGroupDisplay) => void;
  /** Whether an item with this `textValue` survives the active search filter. */
  matches: (textValue?: string) => boolean;
  /** Whether ANY item is currently visible (drives the Empty presentation). */
  anyVisible: boolean;
  /** D30 — the composed `CardGroup.Empty` content, HOISTED so `CardGroup.Items` renders it INSIDE the tray
   *  (filling the bound region + centered), the Autocomplete.Empty-inside-the-list precedent. `undefined`
   *  when no Empty is composed. */
  emptyNode: React.ReactNode;
  multiple: boolean;
  /** The group's resolved scale — read by CardGroup.Label (D8-8c) to inherit the group density. */
  groupScale: CardGroupScale;
  /** The group `disabled` — ripples to CardGroup.ViewToggle's option buttons (D13). */
  disabled: boolean;
}

const CardGroupContext = React.createContext<CardGroupContextValue | null>(null);

function useCardGroupContext(part: string): CardGroupContextValue {
  const ctx = React.useContext(CardGroupContext);
  if (!ctx) {
    throw new Error(`${part} must be composed inside a <CardGroup>.`);
  }
  return ctx;
}

// ─── CardGroup.Item context (the mirrored-item-parts cascade channel, D6) ──────────────────────────
// The Item plays the CARD-ROOT role for its internal parts. A real Card root seeds `CardContext` so
// Card.Body/ImageContainer read the card's scale (card.tsx:462); but CardGroup.Item is a Base UI Toggle,
// NOT a Card, so it provides no CardContext — the raw Card.* parts inside it read the DEFAULT scale
// (Phase A audit row b). This context carries the Item's resolved scale so the MIRRORED parts
// (CardGroup.ItemBody/ItemImageContainer) can forward-and-extend it into the Card part's `aui.scale`,
// reproducing that cascade for the mirrored path. Card itself is un-editable (mission scope), so the raw
// path keeps reading the default; the mirrored parts are how the scale cascade is made to work.
interface CardGroupItemContextValue {
  scale: CardGroupScale;
}
const CardGroupItemContext = React.createContext<CardGroupItemContextValue>({
  scale: CARD_GROUP_DEFAULT_SCALE,
});
function useCardGroupItemScale(): CardGroupScale {
  return React.useContext(CardGroupItemContext).scale;
}

// ─── CardGroup.Item — the selectable leaf (Base UI Toggle THROUGH the Card composition) ───────────
export interface CardGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color' | 'value'> {
  /** The item's identifier in the group (required). */
  value: string;
  /** Plain-text label used by CardGroup.Search's client-side filter (and as the default filter key).
   *  Required when Search composes; not a DOM attribute. */
  textValue?: string;
  disabled?: boolean;
  /** MIXED selection (D8-8b) — a CODE-ONLY display prop (the Checkbox/List.Item precedent): a parent
   *  computes "partially applied / mixed" and drives it. Resolves the `indeterminate` appearance state,
   *  stamps `data-indeterminate`, and sets `aria-pressed="mixed"` (the native mixed-toggle value). */
  indeterminate?: boolean;
  /**
   * G20 — INTERACTIVE content rendered as a SIBLING of the item button, not inside it.
   *
   * The Item IS a native `<button>` (the Base UI Toggle), so an `IconButton`/`Dropdown` composed in
   * its children would nest `<button>` in `<button>` — invalid HTML, and the inner control becomes
   * unreachable. Anything passed here is rendered by the DS AFTER the button inside a shell wrapper,
   * so both are siblings and both are real, focusable controls.
   *
   * The shell is INTERNAL: the consumer still writes a bare `<CardGroup.Item>`, so the group's own
   * child scanning (the Search filter, the empty-state probe) keeps matching — which is exactly why
   * a consumer cannot wrap the tile themselves.
   *
   * DOM order is visual order (G27.3): the actions follow the button and are positioned over its
   * trailing edge, so they come after it in the tab order too.
   */
  actions?: React.ReactNode;
  /** Selectable-leaf appearance: the full frame axes + `sx` + per-state `states`
   *  (unselected/selected/indeterminate). A consumer `aui.states.<state>` beats the vocab default. */
  aui?: CardGroupItemAui;
}

const CardGroupItem = React.forwardRef<HTMLButtonElement, CardGroupItemProps>(function CardGroupItem(
  { value, textValue, disabled, indeterminate, actions, aui, className, children, ...rest },
  ref,
) {
  const ctx = useCardGroupContext('CardGroup.Item');
  // `textValue` is read by the Root/Items filter walk (below), never spread to the DOM.
  void textValue;
  const userClassName = typeof className === 'string' ? className : undefined;
  // The Item's resolved scale (D15): its own `aui.scale`, else the GROUP scale — the group density cascades
  // to every item (the Card-root analog: a Card's internals follow the card scale; here the GROUP is the
  // density source). `--aui-min-height` is inherits:false, so the rail can't cascade via CSS — the scale is
  // threaded on the item explicitly. It feeds BOTH the item BUTTON's own paint scale (via `effectiveAui`
  // below — D15 SANCTIONS this; the button was pinned `sm` before) AND CardGroupItemContext so the mirrored
  // ItemBody/ItemImageContainer thread it into their Card part (Phase A row b). A consumer item `aui.scale`
  // still WINS (the gated merge: own ?? group).
  const itemScale: CardGroupScale = aui?.scale ?? ctx.groupScale;
  // The button's frame classes resolve from an `aui` whose `scale` is the resolved item scale, so the
  // pressable box (`aui-scale-no-padding-<tier>`) follows the group scale too (D15 #1). Consumer `aui`
  // (color/paint/states/sx) is spread through unchanged; only `scale` is synthesized where unset.
  const effectiveAui: CardGroupItemAui = { ...aui, scale: itemScale };
  // The Item IS a native <button> (the Base UI Toggle). Keyboard activation comes from Base UI's
  // composite-item `useButton`: SPACE calls `currentTarget.click()` (useButton.js:113-124); ENTER is
  // left to the browser's native button activation. Do NOT add a manual onKeyDown→toggle here — it would
  // DOUBLE-FIRE Enter in a real browser (native activation + the handler). Enter is verified live (Lane 7);
  // jsdom does not synthesize native Enter activation, so the unit test covers Space only.
  const button = React.createElement(
    TogglePrimitive as React.ElementType,
    {
      ref,
      value,
      disabled,
      ...rest,
      // INDETERMINATE (D8-8b): stamp `data-indeterminate` + set `aria-pressed="mixed"`. The installed
      // Toggle sets `aria-pressed: pressed` (boolean) as the FIRST entry of its props array with the
      // consumer's `elementProps` AFTER it (Toggle.js:77-97) — Base UI mergeProps is LATER-WINS, so this
      // `aria-pressed` (part of elementProps) OVERRIDES Base UI's boolean cleanly (no competing role).
      // Spread AFTER `...rest` so the mixed value is authoritative (indeterminate is our display contract).
      ...(indeterminate ? { 'data-indeterminate': '', 'aria-pressed': 'mixed' as const } : {}),
      // The Toggle resolves this className function with its render state `{ pressed, disabled }` — the
      // View/List.Item precedent (resolve buildLeafClasses at paint time). `indeterminate` (a display
      // prop) WINS the state resolution, else `pressed` → `selected`; `disabled` flips to the disabled
      // cell. The chroma + marker land on the pressable root; the consumer className wins last.
      className: (state: { pressed?: boolean; disabled?: boolean }) =>
        mergeAuiClasses([
          // D31 — per-display item defaults: pass the group `display` so the item resolves the grid (soft
          // surface-alt) or list (square surface) cells; a consumer `aui`/`states` still wins per axis.
          buildCardGroupItemClasses(effectiveAui, !!state?.pressed, !!state?.disabled, !!indeterminate, ctx.display),
          STATE_LAYER_CLASSES,
          userClassName,
        ]),
    },
    // Seed the item-scale cascade for the mirrored parts (D6). Context.Provider renders no DOM, so the
    // Item button's direct flex children stay the composed parts (the list-mode row flip is unaffected).
    React.createElement(CardGroupItemContext.Provider, { value: { scale: itemScale } }, children),
  );

  // NO `actions` → return the button UNWRAPPED: every CardGroup shipped before G20 keeps a
  // byte-identical DOM (the button stays the grid cell, the list-mode row flip is untouched).
  if (actions == null) return button;

  // With actions, the SHELL becomes the grid cell and the button stretches to fill it, so the tile's
  // geometry is unchanged; the actions layer over the button's trailing edge (positioned in
  // `_state-cascade.scss`). The shell is presentational — it carries no role and no handlers, so the
  // Toggle keeps sole ownership of activation, and Base UI's composite reaches the button by context,
  // not by direct-child position.
  return React.createElement(
    'div',
    { className: 'aui-card-group-item-shell', 'data-aui-card-group-item-shell': '' },
    button,
    React.createElement(
      'div',
      { className: 'aui-card-group-item-actions', 'data-aui-card-group-item-actions': '' },
      actions,
    ),
  );
});
CardGroupItem.displayName = 'CardGroup.Item';

// ─── Mirrored item parts (D6) — the Card anatomy re-exposed under the CardGroup.Item* namespace ────
// Each mirrors the corresponding Card part so the group/item cascade reaches the item internals through
// the aui layer, and each carries a SCOPED `.aui-card-group-item-<part>` marker (a per-part, selection-
// aware CSS hook — `.aui-card-group-item[data-pressed] .aui-card-group-item-<part>` — that can never leak
// to a standalone Card, unlike the shared `.aui-card-*` classes). The raw Card.* composition inside an
// Item KEEPS WORKING (back-compat); these are the CANONICAL documented parts.
//
// EXTENDS vs ALIAS (Phase A classification, run log 2026-07-12):
//   • ItemBody / ItemImageContainer — EXTEND: forward-and-extend `aui.scale` from the item context
//     (the ONE gated merge — consumer `aui.scale` wins; L45 forward, L47/L49 gate). Card.Body/
//     ImageContainer are cascade-readers that read CardContext.scale, which is the default inside a
//     Toggle — this thread is the fix (Phase A row b).
//   • ItemImage — PARTIAL: marker + verbatim `aui` forward; the placeholder-glyph scale can't be
//     threaded (Card.Image reads CardContext.scale directly, its `aui` is `{shape}` only, Card
//     un-editable). See the consume-doc gotcha.
//   • ItemHeader / ItemContent / ItemAction / ItemFooter / ItemTitle / ItemDescription — ALIAS + hook:
//     these Card parts consume no group/item cascade even inside a real Card, so faithful parity is a
//     marker + verbatim forward (L45 — never reconstruct the child's aui); the marker is the value.

/** Forward-and-extend the item-scale cascade into a Card cascade-reader part's `aui` (Body /
 *  ImageContainer). Spread the consumer's `aui` THROUGH and synthesize `scale` ONLY where the consumer
 *  didn't set it — the SINGLE gated merge (L45 forward, L47/L49 gate: consumer own wins). */
function extendItemScaleAui<T extends { scale?: CardGroupScale }>(
  aui: T | undefined,
  scale: CardGroupScale,
): T {
  return { ...(aui as T), scale: aui?.scale ?? scale };
}

/** Whether the consumer's `aui` explicitly paints the part's own surface (D11) — a `color` or `paint`
 *  axis. When true the D7 `aui-bg-transparent` hover-default is dropped so the painted cell wins. */
function auiPaintsOwnSurface(aui: { color?: unknown; paint?: unknown } | undefined): boolean {
  return aui?.color !== undefined || aui?.paint !== undefined;
}

export type CardGroupItemImageProps = CardImageProps;
export type CardGroupItemImageContainerProps = CardImageContainerProps;
export type CardGroupItemBodyProps = CardBodyProps;
export type CardGroupItemHeaderProps = CardHeaderProps;
export type CardGroupItemTitleProps = CardTitleProps;
export type CardGroupItemDescriptionProps = CardDescriptionProps;
export type CardGroupItemActionProps = CardActionProps;
export type CardGroupItemContentProps = CardContentProps;
export type CardGroupItemFooterProps = CardFooterProps;

const CardGroupItemImageContainer = React.forwardRef<HTMLDivElement, CardGroupItemImageContainerProps>(
  function CardGroupItemImageContainer({ aui, className, ...rest }, ref) {
    const scale = useCardGroupItemScale();
    const extended = extendItemScaleAui<CardImageContainerAui>(aui, scale);
    return React.createElement(Card.ImageContainer, {
      ref,
      ...rest,
      aui: extended,
      // `aui-bg-transparent` (D7-7a): this mirror is an `.aui-frame` inside the pressable Item and would
      // otherwise INHERIT + PAINT the item's `--aui-bg: surface` (inherits:true, G18), hiding the Item's
      // `.aui-stateful::after` hover tint (z-index:-1, under content) → a hover patchwork. Resetting the
      // inherited surface to transparent lets the whole item tint as ONE surface (bare List.Item/View
      // parity). GATED (D11): a DEFAULT only — when the consumer sets `aui.color`/`aui.paint` they WANT a
      // painted media frame, so let their cell win (painting opts out of the uniform-hover default).
      className: mergeAuiClasses([
        'aui-card-group-item-image-container',
        auiPaintsOwnSurface(aui) ? undefined : 'aui-bg-transparent',
        className,
      ]),
    });
  },
);
CardGroupItemImageContainer.displayName = 'CardGroup.ItemImageContainer';

const CardGroupItemImage = React.forwardRef<HTMLSpanElement, CardGroupItemImageProps>(
  function CardGroupItemImage({ className, placeholder, ...rest }, ref) {
    const scale = useCardGroupItemScale();
    // D17 — was PARTIAL (the placeholder glyph reads CardContext.scale, which the Item can't seed — it is a
    // Toggle, not a Card root — and CardContext is not exported, so we can't reach it). Instead INJECT a
    // scale-aware placeholder glyph via Card.Image's public `placeholder` prop (card.tsx:210 —
    // `placeholder ?? <default glyph>`), sized to the group/item scale, so an unspecified media tile's glyph
    // FOLLOWS the group scale. A consumer `placeholder` still WINS. The tile BOX stays ratio × cell-width — a
    // LAYOUT CONSTANT driven by the grid column count, not scale (the stated call; see the consume-doc).
    return React.createElement(Card.Image, {
      ref,
      ...rest,
      placeholder:
        placeholder ??
        React.createElement(ContainedIcon, {
          name: 'image',
          layer: 'monotone',
          aui: { scale },
          'aria-hidden': true,
          className: 'aui-card-image-glyph',
        }),
      className: mergeAuiClasses(['aui-card-group-item-image', className]),
    });
  },
);
CardGroupItemImage.displayName = 'CardGroup.ItemImage';

const CardGroupItemBody = React.forwardRef<HTMLDivElement, CardGroupItemBodyProps>(
  function CardGroupItemBody({ aui, className, ...rest }, ref) {
    const scale = useCardGroupItemScale();
    const extended = extendItemScaleAui<CardBodyAui>(aui, scale);
    return React.createElement(Card.Body, {
      ref,
      ...rest,
      aui: extended,
      // `aui-bg-transparent` (D7-7a, GATED D11): see CardGroup.ItemImageContainer — a DEFAULT transparent
      // reset so the body doesn't paint the inherited item `--aui-bg` and hide the item hover tint; a
      // consumer `aui.color`/`aui.paint` (a deliberate body surface) overrides it.
      className: mergeAuiClasses([
        'aui-card-group-item-body',
        auiPaintsOwnSurface(aui) ? undefined : 'aui-bg-transparent',
        className,
      ]),
    });
  },
);
CardGroupItemBody.displayName = 'CardGroup.ItemBody';

const CardGroupItemHeader = React.forwardRef<HTMLDivElement, CardGroupItemHeaderProps>(
  function CardGroupItemHeader({ className, ...rest }, ref) {
    return React.createElement(Card.Header, {
      ref,
      ...rest,
      className: mergeAuiClasses(['aui-card-group-item-header', className]),
    });
  },
);
CardGroupItemHeader.displayName = 'CardGroup.ItemHeader';

// D17 — ItemTitle/ItemDescription RECLASSIFIED from ALIAS to EXTENDS-scale. Card.Title/Description PIN a
// typescale role (`l3`/`p2` — a FIXED 16px font-size, card.tsx:289/308), so an unspecified card's text did
// NOT follow the group scale. Instead we render `Type` with the role UNSET by default: with no role, the
// text inherits `--aui-font-size-context` (+ the full per-tier typography metrics) from the item/group scale
// cell — l4 (xs) / l3 (sm, == the old 16px, no regression) / h5 (xl) — so it FOLLOWS the group scale (the
// GroupLabel precedent, _state-cascade.scss:1039; NOT a scale→role mapping, so the scale-vs-typescale law
// holds). A consumer `role` (or `aui.sx.fontSize`) still WINS — a real typescale class beats the inherited
// context. The `aui-card-title`/`aui-card-description` markers are kept (header flex + the description's
// muted color live there, _state-cascade.scss:431-438).
const CardGroupItemTitle = React.forwardRef<HTMLElement, CardGroupItemTitleProps>(
  function CardGroupItemTitle({ className, ...rest }, ref) {
    return React.createElement(Type, {
      ref,
      ...rest,
      className: mergeAuiClasses(['aui-card-title', 'aui-card-group-item-title', className]),
    });
  },
);
CardGroupItemTitle.displayName = 'CardGroup.ItemTitle';

const CardGroupItemDescription = React.forwardRef<HTMLElement, CardGroupItemDescriptionProps>(
  function CardGroupItemDescription({ className, ...rest }, ref) {
    return React.createElement(Type, {
      ref,
      ...rest,
      className: mergeAuiClasses(['aui-card-description', 'aui-card-group-item-description', className]),
    });
  },
);
CardGroupItemDescription.displayName = 'CardGroup.ItemDescription';

const CardGroupItemAction = React.forwardRef<HTMLDivElement, CardGroupItemActionProps>(
  function CardGroupItemAction({ className, ...rest }, ref) {
    return React.createElement(Card.Action, {
      ref,
      ...rest,
      className: mergeAuiClasses(['aui-card-group-item-action', className]),
    });
  },
);
CardGroupItemAction.displayName = 'CardGroup.ItemAction';

const CardGroupItemContent = React.forwardRef<HTMLDivElement, CardGroupItemContentProps>(
  function CardGroupItemContent({ className, ...rest }, ref) {
    return React.createElement(Card.Content, {
      ref,
      ...rest,
      className: mergeAuiClasses(['aui-card-group-item-content', className]),
    });
  },
);
CardGroupItemContent.displayName = 'CardGroup.ItemContent';

const CardGroupItemFooter = React.forwardRef<HTMLDivElement, CardGroupItemFooterProps>(
  function CardGroupItemFooter({ className, ...rest }, ref) {
    return React.createElement(Card.Footer, {
      ref,
      ...rest,
      className: mergeAuiClasses(['aui-card-group-item-footer', className]),
    });
  },
);
CardGroupItemFooter.displayName = 'CardGroup.ItemFooter';

// ─── The ONE Item walk (A3) — Fragment-unwrapping, shared by the render-filter AND the count ───────
// Recurse through Fragments (rebuilding them so their `key` survives), keep each `CardGroup.Item` whose
// `textValue` still `matches`, drop the rest, and pass every OTHER node through untouched. The render
// (below) calls this with `ctx.matches`; the Root's textValue collector (further down) calls it with a
// recording, always-true matcher — so the SAME traversal decides both "is this Item visible?" and "how
// many Items exist?", and a Fragment-wrapped Item can never desync (Empty shown while its items still
// render). NOTE: a non-Fragment wrapper element is NOT recursed into — its Items stay invisible to the
// filter (documented in the consume-doc Gotchas: Items children must be flat Items / arrays / Fragments).
function filterCardGroupItems(
  nodes: React.ReactNode,
  matches: (textValue?: string) => boolean,
): React.ReactNode {
  return React.Children.map(nodes, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === React.Fragment) {
      return React.cloneElement(
        child as React.ReactElement<{ children?: React.ReactNode }>,
        {},
        filterCardGroupItems((child.props as { children?: React.ReactNode }).children, matches),
      );
    }
    if (child.type === CardGroupItem) {
      return matches((child.props as CardGroupItemProps).textValue) ? child : null;
    }
    return child;
  });
}

// ─── CardGroup.Items — the layout container (grid ↔ stack via a pure SCSS context flip) ───────────
export interface CardGroupItemsProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Card-display grid column count. DEFAULT `3` (D7) → `repeat(columns, minmax(0,1fr))`. Ignored in
   *  list display (a single stacked column). */
  columns?: number;
  /** Number of VISIBLE rows before the scroll viewport clips (DEFAULT `3`, D7). The viewport height is
   *  DERIVED by measuring the first grid row (variable item heights) — see below. An explicit `maxHeight`
   *  WINS over this. Applies in BOTH card AND list display (D12 fix): in list a "row" is one stacked item,
   *  so `rows` visible items then scroll. */
  rows?: number;
  /** Explicit max height of the scroll viewport (the fleet ScrollArea bound; a NUMBER is px). When set it
   *  WINS over the `rows` derivation (mirrors Autocomplete.Popup's `maxHeight`). */
  maxHeight?: number | string;
  /** Resting scrollbar-thumb color, threaded to the DS ScrollArea. */
  scrollbarColor?: ScrollAreaThumbColor;
  /** The Items surface (D28) — the FULL 7-axis frame appearance + full-frame `sx`. Internally ROUTED
   *  (D29, documented): the SURFACE axes (color/paint/profile/shape/elevation/scale) paint the SCROLL-HOST
   *  TRAY (a fixed-surface / default-profile bordered tray by DEFAULT — its profile padding is the shadow
   *  gutter); `sx` lands on the inner GRID (layout — min-height, gaps). Consumer values win per axis.
   *  `scale` defaults to the group scale. The `columns`/`rows`/`maxHeight` props are unchanged. */
  aui?: CardGroupItemsAui;
}

const CardGroupItems = React.forwardRef<HTMLDivElement, CardGroupItemsProps>(function CardGroupItems(
  { className, children, columns, rows, maxHeight, scrollbarColor, aui, style, onKeyDown, ...rest },
  ref,
) {
  const ctx = useCardGroupContext('CardGroup.Items');
  // ── The Items surface (D28/D29) — ONE `aui`, split by internal routing ──────────────────────────────
  // SURFACE axes (color/paint/profile/shape/elevation/scale) → the SCROLL-HOST TRAY (fixed-surface /
  // default-profile bordered tray by default, D29); `sx` → the inner GRID (layout). `scale` defaults to the
  // GROUP scale so the tray density tracks the group (the Search/ViewToggle rail precedent). The consumer
  // sees ONE `aui` prop; the split is internal (documented in the consume-doc).
  const { sx: itemsSx, ...itemsSurface } = aui ?? {};
  const trayClasses = buildCardGroupItemsTrayClasses({
    ...itemsSurface,
    scale: itemsSurface.scale ?? ctx.groupScale,
    // Per-display tray profile: LIST = `block-padding` (vertical breathing room, rows span the full tray
    // width, D31); GRID = `equal-padding` (a uniform inset all round, D33 — SUPERSEDES D29's `default` for
    // grid; the fixed-surface paint stands). Consumer `aui.profile` still wins (the `??`).
    profile: itemsSurface.profile ?? (ctx.display === 'list' ? 'block-padding' : 'equal-padding'),
  });
  // The GRID carries the routed layout `sx`. sx utilities set `--aui-*` hooks the `.aui-frame` base reads,
  // so the grid becomes an `.aui-frame` ONLY when `sx` is set (a consumer NOT using Items sx keeps the exact
  // prior grid — zero blast radius). `.aui-frame` sets NO `display` (verified _component-tokens.scss:127),
  // so the `.aui-card-group-items` `display:grid`/`flex` stays; the grid gap rules are real selectors
  // (`_state-cascade.scss`) so the `gap` shorthand beats the frame's row/column-gap longhands while still
  // yielding to a consumer `sx.gap` (which sets `--aui-gap`).
  const gridSxClasses = itemsSx ? buildStyleProps(expandShorthands(itemsSx)) : '';
  // Client-side filter over COMPOSED CHILDREN via the shared Fragment-unwrapping walk (A3 —
  // `filterCardGroupItems`, the SAME traversal the Root's count uses, so the two never desync).
  // This is the deliberate divergence from Autocomplete (mission §5b): Autocomplete's items are
  // Base-UI-managed list entries the primitive filters; CardGroup's items are arbitrary composed Cards
  // with no managing list, so the wrapper owns the filter. A non-matching Item UNMOUNTS (pre-decided).
  // Selection is unaffected — it lives in the ToggleGroup value, not the mounted set — so a filtered-out
  // selected item stays selected and re-appears selected when the filter clears.
  const filtered = filterCardGroupItems(children, ctx.matches);

  // COLUMNS (D7): an inline var the SCSS card grid reads (`repeat(var(--aui-card-group-columns,3),…)`).
  const columnCount = columns ?? CARD_GROUP_DEFAULT_COLUMNS;
  const rowCount = rows ?? CARD_GROUP_DEFAULT_ROWS;
  const explicitMax =
    maxHeight != null ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined;

  // ROWS (D7): derive the viewport height from N visible rows. Variable item heights → MEASURE the first
  // grid row's border-box height + the computed row-gap at layout time and multiply (a gallery row is
  // uniform — the grid stretches a row to its tallest item). Only when NO explicit `maxHeight` AND card
  // display AND a positive `rows`. An explicit `maxHeight` short-circuits this. (radio-group SSR-safe
  // iso-layout-effect + a ResizeObserver, so a responsive column resize re-derives.)
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const setGridRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      gridRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );
  const [derivedMax, setDerivedMax] = React.useState<string | undefined>(undefined);
  // D12 FIX: the `rows` viewport bound applies in BOTH card AND list display — it was gated to
  // `ctx.display === 'card'`, which left LIST display UNBOUNDED (maxBlockSize `none`) so a long list never
  // scrolled. The measurement reads the first grid child's height + the actual row-gap in EITHER layout
  // (card row-0 item, or the first stacked list item), so the same derivation bounds both. `ctx.display`
  // is a dep so the flip re-measures immediately (a list row is a different height than a card row).
  const deriveFromRows = explicitMax == null && rowCount > 0;
  useIsoLayoutEffect(() => {
    if (!deriveFromRows) {
      setDerivedMax(undefined);
      return;
    }
    // Structural DOM shapes (the build tsconfig has no `lib: dom` — the textarea-resize pattern).
    const grid = gridRef.current as unknown as MeasureGrid | null;
    if (!grid) return;
    const cssOf = (globalThis as { getComputedStyle?: (el: unknown) => { rowGap?: string } }).getComputedStyle;
    const measure = () => {
      const items = grid.children;
      if (!items.length) {
        setDerivedMax(undefined);
        return;
      }
      const firstRowH = items[0].getBoundingClientRect().height;
      if (!firstRowH) return;
      const rowGap = parseFloat(cssOf?.(grid).rowGap ?? '0') || 0;
      setDerivedMax(`${rowCount * firstRowH + (rowCount - 1) * rowGap}px`);
    };
    measure();
    const RO = (globalThis as { ResizeObserver?: new (cb: () => void) => ResizeObserverLike }).ResizeObserver;
    if (!RO) return;
    const ro = new RO(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [deriveFromRows, rowCount, columnCount, ctx.display]);
  const maxBlockSize = explicitMax ?? derivedMax;

  // 2D ARROW NAVIGATION (D10) — ArrowUp/Down move VERTICALLY; Left/Right/Home/End stay Base UI's. The
  // installed ToggleGroup Composite runs at orientation='horizontal' and does NOT consume Up/Down (they
  // aren't in its forward/backward/prevented keys → no move, no preventDefault; useCompositeRoot.js:163-211),
  // so we own them WITHOUT fighting. TARGET = the current visible index ± the column count (D7's explicit
  // `columns`, so NO geometry measurement) — `1` in list display (linear prev/next). DISABLED items are
  // SKIPPED by CONTINUING in the same vertical direction (Composite's own skip-in-direction). EDGES CLAMP
  // (no wrap). `.focus()` on the target fires the CompositeItem's `onFocus` → `onHighlightedIndexChange`
  // (useCompositeItem.js:28-30) → the roving tabindex FOLLOWS automatically (no competing focus system).
  const handleGridKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      (onKeyDown as ((e: React.KeyboardEvent<HTMLDivElement>) => void) | undefined)?.(event);
      if (event.defaultPrevented) return;
      const key = event.key;
      if (key !== 'ArrowUp' && key !== 'ArrowDown') return;
      const grid = gridRef.current as unknown as NavGrid | null;
      const active = (globalThis as { document?: { activeElement?: NavItem } }).document?.activeElement;
      if (!grid || !active) return;
      const nodes = grid.querySelectorAll('.aui-card-group-item');
      const items: NavItem[] = [];
      for (let i = 0; i < nodes.length; i += 1) items.push(nodes[i]);
      const current = items.indexOf(active);
      if (current === -1) return; // focus isn't on an item in this grid
      const cols = ctx.display === 'list' ? 1 : columnCount;
      const step = (key === 'ArrowDown' ? 1 : -1) * cols;
      let target = current + step;
      while (target >= 0 && target < items.length && navItemDisabled(items[target])) target += step;
      if (target < 0 || target >= items.length) return; // CLAMP at the grid edge (no enabled target)
      event.preventDefault(); // stop the page from scrolling; the roving focus moves instead
      items[target].focus();
    },
    [onKeyDown, ctx.display, columnCount],
  );

  // The grid/stack container: the display flip is CONTEXT + CASCADE — one `data-display` hook, the
  // geometry flip lives in `_state-cascade.scss` (grid under card, stacked rows under list). The SAME
  // Card composition re-lays; NO second render tree. `--aui-card-group-columns` drives the card grid.
  // `onKeyDown` (D10) intercepts Up/Down as the item keydown bubbles here — BEFORE the group's Composite
  // root handler (bubbling is inner→outer), which no-ops on Up/Down anyway.
  // D30 — when the search filter zeroed the set AND a `CardGroup.Empty` is composed (hoisted to
  // `ctx.emptyNode`), render the Empty INSIDE the grid (an absolute overlay, `.aui-card-group-items--empty`
  // makes the grid a positioned containing block + a min-height floor) so it FILLS the Items bound region
  // (the consumer floor via Items `sx.minBlockSize`, or the default) and CENTERS — the Autocomplete.Empty
  // precedent, "Empty centers within the padded tray". The sibling `<CardGroup.Empty>` renders null.
  const showEmpty = !ctx.anyVisible && ctx.emptyNode != null;
  const emptyOverlay = showEmpty
    ? React.createElement('div', { className: 'aui-card-group-empty' }, ctx.emptyNode)
    : null;
  const grid = React.createElement(
    'div',
    {
      ref: setGridRef,
      ...rest,
      onKeyDown: handleGridKeyDown,
      className: mergeAuiClasses([
        'aui-card-group-items',
        showEmpty ? 'aui-card-group-items--empty' : undefined,
        // D28: `aui-frame` (only when Items `sx` is set) makes the grid read the `--aui-*` sx hooks; the
        // routed layout sx classes follow. No sx → no frame → the prior grid, untouched.
        itemsSx ? 'aui-frame' : undefined,
        gridSxClasses || undefined,
        typeof className === 'string' ? className : undefined,
      ]),
      'data-display': ctx.display,
      style: { ...(style as React.CSSProperties), '--aui-card-group-columns': columnCount } as React.CSSProperties,
    },
    filtered,
    emptyOverlay,
  );
  // The scrolling viewport composes the DS ScrollArea in BYTE-PARITY with the fleet popup family —
  // Autocomplete.Popup (`autocomplete.tsx:452-465`) + the non-popup Autocomplete.InlineCard
  // (`autocomplete.tsx:656-672`): the RAW Base UI `ScrollArea.Root` (NOT the painted `View.ScrollArea`
  // Root — a transparent Items region needs an unpainted scroll host, so we compose the raw Root + the
  // DS Viewport/Scrollbar parts exactly as the popup family does, rather than neutralize a paint) wraps
  // `View.ScrollAreaViewport` (which owns the scroll cap + clips the cross-axis) + a vertical
  // `View.ScrollAreaScrollbar` (auto-Thumb). HEIGHT BOUND (D7): explicit `maxHeight` WINS, else the
  // `rows` derivation bounds it to N visible rows (default 3). CardGroup has no floating anchor, so the
  // popup's `min(--available-height, … − padding)` expression collapses to this plain block-size.
  return React.createElement(
    ScrollAreaPrimitive.Root as React.ElementType,
    {
      // D28/D29 — the scroll host is the TRAY: painted via the frame CLASSES (fixed-surface / default-profile
      // by default), NOT a View.ScrollArea swap (L51 structure kept — the raw Root stays; it now carries the
      // paint classes). The surface axes of the Items `aui` resolve here; `sx` is routed to the grid above.
      className: trayClasses,
      // D24 — REMOUNT the ScrollArea on a display flip (`key`). ROOT CAUSE: Base UI's ScrollArea observes
      // the VIEWPORT for resize (`ScrollAreaViewport.js:277` `resizeObserver.observe(viewport)`), NOT the
      // content — so when the viewport height is FIXED (a consumer `maxHeight`, or a grid that exactly fills
      // the rows-bound) a card↔list flip changes the CONTENT's scrollHeight WITHOUT resizing the observed
      // node, and the scrollbar's overflow/hidden state (and its absolute-overlay paint) can go STALE. The
      // primitive genuinely can't observe this transition, so re-key it on `display`: React tears down the
      // old ScrollArea (fresh mount-time overflow eval + a fresh paint of the overlay) and mounts one for the
      // new display — the scrollbar mounts only if the NEW display overflows. Cheap (the grid re-lays on flip
      // anyway); scroll position resetting to top on a display switch is the correct behaviour.
      key: ctx.display,
    },
    React.createElement(
      ViewScrollAreaViewport,
      {
        style: {
          ...(maxBlockSize ? { maxBlockSize } : {}),
          overflowX: 'hidden',
        } as React.CSSProperties,
      },
      grid,
    ),
    React.createElement(ViewScrollAreaScrollbar, {
      orientation: 'vertical',
      ...(scrollbarColor ? { thumbColor: scrollbarColor } : {}),
    }),
  );
});
CardGroupItems.displayName = 'CardGroup.Items';

// ─── CardGroup.Search — Field-built client-side filter over Item textValue (D7-7b, D16 clear) ─────
// Composes the FIELD component in the ONE sanctioned projection (field.md:73-75): a `Field.Control` row
// frame hosting a leading `Field.Icon` (magnifying-glass) + a `Field.Input type="search"` + a TRAILING
// `Field.Button` clear (D16) — Field.Input IS the single Base UI Field.Control (one control layer, never
// nested). The controlled query still lives in CardGroupContext; Field.Input's value/onChange write it.
// Renders no bare Input anymore.
//
// D16 — the CLEAR (trailing X) is the FIELD's own convention (field.md:64-65, 181), the strongest
// precedent since Search IS a Field (stronger than Autocomplete.Clear, which is opt-in only because
// Autocomplete EXPOSES its InputGroup parts). CardGroup.Search SEALS the Field, so the clear is
// AUTOMATIC (symmetric to the auto leading icon) — the consumer can't compose into the sealed control.
// It ships with NO `onClick`: the default `Field.Button` handler (`clearNearestFieldControl`,
// field.tsx:369) sets the input value via the native prototype setter + dispatches a bubbling `input`
// event (so React's `onChange` → `ctx.setQuery('')` fires — the CONTROLLED query path) THEN refocuses
// the input (no focus steal — the filter no-steal discipline). Visibility is the Field's `data-aui-filled`
// rule: shown only when the query is non-empty, its box RESERVED so revealing it never reflows the input
// (`_state-cascade.scss:4011`). `contained` profile → it fits the 28px rail (the D13 sizing contract).
export type CardGroupSearchProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'type' | 'color'> & {
  /** Custom leading adornment (default: a magnifying-glass Field.Icon). */
  icon?: React.ReactNode;
};

const CardGroupSearch = React.forwardRef<HTMLInputElement, CardGroupSearchProps>(function CardGroupSearch(
  { className, onChange, icon, ...rest },
  ref,
) {
  const ctx = useCardGroupContext('CardGroup.Search');
  return React.createElement(
    Field,
    {
      // D15: the Search rail follows the GROUP scale. `--aui-min-height` is inherits:false, so the rail
      // can't cascade via CSS — seed the Field per-part cascade (FieldAuiContext) with the group scale;
      // Field.Control + Field.Input resolve their own scale from it (`own ?? inherited ?? default`,
      // field-context.tsx:147), so the whole search rail tracks the density.
      aui: { scale: ctx.groupScale },
      className: mergeAuiClasses([
        'aui-card-group-search',
        typeof className === 'string' ? className : undefined,
      ]),
    },
    React.createElement(
      Field.Control,
      null,
      // Leading search glyph (aria-hidden — the input carries the accessible name). Field.Icon before
      // Field.Input = a LEADING adornment (adornment order is DOM order, field.md:59).
      icon ?? React.createElement(Field.Icon, { name: 'magnifying-glass', 'aria-hidden': true }),
      React.createElement(Field.Input as React.ElementType, {
        ref,
        type: 'search',
        // Default accessible name for the searchbox (WCAG 4.1.2) — placed BEFORE `...rest` so a consumer
        // `aria-label`/`aria-labelledby` still wins.
        'aria-label': 'Search',
        ...rest,
        value: ctx.query,
        // The lib compiles without full lib.dom, so read the value off the target via a narrow cast.
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          ctx.setQuery((event.target as unknown as { value: string }).value);
          (onChange as ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined)?.(event);
        },
      }),
      // Trailing CLEAR (D16). AFTER Field.Input = a trailing adornment (DOM order, field.md:59). No
      // `onClick` → the default clear runs: native-setter reset + bubbling `input` → `ctx.setQuery('')`
      // (items restored) + refocus. Auto-hidden until `data-aui-filled` (query non-empty), box reserved.
      React.createElement(
        Field.Button,
        { 'aria-label': 'Clear' },
        React.createElement(Field.ButtonIcon, { name: 'xmark' }),
      ),
    ),
  );
});
CardGroupSearch.displayName = 'CardGroup.Search';

// ─── CardGroup.ViewToggle — the card/list display switcher (D13: stateful options + wrapper aui) ───
/** The ViewToggle appearance (D13): the WRAPPER frame-part surface (frame axes + `sx`) PLUS the option
 *  per-state `states` (the SELECTED/UNSELECTED option treatment). Wrapper axes style the container; the
 *  `states` slot styles the two option buttons — a clean split. */
export type CardGroupViewToggleAui = PartAuiSlot & { states?: AuiStates };

export interface CardGroupViewToggleProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'color'> {
  /** Accessible label for the card-display button (default 'Card view'). */
  cardLabel?: string;
  /** Accessible label for the list-display button (default 'List view'). */
  listLabel?: string;
  /** Wrapper frame-part surface (axes + `sx`) + `states` for the SELECTED/UNSELECTED option treatment. */
  aui?: CardGroupViewToggleAui;
}

// D18a + amendment (user, SUPERSEDES the D13 raised/solid AND the interim solid-primary pins — dead): the
// active segment is a SECONDARY filled chip ({ paint:'solid', color:'secondary' } → `aui-color-solid-secondary`)
// — distinct from the cards' tonal-primary selected, reading as the secondary fill against the fixed-surface
// tray. UNSELECTED stays a quiet ghost icon (transparent box, content-colored glyph) so the fill stands out.
const VIEW_OPTION_SELECTED: IconButtonAui = { color: 'secondary', paint: 'solid' };
const VIEW_OPTION_UNSELECTED: IconButtonAui = { color: 'surface', paint: 'text' };

/** The option's per-state aui (D13) — the ONE gated merge: per-state DEFAULT < consumer
 *  `aui.states[state]` (consumer wins per axis). Scale threaded from the group; `profile: 'contained'`
 *  so the option CONTAINS itself to the wrapper's rail (the Field InputButton precedent, D13-add-2 —
 *  `_state-cascade.scss:1877` "the InputButton is contained ~20 at sm → fits inside the 28 row") instead
 *  of the intrinsic square box that would inflate the rail. IconButton resolves the classes. */
function resolveViewOptionAui(
  selected: boolean,
  aui: CardGroupViewToggleAui | undefined,
  groupScale: CardGroupScale,
): IconButtonAui {
  const base = selected ? VIEW_OPTION_SELECTED : VIEW_OPTION_UNSELECTED;
  const override = aui?.states?.[selected ? 'selected' : 'unselected'] as IconButtonAui | undefined;
  return { scale: groupScale, profile: 'contained', ...base, ...override };
}

const CardGroupViewToggle = React.forwardRef<HTMLDivElement, CardGroupViewToggleProps>(
  function CardGroupViewToggle(
    { className, cardLabel = 'Card view', listLabel = 'List view', aui, ...rest },
    ref,
  ) {
    const ctx = useCardGroupContext('CardGroup.ViewToggle');
    // The WRAPPER is a LEAF frame (not a styleable part — a part emits `.aui-part` which zeros padding, and
    // the control rail IS padding + content; D13-add-1 finding). Its frame axes + `sx` paint/size the toggle
    // container; `states` is stripped here — it drives the OPTIONS, not the wrapper. PROFILE (D13-add-3):
    // the vocab default is `equal-padding` — the SAME block padding as `default` (so the wrapper stays the
    // 28px rail at sm, coherent with the Search rail) with a uniform inline inset around the options. PAINT
    // (D13-add-4): the vocab default is `fixed-surface` (a bordered card matching Field.Control). SCALE
    // (D13-add-1 + D15): `scale` is always seeded from the GROUP scale so the rail's block-size FOLLOWS the
    // density (sm 28 → md/lg per the cell), present even with no consumer aui; a consumer `aui.scale`/
    // `aui.profile`/`aui.color`/`aui.paint` still WINS (spread last).
    const wrapperAui = { scale: ctx.groupScale, ...(aui ? { ...aui, states: undefined } : {}) };
    const wrapperClasses = buildCardGroupViewToggleClasses(
      wrapperAui as Omit<typeof wrapperAui, 'states'>,
    );
    // Selected TRACKS `display` (single source, so controlled + uncontrolled both reflect it). Disabled
    // ripples from the group. Each option carries `aria-pressed` + a `data-selected` style hook.
    const cardSelected = ctx.display === 'card';
    return React.createElement(
      'div',
      {
        ref,
        role: 'group',
        // Default accessible name for the display-switcher group. BEFORE `...rest` so a consumer wins.
        'aria-label': 'Display',
        ...rest,
        // `wrapperClasses` already carries the `aui-card-group-view-toggle` marker (the vocab marker).
        className: mergeAuiClasses([
          wrapperClasses,
          typeof className === 'string' ? className : undefined,
        ]),
      },
      React.createElement(IconButton, {
        name: 'table-cells-large',
        'aria-label': cardLabel,
        'aria-pressed': cardSelected,
        disabled: ctx.disabled || undefined,
        aui: resolveViewOptionAui(cardSelected, aui, ctx.groupScale),
        onClick: () => ctx.setDisplay('card'),
      }),
      React.createElement(IconButton, {
        name: 'list',
        'aria-label': listLabel,
        'aria-pressed': !cardSelected,
        disabled: ctx.disabled || undefined,
        aui: resolveViewOptionAui(!cardSelected, aui, ctx.groupScale),
        onClick: () => ctx.setDisplay('list'),
      }),
    );
  },
);
CardGroupViewToggle.displayName = 'CardGroup.ViewToggle';

// ─── CardGroup.Toolbar — the one controls row (D7-7c): Search (grows) + ViewToggle (right) ────────
// A plain flex-row layout part so the canonical composition needs NOTHING outside the CardGroup
// namespace (the user's Figma controls rail: a search rail with the grid/list view toggles at its
// right). NO `role="toolbar"` — that would imply the Base UI Toolbar roving-focus contract we don't
// hand-roll; the composed searchbox + the ViewToggle group carry their own semantics. Named `Toolbar`
// (not `.Actions` — that fleet name is a footer action-BUTTON row, Dialog/AlertDialog).
export type CardGroupToolbarProps = React.ComponentPropsWithoutRef<'div'>;

const CardGroupToolbar = React.forwardRef<HTMLDivElement, CardGroupToolbarProps>(
  function CardGroupToolbar({ className, ...rest }, ref) {
    return React.createElement('div', {
      ref,
      ...rest,
      className: mergeAuiClasses([
        'aui-card-group-toolbar',
        typeof className === 'string' ? className : undefined,
      ]),
    });
  },
);
CardGroupToolbar.displayName = 'CardGroup.Toolbar';

// ─── CardGroup.Label — the group caption (D8-8c), auto-wiring aria-labelledby ──────────────────────
// The shipped `<Label>` (the RadioGroup.Label/CheckboxGroup.Label precedent) — it auto-registers its
// `labelId` into the Root's LabelableProvider (via `useLabel`, label.tsx:98-103). CardGroup wraps its
// body in a LabelableProvider and READS that `labelId` to apply `aria-labelledby` on the group root
// MANUALLY — because Base UI's ToggleGroup is NOT a labelable primitive (unlike RadioGroup, which applies
// labelId itself), exactly how RadioGroup.Description wires aria-describedby by hand. Inherits ONLY the
// group's resolved scale (own `aui.scale` wins); no role override — the plain Label typescale, matching
// RadioGroup.Label.
export type CardGroupLabelProps = LabelProps;

const CardGroupLabel = React.forwardRef<HTMLElement, CardGroupLabelProps>(function CardGroupLabel(
  { aui, ...rest },
  ref,
) {
  const ctx = useCardGroupContext('CardGroup.Label');
  // D14: the group caption DEFAULTS TO BOLD — the `aui.sx.typographyStyle` weight surface (the ergonomic
  // shortcut for the 645-Typography-Style `bold` cut; `label.spec.tsx:57` uses exactly this). A consumer
  // `aui.sx.typographyStyle` (or their own weight) WINS via the normal per-axis precedence (spread last).
  const mergedAui = React.useMemo<LabelAui | undefined>(
    () => ({
      ...aui,
      scale: aui?.scale ?? ctx.groupScale,
      sx: { typographyStyle: 'bold', ...(aui?.sx as Record<string, unknown>) } as LabelAui['sx'],
    }),
    [aui, ctx.groupScale],
  );
  return React.createElement(Label, { ref, ...rest, aui: mergedAui });
});
CardGroupLabel.displayName = 'CardGroup.Label';

// ─── CardGroup.Empty — the "no matches" presentation (Autocomplete.Empty precedent) ───────────────
// D30 — a declarative SLOT. The Root HOISTS this element's `children` into `ctx.emptyNode`, and
// CardGroup.Items renders them INSIDE the tray (an absolute overlay that fills the bound region + centers,
// so the message sits centered in the padded tray — not dangling below a floored empty grid). This
// component itself renders nothing; the message travels via the hoist. (SUPERSEDES the pre-D30 sibling
// render.)
const CardGroupEmpty = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function CardGroupEmpty() {
    useCardGroupContext('CardGroup.Empty'); // still enforce composition inside a <CardGroup>
    return null;
  },
);
CardGroupEmpty.displayName = 'CardGroup.Empty';

// ─── Child-walk: collect the Item textValues under the Items child (for the Empty presentation) ────
// Locate the Items child (Fragment-unwrapping), then read its Item children's `textValue`s THROUGH the
// SAME shared walk the render-filter uses (A3): a recording, always-true matcher captures every Item's
// `textValue` while traversing exactly as `filterCardGroupItems` does — so the Root's "any visible"
// count for the Empty part (a SIBLING of Items that can't otherwise see the match set) can never
// disagree with what the filter actually renders.
function collectItemTextValues(children: React.ReactNode): (string | undefined)[] {
  const out: (string | undefined)[] = [];
  const record = (textValue?: string): boolean => {
    out.push(textValue);
    return true;
  };
  const visitRoot = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === React.Fragment) {
        visitRoot((child.props as { children?: React.ReactNode }).children);
        return;
      }
      if (child.type === CardGroupItems) {
        filterCardGroupItems((child.props as CardGroupItemsProps).children, record);
      }
    });
  };
  visitRoot(children);
  return out;
}

// A6 (dev-only): detect a composed `CardGroup.Search` among the Root's children (Fragment-unwrapping),
// so the Root can warn when an Item is missing the `textValue` the search filter needs.
function hasSearchChild(children: React.ReactNode): boolean {
  let found = false;
  const visit = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (found || !React.isValidElement(child)) return;
      if (child.type === React.Fragment) {
        visit((child.props as { children?: React.ReactNode }).children);
        return;
      }
      if (child.type === CardGroupSearch) found = true;
    });
  };
  visit(children);
  return found;
}

// D30 — extract the composed `CardGroup.Empty`'s children (Fragment-unwrapping), so the Root can HOIST the
// "no matches" message into `ctx.emptyNode` and `CardGroup.Items` render it INSIDE the tray (filling +
// centered). Returns `undefined` when no Empty is composed. First Empty wins (one per group).
function collectEmptyNode(children: React.ReactNode): React.ReactNode {
  let node: React.ReactNode = undefined;
  const visit = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (node !== undefined || !React.isValidElement(child)) return;
      if (child.type === React.Fragment) {
        visit((child.props as { children?: React.ReactNode }).children);
        return;
      }
      if (child.type === CardGroupEmpty) {
        node = (child.props as { children?: React.ReactNode }).children ?? null;
      }
    });
  };
  visit(children);
  return node;
}

// ─── CardGroup (Root) — the ToggleGroup-backed group-surface frame ────────────────────────────────
// The frame is a `createAtomicComponent(ToggleGroupPrimitive)` wrapping the installed ToggleGroup (the
// RadioGroup/CheckboxGroup group-root pattern): role='group', roving tabindex, Home/End, data-multiple/
// -orientation/-disabled all come from Base UI; the recipe adds the transparent `.aui-frame` surface.
const _CardGroupFrame = createAtomicComponent(ToggleGroupPrimitive, {
  extensions: [useCardGroupRootRecipe],
});

export interface CardGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'defaultValue' | 'onChange'> {
  /** Selection value. NORMALIZED by mode (D4): `string | null` in single (default), `string[]` in
   *  multiple. Controlled counterpart of `defaultValue`. */
  value?: CardGroupValue;
  /** Uncontrolled initial selection. Same normalized shape as `value`. */
  defaultValue?: CardGroupValue;
  /** Fired with the NEXT normalized value: `string | null` in single mode, `string[]` in multiple. */
  onValueChange?: ((value: string | null) => void) | ((value: string[]) => void);
  /** `false` (default) = single-select (pressing replaces the selection; the previous unpresses);
   *  `true` = toggle membership. Maps to the installed ToggleGroup `multiple`. */
  multiple?: boolean;
  /** Disables the whole group (roving + activation); OR-merged into every item. */
  disabled?: boolean;
  /** Card-grid vs list display. DEFAULT `'card'`. Controlled with `onDisplayChange`, else internal. */
  display?: CardGroupDisplay;
  onDisplayChange?: (display: CardGroupDisplay) => void;
  /** The stateless group-surface frame appearance (full frame axes + `sx`). No `states`. */
  aui?: CardGroupRootAui;
}

const CardGroupRoot = React.forwardRef<HTMLDivElement, CardGroupProps>(function CardGroup(
  {
    value,
    defaultValue,
    onValueChange,
    multiple = false,
    disabled,
    display: displayProp,
    onDisplayChange,
    aui,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Display: controlled (`display` set) or uncontrolled (internal state, default 'card').
  const [displayState, setDisplayState] = React.useState<CardGroupDisplay>(displayProp ?? 'card');
  const display = displayProp ?? displayState;
  const setDisplay = React.useCallback(
    (next: CardGroupDisplay) => {
      if (displayProp === undefined) setDisplayState(next);
      onDisplayChange?.(next);
    },
    [displayProp, onDisplayChange],
  );

  // Search query (uncontrolled internal state; CardGroup.Search writes it).
  const [query, setQuery] = React.useState('');
  const trimmedQuery = query.trim().toLowerCase();
  const matches = React.useCallback(
    (textValue?: string) => {
      if (!trimmedQuery) return true;
      return (textValue ?? '').toLowerCase().includes(trimmedQuery);
    },
    [trimmedQuery],
  );
  const itemTextValues = collectItemTextValues(children);
  const anyVisible = itemTextValues.length === 0 ? true : itemTextValues.some((tv) => matches(tv));

  // A6 (dev-only): a textValue-less Item under Search matches the empty string and UNMOUNTS on the first
  // keystroke (it fails `''.includes(query)`), silently. Warn using the codebase's general dev-warn shape
  // (`process.env.NODE_ENV !== 'production'`, cf. autocomplete.tsx:729-735).
  if (
    process.env.NODE_ENV !== 'production' &&
    itemTextValues.some((tv) => tv === undefined) &&
    hasSearchChild(children)
  ) {
    console.warn(
      '[CardGroup] A CardGroup.Item is missing `textValue` while CardGroup.Search is composed — it ' +
        'matches the empty query and UNMOUNTS on the first keystroke. Give every searchable Item a `textValue`.',
    );
  }

  const groupScale: CardGroupScale = aui?.scale ?? CARD_GROUP_DEFAULT_SCALE;
  // D30 — hoist the composed CardGroup.Empty's content so CardGroup.Items can render it inside the tray.
  const emptyNode = collectEmptyNode(children);
  const ctx = React.useMemo<CardGroupContextValue>(
    () => ({ query, setQuery, display, setDisplay, matches, anyVisible, emptyNode, multiple, groupScale, disabled: !!disabled }),
    [query, display, setDisplay, matches, anyVisible, emptyNode, multiple, groupScale, disabled],
  );

  // Normalize the public value shape to the installed ToggleGroup's always-array value.
  const handleValueChange = React.useCallback(
    (groupValue: string[]) => {
      const next = fromGroupValue(groupValue, multiple);
      (onValueChange as ((v: string | string[] | null) => void) | undefined)?.(next);
    },
    [onValueChange, multiple],
  );

  const valueProps =
    value !== undefined
      ? { value: toGroupValue(value) }
      : { defaultValue: toGroupValue(defaultValue) };

  const frameProps: Record<string, unknown> = {
    ...rest,
    className,
    multiple,
    disabled,
    ...valueProps,
    onValueChange: handleValueChange,
    'data-display': display,
    aui,
  };

  // Wrap the body in a LabelableProvider (D8-8c) so a composed CardGroup.Label auto-registers its
  // `labelId`; CardGroupBody (inside the provider) reads it and applies aria-labelledby to the frame.
  return React.createElement(
    LabelableProvider,
    null,
    React.createElement(CardGroupBody, { frameProps, ctx, forwardedRef: ref, children }),
  );
});
CardGroupRoot.displayName = 'CardGroup';

// The frame body — INSIDE the LabelableProvider, so it can read the registered CardGroup.Label `labelId`
// and apply `aria-labelledby` to the group root (Base UI's ToggleGroup does NOT do this itself — the
// RadioGroup.Description manual-wiring pattern, radio-group.tsx:95-104). A consumer `aria-labelledby` (or
// a plain `aria-label`) in `frameProps` still wins.
interface CardGroupBodyProps {
  frameProps: Record<string, unknown>;
  ctx: CardGroupContextValue;
  forwardedRef: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}
function CardGroupBody({ frameProps, ctx, forwardedRef, children }: CardGroupBodyProps) {
  const { labelId } = useLabelableContext();
  const consumerLabelledBy = frameProps['aria-labelledby'] as string | undefined;
  const ariaLabelledBy = consumerLabelledBy ?? labelId;
  return React.createElement(
    _CardGroupFrame as React.ElementType,
    { ref: forwardedRef, ...frameProps, 'aria-labelledby': ariaLabelledBy },
    React.createElement(CardGroupContext.Provider, { value: ctx }, children),
  );
}

// ─── Namespace assembly (flat 2-level; Root is the callable object — no CardGroup.Root) ───────────
interface CardGroupComponent
  extends React.ForwardRefExoticComponent<CardGroupProps & React.RefAttributes<HTMLDivElement>> {
  Label: typeof CardGroupLabel;
  Toolbar: typeof CardGroupToolbar;
  Search: typeof CardGroupSearch;
  ViewToggle: typeof CardGroupViewToggle;
  Items: typeof CardGroupItems;
  Item: typeof CardGroupItem;
  Empty: typeof CardGroupEmpty;
  // The mirrored Card anatomy under the Item (D6) — the canonical item composition.
  ItemImageContainer: typeof CardGroupItemImageContainer;
  ItemImage: typeof CardGroupItemImage;
  ItemBody: typeof CardGroupItemBody;
  ItemHeader: typeof CardGroupItemHeader;
  ItemTitle: typeof CardGroupItemTitle;
  ItemDescription: typeof CardGroupItemDescription;
  ItemAction: typeof CardGroupItemAction;
  ItemContent: typeof CardGroupItemContent;
  ItemFooter: typeof CardGroupItemFooter;
}

export const CardGroup = Object.assign(CardGroupRoot, {
  Label: CardGroupLabel,
  Toolbar: CardGroupToolbar,
  Search: CardGroupSearch,
  ViewToggle: CardGroupViewToggle,
  Items: CardGroupItems,
  Item: CardGroupItem,
  Empty: CardGroupEmpty,
  ItemImageContainer: CardGroupItemImageContainer,
  ItemImage: CardGroupItemImage,
  ItemBody: CardGroupItemBody,
  ItemHeader: CardGroupItemHeader,
  ItemTitle: CardGroupItemTitle,
  ItemDescription: CardGroupItemDescription,
  ItemAction: CardGroupItemAction,
  ItemContent: CardGroupItemContent,
  ItemFooter: CardGroupItemFooter,
}) as CardGroupComponent;

export default CardGroup;
