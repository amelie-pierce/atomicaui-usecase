import { Suspense, use } from 'react';
import { APPS } from '../apps';
import type { AppKey } from '../apps';
import { appLabels, caseTypes, isShared } from '../catalog/app-views';
import { useCopy } from '../hooks/use-copy';
import { Button, Chip, Type } from '../kit';
import type { AnatomyPart, PreviewMode, Usecase, UsecaseCase } from '../types';
import { anatomyFor } from './anatomy';

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
  if (!usecase.cases?.some((candidate) => candidate.look || !isShared(candidate, usecase))) return <AppBadges apps={usecase.apps} label="Used in" />;
  return <>
    <Type as="p" role="l3" color="muted" className="ug-docs__note">Used in, by type. Each row of badges is one distinct UI.</Type>
    <dl className="ug-docs__variants" aria-label="Used in">{caseTypes(usecase).map(({ name, cases }) => <div key={name} className="ug-docs__type">
      <Type as="dt" role="l3" weight="semi-bold">{name}</Type>
      {cases.map(({ id, label, apps, look }) => <dd key={id} className="ug-docs__variant">
        {look && <Type as="span" role="l3"><Type as="span" role="l3" weight="semi-bold">Look: </Type>{look}</Type>}
        {label !== appLabels(apps) && <Type as="span" role="l3" color="muted">{label}</Type>}
        <AppBadges apps={apps} label={`${name}: ${label}`} />
      </dd>)}
    </div>)}</dl>
  </>;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="ug-docs__section" aria-labelledby={`${id}-title`}>
    <Type as="h3" role="l3" weight="semi-bold" id={`${id}-title`}>{title}</Type>
    {children}
  </section>;
}

