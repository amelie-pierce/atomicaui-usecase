# Select-003: Multiple select

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-003/usecase.ts`

## What it is

The field select with the `multiple` prop: the trigger lists every chosen option and the list stays open while rows are toggled.

## When to choose it

Use it when the user may keep more than one option of a short fixed list. Use the single field select (Select-001) for one value.

## Where it belongs

The input panel where one design input takes several values at once: the Corrosion Resistance field of PBS and PFD, and any FD Choice written with `multiple`.

## Usage guidance

Plain rows (PBS, FD): the label above a Field.Select with `multiple` and an array value; the 28px outlined trigger (surface, fixed, width fill) holds a Field.SelectValue whose children are the chosen labels joined with a comma, and a chevron. Each row is a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator, the chosen rows shown by their raised fill. Checkbox rows (PFD): same trigger and joined text, but each row leads with a ContainedIcon (square-check when chosen, square when not) and has no indicator. The scenes show the enabled state (PFD shows Not Applicable when disabled) and leave out the help trigger, the app's "All" rule and the other fields.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `ContainedIcon`, `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Field** — Field at scale "sm" with a 3 gap that stacks the Corrosion Resistance label above the multi-select. Selector: `[class~="aui-field"]`. Layer step: **Field** — Small field stacks Corrosion Resistance above the multi-select.
2. **Label** — The "Corrosion Resistance" label at scale "sm". Selector: `[class~="aui-field-label"]`. Layer step: **Label** — Small Corrosion Resistance label appears above the multi-select.
3. **Trigger** — The 28px outlined trigger that stays one line high while it lists every chosen option. Selector: `[class~="aui-select-trigger"]`. Layer step: **Trigger** — 28px outlined trigger stays one line for chosen options.
4. **Value** — Written out as "Standard, Hot dip galvanized": with `multiple` the value is a comma-joined string of the chosen labels. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
5. **Chevron** — The chevron at the trigger end; the list stays open while rows are toggled. Selector: `[class~="aui-select-chevron"]`. Layer step: **Chevron** — Trailing chevron opens a list that stays open during selection.
6. **Popup** — Popup of the trigger width listing Standard, Hot dip galvanized and Stainless steel. Selector: `[class~="aui-select-popup"]`. Layer step: **Popup** — Popup lists Standard, Hot dip galvanized, and Stainless steel.
7. **List** — The list holding the three corrosion options. Selector: `[class~="aui-select-list"]`. Layer step: **List** — Popup list holds the three corrosion resistance choices.
8. **Item** — A toggleable option row; both Standard and Hot dip galvanized start selected (the `multiple` defaultValue is an array). Selector: `[class~="aui-select-item"]`. Layer step: **Item** — Standard and Hot dip galvanized start selected in the multi-select.
9. **Item text** — The option name such as "Stainless steel". Selector: `[class~="aui-select-item-text"]`. Layer step: **Item text** — Option name appears beside its control, such as Stainless steel.
10. **Indicator** — The indicator slot at the row end; the PFD scene leads each row with a checkbox icon instead. Selector: `[class~="aui-select-item-indicator"]`. Layer step: **Indicator** — End slot marks selection; PFD uses leading checkbox icons instead.
11. **Checkbox icon** — In the PFD scene each row leads with a square-check icon when chosen and a square when not, with no indicator. Selector: `[class~="aui-select-item"] > [class~="aui-contained-icon"]`. Layer step: **Checkbox icon** — PFD leads each row with a checked or empty square icon.

## Apps

