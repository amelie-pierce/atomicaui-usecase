// modules/design/atomic-aui/src/lib/chart/base/area-chart.ts
//
// Framework-neutral AreaChart definition builder over `@tanstack/charts` (`areaY`). Same wide-row
// spec and shared pieces (series colours, tooltip, hover rule, motion, axes) as the bar builder;
// only the mark, the point x-scale, the stacking layout, the curve and the fill treatment are
// area-specific.
import { areaY, d3Curve, defineChart, lineY, stack } from '@tanstack/charts';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scalePoint } from '@tanstack/charts/scales/point';
import { CHART_CURVES, type ChartCurve } from './curves';
import { chartSeriesColor } from './series-colors';
import { createChartTheme } from './theme';
import {
  chartCategoryAxis,
  chartCursorMarks,
  chartMotionOption,
  chartTooltipOption,
  chartValueAxis,
  seriesLabel,
  type ChartAnimationSpec,
  type ChartAxisSpec,
  type ChartCursorSpec,
  type ChartSeriesSpec,
  type ChartTooltipSpec,
} from './common';

/** The curve names are shared with the Line chart (`ChartCurve`). */
export type AreaCurve = ChartCurve;

/** How the area is painted: a tonal vertical `gradient` (default), a translucent `solid`, or stroke-only `none`. */
export type AreaFill = 'solid' | 'gradient' | 'none';

