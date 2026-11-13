import { Chip, Type } from '../kit';
import type { Usecase } from '../types';
import { PaneCard } from './pane-card';

const SECTIONS = [
  ['Where', 'where'],
  ['When', 'when'],
  ['How', 'how'],
] as const;

export function DocsPane({ usecase }: { usecase: Usecase }) {
  return (
    <PaneCard id="ug-docs-title" title="Documentation" className="ug-docs">
      <header className="ug-docs__head">
        <Chip aui={{ color: 'primary', paint: 'solid', scale: 'md' }} className="ug-docs__id">
          <Chip.Label weight="bold">{usecase.id}</Chip.Label>
        </Chip>
        <Type role="h4" as="h3" weight="bold">{usecase.title}</Type>
        <Type role="p3" as="p" color="muted">{usecase.summary}</Type>
      </header>
      <dl className="ug-docs__sections">
        {SECTIONS.map(([label, key]) => (
          <div key={key} className="ug-docs__section">
            <Type as="dt" role="l4" color="muted">{label}</Type>
            <Type as="dd" role="p3">{usecase[key]}</Type>
          </div>
        ))}
      </dl>
    </PaneCard>
  );
}
