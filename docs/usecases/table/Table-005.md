# Table-005: Check details table

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-005/usecase.ts`

## What it is

A header-less table of check messages inside an expanded result row: a status Chip and the message of each failed or warning check.

## When to choose it

Use it for a few facts about one record inside a panel or an expanded row, read and not selected or sorted. For a calculation summary use Table-003.

## Where it belongs

FD: the Why Not details of an expanded result row (RowExpansion.jsx, the failed and warning checks list). The expander is Button-028 and the Show passed filter is Checkbox-003.

## Usage guidance

The same all-cells tonal grid at scale "sm" with no header, a 96px first cell that holds a tonal xs Chip (danger for Fail) and the message in the second cell. The scene leaves out the other data rows, the Show passed checkbox and the category tabs of the expanded row.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Chip`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `shape`: `soft`
- `color`: `danger`
- `paint`: `text`, `tonal`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Header-less message grid with a11y="table", "all-cells" tonal borders, scale "sm" and a soft shape; it sits inside an expanded result row. Selector: `[class~="aui-table"]`.
2. **Body** — Contains only body rows, one per failed or warning check; there is no Table.Head. Selector: `[class~="aui-table-body"]`.
3. **Row** — One check message: the status chip followed by its text. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`.
4. **Status cell** — Fixed 96px first column that holds the status chip. Selector: `[class~="aui-table-cell"]:first-child`.
5. **Status chip** — Small danger-tonal xs chip that marks the check as a failure. Selector: `[class~="aui-chip"]`.
6. **Chip label** — The word "Fail" inside the chip. Selector: `[class~="aui-chip-label"]`. Direct text is highlighted.
7. **Message cell** — Message text that explains the check, for example "Edge distance is below the minimum." Selector: `[class~="aui-table-cell"]:last-child`.

## Component layer steps

1. **Table** — Header-less message grid with a11y="table", "all-cells" tonal borders, scale "sm" and a soft shape; it sits inside an expanded result row. Selector: `[class~="aui-table"]`.
2. **Body** — Contains only body rows, one per failed or warning check; there is no Table.Head. Selector: `[class~="aui-table-body"]`.
3. **Row** — One check message: the status chip followed by its text. Selector: `[class~="aui-table-row"]`.
4. **Status cell** — Fixed 96px first column that holds the status chip. Selector: `[class~="aui-table-cell"]:first-child`.
5. **Status chip** — Small danger-tonal xs chip that marks the check as a failure. Selector: `[class~="aui-chip"]`.
6. **Message cell** — Message text that explains the check, for example "Edge distance is below the minimum." Selector: `[class~="aui-table-cell"]:last-child`.

## Apps

- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Check details table (`fd-details`)

Apps: FD

In context source: FD: `src/components/RowExpansion.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-005/example.tsx`

```tsx
import { Chip, Table } from '../../../kit';

export default function Example() {
  return (
    <Table a11y="table" border="all-cells" borderStyle="tonal" aui={{ scale: 'sm', shape: 'soft' }}>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { width: '96' } }}>
            <Chip aui={{ color: 'danger', paint: 'tonal', scale: 'xs' }}>
              <Chip.Label>Fail</Chip.Label>
            </Chip>
          </Table.Cell>
          <Table.Cell>Edge distance is below the minimum.</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-005/options/fd-details/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Chip, Table, View } from '../../../../../kit';

// FD Why Not details (RowExpansion.jsx 36-95): a header-less all-cells tonal grid of two columns, a 96px status Chip cell (tonal, xs) and the check message. One row.
export default function FdDetailsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table a11y="table" border="all-cells" borderStyle="tonal" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { width: '96' } }}>
              <Chip aui={{ color: 'danger', paint: 'tonal', scale: 'xs' }}>
                <Chip.Label>Fail</Chip.Label>
              </Chip>
            </Table.Cell>
            <Table.Cell>Edge distance is below the minimum.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
