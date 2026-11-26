import { Button, Type } from '../../../../../kit';

export default function Example() {
  return (
    <Button data-ug-part="container" aui={{ scale: 'sm', paint: 'text', sx: { flexDirection: 'column', alignItems: 'start', justifyContent: 'between', gap: '4', width: 'fill', textAlign: 'start', whiteSpace: 'normal', borderStyle: 'solid', borderColor: 'outlined', borderBlockStartWidth: '1', borderBlockEndWidth: '1', borderInlineStartWidth: '1', borderInlineEndWidth: '1' } }}>
      <Type data-ug-part="topic-name" as="span" role="p2" weight="semi-bold">ACE: General Tutorial</Type>
      <Type data-ug-part="topic-description" as="span" role="p3" color="muted">Shows the general features common to all Blueprint-based applications.</Type>
    </Button>
  );
}
