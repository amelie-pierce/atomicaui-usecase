import { Button, ContainedImage, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button aui={{ scale: 'sm' }} />}>Preview</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4}>
            <Tooltip.Popup><ContainedImage src="/images/tooltip-connection.svg" alt="Connection detail" fit="contain" ratio="4:3" style={{ width: 'var(--p-px-192)' }} /></Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
