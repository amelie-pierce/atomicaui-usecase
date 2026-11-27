import type { DocumentMode, LayerStep, PreviewMode, Usecase, UsecaseOption } from '../types';
import { DocsPane } from './docs-pane';

/** The complete use-case document, including its code/API section. */
export function DetailPane({
  usecase,
  componentName,
  option,
  mode,
  hoveredPartId,
  availablePartIds,
  onPartChange,
  onSelectPart,
  documentMode,
  onDocumentModeChange,
  layerIndex,
  layers,
}: {
  usecase: Usecase;
  componentName: string;
  option: UsecaseOption;
  mode: PreviewMode;
  hoveredPartId?: string;
  availablePartIds?: string[];
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void;
  onSelectPart: (partId: string) => void;
  documentMode: DocumentMode;
  onDocumentModeChange: (mode: DocumentMode) => void;
  layerIndex: number;
  layers: LayerStep[];
}) {
  return (
    <section className="ug-detail" role="region" aria-label="Documentation">
      <DocsPane usecase={usecase} option={option} mode={mode} componentName={componentName} hoveredPartId={hoveredPartId} availablePartIds={availablePartIds} onPartChange={onPartChange} onSelectPart={onSelectPart} documentMode={documentMode} onDocumentModeChange={onDocumentModeChange} layerIndex={layerIndex} layers={layers} />
    </section>
  );
}
