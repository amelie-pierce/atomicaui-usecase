import type { ContextProps } from '../../../../types';
import { Checkbox, Type, View } from '../../../../kit';

// HCS 3D view controls (src/App.tsx, the Object Visibility group in the output pane): a column (gap 8) with an "Object Visibility" title in Type l3 semi-bold (16px) over the Checkboxes, each Checkbox.Label at scale "sm". Left out: the Reset view button, the Perspective and Orthographic radios, the other toggles and the disabled state the app gives Connector and Connector Detail before a beam is selected (the scene shows them enabled).
export default function HcsVisibilityScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l3" weight="semi-bold">
        Object Visibility
      </Type>
      <Checkbox defaultSelected aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supporting Beam</Checkbox.Label>
      </Checkbox>
      <Checkbox defaultSelected aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supported Beam</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
