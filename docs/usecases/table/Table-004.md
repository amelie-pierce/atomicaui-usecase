# Table-004: Data preview table

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-004/usecase.ts`

## What it is

A small table that previews the imported data before the user confirms: Field, Value and Status columns under a raised header row.

## When to choose it

Use it to show a few facts of imported data that the user reads before continuing, not selects or sorts. For a calculation summary use Table-003; for a scrolling, sortable grid use the Results grid (Table-001).

## Where it belongs

ADC: the Import step Data Preview (CapImportSteps.tsx). No other app previews imported data in a table.

## Usage guidance

An all-cells tonal grid (border "all-cells", borderStyle "tonal") at scale "sm" in a soft outlined frame (the four border widths, borderColor "outlined"), with a raised header row (headerCellAui color "raised": FIELD, VALUE, STATUS) and plain left-aligned cells. The scene leaves out the other data rows and the import wizard around it.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `surface`
- `paint`: `solid`, `text`
- `shape`: `soft`
- `scale`: `sm`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Import preview grid: surface-coloured solid soft table at scale "sm" with "all-cells" tonal borders and a 1px outlined frame. Selector: `[class~="aui-table"]`.
2. **Header** — Raised heading row with the upper-case FIELD, VALUE and STATUS labels. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — One of the three column headings, FIELD, VALUE or STATUS, with the default alignment and no sorting. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — Holds the previewed record that the user checks before confirming the import. Selector: `[class~="aui-table-body"]`.
5. **Row** — One imported field: Design Method, ACI 318, Supported. Selector: `[class~="aui-table-row"]`.
6. **Cell** — Plain text cell for the field name, its parsed value or its support status. Selector: `[class~="aui-table-cell"]`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Data preview table (`adc-preview`)

Apps: ADC

In context source: ADC: `src/adc/components/CapImportSteps.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-004/example.tsx`

```tsx
import { Table } from '../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Data preview"
      border="all-cells"
      borderStyle="tonal"
      aui={{
        color: 'surface',
        paint: 'solid',
        shape: 'soft',
        scale: 'sm',
        sx: { borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', borderColor: 'outlined' },
      }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>FIELD</Table.HeaderCell>
          <Table.HeaderCell>VALUE</Table.HeaderCell>
          <Table.HeaderCell>STATUS</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Design Method</Table.Cell>
          <Table.Cell>ACI 318</Table.Cell>
          <Table.Cell>Supported</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-004/options/adc-preview/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ADC Import step Data Preview (CapImportSteps.tsx 30-140): a three-column key table, all-cells tonal grid in a soft outlined frame, raised header, sm cells left-aligned. One data row.
export default function AdcPreviewScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
    <Table
      aria-label="Data preview"
      border="all-cells"
      borderStyle="tonal"
      aui={{
        color: 'surface',
        paint: 'solid',
        shape: 'soft',
        scale: 'sm',
        sx: { borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', borderColor: 'outlined' },
      }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>FIELD</Table.HeaderCell>
          <Table.HeaderCell>VALUE</Table.HeaderCell>
          <Table.HeaderCell>STATUS</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Design Method</Table.Cell>
          <Table.Cell>ACI 318</Table.Cell>
          <Table.Cell>Supported</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
