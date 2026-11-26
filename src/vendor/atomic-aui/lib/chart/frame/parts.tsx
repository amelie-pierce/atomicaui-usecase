// modules/design/atomic-aui/src/lib/chart/frame/parts.tsx
//
// The declarative PARTS every chart kind shares (Axis, Grid, Legend, Tooltip, Cursor + the
// Title/Description of the frame) and the one `collectChartParts` that reads them from `children`.
// Parts render nothing: composition is presence-based, and the kind's root hands the collected plain
// spec to its framework-neutral `chart-base` builder. Each kind re-exports these as its own dot-names
// (`BarChart.Axis`, `AreaChart.Axis`, …) so there is ONE implementation to evolve.
import * as React from 'react';
import type { ChartAxisSpec, ChartCursorSpec, ChartSeriesSpec, ChartTooltipSpec } from '../base';
import { ChartContainer } from './chart-container';
import type { ChartLegendLayoutProps, ChartLegendPosition } from './chart-legend';

export interface ChartAxisProps {
  /** Which axis this configures. `category` / `value` follow the data; `x` / `y` are the physical
   *  axes (vertical charts: x = category, y = value; horizontal charts: swapped). */
  axis: 'category' | 'value' | 'x' | 'y';
  label?: string;
  /** Tick label formatter (category string for the category axis, number for the value axis). */
  format?: (value: never) => string;
  /** Explicit tick values (thin out a dense category axis). */
  ticks?: readonly never[];
  /** Fixed value-axis domain `[min, max]` (default: from the data). */
  domain?: readonly [number, number];
}
/** Show (and configure) an axis. Omit to hide it. */
export function ChartAxisPart(_props: ChartAxisProps): null {
  return null;
}
ChartAxisPart.displayName = 'Chart.Axis';

/** Grid lines along the value axis. Omit to hide them. */
export function ChartGridPart(): null {
  return null;
}
ChartGridPart.displayName = 'Chart.Grid';

export interface ChartLegendProps extends Omit<ChartLegendLayoutProps, 'hiddenKeys' | 'onItemToggle'> {
  /** Which side of the plot (default `bottom`). */
  position?: ChartLegendPosition;
  /** Make each item a button that shows/hides its series (slice, for Pie). At least one stays visible. */
  clickable?: boolean;
  /** Controlled hidden keys (with `onHiddenChange`). */
  hiddenKeys?: readonly string[];
  /** Initial hidden keys for uncontrolled use. */
  defaultHiddenKeys?: readonly string[];
  /** Called with the next hidden keys after a toggle. */
  onHiddenChange?: (hiddenKeys: string[]) => void;
  /** Called after an item is activated, with its key and whether it is now hidden. */
  onItemClick?: (key: string, hidden: boolean) => void;
}
/** A legend (HTML, beside the plot): `position`, `align`, `gap` (between items), `plotGap`
 *  (legend ↔ plot), `shape`. Omit the part to hide it. */
export function ChartLegendPart(_props: ChartLegendProps): null {
  return null;
}
ChartLegendPart.displayName = 'Chart.Legend';

export type ChartTooltipProps = ChartTooltipSpec;
/** Hover / focus tooltip. Omit to disable it. */
export function ChartTooltipPart(_props: ChartTooltipProps): null {
  return null;
}
ChartTooltipPart.displayName = 'Chart.Tooltip';

export type ChartCursorProps = ChartCursorSpec;
/** The hover/focus background behind the focused category (a band on banded charts, a rule on point
 *  charts). Omit for none. Fill defaults to the `--aui-viz-cursor` token. */
export function ChartCursorPart(_props: ChartCursorProps): null {
  return null;
}
ChartCursorPart.displayName = 'Chart.Cursor';

export interface ChartSeriesProps extends Omit<ChartSeriesSpec, 'key'> {
  /** The row field holding this series' value (alias of `key`, mirrors the data shape). */
  dataKey: string;
  /** Replaces the legend swatch for this series (e.g. an icon). */
  icon?: React.ReactNode;
}

export interface CollectedChartParts {
  series: (ChartSeriesSpec & { icon?: React.ReactNode })[];
  categoryAxis: false | ChartAxisSpec<string>;
  valueAxis: false | ChartAxisSpec<number>;
  grid: boolean;
  legend: false | ChartLegendProps;
  cursor: false | ChartCursorSpec;
  tooltip: false | ChartTooltipSpec;
  /** `.Title` / `.Description` elements, rendered above the chart inside the frame. */
  header: React.ReactNode[];
}

export interface CollectOptions {
  /** True when categories run along y (horizontal bars): maps physical `x`/`y` axes. */
  horizontal?: boolean;
  /** The kind's own Series part(s). */
  seriesTypes: readonly unknown[];
  /** Offer unknown children to the kind (return true when handled), e.g. `BarChart.Label`. */
  extra?: (child: React.ReactElement) => boolean;
}

export function collectChartParts(children: React.ReactNode, opts: CollectOptions): CollectedChartParts {
  const out: CollectedChartParts = {
    series: [],
    categoryAxis: false,
    valueAxis: false,
    grid: false,
    legend: false,
    cursor: false,
    tooltip: false,
    header: [],
  };
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const type = child.type;
    if (opts.seriesTypes.includes(type)) {
      const { dataKey, ...rest } = child.props as ChartSeriesProps;
      out.series.push({ key: dataKey, ...rest });
    } else if (type === ChartAxisPart) {
      const { axis, ...rest } = child.props as ChartAxisProps;
      const isCategory = axis === 'category' || (axis === 'x' && !opts.horizontal) || (axis === 'y' && opts.horizontal);
      if (isCategory) out.categoryAxis = rest as ChartAxisSpec<string>;
      else out.valueAxis = rest as ChartAxisSpec<number>;
    } else if (type === ChartGridPart) {
      out.grid = true;
    } else if (type === ChartLegendPart) {
      out.legend = { ...(child.props as ChartLegendProps) };
    } else if (type === ChartCursorPart) {
      out.cursor = { ...(child.props as ChartCursorProps) };
    } else if (type === ChartTooltipPart) {
      out.tooltip = { ...(child.props as ChartTooltipProps) };
    } else if (type === ChartContainer.Title || type === ChartContainer.Description) {
      out.header.push(child);
    } else {
      opts.extra?.(child);
    }
  });
  return out;
}
