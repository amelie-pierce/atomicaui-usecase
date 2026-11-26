// modules/design/atomic-aui/src/lib/chart/base/common.ts
//
// Pieces EVERY chart kind shares (bar, area, pie, radar): the series / axis / tooltip / cursor /
// animation specs and the builders behind them (tooltip feature, hover band, motion, legend items,
// token-backed value axis). Framework-neutral — no React, no DOM.
import type { ChartPoint } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { crosshair } from '@tanstack/charts/crosshair';
import { stagger } from '@tanstack/charts/motion/definition';
import { tooltip as tooltipFeature } from '@tanstack/charts/tooltip';
import { chartSeriesColor } from './series-colors';

/** Per-bar paint override (the colour accessor result). Any CSS colour / `var()`. */
export interface BarStyle {
  fill?: string;
  stroke?: string;
  strokeDasharray?: string;
}

/** One data series: a column of the wide rows. */
export interface ChartSeriesSpec {
  /** The row field holding this series' numeric value. */
  key: string;
  /** Display name (legend + tooltip). Defaults to the key. */
  label?: string;
  /** Override the cycle colour for this series (any CSS colour / `var()`). */
  color?: string;
  /** Fill for bars whose value is below zero (diverging fill). */
  negativeColor?: string;
  /** Per-bar paint accessor: receives the wide row and its index; a returned field wins over the
   *  series colour. Covers per-bar colours ("mixed") and a highlighted bar ("active"). */
  barStyle?: (row: Record<string, unknown>, index: number) => BarStyle | undefined;
}

export interface ChartAxisSpec<TValue> {
  label?: string;
  format?: (value: TValue) => string;
  /** Explicit tick values (thin out a dense category axis). */
  ticks?: readonly TValue[];
  /** Fixed value-axis domain (default: from the data, niced). Ignored on category axes. */
  domain?: readonly [number, number];
}

/** One tooltip row (plain data — any framework's parts can produce it). */
export interface ChartTooltipRow {
  label: string;
  value: string;
  /** Swatch colour. */
  color?: string;
  /** A muted secondary value (e.g. a delta vs the leader), shown after the value. */
  secondary?: string;
}

/** Tooltip content as DATA, not markup (the TanStack reference does the same). */
export interface ChartTooltipContent {
  title?: string;
  rows: ChartTooltipRow[];
}

export interface ChartTooltipSpec {
  /** Format a value shown in the default rows (default: locale string). */
  formatValue?: (value: number) => string;
  /** Replace the default content: receives it, returns what to show. */
  content?: (content: ChartTooltipContent) => ChartTooltipContent;
  /** Extra class on the tooltip element (restyle without touching the base styles). */
  className?: string;
}

/** The hover/focus background behind the focused category (`BarChart.Cursor`). */
export interface ChartCursorSpec {
  /** Any CSS colour / `var()`. Default: the `--aui-viz-cursor` token (a tonal wash). */
  fill?: string;
  /** 0–1 (default 1; the default fill is already translucent). */
  opacity?: number;
  /** Corner radius in px (default 4). */
  radius?: number;
  /** Inset from the category band edges in px; negative grows it (default 0). */
  inset?: number;
}

/** Enter/update animation. `false` turns it off. Respects `prefers-reduced-motion`. */
export interface ChartAnimationSpec {
  /** Milliseconds (default 450). */
  duration?: number;
  /** Default `ease-out`. */
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  /** Delay between successive bars on enter, in ms (default 25; 0 = all together). */
  stagger?: number;
}

export const CHART_ANIMATION_DEFAULTS = { duration: 450, easing: 'ease-out', stagger: 25 } as const;

/** Resolve the animation prop to concrete values (`null` = off). */
export function resolveChartAnimation(
  input: boolean | ChartAnimationSpec | undefined,
  defaults: Partial<ChartAnimationSpec> = {},
): Required<ChartAnimationSpec> | null {
  if (input === false) return null;
  return { ...CHART_ANIMATION_DEFAULTS, ...defaults, ...(typeof input === 'object' ? input : {}) } as Required<ChartAnimationSpec>;
}


export function seriesLabel(series: readonly ChartSeriesSpec[], key: string): string {
  return series.find((s) => s.key === key)?.label ?? key;
}

/** Legend entries for the plotted series (what any framework's legend renders): label + swatch colour. */
export function chartLegendItems(series: readonly ChartSeriesSpec[]): { key: string; label: string; color: string }[] {
  return series.map((s, i) => ({ key: s.key, label: s.label ?? s.key, color: s.color ?? chartSeriesColor(i) }));
}

/** Toggle one key in a hidden-keys list (framework-neutral clickable-legend state). At least one key
 *  always stays visible: hiding the last visible key is a no-op (documented rule, so a chart is never empty). */
export function toggleHiddenKey(hidden: readonly string[], key: string, allKeys: readonly string[]): string[] {
  if (hidden.includes(key)) return hidden.filter((k) => k !== key);
  const visible = allKeys.filter((k) => !hidden.includes(k));
  if (visible.length <= 1 && visible.includes(key)) return [...hidden];
  return [...hidden, key];
}

