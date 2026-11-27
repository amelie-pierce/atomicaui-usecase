import { Suspense, use } from 'react';
import { APPS } from '../apps';
import type { AppKey } from '../apps';
import { layerCodeLines, stripPartMarkers } from '../catalog/layer-code';
import { useCopy } from '../hooks/use-copy';
import { Button, Chip, ToggleGroup, Type } from '../kit';
import type { AnatomyPart, DocumentMode, LayerStep, LineRange, PreviewMode, Usecase, UsecaseOption } from '../types';

function AppBadges({ apps, label }: { apps: AppKey[]; label: string }) {
  return (
    <ul className="ug-docs__badges" aria-label={label}>
      {apps.map((key) => {
        const app = APPS[key] as { name: string; label: string; url?: string };
        const badge = <Chip aui={{ scale: 'sm', color: 'primary', paint: 'solid' }}><Chip.Label>{app.label}</Chip.Label></Chip>;
        return <li key={key}>{app.url ? <a href={app.url} target="_blank" rel="noopener noreferrer" className="ug-docs__badge" aria-label={`${app.label} (opens ${app.name} in a new tab)`}>{badge}</a> : badge}</li>;
      })}
    </ul>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="ug-docs__section" aria-labelledby={`${id}-title`}>
    <Type as="h3" role="l3" weight="semi-bold" id={`${id}-title`}>{title}</Type>
    {children}
  </section>;
}

function AnatomySection({ parts, mode, availablePartIds, hoveredPartId, onPartChange, onSelectPart }: { parts: AnatomyPart[]; mode: PreviewMode; availablePartIds?: string[]; hoveredPartId?: string; onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void; onSelectPart: (partId: string) => void }) {
  const orderedParts = availablePartIds
    ? [...parts].sort((a, b) => {
      const first = availablePartIds.indexOf(a.id);
      const second = availablePartIds.indexOf(b.id);
      return (first < 0 ? Number.MAX_SAFE_INTEGER : first) - (second < 0 ? Number.MAX_SAFE_INTEGER : second);
    })
    : parts;
  const visibleParts = availablePartIds
    ? orderedParts.filter((part) => availablePartIds.includes(part.id))
    : orderedParts;
  if (!visibleParts.length) return null;
  const shouldKeepHighlight = (target: EventTarget | null) => target instanceof Element && !!target.closest('.ug-docs__anatomy-button');
  return <Section id="anatomy" title={mode === 'context' ? '1. Anatomy · In context' : '1. Anatomy · Component'}>
    <ol className="ug-docs__anatomy">{visibleParts.map((part, index) => <li key={part.id} id={`anatomy-${part.id}`} className={hoveredPartId === part.id ? 'is-highlighted' : undefined}>
      <Button className="ug-docs__anatomy-button" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} aria-pressed={hoveredPartId === part.id}
        onMouseEnter={() => onPartChange(part.id, undefined, 'hover')} onMouseLeave={(event) => { if (!shouldKeepHighlight(event.relatedTarget)) onPartChange(undefined, part.id, 'hover'); }} // A click also focuses the step; only keyboard focus keeps the highlight, so it never outlives the pointer.
        onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) onPartChange(part.id, undefined, 'focus'); }} onBlur={(event) => { if (!shouldKeepHighlight(event.relatedTarget)) onPartChange(undefined, part.id, 'focus'); }} onClick={() => onSelectPart(part.id)}>
        <span className="ug-docs__anatomy-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="ug-docs__anatomy-copy"><span className="ug-docs__anatomy-name">{part.name}</span><span className="ug-docs__anatomy-description">{part.description}</span></span>
       </Button>
    </li>)}</ol>
  </Section>;
}

function CopyBlock({ label, text }: { label: string; text: string }) {
  const { status, copy } = useCopy();
  return <div className="ug-docs__copy-block">
    <div className="ug-docs__copy-bar"><Type as="span" role="l3" color="muted">{label}</Type><Button aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }} onClick={() => copy(stripPartMarkers(text))}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}</Button></div>
    <Type as="pre" role="l3" family="mono" className="ug-docs__prompt" tabIndex={0}><code>{text}</code></Type>
    <span role="status" className="ug-visually-hidden">{status === 'copied' ? `${label} copied` : status === 'failed' ? `${label} copy failed` : ''}</span>
  </div>;
}

