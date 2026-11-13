// modules/design/atomic-aui/src/lib/select/use-recipe.ts
//
// Task P0.2 — the three per-part Select recipe vocabs + their unified `aui` types.
// Pure TypeScript (no React, no Base UI here — the wrapping is P1/P3). Each recipe
// resolves the unified `aui` appearance prop into a deterministic `.aui-*` class string
// via the ONE `buildLeafClasses` engine, exactly like Button / Checkbox.
//
//   • Trigger — stateless frame (Button-class form-field trigger)
//   • Popup   — stateless surface-card frame (the floating listbox surface)
//   • Item    — stateful frame row (uses the P0.1 `select-item` family; states = enabled/selected)
//
// ─── CODE-FIRST DEFAULTS (pending Figma reconcile) ──────────────────────────────
// The Figma Select anatomy is out of scope for this consumer track (spec §1/§9), so
// every default below is chosen code-first against the live Core 6.0 token unions and
// documented here. All chroma values are verified members of `AuiColor`
// (surface | primary | secondary | info | success | warning | error | surface-alt |
//  raised | overlay) and paints of `AuiRecipePaint` (solid | tonal | text | fixed).
// Reconcile against the Figma anatomy when the design track lands.

import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { createSelectItemVocabRecipe } from '../../families/select-item/create-select-item-vocab-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type { AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape } from '../../core/vocabulary/recipe-vocab';

// Public Select axis names alias the shared core recipe vocabulary (token-derived,
// owned by core/) — parity with ButtonColor/Paint/Scale/Shape.
export type SelectColor = AuiRecipeColor;
export type SelectPaint = AuiRecipePaint;
export type SelectScale = AuiRecipeScale;
export type SelectShape = AuiRecipeShape;

// ─── 1. Trigger — solid-filled frame (E1.3/E1.4) ─────────────────────────────────

// A form-field trigger: a solid-filled button-class field (`surface-alt` chroma painted
// `solid`). `marker:'aui-select-trigger'` so the CSS can lay the trigger out as a flex row
// (Value ↔ chevron). The Trigger KEEPS its keyboard `:focus-visible` ring (it's the single
// focusable tab stop — a11y); only the ITEMS suppress the ring (the highlight overlay is
// their affordance). The flex layout lives in `_state-cascade.scss`.
export const SELECT_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-select-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft' },
});

/** The unified customisation shape for `Select.Trigger` — a plain `.aui-frame` consumer
 *  (Button-class): the full Appearance + the FULL-frame sx surface (`AuiFrameStyleProps`,
 *  box geometry is author-overridable) + per-state `states` (the canonical trigger-toggle states:
 *  `unselected` = closed / `selected` = open / `indeterminate` reserved). With no `states` authored
 *  the resolved class string is identical to the prior stateless trigger recipe (the
 *  `createTriggerToggleRecipe` zero-diff superset). Mirrors `DropdownTriggerAui`. */
export type SelectTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Trigger styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
 *  A `classNameForState` recipe via the SHARED `families/trigger-toggle` factory (NOT
 *  `createVocabRecipe`). The Trigger's disabled comes from `Select.Root` via Base UI CONTEXT — it
 *  never reaches the element as a `disabled` prop, so a `props.disabled`-based flip would never
 *  fire. `createTriggerToggleRecipe` resolves this recipe with Base UI's `SelectTriggerState`:
 *  `state.open` → the `selected`/`unselected` activeState (so `aui.states` resolves per open state)
 *  and `state.disabled` (sourced from Root) flips the chroma to the paint's disabled cell. It is a
 *  ZERO-DIFF superset of the former `createTriggerStateRecipe` when no `states` are authored. Shape:
 *  a `PropHook` returning `{ classNameForState }`, `hookProps = {'aui'}`. open/hover stay CSS
 *  (state-layer + `data-popup-open`); the chevron rotate keys off the trigger's `data-popup-open`. */
export const useSelectTriggerRecipe = createTriggerToggleRecipe(SELECT_TRIGGER_VOCAB);

// ─── 2. Popup — stateless surface card (E1.1) ────────────────────────────────────

