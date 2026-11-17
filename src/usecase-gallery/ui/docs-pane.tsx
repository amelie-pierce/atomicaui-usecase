import { APPS } from '../apps';
import { Chip, Type } from '../kit';
import type { Usecase } from '../types';

const SECTIONS = [
  ['Where', 'where'],
  ['When', 'when'],
  ['How', 'how'],
] as const;

export function DocsPane({ usecase }: { usecase: Usecase }) {
  return (
    <div className="ug-docs">
      <header className="ug-docs__head">
        <h2 className="ug-docs__title">
          <Type role="l3" as="span" weight="bold" color="primary">{usecase.id}</Type>
          <Type role="l3" as="span" weight="bold" color="primary">{usecase.title}</Type>
        </h2>
        <Type role="l3" as="p" color="muted">{usecase.summary}</Type>
        <div className="ug-docs__apps">
          <ul className="ug-docs__badges" aria-label="Used in">
            {usecase.apps.map((key) => {
              const app = APPS[key] as { name: string; label: string; url?: string };
              const badge = (
                <Chip aui={{ scale: 'sm', color: 'primary', paint: 'solid' }}>
                  <Chip.Label>{app.label}</Chip.Label>
                </Chip>
              );
              return (
                <li key={key}>
                  {app.url ? (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ug-docs__badge"
                      aria-label={`${app.label} (opens ${app.name} in a new tab)`}
                    >
                      {badge}
                    </a>
                  ) : (
                    badge
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <dl className="ug-docs__sections">
        {SECTIONS.map(([label, key]) => (
          <div key={key} className="ug-docs__section">
            <Type as="dt" role="l3" weight="semi-bold">{label}</Type>
            <Type as="dd" role="l3">{usecase[key]}</Type>
          </div>
        ))}
      </dl>
    </div>
  );
}
