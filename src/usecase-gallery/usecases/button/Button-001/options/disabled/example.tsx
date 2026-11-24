import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
      <Button.Icon name="print" aui={{ scale: 'sm' }} />
      Print Output
    </Button>
  );
}
