// Table.Cell (<td>) + Table.HeaderCell (<th>) — the two cell leaves (rebuilt).
//
// Both are INTRINSIC stateful/stateless leaves: <td>/<th> have no Base UI render-state and the factory's
// function-className `as`-guard rejects an intrinsic string `as`, so they build their class string +
// painted-surface flag through the single `resolveCellSurface` helper (NOT `createAtomicComponent`).
//
//   • Table.Cell       — a SELECTABLE <td>. In GRID mode it is a roving tab stop. When the unified
//                        selection target routes to the CELL it paints the per-state selected /
//                        unselected / indeterminate look via its OWN aui.states (the row publishes the
//                        active state through TableRowContext); in ROW selection the row carries the
//                        look and the cell is inert. An optional hover layer applies on cell-hover.
//   • Table.HeaderCell — a STATELESS <th> (scope="col"), the opaque header band.
//
// The class + painted decision lives ENTIRELY in `resolveCellSurface` (use-recipe), so each component
// body below stays a thin render with no recipe logic.

import * as React from 'react';
import { flexRender, type Cell as TanStackCell, type Header, type RowData } from '@tanstack/react-table';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { resolveCellSurface, resolveColumnLayout, type TableCellAui } from './use-recipe';
import { useTableColumnSlot, useTableContext, useTableRowContext } from './table-context';
import { ContainedIcon } from '../icon';
import { Type } from '../type';

// Frozen columns (gap 3): a cell whose physical slot falls inside the table's frozen block stamps
// `data-aui-table-frozen` (the sticky + opaque-surface cascade keys off it), reads its slot's measured
// offset through the `--aui-table-frozen-offset` hook, and the LAST frozen slot also stamps
// `data-aui-table-frozen-last` (the separator hairline). Returns nothing when the cell is not frozen,
// so a table without `frozenColumns` renders byte-identical cells.
function useFrozenCell(
  style: React.CSSProperties | undefined,
  span = 1,
): { style: React.CSSProperties | undefined; attrs: Record<string, string | undefined> } {
  const ctx = useTableContext();
  const slot = useTableColumnSlot();
  const frozenSlots = ctx?.frozenSlots ?? 0;
  // A cell is frozen only when it lies ENTIRELY inside the frozen block (a spanning group header that
  // reaches past it scrolls with the rest).
  if (slot == null || slot + Math.max(1, span) > frozenSlots) return { style, attrs: {} };
  return {
    style: { ...style, ['--aui-table-frozen-offset' as string]: `var(--aui-table-frozen-offset-${slot}, 0px)` },
    attrs: {
      'data-aui-table-frozen': '',
      'data-aui-table-frozen-last': slot + Math.max(1, span) === frozenSlots ? '' : undefined,
    },
  };
}

// The cell's hover state layer — applied only when the resolved hover target is the cell (the
// hand-built intrinsic analog of core/state/use-state-layer).
const CELL_HOVER_LAYER = 'aui-stateful aui-focus-color-info aui-focus-width-2';

export interface TableCellProps<TData extends RowData = RowData> extends React.TdHTMLAttributes<HTMLElement> {
  aui?: TableCellAui;
  cell?: TanStackCell<TData, unknown>;
  /**
   * R8 — the cell's value failed validation. Stamps `aria-invalid` + `data-aui-invalid`, which the
   * state cascade paints as an error-toned edge on the cell.
   *
   * COLOR ONLY, never paint (the Field law): an invalid cell recolours, it does not change its box
   * treatment — so an invalid cell in a striped/selected row keeps that row's surface.
   */
  invalid?: boolean;
  /**
   * R8 — the inline validation message for THIS cell, rendered under its control.
   *
   * A SLOT, not a part (matching `CardGroup.Item`'s `actions`): the message is one node with no
   * sub-anatomy, so a public part would add a namespace entry, a `/v6` registry row and a doc surface
   * to carry a single `<span>`.
   *
   * It has to survive `scroll="self"`, where `table-layout: fixed` takes column widths from the fixed
   * `<thead>`. Because widths come from the head, a long message WRAPS inside its column instead of
   * widening it, so an error can never break head/body column alignment — the constraint that decided
   * this could be inline at all.
   *
   * The message is cell CONTENT, so a screen reader reaching the (aria-invalid) cell reads it in
   * place — no per-cell live region, which in a grid of editable cells would be unusable noise.
   */
  error?: React.ReactNode;
}

