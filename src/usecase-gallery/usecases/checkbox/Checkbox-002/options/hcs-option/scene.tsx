import type { ContextProps } from '../../../../../types';
import { Checkbox, View } from '../../../../../kit';

// HCS, HS, FD and ADC input panels (HCS src/App.tsx Galvanized, HS src/hs/InputFields.tsx Same inputs as Left Hip, FD src/components/InputPane.jsx Predrill and the wood structural panel, ADC src/adc/components/InputSections.tsx Equal Spacing and the option list): the Checkbox sits alone in the column of the input section, its Checkbox.Label to its right. Left out: the sibling fields, HCS's muted note under Galvanized and the other options of the ADC list.
export default function HcsOptionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
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
        <Checkbox.Label aui={{ scale: 'sm' }}>Same inputs as Left Hip</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
