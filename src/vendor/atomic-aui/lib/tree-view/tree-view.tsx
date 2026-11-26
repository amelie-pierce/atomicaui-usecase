// modules/design/atomic-aui/src/lib/tree-view/tree-view.tsx
//
// TreeView — a nested expand/collapse tree with single selection, built to the WAI-ARIA tree pattern
// (role=tree / treeitem / group, roving tabindex). Base UI ships no tree primitive, so this is a
// hand-crafted wrapper in the List family: no third-party headless lib, only AtomicAUI frames, the shared
// chevron family, ContainedIcon and Type. SIMPLE version: single selection, sizes sm + md. The advanced
// round (multi-select, drag-and-drop, connector lines) extends this same API.
//
// Anatomy: `TreeView.ScrollArea` (optional, the shared View.ScrollArea) → `TreeView` (role=tree) →
// `TreeView.Item` (role=treeitem; nests more Items as its group) → `TreeView.ItemContent` (the visible row:
// `TreeView.ItemArrow` + optional `TreeView.ItemIcon` + label).
import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { createChevronPart, type ChevronPartProps } from '../../families/chevron';
import { ContainedIcon, type ContainedIconAui, type ContainedIconProps } from '../icon';
import { Type } from '../type';
import { ScrollArea, type ScrollAreaProps } from '../view';
import {
  buildTreeViewItemClasses,
  resolveTreeViewItemScale,
  treeViewItemStateKey,
  TREE_VIEW_ITEM_DEFAULT_SCALE,
  useTreeViewRecipe,
  type TreeViewAui,
  type TreeViewItemContentAui,
  type TreeViewScale,
  type TreeViewSpacing,
} from './use-recipe';

export {
  TREE_VIEW_ITEM_DEFAULT_SCALE,
  TREE_VIEW_ITEM_STATE_KEYS,
  TREE_VIEW_ITEM_SX_AXES,
  TREE_VIEW_ITEM_VOCAB,
  TREE_VIEW_ROOT_DEFAULT_SCALE,
  TREE_VIEW_ROOT_SX_AXES,
  TREE_VIEW_ROOT_VOCAB,
  TREE_VIEW_SPACINGS,
  useTreeViewRecipe,
} from './use-recipe';
export type {
  TreeViewAui,
  TreeViewColor,
  TreeViewElevation,
  TreeViewItemContentAui,
  TreeViewItemStateAppearance,
  TreeViewItemStateKey,
  TreeViewPaint,
  TreeViewProfile,
  TreeViewScale,
  TreeViewShape,
  TreeViewSpacing,
} from './use-recipe';

const STATE_LAYER_CLASSES = 'aui-stateful aui-focus-color-info aui-focus-width-2';

// ─── Controllable state (value | defaultValue | onChange) ────────────────────────────────────────
function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange: ((next: T) => void) | undefined,
): [T, (next: T) => void] {
  const [inner, setInner] = React.useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? (value as T) : inner;
  const set = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [current, set];
}

// ─── Contexts ────────────────────────────────────────────────────────────────────────────────────
interface TreeViewContextValue {
  scale: TreeViewScale;
  selected: string | null;
  expandedValue: readonly string[];
  select: (key: string) => void;
  toggle: (key: string) => void;
}

// The row-level scale, shared by `TreeView.ItemContent` with its `ItemArrow` / `ItemIcon` parts.
const TreeViewRowContext = React.createContext<{ scale: TreeViewScale }>({ scale: TREE_VIEW_ITEM_DEFAULT_SCALE });

const TreeViewContext = React.createContext<TreeViewContextValue | null>(null);

function useTreeViewContext(part: string): TreeViewContextValue {
  const ctx = React.useContext(TreeViewContext);
  if (!ctx) throw new Error(`${part} must be rendered inside <TreeView>.`);
  return ctx;
}

interface TreeViewPosition {
  level: number;
  posinset: number;
  setsize: number;
}

const TreeViewPositionContext = React.createContext<TreeViewPosition>({ level: 1, posinset: 1, setsize: 1 });

interface TreeViewItemContextValue {
  id: string;
  expanded: boolean;
  selected: boolean;
  disabled: boolean;
  branch: boolean;
}

