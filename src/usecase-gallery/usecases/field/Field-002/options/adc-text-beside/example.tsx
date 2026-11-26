import { Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'center', gap: '8', flexWrap: 'wrap', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>
          Name
          <Type as="span" color="error">*</Type>
        </Field.Label>
        <Field.Control aui={{ color: 'surface', sx: { flex: 'fill', minWidth: '0' } }}>
          <Field.Input required defaultValue="Anchor 1" />
        </Field.Control>
      </Field>
    </View>
  );
}
