// modules/design/atomic-aui/src/lib/chart/frame/chart-frame.tsx
//
// ChartFrame — what every chart kind's root renders: the shared ChartContainer (aui surface), the
// header parts, the legend beside the plot, and the ChartRenderer. A kind supplies only its built
// definition + legend items; `useStableSpec` keeps the definition identity steady across renders.
import * as React from 'react';
import { CHART_DEFAULT_PALETTE, CHART_PALETTE_ATTRIBUTE, type ChartPalette } from '../base';
import { mergeAuiClasses } from '../../../core/recipe/merge-classes';
import { ChartContainer, type ChartContainerAui } from './chart-container';
import { ChartBody, type ChartLegendItem, type ChartLegendLayoutProps } from './chart-legend';
import { ChartRenderer, type ChartRendererAnimation, type ChartRendererProps } from './chart-renderer';

/** Structural equality where functions compare by reference: a spec is rebuilt from `children` on
 *  every render, so reuse the previous one (and its chart definition) when nothing that matters
 *  changed — a new definition identity would restart the library's interaction state. */
function specEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (React.isValidElement(a) || React.isValidElement(b)) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => specEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}

export function useStableSpec<T>(next: T): T {
  const ref = React.useRef(next);
  if (!specEqual(ref.current, next)) ref.current = next;
  return ref.current;
}

export interface ChartFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** The kind's marker class (`aui-bar-chart`, …). */
  kind: string;
  aui?: ChartContainerAui;
  /** Named series palette (default `brand`); see `chart-base` `CHART_PALETTES`. */
  palette?: ChartPalette;
  definition: ChartRendererProps['definition'];
  'aria-label': string;
  description?: string;
  height?: number;
  animation: ChartRendererAnimation | null;
  /** Enter reveal played by CSS on the marks layer (`sweep` = left to right). Area and Line use it; needs `animation`. */
  reveal?: 'sweep';
  /** `.Title` / `.Description` elements. */
  header: React.ReactNode[];
  legend: false | ChartLegendLayoutProps;
  legendItems: readonly ChartLegendItem[];
  /** Extra nodes rendered inside the plot area after the chart (an overlay such as a custom tooltip). */
  plotChildren?: React.ReactNode;
}

export const ChartFrame = React.forwardRef<HTMLDivElement, ChartFrameProps>(function ChartFrame(
  { kind, aui, palette = CHART_DEFAULT_PALETTE, definition, 'aria-label': ariaLabel, description, height, animation, reveal, header, legend, legendItems, plotChildren, className, ...rest },
  ref,
) {
  return React.createElement(
    ChartContainer,
    {
      ref,
      ...rest,
      ...({ [CHART_PALETTE_ATTRIBUTE]: palette } as Record<string, string>),
      ...(reveal && animation
        ? {
            'data-aui-reveal': reveal,
            style: {
              ...(rest as { style?: React.CSSProperties }).style,
              '--aui-chart-reveal-duration': `${animation.duration}ms`,
              '--aui-chart-reveal-easing': animation.easing ?? 'ease-out',
            } as React.CSSProperties,
          }
        : {}),
      aui, className: mergeAuiClasses([kind, typeof className === 'string' ? className : undefined]) },
    ...header,
    React.createElement(
      ChartBody,
      { legend: legend ? { ...legend, items: legendItems } : null },
      React.createElement(ChartRenderer, { definition, height, 'aria-label': ariaLabel, description, animation }),
      plotChildren,
    ),
  );
});
ChartFrame.displayName = 'ChartFrame';
