# Table-009: Cell input table

Component family: **Table**

UI type: **Editable table**

Source: `src/usecase-gallery/usecases/table/Table-009/usecase.ts`

## What it is

A table whose cells hold inputs: each spacing value is edited in its own number field.

## When to choose it

Use it when a grid of values is edited in place. Give each input an aria-label (the column header is its visible label) and let the field fill the cell with minWidth 0 so it shrinks to the column. A table of read-only values is Table-001 or Table-003.

## Where it belongs

ADM Design inputs, Geometry section: AnchorSpacingTable.tsx, the Anchor Spacing table with one row per anchor and a Column and a Row spacing cell.

## Usage guidance

Table with aria-label, scroll "self" (fixed layout, so the columns share the width), aui scale "sm", shape "soft", width "fill". The index header and body cell both pin sx width "32" (head and body are separate tables under scroll "self"); the two value columns share the rest. Each value cell holds a Field.NumberField (width "fill", minWidth "0", min 1) with a Field.NumberFieldGroup (color "surface", paint "fixed"), a Field.NumberFieldInput (minWidth "0", textAlign "end") and a Field.NumberFieldUnit with the unit in a Symbol. The scene shows the enabled state; the app disables a cell beyond the pattern count and renders one row per anchor, so the scene leaves out the extra rows and the disabled cells. Only ADM has it, so there is one group.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `Symbol`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Editable grid: a self-scrolling soft table at scale "sm", filling the width, whose body cells contain number fields. Selector: `[class~="aui-table"]`.
2. **Header** — Column headings #, Column Spacing and Row Spacing. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Heading for one editable spacing column; # is fixed at 32px. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — Rows of anchor spacings the user edits in place. Selector: `[class~="aui-table-body"]`.
5. **Row** — Anchor 1, with an X and a Y spacing input in the other two cells. Selector: `[class~="aui-table-row"]`.
6. **Cell** — Body cell: the 32px row number, or the wrapper around one number field. Selector: `[class~="aui-table-cell"]`.
7. **Number field** — The input that edits a spacing value: "X Spacing 1" starts at 6 and "Y Spacing 1" at 8, with min 1. Selector: `[class~="aui-number-field"]`.
8. **Input group** — Fixed surface frame holding the input and its unit. Selector: `[class~="aui-number-field-group"]`.
9. **Input** — The editable numeric text, right-aligned. Selector: `[class~="aui-number-field-group"] [class~="aui-input"]`.
10. **Unit** — The "in" unit that follows each value. Selector: `[class~="aui-number-field-unit"]`.

## Apps

- ADM (`adm`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Cell input table (`adm-cell-input`)

Apps: ADM

In context source: ADM: `src/features/design-inputs/components/GeometrySection/AnchorSpacingTable.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-009/example.tsx`

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

#### In context source — `src/usecase-gallery/usecases/table/Table-009/options/adm-cell-input/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Symbol, Table, View } from '../../../../../kit';

// ADM Anchor Spacing table (AnchorSpacingTable.tsx 20-150): a fixed-layout table in a soft frame with an index column pinned at 32 and two numeric cells that
// each hold a number field with a trailing unit. One row; the app disables cells beyond the pattern count and renders one row per anchor.
export default function AdmCellInputScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
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
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
