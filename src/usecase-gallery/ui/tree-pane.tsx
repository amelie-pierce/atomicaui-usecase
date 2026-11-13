import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Collapsible, Type } from '../kit';
import type { ComponentGroup } from '../types';
import { PaneCard } from './pane-card';

interface TreePaneProps {
  groups: ComponentGroup[];
  selectedId: string;
  title: string;
}

// Up/Down move focus through the visible tree stops: each component's toggle and its use case links.
// Closed groups unmount their panel, so their links are skipped.
const moveFocus = (event: KeyboardEvent<HTMLElement>) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  const stops = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('button[aria-expanded], a[href^="#"]'),
  );
  const index = stops.indexOf(document.activeElement as HTMLElement);
  if (index < 0) return;
  event.preventDefault();
  stops[index + (event.key === 'ArrowDown' ? 1 : -1)]?.focus();
};

export function TreePane({ groups, selectedId, title }: TreePaneProps) {
  // Components are open by default; the user closes them, and choosing a use case reopens its component.
  const [closed, setClosed] = useState<ReadonlySet<string>>(new Set());
  useEffect(() => {
    setClosed((current) => {
      const group = groups.find((candidate) => candidate.usecases.some((usecase) => usecase.id === selectedId));
      if (!group || !current.has(group.id)) return current;
      const next = new Set(current);
      next.delete(group.id);
      return next;
    });
  }, [groups, selectedId]);

  return (
    <PaneCard label="Components" className="ug-tree">
      <h1 className="ug-visually-hidden">{title}</h1>
      <nav aria-label="Components and use cases" onKeyDown={moveFocus}>
        {groups.map((group) => (
          <Collapsible
            key={group.id}
            open={!closed.has(group.id)}
            onOpenChange={(open) =>
              setClosed((current) => {
                const next = new Set(current);
                if (open) next.delete(group.id);
                else next.add(group.id);
                return next;
              })
            }
          >
            <Collapsible.Header>
              <Collapsible.Trigger>
                <Type role="p2" as="span" weight="semi-bold">{group.title}</Type>
                <Collapsible.Chevron />
              </Collapsible.Trigger>
            </Collapsible.Header>
            <Collapsible.Panel>
              <ul className="ug-tree__list">
                {group.usecases.map((usecase) => {
                  const selected = usecase.id === selectedId;
                  return (
                    <li key={usecase.id}>
                      <a
                        href={`#${encodeURIComponent(usecase.id)}`}
                        className="ug-tree__link"
                        aria-current={selected ? 'page' : undefined}
                      >
                        <Type role="p2" as="span" weight={selected ? 'bold' : 'semi-bold'}>{usecase.id}</Type>
                        <Type role="p3" as="span" weight={selected ? 'bold' : undefined}>{usecase.title}</Type>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Collapsible.Panel>
          </Collapsible>
        ))}
      </nav>
    </PaneCard>
  );
}
