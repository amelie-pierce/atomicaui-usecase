# Table-007: Job tally totals row

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-007/usecase.ts`

## What it is

A Table.Foot row under the body that totals the columns above it in a results table, kept in view while the body scrolls.

## When to choose it

Use it for a line that sums the rows above (a quantity per column, a list of totals) and belongs to the table, not to one row. A summary of values with no rows above it is the summary table (Table-003). The totals line of a printed table is Table-008.

## Where it belongs

ACE Job Tally results table (a Total row of per-product quantities) and the HS job list (a Fastener Totals label and the totals under it).

## Usage guidance

The same Table as the results grid (Table-001) with a Table.Foot after the Table.Body, holding Table.Row and Table.Cell like the body; Table.Foot is the part that makes it a variant, since no other table of the gallery writes it. Measured: the foot cells match the body cells (29px high, 4px 8px padding, 16px regular text, no fill), and with scroll "self" the foot is split out like the head and stays fixed while the body scrolls. ACE: one Total row, the first cell left aligned (sx textAlign "left") and a total under each product column, in a striped table. HS: two foot rows whose cells span columns (colSpan), the first a semi-bold Type "Fastener Totals" label and the second one Type per total line. The scenes keep one body row and one product column; the row buttons, the extra columns and the dialogs are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `Symbol`, `Table`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `raised`, `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Self-scrolling table (scroll="self", scale "sm", soft); the ACE job tally also uses bodyFit "content" and striped rows, and the HS list uses a raised, centred header. Selector: `[class~="aui-table"]`.
2. **Header** — Header row with #, Column Spacing and Row Spacing; the job tally scenes use Job and Model B-200 or Job, Model and Qty. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Column heading; the # column is fixed at 32px. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The scrolling record rows whose columns the foot totals. Selector: `[class~="aui-table-body"]`.
5. **Row** — One record, index 1 with its X and Y spacing inputs. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`.
6. **Cell** — Body cell; the first is the 32px row number and the other two each host a number field. Selector: `[class~="aui-table-cell"]`.
7. **Number field** — Spacing input in a cell, "X Spacing 1" defaulting to 6 and "Y Spacing 1" to 8, minimum 1. Selector: `[class~="aui-number-field"]`.
8. **Input group** — Fixed surface frame that joins the numeric input and its unit. Selector: `[class~="aui-number-field-group"]`.
9. **Input** — Right-aligned numeric entry that can shrink to zero width. Selector: `[class~="aui-number-field-group"] [class~="aui-input"]`.
10. **Unit** — The "in" unit shown after the value. Selector: `[class~="aui-number-field-unit"]`.
11. **Foot** — Totals rows under the body: ACE shows Total 4, HS shows a Fastener Totals heading and "16 nails, 8d" spanning the Model and Qty columns. Selector: `[class~="aui-table-foot"]`.

## Apps

- ACE (`ace`)
- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Job tally (`ace-tally`)

Apps: ACE

In context source: ACE: `src/features/calculation/ui/CalculationOutput.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-007/example.tsx`

```tsx
import { Field, Symbol, Table } from '../../../kit';

