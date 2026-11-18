import type { ContextProps } from '../../../../types';
import { Radio, RadioGroup, View } from '../../../../kit';

// The RadioField of the input panel in AGPD (src/agpd/inputs.tsx) and RWS (src/rws/inputs.tsx), and the RadioChoice of PBS (src/InputFields.tsx), which wraps its radios in a row with a 12 gap instead of 8 and renders the same otherwise: a row RadioGroup at scale "sm" whose label takes the first line (a row with a 4 gap, width fill), then the radios inline.
// Left out: the help trigger and lock hint of the label row, the per-radio disabled rule, and the panel around the field; the apps show the group enabled.
const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

export default function AgpdInlineScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
      <RadioGroup defaultValue="welded" direction="row" aui={{ scale: 'sm', profile: 'no-padding' }}>
        <RadioGroup.Label aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4', width: 'fill' } }}>Plate connection</RadioGroup.Label>
        <Radio value="welded" aui={SELECTION}>
          <Radio.Label>Welded</Radio.Label>
        </Radio>
        <Radio value="bolted" aui={SELECTION}>
          <Radio.Label>Bolted</Radio.Label>
        </Radio>
      </RadioGroup>
    </View>
  );
}
