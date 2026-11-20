import { Button, Icon } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aria-label="Previous" aui={{ paint: 'text', profile: 'square' }}>
        <Icon name="arrow-left" />
      </Button>
      <Button aria-label="Next" aui={{ paint: 'text', profile: 'square' }}>
        <Icon name="arrow-right" />
      </Button>
    </>
  );
}
