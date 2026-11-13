// Table.Row (<tr>) — the selectable / expandable row leaf.
//
// A row resolves its selection + expansion state (controlled, uncontrolled, or driven by the TanStack
// row model), renders the built-in indicator/expansion control cell, and — in grouped mode — acts as a
// SELECT-ALL over its leaf descendants (selection DATA lives only on leaves). The group-selection math
// lives in `table-selection`; this file is the React state + render.

import * as React from 'react';
import { type Row, type RowData } from '@tanstack/react-table';
import { IconButton } from '../icon-button';
import type { CheckboxAui } from '../checkbox';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import { buildTableRowClasses, TABLE_DEFAULT_SCALE, type TableRowAui, type TableRowStateKey } from './use-recipe';
import {
  useTableContext,
  useTableRowContext,
  TableColumnSlotProvider,
  TableRowContextProvider,
  type DataCell,
  type DataRow,
  type TableRowContextValue,
} from './table-context';
import { isFirstCellInRow, isInteractiveTarget } from './table-roving';
import { computeGroupSelection, setLeafSelection, SELECTION_TOGGLES } from './table-selection';
import { TableCell } from './table-cell';

export interface TableRowProps<TData extends RowData = RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'onSelect'> {
  row?: Row<TData>;
  aui?: TableRowAui;
  selectable?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  expandedContent?: React.ReactNode | ((row: Row<TData>) => React.ReactNode);
  selectionLabel?: string;
  expansionLabel?: string;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  {
    row,
    aui,
    selectable,
    selected,
    defaultSelected,
    onSelectedChange,
    expandable,
    expanded,
    defaultExpanded,
    onExpandedChange,
    expandedContent,
    selectionLabel,
    expansionLabel,
    className,
    children,
    onKeyDown,
    onClick,
    ...rest
  },
  ref,
) {
  const ctx = useTableContext();
  const typedRow = row as DataRow | undefined;
  const isHeaderRow = (rest as Record<string, unknown>)['data-aui-header-row'] !== undefined;
  const a11yMode = ctx?.a11y;
  const isTree = a11yMode === 'tree';
  // tree + treegrid both carry the disclosure semantics (aria-level / setsize / posinset + ArrowRight/
  // Left expand-collapse). A flat grid does not.
  const isTreeLike = isTree || a11yMode === 'treegrid';
  const isDataRow = !isHeaderRow;

  const [localSelected, setLocalSelected] = React.useState(!!defaultSelected);
  const [localExpanded, setLocalExpanded] = React.useState(!!defaultExpanded);

  const subRowCount = typedRow?.subRows?.length ?? 0;
  const rowExpandable =
    (expandable ??
      (ctx?.expandable &&
        (typedRow ? typedRow.getCanExpand() : !!expandedContent || !!ctx.renderExpandedRow))) ??
    false;
  const isExpanded = expanded ?? (localExpanded || !!typedRow?.getIsExpanded());

  // R1b — THE GROUP MODEL IS MULTIPLE-ONLY. A grouped, expandable row WITH child rows (`getSubRows`) is
  // a GROUP HEADER only in MULTIPLE select: its indicator is a SELECT-ALL over its leaf descendants
  // (selected when all are, indeterminate when some). In SINGLE select that same parent is PURE
  // DISCLOSURE — never itself a select target, never a select-all toggle (the ADC product-picker case:
  // expand a category, single-select a product leaf). A flat/leaf row keeps per-row selection.
  const isMultiple = ctx?.selectionMode === 'multiple';
  const isDisclosureParent = ctx?.selectionMode === 'single' && rowExpandable && subRowCount > 0;
  const rootSelectable = selectable ?? ctx?.selectable ?? false;
  const canSelect = rootSelectable && (!typedRow || typedRow.getCanSelect()) && !isDisclosureParent;

  const groupSelectAll = isMultiple && canSelect && rowExpandable && subRowCount > 0;
  const groupSel = groupSelectAll && typedRow ? computeGroupSelection(typedRow) : null;

  // Composable per-level toggle visibility: a group-header toggle keys off `selectAll.group`, a leaf
  // toggle off `selectAll.child` (both default ON). Hiding the toggle does NOT disable row-click /
  // keyboard selection (those key off `canSelect`).
  const selectLevels = ctx?.selectAllLevels ?? { header: false, group: true, child: true };
  const showSelectToggle = canSelect && (groupSelectAll ? selectLevels.group : selectLevels.child);

  const isSelected = groupSel ? groupSel.allSelected : selected ?? typedRow?.getIsSelected() ?? localSelected;
  const isIndeterminate = groupSel ? groupSel.someSelected : false;

  const rowAui = aui ?? ctx?.rowAui;
  const selectionTarget = ctx?.selectionTarget ?? 'row';
  // The resolved selection state key drives BOTH the row class (when the row receives selection) and the
  // cell active-state (when the cell does).
  const selectionStateKey: TableRowStateKey | undefined = canSelect
    ? isSelected
      ? 'selected'
      : isIndeterminate
        ? 'indeterminate'
        : 'unselected'
    : undefined;
  const rowState = selectionTarget === 'row' ? selectionStateKey : undefined;
  const activeCellState = selectionTarget === 'cell' ? selectionStateKey : undefined;

  const indicatorType = ctx?.indicatorType ?? 'checkbox';
  const showIndicatorColumn = ctx?.indicatorColumn ?? true;
  const depth = typedRow?.depth ?? 0;

  const setSelected = React.useCallback(
    (next: boolean) => {
      if (groupSel && typedRow && ctx) setLeafSelection(ctx.table, groupSel.leaves, next);
      else if (typedRow) typedRow.toggleSelected(next);
      if (selected === undefined) setLocalSelected(next);
      onSelectedChange?.(next);
    },
    [ctx, groupSel, onSelectedChange, selected, typedRow],
  );

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (typedRow) typedRow.toggleExpanded(next);
      if (expanded === undefined) setLocalExpanded(next);
      onExpandedChange?.(next);
    },
    [expanded, onExpandedChange, typedRow],
  );

  // The row context carries the active cell state PLUS the resolved controls, so a USER-COMPOSED row can
  // render `Table.SelectionToggle` / `Table.ExpandTrigger` and get EXACTLY what auto mode renders.
  const rowContext = React.useMemo<TableRowContextValue>(
    () => ({
      activeCellState,
      depth,
      showSelectToggle,
      indicatorType,
      selected: isSelected,
      indeterminate: isIndeterminate,
      setSelected,
      groupSelectAll,
      rowExpandable,
      expanded: isExpanded,
      setExpanded,
      selectionLabel,
      expansionLabel,
    }),
    [
      activeCellState,
      depth,
      showSelectToggle,
      indicatorType,
      isSelected,
      isIndeterminate,
      setSelected,
      groupSelectAll,
      rowExpandable,
      isExpanded,
      setExpanded,
      selectionLabel,
      expansionLabel,
    ],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLTableRowElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isInteractiveTarget(event.target)) return;
      if (event.key === ' ' && canSelect) {
        event.preventDefault();
        setSelected(!isSelected);
      } else if (event.key === 'Enter' && rowExpandable) {
        event.preventDefault();
        setExpanded(!isExpanded);
      } else if (isTree && rowExpandable && event.key === 'ArrowRight' && !isExpanded) {
        event.preventDefault();
        setExpanded(true);
      } else if (isTree && rowExpandable && event.key === 'ArrowLeft' && isExpanded) {
        event.preventDefault();
        setExpanded(false);
      } else if (
        // R6 — TREEGRID disclosure: ArrowRight/Left expand/collapse ONLY on the leftmost (first) cell of
        // an expandable parent; stopPropagation halts the table's 2D cell navigation for this key. On an
        // already-open/closed row the event falls through to plain cell nav (APG behaviour).
        a11yMode === 'treegrid' &&
        rowExpandable &&
        ((event.key === 'ArrowRight' && !isExpanded) || (event.key === 'ArrowLeft' && isExpanded)) &&
        isFirstCellInRow(event.target)
      ) {
        event.preventDefault();
        event.stopPropagation();
        setExpanded(event.key === 'ArrowRight');
      }
    },
    [a11yMode, canSelect, isExpanded, isSelected, isTree, onKeyDown, rowExpandable, setExpanded, setSelected],
  );

  // Row-click selection (single-select / indicator-less selectable tables) — ignores clicks on an
  // interactive control (the toggle/chevron own their own state).
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLTableRowElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || !canSelect || !ctx?.rowClickSelects) return;
      if (isInteractiveTarget(event.target)) return;
      setSelected(indicatorType === 'radio' ? true : !isSelected);
    },
    [canSelect, ctx?.rowClickSelects, indicatorType, isSelected, onClick, setSelected],
  );

  const renderedChildren =
    children ?? typedRow?.getVisibleCells().map((cell) => <TableCell key={cell.id} cell={cell as DataCell} />);
  const hasRowControls = showSelectToggle || rowExpandable;
  const hasTableActionColumn = isDataRow && !!ctx && showIndicatorColumn && (ctx.selectable || ctx.expandable);
  const hasControlCell = showIndicatorColumn && (hasTableActionColumn || hasRowControls);
  // Frozen columns: publish each cell's physical slot (the auto control cell is slot 0) so a cell knows
  // whether it is in the frozen block. Only when the table freezes columns — otherwise the children
  // render untouched, exactly as before.
  const frozenSlots = ctx?.frozenSlots ?? 0;
  // A slot is a COLUMN position, not a DOM position: a cell spanning several columns (a grouped header)
  // advances the slot by its colSpan, so it is frozen only when it starts inside the frozen block.
  let nextSlot = hasControlCell ? 1 : 0;
  const slottedChildren =
    frozenSlots > 0
      ? React.Children.toArray(renderedChildren).map((child, index) => {
          const slot = nextSlot;
          const props = React.isValidElement(child)
            ? (child.props as { colSpan?: number; header?: { colSpan?: number } })
            : undefined;
          nextSlot += Math.max(1, props?.colSpan ?? props?.header?.colSpan ?? 1);
          return (
            <TableColumnSlotProvider
              key={React.isValidElement(child) && child.key != null ? child.key : index}
              value={slot}
            >
              {child}
            </TableColumnSlotProvider>
          );
        })
      : renderedChildren;
  const visibleCellCount = typedRow?.getVisibleCells().length ?? React.Children.count(renderedChildren);
  // R1 — the detail region (renderExpandedRow / expandedContent) is the LEAF escape hatch ONLY. A row
  // WITH child rows (subRows) discloses its children instead, so the two never render on the same row.
  const expandedNode =
    subRowCount > 0
      ? null
      : typeof expandedContent === 'function'
        ? typedRow
          ? expandedContent(typedRow)
          : null
        : expandedContent ?? (typedRow && ctx?.renderExpandedRow ? ctx.renderExpandedRow(typedRow) : null);

  // R6 — ARIA row semantics. grid/treegrid/table → role="row"; a tree data row → "treeitem", a tree
  // header row → "presentation" (the <thead> is presentational in a tree). aria-level + set-size/position
  // apply to the DISCLOSURE modes (tree + treegrid) on model rows (a flat grid/table row has no level).
  const rowRole = isTree
    ? isDataRow
      ? 'treeitem'
      : 'presentation'
    : a11yMode === 'grid' || a11yMode === 'treegrid' || a11yMode === 'table'
      ? 'row'
      : undefined;
  const discloseAria = isTreeLike && isDataRow && !!typedRow;
  const parentRow = typedRow?.getParentRow();
  const siblingRows = discloseAria
    ? parentRow
      ? parentRow.subRows
      : ctx?.table.getCoreRowModel().rows
    : undefined;
  const posInSet =
    discloseAria && typedRow && siblingRows ? siblingRows.findIndex((r) => r.id === typedRow.id) + 1 : undefined;
  const setSize = siblingRows ? siblingRows.length : undefined;

  return (
    <>
      <tr
        ref={ref}
        {...rest}
        className={mergeAuiClasses([buildTableRowClasses(rowAui, rowState, ctx?.density), className])}
        role={rowRole}
        data-aui-table-row=""
        data-selected={rowState === 'selected' ? '' : undefined}
        data-indeterminate={rowState === 'indeterminate' ? '' : undefined}
        data-expanded={rowExpandable && isExpanded ? '' : undefined}
        data-depth={depth ? String(depth) : undefined}
        style={
          depth
            ? { ...(rest as { style?: React.CSSProperties }).style, ['--aui-table-depth' as string]: String(depth) }
            : (rest as { style?: React.CSSProperties }).style
        }
        aria-level={discloseAria ? depth + 1 : undefined}
        aria-setsize={setSize}
        aria-posinset={posInSet}
        aria-selected={canSelect ? isSelected : undefined}
        aria-expanded={rowExpandable ? isExpanded : undefined}
        tabIndex={isTree && isDataRow ? -1 : undefined}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >
        <TableRowContextProvider value={rowContext}>
          {hasControlCell ? (
            <TableColumnSlotProvider value={frozenSlots > 0 ? 0 : undefined}>
              <TableCell className="aui-table-cell--control" data-aui-table-control-cell>
                {hasRowControls ? (
                  // AUTO mode renders the SAME parts a user-composed row would (single source of truth).
                  // Each part reads the row context and self-gates (no-op when its condition is off).
                  <span className="aui-table-control-stack">
                    <TableSelectionToggle />
                    <TableExpandTrigger />
                  </span>
                ) : null}
              </TableCell>
            </TableColumnSlotProvider>
          ) : null}
          {slottedChildren}
        </TableRowContextProvider>
      </tr>
      {rowExpandable && isExpanded && expandedNode ? (
        <tr
          className="aui-table-row aui-table-expanded-row"
          data-aui-table-row=""
          data-expanded-row=""
          role={isTree ? 'presentation' : undefined}
        >
          <TableCell colSpan={visibleCellCount + (hasControlCell ? 1 : 0)}>
            <div className="aui-table-expanded-region" role="rowgroup">
              {expandedNode}
            </div>
          </TableCell>
        </tr>
      ) : null}
    </>
  );
});
TableRow.displayName = 'Table.Row';

