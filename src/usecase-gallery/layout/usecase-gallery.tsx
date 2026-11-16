import { useState } from 'react';
import { catalog, allUsecases } from '../catalog/catalog';
import { appsWithUi, casesForApp } from '../catalog/app-views';
import { useHashSelection } from '../hooks/use-hash-selection';
import { useMediaQuery } from '../hooks/use-media-query';
import { DetailPane } from '../ui/detail-pane';
import { RenderPane } from '../ui/render-pane';
import { TreePane } from '../ui/tree-pane';
import type { AppKey } from '../apps';
import type { DetailMode, PreviewMode } from '../types';
import { ResizableLayout, StackedLayout } from './layouts';
import '../styles/gallery.scss';

/** Below this width the three resizable panes stack into one scrolling column. */
const NARROW = '(max-width: 840px)';

export interface UsecaseGalleryProps {
  /** Heading of the tree pane. */
  title?: string;
}

export function UsecaseGallery({ title = 'Use cases' }: UsecaseGalleryProps) {
  const narrow = useMediaQuery(NARROW);
  const [mode, setMode] = useState<PreviewMode>('component');
  // Kept across use cases: the reader who switched to Code stays on Code while browsing.
  const [detail, setDetail] = useState<DetailMode>('document');
  const { selectedId } = useHashSelection(
    allUsecases.map((usecase) => usecase.id),
    allUsecases[0]?.id ?? '',
  );
  // The In context app and case are per use case: choosing another use case starts again at its first app and case.
  const [chosen, setChosen] = useState<{ usecaseId: string; app?: AppKey; caseId?: string }>();
  if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  const usecase = allUsecases.find((candidate) => candidate.id === selectedId);
  if (!usecase) return null;
  const apps = appsWithUi(usecase);
  const activeApp = apps.find((key) => key === chosen?.app) ?? apps[0];
  const cases = casesForApp(usecase, apps.length > 1 ? activeApp : undefined);
  const activeCase = cases.find((candidate) => candidate.id === chosen?.caseId) ?? cases[0];

  const panes = {
    tree: <TreePane groups={catalog} selectedId={usecase.id} title={title} />,
    render: <RenderPane usecase={usecase} mode={mode} onModeChange={setMode} apps={apps} activeApp={activeApp} onAppChange={(app) => setChosen({ usecaseId: usecase.id, app })} cases={cases} activeCase={activeCase} onCaseChange={(caseId) => setChosen({ usecaseId: usecase.id, app: activeApp, caseId })} />,
    detail: <DetailPane usecase={usecase} detail={detail} onDetailChange={setDetail} mode={mode} activeCase={activeCase} />,
  };
  return (
    <div className="ug">
      {narrow ? <StackedLayout {...panes} /> : <ResizableLayout {...panes} />}
    </div>
  );
}
