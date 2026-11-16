import { useState } from 'react';
import { catalog, allUsecases } from '../catalog/catalog';
import { useHashSelection } from '../hooks/use-hash-selection';
import { useMediaQuery } from '../hooks/use-media-query';
import { CodePane } from '../ui/code-pane';
import { DocsPane } from '../ui/docs-pane';
import { RenderPane } from '../ui/render-pane';
import { TreePane } from '../ui/tree-pane';
import type { PreviewMode } from '../types';
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
  const { selectedId } = useHashSelection(
    allUsecases.map((usecase) => usecase.id),
    allUsecases[0]?.id ?? '',
  );
  // The In context case is per use case: choosing another use case starts again at its first case.
  const [chosen, setChosen] = useState<{ usecaseId: string; caseId: string }>();
  if (chosen && chosen.usecaseId !== selectedId) setChosen(undefined);
  const usecase = allUsecases.find((candidate) => candidate.id === selectedId);
  if (!usecase) return null;
  const activeCase =
    usecase.cases?.find((candidate) => chosen?.usecaseId === usecase.id && candidate.id === chosen.caseId) ?? usecase.cases?.[0];

  const panes = {
    tree: <TreePane groups={catalog} selectedId={usecase.id} title={title} />,
    render: <RenderPane usecase={usecase} mode={mode} onModeChange={setMode} activeCase={activeCase} onCaseChange={(caseId) => setChosen({ usecaseId: usecase.id, caseId })} />,
    code: <CodePane key={`${usecase.id}-${mode}-${activeCase?.id}`} usecase={usecase} mode={mode} activeCase={activeCase} />,
    docs: <DocsPane usecase={usecase} />,
  };
  return (
    <div className="ug">
      {narrow ? <StackedLayout {...panes} /> : <ResizableLayout {...panes} />}
    </div>
  );
}
