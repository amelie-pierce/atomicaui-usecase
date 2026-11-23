import { useState } from 'react';
import { catalog, allUsecases, componentAliases } from '../catalog/catalog';
import { caseTypes, withLook } from '../catalog/app-views';
import { COMPONENTS_HASH, componentHash, useRoute } from '../hooks/use-route';
import { useMediaQuery } from '../hooks/use-media-query';
import { Breadcrumb } from '../ui/breadcrumb';
import { ComponentPage } from '../ui/component-page';
import { ComponentsPage } from '../ui/components-page';
import { DetailPane } from '../ui/detail-pane';
import { RenderPane } from '../ui/render-pane';
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
  const selectedId = route.page === 'usecase' ? route.usecaseId : '';
  // The In context type, variant and the look are per use case: choosing another use case starts again at its first.
  const [chosen, setChosen] = useState<{ usecaseId: string; type?: string; caseId?: string; look?: string }>();
  if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  if (route.page === 'components') return <div className="ug"><ComponentsPage groups={catalog} title={title} /></div>;
  if (route.page === 'component') {
    const group = catalog.find((candidate) => candidate.id === route.componentId);
    return group ? <div className="ug"><ComponentPage group={group} /></div> : null;
  }
  const original = allUsecases.find((candidate) => candidate.id === selectedId);
  const group = catalog.find((candidate) => candidate.id === original?.componentId);
  if (!original || !group) return null;
  // The look chosen in the preview decides the example, the apps and the cases every pane shows.
  const usecase = withLook(original, chosen?.look);
  const types = caseTypes(usecase);
  const activeType = types.find((candidate) => candidate.name === chosen?.type) ?? types[0];
  const activeCase = activeType?.cases.find((candidate) => candidate.id === chosen?.caseId) ?? activeType?.cases[0];
  // Switching type keeps the apps in view: pick the variant that covers one of the apps of the current one.
  const changeType = (name: string) => {
    const next = types.find((candidate) => candidate.name === name);
    const sameApp = next?.cases.find((candidate) => candidate.apps.some((app) => activeCase?.apps.includes(app)));
    setChosen({ ...chosen, usecaseId: usecase.id, type: name, caseId: sameApp?.id });
  };

  const panes = {
    render: <RenderPane usecase={usecase} looks={original.looks} onLookChange={(look) => setChosen({ usecaseId: usecase.id, look })} mode={mode} onModeChange={setMode} types={types} activeType={activeType} onTypeChange={changeType} activeCase={activeCase} onCaseChange={(caseId) => setChosen({ ...chosen, usecaseId: usecase.id, type: activeType?.name, caseId })} />,
    detail: <DetailPane usecase={usecase} detail={detail} onDetailChange={setDetail} mode={mode} activeCase={activeCase} />,
  };
  return (
    <div className="ug ug--usecase">
      <Breadcrumb crumbs={[{ label: 'Components', href: COMPONENTS_HASH }, { label: group.title, href: componentHash(group.id) }, { label: usecase.id }]} />
      <div className="ug__body">
        {narrow ? <StackedLayout {...panes} /> : <DetailLayout {...panes} />}
      </div>
    </div>
  );
}
