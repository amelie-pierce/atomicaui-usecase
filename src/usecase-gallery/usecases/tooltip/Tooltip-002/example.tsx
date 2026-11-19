import { IconButton, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<IconButton name="crosshairs" aria-label="Reset view" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
        <Tooltip.Portal>
          <Tooltip.Positioner side="left" sideOffset={8}>
            <Tooltip.Popup>Reset view</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
