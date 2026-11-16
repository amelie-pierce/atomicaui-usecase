import type { ReactNode } from 'react';
import { Panels } from '../kit';

export interface LayoutPanes {
  tree: ReactNode;
  render: ReactNode;
  detail: ReactNode;
}

/** Tree | render | detail (documentation or code), each divider draggable and operable with the arrow keys. */
export function ResizableLayout({ tree, render, detail }: LayoutPanes) {
  return (
    <Panels orientation="horizontal" className="ug-layout">
      <Panels.Panel id="ug-tree" defaultSize="20%" minSize="180px" maxSize="35%" className="ug-layout__panel">
        {tree}
      </Panels.Panel>
      <Panels.ResizeHandle width="var(--p-px-12)" aria-label="Resize the use case tree" />
      <Panels.Panel id="ug-render" defaultSize="45%" minSize="320px" className="ug-layout__panel">
        {render}
      </Panels.Panel>
      <Panels.ResizeHandle width="var(--p-px-12)" aria-label="Resize the preview and the details" />
      <Panels.Panel id="ug-detail" defaultSize="35%" minSize="240px" className="ug-layout__panel">
        {detail}
      </Panels.Panel>
    </Panels>
  );
}

/** One scrolling column, for narrow viewports where side-by-side panes would be unusable. */
export function StackedLayout({ tree, render, detail }: LayoutPanes) {
  return (
    <div className="ug-stacked">
      {tree}
      {render}
      {detail}
    </div>
  );
}
