import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Close</Button>
      <Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Start Walkthrough</Button>
    </>
  );
}