const TableCell = React.forwardRef<HTMLElement, TableCellProps>(function TableCell(
  { aui, cell, invalid, error, className, children, tabIndex, style, ...rest },
  ref,
) {
  const ctx = useTableContext();
  const rowCtx = useTableRowContext();
  const isTree = ctx?.a11y === 'tree';
  // Plain `table` mode: native cell semantics (`role="cell"`), NO roving tab stop / rove marker — the
  // cell's own controls sit in the natural tab order.
  const isPlainTable = ctx?.a11y === 'table';

  // CELL-SELECTION RULE: the row publishes `activeCellState` ONLY when the unified target routes
  // selection to the cell — so the cell paints its own per-state look there, and stays inert (undefined)
  // when the row owns the selected look.
  const effectiveAui = aui ?? ctx?.cellAui;
  const { className: auiClass, painted } = resolveCellSurface(
    'body',
    effectiveAui,
    rowCtx?.activeCellState,
    ctx?.density,
  );
  // DATA-mode per-column geometry (width + text-align) read off the TanStack columnDef. The align is the
  // BASE class (a cell `aui.sx.textAlign` wins via merge dedup); the width rides the `--aui-width` hook
  // and is suppressed when the cell sets its own `sx.width`.
  const { alignClass, width: colWidth } = resolveColumnLayout(
    cell?.column.columnDef,
    effectiveAui?.sx?.width != null,
  );
  const frozen = useFrozenCell(
    colWidth != null ? { ...style, ['--aui-width' as string]: `${colWidth}px` } : style,
  );
  const hoverLayer = ctx?.hoverable && ctx?.hoverTarget === 'cell' ? CELL_HOVER_LAYER : undefined;
  const content = children ?? (cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null);

  // GRID + TREEGRID rove cells (data-aui-table-cell + roving tabindex) and the cell is a `gridcell`
  // (R6 — a grid/treegrid root replaces the native table semantics, so descendants need explicit roles).
  // TREE roves rows, so the cell is presentational and never a tab stop. Plain `table` renders `role=cell`
  // with NO roving tab stop / rove marker (a consumer `tabIndex` still passes through).
  return (
    <td
      ref={ref}
      {...rest}
      {...frozen.attrs}
      style={frozen.style}
      tabIndex={isTree ? undefined : isPlainTable ? tabIndex : tabIndex ?? -1}
      role={isTree ? 'presentation' : isPlainTable ? 'cell' : ctx ? 'gridcell' : undefined}
      data-aui-table-cell={isTree || isPlainTable ? undefined : ''}
      data-aui-table-cell-painted={painted ? '' : undefined}
      aria-invalid={invalid ? true : undefined}
      data-aui-invalid={invalid ? '' : undefined}
      className={mergeAuiClasses([alignClass, auiClass, hoverLayer, className])}
    >
      {content}
      {error != null ? (
        <Type as="span" role="l6" color="error" className="aui-table-cell-error">
          {error}
        </Type>
      ) : null}
    </td>
  );
});
TableCell.displayName = 'Table.Cell';

/** R7 — a column's live sort direction. `false` = sortable but not currently sorted. */
export type TableSortDirection = 'asc' | 'desc' | false;

export interface TableHeaderCellProps<TData extends RowData = RowData>
  extends React.ThHTMLAttributes<HTMLElement> {
  aui?: TableCellAui;
  header?: Header<TData, unknown>;
  /**
   * R7, USER-COMPOSED mode: this column's current sort direction. Supplying it (with the Root's
   * `sortable`) turns the header into a sort button — the CONSUMER orders the rows, because a
   * user-composed table has no row model for the DS to sort. In DATA mode leave both unset: the
   * direction and the toggle come from the TanStack `header`.
   */
  sortDirection?: TableSortDirection;
  /** R7, USER-COMPOSED mode: called when the header's sort button is activated. */
  onSortToggle?: () => void;
  /**
   * extra header controls (e.g. a filter / column-menu trigger), rendered AFTER the
   * label or sort button — a SIBLING of the sort button, never nested in it, so the two stay separate
   * tab stops. With actions present the header lays out as `label | actions` across the cell, and
   * Enter on the focused header cell itself sorts. Unset → the header DOM is unchanged.
   */
  actions?: React.ReactNode;
}

