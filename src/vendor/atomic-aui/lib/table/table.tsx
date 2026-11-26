// Table — a compound data table wrapping TanStack react-table v8.
//
// `Table` IS the root <table> (no `Table.Root`) and the host namespace for nine flat parts:
//   Table.Head / Table.Body / Table.Foot  — <thead>/<tbody>/<tfoot> (auto-render from the model)
//   Table.Footer                          — fixed non-scrolling footer bar (<div> under scroll="self", <tfoot> under "parent")
//   Table.Row                             — selectable / expandable <tr>   (table-row.tsx)
//   Table.HeaderCell / Table.Cell         — <th>/<td>                       (table-cell.tsx)
//   Table.SelectionToggle / ExpandTrigger — row control parts               (table-row.tsx)
//
// Two construction modes (both self-sufficient): DATA (`<Table data columns />` — the Root auto-assembles
// Head + Body from the TanStack model) or USER-COMPOSED (author the section/row/cell tree by hand). The
// roving-focus DOM machinery lives in table-roving; the select-all math in table-selection; the recipe /
// density cascade in use-recipe.

import * as React from 'react';
import {
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type Header,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Updater,
} from '@tanstack/react-table';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import {
  buildTableRootClasses,
  type TableCellAui,
  type TableInteractionTarget,
  type TableResolvedTarget,
  type TableRootAui,
  type TableRowAui,
} from './use-recipe';
import {
  resolveSelectAllLevels,
  TableContextProvider,
  useTableContext,
  type DataHeader,
  type DataRow,
  type TableA11yMode,
  type TableBorderPlacement,
  type TableBorderStyle,
  type TableContextValue,
  type TableFit,
  type TableIndicatorType,
  type TableInstance,
  type TableScrollMode,
  type TableSelectAllLevels,
  type TableSelectionMode,
} from './table-context';
import {
  ROVE_SELECTOR,
  isInteractiveTarget,
  isTableSortButton,
  moveTableFocus,
  moveTreeFocus,
  setCurrentTarget,
  tableCellFromEventTarget,
  tableRowFromEventTarget,
} from './table-roving';
import type { CheckboxAui } from '../checkbox';
import { renderHeaderSelectAll } from './table-selection';
import { TableRow, TableSelectionToggle, TableExpandTrigger } from './table-row';
import { TableCell, TableHeaderCell } from './table-cell';
import { ScrollArea } from '../view/scroll-area';

// The library tsconfig compiles WITHOUT lib.dom, so DOM query APIs go through a narrow local cast.
type QueryHost = {
  querySelector: <T = HTMLElement>(selector: string) => T | null;
  querySelectorAll: <T = HTMLElement>(selector: string) => ArrayLike<T>;
};

function resolveUpdater<T>(updater: Updater<T>, previous: T): T {
  return typeof updater === 'function' ? (updater as (old: T) => T)(previous) : updater;
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  if (ref) ref.current = value;
}


/**
 * Partition the section nodes for the SELF-SCROLL split: the `<thead>`/`<tfoot>` stay FIXED outside the
 * View.ScrollArea, only the `<tbody>` scrolls inside it. Splits by the section parts' `displayName`
 * (Table.Head → head, Table.Foot → foot, Table.Footer → the fixed footer bar, everything else incl. Table.Body → the scrolled body region).
 * A hand-authored raw `<thead>` (no Table.Head displayName) falls into the body region — a documented
 * constraint of self-scroll's user-composed mode (compose with Table.Head/Body/Foot to split correctly).
 */
function partitionSelfScrollSections(nodes: React.ReactNode): {
  head: React.ReactNode[];
  body: React.ReactNode[];
  foot: React.ReactNode[];
  footer: React.ReactNode[];
} {
  const head: React.ReactNode[] = [];
  const body: React.ReactNode[] = [];
  const foot: React.ReactNode[] = [];
  const footer: React.ReactNode[] = [];
  React.Children.forEach(nodes, (child) => {
    if (!React.isValidElement(child)) {
      if (child != null && child !== false) body.push(child);
      return;
    }
    const childType = child.type;
    const name = typeof childType === 'string' ? undefined : (childType as { displayName?: string }).displayName;
    if (name === 'Table.Head') head.push(child);
    else if (name === 'Table.Foot') foot.push(child);
    else if (name === 'Table.Footer') footer.push(child);
    else body.push(child);
  });
  return { head, body, foot, footer };
}

/**
 * Resolve the public selection / indicator / target props (incl. their legacy aliases) into the
 * concrete options the Root threads through context — ONE pure place, so the component body stays a
 * thin render instead of resolving aliases inline:
 *   - `selectionMode` wins; the legacy `selectable` boolean maps true → multiple.
 *   - `indicatorColumn` wins; the legacy `showActionColumn` is its alias.
 *   - the unified `selection` drives BOTH targets; `selectionTarget` / `hoverTarget` are fine-grained
 *     overrides. A `none` target paints NEITHER the selected look NOR any hover overlay.
 */
interface ResolvedTableOptions {
  mode: TableSelectionMode;
  selectionEnabled: boolean;
  showIndicatorColumn: boolean;
  selectionTarget: TableResolvedTarget;
  hoverTarget: TableResolvedTarget;
  hoverActive: boolean;
  rowClickSelects: boolean;
}

function resolveTableOptions(p: {
  selectionMode?: TableSelectionMode;
  selectable?: boolean;
  indicatorColumn?: boolean;
  showActionColumn?: boolean;
  selection?: TableInteractionTarget | 'none';
  selectionTarget?: TableInteractionTarget;
  hoverTarget?: TableInteractionTarget;
  hoverable: boolean;
}): ResolvedTableOptions {
  const mode: TableSelectionMode = p.selectionMode ?? (p.selectable ? 'multiple' : 'none');
  const selectionEnabled = mode !== 'none';
  const unified: TableResolvedTarget = p.selection ?? (selectionEnabled ? 'row' : 'none');
  const selectionTarget: TableResolvedTarget = p.selectionTarget ?? unified;
  const hoverTarget: TableResolvedTarget = p.hoverTarget ?? unified;
  return {
    mode,
    selectionEnabled,
    showIndicatorColumn: p.indicatorColumn ?? p.showActionColumn ?? true,
    selectionTarget,
    hoverTarget,
    // Hover is ACTIVE only when `hoverable` is on AND the resolved hover target is a real leaf.
    hoverActive: p.hoverable && hoverTarget !== 'none',
    // When the selected look targets the ROW, a click anywhere on the row toggles selection (the
    // interactive-child guard in TableRow keeps a click on the checkbox/chevron from double-firing).
    rowClickSelects: selectionEnabled && selectionTarget === 'row',
  };
}

