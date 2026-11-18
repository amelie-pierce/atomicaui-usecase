import type { ContextProps } from '../../../../types';
import { View } from '../../../../kit';

// HCS and HS Group by model (src/components/ColumnVisibility.tsx, src/hs/ColumnVisibility.tsx): a labelled Switch at the foot of the Configure columns popup, selected fill primary solid. Left out: the search field and the column list above it, and the Reset and Apply row below.
export default function HcsLabelledScene({ children }: ContextProps) {
  return (
    <View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }}>
      {children}
    </View>
  );
}
