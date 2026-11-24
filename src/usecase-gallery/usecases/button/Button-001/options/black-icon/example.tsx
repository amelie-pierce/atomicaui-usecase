import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
      <Button.Icon name="print" aui={{ scale: 'sm' }} />
      Print Output
    </Button>
  );
}
