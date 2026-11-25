import { useCallback, useEffect, useMemo, useState } from 'react';
import { catalog, allUsecases, componentAliases } from '../catalog/catalog';
import { withOption } from '../catalog/app-views';
import { COMPONENTS_HASH, componentHash, useRoute } from '../hooks/use-route';
import { useMediaQuery } from '../hooks/use-media-query';
import { ComponentPage } from '../ui/component-page';
import { ComponentsPage } from '../ui/components-page';
import { DetailPane } from '../ui/detail-pane';
import { DetailToolbar } from '../ui/detail-toolbar';
import { RenderPane } from '../ui/render-pane';
import { DetailLayout, StackedLayout } from './layouts';
import '../styles/gallery.scss';

/** Below this width the preview and detail columns stack into one scrolling column. */
const NARROW = '(max-width: 840px)';

export interface UsecaseGalleryProps {
  /** Heading of the gallery site pages. */
  title?: string;
}

export function UsecaseGallery({ title = 'Use cases' }: UsecaseGalleryProps) {
  const narrow = useMediaQuery(NARROW);
  const route = useRoute(catalog.map((group) => group.id), allUsecases.map((usecase) => usecase.id), componentAliases);
  const [interactedPart, setInteractedPart] = useState<{ id: string; source: 'hover' | 'focus' }>();
  const [availableParts, setAvailableParts] = useState<{ key: string; ids: string[] }>();
  const [selectedPart, setSelectedPart] = useState<{ usecaseId: string; partId: string }>();
  const selectedId = route.page === 'usecase' ? route.usecaseId : '';
  const selectedPartId = selectedPart?.usecaseId === selectedId ? selectedPart.partId : undefined;
  const [chosen, setChosen] = useState<{ usecaseId: string; optionId?: string }>();
  const chosenForRoute = chosen?.usecaseId === selectedId ? chosen : undefined;
  const original = allUsecases.find((candidate) => candidate.id === selectedId);
  const group = catalog.find((candidate) => candidate.id === original?.componentId);
  const resolved = original && group ? withOption(original, chosenForRoute?.optionId) : undefined;
  const usecase = resolved?.usecase;
  const option = resolved?.option;
  const anatomy = useMemo(() => usecase?.anatomy ?? [], [usecase?.id, option?.id]);
  const activePartId = interactedPart?.id ?? selectedPartId;
  const previewKey = `${selectedId}:${option?.id ?? ''}`;
  useEffect(() => {
    if (selectedPart && selectedPart.usecaseId !== selectedId) setSelectedPart(undefined);
    if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  }, [chosen, selectedId, selectedPart]);
  useEffect(() => {
    setInteractedPart(undefined);
  }, [previewKey]);
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
  const onAvailablePartsChange = useCallback((ids: string[]) => setAvailableParts({ key: previewKey, ids }), [previewKey]);
  if (route.page === 'components') return <div className="ug"><ComponentsPage groups={catalog} title={title} /></div>;
  if (route.page === 'component') {
    const group = catalog.find((candidate) => candidate.id === route.componentId);
    return group ? <div className="ug"><ComponentPage group={group} /></div> : null;
  }
  if (!original || !group || !usecase) return null;
  const panes = {
    render: <RenderPane usecase={usecase} option={option} anatomy={anatomy} hoveredPartId={activePartId} onAvailablePartsChange={onAvailablePartsChange} onOptionChange={(optionId) => setChosen({ ...chosenForRoute, usecaseId: usecase.id, optionId })} />,
    detail: <DetailPane usecase={usecase} option={option} componentName={group.title} hoveredPartId={activePartId} availablePartIds={availableParts?.key === previewKey ? availableParts.ids : undefined} onPartChange={onPartChange} onSelectPart={onSelectPart} />,
  };
  return (
    <div className="ug ug--usecase">
      <DetailToolbar crumbs={[{ label: 'Components', href: COMPONENTS_HASH }, { label: group.title, href: componentHash(group.id) }, { label: usecase.id }]} usecase={usecase} option={option} />
      <div className="ug__body">
        {narrow ? <StackedLayout {...panes} /> : <DetailLayout {...panes} />}
      </div>
    </div>
  );
}
