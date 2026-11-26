import { Checkbox, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="bold" aui={{ sx: { paddingBlockStart: '4' } }}>Object Visibility</Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
        <Checkbox defaultSelected aui={{ scale: 'xs', shape: 'soft', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Label>Concrete</Checkbox.Label>
        </Checkbox>
        <Checkbox defaultSelected aui={{ scale: 'xs', shape: 'soft', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Label>Anchors</Checkbox.Label>
        </Checkbox>
      </View>
    </View>
  );
}
