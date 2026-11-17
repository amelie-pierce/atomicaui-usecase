import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft', sx: { flex: 'none' } }}>
      <Button.Icon name="file-csv" />
      Download CSV
    </Button>
  );
}
