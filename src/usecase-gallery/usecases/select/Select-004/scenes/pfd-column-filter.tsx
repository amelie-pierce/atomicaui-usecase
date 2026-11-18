import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The Search by option field of the column menu of PFD (src/pfd/ColumnMenu.tsx): the same field, but the popup opens upward (side "top"), as the Blueprint list does. Built open and non-modal
// (container={host}, positioner ug-anchored). Left out: the Popover that holds the column menu, the sort buttons and the text search field above.
export default function PfdColumnFilterScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
        <Field.Label>Search by option</Field.Label>
        <Field.Select open
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
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="top" align="start" sideOffset={4} alignItemWithTrigger={false} className="ug-anchored">
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
    </View>
  );
}
