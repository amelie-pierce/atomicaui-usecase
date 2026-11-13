// modules/design/atomic-aui/src/lib/panels/use-recipe.ts
//
// The vocabulary + sx-axis exports for the Panels family.
//
//  • PANELS_ROOT_VOCAB — the `.aui-panels` OUTER-wrapper frame leaf for the `Panels` root. A View-class
//                     NON-INTERACTIVE box (no `states` → no hover cell) that DEFAULTS to a NON-PAINTING
//                     surface: `paint:'text'` (transparent fill + border, so the wrapper never washes a
//                     background) with `profile:'no-padding'` + `scale:'sm'`. It is ALWAYS applied (not
//                     only when `aui` is set) so the wrapper always carries the `aui-scale-no-padding-sm`
//                     cell — that cell's `--aui-gap` (6px @ sm, `inherits:true`) cascades to the
//                     ResizeHandle so the inter-panel gap FOLLOWS the root scale (cascade, not a px).
//  • PANEL_VOCAB    — the `.aui-panels-panel` frame leaf for `Panels.Panel`. It is a View-CLASS box
//                     (a real `.aui-frame` surface that paints/pads/rounds), so it mirrors View's
//                     `VIEW_VOCAB` shape EXACTLY: `profile:'no-padding'`, the FULL 32-axis frame sx,
//                     the locked default appearance surface / solid / sm / soft / 0. Hand-resolved by
//                     `usePanelRecipe` (in ./panels.tsx) via `buildLeafClasses`, NOT a factory — the
//                     class string must land on RRP's NESTED inner div (the node RRP styles), not on
//                     the `[data-panel]` flex root, so Panel can't run the createAtomicComponent shell.
//  • PANEL_SX_AXES  — the FULL frame surface (every box knob), same `Object.keys(STYLE_PROP_MAP)` set
//                     View / Switch / Dropdown.Item use. EXPORTED so the Configurator's `'frame'`
//                     SxKind drives it (no re-listing) and the public API advertises the knob set.
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

// ─── FULL-surface sx (G12/G13) — Panels.Panel is a real box (a View-class frame) ─────────────────
// The `.aui-panels-panel` marker is an `.aui-frame` that reads every `--aui-*` anatomy hook, so the
// box exposes the FULL 32-axis surface like View / every other frame.
export const PANEL_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// ─── PANELS_ROOT_VOCAB — the `.aui-panels` outer-wrapper frame leaf ───────────────────────────────
// The root wrapper around the RRP Group. STATELESS (View-class, NON-INTERACTIVE — no `states` → no
// hover cell paints). DEFAULTS to a NON-PAINTING surface via `paint:'text'` (transparent fill +
// border) so the wrapper never washes a background of its own; a consumer opts a frame in via the
// root `aui` prop. ALWAYS applied (not gated on `aui`) so the `aui-scale-no-padding-sm` cell always
// rides the wrapper → its `--aui-gap` (6px @ sm, `inherits:true`) cascades to the ResizeHandle, so the
// inter-panel gap FOLLOWS the root scale (cascade-first — not a hardcoded px).
export const PANELS_ROOT_VOCAB = defineLeaf({
  marker: 'aui-panels',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: PANEL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface' as const, paint: 'text' as const, scale: 'sm' as const, shape: 'none' as const, elevation: 0 as const },
});

// ─── PANEL_VOCAB — the Panels.Panel frame leaf ───────────────────────────────────────────────────
// A plain box (no Base UI core, no selection state) — STATELESS like View.ScrollArea Root: a
// structural surface, not a selectable leaf, so it has NO `states`. The default appearance mirrors
// View's locked set, with a `soft` corner: surface / solid / sm / no-padding / soft / 0. A consumer
// overrides any axis via the Panel's `aui` prop. (RRP owns the flex sizing on its outer `[data-panel]`;
// this surface paints the INNER div RRP gives us — see the nested-div trap note in ./panels.tsx.)
export const PANEL_VOCAB = defineLeaf({
  marker: 'aui-panels-panel',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: PANEL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface' as const, paint: 'solid' as const, scale: 'sm' as const, shape: 'soft' as const, elevation: 0 as const },
});

/** The unified `aui` customisation shape for `Panels.Panel` — the FULL 7-axis frame appearance.
 *  No `states` (a structural surface, mirroring View.ScrollArea Root). */
export type PanelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
