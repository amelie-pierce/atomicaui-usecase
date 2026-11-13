// modules/design/atomic-aui/src/lib/menubar/use-recipe.ts
//
// The two bespoke Menubar recipe vocabs + their unified `aui` types. Pure TypeScript
// (no React, no Base UI here — the component wiring is menubar.tsx). Mirrors
// dropdown/use-recipe.ts conventions: each recipe resolves the unified `aui` appearance
// prop into a deterministic `.aui-*` class string via the ONE `buildLeafClasses` engine.
//
//   • Root    — stateless surface bar frame (`createVocabRecipe`; NO state ring — the bar
//               itself is not focusable). A filled neutral surface bar.
//   • Trigger — a `createTriggerToggleRecipe` frame (open-aware + `aui.states`, context-disabled
//               via Base UI Menu.Root context, identical to the Dropdown.Trigger): a raised solid
//               chip. A zero-diff superset of the former stateless trigger recipe when no `states`
//               are authored.
//
// The re-exported Dropdown menu parts (Popup/Item/…) keep their OWN Dropdown recipes — only the
// Root bar + the bespoke bar Trigger are defined here.

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

// Public Menubar axis names alias the shared core recipe vocabulary — parity with
// DropdownColor/Paint/Scale/Shape and ButtonColor/Paint/Scale/Shape.
export type MenubarColor = AuiRecipeColor;
export type MenubarPaint = AuiRecipePaint;
export type MenubarScale = AuiRecipeScale;
export type MenubarShape = AuiRecipeShape;

// ─── 1. Root — the surface bar frame (stateless) ─────────────────────────────
//
// The Menubar bar: a filled neutral RAISED bar (`color:'raised'` painted `solid`). The bar
// itself has no focus ring (roving focus lives on the triggers), so it is STATELESS — a
// `createVocabRecipe`, NO `useStateLayer`. `marker:'aui-menubar'` so the CSS can lay the bar out as
// a flex row (`_state-cascade.scss`). Full 32-axis `aui.sx` (the full frame surface is overridable).
export const MENUBAR_ROOT_VOCAB = defineLeaf({
  marker: 'aui-menubar',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'raised', paint: 'solid', scale: 'sm', shape: 'soft' },
});

/** Unified customisation shape for the `Menubar` bar — a plain `.aui-frame` surface bar; full-frame
 *  sx (`AuiFrameStyleProps`) so the bar surface geometry is author-overridable. */
export type MenubarRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

/** Root styling recipe: unified `aui` appearance prop → full `.aui-*` class string. Stateless
 *  (the bar has no per-state recipe — no focus ring; roving focus is on the triggers). */
export const useMenubarRootRecipe = createVocabRecipe(MENUBAR_ROOT_VOCAB);

// ─── 2. Trigger — context-disabled bar trigger (classNameForState) ───────────
//
// A raised solid-filled bar trigger (`raised` chroma painted `solid`) — the top-level menu button
// that sits on the surface bar. `marker:'aui-menubar-trigger'` so the CSS lays it out as a flex row
// (label + auto-chevron). KEEPS its keyboard `:focus-visible` ring (it is a focusable bar tab stop).
//
// Disabled comes from the enclosing Menu.Root via Base UI CONTEXT (it never reaches the element as a
// `disabled` prop), exactly like Dropdown.Trigger — so the shared `families/trigger-toggle` factory
// resolves this recipe with Base UI's render state: `open`/`panelOpen` → the `'selected'`/
// `'unselected'` activeState (so `aui.states` resolves per open-state) and `disabled` flips the
// chroma to the grey `aui-color-solid-disabled` cell when Base UI marks the trigger disabled
// (context-merged, e.g. a disabled bar). NO cascadeReader (the cascade is JS-resolved in menubar.tsx,
// not a vocab flag).
export const MENUBAR_TRIGGER_VOCAB = defineLeaf({
  marker: 'aui-menubar-trigger',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { paint: 'solid', color: 'raised', shape: 'soft', scale: 'sm' },
});

/** Unified customisation shape for `Menubar.DropdownTrigger` — a plain `.aui-frame` consumer
 *  (Button-class): the full Appearance + the FULL-frame sx surface (`AuiFrameStyleProps`) + OPTIONAL
 *  per-state appearance keyed on the canonical trigger state (`unselected` = closed / `selected` =
 *  open / `indeterminate` reserved). With no `states` authored the resolved class string is identical
 *  to the stateless trigger recipe (the `createTriggerToggleRecipe` zero-diff superset). Mirrors
 *  `DropdownTriggerAui`. */
export type MenubarTriggerAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<'unselected' | 'selected' | 'indeterminate',
    Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

/** Trigger styling recipe: a canonical-state `classNameForState` recipe (NOT `createVocabRecipe`).
 *  The Trigger's disabled comes from the enclosing Menu.Root via Base UI CONTEXT, so the shared
 *  `families/trigger-toggle` factory resolves it with Base UI's render state: `open`/`panelOpen` →
 *  the `'selected'`/`'unselected'` activeState (so `aui.states` resolves per open-state) and
 *  `disabled` flips the chroma to the disabled cell (which carries the context-merged disabled). A
 *  zero-diff superset of the former `createTriggerStateRecipe` when no `states` are authored.
 *  hover stays CSS. */
export const useMenubarTriggerRecipe = createTriggerToggleRecipe(MENUBAR_TRIGGER_VOCAB);
