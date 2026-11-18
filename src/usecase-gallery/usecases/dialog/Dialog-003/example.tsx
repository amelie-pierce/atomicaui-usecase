import { Radio, RadioGroup, View } from '../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

export default function Example() {
  return (
    <RadioGroup defaultValue="2">
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4', width: 'fill' } }}>
        <Radio value="1" aui={SELECTION}>
          <Radio.Label>Two-beam connection</Radio.Label>
        </Radio>
        <Radio value="2" aui={SELECTION}>
          <Radio.Label>Three-beam connection</Radio.Label>
        </Radio>
      </View>
    </RadioGroup>
  );
}
