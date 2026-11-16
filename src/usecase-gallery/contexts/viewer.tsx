import type { ContextProps } from '../types';
import { Type, View } from '../kit';
import { MockViewerCanvas, MockViewerControls } from '../mock-data';

// The 3D Viewer pane as App.tsx composes it: pane frame, the 28px header, and a body card (overflow hidden) holding the scene. The scene
// is the live canvas (a three.js scene the kit has no part for, so a framed stand-in) with the desktop controls overlaid at the top end,
// 62px down and 12px in (the app's `.f02-controls-desktop`, here the `ug-scene__controls` rule): Reset view first, then the projection
// radios (Perspective selected), the Object Visibility heading and four checkboxes with the app's selected and unselected recipes.
// Connector Detail starts unchecked.
export default function ViewerContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="3D Viewer"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
        <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      </View>
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0', flex: 'fill', minHeight: '0', overflow: 'hidden' } }}>
          <div className="ug-scene">
            <MockViewerCanvas />
            <div className="ug-scene__controls">
              {children}
              <MockViewerControls />
            </div>
          </div>
        </View>
      </View>
    </View>
  );
}
