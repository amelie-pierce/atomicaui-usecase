import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm' }}>
      <Field.Label>Description</Field.Label>
      <Field.Textarea rows={5} resizable="vertical" />
    </Field>
  );
}
