import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The estimator select of ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the label-beside row of ADM and ADC (the label at the start, a 28px outlined trigger, popup of the trigger width, 4px below),
// but the chosen row ends with a check icon in its indicator, where theirs hold none, and the label and trigger share the row by flex-grow (129 and 145px in a 280px row, ADM and ADC 137 and 137).
// Built open and non-modal (container={host}, positioner ug-anchored). Left out: the option note and display node, the description under the field; the app disables the field with one option, the scene shows it enabled.
export default function AceFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '3' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Download Duration</Field.Label>
          <Field.Select open
            defaultValue="snow"
            items={[
              { label: 'Dead (90)', value: 'dead' },
              { label: 'Snow (115)', value: 'snow' },
              { label: 'Roof (125)', value: 'roof' },
            ]}
          >
            <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
            <Field.SelectPortal container={host}>
              <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
                <Field.SelectPopup matchTriggerWidth>
                  <Field.SelectList>
                    <Field.SelectItem value="dead">
                      <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                      <Field.SelectItemIndicator>
                        <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                      </Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="snow">
                      <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                      <Field.SelectItemIndicator>
                        <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                      </Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="roof">
                      <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                      <Field.SelectItemIndicator>
                        <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                      </Field.SelectItemIndicator>
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