- PBS (`pbs`)
- FD (`fd`)
- PFD (`pfd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Multiple select (`pbs-multi-select`)

Apps: PBS, FD

In context source: PBS: `src/InputFields.tsx`; FD: `src/components/ui.jsx`

Note: Plain rows: chosen rows show by their raised fill.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-003/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>
      <Field.Select
        multiple
        defaultValue={['standard', 'galvanized']}
        items={[
          { label: 'Standard', value: 'standard' },
          { label: 'Hot dip galvanized', value: 'galvanized' },
          { label: 'Stainless steel', value: 'stainless' },
        ]}
      >
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
          <Field.SelectValue>Standard, Hot dip galvanized</Field.SelectValue>
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="standard">
                  <Field.SelectItemText>Standard</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="galvanized">
                  <Field.SelectItemText>Hot dip galvanized</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="stainless">
                  <Field.SelectItemText>Stainless steel</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-003/options/pbs-multi-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Corrosion Resistance field of PBS (src/InputFields.tsx MultiSelectField), the same multiple Field.Select of FD (src/components/ui.jsx Choice with multiple): the label above a 28px outlined trigger that shows the
// chosen options joined with a comma; every row has an empty indicator, and a chosen row shows by its raised fill. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the help popover beside the label and the other fields of the pane.
export default function PbsMultiSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>
        <Field.Select open
          multiple
          defaultValue={['standard', 'galvanized']}
          items={[
            { label: 'Standard', value: 'standard' },
            { label: 'Hot dip galvanized', value: 'galvanized' },
            { label: 'Stainless steel', value: 'stainless' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue>Standard, Hot dip galvanized</Field.SelectValue>
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="standard">
                    <Field.SelectItemText>Standard</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="galvanized">
                    <Field.SelectItemText>Hot dip galvanized</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="stainless">
                    <Field.SelectItemText>Stainless steel</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
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

### 2. Checkbox row select (`pfd-multi-select`)

Apps: PFD

In context source: PFD: `src/pfd/fields.tsx`

Note: Checkbox rows: each row leads with a checked or empty square.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-003/options/pfd-multi-select/example.tsx`

```tsx
import { ContainedIcon, Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>
      <Field.Select
        multiple
        defaultValue={['standard', 'galvanized']}
        items={[
          { label: 'Standard', value: 'standard' },
          { label: 'Hot dip galvanized', value: 'galvanized' },
          { label: 'Stainless steel', value: 'stainless' },
        ]}
      >
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
          <Field.SelectValue>Standard, Hot dip galvanized</Field.SelectValue>
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="standard">
                  <ContainedIcon name="square-check" aria-hidden />
                  <Field.SelectItemText>Standard</Field.SelectItemText>
                </Field.SelectItem>
                <Field.SelectItem value="galvanized">
                  <ContainedIcon name="square-check" aria-hidden />
                  <Field.SelectItemText>Hot dip galvanized</Field.SelectItemText>
                </Field.SelectItem>
                <Field.SelectItem value="stainless">
                  <ContainedIcon name="square" aria-hidden />
                  <Field.SelectItemText>Stainless steel</Field.SelectItemText>
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-003/options/pfd-multi-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { ContainedIcon, Field, View } from '../../../../../kit';

// The multi select of PFD (src/pfd/fields.tsx MultiSelectField): the same label above a 28px outlined trigger with the chosen options joined with a comma, but each row leads with a checkbox icon
// (square-check when chosen, square when not) and has no indicator. Built open and non-modal (container={host}, positioner ug-anchored); the app keeps the list open after a click.
// Left out: the help trigger beside the label, the "All" rule of the app and the other fields of the pane; the app shows Not Applicable when disabled, the scene shows it enabled.
export default function PfdMultiSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>
        <Field.Select open
          multiple
          defaultValue={['standard', 'galvanized']}
          items={[
            { label: 'Standard', value: 'standard' },
            { label: 'Hot dip galvanized', value: 'galvanized' },
            { label: 'Stainless steel', value: 'stainless' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue>Standard, Hot dip galvanized</Field.SelectValue>
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="standard">
                    <ContainedIcon name="square-check" aria-hidden />
                    <Field.SelectItemText>Standard</Field.SelectItemText>
                  </Field.SelectItem>
                  <Field.SelectItem value="galvanized">
                    <ContainedIcon name="square-check" aria-hidden />
                    <Field.SelectItemText>Hot dip galvanized</Field.SelectItemText>
                  </Field.SelectItem>
                  <Field.SelectItem value="stainless">
                    <ContainedIcon name="square" aria-hidden />
                    <Field.SelectItemText>Stainless steel</Field.SelectItemText>
                  </Field.SelectItem>
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
