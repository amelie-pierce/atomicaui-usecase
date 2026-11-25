import type { ContextProps } from '../../../../../types';
import { ContainedIcon, Field, View } from '../../../../../kit';

// The multi select of PFD (src/pfd/fields.tsx MultiSelectField): the same label above a 28px outlined trigger with the chosen options joined with a comma, but each row leads with a checkbox icon
// (square-check when chosen, square when not) and has no indicator. Built open and non-modal (container={host}, positioner ug-anchored); the app keeps the list open after a click.
// Left out: the help trigger beside the label, the "All" rule of the app and the other fields of the pane; the app shows Not Applicable when disabled, the scene shows it enabled.
export default function PfdMultiSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>
        <Field.Select open
          multiple
          defaultValue={['standard', 'galvanized']}
          items={[
            { label: 'Standard', value: 'standard' },
            { label: 'Hot dip galvanized', value: 'galvanized' },
            { label: 'Stainless steel', value: 'stainless' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue>Standard, Hot dip galvanized</Field.SelectValue>
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="standard">
                    <ContainedIcon name="square-check" aria-hidden />
                    <Field.SelectItemText>Standard</Field.SelectItemText>
                  </Field.SelectItem>
                  <Field.SelectItem value="galvanized">
                    <ContainedIcon name="square-check" aria-hidden />
                    <Field.SelectItemText>Hot dip galvanized</Field.SelectItemText>
                  </Field.SelectItem>
                  <Field.SelectItem value="stainless">
                    <ContainedIcon name="square" aria-hidden />
                    <Field.SelectItemText>Stainless steel</Field.SelectItemText>
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