const TableHeaderCell = React.forwardRef<HTMLElement, TableHeaderCellProps>(function TableHeaderCell(
  {
    aui,
    header,
    sortDirection,
    onSortToggle,
    actions,
    onKeyDown,
    className,
    children,
    tabIndex,
    scope = 'col',
    colSpan,
    style,
    ...rest
  },
  ref,
) {
  const ctx = useTableContext();
  const isTree = ctx?.a11y === 'tree';
  const isPlainTable = ctx?.a11y === 'table';

  // The header is STATELESS — it threads density but never an active selection state (selection paints
  // on the body cell / row, not the header). Its default solid `overlay` band paints through the same
  // `painted` hook the body cell uses; a `paint:'text'` override flips `painted` off → flat header.
  const effectiveAui = aui ?? ctx?.headerCellAui;
  const { className: auiClass, painted } = resolveCellSurface('header', effectiveAui, undefined, ctx?.density);
  // DATA-mode per-column geometry — same width/align resolution as the body cell, so a header aligns with
  // its body column (esp. under the `table-layout:fixed` self-scroll path).
  const { alignClass, width: colWidth } = resolveColumnLayout(
    header?.column.columnDef,
    effectiveAui?.sx?.width != null,
  );
  const frozen = useFrozenCell(
    colWidth != null ? { ...style, ['--aui-width' as string]: `${colWidth}px` } : style,
    colSpan ?? header?.colSpan,
  );
  const content =
    children ??
    (header && !header.isPlaceholder ? flexRender(header.column.columnDef.header, header.getContext()) : null);

  // ── R7 sorting ───────────────────────────────────────────────────────────────────────────────
  // ONE affordance, two sources. DATA mode reads the direction + toggle off the TanStack column;
  // USER-COMPOSED mode takes them as props (there is no row model to sort, so the consumer orders
  // the rows and the DS supplies only the button, the `aria-sort`, and the glyph). Both require the
  // Root's `sortable` opt-in: a header must never silently become a button.
  const dataCanSort = !!header && !header.isPlaceholder && header.column.getCanSort();
  const isSortable = !!ctx?.sortable && (dataCanSort || onSortToggle != null);
  const direction: TableSortDirection = isSortable
    ? dataCanSort
      ? (header as Header<RowData, unknown>).column.getIsSorted()
      : sortDirection ?? false
    : false;
  const toggleSort = dataCanSort
    ? (header as Header<RowData, unknown>).column.getToggleSortingHandler()
    : onSortToggle;

  // header actions. `null` / `false` / `undefined` count as "no actions" so a
  // `renderHeaderActions` that returns null for a column keeps that header's DOM unchanged.
  const hasActions = actions != null && actions !== false;
  const sortControl = isSortable ? (
    <button
      type="button"
      className="aui-table-sort-button"
      data-aui-sort={direction === false ? 'none' : direction}
      onClick={toggleSort as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
      {/* A single chevron that FLIPS between ascending and descending. It stays in the DOM when
          unsorted so activating a header never shifts the row's layout — the state-cascade rule
          fades it instead (revealed on hover/focus as the sort affordance hint). */}
      <ContainedIcon
        className="aui-table-sort-indicator"
        name={direction === 'asc' ? 'chevron-up' : 'chevron-down'}
        layer="monotone"
        aria-hidden="true"
        aui={{ scale: 'xs', profile: 'contained', paint: 'text' }}
      />
    </button>
  ) : null;
  // With actions the header cell holds TWO tab stops (sort button + action trigger), so the roving
  // cell itself takes Enter for sort (the APG grid "cell with several widgets" pattern). Only when the
  // event lands on the <th> — a keypress on the action trigger stays the trigger's own.
  const handleHeaderKeyDown =
    hasActions && isSortable
      ? (event: React.KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.key !== 'Enter' || event.target !== event.currentTarget) return;
          event.preventDefault();
          (toggleSort as ((e: unknown) => void) | undefined)?.(event);
        }
      : onKeyDown;

  return (
    <th
      ref={ref}
      {...rest}
      {...frozen.attrs}
      style={frozen.style}
      scope={scope}
      colSpan={colSpan ?? header?.colSpan}
      tabIndex={isPlainTable ? tabIndex : tabIndex ?? -1}
      role={isTree ? 'presentation' : ctx ? 'columnheader' : undefined}
      // WAI-ARIA: `aria-sort` belongs on the COLUMN HEADER, not on the button inside it. A sortable
      // but unsorted column announces `none`; a non-sortable column carries no attribute at all.
      aria-sort={
        isSortable
          ? direction === 'asc'
            ? 'ascending'
            : direction === 'desc'
              ? 'descending'
              : 'none'
          : undefined
      }
      data-aui-table-cell={isTree || isPlainTable ? undefined : ''}
      data-aui-table-cell-painted={painted ? '' : undefined}
      data-aui-table-sortable={isSortable ? '' : undefined}
      className={mergeAuiClasses([alignClass, auiClass, className])}
      data-aui-table-header-actions={hasActions ? '' : undefined}
      onKeyDown={handleHeaderKeyDown}
    >
      {hasActions ? (
        <span className="aui-table-header-content">
          {/* The label box fills the free space and inherits the header's text-align, so a sortable
              (inline-flex) button or plain label still sits start / centre / end like any header. */}
          <span className="aui-table-header-label">{sortControl ?? content}</span>
          <span className="aui-table-header-actions">{actions}</span>
        </span>
      ) : (
        sortControl ?? content
      )}
    </th>
  );
});
TableHeaderCell.displayName = 'Table.HeaderCell';

/**
 * R8 — `Table.CellError`: the inline validation message for ONE cell, composed INSIDE that cell under
 * its control.
 *
 * Why a part and not "just render a `<Type>`": the message needs the error foreground, the compact
 * caption typescale, and a marker the cell's own cascade can key on — and it has to survive
 * `scroll="self"`, where `table-layout: fixed` takes column widths from the fixed `<thead>`. Because
 * widths come from the head, a long message WRAPS inside its column instead of widening it, so an
 * error can never break head/body column alignment. That is the constraint that kept this a DS part
 * rather than app-side markup.
 *
 * The message is cell CONTENT, so a screen reader reaching the (aria-invalid) cell reads it in place —
 * no per-cell live region, which in a grid of editable cells would be unusable noise.
 */
export { TableCell, TableHeaderCell };
