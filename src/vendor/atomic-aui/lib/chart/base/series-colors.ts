// modules/design/atomic-aui/src/lib/chart/base/series-colors.ts
//
// Framework-neutral series colour cycle for AtomicAUI charts. The cycle is a fixed set of CSS
// custom properties (`--aui-viz-series-<n>`, authored in `tokens/_chart-tokens.scss`), so a chart
// follows light/dark and a consumer can re-brand it with plain CSS — no JS, no framework.
// Series 0 is the brand orange (the Visualization archetype's `series/0`).

/** How many distinct series colours the cycle defines before it wraps. */
export const CHART_SERIES_COUNT = 6;

/** The CSS custom property for series `index` (wraps past `CHART_SERIES_COUNT`). */
export function chartSeriesVar(index: number): string {
  const i = ((Math.trunc(index) % CHART_SERIES_COUNT) + CHART_SERIES_COUNT) % CHART_SERIES_COUNT;
  return `--aui-viz-series-${i}`;
}

/** `var(--aui-viz-series-<n>)` — a value usable anywhere a colour string is accepted (SVG fill/stroke). */
export function chartSeriesColor(index: number): string {
  return `var(${chartSeriesVar(index)})`;
}

/** The first `count` series colours as `var()` strings. */
export function chartSeriesColors(count: number): string[] {
  return Array.from({ length: Math.max(0, count) }, (_, i) => chartSeriesColor(i));
}
