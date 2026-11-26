import { Checkbox, Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', width: 'fill', gap: '8' } }}>
        <Field.Label>Center to joint</Field.Label>
        <Checkbox aria-label="Center to joint" defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
      </Field>
    </View>
  );
}
