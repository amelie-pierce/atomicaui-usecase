import { Suspense, useRef, useState } from 'react';
import { Button, ToggleGroup, Type } from '../kit';
import type { PreviewMode, Usecase, UsecaseOption } from '../types';
import { StageHostContext } from '../hooks/use-stage-host';
import type { AnatomyPart } from '../types';
import { AnatomyOverlay, usePreviewAnatomy } from '../hooks/use-preview-anatomy';
import { useStageFit } from '../hooks/use-stage-fit';
import { OptionBar } from './option-bar';
const MODES: { value: PreviewMode; label: string }[] = [
  { value: 'component', label: 'Component' },
  { value: 'context', label: 'In context' },
];

/** The In context UI of a selection-based use case: the chosen option's scene with the example placed in it, in a stage of its own. */
function ContextStage({ option, hidden, anatomy, hoveredPartId, onAvailablePartsChange }: { option: UsecaseOption; hidden: boolean; anatomy: AnatomyPart[]; hoveredPartId?: string; onAvailablePartsChange: (partIds: string[]) => void }) {
  const [fit, setFit] = useState<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { Example, Scene } = option;
  const scale = useStageFit(fit);
  const overlay = usePreviewAnatomy(stageRef, anatomy, hoveredPartId, hidden ? undefined : onAvailablePartsChange, scale, !hidden);
  return (
    <div className="ug-render__viewport" hidden={hidden}>
      <div className="ug-render__stage" ref={stageRef}>
        <div className="ug-render__fit" ref={setFit}>
          <Suspense fallback={null}>
            {fit && (
              <Scene host={fit}>
                <Example />
              </Scene>
            )}
          </Suspense>
        </div>
      </div>
      {/* Keep the context highlight outside the scrolling stage, as in Component mode. */}
      <AnatomyOverlay rect={overlay} />
    </div>
  );
}

/** Read-only: the example renders with fixed props, and there are no controls to change them. The option select is the only control. */
export function RenderPane({
  usecase,
  option,
  mode,
  onModeChange,
  anatomy,
  hoveredPartId,
  onAvailablePartsChange,
  onOptionChange,
}: {
  usecase: Usecase;
  option: UsecaseOption;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  anatomy: AnatomyPart[];
  hoveredPartId?: string;
  onAvailablePartsChange: (partIds: string[]) => void;
  onOptionChange: (id: string) => void;
}) {
  const { Example } = option;
  const [fit, setFit] = useState<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const scale = useStageFit(fit);
  const overlay = usePreviewAnatomy(stageRef, anatomy, mode === 'component' ? hoveredPartId : undefined, mode === 'component' ? onAvailablePartsChange : undefined, scale, mode === 'component');
  return (
    <section className="ug-render ug-render--split" role="region" aria-label="Preview">
      <div className="ug-render__header">
        <OptionBar options={usecase.options} active={option} onChange={onOptionChange} />
        <ToggleGroup
          className="ug-render__toggle"
          aria-label="Preview mode"
          value={[mode]}
          // Pressing the active segment would clear the group; keep one mode selected.
          onValueChange={([next]) => next && onModeChange(next as PreviewMode)}
        >
          {(option.showContext ? MODES : MODES.slice(0, 1)).map(({ value, label }) => (
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
      </div>
      <div className="ug-render__viewport" hidden={mode !== 'component'}>
        <div className="ug-render__stage" ref={stageRef}>
          <div className="ug-render__fit" ref={setFit}>
            <Suspense fallback={null}>
              {fit && <StageHostContext.Provider value={fit}><Example /></StageHostContext.Provider>}
            </Suspense>
          </div>
        </div>
        {/* A sibling of the scrolling stage, not a child: inside it the highlight would count as scrollable overflow. */}
        <AnatomyOverlay rect={overlay} />
      </div>
      <ContextStage option={option} hidden={mode !== 'context'} anatomy={anatomy} hoveredPartId={mode === 'context' ? hoveredPartId : undefined} onAvailablePartsChange={onAvailablePartsChange} />
      {option.note && (
        <Type role="l3" as="p" color="muted" className="ug-render__note">
          {option.note}
        </Type>
      )}
    </section>
  );
}
