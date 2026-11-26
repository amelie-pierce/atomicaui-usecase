// modules/design/atomic-aui/src/lib/chart/bar/use-recipe.ts
//
// BarChart's appearance IS the shared chart frame's (families/chart): this module only gives the
// kind its own public names. BarChart adds the `aui-bar-chart` marker via className at render time.
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

export type BarChartColor = AuiRecipeColor;
export type BarChartPaint = AuiRecipePaint;
export type BarChartScale = AuiRecipeScale;
export type BarChartProfile = AuiScaleProfile;
export type BarChartShape = AuiRecipeShape;
export type BarChartElevation = AuiElevation;

export const BAR_CHART_DEFAULT_SCALE: BarChartScale = CHART_CONTAINER_DEFAULT_SCALE;
export const BAR_CHART_SX_AXES = CHART_CONTAINER_SX_AXES;
export const BAR_CHART_ROOT_VOCAB = CHART_CONTAINER_VOCAB;
export type BarChartRootAui = ChartContainerAui;
export const useBarChartRootRecipe = useChartContainerRecipe;
