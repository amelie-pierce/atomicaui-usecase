import { Field, Type } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
      <Field.Control aui={{ scale: 'sm' }}>
        <Field.Input defaultValue="650" aria-label="Fc perp" inputMode="decimal" aui={{ sx: { textAlign: 'end' } }} />
        <Type as="span" role="l4" family="mono">psi</Type>
      </Field.Control>
    </Field>
  );
}
