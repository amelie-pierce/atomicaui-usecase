# Button-014: Add job button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-014/usecase.ts`

## What it is

A solid secondary Button with a plus icon appends an empty job entry under the Job tally table.

## When to choose it

Use it to append an empty entry to a list; it needs no selection (the add-the-chosen-result Button is Button-013).

## Where it belongs

Under the Job tally table of ACE, in a column with the table title, stretching across it. Real site source: ACE src/features/calculation/ui/CalculationOutput.tsx. No other app has this Button.

## Usage guidance

The same secondary solid recipe as Button-013 (color "secondary", paint "solid", scale "sm") with Button.Icon plus before the label. The Job and quantity columns, the row actions and the totals row are left out. One group, ACE only.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Table`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `solid`, `text`
- `scale`: `sm`
- `profile`: `default`
- `shape`: `none`, `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Container** — The Add job Button under the Job tally table: solid secondary, small, stretching across the ACE column. Selector: `[class~="aui-button"]`. Layer step: **Container** — Small solid secondary Add job spans the ACE column.
2. **Icon** — The plus glyph before the label, marked aria-hidden since the label already says what it does. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`. Layer step: **Icon** — Decorative plus glyph precedes the Add job label.
3. **Label** — The text "Add job" that appends an empty job entry. Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Apps

- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Add new entry (`ace-button`)

Apps: ACE

In context source: ACE: `src/features/calculation/ui/CalculationOutput.tsx`

In context view: Shown.

#### In context structure additions

1. **Job tally section** — The section that stacks the title, table and Add job button in a column. Part marker: `data-ug-part="tally-section"`. Layer step: **Job tally section** — Vertical section stacks heading, table, and Add job action.
2. **Section title** — The "Job tally" heading. Part marker: `data-ug-part="tally-title"`. Layer step: **Section title** — Job tally heading names the section above the table.
3. **Job tally table** — The table with a Job header and one "Job 1" row above the button. Part marker: `data-ug-part="tally-table"`. Layer step: **Job tally table** — Job table shows Job 1 above its Add job button.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-014/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm' }}>
      <Button.Icon name="plus" aria-hidden />
      Add job
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-014/options/ace-button/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Table, Type, View } from '../../../../../kit';

// ACE Job tally (CalculationOutput.tsx): a section (default profile, no shape) whose title, table and Add job Button stack in a column; the Button sits under the table and stretches
// across it, with the plus icon before the label. It is secondary solid like HS's, but placed below the table instead of in the toolbar. This scene writes its own Button. The Job and quantity columns, the row
// actions, the totals row and the other output sections are left out.
export default function AceButtonScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="tally-section"
      aria-labelledby="ug-job-tally-title"
      aui={{ scale: 'sm', profile: 'default', shape: 'none', paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Type data-ug-part="tally-title" id="ug-job-tally-title" as="h3" role="l4" weight="semi-bold">Job tally</Type>
      <Table data-ug-part="tally-table" aria-label="Job tally" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Job</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Job 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm' }}>
        <Button.Icon name="plus" aria-hidden />
        Add job
      </Button>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
