// modules/design/atomic-aui/src/lib/list/list-reorder.tsx
//
// opt-in drag-to-reorder for `List`. Mirrors the Tabs reorder (dnd-kit
// PointerSensor distance 4 + KeyboardSensor with sortable coordinates, closestCenter, a pure order
// update then ONE `onReorder` call, re-sync when the consumer hands back a new order) with a vertical
// strategy. Differences from Tabs: a drag starts from `List.DragHandle` only (the row stays a normal
// clickable / selectable item), `locked` items never move, and the live-region announcements use the
// row's text with built-in English strings a consumer can override.
import * as React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  type SortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/** What an announcement knows about the moving row. Positions are 1-based. */
export interface ListReorderItemInfo {
  /** The item's `id` (or React key). */
  id: string;
  /** The row's visible text (falls back to the id). */
  label: string;
  position: number;
  total: number;
}

/** Screen-reader text for a reorder. Override any entry through `List` `reorderMessages`. */
export interface ListReorderMessages {
  /** Read once when a drag handle is focused (dnd-kit screen-reader instructions). */
  instructions: string;
  pickedUp: (item: ListReorderItemInfo) => string;
  movedTo: (item: ListReorderItemInfo) => string;
  dropped: (item: ListReorderItemInfo) => string;
  /** The drop would move a locked item, so the order is kept. */
  blocked: (item: ListReorderItemInfo) => string;
  cancelled: (item: ListReorderItemInfo) => string;
}

export const LIST_REORDER_MESSAGES: ListReorderMessages = {
  instructions:
    'To reorder, press Space or Enter on the drag handle. Use the up and down arrow keys to move the item, ' +
    'Space or Enter to drop it, or Escape to cancel.',
  pickedUp: ({ label, position, total }) => `Picked up ${label}. Position ${position} of ${total}.`,
  movedTo: ({ label, position, total }) => `${label} moved to position ${position} of ${total}.`,
  dropped: ({ label, position, total }) => `${label} dropped at position ${position} of ${total}.`,
  blocked: ({ label, position, total }) =>
    `${label} cannot move past a locked item. It stays at position ${position} of ${total}.`,
  cancelled: ({ label, position, total }) =>
    `Reordering cancelled. ${label} returned to position ${position} of ${total}.`,
};

/**
 * True when moving `from` → `to` keeps every locked index in place. An array move shifts every item
 * between the two indexes by one, so the move is allowed only when no locked index sits in that range.
 */
export function canMoveListItem(lockedIndexes: ReadonlySet<number>, from: number, to: number): boolean {
  if (from === to || lockedIndexes.has(from)) return false;
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  for (const index of lockedIndexes) if (index >= lo && index <= hi) return false;
  return true;
}

// ─── Per-item sortable context (read by List.DragHandle) ─────────────────────
type Spreadable = Record<string, unknown>;

export interface ListSortableItemContextValue {
  attributes: Spreadable;
  listeners: Spreadable | undefined;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  locked: boolean;
  isDragging: boolean;
}

const ListSortableItemContext = React.createContext<ListSortableItemContextValue | null>(null);

export function useListSortableItem(): ListSortableItemContextValue | null {
  return React.useContext(ListSortableItemContext);
}

type ElementWithRef = React.ReactElement<{ style?: React.CSSProperties; ref?: React.Ref<HTMLElement> }> & {
  ref?: React.Ref<HTMLElement>;
};

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') ref(value);
  else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<T | null>).current = value;
}

function SortableListItem({
  id,
  locked,
  element,
  registerNode,
}: {
  id: string;
  locked: boolean;
  element: ElementWithRef;
  registerNode: (id: string, node: HTMLElement | null) => void;
}): React.JSX.Element {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id, disabled: locked });
  // React 19 carries the consumer ref on props; React 18 on the element.
  const consumerRef = element.props.ref ?? element.ref;
  const ref = React.useCallback(
    (node: HTMLElement | null) => {
      setNodeRef(node);
      registerNode(id, node);
      assignRef(consumerRef, node);
    },
    [consumerRef, id, registerNode, setNodeRef],
  );
  const style: React.CSSProperties = {
    ...(element.props.style ?? {}),
    // `undefined` once settled → no stale inline transform survives a drop.
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const context = React.useMemo<ListSortableItemContextValue>(
    () => ({
      attributes: attributes as unknown as Spreadable,
      listeners: listeners as Spreadable | undefined,
      setActivatorNodeRef,
      locked,
      isDragging,
    }),
    [attributes, isDragging, listeners, locked, setActivatorNodeRef],
  );
  return (
    <ListSortableItemContext.Provider value={context}>
      {React.cloneElement(element, {
        ref,
        style,
        'data-aui-reorder-item': '',
        'data-aui-locked': locked ? '' : undefined,
        'data-aui-dragging': isDragging ? '' : undefined,
      } as object)}
    </ListSortableItemContext.Provider>
  );
}

function itemSortKey(element: React.ReactElement): string {
  const props = element.props as { id?: unknown };
  return props.id != null ? String(props.id) : String(element.key);
}

/**
 * Wraps the `List.Item` children of a reorderable List in a DndContext + SortableContext. Non-item
 * children (separators, headings) render in their ORIGINAL slots; only the items permute.
 */
