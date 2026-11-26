# Table-008: Print table totals row

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-008/usecase.ts`

## What it is

A bold Table.Foot row that totals the columns of a table in the printed report.

## When to choose it

Use it for the totals line of a printed table that sums the rows above. For the totals row of a results table on screen use Table-007; for a paper copy without totals use the Print table (Table-006).

## Where it belongs

The ACE printed report table (print/ui/report-primitives.tsx): a bold footer row under the dense print grid.

## Usage guidance

The dense print grid of Table-006 with a Table.Foot row whose cells add typographyStyle "bold" to the print cell look (4px by 6px padding, centred). The scene keeps one body row and one column; the other columns and the report around it are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `profile`: `no-padding`
- `scale`: `xs`
- `shape`: `none`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Print report table at scale "xs": no profile padding, shape "none", a text-coloured border, all cells ruled, scroll="parent" and selectionMode "none". Selector: `[class~="aui-table"]`.
2. **Header** — Muted header band printed with Model and Qty. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Centred label on the muted fill with a surface-coloured foreground and wrapping allowed. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The line items being totalled, here Model B-200 with quantity 4. Selector: `[class~="aui-table-body"]`.
5. **Row** — One printed line item. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`.
6. **Cell** — Centred cell with 4px inline and 6px block padding shared through the CELL constant. Selector: `[class~="aui-table-cell"]`.
7. **Foot** — Totals row at the bottom of the print table, its Total label and sum set in bold typographyStyle. Selector: `[class~="aui-table-foot"]`.

## Component layer steps

1. **Table** — Print report table at scale "xs": no profile padding, shape "none", a text-coloured border, all cells ruled, scroll="parent" and selectionMode "none". Selector: `[class~="aui-table"]`.
2. **Header** — Muted header band printed with Model and Qty. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Centred label on the muted fill with a surface-coloured foreground and wrapping allowed. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The line items being totalled, here Model B-200 with quantity 4. Selector: `[class~="aui-table-body"]`.
5. **Row** — One printed line item. Selector: `[class~="aui-table-row"]`.
6. **Cell** — Centred cell with 4px inline and 6px block padding shared through the CELL constant. Selector: `[class~="aui-table-cell"]`.
7. **Foot** — Totals row at the bottom of the print table, its Total label and sum set in bold typographyStyle. Selector: `[class~="aui-table-foot"]`.

## Apps

- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Print table (`ace-print-totals`)

Apps: ACE

In context source: ACE: `src/features/print/ui/report-primitives.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-008/example.tsx`

```tsx
import { Table } from '../../../kit';

const CELL = { profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } } as const;

export default function Example() {
  return (
    <Table aria-label="Connection" aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }} border="all-cells" scroll="parent" selectionMode="none">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ ...CELL, sx: { ...CELL.sx, background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
          <Table.HeaderCell aui={{ ...CELL, sx: { ...CELL.sx, background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Qty</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={CELL}>Model B-200</Table.Cell>
          <Table.Cell aui={CELL}>4</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Foot>
        <Table.Row>
          <Table.Cell aui={{ ...CELL, sx: { ...CELL.sx, typographyStyle: 'bold' } }}>Total</Table.Cell>
          <Table.Cell aui={{ ...CELL, sx: { ...CELL.sx, typographyStyle: 'bold' } }}>4</Table.Cell>
        </Table.Row>
      </Table.Foot>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-008/options/ace-print-totals/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

const CELL = { profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } } as const;

// ACE report table with its footer (print/ui/report-primitives.tsx 213-262): the dense print grid of Table-006 plus a Table.Foot row of bold cells (typographyStyle "bold", same 4px by 6px padding), used for the totals line of a printed table.
export default function AcePrintTotalsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connection" aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }} border="all-cells" scroll="parent" selectionMode="none">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ ...CELL, sx: { ...CELL.sx, background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ ...CELL, sx: { ...CELL.sx, background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Qty</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={CELL}>Model B-200</Table.Cell>
            <Table.Cell aui={CELL}>4</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell aui={{ ...CELL, sx: { ...CELL.sx, typographyStyle: 'bold' } }}>Total</Table.Cell>
            <Table.Cell aui={{ ...CELL, sx: { ...CELL.sx, typographyStyle: 'bold' } }}>4</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
