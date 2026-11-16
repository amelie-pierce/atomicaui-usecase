import { Suspense, useState } from 'react';
import { APPS } from '../apps';
import type { AppKey } from '../apps';
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
  apps,
  activeApp,
  onAppChange,
  cases,
  activeCase,
  onCaseChange,
}: {
  usecase: Usecase;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  /** Apps with their own UI for this use case; the toggle row shows only with two or more. */
  apps: AppKey[];
  activeApp?: AppKey;
  onAppChange: (app: AppKey) => void;
  /** The cases of the active app. */
  cases: UsecaseCase[];
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
      {mode === 'context' && apps.length > 1 && (
        <ToggleGroup
          className="ug-render__toggle"
          aria-label="App UI"
          value={activeApp ? [activeApp] : []}
          onValueChange={([next]) => next && onAppChange(next as AppKey)}
        >
          {apps.map((key) => (
            <ToggleGroup.Item
              key={key}
              value={key}
              render={(props, { pressed }) => (
                <Button {...props} aui={{ scale: 'sm', color: pressed ? 'primary' : 'secondary', paint: pressed ? 'solid' : 'text' }}>
                  {APPS[key].label}
                </Button>
              )}
            />
          ))}
        </ToggleGroup>
      )}
      {mode === 'context' && cases.length > 1 && (
        <RadioGroup
          className="ug-render__cases"
          aria-label="In context case"
          direction="row"
          value={activeCase?.id}
          onValueChange={(next) => onCaseChange(String(next))}
        >
          {cases.map(({ id, name }) => (
            <Radio key={id} value={id}>
              <Radio.Label>{name}</Radio.Label>
            </Radio>
          ))}
        </RadioGroup>
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
    </PaneCard>
  );
}
