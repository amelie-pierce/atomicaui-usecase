// modules/design/atomic-aui/src/lib/chart/base/line-chart.ts
//
// Framework-neutral LineChart definition builder over `@tanstack/charts` (`lineY` + `dot` + `text`). Same
// wide-row spec and shared pieces as the Bar / Area builders (series colours, axes, tooltip, hover
// rule, motion, curves); only the mark, the optional dots and the value labels are line-specific.
import { d3Curve, defineChart, dot, lineY, ruleY, text } from '@tanstack/charts';
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

/** Default series outline width in px. */
export const LINE_DEFAULT_STROKE_WIDTH = 2;

/** A marker at every point. `solid` (default) is filled with the series colour, `hollow` is a ring on the
 *  surface, `stem` is a ring on a vertical stem (the shadcn "custom dots"). `colorBy: 'category'` colours
 *  each dot from the series cycle by its category (or `colors`), for a single-series chart. */
export interface LineDotsSpec {
  variant?: 'solid' | 'hollow' | 'stem';
  /** Dot radius in px (default 4; hollow/stem 5). */
  radius?: number;
  colorBy?: 'series' | 'category';
  /** Per-category colours (with `colorBy: 'category'`); default is the series colour cycle. */
  colors?: readonly string[];
}

/** A value (or category) label on a series' points. */
export interface LineLabelSpec {
  /** Which series to label (default: the first). */
  dataKey?: string;
  /** `value` (default) prints the number; `category` prints the category name. */
  text?: 'value' | 'category';
  format?: (value: number, row: Record<string, unknown>) => string;
  /** `above` (default) or `below` the point. */
  position?: 'above' | 'below';
  /** Distance from the point in px (default 12). */
  offset?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}

/** `axis` (default): hover a category and see every series there (shared cursor). `series`: hover a point and see that one. */
export type LineTooltipMode = 'axis' | 'series';