// ─── Table.SelectionToggle — the row's selection control, for USER-COMPOSED rows ──────────────────
// A thin part that reads the row context and renders EXACTLY the toggle auto mode renders (the shipped
// Checkbox/Radio/Switch per `indicatorType`, wired to the row's selection state + setter). Returns null
// outside a `Table.Row` OR when the row isn't selectable / the toggle level is off — so it's safe to drop
// into any cell. A consumer `aria-label`/`aui` overrides the row defaults.
export interface TableSelectionToggleProps {
  'aria-label'?: string;
  /** The FULL toggleable aui — the shipped Checkbox/Radio/Switch already carry per-state appearance,
   *  so a consumer can give the control a selected/unselected treatment, not just a size. */
  aui?: CheckboxAui;
}
const TableSelectionToggle = React.forwardRef<HTMLElement, TableSelectionToggleProps>(
  function TableSelectionToggle({ 'aria-label': ariaLabel, aui }, ref) {
    const ctx = useTableRowContext();
    // The Root density (aui.scale) so the toggle TRACKS the table tier instead of pinning a hardcoded
    // `xs` — an explicit per-control `aui.scale` still wins, else the table density, else the neutral
    // vocab default (G15: a reference, never a stale literal). Mirrors the use-recipe density comment.
    const tableCtx = useTableContext();
    if (!ctx || !ctx.showSelectToggle || !ctx.indicatorType || !ctx.setSelected) return null;
    // The toggle registry type doesn't declare a ref, but the controls ARE forwardRef components — build
    // the props as a Record so `ref` rides through without fighting the union prop type.
    const Toggle = SELECTION_TOGGLES[ctx.indicatorType] as React.ComponentType<Record<string, unknown>>;
    const setSelected = ctx.setSelected;
    const toggleProps: Record<string, unknown> = {
      ref,
      selected: !!ctx.selected,
      onSelectedChange: (next: boolean) => setSelected(next),
      'aria-label': ariaLabel ?? ctx.selectionLabel ?? (ctx.groupSelectAll ? 'Select all rows in group' : 'Select row'),
      // Precedence: an explicit per-control `aui` wins; else the Root's `selectionToggleAui` (so an
      // AUTO-rendered control cell is stylable at all); else just the resolved density. The Root
      // appearance keeps the resolved scale unless it names its own.
      aui: aui ?? {
        scale: resolveAuiScale(undefined, tableCtx?.density.scale, TABLE_DEFAULT_SCALE),
        ...tableCtx?.selectionToggleAui,
      },
    };
    if (ctx.indicatorType === 'checkbox' && ctx.indeterminate) toggleProps.indeterminate = true;
    return <Toggle {...toggleProps} />;
  },
);
TableSelectionToggle.displayName = 'Table.SelectionToggle';