const TreeViewItemContext = React.createContext<TreeViewItemContextValue | null>(null);

// ─── Root ────────────────────────────────────────────────────────────────────────────────────────
const _TreeViewRoot = createAtomicComponent('div', {
  extensions: [useTreeViewRecipe],
});

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'onSelect' | 'defaultValue'> {
  /** Root frame appearance. `scale` (sm | md) also sizes every row unless a row sets its own. */
  aui?: TreeViewAui;
  /** Controlled selected item id (single selection). `null` = nothing selected. */
  value?: string | null;
  /** Uncontrolled initial selected item id. */
  defaultValue?: string | null;
  /** Called when the user selects an item. */
  onValueChange?: (value: string) => void;
  /** Controlled list of expanded item ids. */
  expandedValue?: readonly string[];
  /** Uncontrolled initial list of expanded item ids. */
  defaultExpandedValue?: readonly string[];
  /** Called with the next list of expanded ids whenever a branch opens or closes. */
  onExpandedValueChange?: (value: string[]) => void;
  /** Indent added per nesting level, as a `--p-px-<n>` spacing token. Default: one line-height. */
  indent?: TreeViewSpacing;
}

const EMPTY_KEYS: readonly string[] = [];

// This lib compiles WITHOUT `lib.dom` (the tabs.tsx / combobox.tsx convention), so DOM APIs are reached
// through a narrow structural shape instead of the global DOM types.
interface TreeEl {
  tabIndex: number;
  dataset: { key?: string };
  parentElement: { closest(selector: string): TreeEl | null } | null;
  getAttribute(name: string): string | null;
  hasAttribute(name: string): boolean;
  focus(): void;
  querySelector(selector: string): TreeEl | null;
  querySelectorAll(selector: string): ArrayLike<TreeEl>;
}

// Scroll anchoring. A tree usually sits in a bounded, scrollable pane. When branches open or close above
// the selected row it would be pushed out of view (or jump), so the root remembers where the selected row
// sits inside its nearest scrollable ancestor and, when the expanded set changes, restores that offset.
interface ScrollBox {
  scrollTop: number;
  parentElement: ScrollBox | null;
  getBoundingClientRect(): { top: number; bottom: number };
  addEventListener(type: 'scroll', listener: () => void): void;
  removeEventListener(type: 'scroll', listener: () => void): void;
}

interface Anchor {
  key: string;
  offset: number;
  visible: boolean;
}

function scrollBoxOf(root: TreeEl): ScrollBox | null {
  const view = globalThis as unknown as { getComputedStyle?: (el: ScrollBox) => { overflowY: string } };
  let node = (root as unknown as ScrollBox).parentElement;
  while (node && view.getComputedStyle) {
    const overflowY = view.getComputedStyle(node).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') return node;
    node = node.parentElement;
  }
  return null;
}

function measureAnchor(root: TreeEl, selected: string | null): Anchor | null {
  const box = scrollBoxOf(root);
  if (!box || selected === null) return null;
  const item = Array.from(root.querySelectorAll('[role="treeitem"]')).find((el) => el.dataset.key === selected);
  const row = item?.querySelector(':scope > .aui-tree-view-item-content') as unknown as ScrollBox | null | undefined;
  if (!row) return null;
  const rowRect = row.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  return {
    key: selected,
    offset: rowRect.top - boxRect.top,
    visible: rowRect.bottom > boxRect.top && rowRect.top < boxRect.bottom,
  };
}

function enabledItems(root: TreeEl): TreeEl[] {
  return Array.from(root.querySelectorAll('[role="treeitem"]')).filter(
    (el) => el.getAttribute('aria-disabled') !== 'true',
  );
}

function parentItem(el: TreeEl): TreeEl | null {
  return el.parentElement?.closest('[role="treeitem"]') ?? null;
}

function firstChildItem(el: TreeEl): TreeEl | null {
  return el.querySelector(':scope > [role="group"] > [role="treeitem"]:not([aria-disabled="true"])');
}

