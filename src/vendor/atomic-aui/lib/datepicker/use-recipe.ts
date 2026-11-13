// modules/design/atomic-aui/src/lib/datepicker/use-recipe.ts
//
// The per-part Datepicker recipe vocabs + their unified `aui` types. Pure TypeScript (no React, no
// Base UI). Mirrors `select/use-recipe.ts` — Datepicker is the value-picker built on Base UI's
// **Popover** (which owns the overlay machinery but has NO value/calendar concept), so the Trigger +
// Popup vocabs are near-verbatim clones of the Select ones; the Day cell is a hand-owned stateful
// cell (Base UI ships no calendar) whose state is resolved by US, not a Base UI render state.
//
// ─── CODE-FIRST DEFAULTS (Figma ABSENT for Datepicker — evidence pack §"Figma") ─────────────────
// Every default below is chosen code-first against the live Core 6.0 token unions + the Select
// precedent, and documented here. All chroma are verified members of `AuiColor`; all paints of
// `AuiRecipePaint`. There is no Figma anatomy to reconcile against (registry-cited absence).

import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import type { PropHook, AnyProps } from '../../core/types';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type { AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape } from '../../core/vocabulary/recipe-vocab';

// Public Datepicker axis names alias the shared core recipe vocabulary (token-derived, owned by
// core/) — parity with SelectColor/Paint/Scale/Shape.
export type DatepickerColor = AuiRecipeColor;
export type DatepickerPaint = AuiRecipePaint;
export type DatepickerScale = AuiRecipeScale;
export type DatepickerShape = AuiRecipeShape;

// ─── 1. Trigger — solid-filled input-like field (mirrors SELECT_TRIGGER_VOCAB) ───────────────────
// A form-field trigger: a solid-filled button-class field (`surface-alt` chroma painted `solid`)
// showing the formatted date + a calendar icon. `marker:'aui-datepicker-trigger'` so the CSS lays it
// out as a flex row (Value ↔ icon). The Trigger KEEPS its keyboard `:focus-visible` ring (single tab
// stop). The flex layout lives in `_state-cascade.scss`.
export const DATEPICKER_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-datepicker-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft' },
});

/** The unified customisation shape for `Datepicker.Trigger` — a plain `.aui-frame` consumer
 *  (Button-class): the full Appearance + the FULL-frame sx surface (`AuiFrameStyleProps`) + per-state
 *  `states` (`unselected` = closed / `selected` = open / `indeterminate` reserved). Mirrors
 *  `SelectTriggerAui`. With no `states` authored the class string equals the stateless trigger. */
export type DatepickerTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Trigger recipe: unified `aui` → `.aui-*` class string. An open-aware `classNameForState` recipe
 *  via the SHARED `families/trigger-toggle` factory (IDENTICAL to Select.Trigger): Base UI's Popover
 *  trigger `state.open` → the `selected`/`unselected` activeState; `state.disabled` flips the chroma.
 *  Base UI Popover.Trigger is a COMPONENT, so the function className clears the factory `as`-guard. */
export const useDatepickerTriggerRecipe = createTriggerToggleRecipe(DATEPICKER_TRIGGER_VOCAB);

// ─── 1b. Input — the TYPEABLE field FRAME (mirrors NUMBER_FIELD_GROUP_VOCAB, NOT the solid Trigger) ─
// The alternative anatomy: a bordered control-row FRAME hosting a transparent inner <input> + a
// trailing calendar IconButton (the NumberField.Group anatomy). Unlike the Trigger (a solid-filled
// chip), the Input frame is the OUTLINED field look — `surface` chroma painted `fixed` (an inset
// border, no fill), `profile: default` — byte-identical defaults to NumberField.Group. It is a static
// `.aui-frame` (NOT open-aware via a Base UI render state: an <input> can't nest in a Popover.Trigger,
// so the frame is a plain host; its open/focus affordances are `data-open`/`:focus-within` in CSS).
export const DATEPICKER_INPUT_VOCAB = defineLeaf({
  marker: 'aui-datepicker-input',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'fixed', scale: 'sm', shape: 'soft', elevation: 0 },
});

/** The unified customisation shape for `Datepicker.Input` — a plain `.aui-frame` field row (like
 *  NumberField.Group): the full Appearance + the FULL-frame sx surface. No `states` (the frame is
 *  static; open/focus are CSS `data-*`/`:focus-within` affordances, not recipe states). */
export type DatepickerInputAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Input-frame recipe: stateless `.aui-frame` (mirrors `useNumberFieldGroupRecipe`). `createVocabRecipe`
 *  reads `props.disabled` → flips the border to the fixed disabled cell. */
export const useDatepickerInputRecipe = createVocabRecipe(DATEPICKER_INPUT_VOCAB);

