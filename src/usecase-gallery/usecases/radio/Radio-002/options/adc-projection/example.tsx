import { Radio, RadioGroup } from '../../../../../kit';

export default function Example() {
  return (
    <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Perspective</Radio.Label>
      </Radio>
      <Radio value="orthographic" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Orthographic</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