export interface TableRootProps<TData extends RowData = RowData>
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'color' | 'onSelect' | 'border'> {
  aui?: TableRootAui;
  data?: TData[];
  columns?: ColumnDef<TData, unknown>[];
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  getSubRows?: (originalRow: TData, index: number) => TData[] | undefined;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  rowAui?: TableRowAui;
  headerCellAui?: TableCellAui;
  cellAui?: TableCellAui;
  /** Selection model. Defaults to `none` (display-only). */
  selectionMode?: TableSelectionMode;
  /** Back-compat alias: `selectable` true → multi-select, false → none. `selectionMode` wins. */
  selectable?: boolean;
  /** Built-in indicator-column toggle type. Defaults to `checkbox`. */
  indicatorType?: TableIndicatorType;
  /**
   * Appearance for the AUTO-rendered selection toggle in the indicator column — the shipped
   * Checkbox/Radio/Switch's own `aui`, per-state `states` included.
   *
   * Without it an auto-rendered control cell was unstylable: `Table.SelectionToggle` is composed by
   * the Row, so a consumer never touches it, and the toggle's own vocab keeps the box a constant
   * neutral in every state (selection lives in the mark glyph). A table that wants selection to read
   * in the BOX needs a way in. An explicit `aui` on a hand-composed `Table.SelectionToggle` still
   * wins over this.
   */
  selectionToggleAui?: CheckboxAui;
  /** Appearance for auto-rendered expand triggers. */
  expandTriggerAui?: React.ComponentProps<typeof TableExpandTrigger>['aui'];
  /** Render the built-in indicator/action column. Defaults to `true`. */
  indicatorColumn?: boolean;
  /**
   * Composable select-all-toggle visibility. `true` turns ALL levels on (header master included,
   * multi-select only); `false` turns them all off; an object opts each level (`header`/`group`/`child`)
   * in/out. Default: `child` + `group` ON, `header` OFF.
   */
  selectAll?: boolean | TableSelectAllLevels;
  /** Deprecated alias for `indicatorColumn`. */
  showActionColumn?: boolean;
  rowSelection?: RowSelectionState;
  defaultRowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  /**
   * Column sorting (R7). OFF by default — opting in must be explicit, because it turns every sortable
   * column's header into a `<button>` and every existing table would otherwise change its header
   * semantics. A column opts OUT individually with the TanStack `columnDef.enableSorting: false`.
   *
   * DATA mode sorts for you (`getSortedRowModel`). In USER-COMPOSED mode there is no row model to
   * sort, so the Root prop only enables the AFFORDANCE — pass `sortDirection` + `onSortToggle` per
   * `Table.HeaderCell` and order the rows yourself.
   */
  sortable?: boolean;
  sorting?: SortingState;
  defaultSorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  /**
   * DATA mode: extra controls for a column header (e.g. a filter or column-menu trigger), rendered
   * AFTER the label / sort button inside the header cell — a sibling, never nested in the sort
   * button. Return `null` for a column without actions. Unset (the default) leaves every header's DOM
   * exactly as before. In USER-COMPOSED mode pass `actions` on `Table.HeaderCell` instead.
   */
  renderHeaderActions?: (header: Header<TData, unknown>) => React.ReactNode;
  expandable?: boolean;
  expanded?: ExpandedState;
  defaultExpanded?: ExpandedState;
  onExpandedChange?: (expanded: ExpandedState) => void;
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode;
  /** a11y role model. Unset → `treegrid` when `getSubRows` is provided (nested), else `grid`. */
  a11y?: TableA11yMode;
  /** Vertical sizing. Defaults to `contained` (hug content). */
  fit?: TableFit;
  /** Scroll ownership. Defaults to `parent` (ancestor scrolls). */
  scroll?: TableScrollMode;
  /**
   * `scroll="self"` body sizing. `fill` (default, unchanged) — the body region fills the remaining
   * height, so a short table leaves empty space below its rows. `content` — the region shrinks to its
   * rows and scrolls only once they are taller than the available height (the Root still needs a
   * bounded height, e.g. `fit="fill"` in a sized parent). Ignored under `scroll="parent"`.
   */
  bodyFit?: 'fill' | 'content';
  /**
   * Self-scroll (`scroll='self'`) bar thickness — the `--aui-scrollbar-size` hook, inheriting to the
   * `<tbody>` scroll region (mirrors `View.ScrollArea`'s `scrollbarSize`). A NUMBER resolves to the
   * matching `--p-px-<n>` token var (`8` → `var(--p-px-8)`, on-system); a STRING passes through verbatim
   * (off-rail / token-var escape hatch). DEFAULT `8` so the Table self-scroll thumb matches the
   * `View.ScrollArea` default thumb thickness (`--aui-scrollbar-size: var(--p-px-8)`). Not an `aui` axis —
   * stripped before the DOM spread; consumer `style` wins.
   */
  scrollbarSize?: number | string;
  /**
   * Border placement (R4) — `none` / `between-rows` / `all-cells`. Wins over `bordered`; unset → derives
   * from `bordered` (`true` → `all-cells`, else `none`).
   */
  border?: TableBorderPlacement;
  /** Border colour style (R4). Defaults to `tonal` (theme-muted mix). */
  borderStyle?: TableBorderStyle;
  /** Back-compat alias for `border="all-cells"`. `border` wins. */
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  /**
   * Unified interaction target: ONE knob that switches BOTH where the SELECTED look paints AND where the
   * HOVER affordance highlights — `none` / `row` / `cell`. The fine-grained `selectionTarget` /
   * `hoverTarget` override it when set. Defaults to `row` when selectable, else `none`.
   */
  selection?: TableInteractionTarget | 'none';
  /** Fine-grained override of where the SELECTED look paints. Falls back to `selection`, then `row`. */
  selectionTarget?: TableInteractionTarget;
  /** Fine-grained override of where the HOVER affordance highlights. Falls back to `selection`. */
  hoverTarget?: TableInteractionTarget;
  /**
   * The narrowest the table CONTENT may get before it scrolls sideways instead of squeezing its
   * columns. A NUMBER is pixels (data px, like `columnDef.size`); a STRING passes through verbatim
   * (`'72rem'`, a token var). Published as the `--aui-table-min-inline-size` hook. Unset = unchanged.
   *
   * `scroll="self"`: the body region scrolls on BOTH axes and the fixed header/footer follow its
   * horizontal offset, so head and body columns stay aligned while the vertical bar stays on screen.
   * `scroll="parent"`: the `<table>` gets the minimum width and the consumer's own `overflow-x` scroller
   * (e.g. a `View.ScrollArea`) scrolls it.
   */
  minInlineSize?: number | string;
  /**
   * Freeze the first N data columns at the inline start (`position: sticky`) while the rest scroll
   * sideways. The selection / indicator control column, when shown, is always frozen with them.
   * Offsets are measured from the rendered column widths, so give frozen columns a fixed width
   * (`columnDef.size`, or `aui.sx.width` on the cells) to keep the frozen block stable. Needs a
   * horizontal scroller to have any effect (`minInlineSize`, or a parent `overflow-x` scroller).
   * Default `0` (nothing frozen).
   */
  frozenColumns?: number;
}

