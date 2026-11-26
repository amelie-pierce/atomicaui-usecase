import { Suspense, useCallback, useState } from 'react';
import type { ComponentType } from 'react';
import { StageHostContext } from '../hooks/use-stage-host';
import { useStageFit } from '../hooks/use-stage-fit';

/** What a card's live render needs: the example of a use case. */
interface ThumbProps {
  Example: ComponentType;
}

/**
 * A live render of an example inside a card: the real component, inert so a click on the card navigates, and scaled
 * down to fit when it is larger than the frame (a dialog, a table). The content wrapper is zoomed while its stage
 * stays frame-sized, so percentage-sized content keeps a stable layout while it is measured.
 */
export function Thumb({ Example }: ThumbProps) {
  const [fit, setFit] = useState<HTMLDivElement | null>(null);
  const [host, setHostState] = useState<HTMLElement | null>(null);
  const setFitElement = useCallback((node: HTMLDivElement | null) => setFit((current) => current === node ? current : node), []);
  const setHost = useCallback((node: HTMLDivElement | null) => setHostState((current) => current === node ? current : node), []);
  useStageFit(fit);

  return (
    <div className="ug-thumb" aria-hidden="true" inert>
      <div className="ug-render__stage ug-thumb__stage" style={{ transform: 'translate(-50%, -50%)' }}>
        <div className="ug-render__fit ug-thumb__fit" ref={setFitElement}>
          <div ref={setHost} className="ug-render__component-portal-host" />
          <Suspense fallback={<div className="ug-preview-placeholder ug-preview-placeholder--thumb" aria-hidden="true" />}>
            {host && <StageHostContext.Provider value={host}><Example /></StageHostContext.Provider>}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
