import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Textarea rows={5} />
      </Field>
    </View>
  );
}
