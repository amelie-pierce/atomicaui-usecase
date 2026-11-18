import type { ContextProps } from '../../../../types';
import { View } from '../../../../kit';

// FD Why not details (src/components/RowExpansion.jsx, SolutionDetails): the details of an expanded result row are a column (default padding, gap 8) whose first child is the Checkbox, above the checks table. Left out: the checks table, which the Checkbox filters (the app shows only failed and warning checks until it is selected).
export default function FdFilterScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      {children}
    </View>
  );
}
