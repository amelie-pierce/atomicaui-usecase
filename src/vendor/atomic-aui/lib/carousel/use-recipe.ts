// modules/design/atomic-aui/src/lib/carousel/use-recipe.ts
//
// Carousel — a paged, single-select card rail over the Embla engine (a NON-Base-UI headless engine,
// wrapped per `wiki/patterns/wrapping-non-base-ui-headless-primitive.md`: the DS adds surface +
// composition; Embla owns scroll/drag). This module owns the hand-authored vocabs + class builders:
//   • CAROUSEL_ROOT_VOCAB  — the transparent region frame (the CARD_GROUP_ROOT_VOCAB shape:
//                            cascadeReader, `paint: 'text'`, `no-padding` → paints nothing by default).
//   • Item selection layer  — the per-state `aui` handed to the composed `Card` (unselected = Card
//                             surface + elevation 2; selected = tonal primary → primary stroke + a
//                             primary-tinted fill authored in `_state-cascade.scss`; Core 7.0 has NO
//                             beige/brown role token).
//   • IndicatorGroup / Indicator — the dots row frame + the dot frame with inactive/active states.
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import {
  defineLeaf,
  type Appearance,
  type AuiStates,
} from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
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

export type CarouselColor = AuiRecipeColor;
export type CarouselPaint = AuiRecipePaint;
export type CarouselScale = AuiRecipeScale;
export type CarouselProfile = AuiScaleProfile;
export type CarouselShape = AuiRecipeShape;
export type CarouselElevation = AuiElevation;

// Scale matches Card / CardGroup.
export const CAROUSEL_DEFAULT_SCALE: CarouselScale = 'sm';

// Full frame `sx` surfaces — exported so docs/Configurator derive knobs from the SAME allow-list.
export const CAROUSEL_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const CAROUSEL_ITEM_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// ─── Root — the transparent region frame ─────────────────────────────────────────────────────────
export const CAROUSEL_ROOT_VOCAB = defineLeaf({
  marker: 'aui-carousel',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CAROUSEL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: CAROUSEL_DEFAULT_SCALE,
    shape: 'none',
    elevation: 0,
  },
  cascadeReader: true,
});

export type CarouselRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useCarouselRootRecipe = createVocabRecipe(CAROUSEL_ROOT_VOCAB);

// ─── Item — the selection layer applied to the composed Card ─────────────────────────────────────
// Carousel.Item is the selectable `<button>`; the card itself is the library's stateless `Card`. The
// Item resolves the Card's `aui` per selection state and hands it to its Card child (Card has no
// selected/pressed state of its own). Verified cells: `aui-color-solid-surface` / `aui-color-tonal-
// primary` (`_230-color.scss`), `aui-elevation-2` (layer-3/_670-elevation.scss). `sx.foreground:
// 'text'` keeps text on the theme text role when selected (tonal-primary fg is < 4.5:1 on light).
export const CAROUSEL_ITEM_UNSELECTED: Appearance = { elevation: 2 };
export const CAROUSEL_ITEM_SELECTED: Appearance = {
  color: 'primary',
  paint: 'tonal',
  elevation: 2,
  sx: { foreground: 'text' },
};

export type CarouselItemStateKey = 'unselected' | 'selected';

/** The Item `aui`: Card appearance axes + `sx`, plus per-state overrides (unselected/selected). */
export type CarouselItemAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<CarouselItemStateKey, Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps }>>;
};

function layer(a: Appearance, b: Appearance | undefined): Appearance {
  if (!b) return a;
  const defined = Object.fromEntries(Object.entries(b).filter(([, v]) => v !== undefined)) as Appearance;
  return { ...a, ...defined, sx: a.sx || b.sx ? { ...a.sx, ...b.sx } : undefined };
}

/**
 * The Card `aui` for an Item state. Order (low → high): state default < the Card child's own `aui` <
 * the Item's top-level `aui` < the SELECTED default (selected only) < the Item's `aui.states[state]`.
 * The selected default sits ABOVE the Card's own axes so a styled Card still shows the selection.
 */
