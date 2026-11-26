# Button-026: Edit and Delete row link buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-026/usecase.ts`

## What it is

Text Buttons with no padding read as links; stacked in a column they give a table row its few actions while the table stays light.

## When to choose it

Use it for row actions in a table that must stay light and where the actions are few; for two often-used actions prefer the tonal pair of Button-025. Unlike the inline link of Button-004 it keeps the secondary color and no underline.

## Where it belongs

The first cell of each row of a saved-list table. Real site source: ACE src/features/calculation/ui/CalculationOutput.tsx (Edit and Delete as stacked link-like Buttons in the first cell of the Job tally). The other apps have no link-like row Buttons.

## Usage guidance

Set aui color "secondary", paint "text", scale "sm" and profile "no-padding". In context the Buttons are stacked in a column and start-aligned in the first cell of a Job tally row; ACE hides Edit on the selected row and Delete while only one job exists. The other columns and the totals row are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`
- `color`: `raised`, `secondary`
- `scale`: `sm`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Link stack** — The no-padding column, start-aligned, that stacks Edit above Delete so the row keeps its light, text-like look. Selector: `[data-ug-part="link-stack"]`.
2. **Edit** — Secondary text Edit with profile no-padding, so it reads as a link rather than a button. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
3. **Delete** — Secondary text Delete, styled like Edit; it is not tinted as destructive. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
4. **Actions cell** — ACE Job tally: the left-aligned first cell of the row that holds the stacked links next to the Job 1 value. Selector: `[class~="aui-table-cell"]:first-child`.
5. **Actions header** — The unlabeled Actions column heading (raised) above the links. Selector: `[class~="aui-table-header-cell"]:first-child`.

## Component layer steps

1. **Link stack** — No-padding column stacks Edit above Delete at the start. Selector: `[data-ug-part="link-stack"]`.
2. **Edit** — No-padding secondary Edit reads like a text link. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
3. **Delete** — Secondary text Delete, styled like Edit; it is not tinted as destructive. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
4. **Actions cell** — ACE Job tally cell places both links beside Job 1. Selector: `[class~="aui-table-cell"]:first-child`.
5. **Actions header** — The unlabeled Actions column heading (raised) above the links. Selector: `[class~="aui-table-header-cell"]:first-child`.

## Apps

- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Edit and Delete links (`ace-links`)

Apps: ACE

In context source: ACE: `src/features/calculation/ui/CalculationOutput.tsx`

In context view: Shown.

#### In context structure additions

1. **Job tally table** — The Table of jobs; the Edit and Delete links live in its first column next to the Job column. Selector: `[class~="aui-table"]`.
2. **Job cell** — The Job 1 label in the row beside the link cell. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:last-child`.

#### In context layer steps

1. **Job tally table** — Jobs table puts Edit and Delete links beside the Job column. Selector: `[class~="aui-table"]`.
2. **Job cell** — The Job 1 label in the row beside the link cell. Selector: `[class~="aui-table-body"] [class~="aui-table-cell"]:last-child`.
3. **Link stack** — No-padding column stacks Edit above Delete at the start. Selector: `[data-ug-part="link-stack"]`.
4. **Edit** — No-padding secondary Edit reads like a text link. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
5. **Delete** — Secondary text Delete, styled like Edit; it is not tinted as destructive. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
6. **Actions cell** — ACE Job tally cell places both links beside Job 1. Selector: `[class~="aui-table-cell"]:first-child`.
7. **Actions header** — The unlabeled Actions column heading (raised) above the links. Selector: `[class~="aui-table-header-cell"]:first-child`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-026/example.tsx`

```tsx
import { Button, View } from '../../../kit';

export default function Example() {
  return (
    <View data-ug-part="link-stack" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start' } }}>
      <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Edit</Button>
      <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Delete</Button>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-026/options/ace-links/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Table, View } from '../../../../../kit';

// ACE Job tally (CalculationOutput.tsx): the first cell of each job row stacks Edit and Delete in a column, start-aligned. Both are secondary text sm Buttons with profile
// no-padding, so they read as links. The app hides Edit on the selected row and Delete while only one job exists. This scene writes its own Buttons; the other columns and the totals row are left out.
export default function AceLinksScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Job tally" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }} aria-label="Actions" />
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ sx: { textAlign: 'left' } }}>
              <View data-ug-part="link-stack" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start' } }}>
                <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Edit</Button>
                <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Delete</Button>
              </View>
            </Table.Cell>
            <Table.Cell>Job 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