export function ReorderableListItems({
  children,
  isItem,
  onReorder,
  messages,
}: {
  children: React.ReactNode;
  isItem: (child: React.ReactNode) => child is React.ReactElement;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  messages?: Partial<ListReorderMessages>;
}): React.JSX.Element {
  const arr = React.Children.toArray(children);
  const itemSlots = arr.reduce<number[]>((slots, child, index) => (isItem(child) ? [...slots, index] : slots), []);
  const itemByKey = new Map<string, React.ReactElement>();
  itemSlots.forEach((slot) => {
    const element = arr[slot] as React.ReactElement;
    itemByKey.set(itemSortKey(element), element);
  });
  const baseKeys = Array.from(itemByKey.keys());

  const [order, setOrder] = React.useState<string[]>(baseKeys);
  const baseKey = baseKeys.join(' ');
  React.useEffect(() => {
    // Adopt the consumer's order whenever it hands back a NEW one (membership change or a permutation);
    // a local drag changes `order` but not `baseKey`, so it is never clobbered.
    if (order.join(' ') !== baseKey) setOrder(baseKeys);
  }, [baseKey]);
  const effectiveOrder =
    order.length === baseKeys.length && order.every((key) => itemByKey.has(key)) ? order : baseKeys;

  // One flag per position ('1' = locked), so the memo only changes when a locked flag or the order does.
  const lockedKey = effectiveOrder
    .map((key) => ((itemByKey.get(key)?.props as { locked?: boolean } | undefined)?.locked ? '1' : '0'))
    .join('');
  const lockedIndexes = React.useMemo(() => {
    const set = new Set<number>();
    for (let index = 0; index < lockedKey.length; index += 1) if (lockedKey[index] === '1') set.add(index);
    return set;
  }, [lockedKey]);

  // The row nodes, for the announcement labels (the row's visible text).
  const nodes = React.useRef(new Map<string, HTMLElement>());
  const registerNode = React.useCallback((id: string, node: HTMLElement | null) => {
    if (node) nodes.current.set(id, node);
    else nodes.current.delete(id);
  }, []);

  const sensors = useSensors(
    // ≥4px before a pointer drag starts, so a plain click on the handle never starts a drag.
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Locked rows never shift: a move that would displace one previews nothing (every transform null).
  const strategy = React.useCallback<SortingStrategy>(
    (args) => {
      if (args.overIndex >= 0 && !canMoveListItem(lockedIndexes, args.activeIndex, args.overIndex)) return null;
      if (lockedIndexes.has(args.index)) return null;
      return verticalListSortingStrategy(args);
    },
    [lockedIndexes],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      // Pure order update, then ONE `onReorder` — never inside a setState updater (StrictMode
      // double-invokes updaters, which would fire the consumer's move twice).
      const from = effectiveOrder.indexOf(String(active.id));
      const to = effectiveOrder.indexOf(String(over.id));
      if (from === -1 || to === -1 || !canMoveListItem(lockedIndexes, from, to)) return;
      const next = effectiveOrder.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      setOrder(next);
      onReorder?.(from, to);
    },
    [effectiveOrder, lockedIndexes, onReorder],
  );

  const resolvedMessages = React.useMemo(() => ({ ...LIST_REORDER_MESSAGES, ...messages }), [messages]);
  const info = React.useCallback(
    (id: UniqueIdentifier, index: number): ListReorderItemInfo => {
      const key = String(id);
      const text = (nodes.current.get(key) as unknown as { textContent?: string | null } | undefined)?.textContent?.trim();
      return { id: key, label: text || key, position: index + 1, total: effectiveOrder.length };
    },
    [effectiveOrder.length],
  );
  const indexOf = React.useCallback((id: UniqueIdentifier) => effectiveOrder.indexOf(String(id)), [effectiveOrder]);
  const announcements = React.useMemo<Announcements>(
    () => ({
      onDragStart: ({ active }) => resolvedMessages.pickedUp(info(active.id, indexOf(active.id))),
      onDragOver: ({ active, over }) => {
        if (!over) return undefined;
        const from = indexOf(active.id);
        const to = indexOf(over.id);
        return canMoveListItem(lockedIndexes, from, to) || from === to
          ? resolvedMessages.movedTo(info(active.id, to))
          : resolvedMessages.blocked(info(active.id, from));
      },
      onDragEnd: ({ active, over }) => {
        const from = indexOf(active.id);
        const to = over ? indexOf(over.id) : from;
        if (from === to) return resolvedMessages.dropped(info(active.id, from));
        return canMoveListItem(lockedIndexes, from, to)
          ? resolvedMessages.dropped(info(active.id, to))
          : resolvedMessages.blocked(info(active.id, from));
      },
      onDragCancel: ({ active }) => resolvedMessages.cancelled(info(active.id, indexOf(active.id))),
    }),
    [indexOf, info, lockedIndexes, resolvedMessages],
  );

  const rendered = arr.slice();
  itemSlots.forEach((slot, k) => {
    const key = effectiveOrder[k];
    const element = key !== undefined ? itemByKey.get(key) : undefined;
    if (!element || key === undefined) return;
    rendered[slot] = (
      <SortableListItem
        key={key}
        id={key}
        locked={!!(element.props as { locked?: boolean }).locked}
        element={element as ElementWithRef}
        registerNode={registerNode}
      />
    );
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      accessibility={{ announcements, screenReaderInstructions: { draggable: resolvedMessages.instructions } }}
    >
      <SortableContext items={effectiveOrder} strategy={strategy}>
        {rendered}
      </SortableContext>
    </DndContext>
  );
}
