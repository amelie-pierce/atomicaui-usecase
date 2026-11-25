import { Suspense, use } from 'react';
import { APPS } from '../apps';
import type { AppKey } from '../apps';
import { useCopy } from '../hooks/use-copy';
import { stripPreviewProps } from '../catalog/snippet';
import { Button, Chip, Type } from '../kit';
import type { AnatomyPart, Usecase, UsecaseOption } from '../types';

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

function UsedIn({ usecase }: { usecase: Usecase }) {
  return <AppBadges apps={usecase.apps} label="Used in" />;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="ug-docs__section" aria-labelledby={`${id}-title`}>
    <Type as="h3" role="l3" weight="semi-bold" id={`${id}-title`}>{title}</Type>
    {children}
  </section>;
}

function sourceExcerpt(part: AnatomyPart, source: string) {
  if (part.code) return stripPreviewProps(part.code);
  if (!part.token) return undefined;
  const opening = new RegExp(`<${part.token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w.])`);
  const lines = source.split('\n');
  const lineIndex = lines.findIndex((line) => opening.test(line));
  return lineIndex < 0 ? undefined : stripPreviewProps(lines.slice(lineIndex, lineIndex + 6).join('\n'));
}

function AnatomyCode({ part, source }: { part: AnatomyPart; source: string }) {
  const text = sourceExcerpt(part, source);
  return text ? <div className="ug-docs__anatomy-code"><CopyBlock label={`${part.name} code`} text={text} /></div> : null;
}

function AnatomySection({ parts, source, availablePartIds, hoveredPartId, onPartChange, onSelectPart }: { parts: AnatomyPart[]; source: string; availablePartIds?: string[]; hoveredPartId?: string; onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void; onSelectPart: (partId: string) => void }) {
  const visibleParts = availablePartIds ? parts.filter((part) => availablePartIds.includes(part.id)) : parts;
  if (!visibleParts.length) return null;
  const shouldKeepHighlight = (target: EventTarget | null) => target instanceof Element && (!!target.closest('.ug-docs__anatomy-button') || !!target.closest('.ug-render__stage'));
  return <Section id="anatomy" title="1. Anatomy">
    <ol className="ug-docs__anatomy">{visibleParts.map((part, index) => <li key={part.id} id={`anatomy-${part.id}`} className={hoveredPartId === part.id ? 'is-highlighted' : undefined}>
      <Button className="ug-docs__anatomy-button" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} aria-pressed={hoveredPartId === part.id}
        onMouseEnter={() => onPartChange(part.id, undefined, 'hover')} onMouseLeave={(event) => { if (!shouldKeepHighlight(event.relatedTarget)) onPartChange(undefined, part.id, 'hover'); }} onFocus={() => onPartChange(part.id, undefined, 'focus')} onBlur={(event) => { if (!shouldKeepHighlight(event.relatedTarget)) onPartChange(undefined, part.id, 'focus'); }} onClick={() => onSelectPart(part.id)}>
        <span className="ug-docs__anatomy-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="ug-docs__anatomy-copy"><span className="ug-docs__anatomy-name">{part.name}</span>{part.token && <Type as="code" role="l3" family="mono" color="muted">{part.token}</Type>}<span className="ug-docs__anatomy-description">{part.description}</span></span>
       </Button><AnatomyCode part={part} source={source} />
    </li>)}</ol>
  </Section>;
}

function CopyBlock({ label, text }: { label: string; text: string }) {
  const { status, copy } = useCopy();
  return <div className="ug-docs__copy-block">
    <div className="ug-docs__copy-bar"><Type as="span" role="l3" color="muted">{label}</Type><Button aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }} onClick={() => copy(text)}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}</Button></div>
    <Type as="pre" role="l3" family="mono" className="ug-docs__prompt" tabIndex={0}><code>{text}</code></Type>
    <span role="status" className="ug-visually-hidden">{status === 'copied' ? `${label} copied` : status === 'failed' ? `${label} copy failed` : ''}</span>
  </div>;
}

function CodeBlock({ code, label }: { code: Promise<string>; label: string }) {
  const { status, copy } = useCopy();
  return <div className="ug-docs__copy-block"><div className="ug-docs__copy-bar"><Type as="span" role="l3" color="muted">{label}</Type><Button aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }} onClick={() => code.then(copy)}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}</Button></div>
    <Suspense fallback={<Type as="p" role="l3" color="muted">Loading code…</Type>}><Type as="pre" role="l3" family="mono" className="ug-docs__code" tabIndex={0}><code>{use(code)}</code></Type></Suspense>
    <span role="status" className="ug-visually-hidden">{status === 'copied' ? 'Code copied' : status === 'failed' ? 'Code copy failed' : ''}</span>
  </div>;
}

