import { Checkbox, Type, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', gap: '8', alignItems: 'center' } }}>
      <Type as="span" role="l4" weight="semi-bold">
        Object Visibility
      </Type>
      <Checkbox defaultSelected aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label>Wall</Checkbox.Label>
      </Checkbox>
      <Checkbox defaultSelected aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label>Roof</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
