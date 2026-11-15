import { APPS } from '../apps';
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
    <PaneCard label="Documentation" className="ug-docs">
      <header className="ug-docs__head">
        <h2 className="ug-docs__title">
          <Type role="h4" as="span" weight="bold" className="ug-docs__id">{usecase.id}</Type>
          <Type role="h4" as="span" weight="bold">{usecase.title}</Type>
        </h2>
        <Type role="p3" as="p" color="muted">{usecase.summary}</Type>
        <div className="ug-docs__apps">
          <Type role="l4" as="span" color="muted">Used in</Type>
          <ul className="ug-docs__badges">
            {usecase.apps.map((key) => {
              const app = APPS[key];
              return (
                <li key={key}>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ug-docs__badge"
                    aria-label={`${app.label} (opens ${app.name} in a new tab)`}
                  >
                    <Chip>
                      <Chip.Label>{app.label}</Chip.Label>
                    </Chip>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
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