/** Roving tabindex: exactly one enabled treeitem is a tab stop (preferred → selected → first). */
function syncTabStops(root: TreeEl, preferred: TreeEl | null) {
  const items = Array.from(root.querySelectorAll('[role="treeitem"]'));
  const enabled = enabledItems(root);
  const target =
    (preferred && enabled.includes(preferred) ? preferred : null) ??
    enabled.find((el) => el.getAttribute('aria-selected') === 'true') ??
    enabled[0] ??
    null;
  for (const el of items) el.tabIndex = el === target ? 0 : -1;
}

const TreeViewRoot = React.forwardRef<HTMLDivElement, TreeViewProps>(function TreeView(
  {
    aui,
    value,
    defaultValue = null,
    onValueChange,
    expandedValue,
    defaultExpandedValue = EMPTY_KEYS,
    onExpandedValueChange,
    indent,
    style,
    onKeyDown,
    onFocus,
    children,
    ...rest
  },
  forwardedRef,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const focusedRef = React.useRef<TreeEl | null>(null);
  const rootEl = () => rootRef.current as unknown as TreeEl | null;
  const [selected, setSelected] = useControllable<string | null>(
    value,
    defaultValue,
    onValueChange ? (next) => next !== null && onValueChange(next) : undefined,
  );
  const [expanded, setExpanded] = useControllable<readonly string[]>(
    expandedValue,
    defaultExpandedValue,
    onExpandedValueChange ? (next) => onExpandedValueChange([...next]) : undefined,
  );

  const select = React.useCallback((key: string) => setSelected(key), [setSelected]);
  const toggle = React.useCallback(
    (key: string) =>
      setExpanded(expanded.includes(key) ? expanded.filter((k) => k !== key) : [...expanded, key]),
    [expanded, setExpanded],
  );

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  // Re-assert the roving tab stop after every render (items mount/unmount as branches open/close).
  React.useLayoutEffect(() => {
    const root = rootEl();
    if (root) syncTabStops(root, focusedRef.current);
  });

  // Scroll anchoring (see `scrollBoxOf`): when the expanded set changes and the selected row was in view, scroll
  // its pane by exactly the distance the row moved, so it stays put instead of jumping or leaving the viewport.
  const anchorRef = React.useRef<Anchor | null>(null);
  const expandedSigRef = React.useRef<string | null>(null);
  const signature = expanded.join('\u0000');
  React.useLayoutEffect(() => {
    const root = rootEl();
    if (!root) return;
    const previous = anchorRef.current;
    if (previous?.visible && expandedSigRef.current !== null && signature !== expandedSigRef.current) {
      const box = scrollBoxOf(root);
      const next = measureAnchor(root, selected);
      if (box && next && next.key === previous.key) box.scrollTop += next.offset - previous.offset;
    }
    expandedSigRef.current = signature;
    anchorRef.current = measureAnchor(root, selected);
  }, [signature, selected]);
  // Keep the remembered offset fresh while the user scrolls the pane.
  React.useEffect(() => {
    const root = rootEl();
    const box = root ? scrollBoxOf(root) : null;
    if (!root || !box) return undefined;
    const refresh = () => {
      anchorRef.current = measureAnchor(root, selected);
    };
    box.addEventListener('scroll', refresh);
    return () => box.removeEventListener('scroll', refresh);
  }, [selected]);

  const focusItem = (el: TreeEl | null | undefined) => {
    if (!el) return;
    focusedRef.current = el;
    const root = rootEl();
    if (root) syncTabStops(root, el);
    el.focus();
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    const target = event.target as unknown as TreeEl;
    if (target.getAttribute('role') === 'treeitem') {
      focusedRef.current = target;
      const root = rootEl();
      if (root) syncTabStops(root, target);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const item = event.target as unknown as TreeEl;
    const root = rootEl();
    // Act only when the treeitem itself has focus (not an interactive control inside a row).
    if (item.getAttribute('role') !== 'treeitem' || !root) return;
    const key = item.dataset.key as string;
    const items = enabledItems(root);
    const index = items.indexOf(item);
    const isBranch = item.hasAttribute('aria-expanded');
    const isOpen = item.getAttribute('aria-expanded') === 'true';
    let handled = true;

    switch (event.key) {
      case 'ArrowDown':
        focusItem(items[Math.min(index + 1, items.length - 1)]);
        break;
      case 'ArrowUp':
        focusItem(items[Math.max(index - 1, 0)]);
        break;
      case 'Home':
        focusItem(items[0]);
        break;
      case 'End':
        focusItem(items[items.length - 1]);
        break;
      case 'ArrowRight':
        if (isBranch && !isOpen) toggle(key);
        else if (isBranch && isOpen) focusItem(firstChildItem(item));
        break;
      case 'ArrowLeft':
        if (isBranch && isOpen) toggle(key);
        else focusItem(parentItem(item));
        break;
      case 'Enter':
      case ' ':
        select(key);
        break;
      default:
        handled = false;
    }
    if (handled) event.preventDefault();
  };

  const scale = (aui?.scale ?? TREE_VIEW_ITEM_DEFAULT_SCALE) as TreeViewScale;
  const context = React.useMemo<TreeViewContextValue>(
    () => ({ scale, selected, expandedValue: expanded, select, toggle }),
    [scale, selected, expanded, select, toggle],
  );

  return React.createElement(
    _TreeViewRoot as React.ElementType,
    {
      ref: setRefs,
      role: 'tree',
      ...rest,
      aui,
      // `indent` rides a data attribute; the stylesheet maps each spacing token to `--tree-view-indent`
      // (no inline style). A consumer's own `style` passes through untouched.
      'data-aui-tree-view-indent': indent,
      style,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
    },
    React.createElement(
      TreeViewContext.Provider,
      { value: context },
      renderItems(children, 1),
    ),
  );
});
TreeViewRoot.displayName = 'TreeView';

/** Wrap each direct `TreeView.Item` child in its WAI-ARIA position (level / posinset / setsize). */
function renderItems(children: React.ReactNode, level: number): React.ReactNode {
  const nodes = React.Children.toArray(children);
  const itemCount = nodes.filter((n) => React.isValidElement(n) && n.type === TreeViewItem).length;
  let position = 0;
  return nodes.map((node) => {
    if (!React.isValidElement(node) || node.type !== TreeViewItem) return node;
    position += 1;
    return (
      <TreeViewPositionContext.Provider
        key={node.key}
        value={{ level, posinset: position, setsize: itemCount }}
      >
        {node}
      </TreeViewPositionContext.Provider>
    );
  });
}

// ─── Item (role=treeitem) ────────────────────────────────────────────────────────────────────────
export interface TreeViewItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Stable item value — the key used by the tree's `value` / `expandedValue`. Required. */
  value: string;
  disabled?: boolean;
}

