import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', paint: 'solid', color: 'raised', shape: 'soft' }}>
      <Button.Icon name="arrow-rotate-left" layer="duotone" />
      Reset to default
    </Button>
  );
}