export function resolveCarouselItemCardAui(
  cardAui: Appearance | undefined,
  itemAui: CarouselItemAui | undefined,
  selected: boolean,
): Appearance {
  const { states, ...top } = itemAui ?? {};
  let out = layer(layer(CAROUSEL_ITEM_UNSELECTED, cardAui), top as Appearance);
  if (selected) out = layer(out, CAROUSEL_ITEM_SELECTED);
  out = layer(out, states?.[selected ? 'selected' : 'unselected'] as Appearance | undefined);
  if (!out.sx) delete out.sx;
  return out;
}

// ─── IndicatorGroup — the transparent dots row frame ─────────────────────────────────────────────
export const CAROUSEL_INDICATOR_GROUP_VOCAB = defineLeaf({
  marker: 'aui-carousel-pagination',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CAROUSEL_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'text', scale: CAROUSEL_DEFAULT_SCALE, shape: 'none', elevation: 0 },
  cascadeReader: true,
});
export type CarouselIndicatorGroupAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export const useCarouselIndicatorGroupRecipe = createVocabRecipe(CAROUSEL_INDICATOR_GROUP_VOCAB);

// ─── Indicator — a dot frame with inactive / active states ──────────────────────────────────────
// Inactive = a muted circle (`sx.background: 'muted'` — `--theme-muted`, ≥ 3:1 non-text contrast on
// surface themes); active = a solid primary pill (`aui-color-solid-primary`). `pill` shape; the size
// rides `--aui-dot-size` (marker CSS), overridable via `aui.sx.dotSize` / `width` / `height`.
export const CAROUSEL_INDICATOR_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const CAROUSEL_INDICATOR_VOCAB = defineLeaf({
  marker: 'aui-carousel-dot',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CAROUSEL_INDICATOR_SX_AXES,
  profile: 'no-padding' as const,
  defaults: { color: 'surface', paint: 'solid', scale: CAROUSEL_DEFAULT_SCALE, shape: 'pill', elevation: 0 },
  states: {
    unselected: { color: 'surface', paint: 'solid', sx: { background: 'muted' } },
    selected: { color: 'primary', paint: 'solid' },
  },
});

export type CarouselIndicatorStateKey = 'inactive' | 'active';
type IndicatorStateAppearance = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
/** The Indicator `aui`: frame axes + `sx`, plus `states.inactive` / `states.active`. */
export type CarouselIndicatorAui = IndicatorStateAppearance & {
  states?: Partial<Record<CarouselIndicatorStateKey, IndicatorStateAppearance>>;
};

export function buildCarouselIndicatorClasses(
  aui: CarouselIndicatorAui | undefined,
  active: boolean,
): string {
  const { states, ...top } = aui ?? {};
  const mapped = {
    ...top,
    states: { unselected: states?.inactive, selected: states?.active },
  } as Appearance & { states?: AuiStates };
  return buildLeafClasses(CAROUSEL_INDICATOR_VOCAB, mapped, active ? 'selected' : 'unselected', false);
}

// ─── Paging math (pure — unit-tested) ────────────────────────────────────────────────────────────

/** Default container-width breakpoints (min-width px → cards per view), confirmed 2026-10-27. */
export const CAROUSEL_DEFAULT_BREAKPOINTS: Readonly<Record<number, number>> = Object.freeze({
  0: 1,
  600: 2,
  1024: 3,
});

/** Cards per view for a container width: the largest breakpoint whose min-width ≤ width. */
export function resolvePerView(
  width: number,
  breakpoints: Readonly<Record<number, number>> = CAROUSEL_DEFAULT_BREAKPOINTS,
): number {
  const mins = Object.keys(breakpoints)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
  let perView = 1;
  for (const min of mins) {
    if (width >= min) perView = breakpoints[min];
  }
  return Math.max(1, Math.floor(perView));
}

/** Page count = ceil(cards ÷ cards per view); 0 cards → 0 pages. */
export function pageCount(total: number, perView: number): number {
  if (total <= 0) return 0;
  return Math.ceil(total / Math.max(1, perView));
}

/** Index of the first VISIBLE card on a page. The last page aligns to the END (no empty slots). */
export function pageStart(page: number, perView: number, total: number): number {
  const per = Math.max(1, perView);
  return Math.max(0, Math.min(page * per, total - per));
}

/** The page that contains a given card index (used to keep position across a breakpoint change). */
export function pageOfIndex(index: number, perView: number, total: number): number {
  const pages = pageCount(total, perView);
  if (pages === 0) return 0;
  return Math.min(pages - 1, Math.max(0, Math.floor(index / Math.max(1, perView))));
}
