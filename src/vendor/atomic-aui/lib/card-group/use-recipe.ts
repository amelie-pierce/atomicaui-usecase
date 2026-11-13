// modules/design/atomic-aui/src/lib/card-group/use-recipe.ts
//
// CardGroup — a selection-group container over rich Card content, wrapping Base UI ToggleGroup/Toggle.
// This module owns the two hand-authored vocabs + the class builders:
//   • CARD_GROUP_ROOT_VOCAB   — the group-surface FRAME (transparent cascade-reader, mirrors the
//                               RadioGroup/CheckboxGroup group-root: createAtomicComponent + a stateless
//                               vocab). The Root is a `.aui-frame` `<div role="group">` that paints
//                               nothing by default (the Card paint contract, mission §2).
//   • CARD_GROUP_ITEM_VOCAB   — the SELECTABLE leaf (toggleable). Unselected = the Card default surface;
//                               selected = { color:'raised', paint:'solid' } → `aui-color-solid-raised`
//                               (the fleet selected-item convention, 2026-07-11). Resolved through the
//                               ONE merge point `buildLeafClasses`, so a consumer `aui.states.selected`
//                               beats the default (the L45/L49 compose-don't-duplicate law).
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import {
  defineLeaf,
  type Appearance,
  type AuiStates,
} from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

export type CardGroupColor = AuiRecipeColor;
export type CardGroupPaint = AuiRecipePaint;
export type CardGroupScale = AuiRecipeScale;
export type CardGroupProfile = AuiScaleProfile;
export type CardGroupShape = AuiRecipeShape;
export type CardGroupElevation = AuiElevation;

/** The card/list display mode. NAMED `display` (never `mode`/`view`) — the 2026-07-11 Autocomplete
 *  lesson; `view` collides with the View component. */
export type CardGroupDisplay = 'card' | 'list';

// Scale matches Card (mission §2). The Root + Item both default to it.
export const CARD_GROUP_DEFAULT_SCALE: CardGroupScale = 'sm';

// Full frame `sx` surface for the Root + Item — exported so the Configurator/doc generation derives its
// knobs from the SAME allow-list as runtime (the no-missing-knobs standard).
export const CARD_GROUP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const CARD_GROUP_ITEM_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// ─── Root — the transparent group-surface frame ──────────────────────────────────────────────────
// A `cascadeReader` frame defaulting to `paint: 'text'` so an unstyled group shows NO box, just the
// stacked chrome + Items (the Card paint contract — no forced surface paint). `no-padding` profile: the
// Root is a bare wrapper; the Items container owns the grid/stack spacing. IDENTICAL in spirit to
// RADIO_GROUP_ROOT_VOCAB / CHECKBOX_GROUP_ROOT_VOCAB (transparent group-surface), minus the Field cascade
// (CardGroup does not seed a FieldAuiContext — its children are Cards, not field controls).
export const CARD_GROUP_ROOT_VOCAB = defineLeaf({
  marker: 'aui-card-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_GROUP_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: CARD_GROUP_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
  cascadeReader: true,
});

/** The unified `aui` shape for the Root — the FULL 7-axis frame appearance + full-frame `sx`. STATELESS
 *  (no `states`) — the Root is a layout frame, selection lives on the Item. */
export type CardGroupRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// Stateless PropHook for the factory. The ToggleGroup's own state axis is `disabled` (native,
// consumed by Base UI) — the recipe only strips `aui`.
export const useCardGroupRootRecipe = createVocabRecipe(CARD_GROUP_ROOT_VOCAB);