// The floating listbox surface: a SOLID surface card (`color:'surface'` painted `solid`)
// that floats via the default `elevation: 4` pinned in this vocab (→ `aui-elevation-4`).
// ELEVATION is now a first-class `aui` axis (a consumer can override via `aui={{ elevation }}`
// or `className`). `profile: 'block-padding'` is the open-surface profile: it keeps the scale's
// BLOCK padding (top/bottom listbox breathing room) and zeroes the INLINE padding + gap via the
// `aui-scale-block-padding-<tier>` cell's `--scale-*` FALLBACK rails — so the items own their own
// horizontal indent and an `aui.sx.paddingInline*` override still wins (it sets the `--aui-*`
// hook). This REPLACED the hand-zeroed `.aui-select-popup { --scale-padding-inline: 0 }` marker.
// `shape:'soft'`/`scale:'md'` unchanged.
export const SELECT_POPUP_VOCAB = defineLeaf({
  marker: 'aui-select-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'block-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

/** The unified customisation shape for `Select.Popup` — a plain `.aui-frame` surface card;
 *  full-frame sx (`AuiFrameStyleProps`) so the surface geometry is overridable; `aui.elevation`
 *  overrides the default float. */
export type SelectPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Popup styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
 *  Stateless — the surface card has no per-state recipe (NO useStateLayer; spec §3). */
export const useSelectPopupRecipe = createVocabRecipe(SELECT_POPUP_VOCAB);

// ─── 3. Item — stateful frame row (select-item family) ───────────────────────────

// FULL-surface sx (G12 row-part rework, 2026-06-13). The row "owns" its anatomy via its
// `profile:'default'` SCALE CELL (`aui-scale-default-<tier>` → `--aui-padding-*`/`--aui-min-*`/`--aui-gap`),
// NOT a marker hard-set — and the `.aui-frame` base map + the `.aui-select-item` marker READ those hooks
// (`var(--aui-gap, …)` etc.). So an `aui.sx` anatomy override (`aui-padding-*-N`, 0,1,0) cleanly WINS over
// the scale cell (`:where`, 0,0,0) — no false affordance. `min*` INCLUDED (a row is a rectangle, not a
// paired square). This is LOCAL to Select.Item — the shared `CONTROL_ANATOMY_AXES` is untouched, so Switch
// and other not-yet-reworked narrow row-parts keep it. Exported for the Configurator/regression-lock.
export const SELECT_ITEM_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// CRITICAL: the `states` keys are the canonical `unselected` and `selected` — matching the
// P0.1 `selectItemStateKey` output (Base UI's `selected` field is mapped → `selected`; Select
// Item is binary, no `indeterminate`).
// E1.2 — surface-toned resting + a raised SOLID selected fill (these are DEFAULTS; a consumer
// overrides either via `aui.states.<state>`):
//   unselected = the resting row — a flat, surface-toned row: `surface` chroma painted
//              `text` (no fill, no border). `highlighted` (the roving/hover active row)
//              is a CSS-only `::after` overlay, NOT this recipe state.
//   selected = the chosen row: `raised` chroma painted `solid` (a filled affordance — the
//              `aui-color-solid-raised` cell, `--aui-bg:--theme-raised`). **UPDATED
//              (2026-07-11 USER DECISION — fleet-wide default, screenshot-driven): the
//              selected fill is now the SAME `raised`/`solid` look every ADC `Field.Select`
//              row hand-wrote via `aui.states.selected` (BaseMaterialSection.tsx and 3
//              sibling sections) — this DS default supersedes the earlier flat
//              `surface-alt`/`text` neutral-tone choice, and those ADC overrides are now
//              REDUNDANT (not yet stripped — see the field-forwarding session's blast-radius
//              report).** `shape:'none'` is UNCHANGED — a partial state override merges
//              per-axis, so `selected` keeps the flat (unrounded) row shape. (DISABLED still
//              forces the SAME grey `solid` fill via `forceDisabledFillPaint` in the
//              select-item recipe — matching the Trigger's disabled look; that branch is
//              unaffected by this change since it already forced `solid`.)
// `marker:'aui-select-item'` so the row carries the class the P0.3 state CSS targets.
export const SELECT_ITEM_VOCAB = defineLeaf({
  marker: 'aui-select-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: SELECT_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: { scale: 'sm' as const },
  states: {
    unselected: { color: 'surface', paint: 'text', shape: 'none' },
    selected: { color: 'raised', paint: 'solid', shape: 'none' },
  },
});

/** Unified `aui` customisation shape for `Select.Item` (mirrors `CheckboxAui`).
 *  `scale` stays top-level (geometry must not shift per-state); per-state entries omit it.
 *  `sx` is the FULL `AuiFrameStyleProps` surface (G12 row-part rework 2026-06-13 — the marker reads
 *  the anatomy hooks, so a geometry override resolves live; `min*` included). States keys =
 *  canonical `unselected` | `selected` (the P0.1 vocabulary). */
export type SelectItemAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Item's STATEFUL vocab recipe: reads `props.aui`, returns `{ classNameForState }`.
 *  Uses the P0.1 `select-item` family — `classNameForState(state)` reads Base UI's
 *  `{selected, disabled}` render state (ignoring `highlighted`) and resolves the row's
 *  `.aui-*` classes per state. `hookProps = {'aui'}` — factory strips `aui` from the DOM. */
export const useSelectItemRecipe = createSelectItemVocabRecipe(SELECT_ITEM_VOCAB);

// ─── 4. GroupLabel — stateless frame caption row (USER DIRECTIVE 11, 2026-07-10) ─
//
// BYTE-IDENTICAL MIRROR of `DROPDOWN_GROUP_LABEL_VOCAB` (`dropdown/use-recipe.ts:220-226`, the
// fleet anchor) — same axes, same profile, same defaults. A FULL BOX frame, MIRRORING
// `SELECT_ITEM_VOCAB`'s unselected geometry (`surface`/`text` — a flat, fill-less box; SAME chroma
// the items beneath it use), so its inline padding comes from the SAME `aui-scale-default-<tier>`
// cell as the items instead of a hand-coded literal that drifts when the default tier changes. The
// CAPTION look (muted color, small uppercase typescale, semibold, caption block rhythm) stays in
// `_state-cascade.scss` as overrides on top of this cascade-driven box — mirrors
// `.aui-dropdown-group-label` verbatim. Stateless (a caption is not interactive — no useStateLayer).
export const SELECT_GROUP_LABEL_VOCAB = defineLeaf({
  marker: 'aui-select-group-label',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});

/** Unified customisation shape for `Select.GroupLabel` — a full `.aui-frame` caption box
 *  (mirrors `SelectItemAui`'s geometry: `color/paint/scale/profile/elevation/shape` + full-frame
 *  `sx`); the box geometry (incl. the item-aligned inline padding) comes from the scale cell. */
export type SelectGroupLabelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** GroupLabel styling recipe: stateless `createVocabRecipe` (no per-state axis). Paired with
 *  `useScaleCascade` in the component so the Select root scale flows in and the caption emits the
 *  SAME `aui-scale-default-<tier>` cell as the items (→ matched inline padding). Mirrors
 *  `useDropdownGroupLabelRecipe` verbatim. */
export const useSelectGroupLabelRecipe = createVocabRecipe(SELECT_GROUP_LABEL_VOCAB);
