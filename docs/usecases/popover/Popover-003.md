# Popover-003: Column menu

Component family: **Popover**

UI type: **Popover**

Source: `src/usecase-gallery/usecases/popover/Popover-003/usecase.ts`

## What it is

A popover of choices opened from the kebab of a table header cell: the Sort radios for that column.

## When to choose it

Use it for the options of one column. Do not use it for a form with a footer (Popover-002).

## Where it belongs

The header cell of the results table in HCS, HS and PFD. Real source: ColumnMenu.tsx of each app.

## Usage guidance

The kebab `IconButton` (Button-035) is passed through the header cell `actions`; the Popover opens under it (`side="bottom"`, `sideOffset={4}`), a 256px `View` column (surface, solid, soft, elevation 4, gap 12) holding a `RadioGroup`. HCS and HS open to the cell end (`align="end"`); PFD opens towards the next column (`align="start"`) and starts the popup with a Close Button. The scenes leave out the search fields and filters.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `ContainedIcon`, `IconButton`, `Popover`, `Radio`, `RadioGroup`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `default`, `no-padding`, `square`, `square-compact`
- `color`: `primary`, `raised`, `secondary`, `surface`
- `shape`: `soft`
- `scale`: `sm`, `xs`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — The ellipsis-vertical "Column options" icon button, an xs kebab with a compact square profile; in the table scenes the popover anchors to the Load (lb) kebab instead. Selector: `[data-base-ui-click-trigger]`.
2. **Results table** — The "Connector calculation results" table of the HCS and PFD scenes whose headers host the kebab. Selector: `[class~="aui-table"]`.
3. **Sortable header cell** — The Load (lb) header, sorted ascending, whose actions slot carries the kebab (vertical dots in HCS, horizontal in PFD). Selector: `[data-ug-part="header-cell"]`.
4. **Popup** — The 256px elevated column opened under the kebab, aligned to the cell end in HCS and the example and to its start in PFD. Selector: `[data-aui-popup-motion][role="dialog"]`.
5. **Close** — The PFD square Close button that starts the popup, end-aligned above the Sort choices. Part marker: `data-ug-part="close"`.
6. **Sort group** — The RadioGroup labelled "Sort" that holds the ordering choices. Selector: `[class~="aui-radio-group"]`.
7. **Sort option** — A sort choice such as "Sort A to Z" or "Sort Z to A"; the table scenes add "(Smallest to Largest)" hints and a None option, selected options are solid primary. Selector: `[class~="aui-radio"]`.

## Component layer steps

1. **Trigger** — The ellipsis-vertical "Column options" icon button, an xs kebab with a compact square profile; in the table scenes the popover anchors to the Load (lb) kebab instead. Selector: `[data-base-ui-click-trigger]`.
2. **Results table** — The "Connector calculation results" table of the HCS and PFD scenes whose headers host the kebab. Selector: `[class~="aui-table"]`.
3. **Sortable header cell** — The Load (lb) header, sorted ascending, whose actions slot carries the kebab (vertical dots in HCS, horizontal in PFD). Selector: `[data-ug-part="header-cell"]`.
4. **Popup** — The 256px elevated column opened under the kebab, aligned to the cell end in HCS and the example and to its start in PFD. Selector: `[data-aui-popup-motion][role="dialog"]`.
5. **Close** — The PFD square Close button that starts the popup, end-aligned above the Sort choices. Selector: `[data-ug-part="close"]`.
6. **Sort group** — The RadioGroup labelled "Sort" that holds the ordering choices. Selector: `[class~="aui-radio-group"]`.
7. **Sort option** — A sort choice such as "Sort A to Z" or "Sort Z to A"; the table scenes add "(Smallest to Largest)" hints and a None option, selected options are solid primary. Selector: `[class~="aui-radio"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PFD (`pfd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. End-aligned sort menu (`hcs-column-menu`)

Apps: HCS, HS

In context source: HCS: `src/components/ColumnMenu.tsx`; HS: `src/hs/ColumnMenu.tsx`

