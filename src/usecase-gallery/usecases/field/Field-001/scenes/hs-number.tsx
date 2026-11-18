import type { ContextProps } from '../../../../types';
import { Field, Type, View } from '../../../../kit';

// The number input of HS (src/hs/InputFields.tsx), the same field of PFD (src/pfd/fields.tsx NumberInputField) and RWS (src/rws/inputs.tsx Control): a label-above Field holding a Field.Control with a Field.Input at the end and the unit after it as a mono role l4 text (rendered 14px, weight 600).
// PFD writes the unit as Symbol role l4 and RWS as Type l4 around a Symbol; both render the same 14px 600 mono unit, so they share this scene.
// Left out: the help trigger beside the label, the error line, the feet-and-inches and text variants of HS; the apps show the field enabled.
export default function HsNumberScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm' }}>
          <Field.Input defaultValue="650" aria-label="Fc perp" inputMode="decimal" aui={{ sx: { textAlign: 'end' } }} />
          <Type as="span" role="l4" family="mono">psi</Type>
        </Field.Control>
      </Field>
    </View>
  );
}
