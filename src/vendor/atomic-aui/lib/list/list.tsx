// modules/design/atomic-aui/src/lib/list/list.tsx
//
// List — a consumer-owned list stack with selectable rows. It deliberately has no
// Base UI controller: no value model, roving focus, typeahead, menu trap, or hidden input.
import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import {
  createAtomicPart,
  type PartStyleProps,
} from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { ContainedIcon, type ContainedIconAui, type ContainedIconProps } from '../icon';
import { Type, type TypeProps } from '../type';
import {
  buildListItemClasses,
  listItemStateKey,
  resolveListItemScale,
  LIST_ITEM_DEFAULT_SCALE,
  useListRecipe,
  type ListAui,
  type ListItemAui,
  type ListItemStateKey,
  type ListScale,
} from './use-recipe';
import {
  ReorderableListItems,
  useListSortableItem,
  type ListReorderMessages,
} from './list-reorder';

export { LIST_REORDER_MESSAGES, canMoveListItem } from './list-reorder';
export type { ListReorderItemInfo, ListReorderMessages } from './list-reorder';

export {
  LIST_ITEM_DEFAULT_SCALE,
  LIST_ITEM_STATE_KEYS,
  LIST_ITEM_SX_AXES,
  LIST_ITEM_VOCAB,
  LIST_ROOT_DEFAULT_SCALE,
  LIST_ROOT_SX_AXES,
  LIST_ROOT_VOCAB,
  useListRecipe,
} from './use-recipe';
export type {
  ListAui,
  ListColor,
  ListElevation,
  ListItemAui,
  ListItemStateAppearance,
  ListItemStateKey,
  ListPaint,
  ListProfile,
  ListScale,
  ListShape,
} from './use-recipe';

const STATE_LAYER_CLASSES = 'aui-stateful aui-focus-color-info aui-focus-width-2';

interface ListItemContextValue {
  scale: ListScale;
  state: ListItemStateKey;
}

const DEFAULT_LIST_ITEM_CONTEXT: ListItemContextValue = {
  scale: LIST_ITEM_DEFAULT_SCALE,
  state: 'unselected',
};

const ListItemContext = React.createContext<ListItemContextValue>(DEFAULT_LIST_ITEM_CONTEXT);

const _ListRoot = createAtomicComponent('div', {
  extensions: [useListRecipe],
});

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  aui?: ListAui;
  /** drag-to-reorder the `List.Item` children from their `List.DragHandle`. Default false. */
  reorderable?: boolean;
  /** Called once per completed reorder with the moved item's old and new item index. */
  onReorder?: (fromIndex: number, toIndex: number) => void;
  /** Override the built-in English screen-reader reorder strings. */
  reorderMessages?: Partial<ListReorderMessages>;
}

function isListItemElement(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === ListItem;
}

const ListRoot = React.forwardRef<HTMLDivElement, ListProps>(function List(
  { aui, reorderable = false, onReorder, reorderMessages, children, ...rest },
  ref,
) {
  const content = reorderable ? (
    <ReorderableListItems isItem={isListItemElement} onReorder={onReorder} messages={reorderMessages}>
      {children}
    </ReorderableListItems>
  ) : (
    children
  );
  return React.createElement(_ListRoot as React.ElementType, { ref, ...rest, aui }, content);
});
ListRoot.displayName = 'List';

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  aui?: ListItemAui;
  selected?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  as?: React.ElementType;
  /** a reorderable List keeps a locked item in place; nothing can move past it. */
  locked?: boolean;
}

function isNativelyInteractiveTag(tag: React.ElementType): boolean {
  return tag === 'button' || tag === 'a';
}

function hasListPartChild(children: React.ReactNode, part: React.ElementType): boolean {
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;
    if (child.type === part) return true;
    if (child.type === React.Fragment) {
      return hasListPartChild((child.props as { children?: React.ReactNode }).children, part);
    }
    return false;
  });
}

// Only declared List item parts opt out of text wrapping; arbitrary children route through Type.
function renderListItemAnatomy(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).map((child, index) => {
    if (!React.isValidElement(child)) {
      if (child === null || child === undefined || typeof child === 'boolean') return child;
      return <ListItemText key={`text-${index}`}>{child}</ListItemText>;
    }

    if (child.type === React.Fragment) {
      return (
        <React.Fragment key={child.key ?? `fragment-${index}`}>
          {renderListItemAnatomy((child.props as { children?: React.ReactNode }).children)}
        </React.Fragment>
      );
    }

    if (
      child.type === ListItemIcon ||
      child.type === ListItemText ||
      child.type === ListItemIndicator ||
      child.type === ListDragHandle ||
      child.type === ListItemActions
    ) {
      return child;
    }

    return <ListItemText key={child.key ?? `text-${index}`}>{child}</ListItemText>;
  });
}