export interface AreaChartSpec<TRow extends Record<string, unknown>> {
  data: readonly TRow[];
  /** The row field holding the x category (month, date…). */
  categoryKey: string;
  series: readonly ChartSeriesSpec[];
  /** `stack` (default, first series at the bottom), `overlap` (each from the baseline) or `expand`
   *  (stacked to 100%). */
  layout?: 'stack' | 'overlap' | 'expand';
  curve?: AreaCurve;
  fill?: AreaFill;
  /** Area opacity for `solid` (default 0.25). */
  fillOpacity?: number;
  /** Outline width in px (default 1.5; 0 = none). */
  strokeWidth?: number;
  /** Grid lines along the value axis (default true). */
  grid?: boolean;
  categoryAxis?: false | ChartAxisSpec<string>;
  valueAxis?: false | ChartAxisSpec<number>;
  tooltip?: boolean | ChartTooltipSpec;
  /** Hover/focus vertical rule at the focused x. */
  cursor?: boolean | ChartCursorSpec;
  animation?: boolean | ChartAnimationSpec;
  /** Unique prefix for the gradient ids (several charts on one page). */
  idPrefix?: string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

interface AreaRow {
  category: string;
  series: string;
  value: number;
  index: number;
}

function toAreaRows(data: readonly Record<string, unknown>[], categoryKey: string, series: readonly ChartSeriesSpec[]) {
  const rows: AreaRow[] = [];
  data.forEach((row, index) => {
    for (const s of series) {
      const value = Number(row[s.key]);
      if (Number.isFinite(value)) rows.push({ category: String(row[categoryKey]), series: s.key, value, index });
    }
  });
  return rows;
}

/** Build the chart definition for an area chart spec. */
// The outline line marks add points to each hover group: keep one tooltip row per series.
function uniqueSeries<T extends { group?: unknown; datum?: unknown }>(points: readonly T[]): T[] {
  const seen = new Set<string>();
  return points.filter((p) => {
    const k = String(p.group ?? (p.datum as { series?: string } | undefined)?.series ?? '');
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function buildAreaChartDefinition<TRow extends Record<string, unknown>>(spec: AreaChartSpec<TRow>) {
  const {
    data,
    categoryKey,
    series,
    layout = 'stack',
    curve = 'natural',
    fill = 'gradient',
    fillOpacity = 0.25,
    strokeWidth = 2,
    grid = true,
    categoryAxis = {},
    valueAxis = {},
    tooltip = true,
    cursor = false,
    animation,
    idPrefix = 'aui-area',
  } = spec;
  const keys = series.map((s) => s.key);
  const colorOf = (key: string) => series[keys.indexOf(key)]?.color ?? chartSeriesColor(keys.indexOf(key));
  const colorScale = scaleOrdinal<string, string>().domain(keys).range(keys.map(colorOf));
  const rows = toAreaRows(data, categoryKey, series);
  const gradientId = (key: string) => `${idPrefix}-${keys.indexOf(key)}`;

  const hasValueAxis = valueAxis !== false;
  const hasCategoryAxis = categoryAxis !== false;
  const margin = {
    top: 5,
    right: 12,
    bottom: hasCategoryAxis ? 35 : 5,
    left: hasValueAxis ? 40 : 12,
    ...spec.margin,
  };

  const paint = {
    curve: d3Curve(CHART_CURVES[curve]),
    ...(fill === 'gradient' ? { fill: (r: AreaRow) => `url(#${gradientId(r.series)})`, fillOpacity: 1 } : {}),
    ...(fill === 'none' ? { fillOpacity: 0 } : fill === 'solid' ? { fillOpacity } : {}),
  };
  // The outline is a separate line along the TOP edge of each band (the library strokes the whole area
  // polygon, which would also draw the baseline and the plot sides). Stacked tops are cumulative.
  const totals = new Map<string, number>();
  for (const r of rows) totals.set(r.category, (totals.get(r.category) ?? 0) + r.value);
  const running = new Map<string, number>();
  const topRows = keys.flatMap((key) =>
    rows
      .filter((r) => r.series === key)
      .map((r) => {
        if (layout === 'overlap') return { ...r, top: r.value };
        const cum = (running.get(r.category) ?? 0) + r.value;
        running.set(r.category, cum);
        return { ...r, top: layout === 'expand' ? cum / (totals.get(r.category) || 1) : cum };
      }),
  );
  const outlines = keys.map((key) =>
    lineY(
      topRows.filter((r) => r.series === key),
      {
        id: `outline-${key}`,
        x: 'category',
        y: 'top',
        stroke: colorOf(key),
        strokeWidth,
        curve: d3Curve(CHART_CURVES[curve]),
        key: (r: AreaRow) => `${r.category}:${r.series}:top`,
      } as never,
    ),
  );
  // Stacked / expanded: ONE mark with a stack layout. Overlap: one mark per series with explicit
  // [0, value] extents (the library stacks series that share a mark by default).
  const areas =
    layout === 'overlap'
      ? keys.map((key) =>
          areaY(
            rows.filter((r) => r.series === key),
            {
              id: `area-${key}`,
              x: 'category',
              y1: 0,
              y2: 'value',
              color: 'series',
              key: (r: AreaRow) => `${r.category}:${r.series}`,
              ...paint,
            } as never,
          ),
        )
      : [
          areaY(rows, {
            id: 'areas',
            x: 'category',
            y: 'value',
            z: 'series',
            color: 'series',
            key: (r: AreaRow) => `${r.category}:${r.series}`,
            layout: stack(layout === 'expand' ? { order: keys, offset: 'normalize' } : { order: keys }),
            ...paint,
          } as never),
        ];

  const gradients =
    fill === 'gradient'
      ? keys.map((key) => ({
          id: gradientId(key),
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0,
          stops: [
            { offset: 0, color: colorOf(key), opacity: 0.02 },
            { offset: 1, color: colorOf(key), opacity: 0.38 },
          ],
        }))
      : undefined;

  const percent = (v: number) => `${Math.round(v * 100)}%`;
  const valueAxisSpec: false | ChartAxisSpec<number> =
    valueAxis === false ? false : layout === 'expand' ? { format: percent, ...valueAxis } : valueAxis;

  return defineChart(
    {
      marks: [...chartCursorMarks(cursor, 'x', true), ...areas, ...outlines],
      scales: {
        x: chartCategoryAxis(categoryAxis, scalePoint),
        y: chartValueAxis(valueAxisSpec, grid, layout === 'expand' ? [0, 1] : undefined),
      },
      color: { scale: colorScale },
      ...(gradients ? { gradients } : {}),
      focusRing: false,
      ...chartMotionOption(animation, { sweep: true }),
      margin,
      theme: createChartTheme(),
    } as never,
    {
      focus: 'group-x',
      ...chartTooltipOption(tooltip, (points, format) => ({
        title: String(points[0]?.xValue ?? ''),
        rows: uniqueSeries(points).map((p) => {
          const r = p.datum as AreaRow | undefined;
          return {
            label: seriesLabel(series, String(p.group ?? r?.series ?? '')),
            value: format(r ? r.value : Number(p.yValue ?? 0)),
            color: colorOf(r?.series ?? String(p.group ?? '')),
          };
        }),
      })),
    } as never,
  );
}
