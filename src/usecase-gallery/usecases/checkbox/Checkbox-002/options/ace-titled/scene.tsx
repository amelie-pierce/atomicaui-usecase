import type { ContextProps } from '../../../../../types';
import { Checkbox, Fieldset } from '../../../../../kit';

// ACE estimator input panel (src/features/estimator/ui/EstimatorInputPanel.tsx, the water-filled holes and paste over both sides options): a Fieldset with a visible Legend above one Checkbox. The Fieldset keeps its own 12px gap between legend and box. Left out: the other fields of the section.
export default function AceTitledScene(_props: ContextProps) {
  return (
    <Fieldset aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Fieldset.Legend>Paste over both sides of crack</Fieldset.Legend>
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
        <Checkbox.Label aui={{ scale: 'sm' }}>Yes</Checkbox.Label>
      </Checkbox>
    </Fieldset>
  );
}
