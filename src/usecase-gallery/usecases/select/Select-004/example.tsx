import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
      <Field.Label>Search by option</Field.Label>
      <Field.Select
        defaultValue="all"
        items={[
          { label: 'Select all', value: 'all' },
          { label: 'Passed', value: 'passed' },
          { label: 'Failed', value: 'failed' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { width: 'fill' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" align="start" sideOffset={4} alignItemWithTrigger={false}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="all">
                  <Field.SelectItemText>Select all</Field.SelectItemText>
                </Field.SelectItem>
                <Field.SelectItem value="passed">
                  <Field.SelectItemText>Passed</Field.SelectItemText>
                </Field.SelectItem>
                <Field.SelectItem value="failed">
                  <Field.SelectItemText>Failed</Field.SelectItemText>
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