const TreeViewItem = React.forwardRef<HTMLDivElement, TreeViewItemProps>(function TreeViewItemImpl(
  { value: id, disabled = false, className, children, ...rest },
  ref,
) {
  const tree = useTreeViewContext('TreeView.Item');
  const { level, posinset, setsize } = React.useContext(TreeViewPositionContext);

  const nodes = React.Children.toArray(children);
  const isItem = (n: React.ReactNode) => React.isValidElement(n) && n.type === TreeViewItem;
  const isContent = (n: React.ReactNode) => React.isValidElement(n) && n.type === TreeViewItemContent;
  const childItems = nodes.filter(isItem);
  const explicitContent = nodes.filter(isContent);
  const loose = nodes.filter((n) => !isItem(n) && !isContent(n));
  // `<TreeView.Item value="a">Label</TreeView.Item>` — loose children become the row content.
  const content = explicitContent.length > 0 ? explicitContent : <TreeViewItemContent>{loose}</TreeViewItemContent>;

  const branch = childItems.length > 0;
  const expanded = branch && !disabled && tree.expandedValue.includes(id);
  const selected = tree.selected === id;

  const itemContext = React.useMemo<TreeViewItemContextValue>(
    () => ({ id, expanded, selected, disabled, branch }),
    [id, expanded, selected, disabled, branch],
  );

  return (
    <div
      ref={ref}
      {...rest}
      role="treeitem"
      tabIndex={-1}
      data-key={id}
      aria-level={level}
      aria-posinset={posinset}
      aria-setsize={setsize}
      aria-expanded={branch ? expanded : undefined}
      aria-selected={selected}
      aria-disabled={disabled ? true : undefined}
      data-expanded={expanded ? '' : undefined}
      data-selected={selected ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      className={prependMarkerClassName('aui-tree-view-item', className) as string | undefined}
    >
      <TreeViewItemContext.Provider value={itemContext}>{content}</TreeViewItemContext.Provider>
      {expanded ? (
        <div role="group" className="aui-tree-view-group">
          {renderItems(childItems, level + 1)}
        </div>
      ) : null}
    </div>
  );
});
TreeViewItem.displayName = 'TreeView.Item';

// ─── ItemContent (the visible row) ───────────────────────────────────────────────────────────────
const TreeViewChevron = createChevronPart('aui-tree-view-chevron');

export interface TreeViewItemContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** The row's frame appearance + per-state (`states.selected` / `states.unselected`) overrides. Row padding
   *  and the arrow-icon-label gap are `aui.sx.padding*` / `aui.sx.gap`. */
  aui?: TreeViewItemContentAui;
}

