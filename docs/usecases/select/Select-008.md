# Select-008: Cell select

Component family: **Select**

UI type: **Compact select**

Source: `src/usecase-gallery/usecases/select/Select-008/usecase.ts`

## What it is

A compact label-less select that fills a table cell and picks one value for the row.

## When to choose it

Use it for a value picked inside a table row, where the column header is the label. The control is the bare Select, with no Field around it; give it an aria-label because it has no visible one.

## Where it belongs

The Hef column of the ADC Products table: each selected anchor row edits its effective embedment from a short list.

## Usage guidance

ADC: a Select with a Select.Trigger at scale "xs", color "surface", paint "fixed" and width "fill", so it takes the width of its cell; it holds Select.Value and Select.Chevron and carries aria-label "Hef". Select.Portal > Select.Positioner (side "bottom", sideOffset 4) > Select.Popup with matchTriggerWidth > Select.List holds Select.Items, each with Select.ItemText and a Select.ItemIndicator written with `{null}`. The app also shows a plain Button with a chevron in place of the select for rows that are not being edited, and opens the list on mount for the row just chosen (defaultOpen); In context shows the open editor in its row among neighboring product values, while leaving out the remaining columns and expand toggles.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Select`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — A bare Select with no Field: an "Hef" labelled (aria-label) outlined trigger at scale "xs" that fills its table cell. Selector: `[class~="aui-select-trigger"]`.
2. **Value** — Shows the effective embedment "6.000" for the row. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
3. **Chevron** — The chevron at the end of the compact trigger. Selector: `[class~="aui-select-chevron"]`.
4. **Popup** — Popup that matches the cell trigger width, 4px below it, listing 4.500, 6.000 and 7.500. Selector: `[class~="aui-select-popup"]`.
5. **List** — The list of the three Hef embedment values. Selector: `[class~="aui-select-list"]`.
6. **Item** — One embedment value row; the chosen 6.000 shows a raised fill. Selector: `[class~="aui-select-item"]`.
7. **Item text** — The numeric value text, for example "7.500". Selector: `[class~="aui-select-item-text"]`.
8. **Indicator** — Empty slot (`{null}`) at the end of each row. Selector: `[class~="aui-select-item-indicator"]`.

## Component layer steps

1. **Trigger** — Bare extra-small Select fills its cell with the Hef accessible label. Selector: `[class~="aui-select-trigger"]`.
2. **Chevron** — The chevron at the end of the compact trigger. Selector: `[class~="aui-select-chevron"]`.
3. **Popup** — Popup matches the cell trigger and lists three sizes. Selector: `[class~="aui-select-popup"]`.
4. **List** — The list of the three Hef embedment values. Selector: `[class~="aui-select-list"]`.
5. **Item** — One embedment value row; the chosen 6.000 shows a raised fill. Selector: `[class~="aui-select-item"]`.
6. **Item text** — Numeric option text shows values such as 7.500. Selector: `[class~="aui-select-item-text"]`.
7. **Indicator** — Empty slot (`{null}`) at the end of each row. Selector: `[class~="aui-select-item-indicator"]`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Cell select (`adc-table-cell`)

Apps: ADC

In context source: ADC: `src/adc/components/ProductsPicker.tsx`

In context view: Shown.

**Context view:** A compact label-less Select edits the Hef value in an active ADC Products row.

**Context placement:** The Hef cell of the product row being edited in ADC ProductsPicker.

**Context usage:** The selected product row remains visible beside neighboring values. The Hef column heading names the field; the bare Select fills that cell and opens its choices in place.

#### In context structure additions

1. **Products table** — The product rows and columns that give the bare cell select its meaning. Selector: `[data-ug-part="products-table"]`.
2. **Column headings** — Product, Hef and Weight label the active row values. Selector: `[data-ug-part="column-headings"]`.
3. **Active product row** — Anchor A-240 is the row currently being edited. Selector: `[data-ug-part="active-product-row"]`.
4. **Edited Hef cell** — The Hef column holds the open Select while the row is being edited. Selector: `[data-ug-part="edited-hef-cell"]`.

#### In context layer steps

1. **Products table** — The table frames the row and its product data. Selector: `[data-ug-part="products-table"]`.
2. **Column headings** — Product, Hef and Weight identify each cell in the table. Selector: `[data-ug-part="column-headings"]`.
3. **Active product row** — Anchor A-240 is selected for editing among neighboring products. Selector: `[data-ug-part="active-product-row"]`.
4. **Edited Hef cell** — The Select occupies the Hef cell in the active row. Selector: `[data-ug-part="edited-hef-cell"]`.
5. **Trigger** — Bare extra-small Select fills its cell with the Hef accessible label. Selector: `[class~="aui-select-trigger"]`.
6. **Chevron** — The chevron at the end of the compact trigger. Selector: `[class~="aui-select-chevron"]`.
7. **Popup** — Popup matches the cell trigger and lists three sizes. Selector: `[class~="aui-select-popup"]`.
8. **List** — The list of the three Hef embedment values. Selector: `[class~="aui-select-list"]`.
9. **Item** — One embedment value row; the chosen 6.000 shows a raised fill. Selector: `[class~="aui-select-item"]`.
10. **Item text** — Numeric option text shows values such as 7.500. Selector: `[class~="aui-select-item-text"]`.
11. **Indicator** — Empty slot (`{null}`) at the end of each row. Selector: `[class~="aui-select-item-indicator"]`.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-008/example.tsx`

