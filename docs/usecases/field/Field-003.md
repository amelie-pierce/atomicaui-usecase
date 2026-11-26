# Field-003: Field with error

Component family: **Field**

UI type: **Single-line field**

Source: `src/usecase-gallery/usecases/field/Field-003/usecase.ts`

## What it is

The message under a field whose value failed validation, in the error colour.

## When to choose it

Use it under the control of the field that failed, one message per field, so the user reads which value to fix beside the value itself. Set the Field to invalid and give the Field.Error `match`; give the message the error colour, because Field.Error has no colour of its own. Add the red outline only where the app does (RWS, ADC).

## Where it belongs

The input panel and the dialog forms of all ten apps: a number out of range, a required name, a duplicate template name, an invalid email.

## Usage guidance

Error text (HS, PBS, PFD, FD, AGPD, ADM, ACE): the Field has `invalid` and a Field.Error with `match`, color "error" and scale "sm" sits under the Field.Control; the control keeps its slate outline and the message is 16px/20px text in the error colour (rgb 231, 80, 76), 3px below the control. 14px text (HCS): the same Field, but the message is set by the app's CSS class (error colour, 14px type, 20px line), written as aui props in the scene. Red outline (RWS): as the first group, plus the control outline in the error colour (borderColor "error" on the Field.Control). Label beside, red outline (ADC): the Field is the row of Field-002 with a Field.Control in color "error" and a Field.Error on its own line (flex-basis full) with the text at the end. The apps show the field enabled. The scenes leave out the unit, the help trigger, the required asterisk and the other fields of the form.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `text`
- `color`: `error`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — The field is marked invalid, which switches the label, control and message to the error state while the gap stays at 3. Selector: `[class~="aui-field"]`.
2. **Label** — The "Quantity" label that stays above the failed control; ADC puts it beside the control. Selector: `[class~="aui-field-label"]`.
3. **Control** — The outlined 28px control of the failed field; RWS and ADC redraw its outline in the error colour. Selector: `[class~="aui-field-control"]`.
4. **Input** — The input holding the rejected value 0, flagged with aria-invalid so assistive technology reads it as an error. Selector: `[class~="aui-field-control"] > [class~="aui-input"]`.
5. **Error** — The message "Enter a whole number from 1 to 999." in the error colour, 16/20 text 3px under the control (14px in HCS, on its own line in ADC). Selector: `[class~="aui-field-error"]`.

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

### 1. Field error (`hs-error`)

Apps: HS, PBS, PFD, FD, AGPD, ADM, ACE

In context source: HS: `src/hs/InputFields.tsx`; PBS: `src/InputFields.tsx`; PFD: `src/pfd/fields.tsx`; FD: `src/components/ui.jsx`; AGPD: `src/agpd/controls.tsx`; ADM: `src/features/design-inputs/components/shared/FieldNumberRow.tsx`; ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`

Note: The error text sits under the control in the error colour (16px).

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-003/example.tsx`

```tsx
import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match aui={{ color: 'error', scale: 'sm' }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-003/options/hs-error/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The invalid field of HS (src/hs/InputFields.tsx TextField), the same of PBS (src/InputFields.tsx), PFD (src/pfd/fields.tsx), FD (src/components/ui.jsx), AGPD (src/agpd/controls.tsx) and ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the Field is invalid and the control keeps its slate outline; a Field.Error with color "error" at scale "sm" sits under the control as 16px red text.
// The feedback and save-as-template dialogs of ACE, ADM, FD, HS, PFD, RWS and AGPD, and the ADM number row, write a Field.Error without the error colour and render the message in the body colour; that is the app-side defect left out of the scene.
// Left out: the label's help trigger, the required asterisk, the unit and the other fields of the form; the apps show the field enabled.
export default function HsErrorScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match aui={{ color: 'error', scale: 'sm' }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
```

### 2. Small error text (`hcs-error`)

Apps: HCS

In context source: HCS: `src/App.tsx`

Note: The error text is 14px.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-003/options/hcs-error/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match role="alert" aui={{ color: 'error', scale: 'sm', sx: { fontSize: '14', lineHeight: '20' } }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-003/options/hcs-error/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The invalid field of HCS (src/App.tsx NumberField): the same Field as the first group, with the message set by the app's CSS class (`.inputs .hcs-validation-error`: error colour, 14px type, 20px line) instead of the 16px error text. The scene states that CSS as aui props.
// Left out: the unit after the value, the label's other states and the other fields of the pane; the app shows the field enabled.
export default function HcsErrorScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match role="alert" aui={{ color: 'error', scale: 'sm', sx: { fontSize: '14', lineHeight: '20' } }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
```

### 3. Red outline error (`rws-error`)

Apps: RWS

In context source: RWS: `src/rws/inputs.tsx`

Note: The control outline is red as well as the text.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-003/options/rws-error/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm', sx: { minWidth: '0', borderColor: 'error' } }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match aui={{ color: 'error' }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-003/options/rws-error/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The invalid field of RWS (src/rws/inputs.tsx TextField and Control): like the first group, plus the control's outline set to the error colour (borderColor "error"); the message is the error colour at the field scale.
// Left out: the unit after the value, the help trigger and the other fields of the pane; the app shows the field enabled.
export default function RwsErrorScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm', sx: { minWidth: '0', borderColor: 'error' } }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match aui={{ color: 'error' }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
```

### 4. Inline red error (`adc-error`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

Note: Label beside, with a red control outline and the error on its own line.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-003/options/adc-error/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'center', gap: '8', flexWrap: 'wrap', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>Name</Field.Label>
        <Field.Control aui={{ color: 'error', sx: { flex: 'fill', minWidth: '0' } }}>
          <Field.Input required defaultValue="" />
        </Field.Control>
        <Field.Error match role="alert" aui={{ scale: 'sm', color: 'error', sx: { flexBasis: 'full', textAlign: 'end' } }}>Name is required.</Field.Error>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-003/options/adc-error/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The invalid Name row of ADC (src/adc/Workspace.tsx project info): the label beside the control as in Field-002, the control in the error colour (color "error") and the message on its own line, end-aligned under the control.
// Left out: the Quantity and Comment rows and the required asterisk; the app shows the field enabled.
export default function AdcErrorScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'center', gap: '8', flexWrap: 'wrap', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>Name</Field.Label>
        <Field.Control aui={{ color: 'error', sx: { flex: 'fill', minWidth: '0' } }}>
          <Field.Input required defaultValue="" />
        </Field.Control>
        <Field.Error match role="alert" aui={{ scale: 'sm', color: 'error', sx: { flexBasis: 'full', textAlign: 'end' } }}>Name is required.</Field.Error>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
