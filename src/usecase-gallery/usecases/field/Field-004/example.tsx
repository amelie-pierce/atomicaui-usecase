import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm' }}>
      <Field.Control>
        <Field.Icon name="magnifying-glass" />
        <Field.Input aria-label="Search Table" placeholder="Search Table" />
      </Field.Control>
    </Field>
  );
}
