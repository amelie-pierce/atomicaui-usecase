// modules/design/atomic-aui/src/lib/chart/pie/pie-chart.tsx
//
// PieChart — a composable pie / donut chart over `@tanstack/charts/polar`, as a COMPOUND component:
//
//   <PieChart aria-label="Visitors by browser" data={rows} nameKey="browser" innerRadius={0.6}>
//     <PieChart.Series dataKey="visitors" label="Visitors" />
//     <PieChart.Label position="outside" leader />
//     <PieChart.Center value="1,125" label="Visitors" />
//     <PieChart.Legend />
//     <PieChart.Tooltip />
//   </PieChart>
//
// Same composition as the other kinds: presence-based parts (the SHARED Legend / Tooltip / Title /
// Description plus the pie's own Series, Label and Center), a framework-neutral
// `buildPieChartDefinition` in chart-base, and the shared ChartFrame/ChartRenderer. Data is one row
// per SLICE; each `Series` is one ring (several = concentric rings). Slice colours cycle through the
// `--aui-viz-series-*` tokens unless `colors` is given.
import * as React from 'react';
import {
  buildPieChartDefinition,
  pieSliceItems,
  resolveChartAnimation,
  type ChartAnimationSpec,
  type ChartPalette,
  type ChartSeriesSpec,
  type PieCenterSpec,
  type PieChartSpec,
  type PieLabelSpec,
} from '../base';
import {
  ChartContainer,
  ChartFrame,
  ChartLegendPart,
  ChartTooltipPart,
  collectChartParts,
  useChartLegend,
  useStableSpec,
  type ChartLegendProps,
  type ChartTooltipProps,
} from '../frame';
import type { PieChartRootAui } from './use-recipe';

export type { PieChartRootAui as PieChartAui } from './use-recipe';

export type PieChartLegendProps = ChartLegendProps;
export type PieChartTooltipProps = ChartTooltipProps;

export interface PieChartSeriesProps extends Pick<ChartSeriesSpec, 'label'> {
  /** The row field holding each slice's value. One series = one ring. */
  dataKey: string;
}
/** One ring of slices. Several series draw concentric rings, first innermost. */
function PieChartSeries(_props: PieChartSeriesProps): null {
  return null;
}
PieChartSeries.displayName = 'PieChart.Series';

export type PieChartLabelProps = PieLabelSpec;
/** A label at each slice: its value (default) or name, inside or outside the rim (with a leader line). */
function PieChartLabel(_props: PieChartLabelProps): null {
  return null;
}
PieChartLabel.displayName = 'PieChart.Label';

export type PieChartCenterProps = PieCenterSpec;
/** Text in the hole of a donut (set `innerRadius` on the root). */
function PieChartCenter(_props: PieChartCenterProps): null {
  return null;
}
PieChartCenter.displayName = 'PieChart.Center';

const PieChartTitle = ChartContainer.Title;
const PieChartDescription = ChartContainer.Description;

export interface PieChartProps<TRow extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** One row per slice. */
  data: readonly TRow[];
  /** The row field holding the slice name. */
  nameKey: string;
  /** Hole size as a fraction of the radius: 0 = pie (default), e.g. 0.6 = donut. */
  innerRadius?: number;
  /** Gap/outline between slices in px (default 1; 0 = none). */
  separator?: number;
  /** Slice colours in data order (default: the series token cycle). */
  colors?: readonly string[];
  /** Name of the slice to push out and emphasise. */
  activeKey?: string;
  /** How far the active slice grows, in px (default 10). */
  activeOffset?: number;
  /** Enter/update animation, default on: `false` to disable, or `{ duration, easing, stagger }`. */
  animation?: boolean | ChartAnimationSpec;
  /** Accessible name of the chart (required — it names the SVG). */
  'aria-label': string;
  description?: string;
  /** Chart height in px; the pie is centred and fitted to it. Default 300. */
  height?: number;
  /** Series palette: `brand` (default, orange-led), `cool`, `warm`, `vivid`, or a single-hue ramp (`orange`, `blue`, `emerald`, `rose`, `slate`). A series' own `color` still wins. */
  palette?: ChartPalette;
  /** Root appearance (the transparent chart frame) incl. `sx`. */
  aui?: PieChartRootAui;
  /** `PieChart.Series` / `.Label` / `.Center` / `.Legend` / `.Tooltip`, plus optional `.Title` / `.Description`. */
  children?: React.ReactNode;
}

function PieChartRootImpl<TRow extends Record<string, unknown>>(
  {
    data,
    nameKey,
    innerRadius,
    separator,
    colors,
    activeKey,
    activeOffset,
    animation,
    height = 300,
    'aria-label': ariaLabel,
    description,
    aui,
    palette,
    children,
    ...rest
  }: PieChartProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const labels: PieLabelSpec[] = [];
  let center: PieCenterSpec | undefined;
  const parts = collectChartParts(children, {
    seriesTypes: [PieChartSeries],
    extra: (child) => {
      if (child.type === PieChartLabel) labels.push({ ...(child.props as PieChartLabelProps) });
      else if (child.type === PieChartCenter) center = { ...(child.props as PieChartCenterProps) };
      else return false;
      return true;
    },
  });
  const allItems = pieSliceItems({ data, nameKey, colors });
  const { hidden, legend } = useChartLegend(parts.legend, allItems.map((i) => i.key));
  // Hidden slices are dropped; the rest keep their original colours.
  const keep = allItems.map((i) => !hidden.has(i.key));
  const spec: PieChartSpec<TRow> = useStableSpec({
    data: data.filter((_, i) => keep[i]),
    nameKey,
    series: parts.series,
    innerRadius,
    separator,
    colors: allItems.filter((_, i) => keep[i]).map((i) => i.color),
    activeKey,
    activeOffset,
    labels,
    center,
    tooltip: parts.tooltip,
    animation,
  });
  const definition = React.useMemo(() => buildPieChartDefinition(spec), [spec]);
  const motionSpec = resolveChartAnimation(animation);

  return React.createElement(ChartFrame, {
    ref,
    ...rest,
    kind: 'aui-pie-chart',
    aui,
    palette,
    definition,
    'aria-label': ariaLabel,
    description,
    height,
    animation: motionSpec ? { duration: motionSpec.duration, easing: motionSpec.easing } : null,
    header: parts.header,
    legend,
    legendItems: allItems,
  });
}

const PieChartRootBase = React.forwardRef(PieChartRootImpl) as <TRow extends Record<string, unknown>>(
  props: PieChartProps<TRow> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

export const PieChart = Object.assign(PieChartRootBase, {
  Series: PieChartSeries,
  Label: PieChartLabel,
  Center: PieChartCenter,
  Legend: ChartLegendPart,
  Tooltip: ChartTooltipPart,
  Title: PieChartTitle,
  Description: PieChartDescription,
  displayName: 'PieChart',
});
export default PieChart;
