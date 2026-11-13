// modules/design/atomic-aui/src/lib/tabs/use-recipe.ts
//
// Tabs' frame-bearing recipe vocabs. Pure TypeScript: no React, no Base UI wiring. Base UI owns the
// value model, roving keyboard focus, ARIA, and the active-tab measurement; these hooks translate
// each part's unified `aui` prop into AtomicAUI 6.0 frame classes. Active/inactive is a Base UI
// render-state signal consumed by the shared `families/trigger-toggle` recipe (Tab) and CSS data
// attrs (List/Panel/Indicator layout), not a public appearance prop or a custom variant axis.
//
//   • List      — stateless surface-rail frame (`createVocabRecipe`; NO state ring — the rail is not
//                 focusable, roving focus lives on the tabs). Mirrors the Menubar bar.
//   • Tab       — a `createTriggerToggleRecipe` frame (active-aware + `aui.states`, context-disabled
//                 via Base UI Tab render state). Defaults to a filled `surface-alt` chip; the BAKED
//                 `states.selected = { color: 'overlay' }` lifts the active tab to `overlay` out of the
//                 box (no consumer config). A zero-diff superset of a stateless recipe when no extra
//                 `states` are authored.
//   • Panel     — stateless light frame (`createVocabRecipe`; NO state ring — it is a region).
//                 MIRRORS `ACCORDION_PANEL_VOCAB` exactly (cascadeReader → follows the cascade).
//   • Indicator — a stateless `.aui-frame` part (`createVocabRecipe`). OPT-IN BY COMPOSITION; its
//                 position tracking (Base UI `--active-tab-*` vars) lives in `_state-cascade.scss`.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle/create-trigger-toggle-recipe';
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

// Public Tabs axis names alias the shared core recipe vocabulary — parity with
// Accordion/Menubar/Dropdown/Select. No tabs-specific kind/line|pill|segmented variant axis exists;
// the visual style is composed from the existing aui model (color/paint/shape/sx + the Indicator).
export type TabsColor = AuiRecipeColor;
export type TabsPaint = AuiRecipePaint;
export type TabsScale = AuiRecipeScale;
export type TabsShape = AuiRecipeShape;

// ─── 0. Root — a full no-padding .aui-frame (always) + cascade seed ───────────────────────────
//
// The Tabs Root is a FULL styleable `.aui-frame` (all 6 axes + sx) that ALWAYS stamps the frame on
// `.aui-tabs` AND seeds the appearance cascade for its subtree (the Accordion.Item pattern). The 5
// appearance axes (color/paint/scale/shape/elevation) cascade to the parts (own-part-wins); `profile`
// + `sx` are ROOT-LOCAL (the wrapper cell + `sx.gap`), NOT cascaded → the List keeps its own
// `no-padding`. `profile` DEFAULTS to `no-padding` (user-directed), so an unstyled `<Tabs>` is
// `aui-tabs aui-frame aui-scale-no-padding-sm`: no padding, NO fill (cascadeReader + paint:text), and
// `no-padding`'s gap (6px at sm) IS the default List↔Panel spacing. `scale:'sm'` keeps it consistent
// with the parts (sm everywhere); `paint:'text'` + `cascadeReader` ⇒ no stray fill until color/paint set.
export const TABS_ROOT_VOCAB = defineLeaf({
  marker: 'aui-tabs',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  cascadeReader: true,
});

// `TabsRootAui` = the FULL 6 axes (`color` + `paint` + `scale` + `profile` + `shape` + `elevation`) +
// a Root-local `sx`. The 5 appearance axes cascade to the parts (own-part-wins); `profile` + `sx` are
// ROOT-LOCAL (apply to `.aui-tabs` only, NOT cascaded → the List keeps its own `no-padding`).
export type TabsRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// ─── 1. List — the tab rail (stateless) ──────────────────────────────────────
//
// The Tabs rail: a neutral `surface` frame that groups the tab buttons and is the positioning
// context for the Indicator. The rail itself has no focus ring (roving focus lives on the tabs), so
// it is STATELESS — a `createVocabRecipe`, NO `useStateLayer`. `marker:'aui-tabs-list'` so the CSS
// can lay it out as a flex row (column when vertical). `no-padding` profile so the rail hugs its
// tabs (the chip spacing is the tabs' own padding). Full 32-axis `aui.sx`.
export const TABS_LIST_VOCAB = defineLeaf({
  marker: 'aui-tabs-list',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'soft', elevation: 0 },
});