```tsx
import { Select } from '../../../kit';

export default function Example() {
  return (
    <Select
      defaultValue="6"
      items={[
        { label: '4.500', value: '4.5' },
        { label: '6.000', value: '6' },
        { label: '7.500', value: '7.5' },
      ]}
    >
      <Select.Trigger aria-label="Hef" aui={{ scale: 'xs', color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
        <Select.Value />
        <Select.Chevron />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner side="bottom" sideOffset={4}>
          <Select.Popup matchTriggerWidth>
            <Select.List>
              <Select.Item value="4.5">
                <Select.ItemText>4.500</Select.ItemText>
                <Select.ItemIndicator>{null}</Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="6">
                <Select.ItemText>6.000</Select.ItemText>
                <Select.ItemIndicator>{null}</Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="7.5">
                <Select.ItemText>7.500</Select.ItemText>
                <Select.ItemIndicator>{null}</Select.ItemIndicator>
              </Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-008/options/adc-table-cell/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ADC ProductsPicker.tsx: the active Hef editor inside its product row. Neighboring values and column headings show why this bare Select has no visible Field label.
export default function AdcTableCellScene({ children }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <div data-ug-part="products-table">
        <Table aria-label="Products" aui={{ scale: 'sm', shape: 'soft', sx: { gap: '0', minHeight: '0' } }} border="all-cells" borderStyle="tonal" scroll="self" bodyFit="content" fit="fill" minInlineSize={384}>
          <Table.Head>
            <Table.Row data-ug-part="column-headings">
              <Table.HeaderCell aui={{ scale: 'sm' }}>Product</Table.HeaderCell>
              <Table.HeaderCell aui={{ scale: 'sm' }}>Hef</Table.HeaderCell>
              <Table.HeaderCell aui={{ scale: 'sm' }}>Weight</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell aui={{ scale: 'sm' }}>Anchor A-120</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>4.500</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>2.4 kg</Table.Cell>
            </Table.Row>
            <Table.Row data-ug-part="active-product-row">
              <Table.Cell aui={{ scale: 'sm' }}>Anchor A-240</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}><span data-ug-part="edited-hef-cell">{children}</span></Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>3.1 kg</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell aui={{ scale: 'sm' }}>Anchor A-360</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>7.500</Table.Cell>
              <Table.Cell aui={{ scale: 'sm' }}>4.0 kg</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
