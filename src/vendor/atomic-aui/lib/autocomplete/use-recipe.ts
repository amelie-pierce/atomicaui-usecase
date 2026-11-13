// modules/design/atomic-aui/src/lib/autocomplete/use-recipe.ts
//
// Autocomplete is the Base UI query-input primitive: selectionMode is pinned to "none" upstream,
// so AtomicAUI only styles the query rail, popup, and stateless result rows. Trigger is the one
// open-state leaf; other parts are static recipes or marker-only wrappers.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
} from '../../core/vocabulary/recipe-vocab';
import { createTriggerStateRecipe } from '../../families/trigger-state/create-trigger-state-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle';

export type AutocompleteColor = AuiRecipeColor;
export type AutocompletePaint = AuiRecipePaint;
export type AutocompleteScale = AuiRecipeScale;
export type AutocompleteShape = AuiRecipeShape;

const FULL_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export type AutocompleteFrameAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const AUTOCOMPLETE_INPUT_GROUP_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-input-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'fixed', scale: 'sm', shape: 'soft' },
});
export type AutocompleteInputGroupAui = AutocompleteFrameAui;
export const useAutocompleteInputGroupRecipe = createTriggerStateRecipe(AUTOCOMPLETE_INPUT_GROUP_VOCAB);

export const AUTOCOMPLETE_INPUT_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-input',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});
export type AutocompleteInputAui = AutocompleteFrameAui;
export const useAutocompleteInputRecipe = createTriggerStateRecipe(AUTOCOMPLETE_INPUT_VOCAB);

export const AUTOCOMPLETE_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'contained' as const,
  defaults: { color: 'surface-alt', paint: 'text', scale: 'sm', shape: 'soft' },
});
// Trigger state maps the popup-open contract only: unselected = closed,
// selected = open. Autocomplete has no item-selection or indeterminate surface.
export type AutocompleteTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};
export const useAutocompleteTriggerRecipe = createTriggerToggleRecipe(AUTOCOMPLETE_TRIGGER_VOCAB);

export const AUTOCOMPLETE_POPUP_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'block-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 2 },
});
export type AutocompletePopupAui = AutocompleteFrameAui;
export const useAutocompletePopupRecipe = createVocabRecipe(AUTOCOMPLETE_POPUP_VOCAB);

// InlineLayout is a CASCADE-READER (`cascadeReader: true` — the Tabs.List/Accordion.Trigger
// precedent, `tabs/use-recipe.ts:57`, `accordion/use-recipe.ts:65`): its `defaults` only matter
// when an explicit `aui.inlineLayout` override arrives (`hasExplicitContextOverride`,
// `build-leaf-classes.ts:129-139`), so with NOTHING set it stays a transparent layout-only column
// (USER CORRECTION, 2026-07-11 round 2 — the FIRST paint pass painted the whole inline surface,
// input rail included; the user wants the rail to stay on the page background — see
// `AUTOCOMPLETE_INLINE_CARD_VOCAB` below for where the paint actually lands, round 3). `profile:
// 'no-padding'` (not `block-padding`): unpainted chrome carries no padding of its own, matching
// the original bare column. `aui.inlineLayout` on Root remains a real (if rarely used) escape
// hatch — a consumer who explicitly sets `aui.inlineLayout.color`/`.paint` still gets a real
// painted class, same mechanism Tabs.List uses for an author opt-in override.
export const AUTOCOMPLETE_INLINE_LAYOUT_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-inline-layout',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'no-padding' as const,
  cascadeReader: true,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft' },
});
export type AutocompleteInlineLayoutAui = AutocompleteFrameAui;
export const useAutocompleteInlineLayoutRecipe = createVocabRecipe(AUTOCOMPLETE_INLINE_LAYOUT_VOCAB);

// InlineCard is the inline-mode results card — the Root-synthesized wrapper around [Status, Empty,
// List] specifically (never InputGroup). USER BUG FIX, 2026-07-11 round 3: round 2 painted List
// itself, which (a) left Status/Empty as loose siblings above it — "No matches." floated on the
// page background with no card behind it — and (b) painted List's OWN box even at zero items, a
// visible empty bar (`role="listbox" data-empty` still resolves a real `aui-color-solid-surface`
// box with block-padding and nothing inside). This mirrors the floating Popup's card exactly:
// Status/Empty/List are plain block children inside Popup too (`.aui-autocomplete-popup` carries
// no flex-column rule — `_state-cascade.scss`), so InlineCard needs none either. NOT a cascade
// reader (unlike InlineLayout/List) — it always resolves the painted cell like Popup does; the
// EMPTY-COLLAPSE is a separate CSS concern (`.aui-autocomplete-inline-card`'s `:has()` guard,
// `_state-cascade.scss`) that zeroes its padding when List carries `[data-empty]` (ComboboxList.js
// — Autocomplete.List is a re-export of Combobox's List, `@base-ui/react/autocomplete/index.parts`)
// AND neither Empty nor Status has live content — a 0-padding box with 0 children paints nothing
// visible, so no separate "hide the color" rule is needed. No `elevation` (in-flow, never floats).
export const AUTOCOMPLETE_INLINE_CARD_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-inline-card',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'block-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft' },
});
export type AutocompleteInlineCardAui = AutocompleteFrameAui;
export const useAutocompleteInlineCardRecipe = createVocabRecipe(AUTOCOMPLETE_INLINE_CARD_VOCAB);

export const AUTOCOMPLETE_ITEM_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});
export type AutocompleteItemAui = AutocompleteFrameAui;
export const useAutocompleteItemRecipe = createVocabRecipe(AUTOCOMPLETE_ITEM_VOCAB);

// List is a `cascadeReader` (transparent by default in BOTH modes — a consumer `aui` override
// still wins, per `hasExplicitContextOverride`) — it never paints its own box in EITHER mode.
// Floating mode's card is `AUTOCOMPLETE_POPUP_VOCAB` above; inline mode's card is
// `AUTOCOMPLETE_INLINE_CARD_VOCAB` below (round 3 — List itself painting its own box, even at zero
// items, was the round-2 bug: a visible empty bar). `profile: 'no-padding'`: List owns no padding
// of its own in either mode — the enclosing card (Popup/InlineCard) supplies the block inset,
// exactly like a floating-mode List today.
export const AUTOCOMPLETE_LIST_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-list',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'no-padding' as const,
  cascadeReader: true,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft' },
});
export type AutocompleteListAui = AutocompleteFrameAui;
export const useAutocompleteListRecipe = createVocabRecipe(AUTOCOMPLETE_LIST_VOCAB);

export const AUTOCOMPLETE_EMPTY_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-empty',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});
export type AutocompleteEmptyAui = AutocompleteFrameAui;
export const useAutocompleteEmptyRecipe = createVocabRecipe(AUTOCOMPLETE_EMPTY_VOCAB);

export const AUTOCOMPLETE_STATUS_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-status',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});
export type AutocompleteStatusAui = AutocompleteFrameAui;
export const useAutocompleteStatusRecipe = createVocabRecipe(AUTOCOMPLETE_STATUS_VOCAB);

export const AUTOCOMPLETE_GROUP_LABEL_VOCAB = defineLeaf({
  marker: 'aui-autocomplete-group-label',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});
export type AutocompleteGroupLabelAui = AutocompleteFrameAui;
export const useAutocompleteGroupLabelRecipe = createVocabRecipe(AUTOCOMPLETE_GROUP_LABEL_VOCAB);
