import type { ContextProps } from '../../../../../types';
import { Button, Popover, View } from '../../../../../kit';

// HS SettingsPanel (src/hs/SettingsPanel.tsx; ADC AppConfigurationPopover.tsx writes the same Field and segments): the settings popover holds one Field per setting, a Field.Label above full-width segments (flex fill, no padding on the Button; the pressed segment is a solid secondary soft View, the others text). The popover is open and anchored under a settings text button; only one setting is shown.
export default function HsSettingsScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<Button aui={{ scale: 'sm', paint: 'text', color: 'secondary', shape: 'soft' }} />}>Settings</Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="start" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Settings"
              render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '288' } }} />}
            >
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
