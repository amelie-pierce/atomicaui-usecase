import type { ContextProps } from '../../../../types';
import { Checkbox, Type, View } from '../../../../kit';

// PBS print view (src/PrintView.tsx): each selection is a column (gap 8) with a Type l4 title (14px) over one Checkbox, and the app passes `disabled`, so the box is grey; the scene shows it enabled. The title is a Type, not a Label, so it is smaller and bolder than the input panel's (Checkbox-002). Left out: the other selections of the print view and the Post Orientation column.
export default function PbsPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Type role="l4">Lumber Finish</Type>
      <Checkbox
        defaultSelected
        aui={{
          states: {
            unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
            selected: { paint: 'solid', color: 'primary' },
          },
        }}
      >
        <Checkbox.Label>Rough Sawn</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
