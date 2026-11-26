# Table-001: Results grid

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-001/usecase.ts`

## What it is

The results table of the Output pane: a framed all-cells grid with a raised sortable header, the first column pinned and left-aligned, and the other columns centred.

## When to choose it

Use it for a read-only grid of calculated results that scrolls on its own and keeps the first column in view. Header labels sit in a single span so a wrapped label stays one flex item inside the sort button. For a short summary of a few lines use the Calculation summary table (Table-003) instead.

## Where it belongs

The Output pane of every calculator that lists candidate products: HCS F01Results.tsx (Connector calculation results), HS ResultsTable.tsx, PFD ResultsTable.tsx, AGPD Results.tsx (Gable plate results), PBS ResultsSection.tsx, RWS output.tsx and FD Results.jsx (Fastener solutions). ACE writes its Output tables the same way in CalculationOutput.tsx. Row selection, the expander and the column menu inside it are Table-002, Button-028 and Button-035.

## Usage guidance

Table with scale "sm", shape "soft" and a 1px outlined frame set through aui sx (gap 0, minHeight 0, the four border widths, borderColor "outlined"); border "all-cells", borderStyle "tonal"; scroll "self" with bodyFit "content" and fit "fill"; minInlineSize as the sum of the column widths; frozenColumns 1; sortable. headerCellAui sets color "raised" and textAlign "center". The table is composed by hand, so every Table.HeaderCell and Table.Cell carries its own aui (a cell aui replaces the table-level one): scale "sm", the same width token on the header and body cell (scroll "self" renders head and body as two tables, so a missing width misaligns them), textAlign "center" except the first column, which is "left". Each Table.HeaderCell passes sortDirection, onSortToggle and a title "Sort by ...". One group: all eight apps render this grid. Measured in headless Chromium: PFD and PBS pass a scale prop that renders "xs" and differ from "sm" only by 2px of cell height (xs 26/27px against sm 28/29px), with the same 4px 6px padding, 14px/18px type, 1px solid rgb(148, 163, 184) cell borders, raised header and a sticky white first column. ACE writes the same frame, widths and centring, but its tables have no sort buttons and no pinned first column (plain header labels, first body cell position static with a transparent background); that is an app-side omission against the HCS standard and is merged away. The scene leaves out the selection radio, the expander, the column menu, grouped rows, the thumbnail and the other columns.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `raised`
- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Framed results grid: scale "sm", soft shape, a 1px outlined border and "all-cells" tonal borders. It scrolls on its own (scroll "self"), pins the first column with frozenColumns={1} and is sortable. Selector: `[class~="aui-table"]`.
2. **Header** — Raised header band holding the single row of sortable column headings, Model and Load (lb). Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Centred raised heading with a 128px width that matches its body column; the label sits in one span so a wrapped label stays a single flex item. Selector: `[class~="aui-table-header-cell"]`.
4. **Sort button** — The sort control built from sortDirection and onSortToggle; its title reads "Sort by Model" or "Sort by Load". Selector: `[class~="aui-table-sort-button"]`.
5. **Body** — The two result rows, Model B-200 (2,210) and Model C-300 (1,180), scrolling under the pinned header. Selector: `[class~="aui-table-body"]`.
6. **Row** — One candidate product, a plain read-only row with no selection or expander. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`.
7. **Cell** — Value cell using the same 128px width token as its header; the model name is left-aligned in the pinned first column and the load is centred. Selector: `[class~="aui-table-cell"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PFD (`pfd`)
- AGPD (`agpd`)
- PBS (`pbs`)
- RWS (`rws`)
- FD (`fd`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Results grid (`hcs-results-grid`)

Apps: HCS, HS, PFD, AGPD, PBS, RWS, FD, ACE

In context source: HCS: `src/components/F01Results.tsx`; HS: `src/hs/ResultsTable.tsx`; PFD: `src/pfd/ResultsTable.tsx`; AGPD: `src/agpd/Results.tsx`; PBS: `src/ResultsSection.tsx`; RWS: `src/rws/output.tsx`; FD: `src/components/Results.jsx`; ACE: `src/features/calculation/ui/CalculationOutput.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-001/example.tsx`

```tsx
import { Table } from '../../../kit';

export default function Example() {
  return (
    <Table
      aria-label="Results"
      aui={{
        scale: 'sm',
        shape: 'soft',
        sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' },
      }}
      border="all-cells"
      borderStyle="tonal"
      scroll="self"
      bodyFit="content"
      fit="fill"
      minInlineSize={256}
      frozenColumns={1}
      sortable
      headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
    >
      <Table.Head>
        <Table.Row data-aui-header-row>
          <Table.HeaderCell aui={{ scale: 'sm', color: 'raised', sx: { width: '128', textAlign: 'center' } }} title="Sort by Model" sortDirection={false} onSortToggle={() => {}}>
            <span>Model</span>
          </Table.HeaderCell>
          <Table.HeaderCell aui={{ scale: 'sm', color: 'raised', sx: { width: '128', textAlign: 'center' } }} title="Sort by Load" sortDirection={false} onSortToggle={() => {}}>
            <span>Load (lb)</span>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'left' } }}>Model B-200</Table.Cell>
          <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'center' } }}>2,210</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'left' } }}>Model C-300</Table.Cell>
          <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'center' } }}>1,180</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-001/options/hcs-results-grid/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// The Output results table of HCS (F01Results.tsx 536-626), shared by HS, PFD, AGPD, PBS, RWS and FD: an all-cells tonal grid in a soft outlined frame,
// raised centred sortable header, first column pinned and left-aligned, other columns centred. Cut to two columns and two rows; the selection radio,
// expander and column menu are Table-002 and Button-028 and Button-035.
export default function HcsResultsGridScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Results"
        aui={{
          scale: 'sm',
          shape: 'soft',
          sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' },
        }}
        border="all-cells"
        borderStyle="tonal"
        scroll="self"
        bodyFit="content"
        fit="fill"
        minInlineSize={256}
        frozenColumns={1}
        sortable
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row>
            <Table.HeaderCell aui={{ scale: 'sm', color: 'raised', sx: { width: '128', textAlign: 'center' } }} title="Sort by Model" sortDirection={false} onSortToggle={() => {}}>
              <span>Model</span>
            </Table.HeaderCell>
            <Table.HeaderCell aui={{ scale: 'sm', color: 'raised', sx: { width: '128', textAlign: 'center' } }} title="Sort by Load" sortDirection={false} onSortToggle={() => {}}>
              <span>Load (lb)</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'left' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'center' } }}>2,210</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'left' } }}>Model C-300</Table.Cell>
            <Table.Cell aui={{ scale: 'sm', sx: { width: '128', textAlign: 'center' } }}>1,180</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
