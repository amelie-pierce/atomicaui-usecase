import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TreeView, Type } from '../kit';
import { usecaseHash } from '../hooks/use-route';
import type { ComponentGroup, Usecase } from '../types';

interface TreePaneProps {
  groups: ComponentGroup[];
  activeComponentId: string;
  activeUsecase: Usecase;
  title: string;
  familyCount: number;
}

const typeValue = (componentId: string, index: number) => `type:${componentId}:${index}`;

function firstUsecase(group?: ComponentGroup, typeIndex = 0) {
  return group?.uiTypeGroups[typeIndex]?.usecases[0];
}

/** A single-select, keyboard accessible tree of components, UI types and use cases. */
export function TreePane({ groups, activeComponentId, activeUsecase, title, familyCount }: TreePaneProps) {
  const activeGroup = groups.find((group) => group.id === activeComponentId) ?? groups[0];
  const activeTypeIndex = activeGroup?.uiTypeGroups.findIndex((type) => type.usecases.some((usecase) => usecase.id === activeUsecase.id)) ?? 0;
  const selected = activeUsecase.id;
  const initiallyExpanded = useMemo(() => activeGroup ? [activeGroup.id, typeValue(activeGroup.id, Math.max(0, activeTypeIndex))] : [], []);
  const [expandedValue, setExpandedValue] = useState<readonly string[]>(initiallyExpanded);
  const treeRef = useRef<HTMLDivElement>(null);
  const activeComponentRef = useRef(activeGroup?.id);

  useEffect(() => {
    if (!activeGroup) return;
    const changedComponent = activeComponentRef.current !== activeGroup.id;
    activeComponentRef.current = activeGroup.id;
    const activeType = typeValue(activeGroup.id, Math.max(0, activeTypeIndex));
    setExpandedValue((current) => changedComponent
      ? [activeGroup.id, activeType]
      : [...new Set([...current, activeGroup.id, activeType])]);
  }, [activeGroup?.id, activeTypeIndex]);

  useLayoutEffect(() => {
    const selectedItem = Array.from(treeRef.current?.querySelectorAll<HTMLElement>('[role="treeitem"]') ?? [])
      .find((item) => item.dataset.key === selected);
    selectedItem?.scrollIntoView({ block: 'nearest' });
  }, [selected, expandedValue]);

  const selectValue = (value: string) => {
    if (value === activeGroup?.id || value === typeValue(activeGroup?.id ?? '', activeTypeIndex)) {
      setExpandedValue((current) => current.includes(value) ? current.filter((key) => key !== value) : [...current, value]);
      return;
    }
    const usecase = groups.flatMap((group) => group.uiTypeGroups.flatMap((type) => type.usecases)).find((candidate) => candidate.id === value);
    if (usecase) {
      window.location.hash = usecaseHash(usecase.id, usecase.componentId);
      return;
    }
    const group = groups.find((candidate) => candidate.id === value);
    if (group) {
      const first = firstUsecase(group);
      if (first) window.location.hash = usecaseHash(first.id, first.componentId);
      return;
    }
    const [, componentId, indexText] = value.split(':');
    const typeIndex = Number(indexText);
    const first = firstUsecase(groups.find((candidate) => candidate.id === componentId), typeIndex);
    if (first) window.location.hash = usecaseHash(first.id, first.componentId);
  };

  return (
    <aside className="ug-tree-pane" aria-label="Component and use case navigation">
      <header className="ug-tree-pane__header">
        <Type role="l2" as="h1" weight="semi-bold">{title}</Type>
        <Type role="l3" as="p" color="muted">Components · {familyCount} component families</Type>
      </header>
      <div className="ug-tree-pane__scroll">
        <TreeView
          ref={treeRef}
          className="ug-tree"
          aui={{ color: 'surface', paint: 'text', scale: 'sm' }}
          value={selected}
          expandedValue={expandedValue}
          onExpandedValueChange={setExpandedValue}
          onValueChange={selectValue}
          aria-label="Components and use cases"
          indent="12"
        >
          {groups.map((group) => (
            <TreeView.Item key={group.id} value={group.id}>
              <TreeView.ItemContent>
                <TreeView.ItemArrow />
                <TreeView.ItemIcon />
                <Type role="l3" as="span" weight="semi-bold">{group.title}</Type>
              </TreeView.ItemContent>
              {group.uiTypeGroups.map((type, index) => (
                <TreeView.Item key={typeValue(group.id, index)} value={typeValue(group.id, index)}>
                  <TreeView.ItemContent>
                    <TreeView.ItemArrow />
                    <TreeView.ItemIcon />
                    <Type role="l3" as="span">{type.title}</Type>
                    <Type role="l3" as="span" color="muted">{type.usecases.length}</Type>
                  </TreeView.ItemContent>
                  {type.usecases.map((usecase) => (
                    <TreeView.Item key={usecase.id} value={usecase.id}>
                      <TreeView.ItemContent className="ug-tree__usecase">
                        <TreeView.ItemArrow />
                        <TreeView.ItemIcon />
                        <Type role="l3" as="span" className="ug-tree__id" weight="semi-bold">{usecase.id}</Type>
                        <Type role="l3" as="span" className="ug-tree__title">{usecase.title}</Type>
                      </TreeView.ItemContent>
                    </TreeView.Item>
                  ))}
                </TreeView.Item>
              ))}
            </TreeView.Item>
          ))}
        </TreeView>
      </div>
    </aside>
  );
}
