import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The label-beside field of ADM (src/features/design-inputs/components/MasonryWallDetailsSection/FieldSelectRow.tsx), the same row of ADC
// (src/adc/components/DesignField.tsx): a Field row with the label at the start and a 28px outlined trigger sharing the row half and half, popup the width of the trigger, placed 4px below.
// Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the unit symbol after the value, the error line, the display nodes of ADM and the grouped options and thumbnails of ADC; the app disables the field when it has one option, the scene shows it enabled.
export default function AdmFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '4' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
          <Field.Select open
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
            <Field.SelectPortal container={host}>
              <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
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
        </View>
      </Field>
    </View>
  );
}
