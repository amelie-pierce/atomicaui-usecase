// modules/design/atomic-aui/src/lib/view/use-recipe.ts
//
// The vocabularies + sx-axis exports for the View primitive and its View.ScrollArea parts.
//
//  • VIEW_VOCAB           — the structural `.aui-view` frame leaf (a full box). Hand-resolved by
//                           `useViewRecipe` (in ./view.tsx) via `buildLeafClasses`, NOT a factory
//                           PropHook — View is hand-crafted like Type (see view.tsx for why).
//  • SCROLL_AREA_VOCAB    — the `.aui-view-scroll-area` Root frame leaf (a full box: surface card).
//  • *_SX_AXES            — the FULL 32-axis frame surface for View + the ScrollArea Root (every box
//                           knob), and the scrollbar-scoped sx (scrollbar size + hover color only).
//
// View / View.ScrollArea Root are real boxes (paint a surface, take padding/radius), so they get the
// FULL frame sx surface — the same `Object.keys(STYLE_PROP_MAP)` set Switch/Dropdown.Item use.
import { defineLeaf, type Appearance, type AuiStates } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

// ─── FULL-surface sx (G12/G13) — View + ScrollArea Root are real boxes ───────────────────────────
// Both markers (`.aui-view`, `.aui-view-scroll-area`) are `.aui-frame`s that read every `--aui-*`
// anatomy hook (the base map in `_component-tokens.scss`), so the box exposes the FULL 32-axis
// surface like every other frame. EXPORTED so the Configurator's `'frame'` SxKind drives both (no
// re-listing) and the public API can advertise the knob set.
export const VIEW_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const SCROLL_AREA_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// The scrollbar-SCOPED sx is NOT the box surface — the Base UI Scrollbar is a positioned overlay we
// must NOT box-style (the DON'T list). Its only safe knobs are the cross-axis THICKNESS and the
// hover thumb color, realised by setting the `--aui-scrollbar-size` / `--aui-scrollbar-thumb-hover`
// vars (read by the `.aui-view-scroll-area-scrollbar` / `-thumb` markers). These are scrollbar-local
// custom-prop knobs, applied as inline `style` (NOT through the global STYLE_PROP_MAP utility path —
// they are not `aui-*` utilities). The configurator exposes them as bespoke knobs.
export const SCROLL_AREA_SCROLLBAR_SX_AXES = ['scrollbarSize', 'scrollbarThumbHover'] as const;
export type ScrollAreaScrollbarSxKey = (typeof SCROLL_AREA_SCROLLBAR_SX_AXES)[number];

// ─── VIEW_VOCAB — the structural frame leaf ──────────────────────────────────────────────────────
// View is a plain box (no Base UI core). Its appearance resolves through `buildLeafClasses` exactly
// like a selectable leaf: top-level axes apply to every state, `aui.states.<key>` overrides per
// state. The default appearance (locked by the user): surface / solid / sm / no-padding / none / 0.
//
// The three `states` keys carry the SAME default appearance — View has no built-in per-state recolor
// (a structural frame is visually identical selected/unselected unless the consumer authors
// `aui.states`). The keys exist so `buildLeafClasses(VIEW_VOCAB, aui, <key>)` resolves cleanly for
// every `AuiStateKey` and an interactive View can author per-state appearance.
export const VIEW_VOCAB = defineLeaf({
  marker: 'aui-view',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: VIEW_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface' as const, paint: 'solid' as const, scale: 'sm' as const, shape: 'none' as const, elevation: 0 as const },
  states: {
    unselected: {},
    selected: {},
    indeterminate: {},
  },
});

/** The unified `aui` customisation shape for View — the FULL 7-axis frame appearance + canonical
 *  per-state overrides (`unselected`/`selected`/`indeterminate`). `sx` is the full-frame surface. */
export type ViewAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: AuiStates;
};

// ─── SCROLL_AREA_VOCAB — the View.ScrollArea Root frame leaf ─────────────────────────────────────
// The Base UI `ScrollArea.Root` is a `<div role="presentation">` we style as a surface card. It is a
// real box (paints the surface, owns the radius/border, and — unlike View — DEFAULTS to the `default`
// profile so its padding keeps the auto-hide bar from overlapping the content). Defaults (locked):
// surface / solid / sm / default / none / 0. It is STATELESS (a structural surface, no selection), so
// it has no `states` — a plain `createVocabRecipe(SCROLL_AREA_VOCAB)` drives it.
export const SCROLL_AREA_VOCAB = defineLeaf({
  marker: 'aui-view-scroll-area',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SCROLL_AREA_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface' as const, paint: 'solid' as const, scale: 'sm' as const, shape: 'none' as const, elevation: 0 as const },
});

/** The unified `aui` customisation shape for View.ScrollArea — the FULL 7-axis frame appearance.
 *  No `states` (a structural surface). */
export type ScrollAreaAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
