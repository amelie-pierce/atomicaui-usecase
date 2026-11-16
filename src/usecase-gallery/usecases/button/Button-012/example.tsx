import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="angle-right"
      aria-label="Expand Input"
      aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'square', shape: 'soft' }}
    />
  );
}
