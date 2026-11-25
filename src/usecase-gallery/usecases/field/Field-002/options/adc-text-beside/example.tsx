import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Connection ID</Field.Label>
      <Field.Control aui={{ scale: 'sm' }}>
        <Field.Input defaultValue="C-1042" aria-label="Connection ID" />
      </Field.Control>
    </Field>
  );
}
