// modules/design/atomic-aui/src/lib/chart/radar/use-recipe.ts
//
// RadarChart's appearance IS the shared chart frame's (families/chart): this module only gives the
// kind its own public names. RadarChart adds the `aui-radar-chart` marker via className at render time.
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

export type RadarChartColor = AuiRecipeColor;
export type RadarChartPaint = AuiRecipePaint;
export type RadarChartScale = AuiRecipeScale;
export type RadarChartProfile = AuiScaleProfile;
export type RadarChartShape = AuiRecipeShape;
export type RadarChartElevation = AuiElevation;

export const RADAR_CHART_DEFAULT_SCALE: RadarChartScale = CHART_CONTAINER_DEFAULT_SCALE;
export const RADAR_CHART_SX_AXES = CHART_CONTAINER_SX_AXES;
export const RADAR_CHART_ROOT_VOCAB = CHART_CONTAINER_VOCAB;
export type RadarChartRootAui = ChartContainerAui;
export const useRadarChartRootRecipe = useChartContainerRecipe;
