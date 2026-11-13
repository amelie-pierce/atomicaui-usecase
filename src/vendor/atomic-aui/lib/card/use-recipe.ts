// modules/design/atomic-aui/src/lib/card/use-recipe.ts
//
// Card is a stateless Container-archetype tile, not a new token family. Its public type names are
// local aliases to the shared generated AUI unions. The root is the recipe-driven frame; the render
// shell only adds Card's structural Figma layers.
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
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

export type CardColor = AuiRecipeColor;
export type CardPaint = AuiRecipePaint;
export type CardShape = AuiRecipeShape;
export type CardElevation = AuiElevation;
export type CardScale = AuiRecipeScale;
export type CardProfile = AuiScaleProfile;
export type CardSx = AuiFrameStyleProps;

export type CardAui = Omit<Appearance, 'sx'> & { sx?: CardSx };

export interface ResolvedCardAui {
  color: CardColor;
  paint: CardPaint;
  shape: CardShape;
  elevation: CardElevation;
  profile: CardProfile;
  scale: CardScale;
  sx?: CardSx;
}

export const CARD_DEFAULT_COLOR: CardColor = 'surface';
export const CARD_DEFAULT_PAINT: CardPaint = 'solid';
export const CARD_DEFAULT_SHAPE: CardShape = 'soft';
export const CARD_DEFAULT_ELEVATION: CardElevation = 0;
export const CARD_DEFAULT_SCALE: CardScale = 'sm';
// Root defaults to NO-PADDING (directive #8): the root is an edge-to-edge wrapper so `Card.Image` bleeds
// full-width to the card edges. Padding for the text region comes from `Card.Body` (the default-profile
// padded section that holds Header/Content/Footer).
export const CARD_DEFAULT_PROFILE: CardProfile = 'no-padding';

// Full-frame sx surface for the Card root; exported so configurator/doc generation can derive knobs
// from the same allow-list as runtime.
export const CARD_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const CARD_VOCAB = defineLeaf({
  marker: 'aui-card',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_SX_AXES,
  profile: CARD_DEFAULT_PROFILE,
  defaults: {
    color: CARD_DEFAULT_COLOR,
    paint: CARD_DEFAULT_PAINT,
    scale: CARD_DEFAULT_SCALE,
    shape: CARD_DEFAULT_SHAPE,
    elevation: CARD_DEFAULT_ELEVATION,
  },
});

export const useCardRecipe = createVocabRecipe(CARD_VOCAB);
// `disabled` is the STANDARD orthogonal chroma flip (component-engineer §4): the recipe reads it and
// `buildLeafClasses` flips the chroma to the paint's disabled cell (`aui-color-<paint>-disabled`),
// context-independent and derived — no per-state config, no emphasis, no bespoke opacity. Card's host
// is a plain `<div>` (no native `disabled` attribute), so — unlike Button's native `<button>` — we add
// `disabled` to the recipe's `hookProps` so the factory STRIPS it from the DOM spread while the hook
// still reads it for the flip. Matches the View / List.Item div-host convention (aria-disabled, not a
// native attr).
useCardRecipe.hookProps = new Set(['aui', 'disabled']);

export function resolveCardAui(aui?: CardAui): ResolvedCardAui {
  return {
    color: aui?.color ?? CARD_DEFAULT_COLOR,
    paint: aui?.paint ?? CARD_DEFAULT_PAINT,
    shape: aui?.shape ?? CARD_DEFAULT_SHAPE,
    elevation: aui?.elevation ?? CARD_DEFAULT_ELEVATION,
    profile: aui?.profile ?? CARD_DEFAULT_PROFILE,
    scale: aui?.scale ?? CARD_DEFAULT_SCALE,
    sx: aui?.sx,
  };
}

// ─── Card.Body — the padded section (directive #8) ───────────────────────────────────────────────
// The root is a NO-PADDING wrapper, so Card.Body supplies the padding + gap for the text region
// (Header/Content/Footer). It is a `cascadeReader` frame on the DEFAULT profile (same pattern as
// Accordion.Panel): it emits `aui-frame aui-scale-default-<scale>` (real profile padding + gap from the
// scale cell) WITHOUT a paint cell — so it is TRANSPARENT (inherits the card surface, no forced paint —
// the #5 paint contract) and does not retint its text. `scale` defaults to the card's scale (threaded
// via CardContext in card.tsx) so the body padding tracks the card scale; a consumer `aui` still wins.
export type CardBodyAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const CARD_BODY_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const CARD_BODY_VOCAB = defineLeaf({
  marker: 'aui-card-body',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_BODY_SX_AXES,
  profile: 'default' as const,
  defaults: { color: CARD_DEFAULT_COLOR, paint: 'text', scale: CARD_DEFAULT_SCALE, shape: 'none' },
  cascadeReader: true,
});

export const useCardBodyRecipe = createVocabRecipe(CARD_BODY_VOCAB);

// ─── Card.ImageContainer — the media WRAPPER layer (directive #12) ────────────────────────────────
// The two-layer split: ImageContainer (this — the wrapper: padding/inset, shape, paint, elevation, full
// frame-part sx) holds Card.Image (the media: ratio/fit/src/placeholder). A `cascadeReader` frame like
// Card.Body, BUT defaults to the `no-padding` profile so it is FULL-BLEED out of the box (the #8 model
// unchanged — no inset unless the consumer opts into a padded profile). Transparent by default (no
// forced paint — #5), paints a surface only when the consumer sets `aui.paint`/`color`. It is the
// natural CLIP/SHAPE owner (overflow + radius in the CSS marker); `scale` tracks the card via context.
export type CardImageContainerAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const CARD_IMAGE_CONTAINER_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const CARD_IMAGE_CONTAINER_VOCAB = defineLeaf({
  marker: 'aui-card-image-container',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CARD_IMAGE_CONTAINER_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: CARD_DEFAULT_COLOR, paint: 'text', scale: CARD_DEFAULT_SCALE, shape: 'none' },
  cascadeReader: true,
});

export const useCardImageContainerRecipe = createVocabRecipe(CARD_IMAGE_CONTAINER_VOCAB);
