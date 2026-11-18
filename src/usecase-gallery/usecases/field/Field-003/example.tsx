import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
      <Field.Control aui={{ scale: 'sm' }}>
        <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
      </Field.Control>
      <Field.Error match aui={{ color: 'error', scale: 'sm' }}>Enter a whole number from 1 to 999.</Field.Error>
    </Field>
  );
}
