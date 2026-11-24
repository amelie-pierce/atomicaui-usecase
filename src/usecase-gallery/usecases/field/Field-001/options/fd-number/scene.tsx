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
