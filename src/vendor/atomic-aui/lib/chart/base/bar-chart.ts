// modules/design/atomic-aui/src/lib/chart/base/bar-chart.ts
//
// Framework-neutral BarChart definition builder over `@tanstack/charts`. It takes a plain spec
// (what the React parts — or any other framework's parts — collect) and returns a chart definition
// every TanStack adapter can render. NO React, NO DOM: this is the `charts-base` contract.
//
// Data is WIDE rows (`{ month: 'Jan', desktop: 186, mobile: 80 }`), one column per series, which is
// how apps usually hold it; the builder reshapes to the library's long rows internally.
//
// Orientation-neutral vocabulary: the CATEGORY axis holds the bands (months), the VALUE axis the
// numbers. `vertical` bars put category on x / value on y; `horizontal` swaps them. Everything else
// (series, labels, tooltip, highlight, negative values) is expressed in those terms.
import { barX, barY, defineChart, group, ruleX, ruleY, stack, text } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { chartSeriesColor } from './series-colors';
import { createChartTheme } from './theme';
import {
  chartCategoryAxis,
  chartCursorMarks,
  chartValueAxis,
  chartMotionOption,
  chartTooltipOption,
  seriesLabel,
  type BarStyle,
  type ChartAnimationSpec,
  type ChartAxisSpec,
  type ChartCursorSpec,
  type ChartSeriesSpec,
  type ChartTooltipSpec,
} from './common';

/** Where a label sits on its bar. Orientation-neutral: "end" is the bar's far end from the baseline. */
export type ChartLabelPosition = 'outside-end' | 'inside-end' | 'center' | 'inside-start';

/** A value/category label drawn at each bar (`BarChart.Label`). */
export interface ChartLabelSpec {
  /** Which series to label (default: the first). */
  dataKey?: string;
  /** `value` (default) prints the number; `category` prints the category name. */
  text?: 'value' | 'category';
  /** Format the printed value (default: locale string). Ignored for `text: 'category'`. */
  format?: (value: number, row: Record<string, unknown>) => string;
  /** Default `outside-end`. `center` works in both orientations (and per stacked segment). */
  position?: ChartLabelPosition;
  /** Distance in px from the anchor point (default 8). */
  offset?: number;
  /** Text colour (default: the foreground token; the surface token when drawn inside a bar). */
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}