// SSR-safe iso-layout-effect (the library compiles without lib.dom → probe `document` via globalThis) —
// the card-group / radio-group pattern. Frozen offsets must land before paint so cells never jump.
const useIsoLayoutEffect =
  typeof globalThis !== 'undefined' && typeof (globalThis as { document?: unknown }).document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

// Structural DOM shapes for the frozen-offset measurement + the self-scroll x-sync (no lib.dom).
type MeasureRect = { left: number; right: number };
type MeasureCell = { getBoundingClientRect(): MeasureRect };
type MeasureRow = { children: ArrayLike<MeasureCell> };
type ResizeObserverLike = { observe(target: unknown): void; disconnect(): void };
type ScrollSyncElement = {
  scrollLeft: number;
  addEventListener(type: 'scroll', listener: () => void, options?: { passive?: boolean }): void;
  removeEventListener(type: 'scroll', listener: () => void): void;
};

/** `minInlineSize` → the CSS length published on `--aui-table-min-inline-size` (number = px). */
function resolveMinInlineSize(value: number | string | undefined): string | undefined {
  if (value == null || value === '') return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * The row whose cells define the column geometry: the LAST header row (the leaf headers under any
 * grouped header), else the first body row. Both split tables of `scroll="self"` share this geometry.
 */
function findColumnTemplateRow(root: QueryHost): MeasureRow | null {
  const headRows = root.querySelectorAll<MeasureRow>('.aui-table-head > .aui-table-row');
  if (headRows.length > 0) return headRows[headRows.length - 1];
  return root.querySelector<MeasureRow>('.aui-table-body > .aui-table-row:not(.aui-table-expanded-row)');
}

/**
 * Measure each frozen slot's inline-start offset from the template row: the distance from the first
 * cell's start edge to slot `i`'s start edge (the sum of the frozen widths before it). RTL measures
 * from the right edges. Returns `null` when the row has fewer cells than slots (nothing to freeze yet).
 */
function measureFrozenOffsets(row: MeasureRow, slots: number, rtl: boolean): number[] | null {
  const cells = row.children;
  if (cells.length === 0) return null;
  const count = Math.min(slots, cells.length);
  const origin = cells[0].getBoundingClientRect();
  const offsets: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const rect = cells[i].getBoundingClientRect();
    offsets.push(Math.round((rtl ? origin.right - rect.right : rect.left - origin.left) * 100) / 100);
  }
  return offsets;
}

