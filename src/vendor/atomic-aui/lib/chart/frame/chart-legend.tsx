// modules/design/atomic-aui/src/lib/chart/frame/chart-legend.tsx
//
// ChartBody + ChartLegend — the AtomicAUI-owned legend and its layout. The TanStack legend can only
// sit top/bottom and has no gap/alignment, so the legend is plain HTML beside the plot: position
// (top|bottom|left|right), alignment (start|center|end) and both gaps are props, styled through
// tokens in `_state-cascade.scss`. It takes plain items (any chart kind supplies them), so every
// chart reuses it.
import * as React from 'react';

export type ChartLegendPosition = 'top' | 'bottom' | 'left' | 'right';
export type ChartLegendAlign = 'start' | 'center' | 'end';

export interface ChartLegendItem {
  key: string;
  label: string;
  /** Swatch colour (any CSS colour / `var()`). */
  color: string;
  /** Replaces the swatch (e.g. an icon). */
  icon?: React.ReactNode;
}

export interface ChartLegendLayoutProps {
  /** Which side of the plot (default `bottom`). */
  position?: ChartLegendPosition;
  /** Alignment along the legend's own axis (default `center`). */
  align?: ChartLegendAlign;
  /** Space between legend items, in px (default from the token). */
  gap?: number;
  /** Space between the legend and the plot, in px (default from the token). */
  plotGap?: number;
  /** `square` (default) or `circle` swatches. */
  shape?: 'square' | 'circle';
  /** Accessible name of the legend list. */
  label?: string;
  /** Items are buttons that toggle that series/slice (default off: the legend is plain text). */
  clickable?: boolean;
  /** Keys currently hidden (dimmed + `aria-pressed="false"` when `clickable`). */
  hiddenKeys?: readonly string[];
  /** Called with the item key when a clickable item is activated. */
  onItemToggle?: (key: string) => void;
}

export interface ChartBodyProps {
  /** `null` renders the plot alone (no legend). */
  legend: (ChartLegendLayoutProps & { items: readonly ChartLegendItem[] }) | null;
  children?: React.ReactNode;
}

/** The plot wrapper, with the legend (when present) placed beside it. */
export function ChartBody({ legend, children }: ChartBodyProps) {
  const plot = React.createElement('div', { className: 'aui-chart-plot' }, children);
  if (!legend) return plot;
  const { items, position = 'bottom', align = 'center', gap, plotGap, shape = 'square', label, clickable, hiddenKeys = [], onItemToggle } = legend;
  const style = {
    ...(plotGap !== undefined ? { '--aui-chart-plot-gap': `${plotGap}px` } : {}),
    ...(gap !== undefined ? { '--aui-chart-legend-gap': `${gap}px` } : {}),
  } as React.CSSProperties;
  const list = React.createElement(
    'ul',
    { className: 'aui-chart-legend', 'data-align': align, 'data-shape': shape, 'aria-label': label ?? 'Legend' },
    items.map((item) => {
      const hidden = hiddenKeys.includes(item.key);
      // The last visible item cannot be hidden (a chart is never empty): say so instead of failing silently.
      const isLast = !hidden && items.every((other) => other.key === item.key || hiddenKeys.includes(other.key));
      const mark = item.icon
        ? React.createElement('span', { className: 'aui-chart-legend-icon', 'aria-hidden': true, style: { color: item.color } }, item.icon)
        : React.createElement('span', {
            className: 'aui-chart-legend-swatch',
            'aria-hidden': true,
            style: { '--aui-chart-swatch': item.color } as React.CSSProperties,
          });
      return React.createElement(
        'li',
        { key: item.key, className: 'aui-chart-legend-item', 'data-hidden': hidden ? '' : undefined },
        clickable
          ? React.createElement(
              'button',
              {
                type: 'button',
                className: 'aui-chart-legend-button',
                'aria-pressed': !hidden,
                'aria-disabled': isLast || undefined,
                title: isLast ? 'At least one must stay visible' : undefined,
                onClick: () => onItemToggle?.(item.key),
              },
              mark,
              item.label,
            )
          : [mark, item.label],
      );
    }),
  );
  return React.createElement('div', { className: 'aui-chart-body', 'data-legend-position': position, style }, list, plot);
}
ChartBody.displayName = 'ChartBody';
