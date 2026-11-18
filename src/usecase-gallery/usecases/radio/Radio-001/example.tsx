import { Radio, RadioGroup, Tooltip } from '../../../kit';

const TOGGLE_STATES = {
  unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
  selected: { paint: 'solid', color: 'primary' },
} as const;

export default function Example() {
  return (
    <RadioGroup defaultValue="perspective" aria-label="View mode" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexDirection: 'row', gap: '8' } }}>
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger closeOnClick={false} render={<span />}>
            <Radio value="perspective" aui={{ scale: 'sm', states: TOGGLE_STATES }}>
              <Radio.Label>Perspective</Radio.Label>
            </Radio>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="top" sideOffset={4}>
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
          <Tooltip.Portal>
            <Tooltip.Positioner side="top" sideOffset={4}>
              <Tooltip.Popup>True-scale view with no perspective distortion.</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </RadioGroup>
  );
}