export interface BarChartSpec<TRow extends Record<string, unknown>> {
  data: readonly TRow[];
  /** The row field holding the category. */
  categoryKey: string;
  series: readonly ChartSeriesSpec[];
  /** `vertical` (default): categories on x. `horizontal`: categories on y. */
  orientation?: 'vertical' | 'horizontal';
  /** `group` = side by side (default); `stack` = stacked. */
  layout?: 'group' | 'stack';
  /** Bar end-corner radius in px. */
  radius?: number;
  /** Grid lines along the value axis (default true). */
  grid?: boolean;
  /** `false` hides the axis. */
  categoryAxis?: false | ChartAxisSpec<string>;
  valueAxis?: false | ChartAxisSpec<number>;
  /** Tooltip on hover/focus (default true). `false` disables it. */
  tooltip?: boolean | ChartTooltipSpec;
  /** Value/category labels at the bars. Needs one plotted series per label (see `labels`). */
  labels?: readonly ChartLabelSpec[];
  /** Hover/focus emphasis: `bar` outlines the focused bar; `dim` fades the other categories. */
  highlight?: 'bar' | 'dim';
  /** Hover/focus background behind the focused category; `false`/omitted = none. */
  cursor?: boolean | ChartCursorSpec;
  /** Enter/update animation (default on). */
  animation?: boolean | ChartAnimationSpec;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

interface LongRow {
  category: string;
  series: string;
  value: number;
  row: Record<string, unknown>;
  index: number;
}

/** Reshape wide rows to long rows, skipping non-finite cells. */
export function toLongRows<TRow extends Record<string, unknown>>(
  data: readonly TRow[],
  categoryKey: string,
  series: readonly ChartSeriesSpec[],
): LongRow[] {
  const rows: LongRow[] = [];
  data.forEach((row, index) => {
    for (const s of series) {
      const value = Number(row[s.key]);
      if (Number.isFinite(value)) rows.push({ category: String(row[categoryKey]), series: s.key, value, row, index });
    }
  });
  return rows;
}

/** Defaults sized to what is drawn (axis text, outside labels) — a caller `margin` always wins. */
function defaultMargin(spec: BarChartSpec<Record<string, unknown>>) {
  const horizontal = spec.orientation === 'horizontal';
  const hasEndLabel = (spec.labels ?? []).some((l) => (l.position ?? 'outside-end') === 'outside-end');
  // The builder treats an omitted axis as shown ({}); only `false` hides it. The value axis reserves room
  // for its tick labels (left for vertical bars, below for horizontal) so they are never clipped.
  const catAxis = spec.categoryAxis !== false;
  const valAxis = spec.valueAxis !== false;
  if (horizontal) {
    return { top: 5, right: hasEndLabel ? 40 : 5, bottom: valAxis ? 28 : 5, left: catAxis ? 72 : 0 };
  }
  return { top: hasEndLabel ? 24 : 5, right: 5, bottom: catAxis ? 35 : 5, left: valAxis ? 40 : 5 };
}

/** Build the chart definition for a bar chart spec. */
export function buildBarChartDefinition<TRow extends Record<string, unknown>>(spec: BarChartSpec<TRow>) {
  const {
    data,
    categoryKey,
    series,
    orientation = 'vertical',
    layout = 'group',
    radius = 4,
    grid = true,
    categoryAxis = {},
    valueAxis = {},
    tooltip = true,
    labels = [],
    highlight,
    cursor = false,
    animation,
  } = spec;
  const horizontal = orientation === 'horizontal';
  const margin = { ...defaultMargin(spec as BarChartSpec<Record<string, unknown>>), ...spec.margin };

  const rows = toLongRows(data, categoryKey, series);
  const keys = series.map((s) => s.key);
  const baseColor = (key: string) => {
    const i = keys.indexOf(key);
    return series[i]?.color ?? chartSeriesColor(i);
  };
  const colorScale = scaleOrdinal<string, string>().domain(keys).range(keys.map(baseColor));

  // Paint accessors exist only when a series asks for per-bar paint — otherwise the `color` channel
  // (series → cycle colour, shared with the legend) paints the bars on its own.
  const styled = series.some((s) => s.barStyle || s.negativeColor);
  const barPaint = (r: LongRow): BarStyle => {
    const spec_ = series.find((s) => s.key === r.series);
    const own = spec_?.barStyle?.(r.row, r.index) ?? {};
    const fill = own.fill ?? (r.value < 0 && spec_?.negativeColor ? spec_.negativeColor : baseColor(r.series));
    return { fill, stroke: own.stroke ?? 'none', strokeDasharray: own.strokeDasharray ?? 'none' };
  };

  const highlightStates =
    highlight === 'bar'
      ? [{ when: { focus: 'primary' as const }, style: { stroke: 'var(--aui-viz-fg, currentColor)', strokeWidth: 2 } }]
      : highlight === 'dim'
        ? [{ when: { focus: 'unmatched' as const }, style: { opacity: 0.45 } }]
        : undefined;

  const barOptions = {
    id: 'bars',
    z: 'series',
    color: 'series',
    key: (row: LongRow) => `${row.category}:${row.series}`,
    layout: layout === 'stack' ? stack() : group({ padding: 0.08 }),
    radius: layout === 'stack' ? { end: radius } : radius,
    ...(styled ? { fill: (r: LongRow) => barPaint(r).fill, stroke: (r: LongRow) => barPaint(r).stroke, strokeDasharray: (r: LongRow) => barPaint(r).strokeDasharray, strokeWidth: 2 } : {}),
    ...(highlightStates ? { states: highlightStates } : {}),
  };
  const bars = horizontal
    ? barX(rows, { ...barOptions, x: 'value', y: 'category' } as never)
    : barY(rows, { ...barOptions, x: 'category', y: 'value' } as never);

  // Labels sit on one series' bars. Positions are computed in DATA space: a bar spans [start, end]
  // (stacked: after the series before it; grouped: from the baseline), so `center` is its midpoint in
  // either orientation. Grouped multi-series bars share a band slot the text mark cannot subdivide,
  // so label one series there (or stack).
  const stackBase = (r: LongRow): number => {
    if (layout !== 'stack') return 0;
    let acc = 0;
    for (const k of keys) {
      if (k === r.series) break;
      const v = Number(r.row[k]);
      if (Number.isFinite(v) && Math.sign(v) === Math.sign(r.value)) acc += v;
    }
    return acc;
  };
  const labelMarks = labels.map((l, i) => {
    const key = l.dataKey ?? keys[0];
    const labelRows = rows.filter((r) => r.series === key);
    const position = l.position ?? 'outside-end';
    const gap = l.offset ?? 8;
    const inside = position !== 'outside-end';
    const textOf = (r: LongRow) =>
      l.text === 'category' ? r.category : l.format ? l.format(r.value, r.row) : r.value.toLocaleString();
    const fill = l.color ?? (inside ? 'var(--aui-viz-label-inside)' : 'var(--aui-viz-fg, currentColor)');
    const fontSize = l.fontSize ?? 12;
    const common = { id: `labels-${i}`, text: textOf, fill, fontSize, ...(l.fontWeight ? { fontWeight: l.fontWeight } : {}) };
    const startOf = (r: LongRow) => stackBase(r);
    const endOf = (r: LongRow) => stackBase(r) + r.value;
    const along = (r: LongRow) =>
      position === 'center' ? (startOf(r) + endOf(r)) / 2 : position === 'inside-start' ? startOf(r) : endOf(r);
    // +1 when the bar grows toward the positive side, -1 toward the negative one.
    const dir = (r: LongRow) => (r.value < 0 ? -1 : 1);
    // Offset along the value axis in DATA direction (positive = toward larger values).
    const shift = (r: LongRow) => (position === 'center' ? 0 : (position === 'inside-end' ? -1 : 1) * dir(r) * gap);
    if (horizontal) {
      return text(labelRows, {
        ...common,
        x: along,
        y: 'category',
        anchor: (r: LongRow) => (position === 'center' ? 'middle' : shift(r) >= 0 ? 'start' : 'end'),
        dx: shift,
        dy: Math.round(fontSize / 3),
      } as never);
    }
    return text(labelRows, {
      ...common,
      x: 'category',
      y: along,
      // screen y grows downward, so a positive value shift is a negative dy
      dy: (r: LongRow) => (position === 'center' ? Math.round(fontSize / 3) : -shift(r) + (shift(r) < 0 ? Math.round(fontSize * 0.8) : 0)),
    } as never);
  });

  // A zero baseline reads as the divider when values go negative.
  const hasNegative = rows.some((r) => r.value < 0);
  const baseline = hasNegative
    ? [
        horizontal
          ? ruleX([0], { stroke: 'var(--aui-viz-grid, currentColor)' } as never)
          : ruleY([0], { stroke: 'var(--aui-viz-grid, currentColor)' } as never),
      ]
    : [];

  const catScale = () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1);
  const bandAxis = chartCategoryAxis(categoryAxis, catScale);
  const linearAxis = chartValueAxis(valueAxis, grid);

  const cursorMark = chartCursorMarks(cursor, horizontal ? 'y' : 'x');

  return defineChart(
    {
      marks: [...cursorMark, ...baseline, bars, ...labelMarks],
      scales: horizontal ? { x: linearAxis, y: bandAxis } : { x: bandAxis, y: linearAxis },
      color: { scale: colorScale },
      // The built-in dot at the focused point is dropped: the tooltip swatch + the optional cursor band
      // already say what is focused.
      focusRing: false,
      ...chartMotionOption(animation, { stagger: 0 }),
      margin,
      theme: createChartTheme(),
    } as never,
    {
      focus: horizontal ? 'group-y' : 'group-x',
      ...chartTooltipOption(tooltip, (points, format) => {
        const first = points[0];
        return {
          title: String(horizontal ? first?.yValue ?? '' : first?.xValue ?? ''),
          rows: points.map((p) => {
            const long = p.datum as LongRow | undefined;
            return {
              label: seriesLabel(series, String(p.group ?? long?.series ?? '')),
              value: format(Number(horizontal ? p.xValue : p.yValue ?? 0)),
              color: long && styled ? barPaint(long).fill : p.color,
            };
          }),
        };
      }),
    } as never,
  );
}
