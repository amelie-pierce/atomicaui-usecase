# Table-002: Selectable rows

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-002/usecase.ts`

## What it is

A radio in the first cell selects one row of a results table; the selected row is marked by the row surface and an edge bar.

## When to choose it

Use it when the table drives one chosen result. Give every row a selectionLabel (the radio has no visible label) and put the Table.SelectionToggle in the first cell. The expander before the radio in HCS and FD is Button-028 and the row and column buttons are Button-035, Button-013 and Button-038; they are not repeated here.

## Where it belongs

Output tables where one candidate is chosen: HCS F01Results.tsx, HS ResultsTable.tsx, FD Results.jsx, PBS ResultsSection.tsx (edit mode, in the action column), RWS output.tsx (bar only), ADM MultiDesignTable.tsx (Multi design dialog) and ACE CalculationOutput.tsx (the Order model radio).

## Usage guidance

Root: selectionMode "single", indicatorType "radio", indicatorColumn false, selectionToggleAui scale "sm" with minWidth and minHeight "24", unselected color "surface" paint "tonal" borderColor "outlined", selected color "primary" paint "solid". Each Table.Row has selectionLabel and selected; the radio is a Table.SelectionToggle inside the first Table.Cell. The scenes show the enabled state (HCS shows the radio of a failed row disabled with a tooltip). Five groups, measured in headless Chromium. HCS: rows painted surface-alt rgb(241, 245, 249) with a 4px inset secondary bar rgb(18, 18, 18) on the selected row. HS, FD and PBS: the same radio and bar on white rows rgb(255, 255, 255); the radio sits in the model cell (HS, FD) or in the action column (PBS). RWS: no radio and no indicator column (no radio span, no input); only the selected row paints the 4px bar, because the Show in 3D control selects. ADM: between-rows lines, the selected row painted raised rgb(226, 232, 240) with a 4px primary bar rgb(255, 83, 8), values aligned to the end. ACE: the radio with no rowAui, so the selected row takes the library default (raised rgb(226, 232, 240) and a 1px inset edge, not a 4px bar). The scenes leave out the expander, thumbnails, group rows, the failed-row tooltip and the other columns.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `primary`, `raised`, `surface`, `surface-alt`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Selectable results table: selectionMode "single" with indicatorType "radio" and no separate indicator column, so the radio lives in the first data cell. HCS, HS, PBS and FD use the 4px secondary edge bar; ADM uses between-rows lines with a raised selected row. Selector: `[class~="aui-table"]`.
2. **Header** — Raised header with the Model and Load (lb) labels (Product and Tension (lb) in ADM); its row is marked selectable={false} so it gets no radio. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Plain column heading on the raised band; no sort control in this use case. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The two selectable candidates, Model B-200 and Model C-300. Selector: `[class~="aui-table-body"]`.
5. **Row** — A selectable row; the selected one (Model B-200) carries the row surface and a 4px start edge bar, and RWS paints that look with selection="row" and no radio. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`.
6. **Cell** — Data cell; the first one holds the radio and the model name, the second the load in lb (2,210 and 1,180). Selector: `[class~="aui-table-cell"]`.
7. **Selection radio** — 24px radio at the start of the first cell that selects the row, filled primary when selected; in ACE it sits above the model name. Selector: `[class~="aui-table-cell"] [class~="aui-radio"]`.

## Component layer steps

