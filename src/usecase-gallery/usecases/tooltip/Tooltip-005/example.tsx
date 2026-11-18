import { Button, ContainedIcon } from '../../../kit';

export default function Example() {
  return (
    <Button aria-label="Show in 3D" aui={{ color: 'surface', paint: 'text', shape: 'soft' }}>
      <ContainedIcon name="image" aria-hidden />
    </Button>
  );
}
