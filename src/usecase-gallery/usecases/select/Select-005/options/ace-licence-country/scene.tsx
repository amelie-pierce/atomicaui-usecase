import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The country select of the ACE licence gate (src/features/eula/ui/EulaGate.tsx): the same flag-led trigger and rows, but it states no scale or height and each row ends with a check icon for the chosen one.
// Built open and non-modal (container={host}, positioner ug-anchored). Left out: the licence text, the accept checkbox and the buttons of the gate.
export default function AceLicenceCountryScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field>
        <Field.Label>Country</Field.Label>
        <Field.Select open
          defaultValue="us"
          items={[
            { label: 'Canada', value: 'ca' },
            { label: 'United States', value: 'us' },
            { label: 'Mexico', value: 'mx' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed' }}>
            <Field.SelectIcon name="flag" aria-hidden />
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="ca">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Canada</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="us">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>United States</Field.SelectItemText>
                    <Field.SelectItemIndicator>
                      <Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />
                    </Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="mx">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Mexico</Field.SelectItemText>
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
