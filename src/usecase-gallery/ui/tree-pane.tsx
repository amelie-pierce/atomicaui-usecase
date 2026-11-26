import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TreeView, Type } from '../kit';
import { usecaseHash } from '../hooks/use-route';
import type { ComponentGroup, Usecase } from '../types';

interface TreePaneProps {
  groups: ComponentGroup[];
  activeComponentId: string;
  activeUsecase: Usecase;
  collapsed: boolean;
  searchActive: boolean;
  onContentWidth?: (width: number) => void;
}

const typeValue = (componentId: string, index: number) => `type:${componentId}:${index}`;

function firstUsecase(group?: ComponentGroup, typeIndex = 0) {
  return group?.uiTypeGroups[typeIndex]?.usecases[0];
}

/** A single-select, keyboard accessible tree of components, UI types and use cases. */
export function TreePane({ groups, activeComponentId, activeUsecase, collapsed, searchActive, onContentWidth }: TreePaneProps) {
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

  useEffect(() => {
    if (!searchActive) return;
    setExpandedValue(groups.flatMap((group) => [
      group.id,
      ...group.uiTypeGroups.map((_, index) => typeValue(group.id, index)),
    ]));
  }, [groups, searchActive]);

  useLayoutEffect(() => {
    const selectedItem = Array.from(treeRef.current?.querySelectorAll<HTMLElement>('[role="treeitem"]') ?? [])
      .find((item) => item.dataset.key === selected);
    const scrollPane = treeRef.current?.parentElement;
    const row = selectedItem?.querySelector<HTMLElement>(':scope > .aui-tree-view-item-content');
    if (!scrollPane || !row) return;
    const paneRect = scrollPane.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    if (rowRect.top < paneRect.top) scrollPane.scrollTop -= paneRect.top - rowRect.top;
    else if (rowRect.bottom > paneRect.bottom) scrollPane.scrollTop += rowRect.bottom - paneRect.bottom;
  }, [selected, expandedValue]);

  useLayoutEffect(() => {
    const tree = treeRef.current;
    const scrollPane = tree?.parentElement;
    const aside = scrollPane?.parentElement;
    if (collapsed || !tree || !scrollPane || !aside || !onContentWidth) return;
    tree.classList.add('ug-tree--measure');
    const scrollStyle = getComputedStyle(scrollPane);
    const asideStyle = getComputedStyle(aside);
    const chrome = parseFloat(scrollStyle.paddingInlineStart) + parseFloat(scrollStyle.paddingInlineEnd)
      + parseFloat(asideStyle.borderInlineStartWidth) + parseFloat(asideStyle.borderInlineEndWidth);
    const width = Math.ceil(tree.getBoundingClientRect().width + chrome);
    tree.classList.remove('ug-tree--measure');
    if (width > 0) onContentWidth(width);
  }, [collapsed, onContentWidth]);

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

  const renderUsecase = (usecase: Usecase) => (
    <TreeView.Item key={usecase.id} value={usecase.id}>
      <TreeView.ItemContent className="ug-tree__usecase">
        <TreeView.ItemArrow />
        <TreeView.ItemIcon />
        <Type role="l3" as="span" className="ug-tree__id" weight="semi-bold">{usecase.id}</Type>
        <Type role="l3" as="span" className="ug-tree__title">{usecase.title}</Type>
      </TreeView.ItemContent>
    </TreeView.Item>
  );

  return (
    <aside id="component-tree-pane" className="ug-tree-pane" aria-label="Component and use case navigation" hidden={collapsed}>
      <div className="ug-tree-pane__scroll">
        {groups.length ? <TreeView
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
              {group.flattenUiTypeGroup
                ? group.uiTypeGroups[0].usecases.map(renderUsecase)
                : group.uiTypeGroups.map((type, index) => (
                <TreeView.Item key={typeValue(group.id, index)} value={typeValue(group.id, index)}>
                  <TreeView.ItemContent>
                    <TreeView.ItemArrow />
                    <TreeView.ItemIcon />
                    <Type role="l3" as="span">{type.title}</Type>
                    <Type role="l3" as="span" color="muted">{type.usecases.length}</Type>
                  </TreeView.ItemContent>
                  {type.usecases.map(renderUsecase)}
                </TreeView.Item>
              ))}
            </TreeView.Item>
          ))}
        </TreeView> : <Type className="ug-tree-pane__empty" role="l3" as="p" color="muted">No matching components or use cases.</Type>}
      </div>
    </aside>
  );
}
