import { ContainedIcon, Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Corrosion Resistance</Field.Label>
      <Field.Select
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
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
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
  );
}
