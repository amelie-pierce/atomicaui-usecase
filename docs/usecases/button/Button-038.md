# Button-038: Remove row button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-038/usecase.ts`

## What it is

A square transparent trash IconButton, 28px, removes a row from a saved list after a confirmation.

## When to choose it

Use it for the destructive action of a row; name the button with the row id in its aria-label (Remove <job> or <connection>).

## Where it belongs

The last cell of a saved-list row: the Job List of HS and the Connection List of PBS. Real site source: HS src/hs/OutputPane.tsx and PBS src/ResultsSection.tsx. The app opens a confirm dialog from it (AlertDialog-004).

## Usage guidance

One trash IconButton, aui color "secondary", paint "text", scale "sm" and the default square profile. The other columns are left out. One group, HS and PBS.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `IconButton`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `text`
- `scale`: `sm`
- `profile`: `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Remove** — The 28px square transparent secondary trash button in the last cell of a row; the HS scene names it Remove Job 1 and the confirmation follows the click. Selector: `[class~="aui-button"][aria-label^="Remove"]`. Layer step: **Remove** — 28px trash button removes Job 1 and opens confirmation.
2. **Trash icon** — The trash glyph centred in the button. Selector: `[class~="aui-button"][aria-label^="Remove"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`. Layer step: **Trash icon** — Trash glyph appears at the end of the job row. Code target: `IconButton`.
3. **Remove cell** — The last cell of the Job 1 row that holds the trash button next to the job name. Selector: `[class~="aui-table-cell"]:last-child`. Layer step: **Remove cell** — Last cell holds the trash action for the Job 1 row.
4. **Remove header** — The unlabeled column heading (aria-label Remove) above the trash buttons. Selector: `[class~="aui-table-header-cell"]:last-child`. Layer step: **Remove header** — The unlabeled column heading (aria-label Remove) above the trash buttons.

## Apps

- HS (`hs`)
- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Remove (`hs-remove`)

Apps: HS, PBS

In context source: HS: `src/hs/OutputPane.tsx`; PBS: `src/ResultsSection.tsx`

In context view: Shown.

#### In context structure additions

1. **Jobs table** — The Table of jobs; the trash button sits in its last column after the Job column. Selector: `[class~="aui-table"]`.
2. **Job cell** — The Job 1 label that the Remove Job 1 button belongs to. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:first-child`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-038/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="trash" aria-label="Remove row" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-038/options/hs-remove/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Table, View } from '../../../../../kit';

// HS Job List (OutputPane.tsx) and PBS Connection List (ResultsSection.tsx): the last cell of each row is one trash IconButton, secondary text sm, named by an aria-label that
// carries the row id (HS: Delete <job>, PBS: Remove <connection>). The app opens a confirm dialog from it. This scene writes its own Button; the other columns are left out.
export default function HsRemoveScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Jobs" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Remove" />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Job 1</Table.Cell>
            <Table.Cell>
              <IconButton name="trash" aria-label="Remove Job 1" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
