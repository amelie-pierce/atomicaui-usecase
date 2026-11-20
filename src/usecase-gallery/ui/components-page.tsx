import { Card, Type } from '../kit';
import { componentHash } from '../hooks/use-route';
import type { ComponentGroup } from '../types';
import { Thumb } from './thumb';

interface ComponentsPageProps {
  groups: ComponentGroup[];
  title: string;
}

/** The count of use cases of a component, across its UI types. */
export const usecaseCount = (group: ComponentGroup) => group.uiTypeGroups.reduce((sum, type) => sum + type.usecases.length, 0);

/** The root page: every catalog component as a card with a live render of its first use case; a card opens the component's page. */
export function ComponentsPage({ groups, title }: ComponentsPageProps) {
  return (
    <main className="ug-site">
      <header className="ug-site__head">
        <Type role="h6" as="h1" weight="bold">{title}</Type>
        <Type role="l3" as="p" color="muted">{groups.length} components. Pick one to see its use cases.</Type>
      </header>
      <ul className="ug-grid">
        {groups.map((group) => {
          const count = usecaseCount(group);
          const sample = group.uiTypeGroups[0]?.usecases[0];
          return (
            <li key={group.id}>
              <a className="ug-grid__link" href={componentHash(group.id)}>
                <Card aui={{ color: 'surface' }} className="ug-grid__card">
                  {sample && <Thumb Example={sample.Example} />}
                  <Card.Body>
                    <Card.Content className="ug-grid__content">
                      <Type role="l2" as="h2" weight="semi-bold">{group.title}</Type>
                      <Type role="l3" as="p" color="muted">
                        {group.uiTypes.length} UI {group.uiTypes.length === 1 ? 'type' : 'types'} · {count} use {count === 1 ? 'case' : 'cases'}
                      </Type>
                    </Card.Content>
                  </Card.Body>
                </Card>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
