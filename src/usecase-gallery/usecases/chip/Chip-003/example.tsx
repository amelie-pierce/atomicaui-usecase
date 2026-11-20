import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip aui={{ scale: 'sm', color: 'success', paint: 'tonal' }}>
      <Chip.Icon name="circle-check" aui={{ scale: 'sm' }} />
      Passed
    </Chip>
  );
}
