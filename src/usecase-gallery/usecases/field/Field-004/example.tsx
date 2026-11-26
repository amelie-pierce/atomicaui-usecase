import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" defaultValue="Plate" />
          <Field.Button aria-label="Clear search">
            <Field.ButtonIcon name="xmark" />
          </Field.Button>
        </Field.Control>
      </Field>
    </View>
  );
}
