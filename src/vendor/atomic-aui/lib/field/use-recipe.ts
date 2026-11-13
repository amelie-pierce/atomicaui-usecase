// modules/design/atomic-aui/src/lib/field/use-recipe.ts
//
// Field's AUTHORED leaf vocabs + recipes (pure TS — no React, no Base UI wiring). Field is a
// COMPOSING component: it owns NO Input/Button vocab (those are composed siblings). It authors:
//   • FIELD_CONTROL_VOCAB — the visible control-row FRAME (a fixed-surface card, profile default).
//   • FIELD_LABEL/DESCRIPTION/ERROR_VOCAB — the copy leaves (profile no-padding, paint text).
// (Field.Icon is NO LONGER an authored frame — it is a thin ContainedIcon wrapper, contained
//  profile, transparent box. It owns no vocab here; see field.tsx.)
//
// NEW per-part cascade model: every part reads the FieldAuiContext and JS-RESOLVES its color
// per the contract (Control + Description FOLLOW the inherited chroma; Label/Error/Input/Icon/
// Button PIN surface). So the reader leaves are NO LONGER `cascadeReader` — field.tsx hands each
// an explicit resolved `aui.color`, and `profile` is per-part (the root profile never leaks).
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import {
  defineLeaf,
  type Appearance,
  type StateAppearance,
  type LeafVocabulary,
} from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type { PropHook, AnyProps } from '../../core/types';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

// Public Field axis aliases mirror the siblings (Button/Select/Accordion).
export type FieldColor = AuiRecipeColor;
export type FieldPaint = AuiRecipePaint;
export type FieldScale = AuiRecipeScale;
export type FieldProfile = AuiScaleProfile;
export type FieldShape = AuiRecipeShape;
export type FieldElevation = AuiElevation;

// The per-part `aui` shapes. Every styleable Field part takes the full frame Appearance with a
// widened `sx` (the curated shorthands), matching Button/Select. `Field.Root` IS a full `.aui-frame`
// now (see FIELD_ROOT_VOCAB below): its `aui` styles the root's OWN box (padding/gap/bg/border/
// radius/size via every `aui`/`aui.sx` axis) AND seeds the per-part cascade (color/scale/shape/
// elevation/sx). Same full-frame shape as the other parts.
export type FieldRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
/** Unified customisation shape for `Field.Control` — the visible control-row FRAME: the full
 *  Appearance + the FULL-frame sx surface (`AuiFrameStyleProps`) + an OPTIONAL per-state appearance
 *  keyed on the CANONICAL state set (`unselected` / `selected` / `indeterminate`), mirroring
 *  `DropdownTriggerAui` for API uniformity with the other stateful frames.
 *
 *  A Field control has NO selectable render state (no open/checked), so `unselected` is ALWAYS the
 *  active state — `aui.states.unselected` simply layers over the base appearance (an author-overridable
 *  base). `selected` / `indeterminate` are RESERVED: the type carries them for uniformity, but no Field
 *  render state ever produces them, so they are authored-but-INERT (exactly like the trigger's reserved
 *  `indeterminate`). With NO `states` authored the resolved class string is IDENTICAL to the former
 *  stateless recipe (zero-diff) — the disabled-chroma flip still works. */
export type FieldControlAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};
export type FieldLabelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type FieldDescriptionAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type FieldErrorAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type FieldIconAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const FIELD_DEFAULT_SCALE: FieldScale = 'sm';
export const FIELD_DEFAULT_SHAPE: FieldShape = 'soft';

// ─── 0. Field.Root — the field FRAME (its OWN scale/profile drive padding + gap) ─────────────────
// The root IS a full frame now (G13 — every box carries the full `aui` surface; the root was
// previously a bare `aui-field` marker whose `scale`/`profile` only CASCADED to the parts and never
// styled the root itself). It renders NO fill by default (`paint: text` → transparent) and NO padding
// (`profile: no-padding` — a plain field is not a bordered box, UNLIKE `Fieldset`'s `default`), so
// `no-padding-sm` = padding 0 + gap 6 is byte-identical to the pre-frame field look. But now
// `aui.scale` drives the label/control/description GAP, `aui.profile` opts into padding, and
// `aui.sx` is FRAME-LOCAL — so `<Field aui={{ sx:{ flexDirection:'row' } }}>` lays the root out as a
// row (label beside control). `color` FOLLOWS the cascade (mirrors Field.Control/Fieldset root).
export const FIELD_ROOT_VOCAB = defineLeaf({
  marker: 'aui-field',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: FIELD_DEFAULT_SCALE,
    shape: FIELD_DEFAULT_SHAPE,
    elevation: 0,
  },
});

// ─── 1. Field.Control — the visible control-row FRAME ────────────────────────────
// A fixed-surface card: `color: surface`, `paint: fixed`, `scale: sm`, `shape: soft`,
// `elevation: 0`, `profile: default` → emits `aui-color-fixed-surface` + `aui-scale-default-sm`
// + `aui-shape-soft` + `aui-elevation-0`. It OWNS `paint=fixed`/`profile=default` (per-part). Its
// COLOR follows the root chroma (border recolors) — JS-resolved in field.tsx (own ?? inherited ??
// surface). The frame holds the flex row (Icon | Input | Button) + the tab-only focus outline.
export const FIELD_CONTROL_VOCAB = defineLeaf({
  marker: 'aui-field-control',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'fixed',
    scale: FIELD_DEFAULT_SCALE,
    shape: FIELD_DEFAULT_SHAPE,
    elevation: 0,
  },
});

