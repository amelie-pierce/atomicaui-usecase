import type { ContextProps } from '../../../../../types';
import { Button, Popover, Radio, RadioGroup, Type, View } from '../../../../../kit';

// The SettingRadios of FD (src/App.jsx, the Auto-rotate 3D model row of the phone drawer's Settings popover): a column RadioGroup with a plain RadioGroup.Label above stacked Yes and No radios in the shared selection look.
// Left out: the other settings and the drawer; the app shows the group enabled.
export default function FdSettingsScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open modal={false}>
        <Popover.Trigger render={<Button>Settings</Button>} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" sideOffset={4} className="ug-anchored">
            <Popover.Popup initialFocus={false} aria-label="Settings" render={<View as="section" aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4 }} />}>
              <Type as="h2" role="l3" weight="semi-bold">Settings</Type>
              <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
                <RadioGroup defaultValue="true">
                  <RadioGroup.Label>Auto-rotate 3D model</RadioGroup.Label>
                  <Radio value="true" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                    <Radio.Label>Yes</Radio.Label>
                  </Radio>
                  <Radio value="false" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                    <Radio.Label>No</Radio.Label>
                  </Radio>
                </RadioGroup>
              </View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
