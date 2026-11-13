import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm' }}>Try again</Button>
      <Button aui={{ scale: 'sm' }}>
        <Button.Icon name="filter-circle-xmark" aui={{ scale: 'sm' }} />
        Reset filters
      </Button>
    </>
  );
}
