import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Comment row of the project info of ADC (src/adc/Workspace.tsx): a Field row aligned to the start with a 96px end-aligned label and a Field.Textarea filling the rest of the row.
// Left out: the Name and Quantity rows above it; the app shows the field enabled.
export default function AdcBesideScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'start', gap: '8', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>Comment</Field.Label>
        <Field.Textarea rows={5} aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }} />
      </Field>
    </View>
  );
}
