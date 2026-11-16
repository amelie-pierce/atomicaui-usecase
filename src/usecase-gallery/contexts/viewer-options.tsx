import type { ContextProps } from '../types';
import { Type, View } from '../kit';
import { MockViewerControls } from '../mock-data';

// The compact viewer: View options sits alone at the top right of the canvas (8px in) and opens a popover
// holding the same controls. The popup is shown static, as a View card under the button, the nearest kit-only
// form of the app's local popover surface. The canvas is a framed stand-in.
export default function ViewerOptionsContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="3D Viewer (stand-in)"
      aui={{ scale: 'sm', color: 'surface', paint: 'fixed', shape: 'soft', profile: 'no-padding' }}
      style={{ position: 'relative', inlineSize: 'min(100%, 420px)', blockSize: 360 }}
    >
      <Type as="p" role="p3" color="muted" style={{ position: 'absolute', insetBlockEnd: 8, insetInlineStart: 12 }}>
        Stand-in: the app draws a 3D beam connection here.
      </Type>
      <View
        aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '4' } }}
        style={{ position: 'absolute', insetBlockStart: 8, insetInlineEnd: 8 }}
      >
        {children}
        <View
          aria-label="View options"
          aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }}
        >
          <MockViewerControls />
        </View>
      </View>
    </View>
  );
}
