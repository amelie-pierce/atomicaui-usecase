import type { ReactNode } from 'react';
import { Panels } from '../kit';

export interface LayoutPanes {
  tree: ReactNode;
  render: ReactNode;
  code: ReactNode;
  docs: ReactNode;
}

/** Tree | (render over code) | docs, each divider draggable and operable with the arrow keys. */
export function ResizableLayout({ tree, render, code, docs }: LayoutPanes) {
  return (
    <Panels orientation="horizontal" className="ug-layout">
      <Panels.Panel id="ug-tree" defaultSize="20%" minSize="180px" maxSize="35%" className="ug-layout__panel">
        {tree}
      </Panels.Panel>
      <Panels.ResizeHandle width="var(--p-px-12)" aria-label="Resize the use case tree" />
      <Panels.Panel id="ug-stage" defaultSize="50%" minSize="320px" className="ug-layout__panel">
        <Panels orientation="vertical" className="ug-layout">
          <Panels.Panel id="ug-render" defaultSize="50%" minSize="120px" className="ug-layout__panel">
            {render}
          </Panels.Panel>
          <Panels.ResizeHandle width="var(--p-px-12)" aria-label="Resize the preview and the code" />
          <Panels.Panel id="ug-code" defaultSize="50%" minSize="120px" className="ug-layout__panel">
            {code}
          </Panels.Panel>
        </Panels>
      </Panels.Panel>
      <Panels.ResizeHandle width="var(--p-px-12)" aria-label="Resize the documentation" />
      <Panels.Panel id="ug-docs" defaultSize="30%" minSize="240px" className="ug-layout__panel">
        {docs}
      </Panels.Panel>
    </Panels>
  );
}

/** One scrolling column, for narrow viewports where side-by-side panes would be unusable. */
export function StackedLayout({ tree, render, code, docs }: LayoutPanes) {
  return (
    <div className="ug-stacked">
      {tree}
      {render}
      {code}
      {docs}
    </div>
  );
}
