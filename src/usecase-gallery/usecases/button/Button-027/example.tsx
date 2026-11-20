import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button
        aria-label="Back to top"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}
      >
        <Button.Icon name="arrow-up" />
        Back to top
      </Button>
      <Button
        aria-label="Jump to table notes"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}
      >
        <Button.Icon name="arrow-down" />
        Table Notes
      </Button>
    </>
  );
}
