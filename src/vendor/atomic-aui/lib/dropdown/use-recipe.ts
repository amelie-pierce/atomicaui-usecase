// modules/design/atomic-aui/src/lib/dropdown/use-recipe.ts
//
// Task P1 — the three per-part Dropdown recipe vocabs + their unified `aui` types.
// Pure TypeScript (no React, no Base UI here — the component wiring is P2). Each recipe
// resolves the unified `aui` appearance prop into a deterministic `.aui-*` class string
// via the ONE `buildLeafClasses` engine, mirroring select/use-recipe.ts conventions.
//
//   • Trigger — classNameForState frame (context-disabled via Base UI Menu.Root context)
//   • Popup   — stateless surface-card frame (identical shape to Select.Popup)
//   • Item    — local static-className hook (own-prop disabled; no `selected`/per-state axis)
//
// ─── CODE-FIRST DEFAULTS ────────────────────────────────────────────────────────
// Defaults chosen code-first against the live Core 6.0 token unions. Verified members
// of `AuiColor` and `AuiRecipePaint`. Reconcile with the Figma Dropdown anatomy when
// the design track lands (same convention as Select).

import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle';
import { createMenuCheckableVocabRecipe } from '../../families/menu-checkbox-item/create-menu-checkable-vocab-recipe';
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
import type { PropHook, AnyProps } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { LeafVocabulary } from '../../core/vocabulary/leaf-vocabulary';

// Public Dropdown axis names alias the shared core recipe vocabulary —
// parity with SelectColor/Paint/Scale/Shape and ButtonColor/Paint/Scale/Shape.
export type DropdownColor = AuiRecipeColor;
export type DropdownPaint = AuiRecipePaint;
export type DropdownScale = AuiRecipeScale;
export type DropdownShape = AuiRecipeShape;

// ─── 1. Trigger — context-disabled frame (classNameForState) ─────────────────
//
// A solid-filled button-class trigger (`surface-alt` chroma painted `solid`).
// `marker:'aui-dropdown-trigger'` so the CSS can lay the trigger out as a flex row
// (label + auto-chevron). The Trigger KEEPS its keyboard `:focus-visible` ring (it's
// the single focusable tab stop — a11y). The flex layout lives in `_state-cascade.scss`.
//
// NOTE ON DEFAULTS: `surface-alt/solid` matches the Select.Trigger default and ensures
// the disabled cell is `aui-color-solid-disabled` (grey fill), which matches the disabled
// Item below. USER-TUNABLE: the consumer OWNS this vocab — `primary/solid` is a perfectly
// valid alternative for a primary launcher. Hand-edit `defaults` in the vocab.
export const DROPDOWN_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-dropdown-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft' },
});

/** Unified customisation shape for `Dropdown.Trigger` — a plain `.aui-frame` consumer
 *  (Button-class): the full Appearance + the FULL-frame sx surface (`AuiFrameStyleProps`,
 *  box geometry is author-overridable) + OPTIONAL per-state appearance keyed on the canonical
 *  trigger state (`unselected` = closed / `selected` = open / `indeterminate` reserved). With no
 *  `states` authored the resolved class string is identical to the stateless trigger recipe (the
 *  `createTriggerToggleRecipe` zero-diff superset). Mirrors `DropdownCheckableItemAui`. */
export type DropdownTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Trigger styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
 *  A canonical-state `classNameForState` recipe (NOT `createVocabRecipe`). The Trigger's disabled
 *  comes from `Dropdown.Root` via Base UI CONTEXT — it never reaches the element as a `disabled`
 *  prop (MenuTrigger.js:88-89 context-merge), so a `props.disabled`-based flip would never fire.
 *  The shared `families/trigger-toggle` factory resolves this recipe with Base UI's render state:
 *  `open`/`panelOpen` → the `'selected'`/`'unselected'` activeState (so `aui.states` resolves
 *  per open-state) and `disabled` flips the chroma to the paint's disabled cell. A zero-diff
 *  superset of the former `createTriggerStateRecipe` when no `states` are authored. Shape: a
 *  `PropHook` returning `{ classNameForState }`, `hookProps = {'aui'}`. hover stays CSS. */
export const useDropdownTriggerRecipe = createTriggerToggleRecipe(DROPDOWN_TRIGGER_VOCAB);

