import type { ContextProps } from '../../../../types';
import { Checkbox, Label, View } from '../../../../kit';

// PBS CheckboxChoice (src/InputFields.tsx) and AGPD CheckField (src/agpd/inputs.tsx): a View group with a 3px gap, a Label span (the title that names the group) above one Checkbox. Left out: the help icon and the lock of the label row, and the other fields of the section.
export default function PbsTitledScene(_props: ContextProps) {
  return (
    <View
      role="group"
      aria-label="Lumber Finish"
      aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', gap: '3' } }}
      style={{ inlineSize: 'min(100%, 280px)' }}
    >
      <Label as="span" aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4' } }}>
        Lumber Finish
      </Label>
      <Checkbox
        defaultSelected
        aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}
      >
        <Checkbox.Label>Rough Sawn</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
