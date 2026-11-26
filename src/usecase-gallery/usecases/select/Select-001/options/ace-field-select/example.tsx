import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill', gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
      <Field.Select
        defaultValue="snow"
        items={[
          { label: 'Dead (90)', value: 'dead' },
          { label: 'Snow (115)', value: 'snow' },
          { label: 'Roof (125)', value: 'roof' },
        ]}
      >
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="dead">
                  <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="snow">
                  <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="roof">
                  <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                  <Field.SelectItemIndicator><Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} /></Field.SelectItemIndicator>
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
