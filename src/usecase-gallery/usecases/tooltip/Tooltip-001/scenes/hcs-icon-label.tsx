import type { ContextProps } from '../../../../types';
import { IconButton, Tooltip, View } from '../../../../kit';

// HCS HcsIconTooltip (src/components/HcsIconTooltip.tsx): the icon-only button is the Tooltip.Trigger (`render`), the popup keeps the kit default (surface, solid, scale sm)
// and opens below it (bottom, 4px offset) with the same words as the button's aria-label. HCS, AGPD, RWS, PBS, PFD and HS write this popup;
// AGPD and RWS (IconTip) match HCS exactly, PBS, PFD and HS open it above the button (top; HS and PFD leave the side at its default), noted in how.
// Shown open; the scene keeps the one button.
export default function HcsIconLabelScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 6)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<IconButton name="gear" aria-label="Settings" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="bottom" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup aui={{ scale: 'sm' }}>Settings</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
