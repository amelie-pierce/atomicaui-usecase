// modules/design/atomic-aui/src/lib/chart/radar/radar-chart.tsx
//
// RadarChart — a composable radar (spider) chart over `@tanstack/charts/polar`, as a COMPOUND component:
//
//   <RadarChart aria-label="Visitors" data={rows} categoryKey="month">
//     <RadarChart.Series dataKey="desktop" label="Desktop" />
//     <RadarChart.Series dataKey="mobile" label="Mobile" />
//     <RadarChart.Grid shape="polygon" />
//     <RadarChart.Axis axis="category" />
//     <RadarChart.Legend />
//     <RadarChart.Tooltip />
//   </RadarChart>
//
// Same composition as the other kinds: presence-based parts (the SHARED Axis / Legend / Tooltip /
// Title / Description plus the radar's own Series, Grid and Label), a framework-neutral
// `buildRadarChartDefinition` in chart-base, and the shared ChartFrame/ChartRenderer. Axis maps onto
// the polar scales: `category` = the labels around the web, `value` = the ring labels.
import * as React from 'react';
import {
  buildRadarChartDefinition,
  chartLegendItems,
  resolveChartAnimation,
  type ChartAnimationSpec,
  type ChartTooltipContent,
  type RadarDelta,
  type RadarInteractionState,
  type RadarTooltipMode,
  type ChartPalette,
  type ChartSeriesSpec,
  type RadarChartSpec,
  type RadarGridSpec,
  type RadarLabelSpec,
} from '../base';
import {
  ChartAxisPart,
  ChartContainer,
  ChartFrame,
  ChartLegendPart,
  collectChartParts,
  useChartLegend,
  useStableSpec,
  type ChartAxisProps,
  type ChartLegendProps,
  type ChartTooltipProps,
} from '../frame';
import { RadarTooltipLayer } from './radar-tooltip-layer';
import type { RadarChartRootAui } from './use-recipe';

export type { RadarChartRootAui as RadarChartAui } from './use-recipe';

export type RadarChartAxisProps = ChartAxisProps;
export type RadarChartLegendProps = ChartLegendProps;
export interface RadarChartTooltipProps extends ChartTooltipProps {
  /** `series` (default): hover a line/area → that series with one row per axis. `axis`: hover an axis → one row per series (compare). */
  mode?: RadarTooltipMode;
  /** Axis mode: order the rows by value, highest first (default true). */
  sort?: boolean;
  /** Axis mode: a muted difference to the `leader` or the `average` next to each value (off by default). */
  delta?: RadarDelta;
  /** Custom render slot: replaces the card body (receives the content + the interaction state). */
  render?: (content: ChartTooltipContent, state: RadarInteractionState) => React.ReactNode;
}
/** The hover / focus card (own interaction layer, shared tooltip look). Omit to disable it. */
function RadarChartTooltip(_props: RadarChartTooltipProps): null {
  return null;
}
RadarChartTooltip.displayName = 'RadarChart.Tooltip';

export interface RadarChartSeriesProps extends Omit<ChartSeriesSpec, 'key' | 'barStyle' | 'negativeColor'> {
  /** The row field holding this series' value (alias of `key`, mirrors the data shape). */
  dataKey: string;
  /** Replaces the legend swatch for this series (e.g. an icon). */
  icon?: React.ReactNode;
}
/** One data series (one polygon). Colour comes from the AtomicAUI series cycle unless `color` is set. */
function RadarChartSeries(_props: RadarChartSeriesProps): null {
  return null;
}
RadarChartSeries.displayName = 'RadarChart.Series';

export type RadarChartGridProps = RadarGridSpec;
/** The web behind the data: ring `shape`, `rings` / `values`, `lines`, `spokes`, `fill`. Omit for none. */
function RadarChartGrid(_props: RadarChartGridProps): null {
  return null;
}
RadarChartGrid.displayName = 'RadarChart.Grid';

export type RadarChartLabelProps = RadarLabelSpec;
/** A label beyond each category (name, value or values). Compose several; they stack inward in order.
 *  Replaces the plain category labels from `RadarChart.Axis`. */
function RadarChartLabel(_props: RadarChartLabelProps): null {
  return null;
}
RadarChartLabel.displayName = 'RadarChart.Label';

const RadarChartTitle = ChartContainer.Title;
const RadarChartDescription = ChartContainer.Description;

