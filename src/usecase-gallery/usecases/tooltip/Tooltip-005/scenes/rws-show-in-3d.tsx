import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, Tooltip, View } from '../../../../kit';

// RWS output (src/rws/output.tsx line 664): the product image toggle, a Button (color surface, paint text, soft, 96 by 80, 4px padding) holding the image, is the Tooltip.Trigger; the popup is the kit default and opens to the right
// (right, 4px offset) with "Show in 3D" while the product is not yet shown. A kit icon stands in for the image. Shown open; the scene keeps one toggle.
export default function RwsShowIn3dScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Button aria-label="Show in 3D" aria-pressed={false} aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80', paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }} />}>
            <ContainedIcon name="image" aria-hidden />
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="right" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>Show in 3D</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