function CodeBlock({ code, label }: { code: Promise<string>; label: string }) {
  const { status, copy } = useCopy();
  return <div className="ug-docs__copy-block"><div className="ug-docs__copy-bar"><Type as="span" role="l3" color="muted">{label}</Type><Button aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }} onClick={() => code.then((text) => copy(stripPartMarkers(text)))}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}</Button></div>
    <Suspense fallback={<Type as="p" role="l3" color="muted">Loading code…</Type>}><Type as="pre" role="l3" family="mono" className="ug-docs__code" tabIndex={0}><code>{stripPartMarkers(use(code))}</code></Type></Suspense>
    <span role="status" className="ug-visually-hidden">{status === 'copied' ? 'Code copied' : status === 'failed' ? 'Code copy failed' : ''}</span>
  </div>;
}

function CodeApiSection({ option, mode, api }: { option: UsecaseOption; mode: PreviewMode; api?: Usecase['api'] }) {
  const props = api?.props;
  return <Section id="code-api" title="6. Code / API">
    <CodeBlock label={mode === 'component' ? 'Component UI' : 'In context UI'} code={mode === 'component' ? option.loadExampleCode() : option.loadCode()} />
    {!!props?.length && <div className="ug-docs__props-wrap"><Type as="h4" role="l3" weight="semi-bold">Props</Type><div className="ug-docs__table-scroll"><table className="ug-docs__props"><thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Description</th></tr></thead><tbody>{props.map((prop) => <tr key={prop.name}><th scope="row"><code>{prop.name}</code>{prop.required && ' *'}</th><td><code>{prop.type}</code></td><td>{prop.description ?? '—'}</td></tr>)}</tbody></table></div></div>}
  </Section>;
}

function LayerCode({ code, slotLines, layers, index }: { code: Promise<string>; slotLines?: Promise<LineRange | undefined>; layers: LayerStep[]; index: number }) {
  const text = use(code);
  const slot = slotLines && use(slotLines);
  const { status, copy } = useCopy();
  const lines = text.split('\n');
  const current = layerCodeLines(text, layers[index], slot);
  const previous = layerCodeLines(text, layers[index - 1], slot);
  return <div className="ug-layer-lesson__code">
    <div className="ug-docs__copy-block">
      <div className="ug-docs__copy-bar"><Type as="span" role="l3" color="muted">Code</Type><Button aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }} onClick={() => copy(stripPartMarkers(text))}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}</Button></div>
      <Type as="pre" role="l3" family="mono" className="ug-docs__code" tabIndex={0}><code>{lines.map((line, lineIndex) => {
        const shown = stripPartMarkers(line);
        if (!shown.trim() && line.trim()) return null;
        const added = current.has(lineIndex) && !previous.has(lineIndex);
        return <span key={lineIndex} className={added ? 'is-added' : current.has(lineIndex) ? 'is-current' : undefined} aria-label={added ? 'Added for this step' : undefined}>{shown}{lineIndex < lines.length - 1 ? '\n' : ''}</span>;
      })}</code></Type>
      <span role="status" className="ug-visually-hidden">{status === 'copied' ? 'Code copied' : status === 'failed' ? 'Code copy failed' : ''}</span>
    </div>
  </div>;
}

function LayerLesson({ layers, index, code, slotLines }: { layers: LayerStep[]; index: number; code: Promise<string>; slotLines?: Promise<LineRange | undefined> }) {
  const active = layers[index] ?? layers[0];
  if (!active) return <Type as="p" role="l3" color="muted">No layer steps are authored for this view.</Type>;
  return <div className="ug-layer-lesson" aria-label="Layer lesson">
    <div className="ug-layer-lesson__copy" aria-live="polite" aria-atomic="true">
      <Type as="h3" role="h6" weight="bold">{active.title}</Type>
      <Type as="p" role="l3">{active.explanation}</Type>
    </div>
    <Suspense fallback={<Type as="p" role="l3" color="muted">Loading code…</Type>}><LayerCode code={code} slotLines={slotLines} layers={layers} index={index} /></Suspense>
  </div>;
}

