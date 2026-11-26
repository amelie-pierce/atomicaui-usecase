// modules/design/atomic-aui/src/lib/chart/line/use-recipe.ts
//
// LineChart's appearance IS the shared chart frame's (families/chart): this module only gives the
// kind its own public names. LineChart adds the `aui-area-chart` marker via className at render time.
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

export type LineChartColor = AuiRecipeColor;
export type LineChartPaint = AuiRecipePaint;
export type LineChartScale = AuiRecipeScale;
export type LineChartProfile = AuiScaleProfile;
export type LineChartShape = AuiRecipeShape;
export type LineChartElevation = AuiElevation;

export const LINE_CHART_DEFAULT_SCALE: LineChartScale = CHART_CONTAINER_DEFAULT_SCALE;
export const LINE_CHART_SX_AXES = CHART_CONTAINER_SX_AXES;
export const LINE_CHART_ROOT_VOCAB = CHART_CONTAINER_VOCAB;
export type LineChartRootAui = ChartContainerAui;
export const useLineChartRootRecipe = useChartContainerRecipe;
