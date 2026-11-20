import { Checkbox } from '../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label>Show passed validations</Checkbox.Label>
    </Checkbox>
  );
}
