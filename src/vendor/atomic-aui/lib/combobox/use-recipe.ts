// modules/design/atomic-aui/src/lib/combobox/use-recipe.ts
//
// Round-5 REBUILD — the per-part Combobox recipe vocabs + their unified `aui` types. Pure
// TypeScript (no React, no Base UI here — the wrapping lives in combobox.tsx), exactly like
// select/use-recipe.ts. Each recipe resolves the unified `aui` appearance prop into a
// deterministic `.aui-*` class string via the ONE `buildLeafClasses` engine.
//
// Sibling-parity note (evidence-first, L12): Select is the nearest shipped sibling for the
// open-surface anatomy (Trigger/Popup/Item); Combobox ADDS the InputGroup rail + the typing
// Input, which have no Select equivalent — those two vocabs are new anatomy, code-first per the
// consume-doc (`_vaults/atomicaui/wiki/component-classes/combobox.md`), NOT copied from a sibling
// (there is nothing to copy — Select has no typing surface).
//
//   • InputGroup — stateless-by-props, Base-UI-CONTEXT-disabled frame (the rail)
//   • Input      — stateless-by-props, Base-UI-CONTEXT-disabled frame (the typing surface)
//   • Trigger    — stateful frame row (open ⇒ selected/unselected + disabled), trigger-toggle family
//   • Popup      — stateless surface-card frame (elevation 2 — contract item 2, NOT Select's 4)
//   • Item       — stateful frame row (unselected/selected + disabled), select-item family (REUSED —
//                  component-agnostic: reads Base UI's `{selected, disabled}` render state, which
//                  `ComboboxItemState` carries identically to `SelectItemState`)
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { createTriggerStateRecipe } from '../../families/trigger-state/create-trigger-state-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle';
import { createSelectItemVocabRecipe } from '../../families/select-item/create-select-item-vocab-recipe';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type { AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape } from '../../core/vocabulary/recipe-vocab';

// Public Combobox axis names alias the shared core recipe vocabulary (token-derived, owned by
// core/) — parity with SelectColor/Paint/Scale/Shape.
export type ComboboxColor = AuiRecipeColor;
export type ComboboxPaint = AuiRecipePaint;
export type ComboboxScale = AuiRecipeScale;
export type ComboboxShape = AuiRecipeShape;

const FULL_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// ─── 1. InputGroup — the rail (Base-UI-context-disabled frame) ───────────────────
//
// CORRECTION (round-5 painted-parity pass, evidence-first): the rail hosts a REAL typing input, so
// its floor sibling is the TEXT-FIELD family — `Datepicker.Input`'s Input-mode rail
// (`DATEPICKER_INPUT_VOCAB`, `surface`/`fixed`) and `NumberField.Group` (`NUMBER_FIELD_GROUP_VOCAB`,
// same pair) — an OUTLINED, bordered field box (white/theme fill + a 1px border), NOT
// `Select.Trigger`'s SOLID filled button chip (`surface-alt`/`solid`, no border). Base UI's own
// canonical multiple-select reference composition confirms the same shape (a bordered `InputGroup`
// box, `border border-neutral-950 bg-white`, `docs/react/components/combobox.md:633`) — a Combobox
// never renders as a filled button because it is never JUST a click target, it always carries a
// live text cursor. Browser-measured (round-5 correction lane, :31000): the PRIOR `surface-alt/solid`
// pair painted `rgb(241,245,249)` with NO border (byte-identical to Select.Trigger's OWN paint) and
// additionally inflated the rail to 37px at `sm` (vs the sibling floor's 28px, see the Trigger note
// below) — both defects trace to this vocab. `ComboboxInputGroup` carries NO own `disabled` prop
// (verified: `ComboboxInputGroup.js` computes `disabled` PURELY from the Root's context, never a
// `disabledProp`) — so a plain `createVocabRecipe` (which reads `props.disabled`) would never see
// it; `createTriggerStateRecipe` reads it off Base UI's render STATE instead (mirrors Select.Trigger's
// identical problem — component-engineer skill "Reusable patterns from Select/Dropdown": disabled
// varies by Base UI part, context-merged on a Select/Combobox-Root-scoped part).
export const COMBOBOX_INPUT_GROUP_VOCAB = defineLeaf({
  marker: 'aui-combobox-input-group',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'fixed', scale: 'sm', shape: 'soft' },
});

