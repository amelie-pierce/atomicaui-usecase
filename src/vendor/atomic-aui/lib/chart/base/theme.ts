// modules/design/atomic-aui/src/lib/chart/base/theme.ts
//
// Maps AtomicAUI tokens onto the `@tanstack/charts` theme. Every value is a CSS `var()` with a
// safe fallback, so the chart restyles with the surrounding theme (light/dark, brand) at paint time
// and needs no rebuild when a token changes. Plain data — no framework involved.
import { CHART_SERIES_COUNT, chartSeriesColors } from './series-colors';

/** The shape accepted by a TanStack Charts definition's `theme` (all fields optional there). */
export interface AuiChartTheme {
  foreground: string;
  muted: string;
  grid: string;
  background: string;
  palette: string[];
}

/** AtomicAUI chart theme: axis text / grid / background come from `--aui-viz-*` hooks (which
 *  resolve through the 510/520 role rails in `_chart-tokens.scss`); the palette is the series cycle. */
export function createChartTheme(): AuiChartTheme {
  return {
    foreground: 'var(--aui-viz-fg, currentColor)',
    muted: 'var(--aui-viz-muted, currentColor)',
    grid: 'var(--aui-viz-grid, currentColor)',
    background: 'transparent',
    palette: chartSeriesColors(CHART_SERIES_COUNT),
  };
}
