import type { ContextProps } from '../../../../types';
import { Field, Symbol, View } from '../../../../kit';

// The Input pane number field of HCS (src/App.tsx NumberField): a Field with the label stacked over one 28px outlined control, the value at the start and the unit a Symbol after it.
// Built from the one Field.Control (the control is the input, as the app writes it); the value keeps the control's start alignment, the unit is a 16px regular mono Symbol.
// Left out: the error line under the control and the other fields of the pane; the apps show the field enabled.
export default function HcsNumberScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Fc perp</Field.Label>
        <Field.Control aui={{ scale: 'sm', sx: { height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '8', paddingInlineEnd: '8', fontSize: '16', lineHeight: '20' } }} aria-label="Fc perp" defaultValue="650">
          <Symbol>psi</Symbol>
        </Field.Control>
      </Field>
    </View>
  );
}
