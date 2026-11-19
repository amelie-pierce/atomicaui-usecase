import type { ContextProps } from '../../../../types';
import { Checkbox, View } from '../../../../kit';

// FD Why not details (src/components/RowExpansion.jsx, SolutionDetails): the details of an expanded result row are a column (default padding, gap 8) whose first child is the Checkbox, above the checks table; it starts unselected. Left out: the checks table, which the Checkbox filters (the app shows only failed and warning checks until it is selected).
export default function FdFilterScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Checkbox
        aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}
      >
        <Checkbox.Label>Show passed validations</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
