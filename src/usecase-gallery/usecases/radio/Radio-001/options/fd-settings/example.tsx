import { Radio, RadioGroup } from '../../../../../kit';

export default function Example() {
  return (
    <RadioGroup defaultValue="welded" direction="row" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <RadioGroup.Label aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4', width: 'fill' } }}>Plate connection</RadioGroup.Label>
      <Radio value="welded" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Welded</Radio.Label>
      </Radio>
      <Radio value="bolted" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Bolted</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
