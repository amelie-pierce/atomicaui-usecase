// modules/design/atomic-aui/src/lib/chart/area/area-chart.tsx
//
// AreaChart — a composable area chart over `@tanstack/charts`, as a COMPOUND component:
//
//   <AreaChart aria-label="Visitors" data={rows} categoryKey="month" layout="stack" curve="natural">
//     <AreaChart.Series dataKey="desktop" label="Desktop" />
//     <AreaChart.Series dataKey="mobile" label="Mobile" />
//     <AreaChart.Grid />
//     <AreaChart.Axis axis="category" />
//     <AreaChart.Cursor />
//     <AreaChart.Legend />
//     <AreaChart.Tooltip />
//   </AreaChart>
//
// Same composition as BarChart: presence-based parts (the SHARED chart parts — Axis, Grid, Legend,
// Tooltip, Cursor, Title, Description — plus the area's own Series), a framework-neutral
// `buildAreaChartDefinition` in chart-base, and the shared ChartFrame/ChartRenderer. Area-only
// props: `layout` (stack | overlap | expand), `curve`, `fill` (solid | gradient | none).
import * as React from 'react';
import {
  buildAreaChartDefinition,
  chartLegendItems,
  resolveChartAnimation,
  type AreaChartSpec,
  type AreaCurve,
  type AreaFill,
  type ChartAnimationSpec,
  type ChartPalette,
  type ChartSeriesSpec,
} from '../base';
import {
  ChartAxisPart,
  ChartContainer,
  ChartCursorPart,
  ChartFrame,
  ChartGridPart,
  ChartLegendPart,
  ChartTooltipPart,
  collectChartParts,
  useChartLegend,
  useStableSpec,
  type ChartAxisProps,
  type ChartCursorProps,
  type ChartLegendProps,
  type ChartTooltipProps,
} from '../frame';
import type { AreaChartRootAui } from './use-recipe';

export type { AreaChartRootAui as AreaChartAui } from './use-recipe';

export type AreaChartAxisProps = ChartAxisProps;
export type AreaChartLegendProps = ChartLegendProps;
export type AreaChartTooltipProps = ChartTooltipProps;
export type AreaChartCursorProps = ChartCursorProps;

export interface AreaChartSeriesProps extends Omit<ChartSeriesSpec, 'key' | 'barStyle' | 'negativeColor'> {
  /** The row field holding this series' value (alias of `key`, mirrors the data shape). */
  dataKey: string;
  /** Replaces the legend swatch for this series (e.g. an icon). */
  icon?: React.ReactNode;
}
/** One data series. Colour comes from the AtomicAUI series cycle unless `color` is set. */
function AreaChartSeries(_props: AreaChartSeriesProps): null {
  return null;
}
AreaChartSeries.displayName = 'AreaChart.Series';

const AreaChartTitle = ChartContainer.Title;
const AreaChartDescription = ChartContainer.Description;

export interface AreaChartProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** Wide rows: one object per x category, one numeric column per series. */
  data: readonly TRow[];
  /** The row field holding the x category (month, date…). */
  categoryKey: string;
  /** `stack` (default; first series at the bottom), `overlap` (each from the baseline), `expand` (stacked to 100%). */
  layout?: 'stack' | 'overlap' | 'expand';
  /** Line shape between points (default `natural`). */
  curve?: AreaCurve;
  /** `gradient` (tonal, fades toward the baseline; default), `solid` (translucent) or `none` (outline only). */
  fill?: AreaFill;
  /** Area opacity for `solid` (default 0.25). */
  fillOpacity?: number;
  /** Outline width in px (default 2). */
  strokeWidth?: number;
  /** Enter/update animation, default on: `false` to disable, or `{ duration, easing, stagger }`. */
  animation?: boolean | ChartAnimationSpec;
  /** Accessible name of the chart (required — it names the SVG). */
  'aria-label': string;
  description?: string;
  /** Chart height in px; the width follows the container. Default 300. */
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Series palette: `brand` (default, orange-led), `cool`, `warm`, `vivid`, or a single-hue ramp (`orange`, `blue`, `emerald`, `rose`, `slate`). A series' own `color` still wins. */
  palette?: ChartPalette;
  /** Root appearance (the transparent chart frame) incl. `sx`. */
  aui?: AreaChartRootAui;
  /** `AreaChart.Series` / `.Axis` / `.Grid` / `.Legend` / `.Tooltip` / `.Cursor`, plus optional `.Title` / `.Description`. */
  children?: React.ReactNode;
}

function AreaChartRootImpl<TRow extends Record<string, unknown>>(
  {
    data,
    categoryKey,
    layout = 'stack',
    curve = 'natural',
    fill = 'gradient',
    fillOpacity,
    strokeWidth,
    animation,
    height = 300,
    margin,
    'aria-label': ariaLabel,
    description,
    aui,
    palette,
    children,
    ...rest
  }: AreaChartProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const idPrefix = `aui-area-${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const parts = collectChartParts(children, { seriesTypes: [AreaChartSeries] });
  const allLegendItems = chartLegendItems(parts.series);
  const { hidden, legend } = useChartLegend(parts.legend, allLegendItems.map((i) => i.key));
  // Hidden series are dropped; the rest keep their original colours.
  const visibleSeries = parts.series
    .map((s, i) => ({ ...s, color: s.color ?? allLegendItems[i].color }))
    .filter((s) => !hidden.has(s.key));
  const spec: AreaChartSpec<TRow> = useStableSpec({
    data,
    categoryKey,
    series: visibleSeries.map(({ icon: _icon, ...seriesSpec }) => seriesSpec),
    layout,
    curve,
    fill,
    fillOpacity,
    strokeWidth,
    grid: parts.grid,
    categoryAxis: parts.categoryAxis,
    valueAxis: parts.valueAxis,
    cursor: parts.cursor,
    tooltip: parts.tooltip,
    animation,
    idPrefix,
    margin,
  });
  const definition = React.useMemo(() => buildAreaChartDefinition(spec), [spec]);
  const motionSpec = resolveChartAnimation(animation);
  const legendItems = allLegendItems.map((item, i) => ({ ...item, icon: parts.series[i].icon }));

  return React.createElement(ChartFrame, {
    ref,
    ...rest,
    kind: 'aui-area-chart',
    aui,
    palette,
    definition,
    'aria-label': ariaLabel,
    description,
    height,
    animation: motionSpec ? { duration: motionSpec.duration, easing: motionSpec.easing } : null,
    reveal: 'sweep',
    header: parts.header,
    legend,
    legendItems,
  });
}

const AreaChartRootBase = React.forwardRef(AreaChartRootImpl) as <TRow extends Record<string, unknown>>(
  props: AreaChartProps<TRow> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

export const AreaChart = Object.assign(AreaChartRootBase, {
  Series: AreaChartSeries,
  Axis: ChartAxisPart,
  Grid: ChartGridPart,
  Legend: ChartLegendPart,
  Tooltip: ChartTooltipPart,
  Cursor: ChartCursorPart,
  Title: AreaChartTitle,
  Description: AreaChartDescription,
  displayName: 'AreaChart',
});
export default AreaChart;