/** Tiny neutral store for the clickable legend: `hidden()`, `toggle(key)`, `subscribe(fn)`. No React, no DOM. */
export function createLegendVisibility(allKeys: readonly string[], initialHidden: readonly string[] = []) {
  let hidden: string[] = [...initialHidden];
  const listeners = new Set<(hidden: readonly string[]) => void>();
  return {
    hidden: (): readonly string[] => hidden,
    toggle(key: string) {
      hidden = toggleHiddenKey(hidden, key, allKeys);
      listeners.forEach((fn) => fn(hidden));
    },
    subscribe(fn: (hidden: readonly string[]) => void) {
      listeners.add(fn);
      return () => void listeners.delete(fn);
    },
  };
}

/** Hover/focus background mark(s) for a cartesian chart (`[]` when off). `axis` is the axis whose
 *  categories are banded: `x` for vertical bars / x-banded charts, `y` for horizontal ones. */
export function chartCursorMarks(cursor: boolean | ChartCursorSpec | undefined, axis: 'x' | 'y', rule = false) {
  if (cursor === false || cursor === undefined) return [];
  const c: ChartCursorSpec = typeof cursor === 'object' ? cursor : {};
  const fill = c.fill ?? 'var(--aui-viz-cursor, color-mix(in srgb, currentColor 10%, transparent))';
  if (rule) {
    // Point-scale charts (area/line) have no bands: a vertical rule at the focused x instead.
    const line = c.fill ?? 'var(--aui-viz-cursor-line, currentColor)';
    return [crosshair({ x: axis === 'x' ? { stroke: line, strokeOpacity: c.opacity } : false, y: axis === 'y' ? { stroke: line } : false, stroke: line } as never)];
  }
  const band = { fill, opacity: c.opacity, radius: c.radius ?? 4, inset: c.inset ?? 0 };
  return [crosshair(axis === 'y' ? ({ x: false, y: { band }, stroke: 'none' } as never) : ({ x: { band }, y: false, stroke: 'none' } as never))];
}

/** The definition-level motion for the renderer (`{}` when animation is off, or stagger is 0).
 *  Per-kind defaults: `stagger` (bars use 0: every bar grows from its baseline together, not one after
 *  another left to right). `sweep` (area / line): the enter animation of line, area and dot marks is turned
 *  OFF in the library (it would scale them up from the baseline) because the frame plays a left-to-right
 *  reveal instead (`data-aui-reveal="sweep"`, see `_state-cascade.scss`). Updates still tween. */
export function chartMotionOption(
  animation: boolean | ChartAnimationSpec | undefined,
  options: { stagger?: number; sweep?: boolean } = {},
) {
  const a = resolveChartAnimation(animation, options.stagger === undefined ? {} : { stagger: options.stagger });
  if (!a) return {};
  const timing = a.stagger > 0 ? stagger({ each: a.stagger, by: 'datum' }) : {};
  if (options.sweep) {
    const reveal = new Set(['line', 'area', 'dot']);
    return { motion: (ctx: { phase: string; role: string }) => (ctx.phase === 'enter' && reveal.has(ctx.role) ? false : timing) } as never;
  }
  return a.stagger > 0 ? { motion: timing } : {};
}

/** The tooltip feature options, or `{}` when off. `rowsOf` turns the focused points into tooltip data. */
export function chartTooltipOption(
  tooltip: boolean | ChartTooltipSpec | undefined,
  build: (points: readonly ChartPoint<unknown>[], format: (v: number) => string) => ChartTooltipContent,
) {
  if (tooltip === false) return {};
  const spec: ChartTooltipSpec = typeof tooltip === 'object' ? tooltip : {};
  const format = spec.formatValue ?? ((v: number) => v.toLocaleString());
  return {
    tooltip: {
      use: tooltipFeature,
      className: spec.className ? `aui-chart-tooltip ${spec.className}` : 'aui-chart-tooltip',
      anchor: 'group-center',
      placement: 'auto',
      content: (points: readonly ChartPoint<unknown>[]) => {
        const base = build(points, format);
        return spec.content ? spec.content(base) : base;
      },
    },
  };
}

/** A token-backed linear VALUE axis (grid optional). `false` hides the axis line/ticks/labels. */
export function chartValueAxis(axis: false | ChartAxisSpec<number>, grid: boolean, domain?: readonly [number, number]) {
  const fixed = (axis !== false && axis.domain) || domain;
  const scale = fixed ? scaleLinear().domain([...fixed] as [number, number]) : scaleLinear;
  if (axis === false) return { scale, nice: !fixed, grid, axis: false as const };
  return {
    scale,
    nice: !fixed,
    grid,
    axis: { line: false, label: axis.label, ticks: { size: 0, padding: 10, format: axis.format, values: axis.ticks } },
  };
}

/** Tick options shared by category axes. */
export function chartCategoryAxis<T>(axis: false | ChartAxisSpec<T>, scale: unknown) {
  if (axis === false) return { scale, axis: false as const };
  return {
    scale,
    axis: { line: false, label: axis.label, ticks: { size: 0, padding: 10, format: axis.format, values: axis.ticks } },
  };
}
