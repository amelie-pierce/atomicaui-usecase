import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }}>
      <Button.Icon name="filter-circle-xmark" />
      Reset filters
    </Button>
  );
}
