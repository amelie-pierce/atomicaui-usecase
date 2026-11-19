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
      <Checkbox.Label aui={{ scale: 'sm' }}>Same inputs as Left Hip</Checkbox.Label>
    </Checkbox>
  );
}
