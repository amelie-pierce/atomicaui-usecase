import type { ContextProps } from '../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../kit';

// The RadioField of the input panel in AGPD (src/agpd/inputs.tsx) and RWS (src/rws/inputs.tsx), and the RadioChoice of PBS (src/InputFields.tsx), which wraps its radios in a row with a 12 gap instead of 8 and renders the same otherwise: a row RadioGroup at scale "sm" whose label takes the first line (a row with a 4 gap, width fill), then the radios inline.
// Left out: the help trigger and lock hint of the label row, the per-radio disabled rule; the apps show the group enabled.
export default function AgpdInlineScene(_: ContextProps) {
  return (
    <View as="section" aria-label="Input panel" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type as="h2" role="l3" weight="semi-bold">Input</Type>
      <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
        <RadioGroup defaultValue="welded" direction="row" aui={{ scale: 'sm', profile: 'no-padding' }}>
          <RadioGroup.Label aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4', width: 'fill' } }}>Plate connection</RadioGroup.Label>
          <Radio value="welded" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
            <Radio.Label>Welded</Radio.Label>
          </Radio>
          <Radio value="bolted" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
            <Radio.Label>Bolted</Radio.Label>
          </Radio>
        </RadioGroup>
      </View>
    </View>
  );
}
