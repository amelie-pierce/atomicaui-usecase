# Button-025: Edit and Duplicate row buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-025/usecase.ts`

## What it is

Two tonal labelled Buttons in the first cell of a saved-list row edit or duplicate that row.

## When to choose it

Use labelled tonal Buttons where a row has two actions people reach for often. Keep the destructive one apart as an icon button (Button-038, Remove) and name icon-only buttons with an aria-label that carries the row id.

## Where it belongs

The first cell of a list of saved results (the Job List of HS, the Connection List of PBS). Real site source: HS src/hs/OutputPane.tsx (Edit and Duplicate side by side in the first cell); PBS src/ResultsSection.tsx (the same pair stacked in the first cell). The other apps have no per-row Buttons in a saved list.

## Usage guidance

The example is the Edit and Duplicate pair: aui color "secondary", paint "tonal", scale "sm". The preview shows the radio group of the places, one for HS and one for PBS. Edit and Duplicate: HS (the two Buttons side by side in a left-aligned first cell); PBS (the same Buttons stacked in a column, gap 8, centred in a centred cell). Left out: every other column, the trash button, the totals row, the editing banner and the confirm dialogs.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `text`, `tonal`
- `scale`: `sm`
- `profile`: `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **First cell** — The first cell of a saved-list row: HS lays Edit and Duplicate side by side, left-aligned, while PBS stacks them in a centred column. Selector: `[class~="aui-table-cell"]:first-child`.
2. **Edit** — The tonal secondary Edit that reopens the saved job (HS) or connection (PBS) for changes. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
3. **Duplicate** — The tonal secondary Duplicate that copies the row; same colour and size as Edit so the two read as a pair of equal row actions. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
4. **Header cell** — The unlabeled first column heading (aria-label "Edit or duplicate") above the action buttons. Selector: `[class~="aui-table-header-cell"]:first-child`.
5. **Button stack** — PBS only: the column (gap 8, centred) that stacks Edit above Duplicate inside the cell. Selector: `[data-ug-part="row-actions"]`.

## Apps

- HS (`hs`)
- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Edit and Duplicate (`hs-edit`)

Apps: HS

In context source: HS: `src/hs/OutputPane.tsx`

In context view: Shown.

#### In context structure additions

1. **Job List table** — The Table that lists the saved rows; only the first action column and the Job column are kept. Selector: `[class~="aui-table"]`.
2. **Job cell** — The row label (Job 1) beside the action cell. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:last-child`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-025/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Edit</Button>
      <Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Duplicate</Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-025/options/hs-edit/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// HS Job List (OutputPane.tsx): the first cell of each job row holds Edit and Duplicate, two tonal secondary sm Buttons side by side (the cell's own text flow, no stack), left-aligned
// (outputFirstCellAui). The Job, Model, quantity and fastener columns, the trash column and the totals row are left out.
export default function HsEditScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Job List" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Edit or duplicate" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>
              {children}
            </Table.Cell>
            <Table.Cell>Job 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 2. Edit and Duplicate — UI variant 2 (`pbs-edit`)

Apps: PBS

In context source: PBS: `src/ResultsSection.tsx`

In context view: Shown.

#### In context structure additions

1. **Connection List table** — The Table that lists the saved rows; only the first action column and the Connection column are kept. Selector: `[class~="aui-table"]`.
2. **Connection cell** — The row label (Connection 1) beside the action cell. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:last-child`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-025/options/pbs-edit/example.tsx`

```tsx
import { Button, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center' } }}>
      <Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Edit</Button>
      <Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Duplicate</Button>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-025/options/pbs-edit/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// PBS Connection List (ResultsSection.tsx): the first cell of each row stacks Edit above Duplicate (a column, gap 8, centred), the same tonal secondary sm Buttons as HS.
// The Connection, Models and Quantity columns, the remove column and the editing banner are left out.
export default function PbsEditScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connection List" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Edit or duplicate" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Connection</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'center' } }}>
              <View data-ug-part="row-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center' } }}>
                {children}
              </View>
            </Table.Cell>
            <Table.Cell aui={{ sx: { textAlign: 'start' } }}>Connection 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
