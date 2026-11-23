import type { Usecase, UsecaseCase } from '../types';
import { DocsPane } from './docs-pane';

/** The complete use-case document, including its code/API section. */
export function DetailPane({
  usecase,
  componentName,
  activeCase,
  hoveredPartId,
  availablePartIds,
  onPartChange,
  onSelectPart,
}: {
  usecase: Usecase;
  componentName: string;
  activeCase?: UsecaseCase;
  hoveredPartId?: string;
  availablePartIds?: string[];
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void;
  onSelectPart: (partId: string) => void;
}) {
  return (
    <section className="ug-detail" role="region" aria-label="Documentation">
      <DocsPane usecase={usecase} componentName={componentName} activeCase={activeCase} hoveredPartId={hoveredPartId} availablePartIds={availablePartIds} onPartChange={onPartChange} onSelectPart={onSelectPart} />
    </section>
  );
}
