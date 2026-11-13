import type { KeyboardEvent } from 'react';
import { Collapsible, Type } from '../kit';
import type { ComponentGroup } from '../types';
import { PaneCard } from './pane-card';

interface TreePaneProps {
  groups: ComponentGroup[];
  selectedId: string;
  title: string;
}

// Up/Down move focus through the use case links, skipping links hidden in collapsed groups.
const moveFocus = (event: KeyboardEvent<HTMLElement>) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
  if (index < 0) return;
  event.preventDefault();
  links[index + (event.key === 'ArrowDown' ? 1 : -1)]?.focus();
};

export function TreePane({ groups, selectedId, title }: TreePaneProps) {
  return (
    <PaneCard id="ug-tree-title" title={title} as="h1" className="ug-tree">
      <nav aria-label="Components and use cases" onKeyDown={moveFocus}>
        {groups.map((group) => (
          <Collapsible key={group.id} defaultOpen>
            <Collapsible.Header>
              <Collapsible.Trigger>
                <span>{group.title}</span>
                <Collapsible.Chevron />
              </Collapsible.Trigger>
            </Collapsible.Header>
            <Collapsible.Panel>
              <ul className="ug-tree__list">
                {group.usecases.map((usecase) => (
                  <li key={usecase.id}>
                    <a
                      href={`#${encodeURIComponent(usecase.id)}`}
                      className="ug-tree__link"
                      aria-current={usecase.id === selectedId ? 'page' : undefined}
                    >
                      <Type role="p2" as="span" weight="semi-bold">{usecase.id}</Type>
                      <Type role="p3" as="span">{usecase.title}</Type>
                    </a>
                  </li>
                ))}
              </ul>
            </Collapsible.Panel>
          </Collapsible>
        ))}
      </nav>
    </PaneCard>
  );
}