const TableRootInner = React.forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  {
    aui,
    data,
    columns,
    getRowId,
    getSubRows,
    getRowCanExpand,
    rowAui,
    headerCellAui,
    cellAui,
    selectionMode,
    selectable,
    indicatorType = 'checkbox',
    indicatorColumn,
    selectionToggleAui,
    expandTriggerAui,
    selectAll,
    showActionColumn,
    rowSelection,
    defaultRowSelection,
    onRowSelectionChange,
    sortable = false,
    sorting,
    defaultSorting,
    onSortingChange,
    renderHeaderActions,
    expandable = false,
    expanded,
    defaultExpanded,
    onExpandedChange,
    renderExpandedRow,
    a11y,
    fit = 'contained',
    scroll = 'parent',
    bodyFit = 'fill',
    scrollbarSize = 8,
    border,
    borderStyle = 'tonal',
    bordered = false,
    striped = false,
    hoverable = true,
    selection,
    hoverTarget,
    selectionTarget,
    minInlineSize,
    frozenColumns = 0,
    role: roleProp,
    className,
    style,
    children,
    onKeyDown,
    onFocus,
    ...rest
  },
  ref,
) {
  const rootRef = React.useRef<HTMLTableElement | null>(null);
  // ALL selection / indicator / target aliases resolve in ONE pure place (see resolveTableOptions).
  const {
    mode: resolvedMode,
    selectionEnabled,
    showIndicatorColumn,
    selectionTarget: resolvedSelectionTarget,
    hoverTarget: resolvedHoverTarget,
    hoverActive,
    rowClickSelects,
  } = resolveTableOptions({
    selectionMode,
    selectable,
    indicatorColumn,
    showActionColumn,
    selection,
    selectionTarget,
    hoverTarget,
    hoverable,
  });
  const selectAllLevels = resolveSelectAllLevels(selectAll, resolvedMode);

  const [internalSelection, setInternalSelection] = React.useState<RowSelectionState>(() => defaultRowSelection ?? {});
  const [internalExpanded, setInternalExpanded] = React.useState<ExpandedState>(() => defaultExpanded ?? {});
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(() => defaultSorting ?? []);
  // Mutual exclusion for uncontrolled USER-COMPOSED rows under `selectionMode="single"` (`undefined` =
  // untouched so a row's `defaultSelected` still seeds the initial selection).
  const [singleComposedSelectedId, setSingleComposedSelectedIdState] = React.useState<string | null | undefined>(
    undefined,
  );
  const singleComposedActiveRef = React.useRef<{ id: string; onDeselect?: () => void } | null>(null);
  const registerDefaultSingleComposed = React.useCallback((id: string, onDeselect?: () => void) => {
    if (!singleComposedActiveRef.current) {
      singleComposedActiveRef.current = { id, onDeselect };
    }
  }, []);
  const setSingleComposedSelectedId = React.useCallback((id: string | null, onDeselect?: () => void) => {
    const prev = singleComposedActiveRef.current;
    if (prev && prev.id !== id) {
      prev.onDeselect?.();
    }
    singleComposedActiveRef.current = id ? { id, onDeselect } : null;
    setSingleComposedSelectedIdState(id);
  }, []);
  const resolvedSelection = rowSelection ?? internalSelection;
  const resolvedExpanded = expanded ?? internalExpanded;
  const resolvedSorting = sorting ?? internalSorting;
  const rows = (data ?? []) as RowData[];
  const columnDefs = (columns ?? []) as ColumnDef<RowData, unknown>[];
  const hasModel = !!data && !!columns;

  // R6: the a11y role model. Unset → `treegrid` when the table has NESTED rows (`getSubRows`), else the
  // flat `grid` — so a nested multi-column table is an APG treegrid by default, a flat one a data grid.
  const a11yMode: TableA11yMode = a11y ?? (getSubRows ? 'treegrid' : 'grid');
  // R4: resolve the border placement (the `border` prop wins; `bordered` boolean is the all-cells alias).
  const borderPlacement: TableBorderPlacement = border ?? (bordered ? 'all-cells' : 'none');

  const handleSelectionChange = React.useCallback(
    (updater: Updater<RowSelectionState>) => {
      const next = resolveUpdater(updater, resolvedSelection);
      if (rowSelection === undefined) setInternalSelection(next);
      onRowSelectionChange?.(next);
    },
    [onRowSelectionChange, resolvedSelection, rowSelection],
  );

  const handleExpandedChange = React.useCallback(
    (updater: Updater<ExpandedState>) => {
      const next = resolveUpdater(updater, resolvedExpanded);
      if (expanded === undefined) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [expanded, onExpandedChange, resolvedExpanded],
  );

  const handleSortingChange = React.useCallback(
    (updater: Updater<SortingState>) => {
      const next = resolveUpdater(updater, resolvedSorting);
      if (sorting === undefined) setInternalSorting(next);
      onSortingChange?.(next);
    },
    [onSortingChange, resolvedSorting, sorting],
  );

  // Stable row-model factories: `getCoreRowModel()`/`getExpandedRowModel()` build a memoizing closure
  // whose cache is keyed on `[data]`/`[expanded]`. Calling them inline on every render minted a fresh
  // closure each time, throwing away that cache so the row model rebuilt on EVERY render even when the
  // data was referentially stable. Pinning the factories for the table's lifetime preserves the memo,
  // so the row model only recomputes when `data` actually changes (verified: a Hef-only edit with a
  // stable product list no longer re-mounts the rows).
  const coreRowModel = React.useMemo(() => getCoreRowModel(), []);
  const expandedRowModel = React.useMemo(() => getExpandedRowModel(), []);
  const sortedRowModel = React.useMemo(() => getSortedRowModel(), []);

  const table = useReactTable({
    data: rows,
    columns: columnDefs,
    state: { rowSelection: resolvedSelection, expanded: resolvedExpanded, sorting: resolvedSorting },
    enableRowSelection: selectionEnabled,
    enableSorting: sortable,
    enableMultiRowSelection: resolvedMode === 'multiple',
    enableSubRowSelection: false,
    enableExpanding: expandable,
    getRowId: getRowId as never,
    getSubRows: getSubRows as never,
    getRowCanExpand: (row) =>
      getRowCanExpand?.(row as never) ??
      // R1 — TWO DISTINCT, MUTUALLY-EXCLUSIVE expansion paths (de-mixed in TableRow):
      //   (1) a row WITH `getSubRows` children is the PRIMARY nested model — expanding reveals real
      //       depth-indented child <tr>s (never a detail region).
      //   (2) a LEAF row (no subRows) is expandable only via the explicit `renderExpandedRow` escape
      //       hatch (gated to `expandable`) — expanding reveals the custom detail region.
      ((row as DataRow).subRows?.length > 0 || (expandable && !!renderExpandedRow)),
    onRowSelectionChange: handleSelectionChange,
    onExpandedChange: handleExpandedChange,
    onSortingChange: handleSortingChange,
    getCoreRowModel: coreRowModel,
    getExpandedRowModel: expandedRowModel,
    getSortedRowModel: sortedRowModel,
  }) as unknown as TableInstance;

  const mergedRef = React.useCallback(
    (node: HTMLTableElement | null) => {
      rootRef.current = node;
      setRef(ref, node);
    },
    [ref],
  );

  React.useEffect(() => {
    const root = rootRef.current;
    // `table` mode is a plain data table, not a composite widget — no roving tab stop to seed.
    if (!root || a11yMode === 'table') return;
    const selector = ROVE_SELECTOR[a11yMode];
    const first = (root as HTMLTableElement & QueryHost).querySelector<HTMLElement>(selector);
    if (first) setCurrentTarget(root, selector, first);
  }, [a11yMode, children, columnDefs.length, expandable, rows.length, selectionEnabled, showIndicatorColumn]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLTableElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || (isInteractiveTarget(event.target) && !isTableSortButton(event.target))) return;
      const root = rootRef.current;
      // `table` mode has no grid/tree roving — arrow keys fall through to the browser default.
      if (!root || a11yMode === 'table') return;
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      if (a11yMode === 'tree') {
        const current = tableRowFromEventTarget(event.target);
        // ArrowLeft/Right are expand/collapse in tree mode — owned by the row; only navigate here.
        if (
          current &&
          (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Home' || event.key === 'End') &&
          moveTreeFocus(root, current, event.key)
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      // grid + treegrid both rove CELLS 2D. In treegrid, ArrowRight/Left on the FIRST cell of an
      // expandable row are expand/collapse — owned by the row, which calls stopPropagation BEFORE this
      // ancestor handler runs, so the event never reaches here (no cell nav). Anything not intercepted
      // falls through to plain cell navigation.
      const current = tableCellFromEventTarget(event.target);
      if (current && moveTableFocus(root, current, event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [a11yMode, onKeyDown],
  );

  // ── Frozen columns (gap 3) ────────────────────────────────────────────────────────────────────
  // The frozen block = the requested data columns + the control column when it is shown (it always
  // rides with them). `frozenSlots` is the count of leading cell slots each row freezes.
  const frozenDataColumns = Math.max(0, Math.floor(frozenColumns));
  const controlColumnShown = showIndicatorColumn && (selectionEnabled || expandable);
  const frozenSlots = frozenDataColumns > 0 ? frozenDataColumns + (controlColumnShown ? 1 : 0) : 0;
  const [frozenOffsets, setFrozenOffsets] = React.useState<number[] | null>(null);

  // Measure the frozen offsets from the rendered column geometry before paint, and re-measure when any
  // frozen cell resizes (a width change, a font swap, a header action mounting).
  useIsoLayoutEffect(() => {
    const root = rootRef.current as unknown as QueryHost | null;
    if (!root || frozenSlots === 0) {
      setFrozenOffsets(null);
      return;
    }
    const cssOf = (globalThis as { getComputedStyle?: (el: unknown) => { direction?: string } }).getComputedStyle;
    const measure = () => {
      const row = findColumnTemplateRow(root);
      if (!row) return;
      const rtl = cssOf?.(row).direction === 'rtl';
      const next = measureFrozenOffsets(row, frozenSlots, rtl);
      setFrozenOffsets((previous) =>
        previous && next && previous.length === next.length && previous.every((v, i) => v === next[i])
          ? previous
          : next,
      );
    };
    measure();
    const RO = (globalThis as { ResizeObserver?: new (cb: () => void) => ResizeObserverLike }).ResizeObserver;
    const row = findColumnTemplateRow(root);
    if (!RO || !row) return;
    const ro = new RO(measure);
    for (let i = 0; i < Math.min(frozenSlots, row.children.length); i += 1) ro.observe(row.children[i]);
    return () => ro.disconnect();
  }, [frozenSlots, children, columnDefs, rows.length, scroll]);

  // ── Horizontal self-scroll (gap 2) ──────────────────────────────────────────────────────────────
  // With `minInlineSize` under `scroll="self"`, the BODY region scrolls on both axes (it must own the
  // horizontal scroll: a frozen body cell can only stick to its NEAREST scroll container, and the body
  // viewport is one), while the fixed header/footer sit in overflow-clipped wrappers that FOLLOW its
  // `scrollLeft`. Syncing runs both ways so a focus-driven scroll of the header (keyboard roving onto an
  // off-screen header cell) moves the body too.
  const minInlineSizeValue = resolveMinInlineSize(minInlineSize);
  const scrollsInline = scroll === 'self' && minInlineSizeValue != null;
  React.useEffect(() => {
    const root = rootRef.current as unknown as QueryHost | null;
    if (!root || !scrollsInline) return;
    const viewport = root.querySelector<ScrollSyncElement>(
      '.aui-table-scroll-region .aui-view-scroll-area-viewport',
    );
    if (!viewport) return;
    const clips = Array.from(root.querySelectorAll<ScrollSyncElement>('.aui-table-scroll-clip'));
    const followBody = () => {
      for (const clip of clips) if (clip.scrollLeft !== viewport.scrollLeft) clip.scrollLeft = viewport.scrollLeft;
    };
    const followClip = (clip: ScrollSyncElement) => () => {
      if (viewport.scrollLeft !== clip.scrollLeft) viewport.scrollLeft = clip.scrollLeft;
    };
    const clipListeners = clips.map((clip) => [clip, followClip(clip)] as const);
    viewport.addEventListener('scroll', followBody, { passive: true });
    for (const [clip, listener] of clipListeners) clip.addEventListener('scroll', listener, { passive: true });
    followBody();
    return () => {
      viewport.removeEventListener('scroll', followBody);
      for (const [clip, listener] of clipListeners) clip.removeEventListener('scroll', listener);
    };
  }, [scrollsInline, children, hasModel]);

  // ── Self-scroll column lock ─────────────────────────────────────────────────────────────────────
  // The `scroll="self"` split tables are each `table-layout:fixed`, which takes its column widths from
  // its OWN first row — so a header cell and a body cell styled differently (a composed header's plain
  // control cell, a width set on only one side) gave the two tables different columns, and frozen body
  // cells overlapped their neighbours. The header is the column template: measure its leaf row and lock
  // the body/footer tables to those widths through a `<colgroup>`.
  // Opt-in only: existing self-scroll tables keep their own column layout. The lock applies to the
  // wide/frozen/footer/content-fit paths, where header and body must share exact column widths.
  const hasFooterSection = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && (child.type as { displayName?: string }).displayName === 'Table.Footer',
  );
  const lockColumns =
    scroll === 'self' && (minInlineSizeValue != null || frozenSlots > 0 || bodyFit === 'content' || hasFooterSection);
  const [lockedColumnWidths, setLockedColumnWidths] = React.useState<number[] | null>(null);
  useIsoLayoutEffect(() => {
    const root = rootRef.current as unknown as QueryHost | null;
    if (!root || !lockColumns) {
      setLockedColumnWidths(null);
      return;
    }
    const headerRow = () => {
      const rows = root.querySelectorAll<MeasureRow>('.aui-table-scroll-header .aui-table-head > .aui-table-row');
      return rows.length > 0 ? rows[rows.length - 1] : null;
    };
    const measure = () => {
      const row = headerRow();
      if (!row || row.children.length === 0) return;
      const next: number[] = [];
      for (let i = 0; i < row.children.length; i += 1) {
        const rect = row.children[i].getBoundingClientRect();
        next.push(Math.round((rect.right - rect.left) * 100) / 100);
      }
      // jsdom (no layout) reports 0 everywhere — never lock a body to zero-width columns.
      if (next.every((w) => w === 0)) return;
      setLockedColumnWidths((previous) =>
        previous && previous.length === next.length && previous.every((v, i) => v === next[i]) ? previous : next,
      );
    };
    measure();
    const RO = (globalThis as { ResizeObserver?: new (cb: () => void) => ResizeObserverLike }).ResizeObserver;
    const row = headerRow();
    if (!RO || !row) return;
    const ro = new RO(measure);
    for (let i = 0; i < row.children.length; i += 1) ro.observe(row.children[i]);
    return () => ro.disconnect();
  }, [lockColumns, children, columnDefs, rows.length, minInlineSizeValue]);

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLTableElement>) => {
      onFocus?.(event);
      const root = rootRef.current;
      // `table` mode does not rove, so there is no current-target tab stop to track on focus.
      if (!root || a11yMode === 'table') return;
      const selector = ROVE_SELECTOR[a11yMode];
      const target = (event.target as unknown as { closest?: <T>(s: string) => T | null })?.closest?.<HTMLElement>(selector) ?? null;
      if (target) setCurrentTarget(root, selector, target);
    },
    [a11yMode, onFocus],
  );

  const context = React.useMemo<TableContextValue>(
    () => ({
      table,
      hasModel,
      selectionMode: resolvedMode,
      selectable: selectionEnabled,
      indicatorType,
      indicatorColumn: showIndicatorColumn,
      selectionToggleAui,
      expandTriggerAui,
      sortable,
      renderHeaderActions: renderHeaderActions as ((header: DataHeader) => React.ReactNode) | undefined,
      rowClickSelects,
      selectAllLevels,
      a11y: a11yMode,
      expandable,
      hoverable: hoverActive,
      hoverTarget: resolvedHoverTarget,
      selectionTarget: resolvedSelectionTarget,
      rowAui,
      headerCellAui,
      cellAui,
      density: { scale: aui?.scale, profile: aui?.profile },
      renderExpandedRow: renderExpandedRow as ((row: DataRow) => React.ReactNode) | undefined,
      frozenSlots,
      scroll,
      singleComposedSelectedId,
      setSingleComposedSelectedId,
      registerDefaultSingleComposed,
    }),
    [
      a11yMode,
      scroll,
      frozenSlots,
      aui?.profile,
      aui?.scale,
      cellAui,
      expandTriggerAui,
      expandable,
      hasModel,
      headerCellAui,
      hoverActive,
      resolvedHoverTarget,
      indicatorType,
      renderExpandedRow,
      resolvedMode,
      rowAui,
      rowClickSelects,
      selectAllLevels.header,
      selectAllLevels.group,
      selectAllLevels.child,
      selectionEnabled,
      selectionToggleAui,
      resolvedSelectionTarget,
      showIndicatorColumn,
      table,
      // The TanStack `table` ref is stable; its DERIVED row model changes with these states. Without them
      // in the deps the memoized context stays identical and Table.Body never re-renders the row list on
      // an uncontrolled expand/select.
      resolvedExpanded,
      resolvedSelection,
      // R7: sorting rides the SAME trap — the sorted row model is derived off the stable `table` ref,
      // so without `resolvedSorting` here the memo never changes and Head/Body keep their old output
      // (verified: the Root re-rendered with the new sorting while `aria-sort` stayed "none").
      resolvedSorting,
      sortable,
      renderHeaderActions,
      singleComposedSelectedId,
      setSingleComposedSelectedId,
      registerDefaultSingleComposed,
    ],
  );

  const rootClassName = mergeAuiClasses([buildTableRootClasses(aui), className]);

  // Self-scroll bar thickness → the inheriting `--aui-scrollbar-size` hook (read by the `<tbody>`'s
  // shared `aui-scrollbar` mixin). NUMBER → the `--p-px-<n>` token var (on-system); STRING verbatim.
  // Consumer `style` spreads LAST so it wins.
  const scrollbarStyle = {
    '--aui-scrollbar-size':
      typeof scrollbarSize === 'number' ? `var(--p-px-${scrollbarSize})` : scrollbarSize,
  } as Record<string, string>;
  // Hooks: the content minimum width + one measured `--aui-table-frozen-offset-<slot>` per frozen
  // slot (each frozen cell reads its own slot's var). Only emitted when the feature is on.
  if (minInlineSizeValue != null) scrollbarStyle['--aui-table-min-inline-size'] = minInlineSizeValue;
  if (frozenSlots > 0 && frozenOffsets) {
    frozenOffsets.forEach((offset, slot) => {
      scrollbarStyle[`--aui-table-frozen-offset-${slot}`] = `${offset}px`;
    });
  }
  const mergedStyle = { ...(scrollbarStyle as React.CSSProperties), ...(style as React.CSSProperties | undefined) };

  // DATA mode: `<Table data columns />` with NO composed children auto-assembles Head + Body (each of
  // which auto-renders its rows from the TanStack model). USER-COMPOSED mode: any children render verbatim.
  const autoSections = hasModel ? (
    <>
      <TableHead />
      <TableBody />
    </>
  ) : null;

  const rootRole =
    a11yMode === 'table'
      ? 'table'
      : a11yMode === 'tree'
        ? 'tree'
        : a11yMode === 'treegrid'
          ? 'treegrid'
          : 'grid';
  // The role + data-attr surface is identical across both scroll modes (parent = <table>, self = <div>);
  // factor it so the two roots can't drift.
  const rootDataProps = {
    role: roleProp ?? rootRole,
    'data-aui-border': borderPlacement === 'none' ? undefined : borderPlacement,
    'data-aui-border-style': borderPlacement === 'none' ? undefined : borderStyle,
    'data-aui-striped': striped || undefined,
    'data-aui-hoverable': hoverActive || undefined,
    'data-aui-hover-target': hoverActive ? resolvedHoverTarget : undefined,
    'data-aui-selection-target': resolvedSelectionTarget,
    'data-aui-a11y': a11yMode,
    'data-aui-fit': fit,
    'data-aui-scroll': scroll,
    'data-aui-body-fit': scroll === 'self' && bodyFit === 'content' ? 'content' : undefined,
    'data-aui-min-inline-size': minInlineSizeValue != null ? '' : undefined,
    'data-aui-frozen-columns': frozenSlots > 0 ? String(frozenDataColumns) : undefined,
    'data-aui-control-column': controlColumnShown ? '' : undefined,
  } as Record<string, string | undefined>;

  let rootElement: React.ReactElement;
  if (scroll === 'self') {
    // SELF-SCROLL (#R8): a div CANNOT sit between a <table> and its <tbody>, and Base UI's ScrollArea
    // Root/Viewport are divs — so a single <table> cannot host the body inside a scroll Viewport. The
    // self-scroll root is therefore a flex-COLUMN <div> carrying the `.aui-table` classes/role/data-attrs,
    // and the table SPLITS into fixed header/footer tables (the <thead>/<tfoot>, OUTSIDE the scroll) plus
    // a body table (the <tbody>) that scrolls inside a View.ScrollArea region. Each section group is
    // wrapped in a real `<table role="presentation">` so the <thead>/<tbody>/<tfoot> stay VALID HTML
    // (a bare <tbody> in a <div> is invalid + warns) while the explicit row/cell roles drive the grid
    // a11y tree. The ScrollArea (`scroll='vertical'`, `scrollbarSize` forwarded; `paint:'text'`+
    // `no-padding` so it adds no surface/inset) owns the body scroll. Column alignment is held by
    // `table-layout:fixed` + `inline-size:100%` on EVERY split table (the SCSS) plus the matching
    // per-column `--aui-width` on both header and body cells — and the View.ScrollArea bar consumes ZERO
    // gutter (Base UI hides the native bar + overlays an absolute thumb), so the body table at 100% is
    // exactly as wide as the header table — no scrollbar-gutter compensation needed.
    const sections = children ?? (hasModel ? [<TableHead key="__head" />, <TableBody key="__body" />] : null);
    const { head, body, foot, footer } = partitionSelfScrollSections(sections);
    // with `minInlineSize` the fixed header/footer tables sit inside an overflow-clipped wrapper
    // whose `scrollLeft` follows the body (see the x-sync effect). Without it the DOM is unchanged.
    // The header's measured widths, locked onto the body/footer tables (see the column-lock effect).
    const columnLock =
      head.length > 0 && lockedColumnWidths ? (
        <colgroup data-aui-table-column-lock="">
          {lockedColumnWidths.map((width, i) => (
            <col key={i} style={{ inlineSize: `${width}px`, width: `${width}px` }} />
          ))}
        </colgroup>
      ) : null;
    const fixedSection = (table: React.ReactElement) =>
      scrollsInline ? <div className="aui-table-scroll-clip">{table}</div> : table;
    rootElement = (
      <div
        ref={mergedRef as unknown as React.Ref<HTMLDivElement>}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        className={rootClassName}
        style={mergedStyle}
        {...rootDataProps}
        onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLDivElement>}
        onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}
      >
        {head.length > 0
          ? fixedSection(
              <table className="aui-table-scroll-fixed aui-table-scroll-header" role="presentation">
                {head}
              </table>,
            )
          : null}
        <ScrollArea
          className="aui-table-scroll-region"
          scrollAxis={scrollsInline ? 'both' : 'vertical'}
          scrollbarSize={scrollbarSize}
          // PROPS-FIRST self-scroll clip fix: the region is a flex item (SCSS `flex:1 1 auto;
          // min-block-size:0`) but its OWN display was `block`, so its used height stayed COMPUTED-auto
          // and the inner Base UI Viewport (`block-size:100%`) had no definite parent height to resolve
          // against → it rendered the FULL content height (no clip, no bar). Making the Root a flex
          // COLUMN gives it a definite height so the Viewport fills + clips (mirrors the InputsPanel
          // outer ScrollArea). On the Root box only — never the Base UI Viewport/Thumb layout.
          aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column' } }}
        >
          <table className="aui-table-scroll-body" role="presentation">
            {columnLock}
            {body}
          </table>
        </ScrollArea>
        {foot.length > 0
          ? fixedSection(
              <table className="aui-table-scroll-fixed aui-table-scroll-footer" role="presentation">
                {columnLock}
                {foot}
              </table>,
            )
          : null}
        {footer}
      </div>
    );
  } else {
    // PARENT (default): the natural single <table>; an ancestor owns any scroll. No scroll region.
    rootElement = (
      <table
        ref={mergedRef}
        {...rest}
        className={rootClassName}
        style={mergedStyle}
        {...rootDataProps}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      >
        {children ?? autoSections}
      </table>
    );
  }

  return <TableContextProvider value={context}>{rootElement}</TableContextProvider>;
});
TableRootInner.displayName = 'Table';

