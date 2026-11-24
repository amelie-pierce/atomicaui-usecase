import type { ReactNode } from 'react';
export interface LayoutPanes {
  render: ReactNode;
  detail: ReactNode;
}

/** The rendered use case stays on the left while its complete document scrolls on the right. */
export function DetailLayout({ render, detail }: LayoutPanes) {
  return (
    <div className="ug-layout">
      <div className="ug-layout__column ug-layout__column--render">
        {render}
      </div>
      <div className="ug-layout__column ug-layout__column--detail">
        {detail}
      </div>
    </div>
  );
}

/** One column for narrow viewports where side-by-side panes would be unusable. */
export function StackedLayout({ render, detail }: LayoutPanes) {
  return (
    <div className="ug-stacked">
      {render}
      {detail}
    </div>
  );
}
