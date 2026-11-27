import { startTransition, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { catalog, allUsecases, componentAliases } from '../catalog/catalog';
import { withOption } from '../catalog/app-views';
import { anatomyLayers } from '../catalog/anatomy-layers';
import { useRoute } from '../hooks/use-route';
import { useMediaQuery } from '../hooks/use-media-query';
import { DetailPane } from '../ui/detail-pane';
import { DetailToolbar } from '../ui/detail-toolbar';
import { RenderPane } from '../ui/render-pane';
import { TreePane } from '../ui/tree-pane';
import type { ComponentGroup, DocumentMode, PreviewMode } from '../types';
import { DetailLayout, StackedLayout } from './layouts';
import '../styles/gallery.scss';

/** Below this width the preview and detail columns stack into one scrolling column. */
const NARROW = '(max-width: 840px)';

const TREE_COLLAPSED_KEY = 'atomicaui-usecase-tree-collapsed';

function readTreeCollapsed() {
  try { return window.sessionStorage.getItem(TREE_COLLAPSED_KEY) === 'true'; } catch { return false; }
}

function filterGroups(groups: ComponentGroup[], query: string) {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return groups;
  return groups.flatMap((group) => {
    const componentMatches = group.title.toLocaleLowerCase().includes(term);
    const uiTypeGroups = group.uiTypeGroups.flatMap((type) => {
      const usecases = componentMatches ? type.usecases : type.usecases.filter((usecase) =>
        [usecase.id, usecase.title, usecase.summary].some((value) => value.toLocaleLowerCase().includes(term)),
      );
      return usecases.length ? [{ ...type, usecases }] : [];
    });
    return uiTypeGroups.length ? [{ ...group, uiTypeGroups }] : [];
  });
}

export function UsecaseGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const narrow = useMediaQuery(NARROW);
  const route = useRoute(catalog, componentAliases);
  const [searchQuery, setSearchQuery] = useState('');
  const [treeCollapsed, setTreeCollapsed] = useState(readTreeCollapsed);
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
  const visibleGroups = useMemo(() => filterGroups(catalog, searchQuery), [searchQuery]);
  const firstSearchMatch = visibleGroups[0]?.uiTypeGroups[0]?.usecases[0];
  const setTreeCollapsedForSession = useCallback((next: boolean) => {
    setTreeCollapsed(next);
    try { window.sessionStorage.setItem(TREE_COLLAPSED_KEY, String(next)); } catch { /* Storage can be disabled by the browser. */ }
  }, []);
  const onTreePanelResize = useCallback((size: { asPercentage: number; inPixels: number }) => {
    const next = size.asPercentage <= 0.01;
    if (next === treeCollapsed) return;
    setTreeCollapsed(next);
    try { window.sessionStorage.setItem(TREE_COLLAPSED_KEY, String(next)); } catch { /* Storage can be disabled by the browser. */ }
  }, [treeCollapsed]);
  const activeMode = option?.showContext ? viewMode : 'component';
  const componentAnatomy = usecase?.anatomy ?? [];
  const anatomy = useMemo(() => activeMode === 'context'
    ? [
      ...(option?.contextAnatomy ?? []).map((part) => ({ ...part, scope: 'context' as const })),
      ...componentAnatomy.map((part) => ({ ...part, scope: 'scene' as const })),
    ]
    : componentAnatomy, [activeMode, usecase?.id, option?.id, componentAnatomy]);
  const activePartId = interactedPart?.id ?? selectedPartId;
  const previewKey = `${selectedId}:${option?.id ?? ''}`;
  const activePreviewKey = `${previewKey}:${activeMode}`;
  const availablePartIds = availableParts?.key === activePreviewKey ? availableParts.ids : undefined;
  const orderedAnatomy = useMemo(() => {
    if (!availablePartIds) return anatomy;
    const rank = new Map(availablePartIds.map((id, index) => [id, index]));
    return [...anatomy].sort((a, b) => (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER));
  }, [anatomy, availablePartIds]);
  const allLayers = useMemo(() => anatomyLayers(orderedAnatomy, activeMode === 'context' ? 'context' : 'component'), [orderedAnatomy, activeMode]);
  const layers = availablePartIds
    ? allLayers.filter((step) => availablePartIds.includes(step.partId ?? step.id))
    : allLayers;
  const activeLayerIndex = Math.min(layerIndex, Math.max(0, layers.length - 1));
  const visibleLayerIndex = Math.max(0, allLayers.indexOf(layers[activeLayerIndex]));
  useLayoutEffect(() => {
    const root = galleryRef.current;
    const toolbar = root?.querySelector<HTMLElement>('.ug-toolbar');
    if (!root || !toolbar) return;
    const updateToolbarHeight = () => root.style.setProperty('--ug-toolbar-height', `${toolbar.getBoundingClientRect().height}px`);
    updateToolbarHeight();
    const observer = new ResizeObserver(updateToolbarHeight);
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, [narrow]);
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
  const onAvailablePartsChange = useCallback((ids: string[]) => setAvailableParts((current) =>
    current?.key === activePreviewKey && current.ids.length === ids.length && current.ids.every((id, index) => id === ids[index])
      ? current
      : { key: activePreviewKey, ids },
  ), [activePreviewKey]);
  if (!original || !group || !usecase) return null;
  // The option change is a transition: the shown UI stays until the next option's lazy example has loaded, so the stage never blanks.
  const panes = {
    toolbar: <DetailToolbar treeCollapsed={treeCollapsed} onTreeToggle={() => setTreeCollapsedForSession(!treeCollapsed)} searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={() => { if (searchQuery.trim() && firstSearchMatch) window.location.hash = `#/${encodeURIComponent(firstSearchMatch.componentId)}/${encodeURIComponent(firstSearchMatch.id)}`; }} panelMode={!narrow} />,
    tree: <TreePane groups={visibleGroups} activeComponentId={group.id} activeUsecase={original} collapsed={treeCollapsed} searchActive={Boolean(searchQuery.trim())} />,
    render: <RenderPane usecase={usecase} option={option} mode={activeMode} onModeChange={(next) => { setViewMode(next); setLayerIndex(0); }} anatomy={orderedAnatomy} hoveredPartId={activePartId} onAvailablePartsChange={onAvailablePartsChange} onOptionChange={(optionId) => { setLayerIndex(0); startTransition(() => setChosen({ ...chosenForRoute, usecaseId: usecase.id, optionId })); }} layers={allLayers} layerIndex={visibleLayerIndex} layerMode={documentMode === 'layers'} />,
    detail: <DetailPane usecase={usecase} option={option} mode={activeMode} componentName={group.title} hoveredPartId={activePartId} availablePartIds={availablePartIds} onPartChange={onPartChange} onSelectPart={onSelectPart} documentMode={documentMode} onDocumentModeChange={(next) => { setDocumentMode(next); setLayerIndex(0); }} layers={layers} layerIndex={activeLayerIndex} onLayerChange={onLayerChange} />,
  };
  return (
    <div ref={galleryRef} className="ug ug--usecase">
      <div className="ug__body">
        {narrow ? <StackedLayout {...panes} /> : <DetailLayout {...panes} treeCollapsed={treeCollapsed} onTreePanelResize={onTreePanelResize} />}
      </div>
    </div>
  );
}
