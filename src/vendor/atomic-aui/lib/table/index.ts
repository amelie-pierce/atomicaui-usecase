// Public surface for Table. The component + every public type, re-exported here so the workspace barrel
// (`src/index.ts`) imports from one path regardless of the internal module split.

export { Table } from './table';
export { TABLE_SX_AXES } from './use-recipe';
export type { TableRootProps, TableSectionProps, TableFooterProps } from './table';
export type { TableRowProps, TableSelectionToggleProps, TableExpandTriggerProps } from './table-row';
export type {
  TableCellProps,
  TableHeaderCellProps,
  TableSortDirection,
} from './table-cell';
export type {
  TableColor,
  TablePaint,
  TableScale,
  TableProfile,
  TableShape,
  TableElevation,
  TableRowStateKey,
  TableInteractionTarget,
  TableRootAui,
  TableRowAui,
  TableCellAui,
  TableRowStateAppearance,
  TableCellStateAppearance,
} from './use-recipe';
export type {
  TableSelectionMode,
  TableSelectAllLevels,
  TableIndicatorType,
  TableA11yMode,
  TableBorderPlacement,
  TableBorderStyle,
  TableFit,
  TableScrollMode,
} from './table-context';
