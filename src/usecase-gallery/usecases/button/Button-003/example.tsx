import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="xmark"
      aria-label="Close help"
      aui={{
        scale: 'sm',
        profile: 'square-compact',
        color: 'secondary',
        paint: 'text',
        shape: 'soft',
        sx: { flex: 'none' },
      }}
    />
  );
}
