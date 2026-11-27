# Table-003: Calculation summary table

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-003/usecase.ts`

## What it is

A short table of a few labelled rows under a raised header band: the calculation summary and the limit state ratios of a result.

## When to choose it

Use it for a few labelled rows that the user reads but does not select or sort. For a scrolling, sortable grid use the Results grid (Table-001); for a paper copy use the Print table (Table-006). A data preview is Table-004 and a list of check messages is Table-005.

## Where it belongs

The calculation summary and result detail tables: ADM shared/ResultTable.tsx (used by LimitStateTable, GoverningRatioTable and InteractionTable, with StatusCell) and ADC ResultTable.tsx (the calculation summary).

## Usage guidance

Table with a raised header band (headerCellAui color "raised"; a Table.HeaderCell with its own aui replaces headerCellAui, so each one repeats color "raised"), aui shape "soft" and a 1px outlined frame (the four border widths, borderColor "outlined"). Two groups, one scene each, measured in headless Chromium: ADM (border "between-rows", overflow "hidden") centres headers and cells (text-align center) with the first column left, puts a full-width title band (colSpan) above the column headers, and leads the Ratio cell with a coloured status dot Symbol (success below 100%, error from 100%, muted for N/A); ADC summary (the same between-rows frame) right-aligns every header and cell (text-align right) with the first column left, and sets a bracketed unit in the header in the Symbol font. The scenes leave out the other tables of the tabs, the dot colours other than success and the other data rows.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Symbol`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`
- `shape`: `soft`
- `color`: `raised`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Table** — Short summary table: border "between-rows" in a soft 1px outlined frame, overflow hidden and text right-aligned so the numbers line up. Selector: `[class~="aui-table"]`. Layer step: **Table** — Soft framed summary uses right-aligned values and between-row borders.
2. **Header** — Raised band with the Limit state, Demand (lb) and Capacity (lb) headings; ADM adds a full-width Limit states title row above them. Selector: `[class~="aui-table-head"]`. Layer step: **Header** — Raised header names Limit state, Demand, and Capacity columns.
3. **Header cell** — Column heading; the first, Limit state, is left-aligned while the numeric headings follow the right-aligned table. Selector: `[class~="aui-table-header-cell"]`. Layer step: **Header cell** — Limit state aligns left while numeric headings align right.
4. **Body** — Rows for Steel tension (2,210 / 5,400) and Concrete breakout (1,180 / 3,060), separated by hairlines. Selector: `[class~="aui-table-body"]`. Layer step: **Body** — Two material rows show demand and capacity values.
5. **Row** — One limit state with its demand and capacity values. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`. Layer step: **Row** — One limit state with its demand and capacity values.
6. **Cell** — Value cell; the limit state name is left-aligned through its own aui, the figures stay right-aligned. Selector: `[class~="aui-table-cell"]`. Layer step: **Cell** — Names align left while numeric figures align right.
7. **Status dot** — ADM only: the Ratio cell leads with a coloured success dot before the 41% value. Selector: `[class~="aui-table-cell"] [class~="aui-symbol"]`. Layer step: **Status dot** — ADM adds a success dot before the Ratio percentage.

## Apps

- ADM (`adm`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Centered summary table (`adm-summary`)

Apps: ADM

In context source: ADM: `src/features/calculation/components/shared/ResultTable.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-003/example.tsx`

```tsx
import { Symbol, Table, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Limit states"
        border="between-rows"
        aui={{ shape: 'soft', sx: { borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', overflow: 'hidden', width: 'fill', flex: 'none', textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell colSpan={3} aui={{ sx: { textAlign: 'left' } }}>Limit states</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'left' } }}>Limit state</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }}>Demand (lb)</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }}>Ratio</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Steel tension</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
            <Table.Cell>
              <Symbol color="success" aria-hidden>●</Symbol> 41%
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-003/options/adm-summary/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Symbol, Table, View } from '../../../../../kit';

// ADM Result tab detail table (shared/ResultTable.tsx 20-200, LimitStateTable.tsx, StatusCell.tsx): rows separated by lines in a soft outlined frame, a full-width title band
// above the raised column headers, headers and cells centred with the first column left-aligned, and a Ratio cell that leads with a coloured status dot. Two columns
// and one row; the pass or fail colour of the dot follows the 100% threshold.
export default function AdmSummaryScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Limit states"
        border="between-rows"
        aui={{ shape: 'soft', sx: { borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', overflow: 'hidden', width: 'fill', flex: 'none', textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell colSpan={3} aui={{ sx: { textAlign: 'left' } }}>Limit states</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'left' } }}>Limit state</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }}>Demand (lb)</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }}>Ratio</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Steel tension</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
            <Table.Cell>
              <Symbol color="success" aria-hidden>●</Symbol> 41%
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 2. Right-aligned summary (`adc-summary`)

Apps: ADC

In context source: ADC: `src/adc/components/ResultTable.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-003/options/adc-summary/example.tsx`

```tsx
import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
    <Table
      aria-label="Governing ratios"
      border="between-rows"
      aui={{ shape: 'soft', sx: { textAlign: 'right', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', overflow: 'hidden' } }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'left' } }}>Limit state</Table.HeaderCell>
          <Table.HeaderCell>Demand (lb)</Table.HeaderCell>
          <Table.HeaderCell>Capacity (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Steel tension</Table.Cell>
          <Table.Cell>2,210</Table.Cell>
          <Table.Cell>5,400</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Concrete breakout</Table.Cell>
          <Table.Cell>1,180</Table.Cell>
          <Table.Cell>3,060</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-003/options/adc-summary/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ADC calculation summary table (ResultTable.tsx 1-100): rows separated by lines in a soft outlined frame, the raised header band, numbers right-aligned and the first
// column left-aligned. Two columns of numbers and two rows; the unit in a header sets its bracket in the Symbol font in the app.
export default function AdcSummaryScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
    <Table
      aria-label="Governing ratios"
      border="between-rows"
      aui={{ shape: 'soft', sx: { textAlign: 'right', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1', overflow: 'hidden' } }}
      headerCellAui={{ color: 'raised' }}
    >
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ color: 'raised', sx: { textAlign: 'left' } }}>Limit state</Table.HeaderCell>
          <Table.HeaderCell>Demand (lb)</Table.HeaderCell>
          <Table.HeaderCell>Capacity (lb)</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Steel tension</Table.Cell>
          <Table.Cell>2,210</Table.Cell>
          <Table.Cell>5,400</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Concrete breakout</Table.Cell>
          <Table.Cell>1,180</Table.Cell>
          <Table.Cell>3,060</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
