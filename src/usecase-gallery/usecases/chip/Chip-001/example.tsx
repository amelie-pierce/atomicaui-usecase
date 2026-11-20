import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip aui={{ scale: 'sm', color: 'success', paint: 'solid' }}>
      <Chip.Label>FEATURE</Chip.Label>
    </Chip>
  );
}
