import { Field, Symbol, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '4' } }}>
        <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Fc perp</Field.Label>
          <Field.NumberField defaultValue={650} aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
            <Field.NumberFieldGroup aui={{ color: 'surface', paint: 'fixed' }}>
              <Field.NumberFieldInput aui={{ sx: { textAlign: 'end' } }} />
              <Field.NumberFieldUnit>
                <Symbol>psi</Symbol>
              </Field.NumberFieldUnit>
            </Field.NumberFieldGroup>
          </Field.NumberField>
        </View>
      </Field>
    </View>
  );
}
