import { Checkbox, Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">Object visibility</Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Fasteners" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Fasteners</Field.Label>
      </Field>
    </View>
  );
}