export interface TableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

// R6: a <thead>/<tbody>/<tfoot> section role per a11y mode. A `grid`/`treegrid`/`table` root sets an
// explicit `role` (and the self-scroll split wraps the sections in `role=presentation` tables that strip
// their native semantics), so the section groups need an explicit `rowgroup`; a `tree` is a flat list of
// treeitems → the groups are presentational.
function sectionRole(mode: TableA11yMode | undefined): 'rowgroup' | 'presentation' | undefined {
  if (mode === 'tree') return 'presentation';
  if (mode === 'grid' || mode === 'treegrid' || mode === 'table') return 'rowgroup';
  return undefined;
}

const TableHead = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableHead(
  { role: roleProp, className, children, ...rest },
  ref,
) {
  const ctx = useTableContext();
  // The opt-in HEADER MASTER select-all-everything toggle (multi-select only).
  const headerToggle =
    ctx?.hasModel && ctx.selectable && ctx.selectAllLevels.header ? renderHeaderSelectAll(ctx) : null;
  const content =
    children ??
    (ctx?.hasModel
      ? ctx.table.getHeaderGroups().map((group) => (
          <TableRow key={group.id} data-aui-header-row selectable={false} expandable={false}>
            {ctx.indicatorColumn && (ctx.selectable || ctx.expandable) ? (
              <TableHeaderCell
                className="aui-table-cell--control"
                data-aui-table-control-cell=""
                aria-label={headerToggle ? undefined : 'Row actions'}
              >
                {headerToggle ? <span className="aui-table-control-stack">{headerToggle}</span> : null}
              </TableHeaderCell>
            ) : null}
            {group.headers.map((header) => (
              <TableHeaderCell
                key={header.id}
                header={header as DataHeader}
                actions={ctx.renderHeaderActions?.(header as DataHeader)}
              />
            ))}
          </TableRow>
        ))
      : null);

  return (
    <thead
      ref={ref}
      {...rest}
      role={roleProp ?? sectionRole(ctx?.a11y)}
      className={mergeAuiClasses(['aui-table-head', className])}
    >
      {content}
    </thead>
  );
});
TableHead.displayName = 'Table.Head';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableBody(
  { role: roleProp, className, children, ...rest },
  ref,
) {
  const ctx = useTableContext();
  // Model rows mount/unmount INSTANTLY — no defer-unmount, no collapse fade. TanStack drops a parent's
  // descendant rows from the flat row model SYNCHRONOUSLY on collapse, so they unmount the same frame and
  // disclosure is immediate in BOTH directions (the only disclosure animation is the chevron rotate). A
  // user-composed table (`children`) owns its own mounting.
  const content =
    children ??
    (ctx?.hasModel ? ctx.table.getRowModel().rows.map((row) => <TableRow key={row.id} row={row} />) : null);

  return (
    <tbody
      ref={ref}
      {...rest}
      role={roleProp ?? sectionRole(ctx?.a11y)}
      className={mergeAuiClasses(['aui-table-body', className])}
    >
      {content}
    </tbody>
  );
});
TableBody.displayName = 'Table.Body';