1. **Table** — Single-select grid places its radio inside the first data cell. Selector: `[class~="aui-table"]`.
2. **Header** — Raised header is not selectable and contains model and load labels. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Plain raised heading names columns without a sort control. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The two selectable candidates, Model B-200 and Model C-300. Selector: `[class~="aui-table-body"]`.
5. **Row** — Selected B-200 row uses a surface and 4px leading bar. Selector: `[class~="aui-table-row"]`.
6. **Cell** — First cell pairs radio and model; second shows the load. Selector: `[class~="aui-table-cell"]`.
7. **Selection radio** — 24px radio selects the row; ACE places it above the model. Selector: `[class~="aui-table-cell"] [class~="aui-radio"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- FD (`fd`)
- PBS (`pbs`)
- RWS (`rws`)
- ADM (`adm`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Row selection (`hcs-selection`)

Apps: HCS

In context source: HCS: `src/components/F01Results.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-002/example.tsx`

```tsx
import { Table } from '../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Results"
      aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
      border="all-cells"
      borderStyle="tonal"
      selectionMode="single"
      indicatorType="radio"
      indicatorColumn={false}
      selectionToggleAui={{
        scale: 'sm',
        sx: { minWidth: '24', minHeight: '24' },
        states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } },
      }}
      rowAui={{
        color: 'surface-alt',
        paint: 'solid',
        states: {
          unselected: { color: 'surface', paint: 'solid' },
          selected: { color: 'surface', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } },
        },
      }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row data-aui-header-row selectable={false}>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Load (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row selected selectionLabel="Model B-200">
          <Table.Cell>
            <Table.SelectionToggle />
            Model B-200
          </Table.Cell>
          <Table.Cell>2,210</Table.Cell>
        </Table.Row>
        <Table.Row selectionLabel="Model C-300">
          <Table.Cell>
            <Table.SelectionToggle />
            Model C-300
          </Table.Cell>
          <Table.Cell>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-002/options/hcs-selection/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// HCS Output table row (F01Results.tsx 205-288, 536-575): the first cell holds the selection radio, and the selected row keeps the surface-alt band and
// gains a 4px secondary bar at its start. The Why Not expander before the radio is Button-028; the thumbnail, sort header and other columns are left out.
export default function HcsSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selectionMode="single"
        indicatorType="radio"
        indicatorColumn={false}
        selectionToggleAui={{ scale: 'sm', sx: { minWidth: '24', minHeight: '24' }, states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}
        rowAui={{ color: 'surface-alt', paint: 'solid', states: { unselected: { color: 'surface-alt', paint: 'solid' }, selected: { color: 'surface-alt', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } } } }}
        headerCellAui={{ color: 'raised' }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected selectionLabel="Model B-200">
            <Table.Cell>
              <Table.SelectionToggle />
              Model B-200
            </Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectionLabel="Model C-300">
            <Table.Cell>
              <Table.SelectionToggle />
              Model C-300
            </Table.Cell>
            <Table.Cell>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 2. Selected row table (`hs-selection`)

Apps: HS, FD, PBS

In context source: HS: `src/hs/ResultsTable.tsx`; FD: `src/components/Results.jsx`; PBS: `src/ResultsSection.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-002/options/hs-selection/example.tsx`

```tsx
import { Table } from '../../../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Results"
      aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
      border="all-cells"
      borderStyle="tonal"
      selectionMode="single"
      indicatorType="radio"
      indicatorColumn={false}
      selectionToggleAui={{
        scale: 'sm',
        sx: { minWidth: '24', minHeight: '24' },
        states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } },
      }}
      rowAui={{
        color: 'surface',
        paint: 'solid',
        states: {
          unselected: { color: 'surface', paint: 'solid' },
          selected: { color: 'surface', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } },
        },
      }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row data-aui-header-row selectable={false}>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Load (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row selected selectionLabel="Model B-200">
          <Table.Cell>
            <Table.SelectionToggle />
            Model B-200
          </Table.Cell>
          <Table.Cell>2,210</Table.Cell>
        </Table.Row>
        <Table.Row selectionLabel="Model C-300">
          <Table.Cell>
            <Table.SelectionToggle />
            Model C-300
          </Table.Cell>
          <Table.Cell>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-002/options/hs-selection/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// HS Output table row (ResultsTable.tsx 34-57, 120-150), the same radio and bar on a surface row as FD (Results.jsx 72-83) and PBS in edit mode
// (ResultsSection.tsx 69-97, 530-570). The thumbnail and the other columns are left out.
export default function HsSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selectionMode="single"
        indicatorType="radio"
        indicatorColumn={false}
        selectionToggleAui={{ scale: 'sm', sx: { minWidth: '24', minHeight: '24' }, states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}
        rowAui={{ color: 'surface', paint: 'solid', states: { unselected: { color: 'surface', paint: 'solid' }, selected: { color: 'surface', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } } } }}
        headerCellAui={{ color: 'raised' }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected selectionLabel="Model B-200">
            <Table.Cell>
              <Table.SelectionToggle />
              Model B-200
            </Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectionLabel="Model C-300">
            <Table.Cell>
              <Table.SelectionToggle />
              Model C-300
            </Table.Cell>
            <Table.Cell>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 3. Edge marked row (`rws-selection`)

Apps: RWS

In context source: RWS: `src/rws/output.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-002/options/rws-selection/example.tsx`

```tsx
import { Table } from '../../../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Results"
      aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
      border="all-cells"
      borderStyle="tonal"
      selection="row"
      indicatorColumn={false}
      hoverable={false}
      rowAui={{ color: 'surface', paint: 'solid', states: { unselected: { color: 'surface', paint: 'solid' }, selected: { color: 'surface', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } } } }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row data-aui-header-row selectable={false}>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Load (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row selectable selected selectionLabel="Model B-200">
          <Table.Cell>Model B-200</Table.Cell>
          <Table.Cell>2,210</Table.Cell>
        </Table.Row>
        <Table.Row selectable selectionLabel="Model C-300">
          <Table.Cell>Model C-300</Table.Cell>
          <Table.Cell>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-002/options/rws-selection/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// RWS Output (output.tsx 527-560): no radio and no indicator column; the Show in 3D control selects, and the row only paints the selected look
// (a 4px secondary bar at its start). Two columns and two rows.
export default function RwsSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selection="row"
        indicatorColumn={false}
        hoverable={false}
        rowAui={{ color: 'surface', paint: 'solid', states: { unselected: { color: 'surface', paint: 'solid' }, selected: { color: 'surface', paint: 'solid', sx: { borderColor: 'secondary', borderInlineStartWidth: '4' } } } }}
        headerCellAui={{ color: 'raised' }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable selected selectionLabel="Model B-200">
            <Table.Cell>
              Model B-200
            </Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectable selectionLabel="Model C-300">
            <Table.Cell>
              Model C-300
            </Table.Cell>
            <Table.Cell>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 4. Radio row table (`adm-selection`)

Apps: ADM

In context source: ADM: `src/features/multi-design/components/MultiDesignTable.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-002/options/adm-selection/example.tsx`

```tsx
import { Table } from '../../../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Multi design"
      aui={{ color: 'surface', paint: 'solid', shape: 'soft', scale: 'sm', sx: { borderColor: 'outlined', gap: '0', width: 'fill' } }}
      selectionMode="single"
      selection="row"
      indicatorColumn={false}
      indicatorType="radio"
      border="between-rows"
      borderStyle="tonal"
      hoverable
      rowAui={{ states: { selected: { color: 'raised', sx: { borderColor: 'primary', borderInlineStartWidth: '4' } } } }}
    >
      <Table.Head>
        <Table.Row data-aui-header-row selectable={false} expandable={false}>
          <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'start' } }}>Product</Table.HeaderCell>
          <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'end' } }}>Tension (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row selected selectionLabel="A-100">
          <Table.Cell><Table.SelectionToggle />A-100</Table.Cell>
          <Table.Cell aui={{ sx: { textAlign: 'end' } }}>2,210</Table.Cell>
        </Table.Row>
        <Table.Row selectionLabel="B-200">
          <Table.Cell><Table.SelectionToggle />B-200</Table.Cell>
          <Table.Cell aui={{ sx: { textAlign: 'end' } }}>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-002/options/adm-selection/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ADM Multi design table (MultiDesignTable.tsx 49-60, 94-111): rows separated by lines, the radio in the first cell, and the selected row painted raised with a 4px
// primary bar at its start. The family group rows (Button-028) and the Pass or fail and value columns are left out.
export default function AdmSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Multi design"
        aui={{ color: 'surface', paint: 'solid', shape: 'soft', scale: 'sm', sx: { borderColor: 'outlined', gap: '0', width: 'fill' } }}
        selectionMode="single"
        selection="row"
        indicatorColumn={false}
        indicatorType="radio"
        border="between-rows"
        borderStyle="tonal"
        hoverable
        rowAui={{ states: { selected: { color: 'raised', sx: { borderColor: 'primary', borderInlineStartWidth: '4' } } } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'start' } }}>Product</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'end' } }}>Tension (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected selectionLabel="A-100">
            <Table.Cell>
              <Table.SelectionToggle />
              A-100
            </Table.Cell>
            <Table.Cell aui={{ sx: { textAlign: 'end' } }}>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectionLabel="B-200">
            <Table.Cell>
              <Table.SelectionToggle />
              B-200
            </Table.Cell>
            <Table.Cell aui={{ sx: { textAlign: 'end' } }}>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 5. Compact selection row (`ace-selection`)

Apps: ACE

In context source: ACE: `src/features/calculation/ui/CalculationOutput.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-002/options/ace-selection/example.tsx`

```tsx
import { Table } from '../../../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Results"
      aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
      border="all-cells"
      borderStyle="tonal"
      selectionMode="single"
      indicatorType="radio"
      indicatorColumn={false}
      selectionToggleAui={{
        scale: 'sm',
        sx: { minWidth: '24', minHeight: '24' },
        states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } },
      }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row data-aui-header-row selectable={false}>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Load (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row selected selectionLabel="Model B-200">
          <Table.Cell>
            <Table.SelectionToggle />
            Model B-200
          </Table.Cell>
          <Table.Cell>2,210</Table.Cell>
        </Table.Row>
        <Table.Row selectionLabel="Model C-300">
          <Table.Cell>
            <Table.SelectionToggle />
            Model C-300
          </Table.Cell>
          <Table.Cell>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-002/options/ace-selection/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ACE Output table (CalculationOutput.tsx 945-1010): the radio sits in the Model cell above the model name, and a selected row gets no edge bar (no rowAui).
// Two columns and two rows.
export default function AceSelectionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{ scale: 'sm', shape: 'soft', sx: { width: 'fill', gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        selectionMode="single"
        indicatorType="radio"
        indicatorColumn={false}
        selectionToggleAui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}
        headerCellAui={{ color: 'raised' }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected selectionLabel="Model B-200">
            <Table.Cell>
              <Table.SelectionToggle />
              Model B-200
            </Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
          <Table.Row selectionLabel="Model C-300">
            <Table.Cell>
              <Table.SelectionToggle />
              Model C-300
            </Table.Cell>
            <Table.Cell>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
