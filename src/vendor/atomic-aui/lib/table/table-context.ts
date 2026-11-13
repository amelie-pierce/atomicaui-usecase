// Table contexts + the option-prop vocabulary. The Root publishes one `TableContext` (the TanStack
// instance + every resolved mode); each Row publishes a `TableRowContext` carrying the active cell
// state. These are split out of the component files so the Root / Row / Cell modules share one source
// of the context shape without a circular import.

import type { CheckboxAui } from '../checkbox';
import type { TableExpandTriggerProps } from './table-row';
import * as React from 'react';
import type {
  Cell as TanStackCell,
  Header,
  Row,
  RowData,
  Table as TanStackTable,
} from '@tanstack/react-table';
import type { AuiTextAlignValue } from '../../tokens/index';
import type {
  TableCellAui,
  TableInheritedDensity,
  TableResolvedTarget,
  TableRowAui,
  TableRowStateKey,
} from './use-recipe';

// ─── Per-column layout (DATA mode) ───────────────────────────────────────────
// DATA-mode column geometry lives on the TanStack ColumnDef, NOT a global cellAui:
//   • `columnDef.size`        — a per-column WIDTH (px). Arbitrary data px (often > the
//     192px token cap), so it rides the `--aui-width` HOOK via inline style (the
//     system-honest channel — never raw CSS); an explicit per-cell `aui.sx.width`
//     still wins (the cell skips the column width when its own width is set).
//   • `columnDef.meta.align`  — a per-column TEXT ALIGN, reusing the existing
//     `aui-text-align-<align>` static utility (no new emitter work). Applied as the
//     BASE class so a per-cell `aui.sx.textAlign` overrides it (deduped by
//     `mergeAuiClasses` — `aui-text-align` is a merge role, last wins).
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Per-column text alignment (DATA mode) → the `aui-text-align-<align>` utility. */
    align?: AuiTextAlignValue;
  }
}

// ─── TanStack type aliases (shared across the Table modules) ─────────────────
export type TableInstance = TanStackTable<RowData>;
export type DataRow = Row<RowData>;
export type DataCell = TanStackCell<RowData, unknown>;
export type DataHeader = Header<RowData, unknown>;

// ─── Option-prop vocabulary ──────────────────────────────────────────────────
/** Selection model: no selection, single-select (one row), or multi-select. */
export type TableSelectionMode = 'none' | 'single' | 'multiple';
/** Built-in indicator-column toggle type — composes the shipped control. */
export type TableIndicatorType = 'checkbox' | 'radio' | 'switch';
/**
 * a11y role model (WAI-ARIA APG):
 * - `grid`     = a flat data grid (`role=grid` + `gridcell`/`columnheader`/`rowgroup`/`row`); roves CELLS.
 * - `treegrid` = a NESTED multi-column grid (`role=treegrid`, adds `aria-level`/`aria-setsize`/
 *   `aria-posinset`/`aria-expanded` on the rows); roves CELLS, ArrowRight/Left expand/collapse a parent.
 * - `tree`     = a single-conceptual-column disclosure tree (`role=tree`/`treeitem`/`group`); roves ROWS.
 * - `table`    = a PLAIN static data table (`role=table` + `rowgroup`/`row`/`columnheader`/`cell`) — NOT a
 *   composite widget: NO roving focus, NO grid keyboard model; a cell's own controls (inputs, buttons)
 *   sit in the natural tab order. For a display / data-entry table (the ADM AnchorSpacing case).
 * Unset → `treegrid` when the table has nested rows (`getSubRows`), else `grid`.
 */
export type TableA11yMode = 'grid' | 'treegrid' | 'tree' | 'table';
/**
 * Border placement (R4): which edges draw a hairline.
 * - `none`         = no rules (default).
 * - `between-rows` = a horizontal hairline BETWEEN body rows + under the header (a rule list).
 * - `all-cells`    = a full grid (every cell edge). The legacy `bordered` boolean aliases this.
 */
export type TableBorderPlacement = 'none' | 'between-rows' | 'all-cells';
/** Border style (R4): the hairline colour treatment. `tonal` mixes the theme-muted role (theme-aware). */
export type TableBorderStyle = 'tonal';
/** Vertical sizing: fill the available block size, or hug content. */
export type TableFit = 'fill' | 'contained';
/** Scroll ownership: the body self-scrolls, or an ancestor scrolls. */
export type TableScrollMode = 'self' | 'parent';

/**
 * Composable selection-toggle visibility — which levels of the indicator column render a toggle:
 * - `header` = a MASTER select-all-everything toggle in the header (multi-select only; indeterminate
 *   when only some rows are selected). Opt-in (default OFF).
 * - `group` = a grouped-mode group-header SELECT-ALL over its leaf children (indeterminate when partial).
 *   Default ON.
 * - `child` = the per-row leaf toggle. Default ON.
 */
export interface TableSelectAllLevels {
  header?: boolean;
  group?: boolean;
  child?: boolean;
}

/** Resolved (every level concrete) — what the context carries. */
export interface ResolvedSelectAllLevels {
  header: boolean;
  group: boolean;
  child: boolean;
}

/**
 * Resolve the public `selectAll` (boolean | per-level | undefined) → concrete levels. The HEADER master
 * applies only in multi-select (a single-select / radio table can't select-all). `group`/`child` default
 * ON; `header` is opt-in.
 */
