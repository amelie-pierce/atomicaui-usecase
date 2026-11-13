import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="bullseye"
      aria-label="Reset view"
      aui={{
        scale: 'sm',
        color: 'primary',
        paint: 'text',
        shape: 'soft',
        sx: {
          borderWidth: '1',
          borderStyle: 'solid',
          borderColor: 'outlined',
        },
      }}
    />
  );
}
