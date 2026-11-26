# Button-040: Add result row button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-040/usecase.ts`

## What it is

A tonal plus IconButton, 28px square, adds one result row to a list.

## When to choose it

Use it when every row can be added on its own and the cell is too narrow for a label; use the labelled Button of Button-013 when one result is chosen elsewhere. Name it with a Tooltip and aria-label.

## Where it belongs

The first cell of each result row of a results table. Real site source: PBS src/ResultsSection.tsx (a plus IconButton that adds the row to the Connection List; the app replaces it with a selection radio in edit mode). ADM, PFD, HCS, HS, FD, AGPD, RWS and ADC have no row add icon.

## Usage guidance

Set aui color "secondary", paint "tonal", scale "sm" and shape "soft" on an IconButton with the plus glyph; the default square profile gives the 28px box. In context it sits in the centred first cell of one result row inside a top Tooltip (4px offset) reading Add to Connection List; the table keeps one row and one other column, and the tooltip is closed.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `IconButton`, `Table`, `Tooltip`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `text`, `tonal`
- `scale`: `sm`
- `shape`: `soft`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Add** — The tonal secondary soft plus button that adds the result row to the Connection List. Selector: `[class~="aui-button"][aria-label="Add to Connection List"]`.
2. **Plus icon** — The plus glyph centred in the button. Selector: `[class~="aui-button"][aria-label="Add to Connection List"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Tooltip** — PBS tooltip above the button that repeats the action as Add to Connection List. Selector: `[class~="aui-tooltip-popup"]`.
4. **Add cell** — The centred first cell of the Model A-100 row that holds the button. Selector: `[class~="aui-table-cell"]:first-child`.
5. **Add header** — The unlabeled column heading (aria-label Add) over the add buttons. Selector: `[class~="aui-table-header-cell"]:first-child`.

## Component layer steps

1. **Add** — Tonal secondary plus action adds the row to Connection List. Selector: `[class~="aui-button"][aria-label="Add to Connection List"]`.
2. **Plus icon** — Centered plus glyph identifies the Add to Connection List action. Selector: `[class~="aui-button"][aria-label="Add to Connection List"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Tooltip** — PBS tooltip repeats Add to Connection List above the action. Selector: `[class~="aui-tooltip-popup"]`.
4. **Add cell** — Centered Model A-100 cell contains the add action. Selector: `[class~="aui-table-cell"]:first-child`.
5. **Add header** — The unlabeled column heading (aria-label Add) over the add buttons. Selector: `[class~="aui-table-header-cell"]:first-child`.

## Apps

- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Row add icon (`pbs-row`)

Apps: PBS

In context source: PBS: `src/ResultsSection.tsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The Table of connection results; the add column comes first, then the Model column. Selector: `[class~="aui-table"]`.
2. **Model cell** — The Model A-100 label of the row that the plus button adds. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:last-child`.

#### In context layer steps

1. **Results table** — Connection results table starts with Add, then Model. Selector: `[class~="aui-table"]`.
2. **Model cell** — The Model A-100 label of the row that the plus button adds. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:last-child`.
3. **Add** — Tonal secondary plus action adds the row to Connection List. Selector: `[class~="aui-button"][aria-label="Add to Connection List"]`.
4. **Plus icon** — Centered plus glyph identifies the Add to Connection List action. Selector: `[class~="aui-button"][aria-label="Add to Connection List"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
5. **Tooltip** — PBS tooltip repeats Add to Connection List above the action. Selector: `[class~="aui-tooltip-popup"]`.
6. **Add cell** — Centered Model A-100 cell contains the add action. Selector: `[class~="aui-table-cell"]:first-child`.
7. **Add header** — The unlabeled column heading (aria-label Add) over the add buttons. Selector: `[class~="aui-table-header-cell"]:first-child`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-040/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="plus" aria-label="Add to Connection List" aui={{ color: 'secondary', paint: 'tonal', scale: 'sm', shape: 'soft' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-040/options/pbs-row/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Table, Tooltip, View } from '../../../../../kit';

// PBS results table (ResultsSection.tsx): the first cell of each result row is one tonal secondary plus IconButton that adds the row to the Connection List, labelled by a top Tooltip
// (the app replaces it with a selection radio in edit mode). The scene keeps one row and one other column; the tooltip is closed. This scene writes its own Button.
export default function PbsRowScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connection results" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Add" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'center' } }}>
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger render={<IconButton name="plus" aria-label="Add to Connection List" aui={{ color: 'secondary', paint: 'tonal', scale: 'sm', shape: 'soft' }} />} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={4}>
                      <Tooltip.Popup>Add to Connection List</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Table.Cell>
            <Table.Cell>Model A-100</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