export function resolveSelectAllLevels(
  input: boolean | TableSelectAllLevels | undefined,
  mode: TableSelectionMode,
): ResolvedSelectAllLevels {
  const multiple = mode === 'multiple';
  if (input === undefined) return { header: false, group: true, child: true };
  if (typeof input === 'boolean') {
    return { header: input && multiple, group: input, child: input };
  }
  return {
    header: (input.header ?? false) && multiple,
    group: input.group ?? true,
    child: input.child ?? true,
  };
}

// ─── Root context ─────────────────────────────────────────────────────────────
export interface TableContextValue {
  table: TableInstance;
  hasModel: boolean;
  selectionMode: TableSelectionMode;
  selectable: boolean;
  indicatorType: TableIndicatorType;
  indicatorColumn: boolean;
  /** Consumer appearance for the AUTO-rendered selection toggle (Root `selectionToggleAui`). */
  selectionToggleAui?: CheckboxAui;
  expandTriggerAui?: TableExpandTriggerProps['aui'];
  /** R7 — column sorting is opted in on the Root. Gates the header-cell sort affordance. */
  sortable: boolean;
  /** the Root's per-column header actions renderer (DATA mode). */
  renderHeaderActions?: (header: DataHeader) => React.ReactNode;
  rowClickSelects: boolean;
  /** Per-level selection-toggle visibility (header master / group select-all / child leaf). */
  selectAllLevels: ResolvedSelectAllLevels;
  a11y: TableA11yMode;
  expandable: boolean;
  /** The RESOLVED hover-active flag (`hoverable` AND the hover target isn't `none`). */
  hoverable: boolean;
  hoverTarget: TableResolvedTarget;
  selectionTarget: TableResolvedTarget;
  renderExpandedRow?: (row: DataRow) => React.ReactNode;
  rowAui?: TableRowAui;
  headerCellAui?: TableCellAui;
  cellAui?: TableCellAui;
  /** The root density (aui.scale / profile) the rows/cells inherit when they set none of their own. */
  density: TableInheritedDensity;
  /**
   * How many leading cell SLOTS of every row are frozen (sticky at the inline start): the Root's
   * `frozenColumns` plus the control column when it is shown. `0` = nothing frozen (the default), and
   * then rows render exactly as before (no slot context, no stamps).
   */
  frozenSlots: number;
  /** The Root's scroll ownership — `Table.Footer` renders a fixed div under `self`, a `<tfoot>` otherwise. */
  scroll: TableScrollMode;
}

const TableContext = React.createContext<TableContextValue | null>(null);

export function useTableContext(): TableContextValue | null {
  return React.useContext(TableContext);
}

export const TableContextProvider = TableContext.Provider;

// ─── Row context ──────────────────────────────────────────────────────────────
// Carries the active cell state PLUS the row's already-computed selection/expansion controls, so a
// USER-COMPOSED row can render `Table.SelectionToggle` / `Table.ExpandTrigger` (which read this context)
// and get EXACTLY what auto mode renders — single source of truth. All control fields are optional so
// the parts no-op safely outside a `Table.Row` (the default context is null).
export interface TableRowContextValue {
  /** The active cell state — set only when the resolved selection target routes to the cell. */
  activeCellState?: TableRowStateKey;
  /**
   * The row's nesting depth (`row.depth`, 0 = top level). A nested row (depth ≥ 1) wraps each cell's
   * content in the grid height-tween box so its disclosure GROWS / SHRINKS; a top-level row renders its
   * cells plainly (the wrapper carries a per-frame layout cost — kept off the common flat-table path).
   */
  depth?: number;
  /** Whether the row's selection TOGGLE should render (canSelect AND the per-level visibility is on). */
  showSelectToggle?: boolean;
  /** The shipped control to render for the toggle (checkbox/radio/switch). */
  indicatorType?: TableIndicatorType;
  /** The row's resolved selection state + setter (drives + receives the toggle). */
  selected?: boolean;
  indeterminate?: boolean;
  setSelected?: (next: boolean) => void;
  /** True when this row's toggle is a group-header SELECT-ALL (affects the default aria-label). */
  groupSelectAll?: boolean;
  /** Whether the row is expandable (drives the chevron trigger). */
  rowExpandable?: boolean;
  expanded?: boolean;
  setExpanded?: (next: boolean) => void;
  /** Consumer-supplied default accessible labels for the toggle / chevron. */
  selectionLabel?: string;
  expansionLabel?: string;
}

const TableRowContext = React.createContext<TableRowContextValue | null>(null);

export function useTableRowContext(): TableRowContextValue | null {
  return React.useContext(TableRowContext);
}

export const TableRowContextProvider = TableRowContext.Provider;

// ─── Column-slot context (frozen columns) ────────────────────────────────────
// The physical, 0-based cell position inside its row (the auto control cell is slot 0 when shown).
// Published by `Table.Row` around each child ONLY when the table freezes columns, so a cell can tell
// whether it is in the frozen block without the consumer passing an index. `undefined` everywhere else.
const TableColumnSlotContext = React.createContext<number | undefined>(undefined);

export function useTableColumnSlot(): number | undefined {
  return React.useContext(TableColumnSlotContext);
}

export const TableColumnSlotProvider = TableColumnSlotContext.Provider;
