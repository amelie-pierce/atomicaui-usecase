import { Field, Symbol, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm', sx: { height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '8', paddingInlineEnd: '8', fontSize: '16', lineHeight: '20' } }} aria-label="Fc perp" defaultValue="650">
          <Symbol>psi</Symbol>
        </Field.Control>
      </Field>
    </View>
  );
}
