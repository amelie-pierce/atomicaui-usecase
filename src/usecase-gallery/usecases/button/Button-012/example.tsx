import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <IconButton
      name="ellipsis-vertical"
      aria-label="Column menu"
      aui={{
        color: 'surface',
        paint: 'text',
        profile: 'square-compact',
        shape: 'soft',
        scale: 'xs',
      }}
    />
  );
}
