// modules/design/atomic-aui/src/lib/chart/frame/chart-renderer.tsx
//
// ChartRenderer — the thin React adapter that renders ANY `@tanstack/charts` definition (a
// `defineChart` result from `chart-base`, or one the app built itself). It owns only the adapter
// call: the accessible name (required — the SVG carries it), the optional description, the height,
// the animation renderer, and SSR/hydration (width follows the container). Every chart kind
// (BarChart now; Line/Area later) renders through it.
//
// Animation: when on, the library's `motion()` renderer grows bars from their baseline on enter,
// staggers them and tweens updates; it snaps under `prefers-reduced-motion` and adopts server markup
// without replaying. When off, the plain SVG chart is rendered.
import * as React from 'react';
import { Chart } from '@tanstack/charts/react';
import { Chart as RendererChart } from '@tanstack/charts/react/core';
import { motion } from '@tanstack/charts/motion';

type ChartDefinition = React.ComponentProps<typeof Chart>['definition'];

export interface ChartRendererAnimation {
  /** Milliseconds. */
  duration: number;
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface ChartRendererProps {
  /** A chart definition, e.g. from `chart-base`'s `buildBarChartDefinition`. */
  definition: ChartDefinition;
  /** The chart's accessible name — required; it names the SVG. */
  'aria-label': string;
  /** Longer description for assistive tech (units, time range, context). */
  description?: string;
  /** Chart height in px; the width follows the container. Default 300. */
  height?: number;
  /** Enter/update animation; `null`/omitted renders the static SVG chart. */
  animation?: ChartRendererAnimation | null;
}

export function ChartRenderer({ definition, 'aria-label': ariaLabel, description, height = 300, animation }: ChartRendererProps) {
  const duration = animation?.duration;
  const easing = animation?.easing;
  const renderer = React.useMemo(
    () => (duration === undefined ? null : motion({ transition: { type: 'tween', duration, easing } })),
    [duration, easing],
  );
  if (renderer) {
    return React.createElement(RendererChart, {
      definition: definition as never,
      renderer: renderer as never,
      height,
      ariaLabel,
      ariaDescription: description,
    });
  }
  return React.createElement(Chart, { definition, height, ariaLabel, ariaDescription: description });
}
ChartRenderer.displayName = 'ChartRenderer';
