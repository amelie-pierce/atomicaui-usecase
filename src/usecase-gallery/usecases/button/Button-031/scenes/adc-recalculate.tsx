import type { ContextProps } from '../../../../types';
import { IconButton, Type, View } from '../../../../kit';

// ADC results header (src/adc/Workspace.tsx): the Recalculate IconButton (warning solid soft xs, square profile) before the result values (N, V, N + V). Left out: the values' real data and the rest of the header.
export default function AdcRecalculateScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '16' } }}>
      <IconButton name="arrows-rotate" aria-label="Recalculate" title="Recalculate" aui={{ color: 'warning', paint: 'solid', shape: 'soft', profile: 'square', scale: 'xs' }} />
      <Type role="p3">N = -</Type>
      <Type role="p3">V = -</Type>
    </View>
  );
}
