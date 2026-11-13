import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal' }}>
      <Button.Icon name="print" layer="duotone" aui={{ scale: 'sm' }} />
      Print Output
    </Button>
  );
}
