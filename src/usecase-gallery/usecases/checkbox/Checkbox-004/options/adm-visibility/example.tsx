import { Checkbox, Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', elevation: 0, profile: 'compact', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">Object visibility</Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Anchors" defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Anchors</Field.Label>
      </Field>
    </View>
  );
}
