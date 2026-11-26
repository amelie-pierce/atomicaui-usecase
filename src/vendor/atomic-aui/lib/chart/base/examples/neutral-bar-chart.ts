// modules/design/atomic-aui/src/lib/chart/base/examples/neutral-bar-chart.ts
//
// A bar chart WITHOUT React: plain TypeScript + DOM. It uses only the framework-neutral chart base
// (published as `@sstvn-uiux/design-atomic-aui/chart-base`; imported here by its relative index) and
// the `@tanstack/charts` DOM host. The same builder backs the React `<BarChart>`, so both draw the same SVG.
//
// This library compiles without the DOM lib, so the few DOM calls go through the small `El` shape below;
// in an app with DOM types, `container` is simply an `HTMLElement` and `El` is not needed.
import { mountChart } from '@tanstack/charts/dom';
import { CHART_PALETTE_ATTRIBUTE, buildBarChartDefinition, chartLegendItems, createLegendVisibility, type ChartPalette } from '../index';

interface El {
  classList: { add(name: string): void; remove(name: string): void };
  ownerDocument: { createElement(tag: string): El };
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  appendChild<T>(child: T): T;
  append(text: string): void;
  addEventListener(type: string, listener: () => void): void;
  remove(): void;
}

export interface NeutralBarChartOptions {
  data: readonly Record<string, unknown>[];
  /** The row field holding the category. */
  categoryKey: string;
  /** One bar series per numeric column. */
  series: readonly { key: string; label?: string }[];
  palette?: ChartPalette;
  height?: number;
  ariaLabel: string;
  /** Legend items are buttons that show/hide their series (default true; at least one stays visible). */
  clickableLegend?: boolean;
}

/** Mount the chart (plus a legend) into `container`; call the returned `destroy()` to clean up. */
export function mountNeutralBarChart(container: object, options: NeutralBarChartOptions): { destroy: () => void } {
  const el = container as El;
  const { data, categoryKey, series, palette = 'brand', height = 220, ariaLabel, clickableLegend = true } = options;
  const make = (tag: string) => el.ownerDocument.createElement(tag);

  // 1. The chart tokens apply to any element with the `aui-chart` class; the palette is an attribute.
  el.classList.add('aui-chart');
  el.setAttribute(CHART_PALETTE_ATTRIBUTE, palette);

  // 2. Build the definition from a plain spec (colours are token references: `var(--aui-viz-series-N)`).
  //    Grid, axes and the hover tooltip are on by default; pass `tooltip: false` / `grid: false` to drop them.
  //    Hidden series are dropped but the rest keep their colours (`chartLegendItems` fixes them by position).
  const items = chartLegendItems(series.map((s) => ({ key: s.key, label: s.label })));
  const visibility = createLegendVisibility(items.map((i) => i.key)); // framework-neutral legend state
  const definitionFor = (hidden: readonly string[]) =>
    buildBarChartDefinition({
      data,
      categoryKey,
      series: series.flatMap((s, i) => (hidden.includes(s.key) ? [] : [{ key: s.key, label: s.label, color: items[i].color }])),
      layout: 'group',
      animation: false,
    });

  // 3. The layout classes are the same ones the React chart uses (`aui-chart-body` + `aui-chart-plot` +
  //    `aui-chart-legend`), so spacing, legend size and position come from the tokens, not inline styles.
  const body = el.appendChild(make('div'));
  body.setAttribute('class', 'aui-chart-body');
  body.setAttribute('data-legend-position', 'bottom');
  body.setAttribute('style', '--aui-chart-plot-gap:var(--p-px-16)'); // legend ↔ plot space
  const legend = body.appendChild(make('ul')); // DOM order: legend first; `bottom` reverses it visually
  legend.setAttribute('class', 'aui-chart-legend');
  legend.setAttribute('data-align', 'center');
  legend.setAttribute('data-shape', 'square');
  legend.setAttribute('aria-label', 'Legend');
  const plot = body.appendChild(make('div'));
  plot.setAttribute('class', 'aui-chart-plot');

  // 4. Mount it with the library's DOM host (owns sizing, SVG, keyboard and pointer interaction).
  let host = mountChart(plot as never, { definition: definitionFor(visibility.hidden()), height, ariaLabel });

  // 5. Legend items from the same series list and colours; clickable ones are real buttons (aria-pressed)
  //    that toggle the series, then the chart is mounted again from the new visible set.
  const buttons: Record<string, El> = {};
  const lis: Record<string, El> = {};
  for (const item of items) {
    const li = legend.appendChild(make('li'));
    li.setAttribute('class', 'aui-chart-legend-item');
    lis[item.key] = li;
    const swatch = make('span');
    swatch.setAttribute('class', 'aui-chart-legend-swatch');
    swatch.setAttribute('aria-hidden', 'true');
    swatch.setAttribute('style', `--aui-chart-swatch:${item.color}`);
    if (!clickableLegend) {
      li.appendChild(swatch);
      li.append(item.label);
      continue;
    }
    const button = li.appendChild(make('button'));
    buttons[item.key] = button;
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'aui-chart-legend-button');
    button.setAttribute('aria-pressed', 'true');
    button.appendChild(swatch);
    button.append(item.label);
    button.addEventListener('click', () => visibility.toggle(item.key));
  }
  const unsubscribe = visibility.subscribe((hidden) => {
    host.destroy();
    host = mountChart(plot as never, { definition: definitionFor(hidden), height, ariaLabel });
    for (const item of items) {
      const hide = hidden.includes(item.key);
      buttons[item.key]?.setAttribute('aria-pressed', String(!hide));
      const last = !hide && items.every((o) => o.key === item.key || hidden.includes(o.key));
      if (last) buttons[item.key]?.setAttribute('aria-disabled', 'true');
      else buttons[item.key]?.removeAttribute('aria-disabled');
      if (hide) lis[item.key]?.setAttribute('data-hidden', '');
      else lis[item.key]?.removeAttribute('data-hidden');
    }
  });

  return {
    destroy() {
      unsubscribe();
      host.destroy();
      body.remove();
      el.classList.remove('aui-chart');
      el.removeAttribute(CHART_PALETTE_ATTRIBUTE);
    },
  };
}
