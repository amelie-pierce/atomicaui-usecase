import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The product status filter of the FD output toolbar (src/components/Results.jsx, the status-filter Field, shown when a design has failed products): a label-less Field with a full-width trigger in the kit's default
// style (no surface or fixed colour) and a popup matching its width, placed 5px below. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the search field, the reset filter button and the solution count of the toolbar.
export default function FdStatusFilterScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field className="status-filter" aui={{ scale: 'sm' }}>
        <Field.Select open
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
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner sideOffset={5} className="ug-anchored">
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
    </View>
  );
}
