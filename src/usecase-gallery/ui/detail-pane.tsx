import { Button, ToggleGroup } from '../kit';
import type { DetailMode, PreviewMode, Usecase, UsecaseCase } from '../types';
import { CodePane } from './code-pane';
import { DocsPane } from './docs-pane';

const DETAILS: { value: DetailMode; label: string }[] = [
  { value: 'document', label: 'Document' },
  { value: 'code', label: 'Code' },
];

/** The right pane: the copyable code by default, the use case documentation on the toggle. */
export function DetailPane({
  usecase,
  componentName,
  detail,
  onDetailChange,
  mode,
  activeCase,
  bothUis,
  hoveredPartId,
  availablePartIds,
  onPartChange,
  onSelectPart,
}: {
  usecase: Usecase;
  componentName: string;
  detail: DetailMode;
  onDetailChange: (detail: DetailMode) => void;
  mode: PreviewMode;
  activeCase?: UsecaseCase;
  /** A selection-based use case: the Code view shows the Component UI and the In context UI of the chosen option. */
  bothUis?: boolean;
  hoveredPartId?: string;
  availablePartIds?: string[];
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void;
  onSelectPart: (partId: string) => void;
}) {
  return (
    <section className="ug-detail" role="region" aria-label={detail === 'code' ? 'Code' : 'Documentation'}>
      <ToggleGroup
        className="ug-detail__toggle"
        aria-label="Right pane"
        value={[detail]}
        // Pressing the active segment would clear the group; keep one view selected.
        onValueChange={([next]) => next && onDetailChange(next as DetailMode)}
      >
        {DETAILS.map(({ value, label }) => (
          <ToggleGroup.Item
            key={value}
            value={value}
            render={(props, { pressed }) => (
              <Button {...props} aui={{ scale: 'sm', color: pressed ? 'primary' : 'secondary', paint: pressed ? 'solid' : 'text' }}>
                {label}
              </Button>
            )}
          />
        ))}
      </ToggleGroup>
      {detail === 'code' ? (
        <CodePane key={`${usecase.id}-${mode}-${activeCase?.id}`} usecase={usecase} mode={mode} activeCase={activeCase} bothUis={bothUis} />
      ) : (
        <DocsPane usecase={usecase} componentName={componentName} mode={mode} activeCase={activeCase} hoveredPartId={hoveredPartId} availablePartIds={availablePartIds} onPartChange={onPartChange} onSelectPart={onSelectPart} />
      )}
    </section>
  );
}