const TableFoot = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableFoot(
  { role: roleProp, className, children, ...rest },
  ref,
) {
  const ctx = useTableContext();
  return (
    <tfoot
      ref={ref}
      {...rest}
      role={roleProp ?? sectionRole(ctx?.a11y)}
      className={mergeAuiClasses(['aui-table-foot', className])}
    >
      {children}
    </tfoot>
  );
});
TableFoot.displayName = 'Table.Foot';

export interface TableFooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * A FIXED footer bar (pagination, totals, actions): unlike `Table.Foot` it never scrolls — not
 * vertically (it sits outside the body region) and not horizontally (it is outside the `minInlineSize`
 * scroll-clip and the body x-sync, sized to the viewport width). Free-form content, not table cells.
 * Under `scroll="self"` it renders as a `<div>` below the body; under `scroll="parent"` (where a `<div>`
 * cannot sit in a `<table>`) it degrades to a `<tfoot>` with one full-width cell.
 */
const TableFooter = React.forwardRef<HTMLElement, TableFooterProps>(function TableFooter(
  { role: roleProp, className, children, ...rest },
  ref,
) {
  const ctx = useTableContext();
  if (ctx && ctx.scroll !== 'self') {
    const isTree = ctx.a11y === 'tree';
    const defaultCellRole = isTree ? 'presentation' : ctx.a11y === 'table' ? 'cell' : 'gridcell';
    return (
      <tfoot role={sectionRole(ctx.a11y)} className="aui-table-foot aui-table-footer-section">
        <tr role={isTree ? 'presentation' : 'row'}>
          <td
            ref={ref as React.Ref<never>}
            {...rest}
            role={roleProp ?? defaultCellRole}
            colSpan={1000}
            className={mergeAuiClasses(['aui-table-footer', className])}
          >
            {children}
          </td>
        </tr>
      </tfoot>
    );
  }
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      {...rest}
      role={roleProp}
      className={mergeAuiClasses(['aui-table-footer', className])}
    >
      {children}
    </div>
  );
});
TableFooter.displayName = 'Table.Footer';

interface TableComponent {
  <TData extends RowData = RowData>(
    props: TableRootProps<TData> & { scroll: 'self' } & React.RefAttributes<HTMLDivElement>,
  ): React.ReactElement | null;
  <TData extends RowData = RowData>(
    props: TableRootProps<TData> & React.RefAttributes<HTMLTableElement | HTMLDivElement>,
  ): React.ReactElement | null;
  <TData extends RowData = RowData>(
    props: TableRootProps<TData> & React.RefAttributes<HTMLTableElement>,
  ): React.ReactElement | null;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Foot: typeof TableFoot;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  HeaderCell: typeof TableHeaderCell;
  Cell: typeof TableCell;
  SelectionToggle: typeof TableSelectionToggle;
  ExpandTrigger: typeof TableExpandTrigger;
}

export const Table = Object.assign(TableRootInner, {
  Head: TableHead,
  Body: TableBody,
  Foot: TableFoot,
  Footer: TableFooter,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
  SelectionToggle: TableSelectionToggle,
  ExpandTrigger: TableExpandTrigger,
}) as TableComponent;