export default function Example() {
  return (
    <Table aria-label="Anchor spacing" scroll="self" aui={{ scale: 'sm', shape: 'soft', sx: { width: 'fill' } }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ sx: { width: '32' } }}>#</Table.HeaderCell>
          <Table.HeaderCell>Column Spacing</Table.HeaderCell>
          <Table.HeaderCell>Row Spacing</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { width: '32' } }}>1</Table.Cell>
          <Table.Cell>
            <Field.NumberField aria-label="X Spacing 1" defaultValue={6} min={1} aui={{ sx: { width: 'fill', minWidth: '0' } }}>
              <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
                <Field.NumberFieldInput aui={{ sx: { minWidth: '0', textAlign: 'end' } }} />
                <Field.NumberFieldUnit>
                  <Symbol>in</Symbol>
                </Field.NumberFieldUnit>
              </Field.NumberFieldGroup>
            </Field.NumberField>
          </Table.Cell>
          <Table.Cell>
            <Field.NumberField aria-label="Y Spacing 1" defaultValue={8} min={1} aui={{ sx: { width: 'fill', minWidth: '0' } }}>
              <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
                <Field.NumberFieldInput aui={{ sx: { minWidth: '0', textAlign: 'end' } }} />
                <Field.NumberFieldUnit>
                  <Symbol>in</Symbol>
                </Field.NumberFieldUnit>
              </Field.NumberFieldGroup>
            </Field.NumberField>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-007/options/ace-tally/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ACE Job Tally (src/features/calculation/ui/CalculationOutput.tsx 626-731): the results table with a Table.Foot of one Total row under the body (first cell left aligned, a total per product column);
// with scroll "self" the foot stays fixed while the body scrolls. One job row and one product column; the Edit and Delete job buttons, the user-input column and the Add New Job button are left out.
export default function AceTallyScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Job tally"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        scroll="self"
        bodyFit="content"
        striped
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Job</Table.HeaderCell>
            <Table.HeaderCell>Model B-200</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Job 1</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>Total</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </View>
  );
}
```

### 2. Job tally — UI variant 2 (`hs-totals`)

Apps: HS

In context source: HS: `src/hs/OutputPane.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-007/options/hs-totals/example.tsx`

```tsx
import { Field, Symbol, Table } from '../../../../../kit';

export default function Example() {
  return (
    <Table aria-label="Anchor spacing" scroll="self" aui={{ scale: 'sm', shape: 'soft', sx: { width: 'fill' } }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell aui={{ sx: { width: '32' } }}>#</Table.HeaderCell>
          <Table.HeaderCell>Column Spacing</Table.HeaderCell>
          <Table.HeaderCell>Row Spacing</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell aui={{ sx: { width: '32' } }}>1</Table.Cell>
          <Table.Cell>
            <Field.NumberField aria-label="X Spacing 1" defaultValue={6} min={1} aui={{ sx: { width: 'fill', minWidth: '0' } }}>
              <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
                <Field.NumberFieldInput aui={{ sx: { minWidth: '0', textAlign: 'end' } }} />
                <Field.NumberFieldUnit>
                  <Symbol>in</Symbol>
                </Field.NumberFieldUnit>
              </Field.NumberFieldGroup>
            </Field.NumberField>
          </Table.Cell>
          <Table.Cell>
            <Field.NumberField aria-label="Y Spacing 1" defaultValue={8} min={1} aui={{ sx: { width: 'fill', minWidth: '0' } }}>
              <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
                <Field.NumberFieldInput aui={{ sx: { minWidth: '0', textAlign: 'end' } }} />
                <Field.NumberFieldUnit>
                  <Symbol>in</Symbol>
                </Field.NumberFieldUnit>
              </Field.NumberFieldGroup>
            </Field.NumberField>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-007/options/hs-totals/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, Type, View } from '../../../../../kit';

// HS job list (src/hs/OutputPane.tsx 520-560, JobList.jsx 266-287): the Table.Foot holds two rows whose cells span columns: a "Fastener Totals" label (semi-bold Type) and under it the totals, one Type per line.
// One job row; the row buttons, the other columns and the Duplicate and Delete job dialogs are left out.
export default function HsTotalsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Job list"
        aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}
        border="all-cells"
        borderStyle="tonal"
        scroll="self"
        bodyFit="content"
        headerCellAui={{ color: 'raised', sx: { textAlign: 'center' } }}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Job</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Qty</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>J1</Table.Cell>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={1} />
            <Table.Cell colSpan={2}>
              <Type as="strong" role="l4" weight="semi-bold">
                Fastener Totals
              </Type>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={1} />
            <Table.Cell colSpan={2}>
              <Type as="div" role="l4">
                16 nails, 8d
              </Type>
            </Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
