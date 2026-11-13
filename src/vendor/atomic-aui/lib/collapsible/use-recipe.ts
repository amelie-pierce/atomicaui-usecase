// modules/design/atomic-aui/src/lib/collapsible/use-recipe.ts
//
// Collapsible's frame-bearing recipe vocabs. Pure TypeScript: no React and no Base UI wiring.
// Mirrors the Accordion recipe shape (lib/accordion/use-recipe.ts) but SIMPLER — Collapsible is a
// single Root → Trigger → Panel disclosure (NO Item/Header). Base UI owns open/closed behavior + ARIA;
// these hooks translate each part's unified `aui` prop into AtomicAUI 6.0 frame classes. Open/closed is
// a render-state signal consumed by CSS data attrs, not a public appearance prop or a custom variant axis.
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { createTriggerToggleRecipe } from '../../families/trigger-toggle';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
} from '../../core/vocabulary/recipe-vocab';
import type { AnyProps, PropHook, StateClassNameFn } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { LeafVocabulary } from '../../core/vocabulary/leaf-vocabulary';

// Public Collapsible axis aliases mirror Accordion/Select/Dropdown. No collapsible-specific severity,
// variant, or open-state appearance axis exists; consumers style parts through `aui`.
export type CollapsibleColor = AuiRecipeColor;
export type CollapsiblePaint = AuiRecipePaint;
export type CollapsibleScale = AuiRecipeScale;
export type CollapsibleShape = AuiRecipeShape;

/** Unified customisation shape for `Collapsible.Trigger` — the full Appearance + FULL-frame `sx`
 *  (`AuiFrameStyleProps`) + OPTIONAL per-state appearance keyed on the canonical trigger state
 *  (`unselected` = closed / `selected` = open / `indeterminate` reserved). With no `states` authored
 *  the resolved class string is identical to the stateless trigger recipe (the
 *  `createTriggerToggleRecipe` zero-diff superset). Mirrors `AccordionTriggerAui`. */
export type CollapsibleTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};
export type CollapsiblePanelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
/** Unified customisation for `Collapsible.Header` — a View-class structural frame (the full 7-axis
 *  frame appearance + full-frame `sx`). The Header wraps the Trigger (+ any header content) so the
 *  consumer FULLY composes the disclosure header; it is a STATELESS structural box (no per-state
 *  recipe — interaction lives on the Trigger it contains). Mirrors `ViewAui` (sans `states`). */
export type CollapsibleHeaderAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
/** Unified customisation for `Collapsible.Root` — the FULL frame surface of the section CARD
 *  (color/paint/scale/shape/elevation + full-frame `sx`), mirroring the Accordion Item's `aui`. The
 *  cascade the Root seeds to the Trigger/Panel uses only scale/color/shape/elevation (NOT paint/sx). */
export type CollapsibleRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// ─── 0. Root — the solid CARD. Base UI Collapsible has NO Item, so the Root itself carries the filled
// section card, mirroring ACCORDION_ITEM_VOCAB (surface / paint:solid / shape:soft / elev0). One
// Collapsible = one Accordion-style section. The Root ALSO seeds the cascade (scale/color/shape/elevation,
// NOT paint — see CollapsibleCascade), so the Trigger/Panel keep their `text` defaults (transparent on the
// card) exactly like Accordion's Trigger/Panel sit on the Accordion Item.
export const COLLAPSIBLE_ROOT_VOCAB = defineLeaf({
  marker: 'aui-collapsible',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  // `no-padding` so the card is FLUSH by default (matches the Accordion Item look) WITHOUT a CSS hook-zero
  // that would mask the `profile` axis — switching the Root `profile` (e.g. block-padding) now actually
  // adds card padding. (Collapsible cascades scale via JS, not a CSS `--scale-*` rail, so flushing the
  // Root box can't strip the Trigger/Panel padding the way it would on Accordion.)
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 0 },
});

