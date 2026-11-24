import type { ContextProps } from '../../../../../types';
import { Button, Tooltip, View } from '../../../../../kit';

// RWS output (src/rws/output.tsx line 664): the product image toggle, a Button (color surface, paint text, soft, 96 by 80, 4px padding) holding the image, is the Tooltip.Trigger; the popup is the kit default and opens to the right
// (right, 4px offset) with "Show in 3D" while the product is not yet shown. The image is representative. Shown open; the scene keeps one toggle.
export default function RwsShowIn3dScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Button data-ug-part="trigger" aria-label="Show in 3D" aria-pressed={false} aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80', paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }} />}>
            <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: '100%', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
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
