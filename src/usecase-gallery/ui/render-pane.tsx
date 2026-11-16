import { Suspense, useState } from 'react';
import { Button, ToggleGroup, Type } from '../kit';
import type { PreviewMode, Usecase } from '../types';
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
}: {
  usecase: Usecase;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}) {
  const { Example, Context } = usecase;
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
