// modules/design/atomic-aui/src/lib/chart/base/examples/neutral-radar-chart.ts
//
// A radar chart WITH the series/axis tooltip, WITHOUT React: the framework-neutral definition builder, the
// neutral `attachRadarInteraction` controller (pointer + keyboard + emphasis) and a plain DOM card.
// The card here is a bare `div`; style it with the `aui-chart-tooltip aui-chart-tooltip-card` classes.
import { mountChart } from '@tanstack/charts/dom';
import {
  CHART_PALETTE_ATTRIBUTE,
  attachRadarInteraction,
  buildRadarChartDefinition,
  chartLegendItems,
  placeTooltip,
  type ChartPalette,
  type RadarTooltipMode,
} from '../index';

interface El {
  classList: { add(name: string): void; remove(name: string): void };
  ownerDocument: { createElement(tag: string): El };
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  appendChild<T>(child: T): T;
  remove(): void;
  textContent: string | null;
  style: { left: string; top: string };
  offsetWidth: number;
  offsetHeight: number;
  clientWidth: number;
  clientHeight: number;
}

export interface NeutralRadarChartOptions {
  data: readonly Record<string, unknown>[];
  categoryKey: string;
  series: readonly { key: string; label?: string }[];
  /** `series` (default) or `axis` (compare). */
  tooltipMode?: RadarTooltipMode;
  palette?: ChartPalette;
  height?: number;
  ariaLabel: string;
}

export function mountNeutralRadarChart(container: object, options: NeutralRadarChartOptions): { destroy: () => void } {
  const el = container as El;
  const { data, categoryKey, series, tooltipMode = 'series', palette = 'brand', height = 280, ariaLabel } = options;
  el.classList.add('aui-chart');
  el.setAttribute(CHART_PALETTE_ATTRIBUTE, palette);
  const plot = el.appendChild(el.ownerDocument.createElement('div'));
  plot.setAttribute('class', 'aui-chart-plot');

  const items = chartLegendItems(series.map((s) => ({ key: s.key, label: s.label })));
  const definition = buildRadarChartDefinition({
    data,
    categoryKey,
    series: series.map((s, i) => ({ key: s.key, label: s.label, color: items[i].color })),
    animation: false,
  });
  const host = mountChart(plot as never, { definition, height, ariaLabel });

  const card = plot.appendChild(el.ownerDocument.createElement('div'));
  card.setAttribute('class', 'aui-chart-tooltip aui-chart-tooltip-card');
  card.setAttribute('role', 'status');
  card.setAttribute('aria-live', 'polite');
  card.setAttribute('hidden', '');
  const interaction = attachRadarInteraction(
    plot,
    () => ({
      mode: tooltipMode,
      categoryKey,
      data,
      series: series.map((s, i) => ({ key: s.key, label: s.label ?? s.key, color: items[i].color })),
    }),
    (state) => {
      if (!state) {
        card.setAttribute('hidden', '');
        return;
      }
      card.removeAttribute('hidden');
      card.setAttribute('aria-label', state.text);
      card.textContent = state.text;
      const at = placeTooltip(state.anchor, { width: card.offsetWidth, height: card.offsetHeight }, { width: plot.clientWidth, height: plot.clientHeight });
      card.style.left = `${at.x}px`;
      card.style.top = `${at.y}px`;
    },
  );

  return {
    destroy() {
      interaction.destroy();
      host.destroy();
      card.remove();
      plot.remove();
      el.classList.remove('aui-chart');
      el.removeAttribute(CHART_PALETTE_ATTRIBUTE);
    },
  };
}