/** Unified customisation shape for `Tabs.List` — a plain `.aui-frame` rail; full-frame sx
 *  (`AuiFrameStyleProps`) so the rail surface geometry is author-overridable. */
export type TabsListAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** List styling recipe: unified `aui` appearance prop → full `.aui-*` class string. Stateless
 *  (the rail has no per-state recipe — no focus ring; roving focus is on the tabs). */
export const useTabsListRecipe = createVocabRecipe(TABS_LIST_VOCAB);

// ─── 2. Tab — the active-aware selectable trigger ────────────────────────────
//
// A filled-chip selectable tab (`surface-alt` chroma painted `solid`) — the resting UNSELECTED look.
// `marker:'aui-tabs-tab'` so the CSS lays it out as a flex row (icon + label). KEEPS its keyboard
// `:focus-visible` ring (it is a focusable, roving tab stop) via `useStateLayer` in tabs.tsx.
//
// The SELECTED appearance is BAKED into the vocab so a distinct active look ships out of the box:
// `states.selected = { color: 'overlay' }` flips ONLY the chroma `surface-alt → overlay` on the active
// tab (paint/geometry stay stable). A consumer overrides via `aui.states.selected`. Active/inactive
// arrives through Base UI's Tab render state `{ active, disabled, orientation }`; the shared
// `families/trigger-toggle` factory maps `active === true` → the `'selected'` activeState (so
// `vocab.states` AND `aui.states` resolve per active-state) and flips the chroma to the grey
// `aui-color-solid-disabled` cell when Base UI marks the tab disabled. `indeterminate` is
// RESERVED-INERT — Base UI tabs are binary active/inactive, so no render path produces it; it is
// addressable in the type for parity only. NO cascadeReader (the cascade is JS-resolved in tabs.tsx).
export const TABS_TAB_VOCAB = defineLeaf({
  marker: 'aui-tabs-tab',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 0 },
  states: { selected: { color: 'overlay' } },
});

/** Unified customisation shape for `Tabs.Tab` — a plain `.aui-frame` consumer (Button-class): the
 *  full Appearance + the FULL-frame sx surface (`AuiFrameStyleProps`) + OPTIONAL per-state appearance
 *  keyed on the canonical trigger state (`unselected` = inactive / `selected` = active /
 *  `indeterminate` reserved-inert). With no `states` authored the resolved class string follows the
 *  BAKED vocab default (`surface-alt`, active → `overlay`). Mirrors `AccordionTriggerAui`. */
export type TabsTabAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Tab styling recipe: a canonical-state `classNameForState` recipe (the shared
 *  `families/trigger-toggle` factory). Base UI's Tab render state carries `active` AND the merged
 *  `disabled`; the family maps `active === true` → the `'selected'` activeState (so `aui.states`
 *  resolves per active-state) and flips the chroma off `disabled`. active/hover/focus stay CSS. */
export const useTabsTabRecipe = createTriggerToggleRecipe(TABS_TAB_VOCAB);

// ─── 3. Panel — the content region (stateless) ───────────────────────────────
//
// A FILLED content region by default (2026-06-21, user live review): `color:'surface' paint:'solid'`
// so the Panel EMITS the solid surface cell out of the box (a filled content region, not a flat
// see-through one). NO `cascadeReader` — the Panel always stamps its own paint cell. It STAYS
// stateless (no `useStateLayer` — no hover/active; it is a region, not a control). It STILL follows
// the appearance cascade (own ?? cascade ?? vocab default), so a Root `color`/`paint` override still
// flips it; with the Root unset it is the solid surface fill. `marker:'aui-tabs-panel'`. Full 32-axis
// `aui.sx`.
export const TABS_PANEL_VOCAB = defineLeaf({
  marker: 'aui-tabs-panel',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'none' },
});

/** Unified customisation shape for `Tabs.Panel` — a plain `.aui-frame` region; full-frame sx. */
export type TabsPanelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Panel styling recipe: unified `aui` appearance prop → full `.aui-*` class string. Stateless
 *  (a region, no per-state recipe). */
