import { ContainedIcon, Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3', width: '224' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Base plate</Field.Label>
      <Field.Select
        defaultValue="plate-a"
        items={[
          { label: 'Plate A', value: 'plate-a' },
          { label: 'Plate B', value: 'plate-b' },
          { label: 'Plate C', value: 'plate-c' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="plate-a">
                  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                  <ContainedIcon name="image" aria-hidden />
                </View>
                  <Field.SelectItemText>Plate A</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="plate-b">
                  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                  <ContainedIcon name="image" aria-hidden />
                </View>
                  <Field.SelectItemText>Plate B</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="plate-c">
                  <View as="span" aui={{ color: 'primary', paint: 'tonal', shape: 'soft', sx: { paddingBlockStart: '4', paddingBlockEnd: '4', paddingInlineStart: '4', paddingInlineEnd: '4' } }}>
                  <ContainedIcon name="image" aria-hidden />
                </View>
                  <Field.SelectItemText>Plate C</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
