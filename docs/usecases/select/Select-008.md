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

ADC: a Select with a Select.Trigger at scale "xs", color "surface", paint "fixed" and width "fill", so it takes the width of its cell; it holds Select.Value and Select.Chevron and carries aria-label "Hef". Select.Portal > Select.Positioner (side "bottom", sideOffset 4) > Select.Popup with matchTriggerWidth > Select.List holds Select.Items, each with Select.ItemText and a Select.ItemIndicator written with `{null}`. The app also shows a plain Button with a chevron in place of the select for rows that are not being edited, and opens the list on mount for the row just chosen (defaultOpen); the scene shows the open select in a fixed-width cell and leaves out the table, the other columns and the expand toggles.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Select`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

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

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Cell select (`adc-table-cell`)

Apps: ADC

In context source: ADC: `src/adc/components/ProductsPicker.tsx`

In context view: Hidden by the authored option setting.

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
import { Select, View } from '../../../../../kit';

// The Hef cell of the Products table of ADC (src/adc/components/ProductsPicker.tsx, HefSelect): a bare Select with no Field and no label, a compact (scale "xs") outlined trigger that fills its table cell and a popup
// the width of the trigger. Built open and non-modal (container={host}, positioner ug-anchored); the cell is a fixed-width wrapper. Left out: the table, its other columns, the expand toggles and the metric
// display of the Hef values; the app opens the list on mount for the row being edited, the scene opens it the same way.
export default function AdcTableCellScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 120px)' }}>
      <Select open
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
        <Select.Portal container={host}>
          <Select.Positioner side="bottom" sideOffset={4} className="ug-anchored">
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
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
