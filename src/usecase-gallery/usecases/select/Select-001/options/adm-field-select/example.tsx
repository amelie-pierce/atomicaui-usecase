import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ sx: { flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
      <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
      <Field.Select
        defaultValue="snow"
        items={[
          { label: 'Dead (90)', value: 'dead' },
          { label: 'Snow (115)', value: 'snow' },
          { label: 'Roof (125)', value: 'roof' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="dead">
                  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="snow">
                  <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="roof">
                  <Field.SelectItemText>Roof (125)</Field.SelectItemText>
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
