import { Suspense, useCallback, useRef, useState } from 'react';
import { Type } from '../kit';
import type { Usecase, UsecaseOption } from '../types';
import { StageHostContext } from '../hooks/use-stage-host';
import type { AnatomyPart } from '../types';
import { AnatomyOverlay, usePreviewAnatomy } from '../hooks/use-preview-anatomy';

/** The In context UI of a selection-based use case: the chosen option's scene with the example placed in it, in a stage of its own. */
function ContextStage({ option }: { option: UsecaseOption }) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const { Example, Scene } = option;
  return (
    <div className="ug-render__stage" ref={setHost}>
      <Suspense fallback={null}>
        {host && (
          <Scene host={host}>
            <Example />
          </Scene>
        )}
      </Suspense>
    </div>
  );
}

/** Read-only: the example renders with fixed props, and there are no controls to change them. */
export function RenderPane({
  usecase,
  option,
  anatomy,
  hoveredPartId,
  onPartChange,
  onAvailablePartsChange,
}: {
  usecase: Usecase;
  option: UsecaseOption;
  anatomy: AnatomyPart[];
  hoveredPartId?: string;
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void;
  onAvailablePartsChange: (partIds: string[]) => void;
}) {
  const { Example } = option;
  const [host, setHost] = useState<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const setStage = useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node;
    setHost(node);
  }, []);
  const overlay = usePreviewAnatomy(stageRef, anatomy, hoveredPartId, onPartChange, onAvailablePartsChange);
  return (
    <section className="ug-render ug-render--split" role="region" aria-label="Preview">
      <Type as="h2" role="l3" weight="semi-bold" className="ug-render__heading">Component UI</Type>
      <div className="ug-render__stage" ref={setStage}>
        <Suspense fallback={null}>
          {host && <StageHostContext.Provider value={host}><Example /></StageHostContext.Provider>}
        </Suspense>
        <AnatomyOverlay rect={overlay} />
      </div>
      <Type as="h2" role="l3" weight="semi-bold" className="ug-render__heading">In context UI</Type>
      <ContextStage option={option} />
      {option.note && (
        <Type role="l3" as="p" color="muted" className="ug-render__note">
          {option.note}
        </Type>
      )}
    </section>
  );
}