function renderLabel(children: React.ReactNode): React.ReactNode {
  // Adjacent text/number children (e.g. `Acme ({scale})`) are ONE label, not one span each.
  const out: React.ReactNode[] = [];
  let text: Array<string | number> = [];
  const flush = () => {
    if (text.length === 0) return;
    out.push(
      <Type as="span" key={`text-${out.length}`} className="aui-tree-view-item-text">
        {text.join('')}
      </Type>,
    );
    text = [];
  };
  for (const child of React.Children.toArray(children)) {
    if (typeof child === 'string' || typeof child === 'number') text.push(child);
    else {
      flush();
      out.push(child);
    }
  }
  flush();
  return out;
}

// ─── ItemArrow (the disclosure arrow, item-level) ────────────────────────────────────────────────
export type TreeViewItemArrowProps = ChevronPartProps;

/** The row's disclosure arrow. `TreeView.ItemContent` renders a default caret; compose this part to replace the
 *  glyph (children) or retint it (`aui`). It only toggles; leaves keep the slot but hide it. */
const TreeViewItemArrow = React.forwardRef<HTMLSpanElement, TreeViewItemArrowProps>(
  function TreeViewItemArrowImpl({ aui, children, onClick, ...rest }, ref) {
    const item = React.useContext(TreeViewItemContext);
    if (!item) throw new Error('TreeView.ItemArrow must be rendered inside <TreeView.Item>.');
    const toggle = useTreeViewContext('TreeView.ItemArrow').toggle;
    const { scale } = React.useContext(TreeViewRowContext);
    const glyph: ContainedIconAui = { profile: 'contained', scale };
    return (
      <TreeViewChevron
        ref={ref}
        {...rest}
        aui={{ scale, ...aui }}
        data-aui-leaf={item.branch ? undefined : ''}
        onClick={(event) => {
          onClick?.(event);
          // The arrow only toggles; it never selects the row it sits in.
          if (!item.branch || item.disabled) return;
          event.stopPropagation();
          toggle(item.id);
        }}
      >
        {children ?? <ContainedIcon name="caret-right" aria-hidden layer="monotone" aui={glyph} />}
      </TreeViewChevron>
    );
  },
);
TreeViewItemArrow.displayName = 'TreeView.ItemArrow';

// ─── ItemIcon (an optional leading glyph, item-level) ────────────────────────────────────────────
export type TreeViewItemIconProps = Omit<ContainedIconProps, 'name'> & { name?: ContainedIconProps['name'] };

/** An optional leading glyph. Defaults to the duotone folder / folder-open (groups) or file (leaves); pass
 *  `name` (any `ContainedIcon` prop) for a custom one. Compose it inside `TreeView.ItemContent`. */
const TreeViewItemIcon = React.forwardRef<HTMLElement, TreeViewItemIconProps>(
  function TreeViewItemIconImpl({ name, className, aui, ...rest }, ref) {
    const item = React.useContext(TreeViewItemContext);
    if (!item) throw new Error('TreeView.ItemIcon must be rendered inside <TreeView.Item>.');
    const { scale } = React.useContext(TreeViewRowContext);
    const iconName = name ?? (item.branch ? (item.expanded ? 'folder-open' : 'folder') : 'file');
    return (
      React.createElement(ContainedIcon as React.ElementType, {
        ref,
        'aria-hidden': true,
        layer: 'duotone',
        ...rest,
        name: iconName,
        aui: { profile: 'contained', scale, ...aui },
        className: mergeAuiClasses(['aui-tree-view-item-icon', className as string | undefined]),
      })
    );
  },
);
TreeViewItemIcon.displayName = 'TreeView.ItemIcon';

