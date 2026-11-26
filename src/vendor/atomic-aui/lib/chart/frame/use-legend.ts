// modules/design/atomic-aui/src/lib/chart/frame/use-legend.ts
//
// The clickable-legend state for every chart kind: controlled (`hiddenKeys` + `onHiddenChange`) or
// uncontrolled (`defaultHiddenKeys`), the keep-one-visible rule from chart-base, and the layout props
// ChartBody needs. A kind filters its series/slices by `hidden` before building its definition.
import * as React from 'react';
import { toggleHiddenKey } from '../base';
import type { ChartLegendLayoutProps } from './chart-legend';
import type { ChartLegendProps } from './parts';

export function useChartLegend(
  legendProps: false | ChartLegendProps,
  allKeys: readonly string[],
): { hidden: ReadonlySet<string>; legend: false | ChartLegendLayoutProps } {
  const legend = legendProps ? legendProps : undefined;
  const controlled = legend?.hiddenKeys;
  const [inner, setInner] = React.useState<readonly string[]>(legend?.defaultHiddenKeys ?? []);
  const hiddenList = (controlled ?? inner).filter((k) => allKeys.includes(k));
  const clickable = !!legend?.clickable;
  const { onHiddenChange, onItemClick } = legend ?? {};
  const onItemToggle = React.useCallback(
    (key: string) => {
      const next = toggleHiddenKey(hiddenList, key, allKeys);
      if (controlled === undefined) setInner(next);
      onHiddenChange?.(next);
      onItemClick?.(key, next.includes(key));
    },
    [hiddenList, allKeys, controlled, onHiddenChange, onItemClick],
  );
  const hiddenKey = hiddenList.join('|');
  const hidden = React.useMemo(() => new Set(clickable ? hiddenKey.split('|').filter(Boolean) : []), [clickable, hiddenKey]);
  let layout: false | ChartLegendLayoutProps = false as false | ChartLegendLayoutProps;
  if (legend) {
    const { clickable: _c, hiddenKeys: _h, defaultHiddenKeys: _d, onHiddenChange: _o, onItemClick: _i, ...rest } = legend;
    layout = clickable ? { ...rest, clickable: true, hiddenKeys: hiddenList, onItemToggle } : rest;
  }
  return { hidden, legend: layout };
}
