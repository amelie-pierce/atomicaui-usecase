import { Checkbox } from '../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

export default function Example() {
  return (
    <Checkbox defaultSelected aui={SELECTION}>
      <Checkbox.Label aui={{ scale: 'sm' }}>Same inputs as Left Hip</Checkbox.Label>
    </Checkbox>
  );
}