In context view: Shown.

#### In context structure additions

1. **Result rows** — The table body rows under the header; with Load sorted A to Z they follow the chosen order. Part marker: `data-ug-part="rows"`.
2. **Neighbouring header cell** — The Model header cell with its own kebab, shown beside the Load (lb) header that the open menu belongs to. Part marker: `data-ug-part="other-header"`.

#### In context layer steps

1. **Result rows** — The table body rows under the header; with Load sorted A to Z they follow the chosen order. Selector: `[data-ug-part="rows"]`.
2. **Neighbouring header cell** — The Model header cell with its own kebab, shown beside the Load (lb) header that the open menu belongs to. Selector: `[data-ug-part="other-header"]`.
3. **Trigger** — The ellipsis-vertical "Column options" icon button, an xs kebab with a compact square profile; in the table scenes the popover anchors to the Load (lb) kebab instead. Selector: `[data-base-ui-click-trigger]`.
4. **Results table** — The "Connector calculation results" table of the HCS and PFD scenes whose headers host the kebab. Selector: `[class~="aui-table"]`.
5. **Sortable header cell** — The Load (lb) header, sorted ascending, whose actions slot carries the kebab (vertical dots in HCS, horizontal in PFD). Selector: `[data-ug-part="header-cell"]`.
6. **Popup** — The 256px elevated column opened under the kebab, aligned to the cell end in HCS and the example and to its start in PFD. Selector: `[data-aui-popup-motion][role="dialog"]`.
7. **Close** — The PFD square Close button that starts the popup, end-aligned above the Sort choices. Selector: `[data-ug-part="close"]`.
8. **Sort group** — The RadioGroup labelled "Sort" that holds the ordering choices. Selector: `[class~="aui-radio-group"]`.
9. **Sort option** — A sort choice such as "Sort A to Z" or "Sort Z to A"; the table scenes add "(Smallest to Largest)" hints and a None option, selected options are solid primary. Selector: `[class~="aui-radio"]`.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-003/example.tsx`

```tsx
import { IconButton, Popover, Radio, RadioGroup, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<IconButton name="ellipsis-vertical" aria-label="Column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Column options"
              render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }} />}
            >
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A</Radio.Label></Radio>
              </RadioGroup>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-003/options/hcs-column-menu/scene.tsx`

```tsx
import { useState } from 'react';
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, Radio, RadioGroup, Table, View } from '../../../../../kit';
import { MOCK_OUTPUT_ROWS_BY_LOAD } from '../../../../../mock-data';

