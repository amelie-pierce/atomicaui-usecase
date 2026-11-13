import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="xmark"
      family="classic"
      layer="duotone"
      aria-label="Close walkthrough"
      aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
    />
  );
}
