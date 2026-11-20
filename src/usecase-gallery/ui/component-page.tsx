import { useState } from 'react';
import { Card, Collapsible, Type } from '../kit';
import { COMPONENTS_HASH, usecaseHash } from '../hooks/use-route';
import type { ComponentGroup } from '../types';
import { Breadcrumb } from './breadcrumb';
import { usecaseCount } from './components-page';
import { Thumb } from './thumb';

/** One component's page: a section per UI type, each a grid of its use cases (id, name, live render of the example). */
export function ComponentPage({ group }: { group: ComponentGroup }) {
  const count = usecaseCount(group);
  // Sections are open by default; the reader collapses the ones not in focus.
  const [closed, setClosed] = useState<ReadonlySet<string>>(new Set());
  const toggle = (title: string, open: boolean) => setClosed((current) => { const next = new Set(current); if (open) next.delete(title); else next.add(title); return next; });
  return (
    <main className="ug-site">
      <header className="ug-site__head">
        <Breadcrumb crumbs={[{ label: 'Components', href: COMPONENTS_HASH }, { label: group.title }]} />
        <Type role="h6" as="h1" weight="bold">{group.title}</Type>
        <Type role="l3" as="p" color="muted">
          {group.uiTypes.length} UI {group.uiTypes.length === 1 ? 'type' : 'types'} · {count} use {count === 1 ? 'case' : 'cases'}. One use case is one business action.
        </Type>
      </header>
      {group.uiTypeGroups.map((type) => (
        <Collapsible key={type.title} open={!closed.has(type.title)} onOpenChange={(open) => toggle(type.title, open)} className="ug-site__section">
          <Collapsible.Header className="ug-site__section-head">
            <Collapsible.Trigger>
              <Type role="l2" as="h2" weight="bold">{type.title}</Type>
              <Type role="l3" as="span" color="muted" className="ug-site__count">{type.usecases.length}</Type>
              <Collapsible.Chevron />
            </Collapsible.Trigger>
          </Collapsible.Header>
          <Collapsible.Panel>
            <ul className="ug-grid">
              {type.usecases.map((usecase) => (
                <li key={usecase.id}>
                  <a className="ug-grid__link" href={usecaseHash(usecase.id)}>
                    <Card aui={{ color: 'surface' }} className="ug-grid__card">
                      <Thumb Example={usecase.Example} />
                      <Card.Body>
                        <Card.Content className="ug-grid__content">
                          <Type role="l3" as="p" weight="semi-bold" color="primary" className="ug-grid__id">{usecase.id}</Type>
                          <Type role="l2" as="h3" weight="semi-bold">{usecase.title}</Type>
                        </Card.Content>
                      </Card.Body>
                    </Card>
                  </a>
                </li>
              ))}
            </ul>
          </Collapsible.Panel>
        </Collapsible>
      ))}
    </main>
  );
}
