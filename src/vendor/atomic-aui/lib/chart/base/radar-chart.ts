// modules/design/atomic-aui/src/lib/chart/base/radar-chart.ts
//
// Framework-neutral RadarChart definition builder over `@tanstack/charts/polar` (`radialArea` + the
// radial / angle grid guides). Same wide rows as the cartesian kinds (one row per axis category,
// one numeric column per series); the grid shape, ring fill, dots, labels and radius axis are spec
// fields. Series colours, tooltip and animation are the shared chart-base pieces.
import { defineChart } from '@tanstack/charts';
import { angleGrid, focusGroupAngle, polar, radialArea, radialDot, radialGrid, radialText } from '@tanstack/charts/polar';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveLinearClosed } from 'd3-shape';
import { chartSeriesColor } from './series-colors';
import { createChartTheme } from './theme';
import {
  chartMotionOption,
  type ChartAnimationSpec,
  type ChartAxisSpec,
  type ChartSeriesSpec,
  type ChartTooltipSpec,
} from './common';

/** The web behind the data. `false` draws no grid at all (labels still show with the category axis). */
/** Default width of a radar series outline in px (was 2; halved). The grid rings / spokes keep their own 1px. */
export const RADAR_DEFAULT_STROKE_WIDTH = 1;

export interface RadarGridSpec {
  /** Ring shape: `polygon` (default) or `circle`. */
  shape?: 'polygon' | 'circle';
  /** Number of rings (default 4). */
  rings?: number;
  /** Explicit ring values (replaces `rings`) — e.g. one outer ring. */
  values?: readonly number[];
  /** Draw the ring outlines (default true). */
  lines?: boolean;
  /** Draw the spokes from the centre to each category (default true). */
  spokes?: boolean;
  /** Tint the rings with the first series colour (default false). */
  fill?: boolean;
}

/** A label beyond each category: its category name, its value(s), or custom text. Compose several
 *  (they stack outward → inward in the order given). */
export interface RadarLabelSpec {
  /** `category` (default), `value` (the first series), `values` (`a/b/c` of all series), or a function. */
  content?: 'category' | 'value' | 'values' | ((row: Record<string, unknown>) => string);
  fontSize?: number;
}

export interface RadarChartSpec<TRow extends Record<string, unknown>> {
  data: readonly TRow[];
  /** The row field holding the axis category. */
  categoryKey: string;
  series: readonly ChartSeriesSpec[];
  grid?: false | RadarGridSpec;
  /** Category labels around the web (angle axis). `false` hides them. */
  categoryAxis?: false | ChartAxisSpec<string>;
  /** Ring value labels (radius axis); `domain` fixes the radius range. `false` hides them. */
  valueAxis?: false | ChartAxisSpec<number>;
  /** `solid` (default: translucent) or `none` (outline only). */
  fill?: 'solid' | 'none';
  /** Area opacity for `solid` (default 0.25). */
  fillOpacity?: number;
  /** Series outline width in px (default `RADAR_DEFAULT_STROKE_WIDTH` = 1). */
  strokeWidth?: number;
  /** A dot at every vertex (default false). */
  dots?: boolean;
  labels?: readonly RadarLabelSpec[];
  /** The tooltip card is owned by the radar interaction layer (`attachRadarInteraction` / the React `.Tooltip` part), not the library; kept here so the spec shape is unchanged. */
  tooltip?: boolean | ChartTooltipSpec;
  animation?: boolean | ChartAnimationSpec;
}

interface RadarRow {
  category: string;
  series: string;
  value: number;
}

/** A readable ring step: 1, 2, 2.5, 5 × 10ⁿ. */
function niceMax(max: number, rings: number): number {
  const raw = max / rings;
  if (!(raw > 0)) return rings;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const f = raw / pow;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * pow;
  return step * rings;
}

