import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

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
