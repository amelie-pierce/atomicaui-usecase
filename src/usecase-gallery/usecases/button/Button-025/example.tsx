import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button
      aui={{
        scale: 'sm',
        paint: 'text',
        sx: {
          width: 'fill',
          justifyContent: 'between',
          textAlign: 'start',
          whiteSpace: 'normal',
          borderStyle: 'solid',
          borderColor: 'outlined',
          borderBlockStartWidth: '1',
          borderBlockEndWidth: '1',
          borderInlineStartWidth: '1',
          borderInlineEndWidth: '1',
        },
      }}
    >
      HS: General Tutorial
      <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
    </Button>
  );
}