// ─── 1. Trigger — the interactive disclosure row ────────────────────────────
// Trigger is a button-class frame. `cascadeReader` lets the structured class engine emit
// frame/scale/shape without stamping the default paint cell, so the trigger inherits the Root context.
// The `text` paint default still matters for explicit partial overrides such as `aui={{ color: 'primary' }}`.
// Mirrors ACCORDION_TRIGGER_VOCAB.
export const COLLAPSIBLE_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-collapsible-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  cascadeReader: true,
});

// ─── 2. Panel — the collapsible content frame ───────────────────────────────
// Panel is a light frame by default: no separate fill/border, no state layer, and no own
// interaction affordance. Like Trigger, it is a cascade reader by default but keeps text defaults
// for explicit partial `aui` overrides. Mirrors ACCORDION_PANEL_VOCAB.
export const COLLAPSIBLE_PANEL_VOCAB = defineLeaf({
  marker: 'aui-collapsible-panel',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  cascadeReader: true,
});

// ─── 3. Header — a View-class structural frame that wraps the Trigger ────────
// Header is the composable disclosure-header frame (the user-locked design): a plain `.aui-frame`
// View-shaped box (full sx surface) that holds the Trigger (+ any header content). It is STATELESS
// (the interactive affordance lives on the contained Trigger), so a plain `createVocabRecipe` drives
// it — NO `useStateLayer`. View-shaped defaults: surface / solid (paints a header band on its own card)
// / sm / `default` profile (REAL band padding) / none / 0. It is a cascade reader so it inherits
// scale/color/shape/elevation from the Root (own axis wins), like the Trigger/Panel — and the cascaded
// `scale` retiers the `default`-profile padding cell (`aui-scale-default-<tier>`), so the band padding
// follows the Root scale automatically (the cascade hook is wired in collapsible.tsx's extension list).
export const COLLAPSIBLE_HEADER_VOCAB = defineLeaf({
  marker: 'aui-collapsible-header',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'none', elevation: 0 },
  cascadeReader: true,
});

/** Header styling recipe: unified `aui` appearance → full `.aui-*` class string. Stateless (the header
 *  frame has no per-state recipe — the focusable control is the Trigger it wraps). */
export const useCollapsibleHeaderRecipe = createVocabRecipe(COLLAPSIBLE_HEADER_VOCAB);

interface CollapsibleStateRecipeProps<Aui> extends AnyProps {
  aui?: Aui;
  disabled?: boolean;
}

interface CollapsibleDisabledState {
  disabled?: boolean;
}

// Base UI context-merges root disabled into each part's render state; reading only `props.disabled`
// would miss root-disabled panels. This local hook bridges Base UI render-state disabled into the
// normal leaf class engine. Disabled remains an orthogonal chroma flip. Mirrors the Accordion hook.
function createCollapsibleDisabledStateRecipe<Aui extends Appearance>(
  vocab: LeafVocabulary,
): PropHook<CollapsibleStateRecipeProps<Aui>, { classNameForState: StateClassNameFn }> {
  const hook: PropHook<CollapsibleStateRecipeProps<Aui>, { classNameForState: StateClassNameFn }> = (
    props,
  ) => {
    const aui = props.aui as Aui | undefined;
    const disabledProp = !!props.disabled;
    return {
      classNameForState: (state: unknown) => {
        const disabled = disabledProp || !!(state as CollapsibleDisabledState | null)?.disabled;
        const className = buildLeafClasses(vocab, aui, undefined, disabled);
        return className;
      },
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}

/** Trigger styling recipe: a canonical-state `classNameForState` recipe (the shared
 *  `families/trigger-toggle` factory). Base UI's Collapsible.Trigger render state carries `open` AND the
 *  root-merged `disabled`; the family maps `open === true` → the `'selected'` activeState (so
 *  `aui.states` resolves per open-state) and flips the chroma off `disabled`. A zero-diff superset of a
 *  disabled-only recipe when no `states` are authored. Mirrors useAccordionTriggerRecipe. */
export const useCollapsibleTriggerRecipe = createTriggerToggleRecipe(COLLAPSIBLE_TRIGGER_VOCAB);

export const useCollapsiblePanelRecipe =
  createCollapsibleDisabledStateRecipe<CollapsiblePanelAui>(COLLAPSIBLE_PANEL_VOCAB);
