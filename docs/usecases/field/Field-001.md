# Field-001: Number field with unit

Component family: **Field**

UI type: **Single-line field**

Source: `src/usecase-gallery/usecases/field/Field-001/usecase.ts`

## What it is

A labelled field with one outlined control that holds a number and shows its unit after the value.

## When to choose it

Use it for a number the user types and reads in a fixed unit, where the unit must stay visible inside the control. Use the label above in a narrow stacked pane and the label beside where the rows of the pane run label then control (ADM, ADC, ACE). Use the Field.NumberField parts when the control needs number parsing, min and max or steppers; a plain Field.Control with a Field.Input only holds text.

## Where it belongs

The input panel of nine apps: every design input that takes a number with a unit (a stress, a length, an angle). PBS has a Quantity number box with no unit and shows it as a text control (Field-002).

## Usage guidance

Value left (HCS): a Field at scale "sm" with a 3 gap holds a Field.Label and one Field.Control (scale "sm", 28px high, 16/20 text, 3/8 padding) that is the input itself; the unit is a Symbol after the value. The value keeps the control's start alignment and the unit is a 16px regular mono Symbol. Bold unit (HS, PFD, RWS): the same Field with a Field.Control holding a Field.Input with textAlign "end" and the unit as a mono role "l4" text, rendered 14px weight 600 (PFD writes it as Symbol role "l4", RWS as Type l4 around a Symbol; both render the same). Regular unit (FD, AGPD): the value sits at the end in a Field.NumberField > Field.NumberFieldGroup > Field.NumberFieldInput (textAlign "end") with a Field.NumberFieldUnit holding a 16px regular mono unit (FD a Type with family "mono", AGPD a Symbol); no steppers. Label beside (ADM, ADC, ACE): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and the same outlined number control filling the other half (137px each in a 280px row), the value at the end and a 16px regular Symbol unit; ADM and ADC write a Field.NumberField, ACE a Field.Control with a Field.NumberFieldUnit and grows label and control by flex-grow (129 and 145px), a size difference only. The apps show the field enabled. The scenes leave out the help trigger and lock beside the label, the error line (Field-003), the ADC stepper button and the ADC row that wraps instead of splitting half and half.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `Symbol`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `fixed`, `text`
- `color`: `surface`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Stacked number field at scale "sm" with a 3 gap; in the label-beside apps (ADM, ADC, ACE) it becomes a row that splits 137px for the label and 137px for the control. Selector: `[class~="aui-field"]`.
2. **Label** — The "Fc perp" label above the control; the label-beside apps set it nowrap with an ellipsis and flex-basis half. Selector: `[class~="aui-field-label"]`.
3. **Control** — The 28px outlined control row with 3/8 padding that holds the value and the unit side by side. Selector: `[class~="aui-field-control"]`.
4. **Input** — The input showing 650, with inputMode "decimal" and the value aligned to the end so it sits next to the unit. Selector: `[class~="aui-field-control"] > [class~="aui-input"]`.
5. **Number field** — FD, AGPD, ADM and ADC wrap the value in a Field.NumberField group instead of a plain input, with no steppers, so the number is parsed and aligned at the end. Selector: `[class~="aui-number-field"]`.
6. **Unit** — The "psi" unit after the value, a mono role "l4" Type here; HS, PFD and RWS render it 14px semi-bold, FD and AGPD as a 16px regular mono unit. Selector: `[class~="aui-field-control"] > [data-aui-typeface], [class~="aui-number-field-unit"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PFD (`pfd`)
- RWS (`rws`)
- FD (`fd`)
- AGPD (`agpd`)
- ADM (`adm`)
- ADC (`adc`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Number field (`hcs-number`)

Apps: HCS

In context source: HCS: `src/App.tsx`

Note: Label above; the value starts at the control start and the unit follows it.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-001/example.tsx`

```tsx
import { Field, Symbol, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm', sx: { height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '8', paddingInlineEnd: '8', fontSize: '16', lineHeight: '20' } }} aria-label="Fc perp" defaultValue="650">
          <Symbol>psi</Symbol>
        </Field.Control>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-001/options/hcs-number/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Symbol, View } from '../../../../../kit';

// The Input pane number field of HCS (src/App.tsx NumberField): a Field with the label stacked over one 28px outlined control, the value at the start and the unit a Symbol after it.
// Built from the one Field.Control (the control is the input, as the app writes it); the value keeps the control's start alignment, the unit is a 16px regular mono Symbol.
// Left out: the error line under the control and the other fields of the pane; the apps show the field enabled.
export default function HcsNumberScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm', sx: { height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '8', paddingInlineEnd: '8', fontSize: '16', lineHeight: '20' } }} aria-label="Fc perp" defaultValue="650">
          <Symbol>psi</Symbol>
        </Field.Control>
      </Field>
    </View>
  );
}
```

### 2. Bold unit field (`hs-number`)

Apps: HS, PFD, RWS

