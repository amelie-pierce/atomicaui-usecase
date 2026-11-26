import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Connection ID</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="C-1042" aria-label="Connection ID" />
        </Field.Control>
      </Field>
    </View>
  );
}
