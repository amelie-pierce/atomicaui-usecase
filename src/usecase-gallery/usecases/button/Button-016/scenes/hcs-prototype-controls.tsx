import type { ContextProps } from '../../../../types';
import { Button, View } from '../../../../kit';

// HCS prototype controls (src/components/F01Experience.tsx): a floating surface Button with elevation 3 that opens and closes the prototype's own control stack (aria-expanded).
// Left out: the control stack itself and the walkthrough.
export default function HcsPrototypeControlsScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', justifyContent: 'end' } }} style={{ inlineSize: 'min(100%, 288px)' }}>
      <Button aria-expanded={false} aui={{ scale: 'sm', color: 'surface', elevation: 3 }}>
        Prototype controls
      </Button>
    </View>
  );
}
