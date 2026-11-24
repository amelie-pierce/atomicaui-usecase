import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The configuration select of HS (src/hs/SettingsPanel.tsx ConfigSelect), the same field of ACE (src/features/app-configuration/ui/AppConfigurationDialog.tsx), ADC (src/adc/components/AppConfigurationPopover.tsx),
// FD (src/components/SettingsPopover.jsx), PFD (src/pfd/CountrySelection.tsx) and RWS (src/rws/CountryConfiguration.tsx): a Field with the label above a 28px outlined trigger that leads with the chosen row's icon,
// and rows that each lead with an icon and keep an empty indicator. The apps show a flag image (ACE, PFD, RWS), the scene a flag icon. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the Popover or dialog that holds the configuration (an anchored popover in HS, ADC, FD, PFD and RWS, a dialog in ACE) and the other configuration fields; the app disables fields with one option, the scene shows it enabled.
export default function HsConfigurationSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
        <Field.Label>Country</Field.Label>
        <Field.Select open
          defaultValue="us"
          items={[
            { label: 'Canada', value: 'ca' },
            { label: 'United States', value: 'us' },
            { label: 'Mexico', value: 'mx' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
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
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="us">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>United States</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="mx">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Mexico</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
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
