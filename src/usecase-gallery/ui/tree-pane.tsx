import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Collapsible, Type } from '../kit';
import type { AreaGroup, ComponentGroup } from '../types';
import { PaneCard } from './pane-card';

interface TreePaneProps {
  groups: ComponentGroup[];
  selectedId: string;
  title: string;
}

// Up/Down move focus through the visible tree stops: each component and area toggle and the use case links.
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

const areaKey = (group: ComponentGroup, area: AreaGroup) => `${group.id}/${area.title}`;

export function TreePane({ groups, selectedId, title }: TreePaneProps) {
  // Components and areas are open by default; the user closes them, and choosing a use case reopens its path.
  // Keys are a component id, or `<component id>/<area title>` for an area.
  const [closed, setClosed] = useState<ReadonlySet<string>>(new Set());
  const setOpen = (key: string, open: boolean) =>
    setClosed((current) => {
      const next = new Set(current);
      if (open) next.delete(key);
      else next.add(key);
      return next;
    });
  useEffect(() => {
    setClosed((current) => {
      const next = new Set(current);
      for (const group of groups) {
        for (const area of group.areas) {
          if (!area.usecases.some((usecase) => usecase.id === selectedId)) continue;
          next.delete(group.id);
          next.delete(areaKey(group, area));
        }
      }
      return next.size === current.size ? current : next;
    });
  }, [groups, selectedId]);

  return (
    <PaneCard label="Components" className="ug-tree">
      <h1 className="ug-visually-hidden">{title}</h1>
      <nav aria-label="Components, areas and use cases" onKeyDown={moveFocus}>
        {groups.map((group) => (
          <Collapsible key={group.id} open={!closed.has(group.id)} onOpenChange={(open) => setOpen(group.id, open)}>
            <Collapsible.Header>
              <Collapsible.Trigger>
                <Type role="p2" as="span" weight="semi-bold">{group.title}</Type>
                <Collapsible.Chevron />
              </Collapsible.Trigger>
            </Collapsible.Header>
            <Collapsible.Panel>
              <div className="ug-tree__areas">
                {group.areas.map((area) => (
                  <Collapsible
                    key={area.title}
                    open={!closed.has(areaKey(group, area))}
                    onOpenChange={(open) => setOpen(areaKey(group, area), open)}
                  >
                    <Collapsible.Header>
                      <Collapsible.Trigger>
                        <Type role="p3" as="span" weight="semi-bold">{area.title}</Type>
                        <Collapsible.Chevron />
                      </Collapsible.Trigger>
                    </Collapsible.Header>
                    <Collapsible.Panel>
                      <ul className="ug-tree__list">
                        {area.usecases.map((usecase) => {
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
              </div>
            </Collapsible.Panel>
          </Collapsible>
        ))}
      </nav>
    </PaneCard>
  );
}