// ─── Item — the selectable leaf (toggleable) ─────────────────────────────────────────────────────
// Renders a Base UI Toggle (a native `<button>` with aria-pressed) THROUGH the shipped Card composition
// (Card parts compose as children). D18b RETUNE (user, amendment 4 — SUPERSEDES amendment 3's tonal-surface /
// tonal-primary; the elevations stand):
//   • UNSELECTED (the vocab defaults, no state entry) = { color:'surface', paint:'solid', elevation:2 } →
//     `aui-color-solid-surface` + `aui-elevation-2`. `solid` is BORDERLESS (paint contract — no inset
//     stroke): the clean floating card at elevation 2.
//   • SELECTED = { color:'raised', paint:'tonal', elevation:4 } → `aui-color-tonal-raised` + the lifted
//     `aui-elevation-4` — the RAISED-tinted TONAL cell (stroke + tint + on-raised fg), lifted over its
//     neighbours (amendment 5 — SUPERSEDES amendment 4's secondary COLOUR; the paint + elevation stand).
//     The D20 reservation keeps selection layout-neutral — the border is reserved in both states, so the
//     state observable is the border COLOUR re-colouring (surface→raised), not a width flip.
//   • INDETERMINATE (D8-8b) unchanged { color:'surface-alt', paint:'text' } — inherits elevation 2 from the
//     defaults (a mixed card floats like an unselected one).
// Verified cells: `aui-color-solid-surface` (tokens/generated/layer-2/_230-color.scss:120),
// `aui-color-tonal-raised` (:234), `aui-elevation-2`/`-4` (layer-3/_670-elevation.scss).
// Geometry is STABLE across states (no reflow on select — the elevation is a shadow/float, not a size).
// `no-padding` profile: the content padding comes from the composed Card.Body, exactly like the Card root.
// ─── D31 — PER-DISPLAY item defaults (SUPERSEDES the whole D18b amendment chain: tonal-raised, elev-2,
// elev-4 are DEAD; D26b's list elevation-zeroing is SUBSUMED — every cell is FLAT, elevation 0). The item
// paint is now DISPLAY-scoped: the GRID (card) reads soft-cornered surface-alt cells; the LIST reads
// square (shape:none) surface cells. Two vocabs — `buildCardGroupItemClasses` picks by the group's
// `display`. Both cells resolve through `buildLeafClasses` (vocab.defaults < vocab.states < aui <
// aui.states), so a consumer `aui`/`aui.states` STILL wins per axis in EITHER display (verified).
//
// WHY the recipe, not SCSS (D31 #1 reading): a display-scoped SCSS var override
// (`[data-display='list'] .aui-card-group-item { --aui-bg: … }`, 0,1,1) would BEAT a consumer's own
// `aui-color-solid-<x>` class (0,1,0) and VIOLATE "consumer wins". So the per-display DEFAULTS live in the
// vocab (a display-aware merge), where the consumer layers on top through the normal precedence.
//
// THE SELECTED READ (D31 #3): selected is now `solid` (a raised FILL), NOT `tonal` — so it carries NO
// `aui-frame--inset` class, and the D25/D27 `::before` selection stroke NO LONGER FIRES by default (the
// raised fill is the state signal). The stroke mechanism STAYS for any consumer who sets a tonal/fixed
// selected (`aui.states.selected.paint:'tonal'`) — the default simply no longer exercises it.
// Verified cells (D31 #2): `aui-color-solid-surface-alt` (`_230-color.scss:126`), `aui-color-solid-raised`
// (:102), `aui-color-solid-surface` (:120); `aui-elevation-0` (layer-3/_670-elevation.scss).
const CARD_GROUP_ITEM_SELECTED_CARD = { color: 'raised', paint: 'solid', elevation: 0 } as const;
const CARD_GROUP_ITEM_SELECTED_LIST = { color: 'raised', paint: 'solid', shape: 'none', elevation: 0 } as const;
const CARD_GROUP_ITEM_INDETERMINATE = { color: 'surface-alt', paint: 'text' } as const;

/** GRID (card display) item vocab — flat soft-cornered `surface` cells; selected = raised fill (D31 +
 *  amendment: grid unselected color is `surface`, so grid + list now differ ONLY by shape — soft vs none). */
export const CARD_GROUP_ITEM_VOCAB = defineLeaf({
  marker: 'aui-card-group-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_GROUP_ITEM_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'solid',
    scale: CARD_GROUP_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
  states: {
    selected: CARD_GROUP_ITEM_SELECTED_CARD,
    indeterminate: CARD_GROUP_ITEM_INDETERMINATE,
  },
});

/** LIST display item vocab — flat SQUARE (`shape:'none'`) `surface` cells; selected = raised fill (D31). */
export const CARD_GROUP_ITEM_LIST_VOCAB = defineLeaf({
  marker: 'aui-card-group-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_GROUP_ITEM_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'solid',
    scale: CARD_GROUP_DEFAULT_SCALE,
    shape: 'none',
    elevation: 0,
  },
  states: {
    selected: CARD_GROUP_ITEM_SELECTED_LIST,
    indeterminate: CARD_GROUP_ITEM_INDETERMINATE,
  },
});

/** The Item's canonical state family (D8-8b) — the three canonical AuiStateKeys, mirroring List.Item. */
export type CardGroupItemStateKey = 'unselected' | 'selected' | 'indeterminate';

/** The unified `aui` shape for the Item — the FULL 7-axis frame appearance + full-frame `sx` + the
 *  canonical per-state `states` (unselected/selected). A consumer `aui.states.selected` overrides the
 *  raised/solid default (the ONE gated merge in `buildLeafClasses`). */
export type CardGroupItemAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: AuiStates;
};

/**
 * Build the Item's class string for the active state — the View/List.Item precedent (both resolve
 * `buildLeafClasses` by hand at paint time). State resolution (D8-8b, List.Item order): `indeterminate`
 * (a consumer display prop) WINS, else `pressed` (the Base UI Toggle render state) → `selected`, else
 * `unselected`. `disabled` flips the chroma to the paint's `disabled` cell. This is the SINGLE merge
 * point — vocab.defaults < vocab.states[active] < aui < aui.states[active] — so a consumer override wins
 * without a second merge (L45/L49).
 */
