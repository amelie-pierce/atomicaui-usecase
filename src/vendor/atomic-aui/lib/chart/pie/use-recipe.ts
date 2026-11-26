// modules/design/atomic-aui/src/lib/chart/pie/use-recipe.ts
//
// PieChart's appearance IS the shared chart frame's (families/chart): this module only gives the
// kind its own public names. PieChart adds the `aui-pie-chart` marker via className at render time.
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

export type PieChartColor = AuiRecipeColor;
export type PieChartPaint = AuiRecipePaint;
export type PieChartScale = AuiRecipeScale;
export type PieChartProfile = AuiScaleProfile;
export type PieChartShape = AuiRecipeShape;
export type PieChartElevation = AuiElevation;

export const PIE_CHART_DEFAULT_SCALE: PieChartScale = CHART_CONTAINER_DEFAULT_SCALE;
export const PIE_CHART_SX_AXES = CHART_CONTAINER_SX_AXES;
export const PIE_CHART_ROOT_VOCAB = CHART_CONTAINER_VOCAB;
export type PieChartRootAui = ChartContainerAui;
export const usePieChartRootRecipe = useChartContainerRecipe;