export type ComboboxInputGroupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** `classNameForState` recipe: stateless appearance (no activeState); the disabled chroma flips
 *  off Base UI's render state (`ComboboxInputGroupState.disabled`), never `props.disabled`. */
export const useComboboxInputGroupRecipe = createTriggerStateRecipe(COMBOBOX_INPUT_GROUP_VOCAB);

// ─── 2. Input — the typing surface (Base-UI-context-disabled frame) ──────────────
//
// Transparent `text` paint floating over the InputGroup fill; `shape` pins `none` (the rail owns
// the rounding), `profile` pins `no-padding` (the rail owns the box padding) — mirrors the
// Field.Input projection (`resolveFieldInputAui`, field.tsx) so the rail height is governed by the
// rail's scale cell alone, the Input contributing none of its own. `ComboboxInput` DOES declare an
// own `disabled` prop in its typings, but internally merges it with the Root's context disabled
// (`disabled = fieldDisabled || comboboxDisabled || disabledProp`, `ComboboxInput.js`) and threads
// only the MERGED value into its render state — so, like InputGroup, the disabled chroma must read
// the render state, not `props.disabled` (a bare `props.disabled` would miss a Root-level
// `<Combobox disabled>` with no `disabled` prop on this specific Input).
export const COMBOBOX_INPUT_VOCAB = defineLeaf({
  marker: 'aui-combobox-input',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});

export type ComboboxInputAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useComboboxInputRecipe = createTriggerStateRecipe(COMBOBOX_INPUT_VOCAB);

// ─── 3. Trigger — the open control, composed INSIDE the rail (trigger-toggle family) ──
//
// CORRECTION (round-5 painted-parity pass): unlike Select — where the Trigger IS the whole control
// — Combobox's Trigger is an OPTIONAL affordance living ALONGSIDE the real typing Input inside the
// SAME rail (the consume-doc's own composition: `InputGroup > Input, Trigger`). The prior defaults
// (`SELECT_TRIGGER_VOCAB` verbatim: `surface-alt/solid`, `profile:'default'` — a self-padded, fully
// bordered/filled button) painted a SECOND filled box stacked next to the Input, inflating the rail
// row height to whatever the Trigger's OWN block-padding demanded (browser-measured: 37px at `sm`,
// vs the InputGroup rail's OWN 28px floor) — the mechanism is byte-identical to Select's Trigger
// (verified correct THERE, where Trigger owns the whole box), but wrong for a part that shares a row
// with another interactive element. Base UI's own canonical reference composes this exact affordance
// as a borderless, height-hugging icon button (`flex h-full w-6 border-0 bg-transparent p-0`,
// `docs/react/components/combobox.md:416`) — the SAME shape our OWN `Combobox.Clear` already ships
// (`profile:'contained'`, `paint:'text'`, composed inline in the same rail). Retargeting Trigger's
// defaults to that shape gives Trigger/Clear PARITY (both compact rail affordances) and removes the
// height inflation as a direct consequence (no more `profile:'default'` block-padding to stack).
// `states` stays undecorated (open/closed) — `createTriggerToggleRecipe` is zero-diff with no
// `vocab.states` authored, so this is a pure defaults change, not a states rewrite.
export const COMBOBOX_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-combobox-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'contained' as const,
  defaults: { color: 'surface-alt', paint: 'text', scale: 'sm', shape: 'soft' },
});

export type ComboboxTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

export const useComboboxTriggerRecipe = createTriggerToggleRecipe(COMBOBOX_TRIGGER_VOCAB);

// ─── 4. Popup — stateless surface card (contract item 2: elevation 2, NOT Select's 4) ─────
export const COMBOBOX_POPUP_VOCAB = defineLeaf({
  marker: 'aui-combobox-popup',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'block-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 2 },
});

export type ComboboxPopupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useComboboxPopupRecipe = createVocabRecipe(COMBOBOX_POPUP_VOCAB);

// ─── 5. Item — stateful frame row (select-item family, REUSED component-agnostic) ─────
//
// `ComboboxItemState` = `{disabled, selected, highlighted}` — structurally IDENTICAL to
// `SelectItemState` (`{selected?, disabled?}`), so `createSelectItemVocabRecipe` (a
// component-agnostic family per its own file header) applies verbatim; `highlighted` is
// deliberately ignored by the mapper (a CSS-only state-layer overlay), same as Select.Item.
export const COMBOBOX_ITEM_SX_AXES = FULL_SX_AXES;

