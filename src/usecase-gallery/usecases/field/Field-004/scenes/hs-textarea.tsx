import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The multi-line field of the Send feedback form of HS (src/hs/ShellExtras.tsx), the same field of PFD, RWS and AGPD (their ShellDialogs.tsx), PBS (src/WorkspaceTools.tsx), ACE, ADM and FD (their feedback dialogs), HCS (src/components/F01Experience.tsx, a bare Textarea) and ADC (src/adc/components/ProjectInfoField.tsx): a Field with the label stacked over a Field.Textarea, which draws its own 1px outlined, 4px radius frame (no Field.Control around it).
// The apps differ only in rows (HS, PFD, RWS, AGPD, PBS five; ACE, ADM and FD seven; HCS four; ADC two), the placeholder and resizable="vertical", none of which changes the look; the scene keeps five rows.
// Left out: the required asterisk, the help trigger beside the label, the placeholder, the error line (Field-003) and the form around it; the apps show the field enabled.
export default function HsScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Textarea rows={5} />
      </Field>
    </View>
  );
}
