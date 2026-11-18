import type { ContextProps } from '../../../../types';
import { View } from '../../../../kit';

// HCS, HS, FD and ADC input panels (HCS src/App.tsx Galvanized, HS src/hs/InputFields.tsx Same inputs as Left Hip, FD src/components/InputPane.jsx Predrill and the wood structural panel, ADC src/adc/components/InputSections.tsx Equal Spacing and the option list): the Checkbox sits alone in the column of the input section, its Checkbox.Label to its right. Left out: the sibling fields, HCS's muted note under Galvanized and the other options of the ADC list.
export default function HcsOptionScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      {children}
    </View>
  );
}
