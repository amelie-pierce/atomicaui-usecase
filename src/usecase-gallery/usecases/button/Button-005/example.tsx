import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
      End
      <Button.Icon name="check" aui={{ scale: 'sm' }} />
    </Button>
  );
}
