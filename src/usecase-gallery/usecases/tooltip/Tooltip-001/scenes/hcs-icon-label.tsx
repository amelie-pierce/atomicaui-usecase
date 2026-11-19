import type { ContextProps } from '../../../../types';
import { IconButton, Tooltip, View } from '../../../../kit';

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
