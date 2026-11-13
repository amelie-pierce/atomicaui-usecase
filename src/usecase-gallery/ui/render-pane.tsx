import { Suspense } from 'react';
import { Card } from '../kit';
import type { Usecase } from '../types';
import { PaneHeading } from './pane-header';

/** Read-only: the example renders with fixed props, and there are no controls to change them. */
export function RenderPane({ usecase }: { usecase: Usecase }) {
  const { Example } = usecase;
  return (
    <section className="ug-pane" aria-labelledby="ug-render-heading">
      <PaneHeading id="ug-render-heading">Preview</PaneHeading>
      <Card aui={{ color: 'overlay' }} className="ug-render">
        <Suspense fallback={null}>
          <div className="ug-render__stage">
            <Example />
          </div>
        </Suspense>
      </Card>
    </section>
  );
}
