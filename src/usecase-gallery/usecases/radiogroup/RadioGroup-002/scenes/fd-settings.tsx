import type { ContextProps } from '../../../../types';
import { Radio, RadioGroup, View } from '../../../../kit';

// The SettingRadios of FD (src/App.jsx, the Auto-rotate 3D model row of the phone drawer's Settings popover): a column RadioGroup with a plain RadioGroup.Label above stacked Yes and No radios in the shared selection look.
// Left out: the popover, the other settings and the drawer; the app shows the group enabled.
const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

export default function FdSettingsScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
      <RadioGroup defaultValue="true">
        <RadioGroup.Label>Auto-rotate 3D model</RadioGroup.Label>
        <Radio value="true" aui={SELECTION}>
          <Radio.Label>Yes</Radio.Label>
        </Radio>
        <Radio value="false" aui={SELECTION}>
          <Radio.Label>No</Radio.Label>
        </Radio>
      </RadioGroup>
    </View>
  );
}