// ─── 2. Popup — stateless surface card ───────────────────────────────────────
//
// The floating menu surface: a SOLID surface card (`color:'surface'` painted `solid`)
// that floats via the default `elevation: 4` pinned in this vocab (→ `aui-elevation-4`).
// ELEVATION is now a first-class `aui` axis (a consumer can override via `aui={{ elevation }}`
// or `className`). `shape:'soft'`/`scale:'sm'` matching Select.Popup.
//
// PROFILE — `profile: 'block-padding'` (the open-surface profile, IDENTICAL to Select.Popup):
// the `aui-scale-block-padding-<tier>` cell KEEPS the scale's BLOCK padding but zeroes the inline
// + gap RAILS, so the items own their horizontal indent (an inline pad here would double-indent
// every row). This REPLACED the former hand-zeroed `:where(.aui-dropdown-popup){--aui-padding-inline-*:0}`
// marker (which UNCONDITIONALLY pinned the inline HOOK → the `profile` knob could never drive inline
// padding; a consumer picking a different profile saw NO inline change — the 2026-06-14 dead-profile
// bug). Now the inline-zero is profile-DRIVEN (a consumer's `aui={{ profile: 'default' }}` restores
// inline padding, exactly like Select.Popup), and `aui.sx.paddingInline*` still wins (a 0,1,0 utility
// over the 0,0,0 scale cell). Default render is VISUALLY identical: the block-padding cell keeps the
// tier's block padding + zeroes the inline rail; the popup is `display:block` (the marker only sets
// `flex-direction`, inert on a block
// box), so the gap rail block-padding now zeroes was ALREADY inert — no flex/grid descendant reads it.
// (The only computed-style delta is the popup's own `row-gap`, which block layout never applies.)
export const DROPDOWN_POPUP_VOCAB = defineLeaf({
  marker: 'aui-dropdown-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'block-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

/** Unified customisation shape for `Dropdown.Popup` — a plain `.aui-frame` surface card;
 *  full-frame sx (`AuiFrameStyleProps`) so the surface geometry is overridable; `aui.elevation`
 *  overrides the default float. */
export type DropdownPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Popup styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
 *  Stateless — the surface card has no per-state recipe (NO useStateLayer; spec §3). */
export const useDropdownPopupRecipe = createVocabRecipe(DROPDOWN_POPUP_VOCAB);

// ─── 3. Item — local static-className hook ───────────────────────────────────
//
// The action row. DOES NOT use the select-item family (no `selected` state) and DOES NOT
// use `createVocabRecipe` (it can't force solid-on-disable). Uses a LOCAL static-className
// hook that reads own-prop `props.disabled` and returns a STATIC `{ className }`.
//
// WHY static `props.disabled` is correct:
//   Menu.Item disabled is a REAL OWN PROP (MenuItem.js:18-28, destructured directly,
//   NO root context merge). So `props.disabled` reliably carries the disabled signal.
//   If a future Base UI version context-merges Menu.Item disabled, switch this hook
//   to a `classNameForState` reading render-state (Menu.Item is a component → clears the
//   `as`-guard; see spec §4 robustness note).
//
// DISABLED-FILL POLICY (locked user preference):
//   Grey-filled disabled action rows are unconventional (can read as "active"). This is
//   a LOCKED user preference — matches the disabled Trigger (same `aui-color-solid-disabled`
//   cell = grey fill + muted content), consistent with Select.Item. A consumer can still
//   override via `aui.sx.foreground` / `className` but may break disabled contrast — that
//   is the consumer's override, documented as a gotcha in the consume-doc.

// FULL-surface row-part (G12 rework 2026-06-13, mirroring Select.Item). The item-family markers
// (`.aui-dropdown-item` / `-checkbox-item` / `-radio-item` / `-submenu-trigger`) only set
// display/align/justify/gap (gap READS `--aui-gap`) + cursor/user-select — they DO NOT hard-set
// padding/min/width/background. So the `.aui-frame` base map drives anatomy from the `--aui-*`
// hooks and a widened `aui.sx` knob (0,1,0) wins over the scale cell (0,0,0). The full surface is
// therefore safe to expose — every anatomy axis is a live knob, not a false affordance. EXPORTED so
// the regression-lock spec can assert it never narrows back (the Configurator drives these rows via
// the `'frame'` SxKind). This is the item-family's OWN allow-list — NOT the shared
// `CONTROL_ANATOMY_AXES` (Select/Dropdown structural parts stay narrow).
export const DROPDOWN_ITEM_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const DROPDOWN_ITEM_VOCAB = defineLeaf({
  marker: 'aui-dropdown-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: DROPDOWN_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  // NOTE: NO `states{}` — there is no `selected`/per-state appearance axis.
  // Action items are fired and forgotten; the Dropdown has no value model.
});

/** Unified customisation shape for `Dropdown.Item` — FULL-frame sx (`AuiFrameStyleProps`; the
 *  marker reads the `--aui-*` anatomy hooks, so every box axis is a live knob — G12 2026-06-13).
 *  NOTE: NO `states` key — there is no `selected`/per-state appearance axis. */
export type DropdownItemAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// Typed constant for the forced disabled-fill paint (so the literal satisfies AuiRecipePaint).
const DISABLED_FILL_PAINT: AuiRecipePaint = 'solid';

/** Props shape for the local Dropdown.Item recipe hook. */
interface DropdownItemRecipeProps extends AnyProps {
  aui?: DropdownItemAui;
}

/**
 * Build a LOCAL static-className hook for Dropdown.Item.
 *
 * Returns `{ className }` — a static string (NOT a `classNameForState` function).
 * This sidesteps the `as`-guard entirely because own-prop `props.disabled` is always
 * available (Menu.Item disabled is a real own-prop, verified MenuItem.js:18-28).
 *
 * Disabled branch ONLY: force `solid` paint at top-level so buildLeafClasses emits
 * `aui-color-solid-disabled` (grey fill + muted content) — the SAME cell the disabled
 * Trigger uses. Shallow clone; never mutate the consumer's `aui`. Non-disabled untouched.
 *
 * `hookProps = {'aui'}` strips `aui` from the DOM so it never reaches the underlying element.
 */
function createDropdownItemRecipe(
  vocab: LeafVocabulary,
): PropHook<DropdownItemRecipeProps, { className: string }> {
  const hook: PropHook<DropdownItemRecipeProps, { className: string }> = (props) => {
    const aui = props.aui as Appearance | undefined;
    const disabled = !!props.disabled;
    // Disabled branch ONLY: force `solid` paint at top-level so buildLeafClasses emits
    // aui-color-solid-disabled (grey fill + muted content) — the SAME cell the disabled
    // Trigger uses. Shallow clone; never mutate the consumer aui. Non-disabled untouched.
    const resolved: Appearance | undefined = disabled
      ? { ...(aui ?? {}), paint: DISABLED_FILL_PAINT }
      : aui;
    return { className: buildLeafClasses(vocab, resolved, undefined, disabled) };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}

export const useDropdownItemRecipe = createDropdownItemRecipe(DROPDOWN_ITEM_VOCAB);

// ─── 3b. GroupLabel — a caption row that is a FULL BOX, aligned with the items ───
//
// The section caption (ACCOUNT / WORKSPACE …). It used to be a box-less tier-1 marker with a
// HAND-CODED `padding-inline: var(--p-px-12)` (the old default-MD item rail) — so after the
// 2026-06-14 default md→sm change its inline indent (12px) no longer matched the items' (8px at
// sm). Per the user: make it a FULL BOX like the Item so its inline padding comes from the SAME
// `aui-scale-default-<tier>` cell (8px at sm, tracking the tier) instead of a hard literal.
//
// It MIRRORS DROPDOWN_ITEM_VOCAB for box geometry (`surface / text / default / none` — a flat,
// fill-less `.aui-frame`, so NO box paint, honoring the original caption intent). The CAPTION look
// (muted color, small uppercase typescale, semibold, the tighter caption block rhythm) stays in
// `_state-cascade.scss` as overrides; only the inline padding is now cascade-driven. Stateless (a
// caption is not interactive — no useStateLayer, no per-state axis).
export const DROPDOWN_GROUP_LABEL_VOCAB = defineLeaf({
  marker: 'aui-dropdown-group-label',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});

/** Unified customisation shape for `Dropdown.GroupLabel` — a full `.aui-frame` caption box
 *  (mirrors `DropdownItemAui`: `color/paint/scale/profile/elevation/shape` + full-frame `sx`);
 *  the box geometry (incl. the item-aligned inline padding) comes from the scale cell. */
export type DropdownGroupLabelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** GroupLabel styling recipe: stateless `createVocabRecipe` (no per-state axis). Paired with
 *  `useScaleCascade` in the component so the Dropdown root scale flows in and the caption emits the
 *  SAME `aui-scale-default-<tier>` cell as the items (→ matched inline padding). */
export const useDropdownGroupLabelRecipe = createVocabRecipe(DROPDOWN_GROUP_LABEL_VOCAB);

// ─── 4. CheckboxItem / RadioItem — stateful checkable rows ───────────────────
//
// The selectable-row recipes (Phase 2). Unlike the action Item (no value model), a
// CheckboxItem / RadioItem carries a PERSISTENT `checked` state axis, so it uses the
// `menu-checkbox-item` per-state FAMILY (clone of `select-item`, keyed on `checked`),
// driven by `useStateLayer` for the transient highlight overlay. ONE family serves BOTH
// (identical Base UI render-state shape `{checked, disabled, highlighted}`); only the
// MARKER differs so the CSS can target each row class. States keys = the canonical
// `unselected` / `selected` (Base UI's `checked` field is MAPPED → `selected`; flat
// `surface/text` unselected; `raised/solid` selected — a filled affordance, mirroring
// SELECT_ITEM_VOCAB (2026-07-11 USER DECISION — fleet-wide default, screenshot-driven;
// SUPERSEDES the earlier flat `surface-alt/text` neutral-tone default; see
// select/use-recipe.ts's SELECT_ITEM_VOCAB comment for the full rationale); the trailing
// indicator remains a SEPARATE affordance on top of the fill; the DISABLED branch forces a
// grey `solid` fill via the family's `forceDisabledFillPaint`, matching the disabled Trigger
// (unaffected by this change — it already forced `solid`).
//
// FULL-surface sx — reuse the widened `DROPDOWN_ITEM_SX_AXES` (G12; the checkable-row markers
// read the `--aui-*` anatomy hooks, identical to the action Item) so every box axis is a live knob.

export const MENU_CHECKBOX_ITEM_VOCAB = defineLeaf({
  marker: 'aui-dropdown-checkbox-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: DROPDOWN_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: { scale: 'sm' as const },
  states: {
    unselected: { color: 'surface', paint: 'text', shape: 'none' },
    selected: { color: 'raised', paint: 'solid', shape: 'none' },
  },
});

export const MENU_RADIO_ITEM_VOCAB = defineLeaf({
  marker: 'aui-dropdown-radio-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: DROPDOWN_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: { scale: 'sm' as const },
  states: {
    unselected: { color: 'surface', paint: 'text', shape: 'none' },
    selected: { color: 'raised', paint: 'solid', shape: 'none' },
  },
});

/** Unified `aui` customisation shape for `Dropdown.CheckboxItem` / `Dropdown.RadioItem`
 *  (mirrors `SelectItemAui`).
 *  `scale`/`profile` MAY vary per-state (unified-states model), but the vocab keeps geometry stable
 *  by default — per-state entries typically set only color/paint/shape. `sx` is the FULL-frame
 *  `AuiFrameStyleProps` surface (the marker reads the `--aui-*` anatomy hooks — G12 2026-06-13).
 *  States keys = canonical `unselected` | `selected` (the `menu-checkbox-item` family maps
 *  Base UI's `checked` field → `selected`). */
export type DropdownCheckableItemAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** CheckboxItem's STATEFUL vocab recipe: reads `props.aui`, returns `{ classNameForState }`.
 *  Uses the `menu-checkbox-item` family — `classNameForState(state)` reads Base UI's
 *  `{checked, disabled}` render state (ignoring `highlighted`) and resolves the row's
 *  `.aui-*` classes per state. `hookProps = {'aui'}` — factory strips `aui` from the DOM. */
export const useDropdownCheckboxItemRecipe = createMenuCheckableVocabRecipe(MENU_CHECKBOX_ITEM_VOCAB);

/** RadioItem's STATEFUL vocab recipe — SAME family, different marker. */
export const useDropdownRadioItemRecipe = createMenuCheckableVocabRecipe(MENU_RADIO_ITEM_VOCAB);

// ─── 5. SubmenuTrigger — context-disabled item row that opens a submenu ───────
//
// Phase 3 — a SubmenuTrigger is an ITEM ROW (same flat appearance as Dropdown.Item) that
// ALSO opens a nested submenu. It has NO `selected`/`checked` axis (it's not a value option),
// so its vocab MIRRORS DROPDOWN_ITEM_VOCAB (flat `surface/text/md/none`, full-frame sx) —
// only the MARKER differs (`aui-dropdown-submenu-trigger`) so the CSS can lay out the trailing
// submenu chevron.
//
// DISABLED — TWO requirements that neither of the existing recipes alone satisfies:
//   (1) Base UI's MenuSubmenuTrigger COMPUTES `disabled = disabledProp || rootDisabled`
//       (MenuSubmenuTrigger.js:76) — a Root-context merge identical to the Trigger. The render
//       `state.disabled` carries the TRUE merged value, so the disabled flag MUST come from the
//       render state (a `props.disabled` static hook would MISS a Root-disabled submenu trigger).
//       → rules out the local static `createDropdownItemRecipe` (which reads `props.disabled`).
//   (2) The disabled row must use the SAME grey `solid` fill as the disabled Item/Trigger (the
//       locked grey-on-disable policy) — but this vocab's default paint is `text` (flat row), so
//       merely flagging disabled to buildLeafClasses yields `text-disabled`, NOT `solid-disabled`.
//       → rules out the shared `createTriggerStateRecipe` (which never forces solid).
// So this uses a LOCAL `classNameForState` hook (below) that reads render-state `disabled` AND
// forces `paint:'solid'` in the disabled branch — the union of both behaviors. open/hover/highlight
// stay CSS (useStateLayer + data-popup-open).
export const DROPDOWN_SUBMENU_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-dropdown-submenu-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: DROPDOWN_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  // NOTE: NO `states{}` — like Dropdown.Item, no `selected`/per-state appearance axis.
});

/** Unified customisation shape for `Dropdown.SubmenuTrigger` — identical to `DropdownItemAui`
 *  (FULL-frame `AuiFrameStyleProps`; the marker reads the `--aui-*` anatomy hooks — G12; NO `states`). */
export type DropdownSubmenuTriggerAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Render-state shape consumed by the SubmenuTrigger recipe (structurally typed — only
 *  `disabled` is read; Base UI passes `{disabled, highlighted, open}`). */
type SubmenuTriggerRenderState = { disabled?: boolean };

/** Props shape for the local SubmenuTrigger recipe hook. */
interface DropdownSubmenuTriggerRecipeProps extends AnyProps {
  aui?: DropdownSubmenuTriggerAui;
}

/**
 * Build a LOCAL `classNameForState` hook for Dropdown.SubmenuTrigger.
 *
 * Combines the trigger-state behavior (disabled read from Base UI RENDER STATE, since the submenu
 * trigger's disabled is Root-merged — never a reliable own-prop) with the Item's grey-on-disable
 * policy (force `solid` paint in the disabled branch so buildLeafClasses emits the grey
 * `aui-color-solid-disabled` cell, matching the disabled Item/Trigger). Non-disabled is untouched
 * (the flat `surface/text` row). Shallow clone; never mutate the consumer's `aui`.
 *
 * `hookProps = {'aui'}` strips `aui` from the DOM so it never reaches the underlying element.
 */
function createDropdownSubmenuTriggerRecipe(
  vocab: LeafVocabulary,
): PropHook<DropdownSubmenuTriggerRecipeProps, { classNameForState: (state: unknown) => string }> {
  const hook: PropHook<
    DropdownSubmenuTriggerRecipeProps,
    { classNameForState: (state: unknown) => string }
  > = (props) => {
    const aui = props.aui as Appearance | undefined;
    return {
      classNameForState: (state: unknown) => {
        const disabled = !!(state as SubmenuTriggerRenderState | null)?.disabled;
        // Disabled branch ONLY: force `solid` so buildLeafClasses emits aui-color-solid-disabled
        // (the grey fill the disabled Item/Trigger use). Shallow clone; non-disabled untouched.
        const resolved: Appearance | undefined = disabled
          ? { ...(aui ?? {}), paint: DISABLED_FILL_PAINT }
          : aui;
        return buildLeafClasses(vocab, resolved, undefined, disabled);
      },
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}

/** SubmenuTrigger styling recipe — a LOCAL `classNameForState` hook (disabled flips off Base UI's
 *  Root-merged render state AND forces the grey solid-disabled fill). open/hover stay CSS. */
export const useDropdownSubmenuTriggerRecipe =
  createDropdownSubmenuTriggerRecipe(DROPDOWN_SUBMENU_TRIGGER_VOCAB);
