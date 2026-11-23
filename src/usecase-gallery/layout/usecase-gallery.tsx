import { useCallback, useEffect, useMemo, useState } from 'react';
import { catalog, allUsecases, componentAliases } from '../catalog/catalog';
import { caseTypes, withLook } from '../catalog/app-views';
import { COMPONENTS_HASH, componentHash, useRoute } from '../hooks/use-route';
import { useMediaQuery } from '../hooks/use-media-query';
import { ComponentPage } from '../ui/component-page';
import { ComponentsPage } from '../ui/components-page';
import { DetailPane } from '../ui/detail-pane';
import { DetailToolbar } from '../ui/detail-toolbar';
import { RenderPane } from '../ui/render-pane';
import { anatomyFor } from '../ui/anatomy';
import type { DetailMode, PreviewMode } from '../types';
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
  const [mode, setMode] = useState<PreviewMode>('component');
  // Kept across use cases: the reader who switched to Code stays on Code while browsing.
  const [detail, setDetail] = useState<DetailMode>('code');
  const [hoveredPartId, setHoveredPartId] = useState<string>();
  const [focusedPartId, setFocusedPartId] = useState<string>();
  const [availableParts, setAvailableParts] = useState<{ key: string; ids: string[] }>();
  const [selectedPart, setSelectedPart] = useState<{ usecaseId: string; partId: string }>();
  const selectedId = route.page === 'usecase' ? route.usecaseId : '';
  const selectedPartId = selectedPart?.usecaseId === selectedId ? selectedPart.partId : undefined;
  // The In context type, variant and the look are per use case: choosing another use case starts again at its first.
  const [chosen, setChosen] = useState<{ usecaseId: string; type?: string; caseId?: string; look?: string }>();
  const chosenForRoute = chosen?.usecaseId === selectedId ? chosen : undefined;
  const original = allUsecases.find((candidate) => candidate.id === selectedId);
  const group = catalog.find((candidate) => candidate.id === original?.componentId);
  const usecase = original && group ? withLook(original, chosenForRoute?.look) : undefined;
  const anatomy = useMemo(() => usecase ? anatomyFor(usecase) : [], [usecase?.id, usecase?.look]);
  const activePartId = focusedPartId ?? hoveredPartId ?? selectedPartId;
  const types = usecase ? caseTypes(usecase) : [];
  const activeType = types.find((candidate) => candidate.name === chosenForRoute?.type) ?? types[0];
  const activeCase = activeType?.cases.find((candidate) => candidate.id === chosenForRoute?.caseId) ?? activeType?.cases[0];
  const previewKey = `${selectedId}:${mode}:${activeCase?.id ?? ''}:${usecase?.look ?? ''}`;
  useEffect(() => {
    if (selectedPart && selectedPart.usecaseId !== selectedId) setSelectedPart(undefined);
    if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  }, [chosen, selectedId, selectedPart]);
  useEffect(() => {
    setHoveredPartId(undefined);
    setFocusedPartId(undefined);
  }, [previewKey]);
  const onPartChange = useCallback((partId: string | undefined, expectedPartId?: string, source: 'hover' | 'focus' = 'hover') => {
    const setPart = source === 'focus' ? setFocusedPartId : setHoveredPartId;
    setPart((current) => expectedPartId && current !== expectedPartId ? current : partId);
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
  // The look chosen in the preview decides the example, the apps and the cases every pane shows.
  // Switching type keeps the apps in view: pick the variant that covers one of the apps of the current one.
  const changeType = (name: string) => {
    const next = types.find((candidate) => candidate.name === name);
    const sameApp = next?.cases.find((candidate) => candidate.apps.some((app) => activeCase?.apps.includes(app)));
    setChosen({ ...chosenForRoute, usecaseId: usecase.id, type: name, caseId: sameApp?.id });
  };

  const panes = {
    render: <RenderPane usecase={usecase} looks={original.looks} onLookChange={(look) => setChosen({ ...chosenForRoute, usecaseId: usecase.id, look })} mode={mode} onModeChange={setMode} types={types} activeType={activeType} onTypeChange={changeType} activeCase={activeCase} onCaseChange={(caseId) => setChosen({ ...chosenForRoute, usecaseId: usecase.id, type: activeType?.name, caseId })} anatomy={anatomy} hoveredPartId={activePartId} onPartChange={onPartChange} onAvailablePartsChange={onAvailablePartsChange} />,
    detail: <DetailPane usecase={usecase} componentName={group.title} detail={detail} onDetailChange={setDetail} mode={mode} activeCase={activeCase} hoveredPartId={activePartId} availablePartIds={availableParts?.key === previewKey ? availableParts.ids : undefined} onPartChange={onPartChange} onSelectPart={onSelectPart} />,
  };
  return (
    <div className="ug ug--usecase">
      <DetailToolbar crumbs={[{ label: 'Components', href: COMPONENTS_HASH }, { label: group.title, href: componentHash(group.id) }, { label: usecase.id }]} usecase={usecase} mode={mode} activeCase={activeCase} />
      <div className="ug__body">
        {narrow ? <StackedLayout {...panes} /> : <DetailLayout {...panes} />}
      </div>
    </div>
  );
}
