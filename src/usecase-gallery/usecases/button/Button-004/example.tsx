import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'primary', paint: 'solid' }} disabled aria-busy>
      <Button.Spinner />
      Saving
    </Button>
  );
}
