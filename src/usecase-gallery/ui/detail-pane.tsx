import type { Usecase, UsecaseOption } from '../types';
import { OptionBar } from './option-bar';
import { DocsPane } from './docs-pane';

/** The complete use-case document, including its code/API section. */
export function DetailPane({
  usecase,
  componentName,
  option,
  hoveredPartId,
  availablePartIds,
  onPartChange,
  onSelectPart,
  onOptionChange,
}: {
  usecase: Usecase;
  componentName: string;
  option: UsecaseOption;
  hoveredPartId?: string;
  availablePartIds?: string[];
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void;
  onSelectPart: (partId: string) => void;
  onOptionChange: (id: string) => void;
}) {
  return (
    <section className="ug-detail" role="region" aria-label="Documentation">
      <OptionBar options={usecase.options} active={option} onChange={onOptionChange} />
      <DocsPane usecase={usecase} option={option} componentName={componentName} hoveredPartId={hoveredPartId} availablePartIds={availablePartIds} onPartChange={onPartChange} onSelectPart={onSelectPart} />
    </section>
  );
}
