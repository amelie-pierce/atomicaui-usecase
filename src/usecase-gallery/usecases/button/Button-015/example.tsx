import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'xs', color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill', justifyContent: 'between' } }}>
      Select products
    </Button>
  );
}
