import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Cancel</Button>
      <Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Confirm</Button>
    </>
  );
}
