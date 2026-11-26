# Button-035: Open column menu button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-035/usecase.ts`

## What it is

A small IconButton opens the menu of a table column header.

## When to choose it

Use it for a per-column menu where space is tight. It is smaller than the panel icon buttons and uses the surface color.

## Where it belongs

The header cell of each table column, beside the column title. Real site source: HCS (the actions slot of the results header in src/components/F01Results.tsx; the menu is src/components/ColumnMenu.tsx), HS (src/hs/ColumnMenu.tsx) and PFD (src/pfd/ColumnMenu.tsx).

## Usage guidance

HCS: set aui color "surface", paint "text", profile "square-compact", shape "soft" and scale "xs" with the ellipsis-vertical glyph, and pass it to Table.HeaderCell through the actions prop: the kit lays the header out as label then actions, so the kebab sits at the end of each cell. In context the menu is open under the Load (lb) kebab (bottom, end, 4px offset): a View card (surface, solid, soft, elevation 4, 256px) over the table with the Sort radios (Sort A to Z (Smallest to Largest), Sort Z to A (Largest to Smallest), None); Search by text and Search by option are left out. Load is sorted ascending, so its rows run from smallest to largest. The scene shows two of the nine Output columns and two rows. HS renders the same as HCS: its trigger takes color "secondary" while its column is sorted or filtered (the filter glyph while filtered), which computes to the same near-black text, no fill and the same hover as the HCS "surface" kebab, so HCS and HS are one group. PFD (own group): the horizontal ellipsis glyph, secondary while sorted, the menu opens under the trigger towards the next column (bottom, start) and starts with a Close Button (profile "square", scale "sm", secondary text, alignSelf end) above the Sort radios; Search by text and Search by option are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `ContainedIcon`, `IconButton`, `Popover`, `Radio`, `RadioGroup`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `primary`, `raised`, `secondary`, `surface`
- `paint`: `solid`, `text`
- `profile`: `default`, `no-padding`, `square`, `square-compact`
- `shape`: `soft`
- `scale`: `sm`, `xs`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Column options** — The xs square-compact transparent button that opens the column menu; HCS uses the ellipsis-vertical glyph and PFD the horizontal ellipsis. Selector: `[class~="aui-button"][aria-label*="column options" i]`.
2. **Icon** — The vertical or horizontal ellipsis glyph, centred in the button. Selector: `[class~="aui-button"][aria-label*="column options" i] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Column header** — The raised Model and Load (lb) headings; each takes its options button through the actions prop, and Load (lb) is sorted ascending. Selector: `[class~="aui-table-header-cell"]`.
4. **Column menu** — The 256px popover opened under the Load (lb) heading with a Sort radio group; PFD adds a Close button at its end. Selector: `[data-aui-popup-motion][role="dialog"]`.
5. **Sort option** — The three sort choices (A to Z, Z to A, None), with the ascending one selected in primary. Selector: `[class~="aui-radio"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PFD (`pfd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Column menu (`hcs-column-menu`)

Apps: HCS, HS

In context source: HCS: `src/components/ColumnMenu.tsx`; HS: `src/hs/ColumnMenu.tsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The sortable Connector calculation results Table with the Model and Load (lb) columns. Selector: `[class~="aui-table"]`.
2. **Result rows** — The two body rows, ordered by the ascending Load (lb) sort chosen in the menu. Selector: `[class~="aui-table-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-035/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="ellipsis-vertical"
      aria-label="Column options"
      aui={{
        color: 'surface',
        paint: 'text',
        profile: 'square-compact',
        shape: 'soft',
        scale: 'xs',
      }}
    />
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-035/options/hcs-column-menu/scene.tsx`

```tsx
import { useState } from 'react';
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, Radio, RadioGroup, Table, View } from '../../../../../kit';
import { MOCK_OUTPUT_ROWS_BY_LOAD } from '../../../../../mock-data';

// F01Results header + ColumnMenu (HS ColumnMenu renders the same; its kebab is color "secondary" while sorted, computed the same as "surface"): every header cell takes its kebab through `actions`; the Load (lb) menu is open,
// anchored under its kebab (bottom, end, 4px offset) and floating over the rows. Load sorts A to Z, so the table
// rows follow that choice. The scene shows two of the nine Output columns and two rows; the menu keeps only the Sort radios.
export default function HcsColumnMenuScene({ children, host }: ContextProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)', minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} sortable style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis-vertical" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}>{children}</span>}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
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

### 2. Column menu — UI variant 2 (`pfd-column-menu`)

Apps: PFD

In context source: PFD: `src/pfd/ColumnMenu.tsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The sortable Connector calculation results Table with the Model and Load (lb) columns. Selector: `[class~="aui-table"]`.
2. **Result rows** — The two body rows, ordered by the ascending Load (lb) sort chosen in the menu. Selector: `[class~="aui-table-body"]`.
3. **Menu close** — The Close button at the end of the menu popover, above the Sort radios. Selector: `[data-aui-popup-motion][role="dialog"] [class~="aui-button"][aria-label="Close"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-035/options/pfd-column-menu/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return (
    <IconButton
      name="ellipsis"
      aria-label="Column options"
      aui={{
        color: 'secondary',
        paint: 'text',
        profile: 'square-compact',
        shape: 'soft',
        scale: 'xs',
      }}
    />
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-035/options/pfd-column-menu/scene.tsx`

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
            <Table.HeaderCell aui={{ color: 'raised' }} actions={<IconButton name="ellipsis" aria-label="Model column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}><IconButton name="ellipsis" aria-label="Load (lb) column options" aui={{ color: 'secondary', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} /></span>}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
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
              <Button aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
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
