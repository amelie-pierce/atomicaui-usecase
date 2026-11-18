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
    <Checkbox aui={SELECTION}>
      <Checkbox.Label>Show passed validations</Checkbox.Label>
    </Checkbox>
  );
}