export function DocsPane({ usecase, option, mode, componentName, hoveredPartId, availablePartIds, onPartChange, onSelectPart, documentMode, onDocumentModeChange, layerIndex, layers }: { usecase: Usecase; option: UsecaseOption; mode: PreviewMode; componentName: string; hoveredPartId?: string; availablePartIds?: string[]; onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void; onSelectPart: (partId: string) => void; documentMode: DocumentMode; onDocumentModeChange: (mode: DocumentMode) => void; layerIndex: number; layers: LayerStep[] }) {
  const doc = mode === 'context'
    ? { ...usecase, ...option.contextDocument }
    : { ...usecase, ...option.componentDocument };
  const parts = mode === 'context' ? [...option.contextAnatomy, ...usecase.anatomy] : usecase.anatomy;
  const hasAccessibility = !!doc.accessibility?.keyboard || !!doc.accessibility?.focus;
  const hasVariants = !!doc.variants || usecase.options.length > 0;
  return <>
    <header className="ug-detail__header">
      <ToggleGroup className="ug-docs__mode-toggle" aria-label="Document view" value={[documentMode]} onValueChange={([next]) => next && onDocumentModeChange(next as DocumentMode)}>
        <ToggleGroup.Item value="document" render={(props, { pressed }) => <Button {...props} aui={{ scale: 'sm', color: pressed ? 'primary' : 'secondary', paint: pressed ? 'solid' : 'text' }}>Document</Button>} />
        <ToggleGroup.Item value="layers" render={(props, { pressed }) => <Button {...props} aui={{ scale: 'sm', color: pressed ? 'primary' : 'secondary', paint: pressed ? 'solid' : 'text' }}>Layer</Button>} />
      </ToggleGroup>
    </header>
    <div className="ug-docs">
    {documentMode === 'layers' ? <LayerLesson layers={layers} index={layerIndex} code={mode === 'component' ? option.loadExampleCode() : option.loadCode()} slotLines={mode === 'component' ? undefined : option.loadSlotLines()} /> : <>
      <header className="ug-docs__head"><h2 className="ug-docs__title"><Type role="h6" as="span" weight="bold">{componentName}</Type><Type as="code" role="l3" family="mono" color="muted">{usecase.componentId}</Type></h2>{mode === 'component' && !!usecase.aliases?.length && <Type as="p" role="l3" color="muted">Also called: {usecase.aliases.join(', ')}</Type>}<Type role="l3" as="p" color="muted">{doc.summary}</Type><Type role="l3" as="p"><Type as="span" role="l3" weight="semi-bold">UI: </Type>{option.name} · {mode === 'component' ? 'Component' : 'In context'}</Type><div className="ug-docs__apps"><AppBadges apps={option.apps} label="Used in selected option" /></div>
      </header>
      <div className="ug-docs__sections">
      {parts.length > 0 && <AnatomySection parts={parts} mode={mode} availablePartIds={availablePartIds} hoveredPartId={hoveredPartId} onPartChange={onPartChange} onSelectPart={onSelectPart} />}
      <Section id="usage" title="2. Usage / Behavior"><dl className="ug-docs__definition-list"><div><Type as="dt" role="l3" weight="semi-bold">Where</Type><Type as="dd" role="l3">{doc.where}</Type></div><div><Type as="dt" role="l3" weight="semi-bold">When</Type><Type as="dd" role="l3">{doc.when}</Type></div><div><Type as="dt" role="l3" weight="semi-bold">How</Type><Type as="dd" role="l3">{doc.usage ?? doc.how}</Type></div>{doc.behavior && <div><Type as="dt" role="l3" weight="semi-bold">Behavior</Type><Type as="dd" role="l3">{doc.behavior}</Type></div>}</dl></Section>
      {hasVariants && <Section id="variants" title="3. Variants & States"><Type as="p" role="l3">{doc.variants ?? (mode === 'component' ? usecase.options.map((candidate) => candidate.name).join(' · ') : option.name)}</Type></Section>}
      {hasAccessibility && <Section id="accessibility" title="4. Accessibility"><dl className="ug-docs__definition-list">{doc.accessibility?.keyboard && <div><Type as="dt" role="l3" weight="semi-bold">Keyboard</Type><Type as="dd" role="l3">{doc.accessibility.keyboard}</Type></div>}{doc.accessibility?.focus && <div><Type as="dt" role="l3" weight="semi-bold">Focus</Type><Type as="dd" role="l3">{doc.accessibility.focus}</Type></div>}</dl></Section>}
      {(doc.prompt || doc.debugPrompt) && <Section id="prompts" title="5. Prompt / Debug prompt">{doc.prompt && <CopyBlock label="Prompt" text={doc.prompt} />}{doc.debugPrompt && <CopyBlock label="Debug prompt" text={doc.debugPrompt} />}</Section>}
      <Suspense fallback={<Section id="code-api" title="6. Code / API"><Type as="p" role="l3" color="muted">Loading code…</Type></Section>}><CodeApiSection option={option} mode={mode} api={doc.api} /></Suspense>
      {!!doc.related?.length && <Section id="related" title="7. Related components"><ul className="ug-docs__related">{doc.related.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></Section>}
      </div>
    </>}
    </div>
  </>;
}
