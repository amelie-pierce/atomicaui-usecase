import type { ContextProps } from '../../../../types';
import { Chip, View } from '../../../../kit';

// FD Results check categories (src/components/Results.jsx): a row of xs solid Chips with an icon, success with circle-check for a passed category, danger with circle-exclamation for a failed one (gap 8).
export default function FdChecksScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      {children}
      <Chip aui={{ color: 'danger', paint: 'solid', scale: 'xs' }}>
        <Chip.Icon name="circle-exclamation" />
        <Chip.Label>Bearing</Chip.Label>
      </Chip>
    </View>
  );
}
