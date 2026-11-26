import type { ContextProps } from '../../../../../types';
import { Button, Field, Input, Type, View } from '../../../../../kit';

// The Search by option field of the column menu of HCS (src/components/ColumnMenu.tsx), the same field of HS (src/hs/ColumnMenu.tsx): a Field with the label above a full-width outlined trigger with the soft shape,
// and a popup that opens below it, aligned to the trigger start (alignItemWithTrigger off). Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the Popover that holds the column menu, the sort buttons and the text search field above; the app disables the field with fewer than two options (HCS) or none (HS), the scene shows it enabled.
export default function HcsColumnFilterScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <View data-ug-part="column-menu" aui={{ scale: 'sm', color: 'surface', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', gap: '3', width: 'fill' } }}>
        <Type role="l3" weight="semi-bold">Column options</Type>
        <View data-ug-part="column-search" aui={{ sx: { display: 'flex', flexDirection: 'column', gap: '2', width: 'fill' } }}>
          <Type role="l3">Search by text</Type>
          <Input aria-label="Search column values" placeholder="Search values" aui={{ scale: 'sm', color: 'surface', paint: 'fixed' }} />
        </View>
        <View data-ug-part="sort-actions" aui={{ sx: { display: 'flex', flexDirection: 'row', gap: '2' } }}>
          <Button aui={{ scale: 'sm', color: 'secondary', paint: 'text' }}>Sort ascending</Button>
          <Button aui={{ scale: 'sm', color: 'secondary', paint: 'text' }}>Sort descending</Button>
        </View>
        <Field data-ug-component-root aui={{ scale: 'sm', sx: { gap: '4', minWidth: '0' } }}>
          <Field.Label>Search by option</Field.Label>
          <Field.Select open modal={false}
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
              <Field.SelectPositioner side="bottom" align="start" sideOffset={4} alignItemWithTrigger={false} className="ug-anchored">
                <Field.SelectPopup data-ug-component-root matchTriggerWidth>
                  <Field.SelectList>
                    <Field.SelectItem value="all">Select all</Field.SelectItem>
                    <Field.SelectItem value="passed">Passed</Field.SelectItem>
                    <Field.SelectItem value="failed">Failed</Field.SelectItem>
                  </Field.SelectList>
                </Field.SelectPopup>
              </Field.SelectPositioner>
            </Field.SelectPortal>
          </Field.Select>
        </Field>
      </View>
    </View>
  );
}
