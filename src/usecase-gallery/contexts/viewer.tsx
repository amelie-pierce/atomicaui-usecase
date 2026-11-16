import type { ContextProps } from '../types';
import { Type, View } from '../kit';
import { MockViewerControls } from '../mock-data';

// The 3D Viewer canvas. The real canvas is a Babylon scene and the view cube is raw buttons with CSS 3D, neither
// buildable from kit parts: they are framed stand-ins. The controls stack floats at the right, 62px from the top
// (the app uses local CSS; here an inline style), starting with Reset view, then the projection radios, the
// Object Visibility heading and its checkboxes.
export default function ViewerContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="3D Viewer (stand-in)"
      aui={{ scale: 'sm', color: 'surface', paint: 'fixed', shape: 'soft', profile: 'no-padding' }}
      style={{ position: 'relative', inlineSize: 'min(100%, 560px)', blockSize: 360 }}
    >
      <View aria-label="View cube (stand-in)" aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'no-padding' }} style={{ position: 'absolute', insetBlockStart: 21, insetInlineStart: 21, inlineSize: 48, blockSize: 48, display: 'grid', placeItems: 'center' }}>
        <Type as="span" role="p3" color="muted">Cube</Type>
      </View>
      <Type as="p" role="p3" color="muted" style={{ position: 'absolute', insetBlockEnd: 8, insetInlineStart: 12 }}>
        Stand-in: the app draws a 3D beam connection here.
      </Type>
      <View
        aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }}
        style={{ position: 'absolute', insetBlockStart: 62, insetInlineEnd: 12, maxInlineSize: 'calc(100% - 120px)' }}
      >
        {children}
        <MockViewerControls />
      </View>
    </View>
  );
}
