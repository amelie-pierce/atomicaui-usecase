import type { ContextProps } from '../types';
import { Button, IconButton, Type, View } from '../kit';

// The coach-mark card. In the app it is position: fixed beside its target with a spotlight (local CSS, no
// kit part); here it is a static card. The counter's push to the end is an inline margin, as in the app.
export default function WalkthroughLastContext({ children }: ContextProps) {
  return (
    <View
      role="region"
      aria-label="Walkthrough"
      aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingInlineStart: '16', paddingInlineEnd: '16', paddingBlockStart: '16', paddingBlockEnd: '16' } }}
      style={{ position: 'relative', inlineSize: 328 }}
    >
      <IconButton
        name="xmark"
        aria-label="Close walkthrough"
        aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
        style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
      />
      <Type role="l4" as="h2" weight="bold" style={{ paddingInlineEnd: 24 }}>Ready to go</Type>
      <Type role="p3" as="p">Use the filters to narrow the results.</Type>
      <View aui={{ sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
        <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
          <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
          Previous
        </Button>
        {children}
        <Type as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto' }}>6 / 6</Type>
      </View>
    </View>
  );
}