/** Build the chart definition for a radar chart spec. */
export function buildRadarChartDefinition<TRow extends Record<string, unknown>>(spec: RadarChartSpec<TRow>) {
  const {
    data,
    categoryKey,
    series,
    grid = {},
    categoryAxis = {},
    valueAxis = false,
    fill = 'solid',
    fillOpacity = 0.25,
    strokeWidth = RADAR_DEFAULT_STROKE_WIDTH,
    dots = false,
    labels = [],
    animation,
  } = spec;
  const keys = series.map((s) => s.key);
  const colorOf = (key: string) => series[keys.indexOf(key)]?.color ?? chartSeriesColor(keys.indexOf(key));
  const colorScale = scaleOrdinal<string, string>().domain(keys).range(keys.map(colorOf));
  const categories = data.map((row) => String(row[categoryKey]));
  const g: RadarGridSpec | null = grid === false ? null : grid;
  const rings = g?.rings ?? 4;
  const dataMax = Math.max(0, ...data.flatMap((row) => keys.map((k) => Number(row[k]) || 0)));
  const fixed = valueAxis !== false ? valueAxis.domain : undefined;
  const radiusMax = fixed ? fixed[1] : niceMax(dataMax, rings);
  const radiusMin = fixed ? fixed[0] : 0;
  const ringValues = g?.values ?? Array.from({ length: rings }, (_, i) => Math.round(radiusMin + ((radiusMax - radiusMin) * (i + 1)) / rings));
  const customLabels = labels.length > 0;
  const border = 'var(--aui-viz-grid, currentColor)';
  const showLabels = categoryAxis !== false && !customLabels;

  const guides: unknown[] = [];
  if (g) {
    guides.push(
      radialGrid({
        values: ringValues,
        shape: g.shape ?? 'polygon',
        stroke: g.lines === false ? 'transparent' : border,
        strokeOpacity: g.lines === false ? 0 : 1,
        ...(g.fill ? { fill: colorOf(keys[0] ?? ''), fillOpacity: 0.2 } : {}),
        ...(valueAxis !== false
          ? {
              labels: true,
              labelAngle: Math.PI / 6,
              labelFill: 'var(--aui-viz-fg, currentColor)',
              labelFontSize: 12,
              labelRotate: 30,
              labelOffset: 1,
              ...(valueAxis.format ? { format: (v: unknown) => (valueAxis.format as (n: number) => string)(Number(v)) } : {}),
            }
          : {}),
      } as never),
    );
  }
  guides.push(
    angleGrid({
      values: categories,
      labels: showLabels,
      labelOffset: 10,
      labelFill: 'var(--aui-viz-muted, currentColor)',
      labelFontSize: 12,
      ...(categoryAxis !== false && categoryAxis.format ? { format: (v: unknown) => (categoryAxis.format as (s: string) => string)(String(v)) } : {}),
      stroke: g && g.spokes !== false ? border : 'transparent',
      strokeOpacity: g && g.spokes !== false ? 1 : 0,
    } as never),
  );

  const rowsFor = (key: string): RadarRow[] =>
    data.map((row) => ({ category: String(row[categoryKey]), series: key, value: Number(row[key]) || 0 }));

  const marks: unknown[] = [];
  for (const key of keys) {
    marks.push(
      radialArea(rowsFor(key), {
        id: `radar-${key}`,
        angle: 'category',
        radius: 'value',
        key: 'category',
        z: () => key,
        curve: curveLinearClosed,
        fill: colorOf(key),
        fillOpacity: fill === 'none' ? 0 : fillOpacity,
        stroke: colorOf(key),
        strokeOpacity: 1,
        strokeWidth,
      } as never),
    );
    if (dots) {
      marks.push(
        radialDot(rowsFor(key), {
          id: `dots-${key}`,
          angle: 'category',
          radius: 'value',
          key: 'category',
          z: () => key,
          r: 4,
          fill: colorOf(key),
        } as never),
      );
    }
  }
  labels.forEach((label, i) => {
    const content = label.content ?? 'category';
    const text = (row: Record<string, unknown>) =>
      typeof content === 'function'
        ? content(row)
        : content === 'category'
          ? String(row[categoryKey])
          : content === 'value'
            ? String(Number(row[keys[0]] ?? 0).toLocaleString())
            : keys.map((k) => Number(row[k] ?? 0).toLocaleString()).join('/');
    // Stack outward → inward, first label outermost.
    const dy = (i - (labels.length - 1) / 2) * 17;
    marks.push(
      radialText(
        data.map((row) => ({ ...row, __category: String(row[categoryKey]) })),
        {
          id: `radar-label-${i}`,
          angle: '__category',
          radius: () => radiusMax,
          key: '__category',
          z: () => keys[0],
          text,
          anchor: 'outside',
          radiusOffset: 15,
          dy,
          fill: content === 'category' ? 'var(--aui-viz-muted, currentColor)' : 'var(--aui-viz-fg, currentColor)',
          fontSize: label.fontSize ?? 12,
        } as never,
      ),
    );
  });

  return defineChart(
    ({ width, height }: { width: number; height: number }) =>
      ({
        marks: [
          polar({
            // Leave room for the outside labels at every chart size.
            radiusRatio: customLabels ? Math.min(0.76, Math.max(0.1, 1 - (40 + labels.length * 17) / Math.min(width, height))) : 0.76,
            scales: {
              angle: { scale: scalePoint<string>().domain(categories), wrap: true },
              radius: { scale: scaleLinear().domain([radiusMin, radiusMax]) },
            },
            guides: guides as never,
            marks: marks as never,
          } as never),
        ],
        scales: { x: null, y: null },
        color: { scale: colorScale },
        ...chartMotionOption(animation),
        focusRing: false,
        margin: 0,
        theme: createChartTheme(),
      }) as never,
    {
      focus: focusGroupAngle,
    } as never,
  );
}
