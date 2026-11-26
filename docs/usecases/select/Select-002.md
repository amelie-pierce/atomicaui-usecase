# Select-002: Column filter select

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-002/usecase.ts`

## What it is

The Search by option field of a table column menu: a select that filters the column to one of its known values.

## When to choose it

Use it in a table column menu to filter a column to one of its known values; use the text search field above it for free text. Use the field select (Select-001) for an input of a form.

## Where it belongs

The Search by option field of the column menu popover of the Output table in HCS, HS and PFD, under the Search by text field.

## Usage guidance

Column filter (HCS, HS): a Field at scale "sm" (gap 4, minWidth 0) with the label "Search by option" and a Field.Select whose trigger is color "surface", paint "fixed", shape "soft" and width fill, the same trigger as the field select; the Field.SelectPositioner is side "bottom", align "start", sideOffset 4 with alignItemWithTrigger off, so the list sits under the trigger, and the rows are bare Field.SelectItems (Select all first) with no indicator. Column filter (PFD): the same field with side "top", so the list opens above the trigger (measured 36px below the trigger against 92px above). Those scenes show the enabled state (HCS disables the field with fewer than two options, HS with none) and leave out the column menu Popover, the sort buttons and the text search field.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `shape`: `soft`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Field at scale "sm" with a 4 gap and zero minimum width so the filter can shrink inside the column menu. Selector: `[class~="aui-field"]`.
2. **Label** — The "Search by option" label above the filter trigger. Selector: `[class~="aui-field-label"]`.
3. **Trigger** — Full-width outlined trigger with the "soft" shape and no height override, so it takes the scale default. Selector: `[class~="aui-select-trigger"]`.
4. **Value** — Shows the current filter value, "Select all" by default. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
5. **Chevron** — The chevron that tells the user the trigger opens a list of column values. Selector: `[class~="aui-select-chevron"]`.
6. **Popup** — Popup that opens below the trigger, aligned to its start with alignItemWithTrigger off, at the trigger width. Selector: `[class~="aui-select-popup"]`.
7. **List** — The list holding the Select all, Passed and Failed rows. Selector: `[class~="aui-select-list"]`.
8. **Item** — A filter row whose label is written straight into the item; "Select all" clears the column filter. Selector: `[class~="aui-select-item"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PFD (`pfd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Column filter (`hcs-column-filter`)

Apps: HCS, HS

In context source: HCS: `src/components/ColumnMenu.tsx`; HS: `src/hs/ColumnMenu.tsx`

Note: The list opens below the trigger.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-002/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
      <Field.Label>Search by option</Field.Label>
      <Field.Select
        defaultValue="all"
        items={[
          { label: 'Select all', value: 'all' },
          { label: 'Passed', value: 'passed' },
          { label: 'Failed', value: 'failed' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" align="start" sideOffset={4} alignItemWithTrigger={false}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="all">Select all</Field.SelectItem>
                <Field.SelectItem value="passed">Passed</Field.SelectItem>
                <Field.SelectItem value="failed">Failed</Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-002/options/hcs-column-filter/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Search by option field of the column menu of HCS (src/components/ColumnMenu.tsx), the same field of HS (src/hs/ColumnMenu.tsx): a Field with the label above a full-width outlined trigger with the soft shape,
// and a popup that opens below it, aligned to the trigger start (alignItemWithTrigger off). Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the Popover that holds the column menu, the sort buttons and the text search field above; the app disables the field with fewer than two options (HCS) or none (HS), the scene shows it enabled.
export default function HcsColumnFilterScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
        <Field.Label>Search by option</Field.Label>
        <Field.Select open
          defaultValue="all"
          items={[
            { label: 'Select all', value: 'all' },
            { label: 'Passed', value: 'passed' },
            { label: 'Failed', value: 'failed' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" align="start" sideOffset={4} alignItemWithTrigger={false} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="all">Select all</Field.SelectItem>
                  <Field.SelectItem value="passed">Passed</Field.SelectItem>
                  <Field.SelectItem value="failed">Failed</Field.SelectItem>
                </Field.SelectList>
              </Field.SelectPopup>
            </Field.SelectPositioner>
          </Field.SelectPortal>
        </Field.Select>
      </Field>
    </View>
  );
}
```

### 2. Column filter — UI variant 2 (`pfd-column-filter`)

Apps: PFD

In context source: PFD: `src/pfd/ColumnMenu.tsx`

Note: The list opens above the trigger.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-002/options/pfd-column-filter/example.tsx`

```tsx
import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
      <Field.Label>Search by option</Field.Label>
      <Field.Select
        defaultValue="all"
        items={[
          { label: 'Select all', value: 'all' },
          { label: 'Passed', value: 'passed' },
          { label: 'Failed', value: 'failed' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" align="start" sideOffset={4} alignItemWithTrigger={false}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="all">Select all</Field.SelectItem>
                <Field.SelectItem value="passed">Passed</Field.SelectItem>
                <Field.SelectItem value="failed">Failed</Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-002/options/pfd-column-filter/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Search by option field of the column menu of PFD (src/pfd/ColumnMenu.tsx): the same field, but the popup opens upward (side "top"), as the Blueprint list does. Built open and non-modal
// (container={host}, positioner ug-anchored). Left out: the Popover that holds the column menu, the sort buttons and the text search field above.
export default function PfdColumnFilterScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
        <Field.Label>Search by option</Field.Label>
        <Field.Select open
          defaultValue="all"
          items={[
            { label: 'Select all', value: 'all' },
            { label: 'Passed', value: 'passed' },
            { label: 'Failed', value: 'failed' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="top" align="start" sideOffset={4} alignItemWithTrigger={false} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="all">Select all</Field.SelectItem>
                  <Field.SelectItem value="passed">Passed</Field.SelectItem>
                  <Field.SelectItem value="failed">Failed</Field.SelectItem>
                </Field.SelectList>
              </Field.SelectPopup>
            </Field.SelectPositioner>
          </Field.SelectPortal>
        </Field.Select>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
