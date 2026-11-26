// modules/design/atomic-aui/src/lib/chart/radar/radar-tooltip-layer.tsx
//
// The React side of the radar tooltip: mounts the framework-neutral `attachRadarInteraction` controller on
// the plot element and renders the card from its state (series / axis mode, keyboard, hidden series are
// already filtered by the caller). The card uses the shared tooltip tokens (`.aui-chart-tooltip`).
import * as React from 'react';
import {
  attachRadarInteraction,
  placeTooltip,
  type ChartTooltipContent,
  type RadarInteractionOptions,
  type RadarInteractionState,
} from '../base';

// This package compiles without the DOM lib: the few DOM reads go through this small shape.
interface Box {
  parentElement: Box | null;
  offsetWidth: number;
  offsetHeight: number;
  clientWidth: number;
  clientHeight: number;
}
const box = (el: unknown) => el as Box | null;

export interface RadarTooltipLayerProps {
  options: RadarInteractionOptions;
  className?: string;
  /** Replaces the card body (a custom render slot). */
  render?: (content: ChartTooltipContent, state: RadarInteractionState) => React.ReactNode;
}

export function RadarTooltipLayer({ options, className, render }: RadarTooltipLayerProps) {
  const marker = React.useRef<HTMLSpanElement>(null);
  const card = React.useRef<HTMLDivElement>(null);
  const latest = React.useRef(options);
  latest.current = options;
  const controller = React.useRef<ReturnType<typeof attachRadarInteraction> | null>(null);
  const [state, setState] = React.useState<RadarInteractionState | null>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    const plot = box(marker.current)?.parentElement;
    if (!plot) return undefined;
    controller.current = attachRadarInteraction(plot, () => latest.current, setState);
    return () => {
      controller.current?.destroy();
      controller.current = null;
    };
  }, []);
  // The series/mode/data changed: drop a stale card, then re-read the new paths.
  const signature = `${options.mode}|${options.series.map((s) => s.key).join(',')}|${options.data.length}`;
  React.useEffect(() => {
    controller.current?.setTarget(undefined);
  }, [signature]);

  React.useLayoutEffect(() => {
    const el = box(card.current);
    const plot = box(marker.current)?.parentElement;
    if (!state || !el || !plot) {
      setPos(null);
      return;
    }
    const p = placeTooltip(state.anchor, { width: el.offsetWidth, height: el.offsetHeight }, { width: plot.clientWidth, height: plot.clientHeight });
    setPos({ x: p.x, y: p.y });
  }, [state]);

  const swatch = (color?: string) =>
    color ? React.createElement('span', { className: 'aui-chart-tooltip-swatch', 'aria-hidden': true, style: { background: color } }) : null;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('span', { ref: marker, hidden: true }),
    state
      ? React.createElement(
          'div',
          {
            ref: card,
            className: ['aui-chart-tooltip', 'aui-chart-tooltip-card', className].filter(Boolean).join(' '),
            role: 'status',
            'aria-live': 'polite',
            'aria-label': state.text,
            'data-mode': state.mode,
            style: { left: pos?.x ?? 0, top: pos?.y ?? 0, visibility: pos ? 'visible' : 'hidden' },
          },
          render
            ? render(state.content, state)
            : [
                React.createElement(
                  'div',
                  { key: 'title', className: 'aui-chart-tooltip-title', 'aria-hidden': true },
                  state.mode === 'series' ? swatch(state.content.rows[0]?.color) : null,
                  state.content.title,
                ),
                React.createElement(
                  'div',
                  { key: 'rows', className: 'aui-chart-tooltip-rows', 'aria-hidden': true },
                  state.content.rows.map((row, i) =>
                    React.createElement(
                      'div',
                      { key: `${row.label}-${i}`, className: 'aui-chart-tooltip-row' },
                      swatch(row.color),
                      React.createElement('span', { className: 'aui-chart-tooltip-label' }, row.label),
                      React.createElement(
                        'span',
                        { className: 'aui-chart-tooltip-value' },
                        row.value,
                        row.secondary ? React.createElement('span', { className: 'aui-chart-tooltip-secondary' }, row.secondary) : null,
                      ),
                    ),
                  ),
                ),
              ],
        )
      : null,
  );
}