function AnatomySection({ parts, availablePartIds, hoveredPartId, onPartChange, onSelectPart }: { parts: AnatomyPart[]; availablePartIds?: string[]; hoveredPartId?: string; onPartChange: (partId: string | undefined) => void; onSelectPart: (partId: string) => void }) {
  const visibleParts = availablePartIds ? parts.filter((part) => availablePartIds.includes(part.id)) : parts;
  return <Section id="anatomy" title="1. Anatomy">
    <ol className="ug-docs__anatomy">{visibleParts.map((part, index) => <li key={part.id} id={`anatomy-${part.id}`} className={hoveredPartId === part.id ? 'is-highlighted' : undefined}>
      <Button className="ug-docs__anatomy-button" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} aria-pressed={hoveredPartId === part.id}
        onMouseEnter={() => onPartChange(part.id)} onMouseLeave={() => onPartChange(undefined)} onFocus={() => onPartChange(part.id)} onBlur={() => onPartChange(undefined)} onClick={() => onSelectPart(part.id)}>
        <span className="ug-docs__anatomy-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="ug-docs__anatomy-copy"><span className="ug-docs__anatomy-name">{part.name}</span>{part.token && <Type as="code" role="l3" family="mono" color="muted">{part.token}</Type>}<span className="ug-docs__anatomy-description">{part.description}</span></span>
      </Button>
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

function CodeApiSection({ usecase, mode, activeCase }: { usecase: Usecase; mode: PreviewMode; activeCase?: UsecaseCase }) {
  const code = mode === 'context' && activeCase ? activeCase.loadCode() : mode === 'context' && usecase.loadContextCode ? usecase.loadContextCode() : usecase.loadCode();
  const { status, copy } = useCopy();
  return <Section id="code-api" title="6. Code / API">
    <div className="ug-docs__copy-block"><div className="ug-docs__copy-bar"><Type as="span" role="l3" color="muted">Example</Type><Button aui={{ color: status === 'failed' ? 'error' : 'secondary', paint: 'tonal', scale: 'sm' }} onClick={() => code.then(copy)}>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}</Button></div>
      <Suspense fallback={<Type as="p" role="l3" color="muted">Loading code…</Type>}><Type as="pre" role="l3" family="mono" className="ug-docs__code" tabIndex={0}><code>{use(code)}</code></Type></Suspense>
      <span role="status" className="ug-visually-hidden">{status === 'copied' ? 'Code copied' : status === 'failed' ? 'Code copy failed' : ''}</span>
    </div>
    {!!usecase.api?.props?.length && <div className="ug-docs__props-wrap"><Type as="h4" role="l3" weight="semi-bold">Props</Type><div className="ug-docs__table-scroll"><table className="ug-docs__props"><thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Description</th></tr></thead><tbody>{usecase.api.props.map((prop) => <tr key={prop.name}><th scope="row"><code>{prop.name}</code>{prop.required && ' *'}</th><td><code>{prop.type}</code></td><td>{prop.description ?? '—'}</td></tr>)}</tbody></table></div></div>}
  </Section>;
}

export function DocsPane({ usecase, componentName, mode, activeCase, hoveredPartId, availablePartIds, onPartChange, onSelectPart }: { usecase: Usecase; componentName: string; mode: PreviewMode; activeCase?: UsecaseCase; hoveredPartId?: string; availablePartIds?: string[]; onPartChange: (partId: string | undefined) => void; onSelectPart: (partId: string) => void }) {
  const parts = anatomyFor(usecase);
  const hasAccessibility = !!usecase.accessibility?.keyboard || !!usecase.accessibility?.focus;
  const variantNames = [...new Set((usecase.cases ?? []).map((candidate) => candidate.name))];
  const hasVariants = !!usecase.variants || !!usecase.look || variantNames.length > 0;
  return <div className="ug-docs">
    <header className="ug-docs__head"><h2 className="ug-docs__title"><Type role="h6" as="span" weight="bold">{componentName}</Type><Type as="code" role="l3" family="mono" color="muted">{usecase.componentId}</Type></h2>{!!usecase.aliases?.length && <Type as="p" role="l3" color="muted">Also called: {usecase.aliases.join(', ')}</Type>}<Type role="l3" as="p" color="muted">{usecase.summary}</Type>{usecase.look && <Type role="l3" as="p"><Type as="span" role="l3" weight="semi-bold">Look: </Type>{usecase.look}</Type>}<div className="ug-docs__apps"><UsedIn usecase={usecase} /></div></header>
    <div className="ug-docs__sections">
      {parts.length > 0 && <AnatomySection parts={parts} availablePartIds={availablePartIds} hoveredPartId={hoveredPartId} onPartChange={onPartChange} onSelectPart={onSelectPart} />}
      <Section id="usage" title="2. Usage / Behavior"><dl className="ug-docs__definition-list"><div><Type as="dt" role="l3" weight="semi-bold">Where</Type><Type as="dd" role="l3">{usecase.where}</Type></div><div><Type as="dt" role="l3" weight="semi-bold">When</Type><Type as="dd" role="l3">{usecase.when}</Type></div><div><Type as="dt" role="l3" weight="semi-bold">How</Type><Type as="dd" role="l3">{usecase.usage ?? usecase.how}</Type></div>{usecase.behavior && <div><Type as="dt" role="l3" weight="semi-bold">Behavior</Type><Type as="dd" role="l3">{usecase.behavior}</Type></div>}</dl></Section>
      {hasVariants && <Section id="variants" title="3. Variants & States"><Type as="p" role="l3">{usecase.variants ?? [usecase.look, ...variantNames].filter(Boolean).join(' · ')}</Type></Section>}
      {hasAccessibility && <Section id="accessibility" title="4. Accessibility"><dl className="ug-docs__definition-list">{usecase.accessibility?.keyboard && <div><Type as="dt" role="l3" weight="semi-bold">Keyboard</Type><Type as="dd" role="l3">{usecase.accessibility.keyboard}</Type></div>}{usecase.accessibility?.focus && <div><Type as="dt" role="l3" weight="semi-bold">Focus</Type><Type as="dd" role="l3">{usecase.accessibility.focus}</Type></div>}</dl></Section>}
      {(usecase.prompt || usecase.debugPrompt) && <Section id="prompts" title="5. Prompt / Debug prompt">{usecase.prompt && <CopyBlock label="Prompt" text={usecase.prompt} />}{usecase.debugPrompt && <CopyBlock label="Debug prompt" text={usecase.debugPrompt} />}</Section>}
      <CodeApiSection usecase={usecase} mode={mode} activeCase={activeCase} />
      {!!usecase.related?.length && <Section id="related" title="7. Related components"><ul className="ug-docs__related">{usecase.related.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></Section>}
    </div>
  </div>;
}
