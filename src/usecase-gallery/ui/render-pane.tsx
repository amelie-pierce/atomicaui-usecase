import { Suspense, useCallback, useRef, useState } from 'react';
import type { CaseType } from '../catalog/app-views';
import { Button, Field, Radio, RadioGroup, ToggleGroup, Type } from '../kit';
import type { Usecase, UsecaseCase, UsecaseLook } from '../types';
import { StageHostContext } from '../hooks/use-stage-host';
import type { AnatomyPart } from '../types';
import { AnatomyOverlay, usePreviewAnatomy } from '../hooks/use-preview-anatomy';

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

/** The In context UI of a selection-based use case: the chosen option's scene with the example placed in it, in a stage of its own. */
function ContextStage({ usecase, option }: { usecase: Usecase; option?: UsecaseCase }) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const { Example } = usecase;
  const Scene = option?.Scene;
  return (
    <div className="ug-render__stage" ref={setHost}>
      <Suspense fallback={null}>
        {host && Scene && (
          <Scene host={host}>
            <Example />
          </Scene>
        )}
      </Suspense>
    </div>
  );
}

/** Read-only: the example renders with fixed props, and there are no controls to change them. */
export function RenderPane({
  usecase,
  looks,
  onLookChange,
  types,
  activeType,
  onTypeChange,
  activeCase,
  onCaseChange,
  anatomy,
  hoveredPartId,
  onPartChange,
  onAvailablePartsChange,
}: {
  /** The use case as the chosen look shows it. */
  usecase: Usecase;
  /** Every look of the use case; the select shows with two or more. The chosen one is `usecase.look`. */
  looks?: UsecaseLook[];
  onLookChange: (look: string) => void;
  /** The case types of the use case; the radio group shows with two or more. */
  types: CaseType[];
  activeType?: CaseType;
  onTypeChange: (name: string) => void;
  /** The chosen UI variant of the active type; its group toggle shows with two or more variants. */
  activeCase?: UsecaseCase;
  onCaseChange: (caseId: string) => void;
  anatomy: AnatomyPart[];
  hoveredPartId?: string;
  onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void;
  onAvailablePartsChange: (partIds: string[]) => void;
}) {
  const { Example } = usecase;
  const Context = activeCase?.Scene ?? usecase.Context;
  const look = usecase.options ? undefined : activeCase?.look ?? usecase.look ?? usecase.cases?.[0]?.look;
  const [host, setHost] = useState<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const setStage = useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node;
    setHost(node);
  }, []);
  const split = !!usecase.options;
  const overlay = usePreviewAnatomy(stageRef, anatomy, hoveredPartId, onPartChange, onAvailablePartsChange);
  return (
    <section className={split ? 'ug-render ug-render--split' : 'ug-render'} role="region" aria-label="Preview">
      {looks && looks.length > 1 && (
        <Field aui={{ scale: 'sm' }} className="ug-render__look-select">
          <Field.Label aui={{ scale: 'sm' }}>Look</Field.Label>
          <Field.Select
            value={usecase.look}
            onValueChange={(next) => next && onLookChange(String(next))}
            items={looks.map(({ name }) => ({ label: name, value: name }))}
          >
            <Field.SelectTrigger aui={{ scale: 'sm' }} aria-label="Look">
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
            <Field.SelectPortal>
              <Field.SelectPositioner sideOffset={4}>
                <Field.SelectPopup matchTriggerWidth>
                  <Field.SelectList>
                    {looks.map(({ name }) => (
                      <Field.SelectItem key={name} value={name}>
                        <Field.SelectItemText>{name}</Field.SelectItemText>
                        <Field.SelectItemIndicator />
                      </Field.SelectItem>
                    ))}
                  </Field.SelectList>
                </Field.SelectPopup>
              </Field.SelectPositioner>
            </Field.SelectPortal>
          </Field.Select>
        </Field>
      )}
      {types.length > 1 && (
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
      {activeType && activeType.cases.length > 1 && (
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
      {look && !(looks && looks.length > 1) && (
        <Type role="l3" as="p" color="muted" className="ug-render__look">
          Look: {look}
        </Type>
      )}
      {split && <Type as="h2" role="l3" weight="semi-bold" className="ug-render__heading">Component UI</Type>}
      <div className="ug-render__stage" ref={setStage}>
        <Suspense fallback={null}>
          {split ? (
            host && (
              <StageHostContext.Provider value={host}>
                <Example />
              </StageHostContext.Provider>
            )
          ) : Context ? (
            host && (
              <Context host={host}>
                <Example />
              </Context>
            )
          ) : (
            <FallbackFrame area={usecase.area ?? usecase.uiType}>
              <Example />
            </FallbackFrame>
          )}
        </Suspense>
        <AnatomyOverlay rect={overlay} />
      </div>
      {split && <Type as="h2" role="l3" weight="semi-bold" className="ug-render__heading">In context UI</Type>}
      {split && <ContextStage usecase={usecase} option={activeCase} />}
      {activeCase?.note && (
        <Type role="l3" as="p" color="muted" className="ug-render__note">
          {activeCase.note}
        </Type>
      )}
    </section>
  );
}