// selected fill = `raised`/`solid` (2026-07-11 USER DECISION — fleet-wide default, mirrors
// SELECT_ITEM_VOCAB verbatim; see select/use-recipe.ts's SELECT_ITEM_VOCAB comment for the
// full rationale). `shape:'none'` unchanged.
export const COMBOBOX_ITEM_VOCAB = defineLeaf({
  marker: 'aui-combobox-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: COMBOBOX_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: { scale: 'sm' as const },
  states: {
    unselected: { color: 'surface', paint: 'text', shape: 'none' },
    selected: { color: 'raised', paint: 'solid', shape: 'none' },
  },
});

export type ComboboxItemAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

export const useComboboxItemRecipe = createSelectItemVocabRecipe(COMBOBOX_ITEM_VOCAB);

// ─── 6. Empty / Status — informational rows (stateless surface text, USER DIRECTIVE 9) ────
//
// Both were MARKER-ONLY (`createAtomicPart`, no `aui`) until now — the consume-doc's own words for
// them, "bare unstyled row". `profile: 'default'` is Item's OWN profile (`COMBOBOX_ITEM_VOCAB` above)
// — NOT copied by name, EVIDENCED: neither `.aui-combobox-item` nor Item's vocab declares its own
// padding; both read the shared `.aui-frame` base map's scale-driven padding rail purely off the
// profile, so pinning the SAME profile (+ the SAME default `scale: 'sm'` floor) makes an Empty/Status
// row's padding-inline/-block compute IDENTICALLY to an Item row at any cascaded tier — the literal
// "text aligns with options" ask, achieved structurally, not by copying a px value. `color: 'surface'`
// / `paint: 'text'` mirror Item's OWN `unselected` cell (`COMBOBOX_ITEM_VOCAB.states.unselected`) —
// same base ink, so only the muted-text CSS override (below, `_state-cascade.scss`) sits on top,
// exactly the layering `.aui-select-group-label`'s existing "informational, non-interactive row"
// convention already uses (`_state-cascade.scss:678-688`, muted `color` on top of an otherwise-normal
// row) — the nearest sibling for "informational row inside a listbox popup" this codebase has (Select
// has no Empty/Status of its own to copy directly; GroupLabel's layering pattern is what's reused).
// Two SEPARATE vocabs (not one shared) so each can diverge independently later (Status is a live
// region for loading/announcements; Empty is the literal "no matches" outcome) — mirrors Trigger/
// Popup/Item each getting their own vocab despite structural overlap.
export const COMBOBOX_EMPTY_VOCAB = defineLeaf({
  marker: 'aui-combobox-empty',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});

export type ComboboxEmptyAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useComboboxEmptyRecipe = createVocabRecipe(COMBOBOX_EMPTY_VOCAB);

export const COMBOBOX_STATUS_VOCAB = defineLeaf({
  marker: 'aui-combobox-status',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});

export type ComboboxStatusAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useComboboxStatusRecipe = createVocabRecipe(COMBOBOX_STATUS_VOCAB);

// ─── 7. GroupLabel — the section-heading caption row (USER DIRECTIVE 11, 2026-07-10) ──────
//
// VERIFIED-SAME anchor: `DROPDOWN_GROUP_LABEL_VOCAB` (`dropdown/use-recipe.ts:220-226`) — the ONE
// component that already ships a real GroupLabel leaf vocab. Byte-identical shape: same
// `contextAxes`, same `profile: 'default'` (so the caption is a FULL BOX reading the SAME
// `aui-scale-default-<tier>` inline-padding cell the items use — no more a hand-coded literal that
// drifts when the default tier changes, the exact defect Dropdown's own vocab comment documents
// fixing), same `defaults` (`surface/text/sm/none`). Same informational-row convention as
// `COMBOBOX_EMPTY_VOCAB`/`COMBOBOX_STATUS_VOCAB` above (USER DIRECTIVE 9) — all three are
// "text row inside the popup, not interactive, muted emphasis" — the muted-color CASCADE layer lives
// in `_state-cascade.scss` on top of this same `surface/text` floor, consistent across all three.
export const COMBOBOX_GROUP_LABEL_VOCAB = defineLeaf({
  marker: 'aui-combobox-group-label',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FULL_SX_AXES,
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
});

export type ComboboxGroupLabelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useComboboxGroupLabelRecipe = createVocabRecipe(COMBOBOX_GROUP_LABEL_VOCAB);
