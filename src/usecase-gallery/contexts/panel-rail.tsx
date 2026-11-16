import type { ContextProps } from '../types';
import { Type, View } from '../kit';

// The collapsed Input panel: a 40px rail inside the pane frame, the expand trigger top centre (the 28px
// square icon), the viewer pane beside it. The rail itself has no content.
export default function PanelRailContext({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'stretch', gap: '8' } }} style={{ inlineSize: 'min(100%, 420px)', blockSize: 240 }}>
      <View
        as="aside"
        aria-label="Input (collapsed)"
        aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' } }}
        style={{ inlineSize: 40 }}
      >
        {children}
      </View>
      <View aria-label="Viewer" aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { flex: 'fill' } }}>
        <Type as="h2" role="l3" weight="bold">3D Viewer</Type>
      </View>
    </View>
  );
}
