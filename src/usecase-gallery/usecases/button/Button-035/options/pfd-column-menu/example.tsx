import { IconButton } from '../../../../../kit';

export default function Example() {
  return (
    <IconButton
      name="ellipsis"
      aria-label="Column options"
      aui={{
        color: 'secondary',
        paint: 'text',
        profile: 'square-compact',
        shape: 'soft',
        scale: 'xs',
      }}
    />
  );
}
