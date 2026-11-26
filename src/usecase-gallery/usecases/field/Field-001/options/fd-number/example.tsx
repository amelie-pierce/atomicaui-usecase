import { Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.NumberField defaultValue={650}>
          <Field.NumberFieldGroup>
            <Field.NumberFieldInput aui={{ sx: { textAlign: 'end' } }} />
            <Field.NumberFieldUnit>
              <Type as="span" family="mono">psi</Type>
            </Field.NumberFieldUnit>
          </Field.NumberFieldGroup>
        </Field.NumberField>
      </Field>
    </View>
  );
}