export interface LineChartSpec<TRow extends Record<string, unknown>> {
  data: readonly TRow[];
  /** The row field holding the x category (month, date…). */
  categoryKey: string;
  series: readonly ChartSeriesSpec[];
  curve?: ChartCurve;
  /** Series outline width in px (default `LINE_DEFAULT_STROKE_WIDTH`). */
  strokeWidth?: number;
  /** Markers at every point (`true` = solid defaults). */
  dots?: boolean | LineDotsSpec;
  labels?: readonly LineLabelSpec[];
  /** Grid lines along the value axis (default true). */
  grid?: boolean;
  categoryAxis?: false | ChartAxisSpec<string>;
  valueAxis?: false | ChartAxisSpec<number>;
  tooltip?: boolean | ChartTooltipSpec;
  tooltipMode?: LineTooltipMode;
  /** Hover/focus vertical rule at the focused x. */
  cursor?: boolean | ChartCursorSpec;
  animation?: boolean | ChartAnimationSpec;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

interface LineRow {
  category: string;
  series: string;
  value: number;
  row: Record<string, unknown>;
  index: number;
}

function toLineRows(data: readonly Record<string, unknown>[], categoryKey: string, series: readonly ChartSeriesSpec[]) {
  const rows: LineRow[] = [];
  data.forEach((row, index) => {
    for (const s of series) {
      const value = Number(row[s.key]);
      if (Number.isFinite(value)) rows.push({ category: String(row[categoryKey]), series: s.key, value, row, index });
    }
  });
  return rows;
}

/** Build the chart definition for a line chart spec. */
export function buildLineChartDefinition<TRow extends Record<string, unknown>>(spec: LineChartSpec<TRow>) {
  const {
    data,
    categoryKey,
    series,
    curve = 'natural',
    strokeWidth = LINE_DEFAULT_STROKE_WIDTH,
    dots = false,
    labels = [],
    grid = true,
    categoryAxis = {},
    valueAxis = {},
    tooltip = true,
    tooltipMode = 'axis',
    cursor = false,
    animation,
  } = spec;
  const keys = series.map((s) => s.key);
  const colorOf = (key: string) => series[keys.indexOf(key)]?.color ?? chartSeriesColor(keys.indexOf(key));
  const colorScale = scaleOrdinal<string, string>().domain(keys).range(keys.map(colorOf));
  const rows = toLineRows(data, categoryKey, series);

  const hasValueAxis = valueAxis !== false;
  const hasCategoryAxis = categoryAxis !== false;
  const margin = {
    top: labels.length ? 24 : 8,
    right: 12,
    bottom: hasCategoryAxis ? 35 : 5,
    left: hasValueAxis ? 40 : 12,
    ...spec.margin,
  };

  const lines = lineY(rows, {
    id: 'lines',
    x: 'category',
    y: 'value',
    z: 'series',
    color: 'series',
    key: (r: LineRow) => `${r.category}:${r.series}`,
    curve: d3Curve(CHART_CURVES[curve]),
    stroke: (r: LineRow) => colorOf(r.series),
    strokeWidth,
  } as never);

  const d: LineDotsSpec | null = dots === false ? null : dots === true ? {} : dots;
  const categories = data.map((row) => String(row[categoryKey]));
  const dotMarks: unknown[] = [];
  if (d) {
    const variant = d.variant ?? 'solid';
    const radius = d.radius ?? (variant === 'solid' ? 4 : 5);
    const colorOfDot = (r: LineRow) =>
      d.colorBy === 'category' ? (d.colors?.[r.index] ?? chartSeriesColor(categories.indexOf(r.category))) : colorOf(r.series);
    // The library's dot/text paint is a plain string (no per-point accessor), so one mark per colour group.
    const groups = new Map<string, LineRow[]>();
    for (const r of rows) {
      const c = colorOfDot(r);
      const g = groups.get(c);
      if (g) g.push(r);
      else groups.set(c, [r]);
    }
    let gi = 0;
    for (const [color, group] of groups) {
      if (variant === 'stem') {
        dotMarks.push(
          text(group, { id: `dot-stems-${gi}`, x: 'category', y: 'value', text: () => '│', fill: color, fontSize: 24 } as never),
        );
      }
      dotMarks.push(
        dot(group, {
          id: `dots-${gi}`,
          x: 'category',
          y: 'value',
          r: radius,
          fill: variant === 'solid' ? color : 'var(--theme-surface, white)',
          stroke: color,
          strokeWidth: variant === 'solid' ? 1 : 2,
        } as never),
      );
      gi += 1;
    }
  }

  const labelMarks = labels.map((l, i) => {
    const key = l.dataKey ?? keys[0];
    const fontSize = l.fontSize ?? 12;
    const offset = l.offset ?? 12;
    return text(
      rows.filter((r) => r.series === key),
      {
        id: `labels-${i}`,
        x: 'category',
        y: 'value',
        text: (r: LineRow) => (l.text === 'category' ? r.category : l.format ? l.format(r.value, r.row) : r.value.toLocaleString()),
        dy: l.position === 'below' ? offset + Math.round(fontSize * 0.7) : -offset,
        fill: l.color ?? 'var(--aui-viz-fg, currentColor)',
        fontSize,
        ...(l.fontWeight ? { fontWeight: l.fontWeight } : {}),
      } as never,
    );
  });

  // A zero baseline reads as the divider when values go negative.
  const baseline = rows.some((r) => r.value < 0) ? [ruleY([0], { stroke: 'var(--aui-viz-grid, currentColor)' } as never)] : [];

  return defineChart(
    {
      marks: [...chartCursorMarks(cursor, 'x', true), ...baseline, lines, ...dotMarks, ...labelMarks],
      scales: {
        x: chartCategoryAxis(categoryAxis, scalePoint),
        y: chartValueAxis(valueAxis, grid),
      },
      color: { scale: colorScale },
      focusRing: false,
      ...chartMotionOption(animation, { sweep: true }),
      margin,
      theme: createChartTheme(),
    } as never,
    {
      focus: tooltipMode === 'series' ? 'nearest' : 'group-x',
      ...chartTooltipOption(tooltip, (points, format) => ({
        title: String(points[0]?.xValue ?? ''),
        rows: points.map((p) => {
          const r = p.datum as LineRow | undefined;
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
