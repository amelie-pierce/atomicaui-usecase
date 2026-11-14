import { Button, IconButton } from '../../../kit';

export default function Example() {
  return (
    <>
      <IconButton name="rotate-left" aria-label="Reset columns" aui={{ paint: 'text' }} />
      <Button aui={{ scale: 'sm', paint: 'text' }}>Cancel</Button>
      <Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>
    </>
  );
}
