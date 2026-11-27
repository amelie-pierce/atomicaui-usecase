import { Suspense, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Button, ToggleGroup, Type } from '../kit';
import type { LayerStep, PreviewMode, Usecase, UsecaseOption } from '../types';
import { StageHostContext } from '../hooks/use-stage-host';
import type { AnatomyPart } from '../types';
import { AnatomyOverlay, usePreviewAnatomy } from '../hooks/use-preview-anatomy';
import { useStageFit } from '../hooks/use-stage-fit';
import { footprintAttribute, layerSelector, layerTarget, layerVisibilityCss } from '../hooks/use-layer-visibility';
import { OptionBar } from './option-bar';
const MODES: { value: PreviewMode; label: string }[] = [
  { value: 'component', label: 'Component' },
  { value: 'context', label: 'In context' },
];
function PreviewPlaceholder() {
  return <div className="ug-preview-placeholder" aria-hidden="true" />;
}

function LayerVisibilityStyles({ layers, layerIndex, enabled }: { layers: LayerStep[]; layerIndex: number; enabled: boolean }) {
  const styleRef = useRef<HTMLStyleElement>(null);
  const active = layers[layerIndex];
  useLayoutEffect(() => {
    const fit = styleRef.current?.parentElement;
    if (!enabled || !active || !fit) return;
    const mark = () => {
      const targets = [...fit.querySelectorAll(layerTarget(active))];
      for (const target of targets) target.removeAttribute(footprintAttribute);
      for (const target of targets) {
        const { width, height } = target.getBoundingClientRect();
        const spacer = width > 0 && !target.firstChild;
        if ((!width || !height) && !spacer) target.setAttribute(footprintAttribute, '');
      }
    };
    mark();
    const observer = new MutationObserver(mark);
    observer.observe(fit, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      for (const target of fit.querySelectorAll(`[${footprintAttribute}]`)) target.removeAttribute(footprintAttribute);
    };
  }, [enabled, active]);
  const css = useMemo(() => enabled ? layerVisibilityCss(layers, layerIndex) : '', [enabled, layers, layerIndex]);
  return <style ref={styleRef} data-ug-layer-styles>{css}</style>;
}

const LAYER_PART_ID = 'ug-active-layer';

function withActiveLayerPart(anatomy: AnatomyPart[], layer: LayerStep | undefined): AnatomyPart[] {
  if (!layer) return anatomy;
  return [...anatomy, { id: LAYER_PART_ID, name: layer.title, description: layer.explanation, selector: layerSelector(layer), text: layer.text, scope: layer.scope ?? 'component' }];
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
  const overlayAnatomy = useMemo(() => withActiveLayerPart(anatomy, activeLayer), [anatomy, activeLayer]);
  const overlay = usePreviewAnatomy(stageRef, overlayAnatomy, !hidden && layerMode ? LAYER_PART_ID : hoveredPartId, hidden ? undefined : onAvailablePartsChange, scale, !hidden);
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
      <AnatomyOverlay rect={overlay} stepKey={layerMode ? activeLayer?.id : undefined} />
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
  const overlayAnatomy = useMemo(() => withActiveLayerPart(anatomy, activeLayer), [anatomy, activeLayer]);
  const overlay = usePreviewAnatomy(stageRef, overlayAnatomy, mode === 'component' ? (layerMode ? LAYER_PART_ID : hoveredPartId) : undefined, mode === 'component' ? onAvailablePartsChange : undefined, scale, mode === 'component');
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
        <AnatomyOverlay rect={overlay} stepKey={layerMode && mode === 'component' ? activeLayer?.id : undefined} />
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
