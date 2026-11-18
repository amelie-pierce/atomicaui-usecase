import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

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