function CodeApiSection({ usecase, option }: { usecase: Usecase; option: UsecaseOption }) {
  return <Section id="code-api" title="6. Code / API">
    <CodeBlock label="Component UI" code={option.loadExampleCode()} />
    <CodeBlock label="In context UI" code={option.loadCode()} />
    {!!usecase.api?.props?.length && <div className="ug-docs__props-wrap"><Type as="h4" role="l3" weight="semi-bold">Props</Type><div className="ug-docs__table-scroll"><table className="ug-docs__props"><thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Description</th></tr></thead><tbody>{usecase.api.props.map((prop) => <tr key={prop.name}><th scope="row"><code>{prop.name}</code>{prop.required && ' *'}</th><td><code>{prop.type}</code></td><td>{prop.description ?? '—'}</td></tr>)}</tbody></table></div></div>}
  </Section>;
}

export function DocsPane({ usecase, option, componentName, hoveredPartId, availablePartIds, onPartChange, onSelectPart }: { usecase: Usecase; option: UsecaseOption; componentName: string; hoveredPartId?: string; availablePartIds?: string[]; onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void; onSelectPart: (partId: string) => void }) {
  const parts = usecase.anatomy;
  const code = option.loadExampleCode();
  const hasAccessibility = !!usecase.accessibility?.keyboard || !!usecase.accessibility?.focus;
  const hasVariants = !!usecase.variants || usecase.options.length > 0;
  return <div className="ug-docs">
    <header className="ug-docs__head"><h2 className="ug-docs__title"><Type role="h6" as="span" weight="bold">{componentName}</Type><Type as="code" role="l3" family="mono" color="muted">{usecase.componentId}</Type></h2>{!!usecase.aliases?.length && <Type as="p" role="l3" color="muted">Also called: {usecase.aliases.join(', ')}</Type>}<Type role="l3" as="p" color="muted">{usecase.summary}</Type><Type role="l3" as="p"><Type as="span" role="l3" weight="semi-bold">UI: </Type>{option.name}</Type><div className="ug-docs__apps"><UsedIn usecase={usecase} /></div></header>
    <div className="ug-docs__sections">
      {parts.length > 0 && <Suspense fallback={null}><AnatomyCodeSource parts={parts} code={code} availablePartIds={availablePartIds} hoveredPartId={hoveredPartId} onPartChange={onPartChange} onSelectPart={onSelectPart} /></Suspense>}
      <Section id="usage" title="2. Usage / Behavior"><dl className="ug-docs__definition-list"><div><Type as="dt" role="l3" weight="semi-bold">Where</Type><Type as="dd" role="l3">{usecase.where}</Type></div><div><Type as="dt" role="l3" weight="semi-bold">When</Type><Type as="dd" role="l3">{usecase.when}</Type></div><div><Type as="dt" role="l3" weight="semi-bold">How</Type><Type as="dd" role="l3">{usecase.usage ?? usecase.how}</Type></div>{usecase.behavior && <div><Type as="dt" role="l3" weight="semi-bold">Behavior</Type><Type as="dd" role="l3">{usecase.behavior}</Type></div>}</dl></Section>
      {hasVariants && <Section id="variants" title="3. Variants & States"><Type as="p" role="l3">{usecase.variants ?? usecase.options.map((candidate) => candidate.name).join(' · ')}</Type></Section>}
      {hasAccessibility && <Section id="accessibility" title="4. Accessibility"><dl className="ug-docs__definition-list">{usecase.accessibility?.keyboard && <div><Type as="dt" role="l3" weight="semi-bold">Keyboard</Type><Type as="dd" role="l3">{usecase.accessibility.keyboard}</Type></div>}{usecase.accessibility?.focus && <div><Type as="dt" role="l3" weight="semi-bold">Focus</Type><Type as="dd" role="l3">{usecase.accessibility.focus}</Type></div>}</dl></Section>}
      {(usecase.prompt || usecase.debugPrompt) && <Section id="prompts" title="5. Prompt / Debug prompt">{usecase.prompt && <CopyBlock label="Prompt" text={usecase.prompt} />}{usecase.debugPrompt && <CopyBlock label="Debug prompt" text={usecase.debugPrompt} />}</Section>}
      <Suspense fallback={<Section id="code-api" title="6. Code / API"><Type as="p" role="l3" color="muted">Loading code…</Type></Section>}><CodeApiSection usecase={usecase} option={option} /></Suspense>
      {!!usecase.related?.length && <Section id="related" title="7. Related components"><ul className="ug-docs__related">{usecase.related.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></Section>}
    </div>
  </div>;
}

function AnatomyCodeSource({ parts, code, availablePartIds, hoveredPartId, onPartChange, onSelectPart }: { parts: AnatomyPart[]; code: Promise<string>; availablePartIds?: string[]; hoveredPartId?: string; onPartChange: (partId: string | undefined, expectedPartId?: string, source?: 'hover' | 'focus') => void; onSelectPart: (partId: string) => void }) {
  return <AnatomySection parts={parts} source={use(code)} availablePartIds={availablePartIds} hoveredPartId={hoveredPartId} onPartChange={onPartChange} onSelectPart={onSelectPart} />;
}
