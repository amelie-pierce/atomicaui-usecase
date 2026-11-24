import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The invalid field of HS (src/hs/InputFields.tsx TextField), the same of PBS (src/InputFields.tsx), PFD (src/pfd/fields.tsx), FD (src/components/ui.jsx), AGPD (src/agpd/controls.tsx) and ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the Field is invalid and the control keeps its slate outline; a Field.Error with color "error" at scale "sm" sits under the control as 16px red text.
// The feedback and save-as-template dialogs of ACE, ADM, FD, HS, PFD, RWS and AGPD, and the ADM number row, write a Field.Error without the error colour and render the message in the body colour; that is the app-side defect left out of the scene.
// Left out: the label's help trigger, the required asterisk, the unit and the other fields of the form; the apps show the field enabled.
export default function HsErrorScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field invalid aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Quantity</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="0" aria-label="Quantity" aria-invalid />
        </Field.Control>
        <Field.Error match aui={{ color: 'error', scale: 'sm' }}>Enter a whole number from 1 to 999.</Field.Error>
      </Field>
    </View>
  );
}
