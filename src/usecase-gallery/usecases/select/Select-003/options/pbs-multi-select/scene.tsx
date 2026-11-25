import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Corrosion Resistance field of PBS (src/InputFields.tsx MultiSelectField), the same multiple Field.Select of FD (src/components/ui.jsx Choice with multiple): the label above a 28px outlined trigger that shows the
// chosen options joined with a comma; every row has an empty indicator, and a chosen row shows by its raised fill. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the help popover beside the label and the other fields of the pane.
export default function PbsMultiSelectScene({ host }: ContextProps) {
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
                    <Field.SelectItemText>Standard</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="galvanized">
                    <Field.SelectItemText>Hot dip galvanized</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="stainless">
                    <Field.SelectItemText>Stainless steel</Field.SelectItemText>
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