In context source: HS: `src/hs/InputFields.tsx`; PFD: `src/pfd/fields.tsx`; RWS: `src/rws/inputs.tsx`

Note: Label above; the value is end-aligned with a bold unit.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-001/options/hs-number/example.tsx`

```tsx
import { Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="650" aria-label="Fc perp" inputMode="decimal" aui={{ sx: { textAlign: 'end' } }} />
          <Type as="span" role="l4" family="mono">psi</Type>
        </Field.Control>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-001/options/hs-number/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// The number input of HS (src/hs/InputFields.tsx), the same field of PFD (src/pfd/fields.tsx NumberInputField) and RWS (src/rws/inputs.tsx Control): a label-above Field holding a Field.Control with a Field.Input at the end and the unit after it as a mono role l4 text (rendered 14px, weight 600).
// PFD writes the unit as Symbol role l4 and RWS as Type l4 around a Symbol; both render the same 14px 600 mono unit, so they share this scene.
// Left out: the help trigger beside the label, the error line, the feet-and-inches and text variants of HS; the apps show the field enabled.
export default function HsNumberScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="650" aria-label="Fc perp" inputMode="decimal" aui={{ sx: { textAlign: 'end' } }} />
          <Type as="span" role="l4" family="mono">psi</Type>
        </Field.Control>
      </Field>
    </View>
  );
}
```

### 3. Plain unit field (`fd-number`)

Apps: FD, AGPD

In context source: FD: `src/components/ui.jsx`; AGPD: `src/agpd/controls.tsx`

Note: Label above; the value is end-aligned with a regular unit.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-001/options/fd-number/example.tsx`

```tsx
import { Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.NumberField defaultValue={650}>
          <Field.NumberFieldGroup>
            <Field.NumberFieldInput aui={{ sx: { textAlign: 'end' } }} />
            <Field.NumberFieldUnit>
              <Type as="span" family="mono">psi</Type>
            </Field.NumberFieldUnit>
          </Field.NumberFieldGroup>
        </Field.NumberField>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-001/options/fd-number/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// The number input of FD (src/components/ui.jsx NumberInput), the same field of AGPD (src/agpd/controls.tsx): a label-above Field holding Field.NumberField > Field.NumberFieldGroup with a Field.NumberFieldInput at the end and a Field.NumberFieldUnit after it (a 16px regular mono unit).
// FD writes the unit as Type family mono and AGPD as Symbol; both render the same 16px 400 mono unit. The scene leaves the steppers off, as both apps do.
// Left out: the error line, the help trigger and lock beside the label; the apps show the field enabled.
export default function FdNumberScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.NumberField defaultValue={650}>
          <Field.NumberFieldGroup>
            <Field.NumberFieldInput aui={{ sx: { textAlign: 'end' } }} />
            <Field.NumberFieldUnit>
              <Type as="span" family="mono">psi</Type>
            </Field.NumberFieldUnit>
          </Field.NumberFieldGroup>
        </Field.NumberField>
      </Field>
    </View>
  );
}
```

### 4. Side label field (`adm-number`)

Apps: ADM, ADC, ACE

In context source: ADM: `src/features/design-inputs/components/shared/FieldNumberRow.tsx`; ADC: `src/adc/components/NumberRow.tsx`; ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`

Note: Label beside: label and control share the row, half each.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-001/options/adm-number/example.tsx`

```tsx
import { Field, Symbol, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '4' } }}>
        <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Fc perp</Field.Label>
          <Field.NumberField defaultValue={650} aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
            <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
              <Field.NumberFieldInput aui={{ sx: { textAlign: 'end' } }} />
              <Field.NumberFieldUnit>
                <Symbol>psi</Symbol>
              </Field.NumberFieldUnit>
            </Field.NumberFieldGroup>
          </Field.NumberField>
        </View>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-001/options/adm-number/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Symbol, View } from '../../../../../kit';

// The label-beside number row of ADM (src/features/design-inputs/components/shared/FieldNumberRow.tsx), the same row of ADC (src/adc/components/NumberRow.tsx, split) and ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the label at the start and the 28px outlined number control sharing the row half and half (137px each in a 280px row), the value at the end and a 16px regular mono Symbol unit.
// ADM and ADC write Field.NumberField; ACE writes a Field.Control with a Field.Input and a Field.NumberFieldUnit and grows label and control by flex-grow (129 and 145px in the same row), a size difference only.
// Left out: the error line under the row, the ADC stepper button and the ADC non-split row; the apps show the field enabled.
export default function AdmNumberScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '4' } }}>
        <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Fc perp</Field.Label>
          <Field.NumberField defaultValue={650} aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
            <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
              <Field.NumberFieldInput aui={{ sx: { textAlign: 'end' } }} />
              <Field.NumberFieldUnit>
                <Symbol>psi</Symbol>
              </Field.NumberFieldUnit>
            </Field.NumberFieldGroup>
          </Field.NumberField>
        </View>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
