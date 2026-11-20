import { Card, Type } from '../kit';
import { COMPONENTS_HASH, usecaseHash } from '../hooks/use-route';
import type { ComponentGroup } from '../types';
import { Breadcrumb } from './breadcrumb';
import { usecaseCount } from './components-page';
import { Thumb } from './thumb';

/** One component's page: a section per UI type, each a grid of its use cases (id, name, live render of the example). */
export function ComponentPage({ group }: { group: ComponentGroup }) {
  const count = usecaseCount(group);
  return (
    <main className="ug-site">
      <header className="ug-site__head">
        <Breadcrumb crumbs={[{ label: 'Components', href: COMPONENTS_HASH }, { label: group.title }]} />
        <Type role="h5" as="h1" weight="bold">{group.title}</Type>
        <Type role="l3" as="p" color="muted">
          {group.uiTypes.length} UI {group.uiTypes.length === 1 ? 'type' : 'types'} · {count} use {count === 1 ? 'case' : 'cases'}. One use case is one business action.
        </Type>
      </header>
      {group.uiTypeGroups.map((type) => (
        <section key={type.title} className="ug-site__section" aria-labelledby={`ug-type-${group.id}-${type.title}`}>
          <Type role="h5" as="h2" weight="semi-bold" id={`ug-type-${group.id}-${type.title}`}>{type.title}</Type>
          <ul className="ug-grid">
            {type.usecases.map((usecase) => (
              <li key={usecase.id}>
                <a className="ug-grid__link" href={usecaseHash(usecase.id)}>
                  <Card aui={{ color: 'surface' }} className="ug-grid__card">
                    <Thumb Example={usecase.Example} />
                    <Card.Body>
                      <Card.Content className="ug-grid__content">
                        <Type role="l3" as="p" weight="bold" color="primary" className="ug-grid__id">{usecase.id}</Type>
                        <Type role="h5" as="h3" weight="semi-bold">{usecase.title}</Type>
                      </Card.Content>
                    </Card.Body>
                  </Card>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