// ─── 2. Popup — stateless surface card (mirrors SELECT_POPUP_VOCAB, but a PADDED calendar host) ───
// The floating calendar surface: a SOLID surface card (`surface`/`solid`) that floats via the default
// `elevation: 4`. Unlike the Select popup (a `block-padding` listbox whose ITEMS own the inline
// indent), the calendar Popup keeps the scale's FULL padding via `profile: 'default'` — the calendar
// grid is a self-contained block that wants even breathing room on all four sides.
export const DATEPICKER_POPUP_VOCAB = defineLeaf({
  marker: 'aui-datepicker-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

/** The unified customisation shape for `Datepicker.Popup` — a plain `.aui-frame` surface card;
 *  full-frame sx so the surface geometry is overridable; `aui.elevation` overrides the default float. */
export type DatepickerPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Popup recipe: stateless surface card (NO useStateLayer — a surface has no hover/focus overlay). */
export const useDatepickerPopupRecipe = createVocabRecipe(DATEPICKER_POPUP_VOCAB);

// ─── 3. Day — hand-owned STATEFUL cell (Base UI ships no calendar) ────────────────────────────────
// The three PERSISTENT appearance states a day cell resolves a recipe for. `today` is a distinct
// resting look (a subtle ring, drawn in CSS off `data-today`); `selected` is the filled cell. The
// `unselected|selected` pair is the range-ready seam (range-start/middle/end can be ADDED as state
// keys later without reshaping the vocab — evidence-pack pin #1).
export type DatepickerDayStateKey = 'unselected' | 'selected' | 'today';

// FULL-surface sx (G12): a day cell is a definite square box that reads its anatomy hooks. `min*`
// included (the square-intent profile pairs them). Exported for the Configurator/regression-lock.
export const DATEPICKER_DAY_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// `profile: 'square'` makes each cell a square box (the system-wide square-intent rule squares
// `.aui-scale-square-<tier>`), so the 7-column grid reads as an even matrix. DEFAULTS:
//   unselected = flat resting cell (`surface`/`text` — no fill, no border);
//   selected   = the chosen day: a filled `primary`/`solid` cell (the selection affordance);
//   today      = flat like unselected (the ring is a CSS `data-today` affordance, NOT a fill) — a
//                consumer can override via `aui.states.today` to tint it.
export const DATEPICKER_DAY_VOCAB = defineLeaf({
  marker: 'aui-datepicker-day',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: DATEPICKER_DAY_SX_AXES,
  profile: 'square' as const,
  defaults: { scale: 'sm' as const, shape: 'soft' as const },
  states: {
    unselected: { color: 'surface', paint: 'text' },
    selected: { color: 'primary', paint: 'solid' },
    today: { color: 'surface', paint: 'text' },
  },
});

/** Unified `aui` customisation shape for `Datepicker.Day`. `scale` stays top-level (grid geometry
 *  must not shift per-state); per-state entries omit it. `sx` is the FULL `AuiFrameStyleProps`
 *  surface. States keys = `unselected` | `selected` | `today` (the range-ready seam). */
export type DatepickerDayAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<DatepickerDayStateKey,
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Props the Day recipe reads. Unlike Select.Item (Base UI render state → `classNameForState`), the
 *  Day host is an INTRINSIC `<button>` — the factory THROWS on a function className for a string
 *  `as` — so this recipe resolves OUR computed state to a STATIC className string. `selected`/
 *  `today`/`disabled` are booleans WE pass; `aui`/`selected`/`today` are stripped from the DOM. */
export interface DatepickerDayRecipeProps extends AnyProps {
  aui?: DatepickerDayAui;
  selected?: boolean;
  today?: boolean;
  disabled?: boolean;
}

/**
 * Build the STATIC-className Day recipe. Priority `selected > today > unselected` picks the single
 * active state key; `buildLeafClasses(vocab, aui, key, disabled)` resolves the class string (the same
 * engine + layer ordering as every other leaf). Returns `{ className }` (NOT `classNameForState`) so
 * it is legal on an intrinsic `<button>` host. `disabled` is read for the chroma flip but is stripped
 * from the DOM (the cell renders `aria-disabled`, never a native `disabled` that would drop it from
 * roving focus). `hookProps = {aui, selected, today, disabled}`.
 */
export function createDatepickerDayRecipe<
  P extends DatepickerDayRecipeProps = DatepickerDayRecipeProps
>(vocab: typeof DATEPICKER_DAY_VOCAB): PropHook<P, { className: string }> {
  const hook: PropHook<P, { className: string }> = (props) => {
    const aui = props.aui as DatepickerDayAui | undefined;
    const key: DatepickerDayStateKey = props.selected ? 'selected' : props.today ? 'today' : 'unselected';
    return { className: buildLeafClasses(vocab, aui, key, !!props.disabled) };
  };
  hook.hookProps = new Set(['aui', 'selected', 'today', 'disabled']);
  return hook;
}

export const useDatepickerDayRecipe = createDatepickerDayRecipe(DATEPICKER_DAY_VOCAB);
