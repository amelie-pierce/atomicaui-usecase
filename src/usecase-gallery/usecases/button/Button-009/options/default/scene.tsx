import { useRef } from 'react';
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, Type, View } from '../../../../../kit';
import { MockViewerCanvas, MockViewerControls } from '../../../../../mock-data';

// The compact 3D Viewer (side-by-side and engineering layouts, narrow screens), where the floating controls give way to one View options
// button in the top-end corner of the scene, 8px in (the app's `.f02-mobile-options`, the `ug-scene__options` rule). The button is the
// trigger of a Popover (side bottom, align end, offset 4) whose popup is the Reset view and the projection radios, on a surface card
// (`.f02-popover`: 12px padding, 4px radius, shadow). It is shown open and floats over the canvas.
export default function ViewerOptionsContext({ children, host }: ContextProps) {
  const anchor = useRef<HTMLSpanElement>(null);
  return (
    <View
      as="section"
      data-ug-part="viewer-pane"
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
            <Popover open>
              <span ref={anchor} data-ug-part="corner" className="ug-scene__options">
                {children}
              </span>
              <Popover.Portal container={host}>
                <Popover.Positioner anchor={anchor} side="bottom" align="end" sideOffset={4} className="ug-anchored">
                  <Popover.Popup data-ug-part="options-popover" initialFocus={false} aria-label="View options" className="ug-scene__popover">
                    <div className="ug-scene__controls" style={{ position: 'static', maxInlineSize: 'none' }}>
                      <IconButton
                        data-ug-part="reset-view"
                        name="bullseye"
                        aria-label="Reset view"
                        title="Reset view"
                        aui={{ scale: 'sm', color: 'primary', paint: 'text', shape: 'soft', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }}
                      />
                      <MockViewerControls />
                    </div>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover>
          </div>
        </View>
      </View>
    </View>
  );
}
