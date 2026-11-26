// Roving-focus DOM machinery. GRID mode roves CELLS (`[data-aui-table-cell]`), TREE mode roves ROWS
// (`[data-aui-table-row]` with `role="treeitem"`). The plain `table` mode does NOT rove (it is a static
// data table, not a composite widget) — it has no entry in ROVE_SELECTOR and every read narrows it out.
// Pure imperative DOM — no JSX, no React.
//
// The library tsconfig compiles WITHOUT lib.dom (es2022 only), so DOM APIs are reached through narrow
// local interface casts (the view.tsx / tabs.tsx convention) rather than the global DOM types.

import type { TableA11yMode } from './table-context';

type QueryElement = HTMLElement & {
  closest: <T = HTMLElement>(selector: string) => T | null;
  focus: () => void;
  tabIndex: number;
  getAttribute: (name: string) => string | null;
};
type QueryHost = {
  querySelector: <T = HTMLElement>(selector: string) => T | null;
  querySelectorAll: <T = HTMLElement>(selector: string) => ArrayLike<T>;
};

const INTERACTIVE_SELECTOR =
  'button,a,input,select,textarea,[role="checkbox"],[role="radio"],[role="switch"],[role="button"]';

/**
 * The rove target selector per ROVING a11y mode — cells in a grid/treegrid, treeitem rows in a tree.
 * The plain `table` mode is excluded on purpose: it never roves, so its callers must narrow `table` out
 * before indexing here (the type turns a stray `table` read into a compile error).
 */
export const ROVE_SELECTOR: Record<Exclude<TableA11yMode, 'table'>, string> = {
  grid: '[data-aui-table-cell]',
  // treegrid roves CELLS 2D just like the flat grid (APG treegrid); the row owns expand/collapse.
  treegrid: '[data-aui-table-cell]',
  tree: '[data-aui-table-row]',
};

/**
 * True when `target` is (inside) the FIRST roving cell of its row — the treegrid expand/collapse column.
 * APG treegrid: ArrowRight/Left toggle disclosure only on the leftmost cell; elsewhere they navigate
 * cells. Compares the event's closest cell against the row's first `[data-aui-table-cell]`.
 */
export function isFirstCellInRow(target: EventTarget | null): boolean {
  const cell = tableCellFromEventTarget(target);
  if (!cell) return false;
  const row = (cell as QueryElement).closest<HTMLTableRowElement & QueryHost>('[data-aui-table-row]');
  if (!row) return false;
  const firstCell = row.querySelector<HTMLElement>('[data-aui-table-cell]');
  return !!firstCell && firstCell === cell;
}

/** True when the event landed on (or inside) an interactive control — those own their own keys/clicks. */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  const element = target as QueryElement | null;
  return !!(element && typeof element.closest === 'function' && element.closest(INTERACTIVE_SELECTOR));
}

/** True when the event landed on Table's own header sort button (which owns click/Enter/Space, NOT arrows). */
export function isTableSortButton(target: EventTarget | null): boolean {
  const element = target as QueryElement | null;
  return !!(element && typeof element.closest === 'function' && element.closest('.aui-table-sort-button'));
}

export function tableCellFromEventTarget(target: EventTarget | null): HTMLElement | null {
  const element = target as QueryElement | null;
  return element && typeof element.closest === 'function'
    ? element.closest<HTMLElement>('[data-aui-table-cell]')
    : null;
}

export function tableRowFromEventTarget(target: EventTarget | null): HTMLElement | null {
  const element = target as QueryElement | null;
  return element && typeof element.closest === 'function'
    ? element.closest<HTMLElement>('[data-aui-table-row]')
    : null;
}

/** Make `target` the single tab stop among the rove candidates (roving tabindex). */
export function setCurrentTarget(root: HTMLTableElement, selector: string, target: HTMLElement): void {
  Array.from((root as HTMLTableElement & QueryHost).querySelectorAll<QueryElement>(selector)).forEach(
    (candidate: QueryElement) => {
      candidate.tabIndex = candidate === target ? 0 : -1;
    },
  );
}

function focusTarget(root: HTMLTableElement, selector: string, target: HTMLElement | undefined): void {
  if (!target) return;
  setCurrentTarget(root, selector, target);
  (target as QueryElement).focus();
}

function cellsInRow(row: HTMLTableRowElement): HTMLElement[] {
  return Array.from((row as HTMLTableRowElement & QueryHost).querySelectorAll<HTMLElement>('[data-aui-table-cell]'));
}

function rowsInTable(root: HTMLTableElement): HTMLTableRowElement[] {
  return Array.from(
    (root as HTMLTableElement & QueryHost).querySelectorAll<HTMLTableRowElement>(
      '[data-aui-table-row]:not([data-expanded-row])',
    ),
  );
}

/** GRID mode: arrows rove between cells; Home/End jump to the row bounds. Returns true when handled. */
export function moveTableFocus(root: HTMLTableElement, current: HTMLElement, key: string): boolean {
  const row = (current as QueryElement).closest<HTMLTableRowElement>('[data-aui-table-row]');
  if (!row) return false;

  const rows = rowsInTable(root);
  const rowIndex = rows.indexOf(row);
  const rowCells = cellsInRow(row);
  const columnIndex = rowCells.indexOf(current);
  if (rowIndex < 0 || columnIndex < 0) return false;

  if (key === 'Home') {
    focusTarget(root, ROVE_SELECTOR.grid, rowCells[0]);
    return true;
  }
  if (key === 'End') {
    focusTarget(root, ROVE_SELECTOR.grid, rowCells[rowCells.length - 1]);
    return true;
  }
  if (key === 'ArrowLeft') {
    focusTarget(root, ROVE_SELECTOR.grid, rowCells[Math.max(0, columnIndex - 1)]);
    return true;
  }
  if (key === 'ArrowRight') {
    focusTarget(root, ROVE_SELECTOR.grid, rowCells[Math.min(rowCells.length - 1, columnIndex + 1)]);
    return true;
  }
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    const nextRow = rows[rowIndex + (key === 'ArrowDown' ? 1 : -1)];
    if (!nextRow) return true;
    const nextCells = cellsInRow(nextRow);
    focusTarget(root, ROVE_SELECTOR.grid, nextCells[Math.min(columnIndex, nextCells.length - 1)]);
    return true;
  }
  return false;
}

/**
 * TREE mode: Up/Down move between visible treeitem rows; Home/End jump to the bounds. (Expand/collapse —
 * ArrowRight/Left — is owned by the row itself, which holds the expand state; see TableRow.)
 */
export function moveTreeFocus(root: HTMLTableElement, current: HTMLElement, key: string): boolean {
  const rows = rowsInTable(root).filter(
    (r) => (r as unknown as QueryElement).getAttribute('role') === 'treeitem',
  );
  const index = rows.indexOf(current as HTMLTableRowElement);
  if (index < 0) return false;
  if (key === 'Home') {
    focusTarget(root, ROVE_SELECTOR.tree, rows[0]);
    return true;
  }
  if (key === 'End') {
    focusTarget(root, ROVE_SELECTOR.tree, rows[rows.length - 1]);
    return true;
  }
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    const next = rows[index + (key === 'ArrowDown' ? 1 : -1)];
    if (next) focusTarget(root, ROVE_SELECTOR.tree, next);
    return true;
  }
  return false;
}
