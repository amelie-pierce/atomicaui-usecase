import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip>
      <Chip.Label>screenshot.png</Chip.Label>
      <Chip.Dismiss aria-label="Remove screenshot.png" />
    </Chip>
  );
}
