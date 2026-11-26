// modules/design/atomic-aui/src/lib/chart/base/pie-chart.ts
//
// Framework-neutral PieChart definition builder over `@tanstack/charts/polar` (`pie` + `radialArc`).
// Data is one row per SLICE (`nameKey` + one numeric column per ring); every `series` is one ring,
// so one series = pie / donut and several = concentric ("stacked") rings. Slice colours cycle
// through the AtomicAUI series tokens (or `colors`); labels, the donut centre text and the active
// slice are plain spec fields. Tooltip, animation and legend items are the shared chart-base pieces.
import { defineChart } from '@tanstack/charts';
import { focusGroupAngle, pie, polar, radialArc, radialRule, radialText } from '@tanstack/charts/polar';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { chartSeriesColor } from './series-colors';
import { createChartTheme } from './theme';
import {
  chartMotionOption,
  chartTooltipOption,
  seriesLabel,
  type ChartAnimationSpec,
  type ChartSeriesSpec,
  type ChartTooltipSpec,
} from './common';

/** A label on each slice: its value (default) or name, inside the slice or outside with a leader line. */
export interface PieLabelSpec {
  /** `value` (default), `name`, or a function of the slice. */
  content?: 'value' | 'name' | ((slice: { name: string; value: number; fraction: number }) => string);
  /** `outside` (default) sits beyond the rim; `inside` sits within the slice. */
  position?: 'inside' | 'outside';
  /** A short line from the slice to an outside label (default false). */
  leader?: boolean;
  /** Font size in px (default 12). */
  fontSize?: number;
}

/** Text in the middle of a donut: a big value and an optional caption under it. */
export interface PieCenterSpec {
  value: string;
  label?: string;
}

export interface PieChartSpec<TRow extends Record<string, unknown>> {
  data: readonly TRow[];
  /** The row field holding the slice name. */
  nameKey: string;
  /** One series per ring (the first is innermost). */
  series: readonly ChartSeriesSpec[];
  /** Hole size as a fraction of the outer radius, 0 (pie) – 0.95 (default 0). */
  innerRadius?: number;
  /** Width of the gap/outline between slices in px (default 1; 0 = none). */
  separator?: number;
  /** Slice colours, in data order (default: the series token cycle). */
  colors?: readonly string[];
  /** The slice to push out and emphasise (by name). */
  activeKey?: string;
  /** How far the active slice grows, in px (default 10). */
  activeOffset?: number;
  /** Start / end angle in radians (default: a full turn starting at 3 o'clock, clockwise-reading like the reference). */
  startAngle?: number;
  endAngle?: number;
  labels?: readonly PieLabelSpec[];
  center?: PieCenterSpec;
  tooltip?: boolean | ChartTooltipSpec;
  animation?: boolean | ChartAnimationSpec;
}

interface Slice {
  name: string;
  value: number;
}

const TAU = Math.PI * 2;

/** Slice names + colours (also what a legend lists). */
export function pieSliceItems<TRow extends Record<string, unknown>>(spec: Pick<PieChartSpec<TRow>, 'data' | 'nameKey' | 'colors'>) {
  return spec.data.map((row, i) => ({
    key: String(row[spec.nameKey]),
    label: String(row[spec.nameKey]),
    color: spec.colors?.[i] ?? chartSeriesColor(i),
  }));
}

