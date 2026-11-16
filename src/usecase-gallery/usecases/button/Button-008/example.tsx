import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button
      aria-label="Why Not for passing model"
      aria-expanded={false}
      aui={{
        scale: 'sm',
        profile: 'square-compact',
        color: 'surface',
        paint: 'text',
        sx: { minWidth: '24', minHeight: '24' },
      }}
    >
      <Button.Icon name="angle-right" aui={{ scale: 'sm' }} />
    </Button>
  );
}
