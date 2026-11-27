import type { ReactNode } from 'react';
import { Panels } from '../kit';

export interface LayoutPanes {
  toolbar: ReactNode;
  tree: ReactNode;
  render: ReactNode;
  detail: ReactNode;
  treeCollapsed: boolean;
  onTreePanelResize: (size: { asPercentage: number; inPixels: number }) => void;
}

const PANE_MIN = 220;

/** Three resizable panes; the preview toolbar is anchored across the page from the center panel. */
export function DetailLayout({ toolbar, tree, render, detail, treeCollapsed, onTreePanelResize }: LayoutPanes) {
  return (
    <Panels orientation="horizontal" className="ug-panels" animate={false}>
      <Panels.Panel
        id="component-tree"
        className="ug-layout__column ug-layout__column--tree"
        defaultSize={treeCollapsed ? '0%' : '30%'}
        groupResizeBehavior="preserve-relative-size"
        minSize={`${PANE_MIN}px`}
        collapsedSize="0%"
        collapsible
        onResize={onTreePanelResize}
      >
        {tree}
      </Panels.Panel>
      <Panels.ResizeHandle aria-label="Resize component tree and preview" />
      <Panels.Panel id="component-preview" className="ug-layout__column ug-layout__column--render" minSize="280px">
        {toolbar}
        {render}
      </Panels.Panel>
      <Panels.ResizeHandle aria-label="Resize preview and documentation" />
      <Panels.Panel id="component-documentation" className="ug-layout__column ug-layout__column--detail" defaultSize="30%" groupResizeBehavior="preserve-relative-size" minSize={`${PANE_MIN}px`}>
        {detail}
      </Panels.Panel>
    </Panels>
  );
}

/** One column for narrow viewports where side-by-side panes would be unusable. */
export function StackedLayout({ toolbar, tree, render, detail }: LayoutPanes) {
  return (
    <div className="ug-stacked">
      {toolbar}
      {tree}
      {render}
      {detail}
    </div>
  );
}
