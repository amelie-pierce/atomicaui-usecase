import { Switch, Type, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', width: 'fill', gap: '8' } }}>
      <Type role="l5">Conservative shear breakout</Type>
      <Switch aria-label="Conservative shear breakout" defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }} />
    </View>
  );
}
