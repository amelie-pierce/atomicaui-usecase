import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip aui={{ color: 'success', paint: 'solid', scale: 'xs' }}>
      <Chip.Icon name="circle-check" />
      <Chip.Label>Anchorage</Chip.Label>
    </Chip>
  );
}
