// modules/design/atomic-aui/src/lib/chart/bar/bar-chart.tsx
//
// BarChart — a composable bar chart over `@tanstack/charts`, as a COMPOUND component:
//
//   <BarChart aria-label="Visitors" data={rows} categoryKey="month" height={300}>
//     <BarChart.Series dataKey="desktop" label="Desktop" />
//     <BarChart.Series dataKey="mobile" label="Mobile" />
//     <BarChart.Grid />
//     <BarChart.Axis axis="x" />
//     <BarChart.Label />
//     <BarChart.Cursor />
//     <BarChart.Legend />
//     <BarChart.Tooltip />
//   </BarChart>
//
// Composition is PRESENCE-BASED: a part you do not render is simply off (no grid, legend, tooltip,
// axis). The parts are declarative — they render nothing; the root reads them from `children`, hands
// a plain spec to the framework-neutral `chart-base` (`buildBarChartDefinition`), and renders the
// resulting definition through the shared `ChartRenderer`, inside the shared `ChartContainer`
// frame (families/chart — every kind reuses both). The library owns layout, scales, ARIA
// roles and interaction (wrapping-non-base-ui-headless-primitive pattern); AtomicAUI adds the
// surface (`aui`), the series colour cycle (`--aui-viz-series-*`) and the composition.
import * as React from 'react';
import {
  buildBarChartDefinition,
  chartLegendItems,
  resolveChartAnimation,
  type BarChartSpec,
  type ChartAnimationSpec,
  type ChartPalette,
  type ChartLabelSpec,
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
import type { BarChartRootAui } from './use-recipe';

export type { BarChartRootAui as BarChartAui } from './use-recipe';

// ─── Parts (declarative — render nothing) ────────────────────────────────────────────────────────
// Axis / Grid / Legend / Tooltip / Cursor / Title / Description are the SHARED chart parts
// (families/chart/parts.tsx), re-exported under BarChart's dot-names; Series and Label are the bar's own.

export type BarChartAxisProps = ChartAxisProps;
export type BarChartLegendProps = ChartLegendProps;
export type BarChartTooltipProps = ChartTooltipProps;
export type BarChartCursorProps = ChartCursorProps;

export interface BarChartSeriesProps extends Omit<ChartSeriesSpec, 'key'> {
  /** The row field holding this series' value (alias of `key`, mirrors the data shape). */
  dataKey: string;
  /** Replaces the legend swatch for this series (e.g. an icon). */
  icon?: React.ReactNode;
}
/** One data series. Colour comes from the AtomicAUI series cycle unless `color` is set;
 *  `negativeColor` and `barStyle` paint individual bars (diverging, mixed, highlighted). */
function BarChartSeries(_props: BarChartSeriesProps): null {
  return null;
}
BarChartSeries.displayName = 'BarChart.Series';

export type BarChartLabelProps = ChartLabelSpec;
/** A label at each bar: its value (default) or category name, at the bar end, centre or baseline.
 *  Compose several (e.g. a category label at the start and a value label at the end). */
function BarChartLabel(_props: BarChartLabelProps): null {
  return null;
}
BarChartLabel.displayName = 'BarChart.Label';

/** A heading above the chart (shared ChartContainer part). */
const BarChartTitle = ChartContainer.Title;
/** A supporting line under the title. */
const BarChartDescription = ChartContainer.Description;

// ─── Root ────────────────────────────────────────────────────────────────────────────────────────

export interface BarChartProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** Wide rows: one object per category, one numeric column per series. */
  data: readonly TRow[];
  /** The row field holding the category. */
  categoryKey: string;
  /** `vertical` (default): categories along x. `horizontal`: categories along y. */
  orientation?: 'vertical' | 'horizontal';
  /** `group` = side by side (default); `stack` = stacked. */
  layout?: 'group' | 'stack';
  /** Bar end-corner radius in px (default 4). */
  radius?: number;
  /** Hover/focus emphasis: `bar` outlines the focused bar; `dim` fades the other categories. */
  highlight?: 'bar' | 'dim';
  /** Enter/update animation, default on: `false` to disable, or `{ duration, easing, stagger }`.
   *  Honours `prefers-reduced-motion`. */
  animation?: boolean | ChartAnimationSpec;
  /** Accessible name of the chart (required — it is the SVG's name; the frame div stays unnamed). */
  'aria-label': string;
  /** Longer description for assistive tech (context, units, time range). */
  description?: string;
  /** Chart height in px; the width follows the container. Default 300. */
  height?: number;
  /** Plot margins in px, overriding the defaults sized to the axes and labels. */
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Series palette: `brand` (default, orange-led), `cool`, `warm`, `vivid`, or a single-hue ramp (`orange`, `blue`, `emerald`, `rose`, `slate`). A series' own `color` still wins. */
  palette?: ChartPalette;
  /** Root appearance (the transparent chart frame) incl. `sx`. */
  aui?: BarChartRootAui;
  /** `BarChart.Series` / `.Axis` / `.Grid` / `.Legend` / `.Tooltip` / `.Cursor` / `.Label`, plus optional `.Title` / `.Description` shown above the chart. */
  children?: React.ReactNode;
}

