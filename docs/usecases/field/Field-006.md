# Field-006: Description under a field

Component family: **Field**

UI type: **Field with description**

Source: `src/usecase-gallery/usecases/field/Field-006/usecase.ts`

## What it is

A line of help text under a field that explains the chosen value.

## When to choose it

Use it for a short, always visible explanation of the field, one line or two, that the user reads before changing the value. Use the error message of Field-003 for a failed value and a tooltip or help popover (Button-032) for longer help.

## Where it belongs

The input panel of FD, RWS and ACE: the note under a select (a standard, an anchor type) that says what the chosen option means. The three apps place it only under a select, so the scenes keep the closed trigger as the host; the select itself is Select-001.

## Usage guidance

Label above (FD, RWS): a Field at scale "sm" with a 3 gap holds a Field.Label, the control and a Field.Description under it; the description is 16px/20px text in the body colour, 3px below the control. FD states the 28px trigger height and the type; RWS leaves them to the scale and renders the same 28px trigger (padding 3px), a size difference only. Label beside (ACE): the Field is a column holding the label-and-control row (half each, as Field-001) and the Field.Description on its own line under the whole row, full width. The apps show the field enabled. The scenes leave out the open list, the help trigger and the other fields of the pane.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `fixed`, `text`
- `color`: `surface`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Stacked wrapper holding the "Anchor type" label, the select and the help line; in ACE it becomes a column with a label-and-select row above the note. Selector: `[class~="aui-field"]`.
2. **Label** — The "Anchor type" label that names the select; ACE puts it beside the trigger, taking half the row. Selector: `[class~="aui-field-label"]`.
3. **Select trigger** — The closed 28px select trigger, surface coloured, that shows the chosen Adhesive option; the open list is Select-001. Selector: `[class~="aui-select-trigger"]`.
4. **Value** — The text of the chosen option, "Adhesive". Selector: `[class~="aui-select-value"]`.
5. **Chevron** — The disclosure chevron at the end of the trigger. Selector: `[class~="aui-select-chevron"]`.
6. **Description** — The help line "Adhesive anchors need a cure time." under the control, 16/20 body-colour text, always visible. Selector: `[class~="aui-field-description"]`.

## Apps

- FD (`fd`)
- RWS (`rws`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Field description (`fd-description`)

Apps: FD, RWS

In context source: FD: `src/components/ui.jsx`; RWS: `src/rws/inputs.tsx`

Note: Label above; the description sits under the control.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-006/example.tsx`

```tsx
import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Anchor type</Field.Label>
        <Field.Select defaultValue="adhesive" items={[{ label: 'Adhesive', value: 'adhesive' }]}>
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
        </Field.Select>
        <Field.Description>Adhesive anchors need a cure time.</Field.Description>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-006/options/fd-description/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The field note of FD (src/components/ui.jsx SelectInput), the same note of RWS (src/rws/inputs.tsx SelectField): a label-above Field whose control is a Field.Select trigger (the closed trigger only; the select itself is Select-001) with a Field.Description under it, 3px below the trigger, in the body colour at 16px/20px.
// RWS leaves the trigger height and type to the scale and renders the same 28px trigger (padding 3px instead of 2px), a size difference only.
// Left out: the open list, the help trigger beside the label and the other fields of the pane; the apps show the field enabled.
export default function FdDescriptionScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Anchor type</Field.Label>
        <Field.Select defaultValue="adhesive" items={[{ label: 'Adhesive', value: 'adhesive' }]}>
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
        </Field.Select>
        <Field.Description>Adhesive anchors need a cure time.</Field.Description>
      </Field>
    </View>
  );
}
```

### 2. Field description — UI variant 2 (`ace-description`)

Apps: ACE

In context source: ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`

Note: Label beside; the description sits under the whole row.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-006/options/ace-description/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '3' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Anchor type</Field.Label>
          <Field.Select defaultValue="adhesive" items={[{ label: 'Adhesive', value: 'adhesive' }]}>
            <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
          </Field.Select>
        </View>
        <Field.Description>Adhesive anchors need a cure time.</Field.Description>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-006/options/ace-description/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The field note of ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the label-beside row of Field-001 (label and a closed Field.Select trigger sharing the row) with the Field.Description on its own line under the whole row, full width.
// Left out: the open list, the option check and the other fields of the panel; the app shows the field enabled.
export default function AceDescriptionScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '3' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Anchor type</Field.Label>
          <Field.Select defaultValue="adhesive" items={[{ label: 'Adhesive', value: 'adhesive' }]}>
            <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
          </Field.Select>
        </View>
        <Field.Description>Adhesive anchors need a cure time.</Field.Description>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
