// modules/design/atomic-aui/src/lib/chart/frame/use-recipe.ts
//
// ChartContainer recipe — the transparent chart frame shared by EVERY chart kind (the
// CAROUSEL_ROOT_VOCAB / CARD_GROUP_ROOT_VOCAB shape: cascadeReader, `paint: 'text'`, `no-padding` →
// paints nothing by default, so a chart sits inside a Card or any surface). The marker `aui-chart`
// scopes the chart tokens (`tokens/_chart-tokens.scss`); a kind adds its own marker via `className`.
import { createVocabRecipe } from '../../../core/factory/create-vocab-recipe';
import { defineLeaf, type Appearance } from '../../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../../tokens/index';
import type { AuiStyleProps } from '../../../tokens/index';

export const CHART_CONTAINER_DEFAULT_SCALE = 'sm' as const;

// Full frame `sx` surface — exported so docs/Configurator derive knobs from the SAME allow-list.
export const CHART_CONTAINER_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const CHART_CONTAINER_VOCAB = defineLeaf({
  marker: 'aui-chart',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: CHART_CONTAINER_SX_AXES,
  profile: 'no-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: CHART_CONTAINER_DEFAULT_SCALE,
    shape: 'none',
    elevation: 0,
  },
  cascadeReader: true,
});

export type ChartContainerAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

export const useChartContainerRecipe = createVocabRecipe(CHART_CONTAINER_VOCAB);
