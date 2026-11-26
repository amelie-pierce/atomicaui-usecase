// modules/design/atomic-aui/src/lib/chart/line/line-chart.tsx
//
// LineChart — a composable line chart over `@tanstack/charts`, as a COMPOUND component:
//
//   <LineChart aria-label="Visitors" data={rows} categoryKey="month" curve="natural">
//     <LineChart.Series dataKey="desktop" label="Desktop" />
//     <LineChart.Series dataKey="mobile" label="Mobile" />
//     <LineChart.Grid />
//     <LineChart.Axis axis="category" />
//     <LineChart.Dots />
//     <LineChart.Label />
//     <LineChart.Cursor />
//     <LineChart.Legend clickable />
//     <LineChart.Tooltip mode="axis" />
//   </LineChart>
//
// Same composition as Bar / Area: presence-based parts (the SHARED Axis, Grid, Legend, Cursor, Title,
// Description + the line's own Series, Dots, Label, Tooltip), a framework-neutral `buildLineChartDefinition`
// in chart-base, and the shared ChartFrame/ChartRenderer. Line-only props: `curve`, `strokeWidth`.
import * as React from 'react';
import {
  buildLineChartDefinition,
  chartLegendItems,
  resolveChartAnimation,
  type ChartAnimationSpec,
  type ChartCurve,
  type ChartPalette,
  type ChartSeriesSpec,
  type LineChartSpec,
  type LineDotsSpec,
  type LineLabelSpec,
  type LineTooltipMode,
} from '../base';
import {
  ChartAxisPart,
  ChartContainer,
  ChartCursorPart,
  ChartFrame,
  ChartGridPart,
  ChartLegendPart,
  collectChartParts,
  useChartLegend,
  useStableSpec,
  type ChartAxisProps,
  type ChartCursorProps,
  type ChartLegendProps,
  type ChartTooltipProps,
} from '../frame';
import type { LineChartRootAui } from './use-recipe';

export type { LineChartRootAui as LineChartAui } from './use-recipe';

export type LineChartAxisProps = ChartAxisProps;
export type LineChartLegendProps = ChartLegendProps;
export type LineChartCursorProps = ChartCursorProps;
export interface LineChartTooltipProps extends ChartTooltipProps {
  /** `axis` (default): hover a category to see every series there (shared cursor). `series`: hover a point to see that one. */
  mode?: LineTooltipMode;
}

export interface LineChartSeriesProps extends Omit<ChartSeriesSpec, 'key' | 'barStyle' | 'negativeColor'> {
  /** The row field holding this series' value (alias of `key`, mirrors the data shape). */
  dataKey: string;
  /** Replaces the legend swatch for this series (e.g. an icon). */
  icon?: React.ReactNode;
}
/** One data series (one line). Colour comes from the AtomicAUI series cycle unless `color` is set. */
function LineChartSeries(_props: LineChartSeriesProps): null {
  return null;
}
LineChartSeries.displayName = 'LineChart.Series';

export type LineChartDotsProps = LineDotsSpec;
/** A marker at every point: `variant` solid | hollow | stem, `radius`, `colorBy` series | category (+ `colors`). Omit for none. */
function LineChartDots(_props: LineChartDotsProps): null {
  return null;
}
LineChartDots.displayName = 'LineChart.Dots';

export type LineChartLabelProps = LineLabelSpec;
/** A value (or category) label on a series' points: `dataKey`, `text`, `format`, `position`, `offset`. Compose several. */
function LineChartLabel(_props: LineChartLabelProps): null {
  return null;
}
LineChartLabel.displayName = 'LineChart.Label';

/** Hover / focus tooltip. Omit to disable it. */
function LineChartTooltip(_props: LineChartTooltipProps): null {
  return null;
}
LineChartTooltip.displayName = 'LineChart.Tooltip';

const LineChartTitle = ChartContainer.Title;
const LineChartDescription = ChartContainer.Description;

export interface LineChartProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** Wide rows: one object per x category, one numeric column per series. */
  data: readonly TRow[];
  /** The row field holding the x category (month, date…). */
  categoryKey: string;
  /** Line shape between points: `natural` (default), `linear`, `step`, `monotone`, … */
  curve?: ChartCurve;
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
  aui?: LineChartRootAui;
  /** `LineChart.Series` / `.Axis` / `.Grid` / `.Dots` / `.Label` / `.Legend` / `.Tooltip` / `.Cursor`, plus optional `.Title` / `.Description`. */
  children?: React.ReactNode;
}

function LineChartRootImpl<TRow extends Record<string, unknown>>(
  {
    data,
    categoryKey,
    curve = 'natural',
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
  }: LineChartProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const labels: LineLabelSpec[] = [];
  let dots: false | LineDotsSpec = false;
  let tooltipPart: false | LineChartTooltipProps = false;
  const parts = collectChartParts(children, {
    seriesTypes: [LineChartSeries],
    extra: (child) => {
      if (child.type === LineChartDots) dots = { ...(child.props as LineChartDotsProps) };
      else if (child.type === LineChartLabel) labels.push({ ...(child.props as LineChartLabelProps) });
      else if (child.type === LineChartTooltip) tooltipPart = { ...(child.props as LineChartTooltipProps) };
      else return false;
      return true;
    },
  });
  const allLegendItems = chartLegendItems(parts.series);
  const { hidden, legend } = useChartLegend(parts.legend, allLegendItems.map((i) => i.key));
  // Hidden series are dropped; the rest keep their original colours.
  const visibleSeries = parts.series
    .map((s, i) => ({ ...s, color: s.color ?? allLegendItems[i].color }))
    .filter((s) => !hidden.has(s.key));
  const tooltip = tooltipPart as false | LineChartTooltipProps;
  const { mode: tooltipMode, ...tooltipSpec } = tooltip || ({} as LineChartTooltipProps);
  const spec: LineChartSpec<TRow> = useStableSpec({
    data,
    categoryKey,
    series: visibleSeries.map(({ icon: _icon, ...seriesSpec }) => seriesSpec),
    curve,
    strokeWidth,
    dots: dots as false | LineDotsSpec,
    labels,
    grid: parts.grid,
    categoryAxis: parts.categoryAxis,
    valueAxis: parts.valueAxis,
    cursor: parts.cursor,
    tooltip: tooltip ? tooltipSpec : false,
    tooltipMode,
    animation,
    margin,
  });
  const definition = React.useMemo(() => buildLineChartDefinition(spec), [spec]);
  const motionSpec = resolveChartAnimation(animation);
  const legendItems = allLegendItems.map((item, i) => ({ ...item, icon: parts.series[i].icon }));

  return React.createElement(ChartFrame, {
    ref,
    ...rest,
    kind: 'aui-line-chart',
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

const LineChartRootBase = React.forwardRef(LineChartRootImpl) as <TRow extends Record<string, unknown>>(
  props: LineChartProps<TRow> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

export const LineChart = Object.assign(LineChartRootBase, {
  Series: LineChartSeries,
  Axis: ChartAxisPart,
  Grid: ChartGridPart,
  Dots: LineChartDots,
  Label: LineChartLabel,
  Legend: ChartLegendPart,
  Tooltip: LineChartTooltip,
  Cursor: ChartCursorPart,
  Title: LineChartTitle,
  Description: LineChartDescription,
  displayName: 'LineChart',
});
export default LineChart;
