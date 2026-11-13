import { Button, Type } from '../../../kit';

export default function Example() {
  return (
    <Type role="l4">
      Select{' '}
      <Button
        type="button"
        aui={{
          scale: 'sm',
          profile: 'no-padding',
          color: 'warning',
          paint: 'text',
          sx: { display: 'inline-flex', textDecoration: 'underline' },
        }}
      >
        All Products
      </Button>{' '}
      to review every solution.
    </Type>
  );
}