// ─── Table.ExpandTrigger — the row's expand/collapse chevron, for USER-COMPOSED rows ──────────────
// A thin part that reads the row context and renders the SAME chevron IconButton auto mode renders.
// Returns null outside a `Table.Row` or when the row isn't expandable. A consumer `aria-label`/`aui`
// overrides the row defaults.
export interface TableExpandTriggerProps {
  'aria-label'?: string;
  aui?: React.ComponentProps<typeof IconButton>['aui'];
}
const TableExpandTrigger = React.forwardRef<HTMLButtonElement, TableExpandTriggerProps>(
  function TableExpandTrigger({ 'aria-label': ariaLabel, aui }, ref) {
    const ctx = useTableRowContext();
    // The Root density (aui.scale) so the chevron TRACKS the table tier instead of pinning a hardcoded
    // `xs` — a consumer `aui` still fully overrides; the default case threads density (G15).
    const tableCtx = useTableContext();
    if (!ctx || !ctx.rowExpandable || !ctx.setExpanded) return null;
    const setExpanded = ctx.setExpanded;
    const expanded = !!ctx.expanded;
    return (
      <IconButton
        ref={ref}
        // A SINGLE `chevron-right` glyph that ROTATES 90° to point down when the row is expanded (the
        // `.aui-table-expand-trigger` marker drives the compositor transform in `_state-cascade.scss`,
        // keyed off the row's `data-expanded`) — the ONLY table disclosure animation. Swapping the glyph
        // name instead would give nothing to transition.
        className="aui-table-expand-trigger"
        name="chevron-right"
        layer="monotone"
        aria-label={ariaLabel ?? ctx.expansionLabel ?? (expanded ? 'Collapse row' : 'Expand row')}
        aui={
          aui ?? tableCtx?.expandTriggerAui ?? {
            scale: resolveAuiScale(undefined, tableCtx?.density.scale, TABLE_DEFAULT_SCALE),
            profile: 'square-compact',
            shape: 'soft',
            paint: 'text',
          }
        }
        onClick={() => setExpanded(!expanded)}
      />
    );
  },
);
TableExpandTrigger.displayName = 'Table.ExpandTrigger';

export { TableRow, TableSelectionToggle, TableExpandTrigger };
