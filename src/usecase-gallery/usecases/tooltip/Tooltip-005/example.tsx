import { Button, ContainedImage, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button aria-label="Show in 3D" aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80' } }} />}>
          <ContainedImage src="/images/tooltip-connection.svg" alt="" fit="contain" ratio="4:3" style={{ width: 'var(--p-px-72)' }} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="right" sideOffset={4}>
            <Tooltip.Popup>Show in 3D</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
