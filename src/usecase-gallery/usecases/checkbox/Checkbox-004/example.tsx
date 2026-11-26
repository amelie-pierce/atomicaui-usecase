import { Checkbox, Type, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l3" weight="semi-bold">Object Visibility</Type>
      <Checkbox defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supporting Beam</Checkbox.Label>
      </Checkbox>
      <Checkbox defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supported Beam</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
