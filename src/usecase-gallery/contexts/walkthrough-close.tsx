import type { ContextProps } from '../types';
import { Button, Type, View } from '../kit';

// The coach-mark card with the close X in its top-right corner. In the app the card is position: fixed and
// the X is placed by local CSS; here the card is relative and the X sits in a wrapper with an inline style.
export default function WalkthroughCloseContext({ children }: ContextProps) {
  return (
    <View
      role="region"
      aria-label="Walkthrough"
      aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingInlineStart: '16', paddingInlineEnd: '16', paddingBlockStart: '16', paddingBlockEnd: '16' } }}
      style={{ position: 'relative', inlineSize: 328 }}
    >
      <span style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}>
        {children}
      </span>
      <Type role="l4" as="h2" weight="bold" style={{ paddingInlineEnd: 24 }}>Filter the results</Type>
      <Type role="p3" as="p">Use the filters to narrow the results.</Type>
      <View aui={{ sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
        <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
          <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
          Previous
        </Button>
        <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
          Next
          <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
        </Button>
        <Type as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto' }}>3 / 6</Type>
      </View>
    </View>
  );
}