function BarChartRootImpl<TRow extends Record<string, unknown>>(
  {
    data,
    categoryKey,
    orientation = 'vertical',
    layout = 'group',
    radius = 4,
    highlight,
    animation,
    height = 300,
    margin,
    'aria-label': ariaLabel,
    description,
    aui,
    palette,
    children,
    ...rest
  }: BarChartProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const labels: ChartLabelSpec[] = [];
  const parts = collectChartParts(children, {
    horizontal: orientation === 'horizontal',
    seriesTypes: [BarChartSeries],
    extra: (child) => {
      if (child.type !== BarChartLabel) return false;
      labels.push({ ...(child.props as BarChartLabelProps) });
      return true;
    },
  });
  const allLegendItems = chartLegendItems(parts.series);
  const { hidden, legend } = useChartLegend(parts.legend, allLegendItems.map((i) => i.key));
  // Hidden series are dropped; the rest keep their original colours.
  const visibleSeries = parts.series
    .map((s, i) => ({ ...s, color: s.color ?? allLegendItems[i].color }))
    .filter((s) => !hidden.has(s.key));
  const spec: BarChartSpec<TRow> = useStableSpec({
    data,
    categoryKey,
    series: visibleSeries.map(({ icon: _icon, ...seriesSpec }) => seriesSpec),
    orientation,
    layout,
    radius,
    highlight,
    grid: parts.grid,
    categoryAxis: parts.categoryAxis,
    valueAxis: parts.valueAxis,
    cursor: parts.cursor,
    animation,
    tooltip: parts.tooltip,
    labels,
    margin,
  });
  const definition = React.useMemo(() => buildBarChartDefinition(spec), [spec]);
  const motionSpec = resolveChartAnimation(animation);
  const legendItems = allLegendItems.map((item, i) => ({ ...item, icon: parts.series[i].icon }));

  return React.createElement(ChartFrame, {
    ref,
    ...rest,
    kind: 'aui-bar-chart',
    aui,
    palette,
    definition,
    'aria-label': ariaLabel,
    description,
    height,
    animation: motionSpec ? { duration: motionSpec.duration, easing: motionSpec.easing } : null,
    header: parts.header,
    legend,
    legendItems,
  });
}

const BarChartRootBase = React.forwardRef(BarChartRootImpl) as <TRow extends Record<string, unknown>>(
  props: BarChartProps<TRow> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

export const BarChart = Object.assign(BarChartRootBase, {
  Series: BarChartSeries,
  Axis: ChartAxisPart,
  Grid: ChartGridPart,
  Legend: ChartLegendPart,
  Tooltip: ChartTooltipPart,
  Cursor: ChartCursorPart,
  Label: BarChartLabel,
  Title: BarChartTitle,
  Description: BarChartDescription,
  displayName: 'BarChart',
});
export default BarChart;
