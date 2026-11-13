import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <>
      <IconButton
        name="table-columns"
        aria-label="Configure columns"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }}
      />
      <IconButton
        name="angle-right"
        aria-label="Expand Input"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'square', shape: 'soft' }}
      />
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
    </>
  );
}
