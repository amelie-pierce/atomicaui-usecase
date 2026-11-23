import { IconButton, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<IconButton data-ug-part="trigger" name="gear" aria-label="Settings" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" sideOffset={4}>
            <Tooltip.Popup>Settings</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
