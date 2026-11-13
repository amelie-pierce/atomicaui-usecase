import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ paint: 'text' }}>Cancel</Button>
      <Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>
    </>
  );
}
