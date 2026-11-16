import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      Selecting{' '}
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
      to review all solutions, including the reasons each one failed.
    </>
  );
}