export const useTabsPanelRecipe = createVocabRecipe(TABS_PANEL_VOCAB);

// ─── 4. Indicator — the active-tab affordance (stateless) ────────────────────
//
// OPT-IN BY COMPOSITION: a styleable `.aui-frame` part that renders ONLY when the consumer composes
// `<Tabs.Indicator/>` (Base UI's natural behavior — no show/hide logic here). `marker:
// 'aui-tabs-indicator'`. Its DEFAULT composed look (a thin underline anchored under the active tab)
// + its position/thickness tracking (Base UI `--active-tab-*` vars + the `--aui-*` sx hooks) live in
// `_state-cascade.scss`. A SOLID bar by default (2026-06-21, user live review): `color:'surface'
// paint:'solid'` so it EMITS the solid surface cell → `--aui-bg` carries the surface chroma → the
// marker's `background-color: var(--aui-bg, currentColor)` paints a VISIBLE solid bar (not a
// text-painted thin glyph). NO `cascadeReader` — it always stamps its own paint cell. It STILL
// follows the cascade color (own ?? cascade ?? vocab default), so a Root/own `color` recolors the
// bar; Root-unset = solid surface bar. Stateless `createVocabRecipe`.
//
// 🔑 `profile: 'no-padding'` (NOT 'default'): the indicator is a thin bar whose thickness is the
// `--aui-height`/`--aui-width` hook (default `--p-px-2` = 2px). With the `default` profile the scale
// cell adds 4px block padding, and `.aui-frame`'s `box-sizing: border-box` then FLOORS the rendered
// `block-size` at 8px (4+4) — so a 2px bar was impossible and `sx.height` looked dead (verified live:
// default bar was 8px not 2px). `no-padding` zeroes that padding so the thickness hook actually
// renders (2px default; `sx.height`/`sx.width` overrides it).
export const TABS_INDICATOR_VOCAB = defineLeaf({
  marker: 'aui-tabs-indicator',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'none' },
});

/** Unified customisation shape for `Tabs.Indicator` — a plain `.aui-frame` part; full-frame sx. */
export type TabsIndicatorAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Indicator styling recipe: unified `aui` appearance prop → full `.aui-*` class string. Stateless. */
export const useTabsIndicatorRecipe = createVocabRecipe(TABS_INDICATOR_VOCAB);

// ─── 5. TabContent — the composable label/children slot INSIDE a Tab (ordering frame) ─────────
//
// A stateless, TRANSPARENT inline frame that holds a `Tabs.Tab`'s label/children so a consumer can
// ORDER the in-row elements by DOM position (the Field.Input convention — visual order IS document
// order; there is NO CSS `order`). Compose `<Tabs.Icon>` / `<Tabs.PinButton>` BEFORE it for a leading
// adornment, `<Tabs.CloseButton>` AFTER it for a trailing one. `marker:'aui-tabs-content'` so the CSS
// can size it (flex:1 so the label takes the remaining row width and ellipsises under `overflow:shrink`).
//
// `cascadeReader: true` + `paint:'text'` ⇒ it NEVER stamps a fill (it sits INSIDE the tab chip and must
// stay see-through — the tab's solid `surface-alt`/active `overlay` shows through). `no-padding` so it
// adds no box of its own (the Tab owns the row padding). It STILL follows the cascade color/scale/shape
// so an own/Root override flows; with nothing set it is an invisible structural slot.
export const TABS_CONTENT_VOCAB = defineLeaf({
  marker: 'aui-tabs-content',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  // NOT a cascade-reader: the content slot is TRANSPARENT (paint:text) like the Tab itself — it must NOT
  // adopt the Tabs cascade's paint as a surface fill the way List/Panel do, or a `paint:solid` Tabs Root
  // would paint a background behind the tab's icon+label. Scale still cascades via `useTabsCascadeProps`.
  cascadeReader: false,
});

/** Unified customisation shape for `Tabs.TabContent` — a plain transparent `.aui-frame` slot; full-frame sx. */
export type TabsTabContentAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** TabContent styling recipe: unified `aui` appearance prop → full `.aui-*` class string. Stateless. */
export const useTabsContentRecipe = createVocabRecipe(TABS_CONTENT_VOCAB);
