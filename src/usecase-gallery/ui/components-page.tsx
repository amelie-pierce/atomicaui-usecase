import { Card, Type } from '../kit';
import type { ComponentGroup } from '../types';

interface ComponentsPageProps {
  groups: ComponentGroup[];
  title: string;
}

/** The count of variants of a component, across its UI types. */
const usecaseCount = (group: ComponentGroup) => group.uiTypeGroups.reduce((sum, type) => sum + type.usecases.length, 0);

/** Every catalog component as a card; a card opens the component's first use case in the tree view. */
export function ComponentsPage({ groups, title }: ComponentsPageProps) {
  return (
    <main className="ug-components">
      <header className="ug-components__head">
        <Type role="h5" as="h1" weight="bold">{title}</Type>
        <a className="ug-components__back" href={`#${encodeURIComponent(groups[0]?.uiTypeGroups[0]?.usecases[0]?.id ?? '')}`}>
          <Type role="l3" as="span" weight="semi-bold">Back to use cases</Type>
        </a>
      </header>
      <ul className="ug-components__grid">
        {groups.map((group) => {
          const first = group.uiTypeGroups[0]?.usecases[0];
          const count = usecaseCount(group);
          return (
            <li key={group.id}>
              <a className="ug-components__link" href={`#${encodeURIComponent(first?.id ?? '')}`}>
                <Card aui={{ color: 'surface' }} className="ug-components__card">
                  <Card.Body>
                    <Card.Content className="ug-components__content">
                      <Type role="h5" as="h2" weight="semi-bold">{group.title}</Type>
                      <Type role="l3" as="p">{group.uiTypes.join(', ')}</Type>
                      <Type role="l3" as="p" weight="semi-bold">
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
