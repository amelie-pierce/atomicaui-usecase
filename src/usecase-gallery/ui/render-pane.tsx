import { Suspense, useCallback, useRef, useState } from 'react';
import { Button, ToggleGroup, Type } from '../kit';
import type { Usecase, UsecaseOption } from '../types';
import { StageHostContext } from '../hooks/use-stage-host';
import type { AnatomyPart } from '../types';
import { AnatomyOverlay, usePreviewAnatomy } from '../hooks/use-preview-anatomy';

type Mode = 'component' | 'context';

const MODES: { value: Mode; label: string }[] = [
  { value: 'component', label: 'Component' },
  { value: 'context', label: 'In context' },
];

/** The In context UI of a selection-based use case: the chosen option's scene with the example placed in it, in a stage of its own. */
function ContextStage({ option, hidden }: { option: UsecaseOption; hidden: boolean }) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const { Example, Scene } = option;
  return (
    <div className="ug-render__stage" ref={setHost} hidden={hidden}>
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
  const [mode, setMode] = useState<Mode>('component');
  const [host, setHost] = useState<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const setStage = useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node;
    setHost(node);
  }, []);
  const overlay = usePreviewAnatomy(stageRef, anatomy, hoveredPartId, onPartChange, onAvailablePartsChange);
  return (
    <section className="ug-render ug-render--split" role="region" aria-label="Preview">
      <ToggleGroup
        className="ug-render__toggle"
        aria-label="Preview mode"
        value={[mode]}
        // Pressing the active segment would clear the group; keep one mode selected.
        onValueChange={([next]) => next && setMode(next as Mode)}
      >
        {MODES.map(({ value, label }) => (
          <ToggleGroup.Item
            key={value}
            value={value}
            render={(props, { pressed }) => (
              <Button {...props} aui={{ scale: 'sm', color: pressed ? 'primary' : 'secondary', paint: pressed ? 'solid' : 'text' }}>
                {label}
              </Button>
            )}
          />
        ))}
      </ToggleGroup>
      <div className="ug-render__stage" ref={setStage} hidden={mode !== 'component'}>
        <Suspense fallback={null}>
          {host && <StageHostContext.Provider value={host}><Example /></StageHostContext.Provider>}
        </Suspense>
        <AnatomyOverlay rect={overlay} />
      </div>
      <ContextStage option={option} hidden={mode !== 'context'} />
      {option.note && (
        <Type role="l3" as="p" color="muted" className="ug-render__note">
          {option.note}
        </Type>
      )}
    </section>
  );
}
