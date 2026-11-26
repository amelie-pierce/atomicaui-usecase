// modules/design/atomic-aui/src/lib/chart/base/index.ts — framework-neutral chart base (no React).
export { CHART_SERIES_COUNT, chartSeriesVar, chartSeriesColor, chartSeriesColors } from './series-colors';
export { createChartTheme } from './theme';
export type { AuiChartTheme } from './theme';
export { CHART_PALETTES, CHART_DEFAULT_PALETTE, CHART_PALETTE_ATTRIBUTE } from './palettes';
export type { ChartPalette } from './palettes';
export { buildBarChartDefinition, toLongRows } from './bar-chart';
export { CHART_CURVES } from './curves';
export type { ChartCurve } from './curves';
export { buildLineChartDefinition, LINE_DEFAULT_STROKE_WIDTH } from './line-chart';
export type { LineChartSpec, LineDotsSpec, LineLabelSpec, LineTooltipMode } from './line-chart';
export { buildAreaChartDefinition } from './area-chart';
export type { AreaChartSpec, AreaCurve, AreaFill } from './area-chart';
export { buildPieChartDefinition, pieSliceItems } from './pie-chart';
export type { PieChartSpec, PieLabelSpec, PieCenterSpec } from './pie-chart';
export { buildRadarChartDefinition, RADAR_DEFAULT_STROKE_WIDTH } from './radar-chart';
export type { RadarChartSpec, RadarGridSpec, RadarLabelSpec } from './radar-chart';
export { chartLegendItems, toggleHiddenKey, createLegendVisibility, resolveChartAnimation, CHART_ANIMATION_DEFAULTS } from './common';
export type {
  BarChartSpec,
  ChartLabelSpec,
  ChartLabelPosition,
} from './bar-chart';
export type {
  BarStyle,
  ChartSeriesSpec,
  ChartAxisSpec,
  ChartCursorSpec,
  ChartAnimationSpec,
  ChartTooltipSpec,
  ChartTooltipContent,
  ChartTooltipRow,
} from './common';
export { attachRadarInteraction, radarTooltipContent, radarTooltipText, placeTooltip, nearestRadarSeries, nearestRadarAxis, parseRadarVertices } from './radar-interaction';
export type { RadarTooltipMode, RadarDelta, RadarInteraction, RadarInteractionOptions, RadarInteractionState, RadarInteractionSeries, RadarTarget } from './radar-interaction';
