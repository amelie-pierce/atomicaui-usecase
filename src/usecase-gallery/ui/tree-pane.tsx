import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Collapsible, Type } from '../kit';
import type { AreaGroup, ComponentGroup, Usecase } from '../types';
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
  // Components and areas are collapsed by default, also the one holding the selected use case; the user opens them.
  // Keys are a component id, or `<component id>/<area title>` for an area.
  const [open, setOpenKeys] = useState<ReadonlySet<string>>(new Set());
  const setOpen = (key: string, isOpen: boolean) =>
    setOpenKeys((current) => {
      const next = new Set(current);
      if (isOpen) next.add(key);
      else next.delete(key);
      return next;
    });

  const renderList = (usecases: Usecase[]) => (
    <ul className="ug-tree__list">
      {usecases.map((usecase) => {
        const selected = usecase.id === selectedId;
        return (
          <li key={usecase.id}>
            <a
              href={`#${encodeURIComponent(usecase.id)}`}
              className="ug-tree__link"
              aria-current={selected ? 'page' : undefined}
            >
              <Type role="l3" as="span" weight={selected ? 'bold' : 'regular'}>{usecase.id}</Type>
              <Type role="l3" as="span" weight={selected ? 'bold' : 'regular'}>{usecase.title}</Type>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <PaneCard label="Components" className="ug-tree">
      <h1 className="ug-visually-hidden">{title}</h1>
      <nav aria-label="Components, areas and use cases" onKeyDown={moveFocus}>
        {groups.map((group) => (
          <Collapsible key={group.id} open={open.has(group.id)} onOpenChange={(open) => setOpen(group.id, open)}>
            <Collapsible.Header>
              <Collapsible.Trigger>
                <Type role="l3" as="span" weight="semi-bold">{group.title}</Type>
                <Collapsible.Chevron />
              </Collapsible.Trigger>
            </Collapsible.Header>
            <Collapsible.Panel>
              <div className="ug-tree__areas">
                {group.areas.map((area) => area.title === group.title ? (
                  // An area named like its component is no real level: list its use cases directly.
                  <div key={area.title}>{renderList(area.usecases)}</div>
                ) : (
                  <Collapsible
                    key={area.title}
                    open={open.has(areaKey(group, area))}
                    onOpenChange={(open) => setOpen(areaKey(group, area), open)}
                  >
                    <Collapsible.Header>
                      <Collapsible.Trigger>
                        <Type role="l3" as="span" weight="semi-bold">{area.title}</Type>
                        <Collapsible.Chevron />
                      </Collapsible.Trigger>
                    </Collapsible.Header>
                    <Collapsible.Panel>
                      {renderList(area.usecases)}
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