export interface RadarChartProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** Wide rows: one object per axis category, one numeric column per series. */
  data: readonly TRow[];
  /** The row field holding the axis category. */
  categoryKey: string;
  /** `solid` (translucent, default) or `none` (outline only). */
  fill?: 'solid' | 'none';
  /** Area opacity for `solid` (default 0.25). */
  fillOpacity?: number;
  /** Series outline width in px (default 1; the grid keeps its own 1px). */
  strokeWidth?: number;
  /** A dot at every vertex. */
  dots?: boolean;
  /** Enter/update animation, default on: `false` to disable, or `{ duration, easing, stagger }`. */
  animation?: boolean | ChartAnimationSpec;
  /** Accessible name of the chart (required — it names the SVG). */
  'aria-label': string;
  description?: string;
  /** Chart height in px; the radar is centred and fitted to it. Default 300. */
  height?: number;
  /** Series palette: `brand` (default, orange-led), `cool`, `warm`, `vivid`, or a single-hue ramp (`orange`, `blue`, `emerald`, `rose`, `slate`). A series' own `color` still wins. */
  palette?: ChartPalette;
  /** Root appearance (the transparent chart frame) incl. `sx`. */
  aui?: RadarChartRootAui;
  /** `RadarChart.Series` / `.Grid` / `.Axis` / `.Label` / `.Legend` / `.Tooltip`, plus optional `.Title` / `.Description`. */
  children?: React.ReactNode;
}

function RadarChartRootImpl<TRow extends Record<string, unknown>>(
  {
    data,
    categoryKey,
    fill,
    fillOpacity,
    strokeWidth,
    dots,
    animation,
    height = 300,
    'aria-label': ariaLabel,
    description,
    aui,
    palette,
    children,
    ...rest
  }: RadarChartProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const labels: RadarLabelSpec[] = [];
  let grid: false | RadarGridSpec = false;
  let tooltipPart = false as false | RadarChartTooltipProps;
  const parts = collectChartParts(children, {
    seriesTypes: [RadarChartSeries],
    extra: (child) => {
      if (child.type === RadarChartGrid) grid = { ...(child.props as RadarChartGridProps) };
      else if (child.type === RadarChartTooltip) tooltipPart = { ...(child.props as RadarChartTooltipProps) };
      else if (child.type === RadarChartLabel) labels.push({ ...(child.props as RadarChartLabelProps) });
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
  const spec: RadarChartSpec<TRow> = useStableSpec({
    data,
    categoryKey,
    series: visibleSeries.map(({ icon: _icon, ...seriesSpec }) => seriesSpec),
    grid,
    categoryAxis: parts.categoryAxis,
    valueAxis: parts.valueAxis,
    fill,
    fillOpacity,
    strokeWidth,
    dots,
    labels,
    tooltip: tooltipPart !== false,
    animation,
  });
  const definition = React.useMemo(() => buildRadarChartDefinition(spec), [spec]);
  const motionSpec = resolveChartAnimation(animation);
  const legendItems = allLegendItems.map((item, i) => ({ ...item, icon: parts.series[i].icon }));

  return React.createElement(ChartFrame, {
    ref,
    ...rest,
    kind: 'aui-radar-chart',
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
    plotChildren: tooltipPart
      ? React.createElement(RadarTooltipLayer, {
          options: {
            mode: tooltipPart.mode ?? 'series',
            categoryKey,
            data: data as readonly Record<string, unknown>[],
            series: visibleSeries.map((s, i) => ({ key: s.key, label: s.label ?? s.key, color: s.color ?? allLegendItems[i].color })),
            format: tooltipPart.formatValue,
            sort: tooltipPart.sort,
            delta: tooltipPart.delta,
            content: tooltipPart.content,
          },
          className: tooltipPart.className,
          render: tooltipPart.render,
        })
      : undefined,
  });
}

const RadarChartRootBase = React.forwardRef(RadarChartRootImpl) as <TRow extends Record<string, unknown>>(
  props: RadarChartProps<TRow> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

export const RadarChart = Object.assign(RadarChartRootBase, {
  Series: RadarChartSeries,
  Grid: RadarChartGrid,
  Axis: ChartAxisPart,
  Label: RadarChartLabel,
  Legend: ChartLegendPart,
  Tooltip: RadarChartTooltip,
  Title: RadarChartTitle,
  Description: RadarChartDescription,
  displayName: 'RadarChart',
});
export default RadarChart;
