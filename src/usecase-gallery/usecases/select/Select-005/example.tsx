import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
      <Field.Label>Country</Field.Label>
      <Field.Select
        defaultValue="us"
        items={[
          { label: 'Canada', value: 'ca' },
          { label: 'United States', value: 'us' },
          { label: 'Mexico', value: 'mx' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
          <Field.SelectIcon name="flag" aria-hidden />
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="ca">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>Canada</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="us">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>United States</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="mx">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>Mexico</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
