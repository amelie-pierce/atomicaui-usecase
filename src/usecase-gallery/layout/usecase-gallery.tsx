import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { catalog, allUsecases, componentAliases } from '../catalog/catalog';
import { withOption } from '../catalog/app-views';
import { useRoute } from '../hooks/use-route';
import { useMediaQuery } from '../hooks/use-media-query';
import { DetailPane } from '../ui/detail-pane';
import { DetailToolbar } from '../ui/detail-toolbar';
import { RenderPane } from '../ui/render-pane';
import { TreePane } from '../ui/tree-pane';
import type { DocumentMode, PreviewMode } from '../types';
import { DetailLayout, StackedLayout } from './layouts';
import '../styles/gallery.scss';

/** Below this width the preview and detail columns stack into one scrolling column. */
const NARROW = '(max-width: 840px)';

export interface UsecaseGalleryProps {
  /** Heading shown above the gallery tree. */
  title?: string;
}

export function UsecaseGallery({ title = 'Use cases' }: UsecaseGalleryProps) {
  const narrow = useMediaQuery(NARROW);
  const route = useRoute(catalog, componentAliases);
  const [interactedPart, setInteractedPart] = useState<{ id: string; source: 'hover' | 'focus' }>();
  const [availableParts, setAvailableParts] = useState<{ key: string; ids: string[] }>();
  const [selectedPart, setSelectedPart] = useState<{ usecaseId: string; partId: string }>();
  const selectedId = route.usecaseId;
  const selectedPartId = selectedPart?.usecaseId === selectedId ? selectedPart.partId : undefined;
  const [chosen, setChosen] = useState<{ usecaseId: string; optionId?: string }>();
  const [viewMode, setViewMode] = useState<PreviewMode>('component');
  const [documentMode, setDocumentMode] = useState<DocumentMode>('document');
  const [layerIndex, setLayerIndex] = useState(0);
  const chosenForRoute = chosen?.usecaseId === selectedId ? chosen : undefined;
  const original = allUsecases.find((candidate) => candidate.id === selectedId);
  const group = catalog.find((candidate) => candidate.id === original?.componentId);
  const resolved = useMemo(() => original && group ? withOption(original, chosenForRoute?.optionId) : undefined, [original, group, chosenForRoute?.optionId]);
  const usecase = resolved?.usecase;
  const option = resolved?.option;
  const activeMode = option?.showContext ? viewMode : 'component';
  const componentAnatomy = usecase?.anatomy ?? [];
  const componentLayers = usecase?.layers ?? [];
  const anatomy = useMemo(() => activeMode === 'context'
    ? [
      ...componentAnatomy.map((part) => ({ ...part, scope: 'component' as const })),
      ...(option?.contextAnatomy ?? []).map((part) => ({ ...part, scope: 'context' as const })),
    ]
    : componentAnatomy, [activeMode, usecase?.id, option?.id, componentAnatomy]);
  const activePartId = interactedPart?.id ?? selectedPartId;
  const previewKey = `${selectedId}:${option?.id ?? ''}`;
  const activePreviewKey = `${previewKey}:${activeMode}`;
  const availablePartIds = availableParts?.key === activePreviewKey ? availableParts.ids : undefined;
  const authoredLayers = activeMode === 'context' ? [...(option?.contextLayers ?? []), ...componentLayers] : componentLayers;
  const anatomyIds = new Set(anatomy.map((part) => part.id));
  const layers = availablePartIds ? authoredLayers.filter((step) => {
    const partId = step.partId ?? step.id.replace(/^context-/, '');
    return !anatomyIds.has(partId) || availablePartIds.includes(partId);
  }) : authoredLayers;
  const activeLayerIndex = Math.min(layerIndex, Math.max(0, layers.length - 1));
  const visibleLayerIndex = Math.max(0, authoredLayers.indexOf(layers[activeLayerIndex]));
  useEffect(() => {
    if (selectedPart && selectedPart.usecaseId !== selectedId) setSelectedPart(undefined);
    if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  }, [chosen, selectedId, selectedPart]);
  useEffect(() => {
    setInteractedPart(undefined);
  }, [previewKey, activeMode]);
  useEffect(() => {
    setLayerIndex(0);
  }, [previewKey, activeMode]);
  useEffect(() => {
    setLayerIndex((index) => Math.min(index, Math.max(0, layers.length - 1)));
  }, [layers.length]);
  const onPartChange = useCallback((partId: string | undefined, expectedPartId?: string, source: 'hover' | 'focus' = 'hover') => {
    setInteractedPart((current) => {
      if (partId) return { id: partId, source };
      if (current?.source !== source) return current;
      return expectedPartId && current.id !== expectedPartId ? current : undefined;
    });
  }, []);
  const onSelectPart = useCallback((partId: string) => {
    if (window.matchMedia('(pointer: coarse)').matches) setSelectedPart((current) => current?.partId === partId ? undefined : { usecaseId: selectedId, partId });
    requestAnimationFrame(() => document.getElementById(`anatomy-${partId}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  }, [selectedId]);
  const onLayerChange = useCallback((index: number) => setLayerIndex(index), []);
  const onAvailablePartsChange = useCallback((ids: string[]) => setAvailableParts({ key: activePreviewKey, ids }), [activePreviewKey]);
  if (!original || !group || !usecase) return null;
  // The option change is a transition: the shown UI stays until the next option's lazy example has loaded, so the stage never blanks.
  const panes = {
    render: <RenderPane usecase={usecase} option={option} mode={activeMode} onModeChange={(next) => { setViewMode(next); setLayerIndex(0); }} anatomy={anatomy} hoveredPartId={activePartId} onAvailablePartsChange={onAvailablePartsChange} onOptionChange={(optionId) => { setLayerIndex(0); startTransition(() => setChosen({ ...chosenForRoute, usecaseId: usecase.id, optionId })); }} layers={authoredLayers} layerIndex={visibleLayerIndex} layerMode={documentMode === 'layers'} />,
    detail: <DetailPane usecase={usecase} option={option} mode={activeMode} componentName={group.title} hoveredPartId={activePartId} availablePartIds={availablePartIds} onPartChange={onPartChange} onSelectPart={onSelectPart} documentMode={documentMode} onDocumentModeChange={(next) => { setDocumentMode(next); setLayerIndex(0); }} layers={layers} layerIndex={activeLayerIndex} onLayerChange={onLayerChange} />,
  };
  return (
    <div className="ug ug--usecase">
      <DetailToolbar usecase={usecase} option={option} />
      <div className="ug__body">
        <div className="ug-gallery-shell">
          <TreePane groups={catalog} activeComponentId={group.id} activeUsecase={original} title={title} familyCount={catalog.length + Object.keys(componentAliases).length} />
          {narrow ? <StackedLayout {...panes} /> : <DetailLayout {...panes} />}
        </div>
      </div>
    </div>
  );
}
