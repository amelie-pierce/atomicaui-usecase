import { Checkbox, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label aui={{ scale: 'sm' }}>Same inputs as Left Hip</Checkbox.Label>
    </Checkbox>
    </View>
  );
}