const ListItem = React.forwardRef<HTMLElement, ListItemProps>(function ListItem(
  {
    aui,
    selected,
    indeterminate,
    disabled,
    interactive = false,
    as,
    locked: _locked,
    className,
    role,
    tabIndex,
    onKeyDown,
    onClick,
    onClickCapture,
    children,
    ...rest
  },
  ref,
) {
  const activeState = listItemStateKey({ selected, indeterminate });
  const itemScale = resolveListItemScale(aui, activeState);
  const recipe = buildListItemClasses(aui, activeState, disabled);
  const composedClassName = mergeAuiClasses([
    interactive ? STATE_LAYER_CLASSES : undefined,
    recipe,
    className,
  ]);
  const Tag = (as ?? 'div') as React.ElementType;
  const nativeInteractive = isNativelyInteractiveTag(Tag);
  const effectiveRole = role ?? (Tag === 'button' ? 'button' : Tag === 'a' ? 'link' : 'button');

  const interactionProps: React.HTMLAttributes<HTMLElement> & {
    'aria-disabled'?: boolean;
    'aria-pressed'?: boolean | 'mixed';
    'data-disabled'?: string;
    'data-indeterminate'?: string;
    'data-selected'?: string;
    disabled?: boolean;
  } = {};

  if (activeState === 'selected') interactionProps['data-selected'] = '';
  if (activeState === 'indeterminate') interactionProps['data-indeterminate'] = '';
  if (disabled) interactionProps['data-disabled'] = '';

  if (interactive) {
    // Non-native hosts get button-like keyboard activation; native controls keep their own semantics.
    if (!nativeInteractive) {
      interactionProps.role = role ?? 'button';
      interactionProps.tabIndex = tabIndex ?? (disabled ? -1 : 0);
      interactionProps.onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (disabled) return;
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault();
          (event.currentTarget as unknown as { click(): void }).click();
        }
      };
    } else {
      if (role !== undefined) interactionProps.role = role;
      if (tabIndex !== undefined || disabled) interactionProps.tabIndex = tabIndex ?? -1;
      if (onKeyDown !== undefined) interactionProps.onKeyDown = onKeyDown;
      if (Tag === 'button' && disabled) interactionProps.disabled = true;
    }
    if (effectiveRole === 'button' && (selected !== undefined || indeterminate !== undefined)) {
      interactionProps['aria-pressed'] = indeterminate ? 'mixed' : !!selected;
    }
    if (disabled) {
      interactionProps['aria-disabled'] = true;
    }
    interactionProps.onClick = (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };
    interactionProps.onClickCapture = (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClickCapture?.(event);
    };
  } else {
    if (role !== undefined) interactionProps.role = role;
    if (tabIndex !== undefined) interactionProps.tabIndex = tabIndex;
    if (onKeyDown !== undefined) interactionProps.onKeyDown = onKeyDown;
    if (onClick !== undefined) interactionProps.onClick = onClick;
    if (onClickCapture !== undefined) interactionProps.onClickCapture = onClickCapture;
  }

  const body = renderListItemAnatomy(children);
  // Keep a real indicator mounted so selected/unselected rows share the same geometry.
  const indicator = hasListPartChild(children, ListItemIndicator)
    ? null
    : <ListItemIndicator />;

  return (
    <Tag ref={ref} {...rest} className={composedClassName} {...interactionProps}>
      <ListItemContext.Provider value={{ scale: itemScale, state: activeState }}>
        {body}
        {indicator}
      </ListItemContext.Provider>
    </Tag>
  );
});
ListItem.displayName = 'List.Item';

export type ListItemIconProps = ContainedIconProps;

const ListItemIcon = React.forwardRef<HTMLSpanElement, ListItemIconProps>(
  function ListItemIcon({ aui, layer, className, ...rest }, ref) {
    const item = React.useContext(ListItemContext);
    // ItemIcon stays a real ContainedIcon; its default scale follows the row's active state.
    const resolvedAui = React.useMemo<ContainedIconAui>(
      () => ({ profile: 'contained' as const, ...aui, scale: aui?.scale ?? item.scale }),
      [aui, item.scale],
    );
    return (
      <ContainedIcon
        ref={ref}
        {...(rest as ContainedIconProps)}
        layer={layer ?? 'monotone'}
        aui={resolvedAui}
        className={prependMarkerClassName('aui-list-item-icon', className) as string | undefined}
      />
    );
  },
);
ListItemIcon.displayName = 'List.ItemIcon';

export type ListItemActionsProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Trailing controls of a row (Switch, IconButton, List.DragHandle): a fixed, right-aligned, vertically
 * centred group that is never wrapped as label text, so it stays put when the label wraps.
 */
const ListItemActions = React.forwardRef<HTMLSpanElement, ListItemActionsProps>(
  function ListItemActions({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        {...rest}
        className={prependMarkerClassName('aui-list-item-actions', className) as string | undefined}
      />
    );
  },
);
ListItemActions.displayName = 'List.ItemActions';

export type ListItemTextProps = TypeProps;

