import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip aui={{ color: 'secondary', paint: 'solid', scale: 'xs', shape: 'soft' }}>
      <Chip.Label>BETA</Chip.Label>
    </Chip>
  );
}