// ─── ItemContent (the visible row) ───────────────────────────────────────────────────────────────
const TreeViewItemContent = React.forwardRef<HTMLDivElement, TreeViewItemContentProps>(
  function TreeViewItemContentImpl({ aui, className, onClick, children, ...rest }, ref) {
    const tree = useTreeViewContext('TreeView.ItemContent');
    const item = React.useContext(TreeViewItemContext);
    if (!item) throw new Error('TreeView.ItemContent must be rendered inside <TreeView.Item>.');

    const activeState = treeViewItemStateKey({ selected: item.selected });
    // The root's `aui.scale` is the row default; the row's own (per-state) scale wins.
    const ownScale = resolveTreeViewItemScale(aui, activeState);
    const rowAui: TreeViewItemContentAui = {
      ...aui,
      scale: aui?.scale ?? aui?.states?.[activeState]?.scale ?? tree.scale ?? ownScale,
    };
    const scale = resolveTreeViewItemScale(rowAui, activeState);
    const recipe = buildTreeViewItemClasses(rowAui, activeState, item.disabled);
    const composedClassName = mergeAuiClasses([STATE_LAYER_CLASSES, recipe, className]);
    const rowContext = React.useMemo(() => ({ scale }), [scale]);

    // The arrow is item-level: a composed `TreeView.ItemArrow` replaces the default caret.
    const nodes = React.Children.toArray(children);
    const hasArrow = nodes.some((n) => React.isValidElement(n) && n.type === TreeViewItemArrow);

    return (
      <div
        ref={ref}
        {...rest}
        className={composedClassName}
        data-aui-tree-view-row=""
        onClick={(event) => {
          if (item.disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
          if (!event.defaultPrevented) tree.select(item.id);
        }}
      >
        <TreeViewRowContext.Provider value={rowContext}>
          {hasArrow ? null : <TreeViewItemArrow />}
          {renderLabel(nodes)}
        </TreeViewRowContext.Provider>
      </div>
    );
  },
);
TreeViewItemContent.displayName = 'TreeView.ItemContent';

// ─── ScrollArea (the shared View.ScrollArea, bounded) ────────────────────────────────────────────
export type TreeViewScrollAreaProps = ScrollAreaProps;

/** The scroll container for a tree, built on `View.ScrollArea`: it fills its parent's height by default, so
 *  put it in a bounded sidebar or panel (or size it with `aui.sx.height`) and put the `TreeView` inside. The tree keeps the selected row in place while branches open and close. Without
 *  it the tree simply grows; a parent that scrolls (or the page) works too. */
const TreeViewScrollArea = React.forwardRef<HTMLDivElement, TreeViewScrollAreaProps>(
  function TreeViewScrollAreaImpl({ className, ...rest }, ref) {
    return (
      <ScrollArea
        ref={ref}
        {...rest}
        className={prependMarkerClassName('aui-tree-view-scroll-area', className) as string | undefined}
      />
    );
  },
);
TreeViewScrollArea.displayName = 'TreeView.ScrollArea';

// ─── Assemble ────────────────────────────────────────────────────────────────────────────────────
interface TreeViewComponent
  extends React.ForwardRefExoticComponent<TreeViewProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof TreeViewItem;
  ItemContent: typeof TreeViewItemContent;
  ItemArrow: typeof TreeViewItemArrow;
  ItemIcon: typeof TreeViewItemIcon;
  ScrollArea: typeof TreeViewScrollArea;
}

export const TreeView = Object.assign(TreeViewRoot, {
  Item: TreeViewItem,
  ItemContent: TreeViewItemContent,
  ItemArrow: TreeViewItemArrow,
  ItemIcon: TreeViewItemIcon,
  ScrollArea: TreeViewScrollArea,
}) as TreeViewComponent;

export default TreeView;
