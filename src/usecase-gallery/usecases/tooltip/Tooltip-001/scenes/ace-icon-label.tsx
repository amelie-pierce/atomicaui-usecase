import type { ContextProps } from '../../../../types';
import { IconButton, Tooltip, View } from '../../../../kit';

// ACE PaneIconTooltip (src/shared/ui/PaneIconTooltip.tsx), ADM AdmIconTooltip (src/shared/lib/tooltip/AdmIconTooltip.tsx), ADC IconTooltip (src/adc/Workspace.tsx) and FD IconTooltip (src/components/ui.jsx):
// the same wrapper as the default group but the popup is solid, color secondary, scale sm, opening below the button (bottom, 8px offset; ADM 6px).
// ADC dialog-header closes and FD viewer buttons open it above or to the left; noted in how. Shown open; the scene keeps the one button.
export default function AceIconLabelScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 6)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<IconButton name="gear" aria-label="Settings" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="bottom" sideOffset={8} className="ug-anchored">
              <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Settings</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
