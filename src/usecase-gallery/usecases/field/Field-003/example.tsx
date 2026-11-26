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
