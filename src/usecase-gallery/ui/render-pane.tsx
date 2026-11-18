import { Suspense, useState } from 'react';
import type { CaseType } from '../catalog/app-views';
import { Button, Radio, RadioGroup, ToggleGroup, Type } from '../kit';
import type { PreviewMode, Usecase, UsecaseCase } from '../types';
import { PaneCard } from './pane-card';

const MODES: { value: PreviewMode; label: string }[] = [
  { value: 'component', label: 'Component' },
  { value: 'context', label: 'In context' },
];

/** The kit has no real area to compose for this use case, so the example sits in a plain labelled frame. */
function FallbackFrame({ area, children }: { area: string; children: React.ReactNode }) {
  return (
    <div className="ug-render__frame">
      <Type role="l3" as="p" color="muted">
        {area}: no kit component holds this area, so it is shown in a plain frame.
      </Type>
      <div className="ug-render__row">{children}</div>
    </div>
  );
}

/** Read-only: the example renders with fixed props, and there are no controls to change them. */
export function RenderPane({
  usecase,
  mode,
  onModeChange,
  types,
  activeType,
  onTypeChange,
  activeCase,
  onCaseChange,
}: {
  usecase: Usecase;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  /** The case types of the use case; the radio group shows with two or more. */
  types: CaseType[];
  activeType?: CaseType;
  onTypeChange: (name: string) => void;
  /** The chosen UI variant of the active type; its group toggle shows with two or more variants. */
  activeCase?: UsecaseCase;
  onCaseChange: (caseId: string) => void;
}) {
  const { Example } = usecase;
  const Context = activeCase?.Scene ?? usecase.Context;
  const [host, setHost] = useState<HTMLElement | null>(null);
  return (
    <PaneCard label="Preview" className="ug-render">
      <ToggleGroup
        className="ug-render__toggle"
        aria-label="Preview mode"
        value={[mode]}
        // Pressing the active segment would clear the group; keep one mode selected.
        onValueChange={([next]) => next && onModeChange(next as PreviewMode)}
      >
        {MODES.map(({ value, label }) => (
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
      {mode === 'context' && types.length > 1 && (
        <RadioGroup
          className="ug-render__cases"
          aria-label="In context case"
          direction="row"
          value={activeType?.name}
          onValueChange={(next) => onTypeChange(String(next))}
        >
          {types.map(({ name }) => (
            <Radio key={name} value={name}>
              <Radio.Label>{name}</Radio.Label>
            </Radio>
          ))}
        </RadioGroup>
      )}
      {mode === 'context' && activeType && activeType.cases.length > 1 && (
        <ToggleGroup
          className="ug-render__toggle"
          aria-label="App group"
          value={activeCase ? [activeCase.id] : []}
          onValueChange={([next]) => next && onCaseChange(String(next))}
        >
          {activeType.cases.map(({ id, label }) => (
            <ToggleGroup.Item
              key={id}
              value={id}
              render={(props, { pressed }) => (
                <Button {...props} aui={{ scale: 'sm', color: pressed ? 'primary' : 'secondary', paint: pressed ? 'solid' : 'text' }}>
                  {label}
                </Button>
              )}
            />
          ))}
        </ToggleGroup>
      )}
      <div className="ug-render__stage" ref={setHost}>
        <Suspense fallback={null}>
          {mode === 'component' ? (
            <Example />
          ) : Context ? (
            host && (
              <Context host={host}>
                <Example />
              </Context>
            )
          ) : (
            <FallbackFrame area={usecase.area}>
              <Example />
            </FallbackFrame>
          )}
        </Suspense>
      </div>
      {mode === 'context' && activeCase?.note && (
        <Type role="l3" as="p" color="muted" className="ug-render__note">
          {activeCase.note}
        </Type>
      )}
    </PaneCard>
  );
}
