import type { ContextProps } from '../../../../types';
import { IconButton, Tooltip, View } from '../../../../kit';

// ADM ViewerChrome (src/features/viewer/components/ViewerChrome.tsx) and FD Viewer (src/components/Viewer.jsx): the Reset View IconButton (crosshairs, paint text, color secondary, scale sm) of the floating viewer
// controls is the trigger; the popup is solid, color secondary, scale sm and opens to the left (left, 8px offset) because the controls hug the right edge of the viewer.
// FD also gives its viewer checkbox rows the same left tooltip. Shown open; the scene keeps the one button.
export default function AdmViewerResetScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 6)', paddingInlineStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<IconButton name="crosshairs" aria-label="Reset view" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="left" sideOffset={8} className="ug-anchored">
              <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Reset view</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
