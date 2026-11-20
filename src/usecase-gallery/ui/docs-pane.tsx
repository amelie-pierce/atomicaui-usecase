import { APPS } from '../apps';
import type { AppKey } from '../apps';
import { appLabels, caseTypes, isShared } from '../catalog/app-views';
import { Chip, Type } from '../kit';
import type { Usecase } from '../types';

const SECTIONS = [
  ['Where', 'where'],
  ['When', 'when'],
  ['How', 'how'],
] as const;

function AppBadges({ apps, label }: { apps: AppKey[]; label: string }) {
  return (
    <ul className="ug-docs__badges" aria-label={label}>
      {apps.map((key) => {
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
  );
}

/**
 * Used in: the apps as badges. When the In context cases give apps their own UI, the badges follow the same groups as the
 * preview toggle, so each row is one distinct UI: the type, then one row of badges per variant.
 */
function UsedIn({ usecase }: { usecase: Usecase }) {
  if (!usecase.cases?.some((candidate) => candidate.look || !isShared(candidate, usecase))) {
    return <AppBadges apps={usecase.apps} label="Used in" />;
  }
  return (
    <>
      <Type as="p" role="l3" color="muted" className="ug-docs__note">
        Used in, by type. Each row of badges is one distinct UI.
      </Type>
      <dl className="ug-docs__variants" aria-label="Used in">
        {caseTypes(usecase).map(({ name, cases }) => (
          <div key={name} className="ug-docs__type">
            <Type as="dt" role="l3" weight="semi-bold">{name}</Type>
            {cases.map(({ id, label, apps, look }) => (
              <dd key={id} className="ug-docs__variant">
                {look && (
                  <Type as="span" role="l3">
                    <Type as="span" role="l3" weight="semi-bold">Look: </Type>
                    {look}
                  </Type>
                )}
                {label !== appLabels(apps) && (
                  <Type as="span" role="l3" color="muted">{label}</Type>
                )}
                <AppBadges apps={apps} label={`${name}: ${label}`} />
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </>
  );
}

export function DocsPane({ usecase }: { usecase: Usecase }) {
  return (
    <div className="ug-docs">
      <header className="ug-docs__head">
        <h2 className="ug-docs__title">
          <Type role="l3" as="span" weight="bold" color="primary">{usecase.id}</Type>
          <Type role="l3" as="span" weight="bold" color="primary">{usecase.title}</Type>
        </h2>
        <Type role="l3" as="p" color="muted">{usecase.summary}</Type>
        {usecase.look && (
          <Type role="l3" as="p">
            <Type as="span" role="l3" weight="semi-bold">Look: </Type>
            {usecase.look}
          </Type>
        )}
        <div className="ug-docs__apps">
          <UsedIn usecase={usecase} />
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