const ListItemText = React.forwardRef<HTMLElement, ListItemTextProps>(
  function ListItemText({ as, className, ...rest }, ref) {
    return (
      <Type
        ref={ref}
        as={as ?? 'span'}
        {...rest}
        className={prependMarkerClassName('aui-list-item-text', className) as string | undefined}
      />
    );
  },
);
ListItemText.displayName = 'List.ItemText';

const _ListItemIndicator = createAtomicPart<
  React.ComponentPropsWithoutRef<'span'> & PartStyleProps
>('span', 'aui-list-item-indicator', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'default',
});

export type ListItemIndicatorProps = React.ComponentPropsWithoutRef<'span'> & PartStyleProps;

function listIndicatorHasPaintedSurface(aui: PartStyleProps['aui']): boolean {
  if (!aui) return false;
  if (aui.sx?.background !== undefined && aui.sx.background !== 'transparent') return true;
  if (aui.paint === 'text') return false;
  return aui.color !== undefined || aui.paint !== undefined;
}

const ListItemIndicator = React.forwardRef<HTMLSpanElement, ListItemIndicatorProps>(
  function ListItemIndicator({ children, ...incoming }, ref) {
    const item = React.useContext(ListItemContext);
    const rest = { ...incoming };
    // The indicator is decorative even when customized; state is re-stamped for marker CSS only.
    delete rest.tabIndex;
    const content = children === undefined
      ? <span className="aui-list-item-indicator-mark" aria-hidden="true" />
      : children;

    return React.createElement(_ListItemIndicator as React.ElementType, {
      ref,
      ...rest,
      'aria-hidden': true,
      'data-selected': item.state === 'selected' ? '' : undefined,
      'data-indeterminate': item.state === 'indeterminate' ? '' : undefined,
      'data-aui-painted': listIndicatorHasPaintedSurface(incoming.aui) ? '' : undefined,
      children: content,
    });
  },
);
ListItemIndicator.displayName = 'List.ItemIndicator';

export interface ListSeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  orientation?: 'horizontal' | 'vertical';
}

const ListSeparator = React.forwardRef<HTMLDivElement, ListSeparatorProps>(
  function ListSeparator(props, ref) {
    const {
      className,
      role = 'separator',
      orientation,
      ...rawRest
    } = props as ListSeparatorProps & { aui?: unknown };
    const rest = { ...rawRest };
    // Separator is marker-only until Divider exists, so stray aui props must not reach the DOM.
    delete (rest as { aui?: unknown }).aui;
    const ariaOrientation =
      (rest as React.AriaAttributes)['aria-orientation'] ??
      (orientation === 'vertical' ? 'vertical' : undefined);
    delete (rest as React.AriaAttributes)['aria-orientation'];
    return (
      <div
        ref={ref}
        {...rest}
        role={role}
        data-orientation={orientation}
        aria-orientation={ariaOrientation}
        className={prependMarkerClassName('aui-list-separator', className) as string | undefined}
      />
    );
  },
);
ListSeparator.displayName = 'List.Separator';

export interface ListDragHandleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name of the handle. Default "Reorder". */
  label?: string;
}

const ListDragHandle = React.forwardRef<HTMLButtonElement, ListDragHandleProps>(
  function ListDragHandle({ label = 'Reorder', className, children, ...rest }, ref) {
    const sortable = useListSortableItem();
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        sortable?.setActivatorNodeRef(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref, sortable],
    );
    // Outside a reorderable List (or on a locked item) the handle is inert.
    const inert = !sortable || sortable.locked;
    return (
      <button
        type="button"
        aria-label={label}
        {...(inert ? {} : sortable.attributes)}
        {...(inert ? {} : sortable.listeners)}
        {...rest}
        ref={setRefs}
        disabled={inert || rest.disabled}
        className={prependMarkerClassName('aui-list-drag-handle', className) as string | undefined}
        onClick={(event) => {
          // The handle never activates the row it sits in.
          event.stopPropagation();
          rest.onClick?.(event);
        }}
      >
        {children ?? (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="6" cy="4" r="1.25" /><circle cx="10" cy="4" r="1.25" />
            <circle cx="6" cy="8" r="1.25" /><circle cx="10" cy="8" r="1.25" />
            <circle cx="6" cy="12" r="1.25" /><circle cx="10" cy="12" r="1.25" />
          </svg>
        )}
      </button>
    );
  },
);
ListDragHandle.displayName = 'List.DragHandle';

interface ListComponent
  extends React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof ListItem;
  ItemIcon: typeof ListItemIcon;
  ItemText: typeof ListItemText;
  ItemIndicator: typeof ListItemIndicator;
  Separator: typeof ListSeparator;
  DragHandle: typeof ListDragHandle;
  ItemActions: typeof ListItemActions;
}

export const List = Object.assign(ListRoot, {
  Item: ListItem,
  ItemIcon: ListItemIcon,
  ItemText: ListItemText,
  ItemIndicator: ListItemIndicator,
  Separator: ListSeparator,
  DragHandle: ListDragHandle,
  ItemActions: ListItemActions,
}) as ListComponent;

export default List;
