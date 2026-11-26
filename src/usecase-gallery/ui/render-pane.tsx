import { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { Button, ToggleGroup, Type } from '../kit';
import type { LayerStep, PreviewMode, Usecase, UsecaseOption } from '../types';
import { StageHostContext } from '../hooks/use-stage-host';
import type { AnatomyPart } from '../types';
import { AnatomyOverlay, usePreviewAnatomy } from '../hooks/use-preview-anatomy';
import { useStageFit } from '../hooks/use-stage-fit';
import { layerVisibilityCss } from '../hooks/use-layer-visibility';
import { OptionBar } from './option-bar';
const MODES: { value: PreviewMode; label: string }[] = [
  { value: 'component', label: 'Component' },
  { value: 'context', label: 'In context' },
];
function PreviewPlaceholder() {
  return <div className="ug-preview-placeholder" aria-hidden="true" />;
}

function LayerVisibilityStyles({ layers, layerIndex, enabled }: { layers: LayerStep[]; layerIndex: number; enabled: boolean }) {
  const css = useMemo(() => enabled ? layerVisibilityCss(layers, layerIndex) : '', [enabled, layers, layerIndex]);
  return css ? <style data-ug-layer-styles>{css}</style> : null;
}

/** The In context UI of a selection-based use case: the chosen option's scene with the example placed in it, in a stage of its own. */
function ContextStage({ option, hidden, anatomy, hoveredPartId, onAvailablePartsChange, layers, layerIndex, layerMode }: { option: UsecaseOption; hidden: boolean; anatomy: AnatomyPart[]; hoveredPartId?: string; onAvailablePartsChange: (partIds: string[]) => void; layers: LayerStep[]; layerIndex: number; layerMode: boolean }) {
  const [fit, setFit] = useState<HTMLDivElement | null>(null);
  const [contextHost, setContextHostState] = useState<HTMLDivElement | null>(null);
  const setContextHost = useCallback((node: HTMLDivElement | null) => setContextHostState((current) => current === node ? current : node), []);
  const [componentHost, setComponentHostState] = useState<HTMLDivElement | null>(null);
  const setComponentHost = useCallback((node: HTMLDivElement | null) => setComponentHostState((current) => current === node ? current : node), []);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { Example, Scene } = option;
  const scale = useStageFit(fit);
  const activeLayer = layerMode ? layers[layerIndex] : undefined;
  const layerPartId = activeLayer?.partId ?? activeLayer?.id.replace(/^context-/, '');
  const overlay = usePreviewAnatomy(stageRef, anatomy, !hidden && layerMode ? layerPartId : hoveredPartId, hidden ? undefined : onAvailablePartsChange, scale, !hidden);
  return (
    <div className="ug-render__viewport" hidden={hidden}>
      <div className="ug-render__stage" ref={stageRef}>
        <div className="ug-render__fit" ref={setFit} data-ug-layer-mode={layerMode && !hidden ? 'true' : undefined}>
          <LayerVisibilityStyles layers={layers} layerIndex={layerIndex} enabled={layerMode && !hidden} />
          <div ref={setContextHost} className="ug-render__component-portal-host" />
          <span data-ug-component-root style={{ display: 'contents' }}>
            <div ref={setComponentHost} className="ug-render__component-portal-host" />
          </span>
          {fit && (
            <Suspense fallback={<PreviewPlaceholder />}>
              {contextHost && componentHost && <Scene host={contextHost}>
                <span data-ug-component-root style={{ display: 'contents' }}>
                  <StageHostContext.Provider value={componentHost}><Example /></StageHostContext.Provider>
                </span>
              </Scene>}
            </Suspense>
          )}
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
  layers,
  layerIndex,
  layerMode,
}: {
  usecase: Usecase;
  option: UsecaseOption;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  anatomy: AnatomyPart[];
  hoveredPartId?: string;
  onAvailablePartsChange: (partIds: string[]) => void;
  onOptionChange: (id: string) => void;
  layers: LayerStep[];
  layerIndex: number;
  layerMode: boolean;
}) {
  const { Example } = option;
  const [fit, setFit] = useState<HTMLDivElement | null>(null);
  const [componentHost, setComponentHostState] = useState<HTMLDivElement | null>(null);
  const setComponentHost = useCallback((node: HTMLDivElement | null) => setComponentHostState((current) => current === node ? current : node), []);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const scale = useStageFit(fit);
  const activeLayer = layerMode && mode === 'component' ? layers[layerIndex] : undefined;
  const layerPartId = activeLayer?.partId ?? activeLayer?.id.replace(/^context-/, '');
  const overlay = usePreviewAnatomy(stageRef, anatomy, mode === 'component' ? (layerMode ? layerPartId : hoveredPartId) : undefined, mode === 'component' ? onAvailablePartsChange : undefined, scale, mode === 'component');
  return (
    <section className="ug-render ug-render--split" role="region" aria-label="Preview">
      <div className="ug-render__header">
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
        <OptionBar options={usecase.options} active={option} onChange={onOptionChange} />
      </div>
      <div className="ug-render__viewport" hidden={mode !== 'component'}>
        <div className="ug-render__stage" ref={stageRef}>
          <div className="ug-render__fit" ref={setFit} data-ug-layer-mode={layerMode && mode === 'component' ? 'true' : undefined}>
            <LayerVisibilityStyles layers={layers} layerIndex={layerIndex} enabled={layerMode && mode === 'component'} />
            {fit && (
              <span data-ug-component-root style={{ display: 'contents' }}>
                <div ref={setComponentHost} className="ug-render__component-portal-host" />
                <Suspense fallback={<PreviewPlaceholder />}>
                  {componentHost && <StageHostContext.Provider value={componentHost}><Example /></StageHostContext.Provider>}
                </Suspense>
              </span>
            )}
          </div>
        </div>
        {/* A sibling of the scrolling stage, not a child: inside it the highlight would count as scrollable overflow. */}
        <AnatomyOverlay rect={overlay} />
      </div>
      <ContextStage option={option} hidden={mode !== 'context'} anatomy={anatomy} hoveredPartId={mode === 'context' ? hoveredPartId : undefined} onAvailablePartsChange={onAvailablePartsChange} layers={layers} layerIndex={layerIndex} layerMode={layerMode} />
      {option.note && (
        <Type role="l3" as="p" color="muted" className="ug-render__note">
          {option.note}
        </Type>
      )}
    </section>
  );
}
