import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field className="status-filter" aui={{ scale: 'sm' }}>
      <Field.Select
        defaultValue="passed"
        items={[
          { label: 'Passed products', value: 'passed' },
          { label: 'Failed products', value: 'failed' },
          { label: 'All products', value: 'all' },
        ]}
      >
        <Field.SelectTrigger aria-label="Product status" aui={{ sx: { width: 'full' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner sideOffset={5}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectItem value="passed">
                  <Field.SelectItemText>Passed products</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="failed">
                  <Field.SelectItemText>Failed products</Field.SelectItemText>
                  <Field.SelectItemIndicator />
                </Field.SelectItem>
                <Field.SelectItem value="all">
                  <Field.SelectItemText>All products</Field.SelectItemText>
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
