// Pagination recipe layer.
// Root is a stateless frame.
// Page links are Button-class leaves.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import {
  defineLeaf,
  type Appearance,
  type StateAppearance,
} from '../../core/vocabulary/leaf-vocabulary';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

export type PaginationColor = AuiRecipeColor;
export type PaginationPaint = AuiRecipePaint;
export type PaginationScale = AuiRecipeScale;
export type PaginationProfile = AuiScaleProfile;
export type PaginationShape = AuiRecipeShape;
export type PaginationElevation = AuiElevation;

export type PaginationLinkStateKey = 'unselected' | 'selected';

export const PAGINATION_LINK_STATE_KEYS = [
  'unselected',
  'selected',
] as const satisfies readonly PaginationLinkStateKey[];

export const PAGINATION_ROOT_DEFAULT_SCALE: PaginationScale = 'sm';
export const PAGINATION_LINK_DEFAULT_SCALE: PaginationScale = 'sm';

export const PAGINATION_ROOT_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const PAGINATION_LINK_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export type PaginationAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type PaginationLinkStateAppearance = Omit<StateAppearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type PaginationLinkAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<PaginationLinkStateKey, PaginationLinkStateAppearance>>;
};

export type PaginationResolvedLinkAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

// Root: a bare layout frame; its gap spaces the page controls.
export const PAGINATION_ROOT_VOCAB = defineLeaf({
  marker: 'aui-pagination',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: PAGINATION_ROOT_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: PAGINATION_ROOT_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
});

// Page links default to quiet numbers with the current page as a primary chip.
export const PAGINATION_LINK_STATES = {
  unselected: { color: 'surface', paint: 'text', shape: 'soft' },
  selected: { color: 'primary', paint: 'solid', shape: 'soft' },
} as const satisfies Record<PaginationLinkStateKey, PaginationLinkStateAppearance>;

export const usePaginationRecipe = createVocabRecipe(PAGINATION_ROOT_VOCAB);

type AuiWithStates = PaginationLinkAui | undefined;

function withoutStates(aui: AuiWithStates): PaginationLinkStateAppearance {
  if (!aui) return {};
  const { states: _states, ...rest } = aui;
  return rest;
}

/** Resolve one link state: baked default, then root, then own, own state last. */
export function resolvePaginationLinkAui(
  state: PaginationLinkStateKey,
  rootAui: AuiWithStates,
  ownAui: AuiWithStates,
  scale: PaginationScale | undefined,
): PaginationResolvedLinkAui {
  const baked: PaginationLinkStateAppearance = PAGINATION_LINK_STATES[state];
  const rootBase = withoutStates(rootAui);
  const ownBase = withoutStates(ownAui);
  const rootState = rootAui?.states?.[state];
  const ownState = ownAui?.states?.[state];

  const merged: PaginationResolvedLinkAui = {
    ...baked,
    ...rootBase,
    ...rootState,
    ...ownBase,
    ...ownState,
    scale: ownState?.scale ?? ownBase.scale ?? rootState?.scale ?? rootBase.scale ?? scale,
  };

  const sx = {
    ...baked.sx,
    ...rootBase.sx,
    ...rootState?.sx,
    ...ownBase.sx,
    ...ownState?.sx,
  };
  if (Object.keys(sx).length > 0) merged.sx = sx;
  return merged;
}

/** Steps (previous / next) use the idle link look, never the current-page chip. */
export function resolvePaginationStepAui(
  rootAui: AuiWithStates,
  ownAui: AuiWithStates,
  scale: PaginationScale | undefined,
): PaginationResolvedLinkAui {
  return resolvePaginationLinkAui('unselected', rootAui, ownAui, scale);
}
