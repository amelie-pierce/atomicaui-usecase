import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// AGPD FastenerToggle (src/agpd/inputs.tsx): the STN22 | SDWB segments sit over the Diameter / Style field they switch, with paint "text" so only the field's outline frames them. The segments hug their labels (6px inline padding) instead of filling a wide popover as in HS. The Select is shown as a plain Field.
export default function AgpdFastenerScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
      {children}
      <Field aui={{ scale: 'sm' }}>
        <Field.Control aria-label="Diameter and style" defaultValue="1/4 in, hex head" />
      </Field>
    </View>
  );
}
