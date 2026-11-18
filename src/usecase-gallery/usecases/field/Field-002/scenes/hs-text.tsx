import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The text field of HS (src/hs/InputFields.tsx TextField), the same field of every other app: a Field with the label stacked over one 28px outlined control holding a Field.Input.
// PBS (src/InputFields.tsx), RWS, AGPD and PFD (their ShellDialogs.tsx feedback forms), ACE, ADM and FD (the feedback and save-as-template dialogs) and ADC (src/adc/components/ProjectInfoField.tsx) write the same Field.Control > Field.Input; HCS (src/components/F01Experience.tsx) writes a bare Input in the same Field and renders the same frame.
// The dialog forms leave the label-to-control gap at the default 6px and the input panels set 3px; a spacing difference only, so the scene keeps the 3px of the panels.
// Left out: the required asterisk, the help trigger beside the label, the placeholder, the error line (Field-003), the feedback form's other fields and the dialog around it; the apps show the field enabled.
export default function HsTextScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Connection ID</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="C-1042" aria-label="Connection ID" />
        </Field.Control>
      </Field>
    </View>
  );
}
