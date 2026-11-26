import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'center', gap: '8', flexWrap: 'wrap', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>Name</Field.Label>
        <Field.Control aui={{ color: 'error', sx: { flex: 'fill', minWidth: '0' } }}>
          <Field.Input required defaultValue="" />
        </Field.Control>
        <Field.Error match role="alert" aui={{ scale: 'sm', color: 'error', sx: { flexBasis: 'full', textAlign: 'end' } }}>Name is required.</Field.Error>
      </Field>
    </View>
  );
}
