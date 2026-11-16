import { Button, ToggleGroup } from '../kit';
import type { DetailMode, PreviewMode, Usecase, UsecaseCase } from '../types';
import { CodePane } from './code-pane';
import { DocsPane } from './docs-pane';
import { PaneCard } from './pane-card';

const DETAILS: { value: DetailMode; label: string }[] = [
  { value: 'document', label: 'Document' },
  { value: 'code', label: 'Code' },
];

/** The right pane: the use case documentation by default, its copyable code on the toggle. */
export function DetailPane({
  usecase,
  detail,
  onDetailChange,
  mode,
  activeCase,
}: {
  usecase: Usecase;
  detail: DetailMode;
  onDetailChange: (detail: DetailMode) => void;
  mode: PreviewMode;
  activeCase?: UsecaseCase;
}) {
  return (
    <PaneCard label={detail === 'code' ? 'Code' : 'Documentation'} className="ug-detail">
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
        <CodePane key={`${usecase.id}-${mode}-${activeCase?.id}`} usecase={usecase} mode={mode} activeCase={activeCase} />
      ) : (
        <DocsPane usecase={usecase} />
      )}
    </PaneCard>
  );
}
