import { Card, Type } from '../kit';
import type { Usecase } from '../types';

const SECTIONS = [
  ['Where', 'where'],
  ['When', 'when'],
  ['How', 'how'],
] as const;

export function DocsPane({ usecase }: { usecase: Usecase }) {
  return (
    <Card aui={{ color: 'surface' }} className="ug-docs" aria-labelledby="ug-docs-title">
      <Card.Body className="ug-docs__body">
        <header className="ug-docs__head">
          <Type role="h6" as="p" family="display" color="muted">{usecase.id}</Type>
          <Type role="h4" as="h2" family="display" id="ug-docs-title">{usecase.title}</Type>
          <Type role="p2">{usecase.summary}</Type>
        </header>
        {SECTIONS.map(([label, key]) => (
          <section key={key} className="ug-docs__section">
            <Type role="h6" as="h3" family="display">{label}</Type>
            <Type role="p2">{usecase[key]}</Type>
          </section>
        ))}
      </Card.Body>
    </Card>
  );
}
