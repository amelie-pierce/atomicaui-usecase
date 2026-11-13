// Selection plumbing: the indicator-control registry + the select-all math (group-header select-all and
// the header MASTER select-all-everything). Kept separate so the Row + Head render the same toggles and
// share the leaf-only selection model.

import * as React from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Checkbox } from '../checkbox';
import type { CheckboxAui } from '../checkbox';
import { Radio } from '../radio';
import { Switch } from '../switch';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import { TABLE_DEFAULT_SCALE } from './use-recipe';
import type { DataRow, TableContextValue, TableIndicatorType } from './table-context';

/** The shipped control composed into the indicator column, by `indicatorType`. */
export const SELECTION_TOGGLES: Record<
  TableIndicatorType,
  React.ComponentType<{
    selected?: boolean;
    indeterminate?: boolean;
    onSelectedChange?: (selected: boolean, ...rest: never[]) => void;
    disabled?: boolean;
    'aria-label'?: string;
    // The FULL toggleable aui, not just `scale`: these are the shipped Checkbox/Radio/Switch, which
    // already carry per-state appearance. Narrowing this to `scale` was what stopped a consumer
    // giving the selection control a selected/unselected treatment.
    aui?: CheckboxAui;
  }>
> = {
  checkbox: Checkbox as never,
  radio: Radio as never,
  switch: Switch as never,
};

/** Selectable leaf descendants of a group-header row (selection DATA lives only on leaves). */
export interface GroupSelection {
  leaves: DataRow[];
  selectedCount: number;
  allSelected: boolean;
  someSelected: boolean;
}

export function computeGroupSelection(row: DataRow): GroupSelection {
  const leaves = row.getLeafRows().filter((r) => r.getCanSelect());
  const selectedCount = leaves.filter((r) => r.getIsSelected()).length;
  const allSelected = leaves.length > 0 && selectedCount === leaves.length;
  return { leaves, selectedCount, allSelected, someSelected: selectedCount > 0 && !allSelected };
}

/**
 * Drive a set of leaf rows in ONE row-selection update (a per-leaf toggle loop would batch-clobber —
 * each updater reads the same stale closure snapshot). Used by both the group-header select-all and the
 * header master.
 */
export function setLeafSelection(table: TableContextValue['table'], leaves: DataRow[], next: boolean): void {
  table.setRowSelection((prev) => {
    const out: RowSelectionState = { ...(prev as RowSelectionState) };
    leaves.forEach((r) => {
      if (next) out[r.id] = true;
      else delete out[r.id];
    });
    return out;
  });
}

/**
 * The HEADER MASTER select-all-everything toggle. Computed over the LEAF rows only (rows with no
 * subRows) — NEVER `toggleAllRowsSelected`, which would ALSO select the group-PARENT rows and desync the
 * group/leaf model (a parent's `getIsSelected` is derived, not stored). Selected when ALL leaves are
 * selected, INDETERMINATE when SOME. A radio master is nonsensical, so the master is always a checkbox
 * (or a switch when that's the indicator type).
 */
export function renderHeaderSelectAll(ctx: TableContextValue): React.ReactNode {
  const leaves = ctx.table
    .getCoreRowModel()
    .flatRows.filter((r) => r.subRows.length === 0 && r.getCanSelect());
  const selectedCount = leaves.filter((r) => r.getIsSelected()).length;
  const allSelected = leaves.length > 0 && selectedCount === leaves.length;
  const someSelected = selectedCount > 0 && !allSelected;
  const HeaderToggle = ctx.indicatorType === 'switch' ? SELECTION_TOGGLES.switch : SELECTION_TOGGLES.checkbox;
  return (
    <HeaderToggle
      selected={allSelected}
      {...(ctx.indicatorType !== 'switch' && someSelected ? { indeterminate: true } : {})}
      onSelectedChange={(next) => setLeafSelection(ctx.table, leaves, next)}
      aria-label="Select all rows"
      // Track the table density tier (root aui.scale) rather than a hardcoded `xs` — so the header
      // master matches the row toggles and the table's sm/md/lg scale (G15: a reference fallback).
      // The Root's `selectionToggleAui` rides on top, exactly as it does on the row toggles: the
      // master is the ONE control that ever renders `indeterminate`, so leaving it out would have
      // made that state the one a consumer could not reach.
      aui={{
        scale: resolveAuiScale(undefined, ctx.density.scale, TABLE_DEFAULT_SCALE),
        ...ctx.selectionToggleAui,
      }}
    />
  );
}