export function buildCardGroupItemClasses(
  aui: CardGroupItemAui | undefined,
  pressed: boolean,
  disabled: boolean,
  indeterminate = false,
  display: CardGroupDisplay = 'card',
): string {
  const state: CardGroupItemStateKey = indeterminate
    ? 'indeterminate'
    : pressed
      ? 'selected'
      : 'unselected';
  // D31 — pick the PER-DISPLAY vocab (grid = soft surface-alt; list = square surface). The consumer `aui`
  // still merges on top through `buildLeafClasses`, so an explicit color/paint/shape wins in EITHER display.
  const vocab = display === 'list' ? CARD_GROUP_ITEM_LIST_VOCAB : CARD_GROUP_ITEM_VOCAB;
  return buildLeafClasses(vocab, aui, state, disabled);
}

// ─── Items — the SCROLL-HOST TRAY frame (D28/D29) ──────────────────────────────────────────────────
// CardGroup.Items exposes ONE `aui` (the FULL 7-axis appearance + full-frame `sx`, D28-emphasis). D29
// SPLIT (internal routing, documented): the SCROLL HOST (`.aui-card-group-items-scroll`, the raw
// `ScrollAreaPrimitive.Root` — L51 structure KEPT, now painted via CLASSES not a View.ScrollArea swap)
// resolves the SURFACE axes (color/paint/profile/shape/elevation + scale) — THIS vocab; the GRID
// (`.aui-card-group-items`) carries the LAYOUT `sx` (min-height, gaps, …) — handled in card-group.tsx via
// `aui-frame` + `buildStyleProps`. DEFAULTS (D29): `{ paint:'fixed', color:'surface', profile:'default' }`
// — a bordered fixed-surface tray coherent with the toolbar family (the Search rail + ViewToggle pin the
// SAME `fixed-surface` cell, field/use-recipe.ts:97). The `default` profile's padding is the SHADOW GUTTER
// (the elevation-4 selected card shadow breathes inside the tray padding — REPLACES the ADC consumer's
// hand-rolled 16px `.templates` gutter). Consumer-overridable per the usual rails (the gated merge).
export const CARD_GROUP_ITEMS_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const CARD_GROUP_ITEMS_VOCAB = defineLeaf({
  marker: 'aui-card-group-items-scroll',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_GROUP_ITEMS_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'fixed',
    scale: CARD_GROUP_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
});

/** The unified `aui` shape for CardGroup.Items — the FULL 7-axis frame appearance + full-frame `sx`
 *  (D28-emphasis: G12/G13, no masked axes). STATELESS. Internally routed (D29): the surface axes paint the
 *  scroll-host TRAY; `sx` lands on the GRID (documented split). */
export type CardGroupItemsAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Build the Items TRAY (scroll-host) frame classes from the SURFACE axes only (`sx` is routed to the grid
 *  in card-group.tsx). A consumer `aui` (color/paint/profile/shape/elevation/scale) wins (the gated merge).
 *  Defaults to the fixed-surface / default-profile tray. */
export function buildCardGroupItemsTrayClasses(aui: Omit<CardGroupItemsAui, 'sx'> | undefined): string {
  return buildLeafClasses(CARD_GROUP_ITEMS_VOCAB, aui, 'unselected', false);
}

// ─── ViewToggle wrapper — the control-RAIL frame (D13-add-1/3/4) ───────────────────────────────────
// An EQUAL-PADDING LEAF frame (D13-add-3). block-size still FOLLOWS the scale height rail: `equal-padding`
// carries the SAME block padding as `default` (4+4 at sm — `_200-scale.scss:749-750` == `:649-650`), so the
// wrapper stays the 28px rail (coherent with the Field.Control-built Search rail); only the INLINE padding
// becomes uniform (4px vs default's 8px — the even inset on all sides around the contained option buttons).
// A LEAF (not a styleable part) ON PURPOSE: a part emits `.aui-part` which zeros padding, and the control
// rail IS padding + content — a part collapses to the option height (D13-add-1 finding). PAINT (D13-add-4):
// `{ color:'surface', paint:'fixed' }` → `aui-color-fixed-surface`, a bordered/inset surface card — the SAME
// cell the Field.Control rail pins (field/use-recipe.ts:97-99), so the Search + ViewToggle rails read as one
// toolbar surface. A consumer `aui.color`/`aui.paint`/`aui.profile` override wins (the gated merge).
export const CARD_GROUP_VIEW_TOGGLE_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const CARD_GROUP_VIEW_TOGGLE_VOCAB = defineLeaf({
  marker: 'aui-card-group-view-toggle',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_GROUP_VIEW_TOGGLE_SX_AXES,
  profile: 'equal-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'fixed',
    scale: CARD_GROUP_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
});

/** The wrapper `aui` shape — the frame axes + full-frame `sx` (the option `states` live on
 *  `CardGroupViewToggleAui` in card-group.tsx and are handled by `resolveViewOptionAui`, not here). */
type ViewToggleWrapperAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Build the ViewToggle WRAPPER frame classes (D13) — the control-rail frame; a consumer `aui` wins. */
export function buildCardGroupViewToggleClasses(aui: ViewToggleWrapperAui | undefined): string {
  return buildLeafClasses(CARD_GROUP_VIEW_TOGGLE_VOCAB, aui, 'unselected', false);
}
