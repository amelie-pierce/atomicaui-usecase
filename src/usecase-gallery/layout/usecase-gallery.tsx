import { useState } from 'react';
import { catalog, allUsecases } from '../catalog/catalog';
import { caseTypes } from '../catalog/app-views';
import { useHashSelection } from '../hooks/use-hash-selection';
import { useMediaQuery } from '../hooks/use-media-query';
import { DetailPane } from '../ui/detail-pane';
import { RenderPane } from '../ui/render-pane';
import { TreePane } from '../ui/tree-pane';
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
  const [detail, setDetail] = useState<DetailMode>('code');
  const { selectedId } = useHashSelection(
    allUsecases.map((usecase) => usecase.id),
    allUsecases[0]?.id ?? '',
  );
  // The In context type and variant are per use case: choosing another use case starts again at its first type and variant.
  const [chosen, setChosen] = useState<{ usecaseId: string; type?: string; caseId?: string }>();
  if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  const usecase = allUsecases.find((candidate) => candidate.id === selectedId);
  if (!usecase) return null;
  const types = caseTypes(usecase);
  const activeType = types.find((candidate) => candidate.name === chosen?.type) ?? types[0];
  const activeCase = activeType?.cases.find((candidate) => candidate.id === chosen?.caseId) ?? activeType?.cases[0];
  // Switching type keeps the apps in view: pick the variant that covers one of the apps of the current one.
  const changeType = (name: string) => {
    const next = types.find((candidate) => candidate.name === name);
    const sameApp = next?.cases.find((candidate) => candidate.apps.some((app) => activeCase?.apps.includes(app)));
    setChosen({ usecaseId: usecase.id, type: name, caseId: sameApp?.id });
  };

  const panes = {
    tree: <TreePane groups={catalog} selectedId={usecase.id} title={title} />,
    render: <RenderPane usecase={usecase} mode={mode} onModeChange={setMode} types={types} activeType={activeType} onTypeChange={changeType} activeCase={activeCase} onCaseChange={(caseId) => setChosen({ usecaseId: usecase.id, type: activeType?.name, caseId })} />,
    detail: <DetailPane usecase={usecase} detail={detail} onDetailChange={setDetail} mode={mode} activeCase={activeCase} />,
  };
  return (
    <div className="ug">
      {narrow ? <StackedLayout {...panes} /> : <ResizableLayout {...panes} />}
    </div>
  );
}
