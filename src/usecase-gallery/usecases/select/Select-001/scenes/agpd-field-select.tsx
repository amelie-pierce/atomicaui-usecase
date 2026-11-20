import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The Choice field of AGPD (src/agpd/controls.tsx): the label-above field of the first group (a 28px outlined trigger, popup of the trigger width, 4px below), but the chosen row ends with a check icon in its indicator,
// where the first group's rows hold none. Built open and non-modal (container={host}, positioner ug-anchored). Left out: the help trigger and lock beside the label, the plate images of some options (Select-005)
// and the other fields of the pane; the app disables the field when it has one option, the scene shows it enabled.
export default function AgpdFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm' }}>
        <Field.Label>Download Duration</Field.Label>
        <Field.Select open
          defaultValue="snow"
          items={[
            { label: 'Dead (90)', value: 'dead' },
            { label: 'Snow (115)', value: 'snow' },
            { label: 'Roof (125)', value: 'roof' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
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
      </Field>
    </View>
  );
}
