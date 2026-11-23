import { useCallback, useEffect, useMemo, useState } from 'react';
import { catalog, allUsecases, componentAliases } from '../catalog/catalog';
import { caseTypes, withLook, withOption } from '../catalog/app-views';
import { COMPONENTS_HASH, componentHash, useRoute } from '../hooks/use-route';
import { useMediaQuery } from '../hooks/use-media-query';
import { ComponentPage } from '../ui/component-page';
import { ComponentsPage } from '../ui/components-page';
import { DetailPane } from '../ui/detail-pane';
import { DetailToolbar } from '../ui/detail-toolbar';
import { OptionBar } from '../ui/option-bar';
import { RenderPane } from '../ui/render-pane';
import { anatomyFor } from '../ui/anatomy';
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
  // The In context type, variant and the look are per use case: choosing another use case starts again at its first.
  const [chosen, setChosen] = useState<{ usecaseId: string; type?: string; caseId?: string; look?: string; optionId?: string }>();
  const chosenForRoute = chosen?.usecaseId === selectedId ? chosen : undefined;
  const original = allUsecases.find((candidate) => candidate.id === selectedId);
  const group = catalog.find((candidate) => candidate.id === original?.componentId);
  // A selection-based use case (`options`) follows its chosen option instead of the look and the case: one control picks them all.
  const looked = original && group ? withLook(original, chosenForRoute?.look) : undefined;
  const { usecase, option } = looked ? withOption(looked, chosenForRoute?.optionId) : { usecase: undefined, option: undefined };
  const anatomy = useMemo(() => usecase ? anatomyFor(usecase) : [], [usecase?.id, usecase?.look]);
  const activePartId = interactedPart?.id ?? selectedPartId;
  const types = usecase ? caseTypes(usecase) : [];
  const activeType = types.find((candidate) => candidate.name === chosenForRoute?.type) ?? types[0];
  const activeCase = option ?? activeType?.cases.find((candidate) => candidate.id === chosenForRoute?.caseId) ?? activeType?.cases[0];
  const previewKey = `${selectedId}:${activeCase?.id ?? ''}:${usecase?.look ?? ''}`;
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
  // The look chosen in the preview decides the example, the apps and the cases every pane shows.
  // Switching type keeps the apps in view: pick the variant that covers one of the apps of the current one.
  const changeType = (name: string) => {
    const next = types.find((candidate) => candidate.name === name);
    const sameApp = next?.cases.find((candidate) => candidate.apps.some((app) => activeCase?.apps.includes(app)));
    setChosen({ ...chosenForRoute, usecaseId: usecase.id, type: name, caseId: sameApp?.id });
  };

  const panes = {
    render: <RenderPane usecase={usecase} looks={original.looks} onLookChange={(look) => setChosen({ ...chosenForRoute, usecaseId: usecase.id, look })} types={types} activeType={activeType} onTypeChange={changeType} activeCase={activeCase} onCaseChange={(caseId) => setChosen({ ...chosenForRoute, usecaseId: usecase.id, type: activeType?.name, caseId })} anatomy={anatomy} hoveredPartId={activePartId} onPartChange={onPartChange} onAvailablePartsChange={onAvailablePartsChange} />,
    detail: <DetailPane usecase={usecase} componentName={group.title} activeCase={activeCase} hoveredPartId={activePartId} availablePartIds={availableParts?.key === previewKey ? availableParts.ids : undefined} onPartChange={onPartChange} onSelectPart={onSelectPart} />,
  };
  return (
    <div className="ug ug--usecase">
      <DetailToolbar crumbs={[{ label: 'Components', href: COMPONENTS_HASH }, { label: group.title, href: componentHash(group.id) }, { label: usecase.id }]} usecase={usecase} activeCase={activeCase} />
      {usecase.options && <OptionBar options={usecase.options} active={option} onChange={(optionId) => setChosen({ ...chosenForRoute, usecaseId: usecase.id, optionId })} />}
      <div className="ug__body">
        {narrow ? <StackedLayout {...panes} /> : <DetailLayout {...panes} />}
      </div>
    </div>
  );
}