/** Build the chart definition for a pie / donut chart spec. */
export function buildPieChartDefinition<TRow extends Record<string, unknown>>(spec: PieChartSpec<TRow>) {
  const {
    data,
    nameKey,
    series,
    innerRadius = 0,
    separator = 1,
    activeKey,
    activeOffset = 10,
    startAngle = Math.PI / 2,
    endAngle = (-Math.PI * 3) / 2,
    labels = [],
    center,
    tooltip = true,
    animation,
  } = spec;
  const slices = pieSliceItems(spec);
  const names = slices.map((s) => s.key);
  const colorScale = scaleOrdinal<string, string>().domain(names).range(slices.map((s) => s.color));
  const rings = series.length || 1;
  const stroke = 'var(--aui-viz-separator)';
  const hole = Math.min(0.95, Math.max(0, innerRadius));
  const outsideLabels = labels.some((l) => (l.position ?? 'outside') === 'outside');

  // Ring `i` of `rings` occupies an equal share of the space between the hole and the rim.
  const ringRadii = (i: number) => ({
    innerRadius: ({ radius }: { radius: number }) => {
      const inner = radius * hole;
      return rings === 1 ? inner : inner + ((radius - inner) * i) / rings + (i > 0 ? 3 : 0);
    },
    outerRadius: ({ radius }: { radius: number }) => {
      const inner = radius * hole;
      return rings === 1 ? radius : inner + ((radius - inner) * (i + 1)) / rings - (i < rings - 1 ? 3 : 0);
    },
  });

  const ringArcs = series.map((s) => {
    const rows: Slice[] = data.map((row) => ({ name: String(row[nameKey]), value: Number(row[s.key]) || 0 }));
    return { series: s, arcs: pie(rows, { value: 'value', startAngle, endAngle }) };
  });

  const marks: unknown[] = [];
  ringArcs.forEach(({ series: s, arcs }, i) => {
    marks.push(
      radialArc(arcs, {
        id: `ring-${s.key}`,
        key: 'name',
        color: 'name',
        stroke,
        strokeWidth: separator,
        ...ringRadii(i),
      } as never),
    );
  });
  // The active slice is drawn again, pushed outward, on top of its ring.
  if (activeKey !== undefined) {
    ringArcs.forEach(({ series: s, arcs }, i) => {
      const r = ringRadii(i);
      marks.push(
        radialArc(
          arcs.filter((a) => a.name === activeKey),
          {
            id: `active-${s.key}`,
            key: 'name',
            color: 'name',
            stroke,
            strokeWidth: separator,
            innerRadius: r.innerRadius,
            outerRadius: (ctx: { radius: number }) => r.outerRadius(ctx) + activeOffset,
          } as never,
        ),
      );
    });
  }
  // Labels sit on the OUTERMOST ring.
  const outer = ringArcs[ringArcs.length - 1];
  if (outer) {
    const total = outer.arcs.reduce((sum, a) => sum + a.value, 0) || 1;
    labels.forEach((label, li) => {
      const position = label.position ?? 'outside';
      const content = label.content ?? 'value';
      const text = (a: { name: string; value: number }) =>
        typeof content === 'function'
          ? content({ name: a.name, value: a.value, fraction: a.value / total })
          : content === 'name'
            ? a.name
            : a.value.toLocaleString();
      if (position === 'outside' && label.leader) {
        marks.push(
          radialRule(outer.arcs, {
            id: `label-leader-${li}`,
            angle: 'angle',
            radius1: 1,
            radius2: 1,
            radius2Offset: 14,
            key: 'name',
            stroke: 'var(--aui-viz-grid, currentColor)',
          } as never),
        );
      }
      marks.push(
        radialText(outer.arcs, {
          id: `label-${li}`,
          angle: 'angle',
          radius: position === 'inside' ? (hole > 0 ? (1 + hole) / 2 : 0.68) : 1,
          ...(position === 'outside' ? { radiusOffset: 17, anchor: 'outside' } : { anchor: 'middle' }),
          text,
          key: 'name',
          fill: position === 'inside' ? 'var(--aui-viz-label-inside)' : 'var(--aui-viz-fg, currentColor)',
          fontSize: label.fontSize ?? 12,
        } as never),
      );
    });
  }
  if (center) {
    marks.push(
      radialText([{ id: 'center-value', angle: 0, radius: 0, text: center.value }], {
        id: 'center-value',
        angle: 'angle',
        radius: 'radius',
        key: 'id',
        text: 'text',
        dy: center.label ? -5 : 0,
        fill: 'var(--aui-viz-fg, currentColor)',
        fontSize: 30,
        fontWeight: 700,
      } as never),
    );
    if (center.label) {
      marks.push(
        radialText([{ id: 'center-label', angle: 0, radius: 0, text: center.label }], {
          id: 'center-label',
          angle: 'angle',
          radius: 'radius',
          key: 'id',
          text: 'text',
          dy: 19,
          fill: 'var(--aui-viz-muted, currentColor)',
          fontSize: 14,
        } as never),
      );
    }
  }

  const needsScales = labels.length > 0 || center !== undefined;

  return defineChart(
    {
      marks: [
        polar({
          radiusRatio: outsideLabels ? 0.7 : activeKey !== undefined ? 0.85 : 0.95,
          // The polar scales may only be configured when a text mark (labels / centre) uses them.
          scales: needsScales
            ? { angle: { scale: scaleLinear().domain([0, TAU]) }, radius: { scale: scaleLinear().domain([0, 1]) } }
            : { angle: null, radius: null },
          marks: marks as never,
        } as never),
      ],
      scales: { x: null, y: null },
      color: { scale: colorScale },
      ...chartMotionOption(animation),
      focusRing: false,
      margin: 0,
      theme: createChartTheme(),
    } as never,
    {
      focus: focusGroupAngle,
      ...chartTooltipOption(tooltip, (points, format) => ({
        title: series.length > 1 ? undefined : undefined,
        rows: points.map((p) => {
          const d = p.datum as (Slice & { fraction?: number }) | undefined;
          const ring = String(p.markId ?? '').replace(/^(ring|active)-/, '');
          const name = d?.name ?? String(p.group ?? '');
          return {
            label: series.length > 1 ? `${name} · ${seriesLabel(series, ring)}` : name,
            value: format(d?.value ?? 0),
            color: colorScale(name) as string,
          };
        }),
      })),
    } as never,
  );
}
