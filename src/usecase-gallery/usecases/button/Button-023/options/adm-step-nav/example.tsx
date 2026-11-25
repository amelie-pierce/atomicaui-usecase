import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        Previous
      </Button>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        Next
        <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
      </Button>
    </>
  );
}
