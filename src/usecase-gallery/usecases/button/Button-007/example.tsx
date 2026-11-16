import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal' }}>
        <Button.Icon name="print" aui={{ scale: 'sm' }} />
        Print Output
      </Button>
      <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal' }}>View options</Button>
      <Button aui={{ scale: 'sm' }}>
        <Button.Icon name="filter-circle-xmark" aui={{ scale: 'sm' }} />
        Reset filters
      </Button>
    </>
  );
}
