import { Suspense } from 'react';
import type { Usecase } from '../types';
import { PaneCard } from './pane-card';

/** Read-only: the example renders with fixed props, and there are no controls to change them. */
export function RenderPane({ usecase }: { usecase: Usecase }) {
  const { Example } = usecase;
  return (
    <PaneCard label="Preview" className="ug-render">
      <Suspense fallback={null}>
        <div className="ug-render__stage">
          <Example />
        </div>
      </Suspense>
    </PaneCard>
  );
}
