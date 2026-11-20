import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm' }}>
      <Button.Icon name="plus" aria-hidden />
      Add job
    </Button>
  );
}
