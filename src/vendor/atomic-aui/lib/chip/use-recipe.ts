// modules/design/atomic-aui/src/lib/chip/use-recipe.ts
//
// Chip's AUTHORED leaf vocab + types + the stateless styling recipe (no React, no Base UI wiring).
//
// Chip is a STATUS-DISPLAY frame leaf — a small tinted pill that labels state (success / warning /
// error / info / neutral). It mirrors Button (a plain `.aui-frame` consumer + `createVocabRecipe`)
// but is NON-interactive (no `useStateLayer`, no `aui.states`): a status chip just paints. Its
// selectable sibling (the Figma `Checkable Chip` variant) is a SEPARATE follow-up (out of v1 scope).
//
// Profile: `default` — the generic Figma-synced 200-Scale frame profile (padding-x / padding-y / gap
// / shape-radius), matching the measured Chip Frame (block-pad 4 / inline-pad 8 / gap 4 — the generic
// frame-token bindings, NOT an inline-only specialized cell). This is the vocab DEFAULT (2026-06-29:
// the prior `contained-padding-inline` pin is RETIRED as the default). A consumer that wants the tight
// inline-only "bar" look may still pass `aui.profile="contained-padding-inline"` — it stays reachable
// as an escape hatch, it is simply no longer the resting default. NO new profile cell needed.
//
// Status intents map straight to the standard `aui.color` chromas — there is NO Chip-specific intent
// enum. A consumer passes `color="success" | "warning" | "error" | "info"` etc.; neutral maps to the
// existing `surface-alt` chroma (there is NO literal `neutral` token — G19 phantom-var guard).
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

// Public Chip axis aliases mirror the siblings (Button/Label/View) — token-derived, owned by core/.
export type ChipColor = AuiRecipeColor;
export type ChipPaint = AuiRecipePaint;
export type ChipScale = AuiRecipeScale;
export type ChipProfile = AuiScaleProfile;
export type ChipShape = AuiRecipeShape;
export type ChipElevation = AuiElevation;

/** The unified `aui` customisation shape for Chip — the FULL 7-axis frame appearance with the
 *  full-frame `sx`. NO `states` (a status Chip is not selectable — the Checkable Chip is a separate
 *  follow-up). Chip is a plain `.aui-frame` consumer, so every layer-3 axis is author-overridable. */
export type ChipAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const CHIP_DEFAULT_SCALE: ChipScale = 'sm';

// FULL-surface sx (the no-missing-knobs STANDARD — G12/G13: 32 knobs on every box). Chip is a plain
// `.aui-frame` consumer, so its marker reads every anatomy hook → every layer-3 axis is live.
// EXPORTED (the Button/Label/View precedent) so the Configurator's `'frame'` SxKind derives the
// Chip-root knob list from this constant — the knob list can never drift from the recipe allow-list.
export const CHIP_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// Chip's leaf vocabulary — the four context axes, full-frame sx allow-list, the `default` frame
// profile, and the status-pill defaults.
//
// DEFAULTS: color `surface-alt` (neutral — a default chip is a neutral grey pill; status consumers
// pass `color="success"` etc.), paint `solid` (an OPAQUE painted surface — the real status-pill
// look; ALL status solid cells exist: aui-color-solid-{success,warning,error,info,surface-alt}),
// scale `sm`, shape `soft` (4px radius), elevation 0.
//
// ✅ FIGMA-CONFIRMED (2026-06-29). Opened the "AtomicAUI Chip" library Chip component
// (componentKey 0651c5531dd777c151eb1ff1592130e0c70dff26, libraryKey
// lk-fc64d15a85d1d9ce79459a7ccbe214dd3fe0e489039424f3e504e08be72308911b7dbf4afe2b33b9320235f87984e942830e37827f0e8ff0eaeb999c62e6cdd9,
// updated 2026-04-18) via figma.importComponentByKeyAsync (search exposes no fileKey/nodeId).
// MEASURED: default 44x24; the depth3 "Surface" rect (44x24, cornerRadius 4) binds the SOLID
// background role "bg/fill" (VariableID 900:21) rendering OPAQUE — i.e. the SOLID-paint model, NOT
// a translucent tint — with the border role "st/border" (715:55) held at opacity 0 (outlined
// affordance off by default). The Frame binds the GENERIC padding-x/padding-y/gap/shape-radius tokens
// (= the `default` frame anatomy), not an inline-only cell — so the resting profile is `default` (the
// prior `contained-padding-inline` pin is retired as the default; still reachable via `aui.profile`).
// Frame cornerRadius 4 (corner-radius vars 670:1781-1784) == the `soft`
// token's --p-px-4. So resting paint = `solid`, shape = `soft`. Matches the live consumer evidence:
// the ADC StatusBar Pass-pill (apps/adc/main/.../StatusBar/StatusBar.tsx:151-166) uses paint:'solid'
// + shape:'soft'. (The prior `paint:'tonal'` default was the "renders white fill, not a status pill"
// bug: a tonal tint of the near-white surface-alt neutral resolves to ~white; `shape:'pill'` was
// likewise drift from the 4px Figma radius.) Status/intent is applied by the consumer via the
// `color` axis — there is NO Success/Warning/Error variant set in Figma; the single Unstyled-Frame
// composition recolors the bg/fill paint MODE. The outlined affordance (st/border) remains available
// via `paint:'outlined'`/`sx.borderColor` per the Figma. See the figma-source-registry entry.
//
// `marker:'aui-chip'` is structural (a flex row), not a paint hook — Chip needs a component-scoped
// flex row so Icon + Label + Dismiss children align, like Button's `aui-button`.
export const CHIP_VOCAB = defineLeaf({
  marker: 'aui-chip',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CHIP_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface-alt',
    paint: 'solid',
    scale: CHIP_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
});

// Chip's styling recipe: unified `aui` appearance prop → full `.aui-*` class string.
// `hookProps = {'aui'}` — the factory strips `aui` from the DOM. Stateless (no `classNameForState`).
//
// The default-profile gap remains the Figma-measured 4px, but it lives as a recipe utility instead of a
// late `.aui-chip` marker hook. That lets non-default profiles such as `profile:"chip"` keep their own
// generated `--aui-gap` cell, while `aui.sx.gap` and user className still win by role/specificity.
const useChipBaseRecipe = createVocabRecipe(CHIP_VOCAB);
export const useChipRecipe: typeof useChipBaseRecipe = (props) => {
  const out = useChipBaseRecipe(props);
  const aui = props.aui as ChipAui | undefined;
  const profile = aui?.profile ?? CHIP_VOCAB.profile;
  if (profile !== CHIP_VOCAB.profile || aui?.sx?.gap !== undefined) return out;
  return { className: mergeAuiClasses([out.className, 'aui-gap-4']) };
};
useChipRecipe.hookProps = useChipBaseRecipe.hookProps;
