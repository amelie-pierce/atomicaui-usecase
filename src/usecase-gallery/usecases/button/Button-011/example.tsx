import { IconButton, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger
          render={
            <IconButton
              name="arrows-to-line"
              weight="regular"
              aria-label="Collapse all"
              aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }}
            />
          }
        />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" sideOffset={4}>
            <Tooltip.Popup aui={{ scale: 'sm' }}>Collapse all</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
