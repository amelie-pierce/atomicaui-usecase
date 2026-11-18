import type { ContextProps } from '../../../../types';
import { Field, Type, View } from '../../../../kit';

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
