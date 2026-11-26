// modules/design/atomic-aui/src/lib/chart/area/use-recipe.ts
//
// AreaChart's appearance IS the shared chart frame's (families/chart): this module only gives the
// kind its own public names. AreaChart adds the `aui-area-chart` marker via className at render time.
import {
  CHART_CONTAINER_DEFAULT_SCALE,
  CHART_CONTAINER_SX_AXES,
  CHART_CONTAINER_VOCAB,
  useChartContainerRecipe,
  type ChartContainerAui,
} from '../frame';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../../core/vocabulary/recipe-vocab';

export type AreaChartColor = AuiRecipeColor;
export type AreaChartPaint = AuiRecipePaint;
export type AreaChartScale = AuiRecipeScale;
export type AreaChartProfile = AuiScaleProfile;
export type AreaChartShape = AuiRecipeShape;
export type AreaChartElevation = AuiElevation;

export const AREA_CHART_DEFAULT_SCALE: AreaChartScale = CHART_CONTAINER_DEFAULT_SCALE;
export const AREA_CHART_SX_AXES = CHART_CONTAINER_SX_AXES;
export const AREA_CHART_ROOT_VOCAB = CHART_CONTAINER_VOCAB;
export type AreaChartRootAui = ChartContainerAui;
export const useAreaChartRootRecipe = useChartContainerRecipe;
