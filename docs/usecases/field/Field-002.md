# Field-002: Text field

Component family: **Field**

UI type: **Single-line field**

Source: `src/usecase-gallery/usecases/field/Field-002/usecase.ts`

## What it is

A labelled field with one outlined control for a line of text.

## When to choose it

Use it for a single line of free text, such as a name, an email or an ID, where the label stays visible above the control. Use the label beside only in a form whose rows run label then control (the ADC project info). Use Field-005 for several lines of text and Field-001 for a number with a unit.

## Where it belongs

All ten apps: the Send feedback form (name, email, subject), the save-as-template name, the HS and PBS connection ID of the input panel and the ADC project info of the project panel.

## Usage guidance

Label above (HCS, HS, PBS, PFD, FD, RWS, AGPD, ADM, ACE; ADC writes it beside, see the last group): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Control (scale "sm", 28px high) with one Field.Input; the control frame is a surface-coloured outlined row, 3/8 padding and a 4px radius. PBS, RWS, AGPD, PFD, ACE, ADM, FD and ADC write exactly this; HCS writes a bare Input in the Field and renders the same 28px frame. The dialog forms (ACE, ADM, FD, HS, PFD, RWS, AGPD) leave the gap at the default 6px, a spacing difference only. Label beside (ADC): the Field is a row (gap 8, wrapping) with a Field.Label 96px wide, end-aligned, holding a required asterisk in the error colour, and a Field.Control with color "surface" filling the rest of the row. The apps show the field enabled. The scenes leave out the required asterisk of the label above, the help trigger, the placeholder, the error line (Field-003) and the form and dialog around the field.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `text`
- `color`: `surface`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Stacked text field with a 3 gap that ties the Connection ID label to its single-line control; ADC lays it out as a wrapping row with a 96px label. Selector: `[class~="aui-field"]`.
2. **Label** — The "Connection ID" label above the control; in ADC it is a 96px end-aligned label with a required asterisk in the error colour. Selector: `[class~="aui-field-label"]`.
3. **Control** — The 28px surface-coloured outlined frame, 3/8 padding and a 4px radius, that wraps the text input. Selector: `[class~="aui-field-control"]`.
4. **Input** — The editable line of text, prefilled with C-1042 and named by its aria-label. Selector: `[class~="aui-field-control"] > [class~="aui-input"]`.

## Component layer steps

1. **Field** — Stacked text field with a 3 gap that ties the Connection ID label to its single-line control; ADC lays it out as a wrapping row with a 96px label. Selector: `[class~="aui-field"]`.
2. **Label** — The "Connection ID" label above the control; in ADC it is a 96px end-aligned label with a required asterisk in the error colour. Selector: `[class~="aui-field-label"]`.
3. **Control** — The 28px surface-coloured outlined frame, 3/8 padding and a 4px radius, that wraps the text input. Selector: `[class~="aui-field-control"]`.
4. **Input** — The editable line of text, prefilled with C-1042 and named by its aria-label. Selector: `[class~="aui-field-control"] > [class~="aui-input"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PBS (`pbs`)
- PFD (`pfd`)
- FD (`fd`)
- RWS (`rws`)
- AGPD (`agpd`)
- ADM (`adm`)
- ACE (`ace`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Text field (`hs-text`)

Apps: HCS, HS, PBS, PFD, FD, RWS, AGPD, ADM, ACE

In context source: HCS: `src/components/F01Experience.tsx`; HS: `src/hs/InputFields.tsx`; PBS: `src/InputFields.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; FD: `src/components/Feedback.jsx`; RWS: `src/rws/ShellDialogs.tsx`; AGPD: `src/agpd/ShellDialogs.tsx`; ADM: `src/features/top-navigation/components/FeedbackDialog.tsx`; ACE: `src/features/top-navigation/ui/FeedbackDialog.tsx`

Note: Label above.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-002/example.tsx`

```tsx
import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Connection ID</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="C-1042" aria-label="Connection ID" />
        </Field.Control>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-002/options/hs-text/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The text field of HS (src/hs/InputFields.tsx TextField), the same field of every other app: a Field with the label stacked over one 28px outlined control holding a Field.Input.
// PBS (src/InputFields.tsx), RWS, AGPD and PFD (their ShellDialogs.tsx feedback forms), ACE, ADM and FD (the feedback and save-as-template dialogs) and ADC (src/adc/components/ProjectInfoField.tsx) write the same Field.Control > Field.Input; HCS (src/components/F01Experience.tsx) writes a bare Input in the same Field and renders the same frame.
// The dialog forms leave the label-to-control gap at the default 6px and the input panels set 3px; a spacing difference only, so the scene keeps the 3px of the panels.
// Left out: the required asterisk, the help trigger beside the label, the placeholder, the error line (Field-003), the feedback form's other fields and the dialog around it; the apps show the field enabled.
export default function HsTextScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Connection ID</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="C-1042" aria-label="Connection ID" />
        </Field.Control>
      </Field>
    </View>
  );
}
```

### 2. Side label text field (`adc-text-beside`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

Note: Label beside: a 96px end-aligned label, the control fills the rest of the row.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-002/options/adc-text-beside/example.tsx`

```tsx
import { Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'center', gap: '8', flexWrap: 'wrap', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>
          Name
          <Type as="span" color="error">*</Type>
        </Field.Label>
        <Field.Control aui={{ color: 'surface', sx: { flex: 'fill', minWidth: '0' } }}>
          <Field.Input required defaultValue="Anchor 1" />
        </Field.Control>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-002/options/adc-text-beside/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// The Project info row of ADC (src/adc/Workspace.tsx, the Name and Quantity rows of the project panel): a Field row with a 96px end-aligned label, a required asterisk in the error colour, and the 28px outlined control filling the rest of the row.
// Left out: the error state and line (Field-003), the Quantity and Comment rows; the app shows the field enabled.
export default function AdcTextBesideScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'center', gap: '8', flexWrap: 'wrap', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>
          Name
          <Type as="span" color="error">*</Type>
        </Field.Label>
        <Field.Control aui={{ color: 'surface', sx: { flex: 'fill', minWidth: '0' } }}>
          <Field.Input required defaultValue="Anchor 1" />
        </Field.Control>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
