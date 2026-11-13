// modules/design/atomic-aui/src/lib/accordion/use-recipe.ts
//
// Accordion's frame-bearing recipe vocabs. Pure TypeScript: no React and no Base UI wiring.
// Base UI owns disclosure behavior; these hooks translate each part's unified `aui` prop into
// AtomicAUI 6.0 frame classes. Open/closed is a render-state signal consumed by CSS data attrs,
// not a public appearance prop or a custom variant axis.
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
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

// Public Accordion axis aliases mirror Select/Dropdown/Button. No accordion-specific severity,
// variant, or open-state appearance axis exists; consumers style parts through `aui`.
export type AccordionColor = AuiRecipeColor;
export type AccordionPaint = AuiRecipePaint;
export type AccordionScale = AuiRecipeScale;
export type AccordionShape = AuiRecipeShape;

export type AccordionItemAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
/** Unified customisation shape for `Accordion.Trigger` — the full Appearance + FULL-frame `sx`
 *  (`AuiFrameStyleProps`) + OPTIONAL per-state appearance keyed on the canonical trigger state
 *  (`unselected` = closed / `selected` = open / `indeterminate` reserved). With no `states` authored
 *  the resolved class string is identical to the stateless trigger recipe (the
 *  `createTriggerToggleRecipe` zero-diff superset). Mirrors `DropdownTriggerAui`. */
export type AccordionTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};
export type AccordionPanelAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// ─── 1. Item — the outer inline card ────────────────────────────────────────
// Item is a passive surface card. It owns the visible card silhouette around Header/Trigger/Panel,
// so it skips useStateLayer; the Trigger inside it is the interactive control. The default is a
// neutral solid surface with soft radius and no float — a document-flow card, not an overlay.
export const ACCORDION_ITEM_VOCAB = defineLeaf({
  marker: 'aui-accordion-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 0 },
});

// ─── 2. Trigger — the interactive disclosure row ────────────────────────────
// Trigger is a button-class frame, but it sits inside the Item card. `cascadeReader` lets the
// structured class engine emit frame/scale/shape without stamping the default paint cell, so the
// header row inherits the Item context. The `text` paint default still matters for explicit partial
// overrides such as `aui={{ color: 'primary' }}`.
export const ACCORDION_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-accordion-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  cascadeReader: true,
});

// ─── 3. Panel — the collapsible content frame ───────────────────────────────
// Panel is a light frame by default: no separate fill/border, no state layer, and no own
// interaction affordance. Like Trigger, it is a cascade reader by default but keeps text defaults
// for explicit partial `aui` overrides; the body follows the Item context so tonal/solid cards feel
// like one surface.
export const ACCORDION_PANEL_VOCAB = defineLeaf({
  marker: 'aui-accordion-panel',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'surface', paint: 'text', scale: 'sm', shape: 'none' },
  cascadeReader: true,
});

interface AccordionStateRecipeProps<Aui> extends AnyProps {
  aui?: Aui;
  disabled?: boolean;
}

interface AccordionDisabledState {
  disabled?: boolean;
}

// Base UI context-merges root/item disabled into each part's render state; reading only
// `props.disabled` would miss root-disabled panels/items. Trigger/Panel nested-surface inheritance
// is now modeled by `vocab.cascadeReader`, so this local hook only bridges Base UI render-state
// disabled into the normal leaf class engine. Disabled remains an orthogonal chroma flip.
function createAccordionDisabledStateRecipe<Aui extends Appearance>(
  vocab: LeafVocabulary,
): PropHook<AccordionStateRecipeProps<Aui>, { classNameForState: StateClassNameFn }> {
  const hook: PropHook<AccordionStateRecipeProps<Aui>, { classNameForState: StateClassNameFn }> = (
    props,
  ) => {
    const aui = props.aui as Aui | undefined;
    const disabledProp = !!props.disabled;
    return {
      classNameForState: (state: unknown) => {
        const disabled = disabledProp || !!(state as AccordionDisabledState | null)?.disabled;
        const className = buildLeafClasses(
          vocab,
          aui,
          undefined,
          disabled,
        );

        return className;
      },
    };
  };
  hook.hookProps = new Set(['aui']);
  return hook;
}

export const useAccordionItemRecipe =
  createAccordionDisabledStateRecipe<AccordionItemAui>(ACCORDION_ITEM_VOCAB);

/** Trigger styling recipe: a canonical-state `classNameForState` recipe (the shared
 *  `families/trigger-toggle` factory — NOT the local disabled-only hook). Base UI's Accordion.Trigger
 *  render state (from the item context) carries `open` AND the root/item-merged `disabled`; the family
 *  maps `open === true` → the `'selected'` activeState (so `aui.states` resolves per open-state) and
 *  flips the chroma off `disabled`. A zero-diff superset of the former disabled-only recipe when no
 *  `states` are authored. (Migrated 2026-06-16, mirroring Dropdown/Select.) open/hover stay CSS. */
export const useAccordionTriggerRecipe = createTriggerToggleRecipe(ACCORDION_TRIGGER_VOCAB);

export const useAccordionPanelRecipe =
  createAccordionDisabledStateRecipe<AccordionPanelAui>(ACCORDION_PANEL_VOCAB);