// F01Results header + ColumnMenu (HS ColumnMenu renders the same; its kebab is color "secondary" while sorted, computed the same as "surface"): every header cell takes its kebab through `actions`; the Load (lb) menu is open,
// anchored under its kebab (bottom, end, 4px offset) and floating over the rows. Load sorts A to Z, so the table
// rows follow that choice. The scene shows two of the nine Output columns and two rows; the menu keeps only the Sort radios.
export default function HcsColumnMenuScene({ host }: ContextProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)', minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} sortable style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell data-ug-part="other-header" aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell data-ug-part="header-cell" aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}><IconButton name="ellipsis-vertical" aria-label="Load (lb) column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} /></span>}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body data-ug-part="rows">
          {MOCK_OUTPUT_ROWS_BY_LOAD.map((row) => (
            <Table.Row key={row.model}>
              <Table.Cell>{row.model}</Table.Cell>
              <Table.Cell>{row.load}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Popover open>
        <Popover.Portal container={host}>
          <Popover.Positioner anchor={anchor} side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Load (lb) column options"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }}
                />
              }
            >
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z (Smallest to Largest)</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A (Largest to Smallest)</Radio.Label></Radio>
                <Radio value="none" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>None</Radio.Label></Radio>
              </RadioGroup>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

### 2. Closeable sort menu (`pfd-column-menu`)

Apps: PFD

In context source: PFD: `src/pfd/ColumnMenu.tsx`

In context view: Shown.

#### In context structure additions

1. **Result rows** — The table body rows under the header; with Load sorted A to Z they follow the chosen order. Part marker: `data-ug-part="rows"`.
2. **Neighbouring header cell** — The Model header cell with its own kebab, shown beside the Load (lb) header that the open menu belongs to. Part marker: `data-ug-part="other-header"`.

#### In context layer steps

1. **Result rows** — The table body rows under the header; with Load sorted A to Z they follow the chosen order. Selector: `[data-ug-part="rows"]`.
2. **Neighbouring header cell** — The Model header cell with its own kebab, shown beside the Load (lb) header that the open menu belongs to. Selector: `[data-ug-part="other-header"]`.
3. **Trigger** — The ellipsis-vertical "Column options" icon button, an xs kebab with a compact square profile; in the table scenes the popover anchors to the Load (lb) kebab instead. Selector: `[data-base-ui-click-trigger]`.
4. **Results table** — The "Connector calculation results" table of the HCS and PFD scenes whose headers host the kebab. Selector: `[class~="aui-table"]`.
5. **Sortable header cell** — The Load (lb) header, sorted ascending, whose actions slot carries the kebab (vertical dots in HCS, horizontal in PFD). Selector: `[data-ug-part="header-cell"]`.
6. **Popup** — The 256px elevated column opened under the kebab, aligned to the cell end in HCS and the example and to its start in PFD. Selector: `[data-aui-popup-motion][role="dialog"]`.
7. **Close** — The PFD square Close button that starts the popup, end-aligned above the Sort choices. Selector: `[data-ug-part="close"]`.
8. **Sort group** — The RadioGroup labelled "Sort" that holds the ordering choices. Selector: `[class~="aui-radio-group"]`.
9. **Sort option** — A sort choice such as "Sort A to Z" or "Sort Z to A"; the table scenes add "(Smallest to Largest)" hints and a None option, selected options are solid primary. Selector: `[class~="aui-radio"]`.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-003/options/pfd-column-menu/example.tsx`

```tsx
import { IconButton, Popover, Radio, RadioGroup, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<IconButton name="ellipsis-vertical" aria-label="Column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Column options"
              render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }} />}
            >
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A</Radio.Label></Radio>
              </RadioGroup>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-003/options/pfd-column-menu/scene.tsx`

```tsx
import { useState } from 'react';
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Radio, RadioGroup, Table, View } from '../../../../../kit';
import { MOCK_OUTPUT_ROWS_BY_LOAD } from '../../../../../mock-data';

// PFD ColumnMenu (src/pfd/ColumnMenu.tsx): the trigger is the horizontal ellipsis and turns "secondary" while its column is sorted (a filter swaps in the filter glyph); the 256px menu opens
// under it, towards the next column (bottom, start, 4px offset), and starts with a Close Button at profile "square" at its end. The scene shows two columns, two rows and the Sort radios; the search fields are left out.
export default function PfdColumnMenuScene({ host }: ContextProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)', minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} sortable style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell data-ug-part="other-header" aui={{ color: 'raised' }} actions={<IconButton name="ellipsis" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell data-ug-part="header-cell" aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}><IconButton name="ellipsis" aria-label="Load (lb) column options" aui={{ color: 'secondary', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} /></span>}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body data-ug-part="rows">
          {MOCK_OUTPUT_ROWS_BY_LOAD.map((row) => (
            <Table.Row key={row.model}>
              <Table.Cell>{row.model}</Table.Cell>
              <Table.Cell>{row.load}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Popover open>
        <Popover.Portal container={host}>
          <Popover.Positioner anchor={anchor} side="bottom" align="start" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Load (lb) column options"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }}
                />
              }
            >
              <Button data-ug-part="close" aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
                <ContainedIcon name="xmark" />
              </Button>
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z (Smallest to Largest)</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A (Largest to Smallest)</Radio.Label></Radio>
                <Radio value="none" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>None</Radio.Label></Radio>
              </RadioGroup>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