// ─── 2. Field.Label / Description / Error — copy leaves (profile no-padding, paint text) ─
// `paint: text` + `profile: no-padding` → emit `aui-color-text-<c>` (no box padding). They are
// NO LONGER cascadeReaders — field.tsx JS-resolves each part's color per the contract (Label +
// Error PIN surface → `aui-color-text-surface`; Description FOLLOWS the inherited chroma). They
// keep frame/scale/shape so geometry stays consistent. The vocab `defaults.color` is the fallback
// the recipe uses if field.tsx ever omits color (it always passes one).
const COPY_DEFAULTS = {
  color: 'surface' as const,
  paint: 'text' as const,
  scale: FIELD_DEFAULT_SCALE,
  shape: 'none' as const,
};

export const FIELD_LABEL_VOCAB = defineLeaf({
  marker: 'aui-field-label',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: COPY_DEFAULTS,
});

export const FIELD_DESCRIPTION_VOCAB = defineLeaf({
  marker: 'aui-field-description',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: COPY_DEFAULTS,
});

export const FIELD_ERROR_VOCAB = defineLeaf({
  marker: 'aui-field-error',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'no-padding' as const,
  defaults: COPY_DEFAULTS,
});

// ─── 3. Field.Icon — NO authored vocab (a thin ContainedIcon wrapper now) ────────
// Field.Icon was a bespoke SOLID-surface FRAME (the dead `FIELD_ICON_VOCAB` / `useFieldIconRecipe`
// / `.aui-field-icon` marker). As of 2026-06-17 it is a thin `ContainedIcon` wrapper (transparent
// box, `profile: contained`) — see field.tsx — so it owns NO vocab here. `FieldIconAui` (above) is
// retained for the public re-export, structurally compatible with `ContainedIconAui`.

// ─── Recipes ─────────────────────────────────────────────────────────────────────
// The copy leaves (Label/Description/Error) stay wholly stateless (focus/validity are CSS state,
// not recipe states). `disabled` flows in natively via Base UI's render state when present
// (createVocabRecipe reads props.disabled).
export const useFieldRootRecipe = createVocabRecipe(FIELD_ROOT_VOCAB);
export const useFieldLabelRecipe = createVocabRecipe(FIELD_LABEL_VOCAB);
export const useFieldDescriptionRecipe = createVocabRecipe(FIELD_DESCRIPTION_VOCAB);
export const useFieldErrorRecipe = createVocabRecipe(FIELD_ERROR_VOCAB);

// ─── Field.Control recipe — canonical-state surface, `unselected` ALWAYS active ───────────────────
// `Field.Control` is the visible control-row FRAME. For API UNIFORMITY with the other stateful frames
// (Dropdown/Select/Menubar Trigger), it now accepts `aui.states` keyed on the canonical
// `unselected`/`selected`/`indeterminate`. But a field control has NO selectable render state (no
// open/checked) — so `unselected` is ALWAYS the active state. `selected`/`indeterminate` are RESERVED:
// authored-but-INERT (the type carries them, but no Field render state ever produces them — exactly
// like the trigger's reserved `indeterminate`).
//
// This is NOT `createTriggerToggleRecipe`: that recipe returns `{ classNameForState }` (a FUNCTION
// className), which the factory REJECTS on an intrinsic `<div>` `as` (createAtomicComponent throws —
// a function className can't reach a DOM element). The Control FRAME IS a plain `<div>`. So this is a
// local recipe that reuses the SAME `buildLeafClasses` engine but returns a STATIC `{ className }`,
// always resolving with `activeState='unselected'`.
//
// ZERO-DIFF: `FIELD_CONTROL_VOCAB` declares NO `vocab.states`, so layer-2 (vocab.states[active]) is
// always skipped; with NO authored `aui.states`, layer-4 (aui.states[active]) is also skipped. Thus
// resolving with `activeState='unselected'` vs the former `activeState=undefined` yields the IDENTICAL
// merged appearance → byte-identical class string. `disabled` is passed straight through (orthogonal
// to resolve()), so the Field disabled-chroma flip (`aui-color-fixed-disabled`) is preserved. When
// `aui.states.unselected` IS authored, layer-4 merges it OVER the base for the active (unselected) state.
interface FieldControlRecipeProps extends AnyProps {
  aui?: FieldControlAui;
}

function createFieldControlRecipe(
  vocab: LeafVocabulary,
): PropHook<FieldControlRecipeProps, { className: string }> {
  const hook: PropHook<FieldControlRecipeProps, { className: string }> = (props) => {
    const aui = props.aui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined;
    // `unselected` is ALWAYS the active state (no render-state driver). `disabled` flips the chroma.
    return { className: buildLeafClasses(vocab, aui, 'unselected', !!props.disabled) };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}

export const useFieldControlRecipe = createFieldControlRecipe(FIELD_CONTROL_VOCAB);
