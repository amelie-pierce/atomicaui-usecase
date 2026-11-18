import type { ContextProps } from '../../../../types';
import { Radio, RadioGroup, Tooltip, View } from '../../../../kit';

// The view mode radios of the PBS viewer (src/Viewer.tsx): a row RadioGroup (gap 8) whose radios are each wrapped in a Tooltip trigger (a span, closeOnClick off), top, 4px offset.
// Shown with the Perspective tooltip open; left out: the Reset View button, the Object Visibility checkboxes and the 3D canvas; the app shows the group enabled.
const TOGGLE_STATES = {
  unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
  selected: { paint: 'solid', color: 'primary' },
} as const;

export default function PbsProjectionScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 6)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <RadioGroup defaultValue="perspective" aria-label="View mode" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexDirection: 'row', gap: '8' } }}>
        <Tooltip.Provider>
          <Tooltip open>
            <Tooltip.Trigger closeOnClick={false} render={<span />}>
              <Radio value="perspective" aui={{ scale: 'sm', states: TOGGLE_STATES }}>
                <Radio.Label>Perspective</Radio.Label>
              </Radio>
            </Tooltip.Trigger>
            <Tooltip.Portal container={host}>
              <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Tooltip.Popup>Realistic 3D view with depth and perspective.</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger closeOnClick={false} render={<span />}>
              <Radio value="ortho" aui={{ scale: 'sm', states: TOGGLE_STATES }}>
                <Radio.Label>Orthographic</Radio.Label>
              </Radio>
            </Tooltip.Trigger>
            <Tooltip.Portal container={host}>
              <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Tooltip.Popup>True-scale view with no perspective distortion.</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
        </Tooltip.Provider>
      </RadioGroup>
    </View>
  );
}
