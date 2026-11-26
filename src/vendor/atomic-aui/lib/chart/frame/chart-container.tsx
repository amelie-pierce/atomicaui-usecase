// modules/design/atomic-aui/src/lib/chart/frame/chart-container.tsx
//
// ChartContainer — the shared AtomicAUI frame every chart kind renders inside: the `aui` surface
// (full 6 axes + the full-frame `sx`), the `.aui-chart` marker that scopes the series/axis/grid/
// tooltip tokens, and optional `.Title` / `.Description` parts for Card-style composition. It paints
// nothing by default (transparent, no padding). The frame itself is unnamed: the chart's accessible
// name lives on the SVG (see ChartRenderer), so an `aria-label` here would be invalid ARIA.
import * as React from 'react';
import { createAtomicComponent } from '../../../core/factory/create-atomic-component';
import { Type } from '../../type';
import { useChartContainerRecipe, type ChartContainerAui } from './use-recipe';

export type { ChartContainerAui } from './use-recipe';

const _ChartContainerFrame = createAtomicComponent('div', { extensions: [useChartContainerRecipe] });

export interface ChartContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Root appearance (the transparent chart frame) incl. `sx`. */
  aui?: ChartContainerAui;
  children?: React.ReactNode;
}

const ChartContainerRoot = React.forwardRef<HTMLDivElement, ChartContainerProps>(function ChartContainerRoot(
  { aui, children, ...rest },
  ref,
) {
  return React.createElement(_ChartContainerFrame as React.ElementType, { ref, aui, ...rest }, children);
});
ChartContainerRoot.displayName = 'ChartContainer';

export interface ChartContainerTextProps {
  children?: React.ReactNode;
}

/** A heading for the chart (renders an `h3`; compose above the chart). */
export function ChartContainerTitle({ children }: ChartContainerTextProps) {
  return React.createElement(Type, { role: 'l5', as: 'h3' }, children);
}
ChartContainerTitle.displayName = 'ChartContainer.Title';

/** A short supporting line under the title (units, range, source). */
export function ChartContainerDescription({ children }: ChartContainerTextProps) {
  return React.createElement(Type, { role: 'p2', as: 'p' }, children);
}
ChartContainerDescription.displayName = 'ChartContainer.Description';

export const ChartContainer = Object.assign(ChartContainerRoot, {
  Title: ChartContainerTitle,
  Description: ChartContainerDescription,
});
