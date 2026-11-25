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
