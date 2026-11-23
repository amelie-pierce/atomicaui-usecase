import { Radio, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<span data-ug-part="trigger" />} tabIndex={0} aria-label="Selection unavailable for Model C-300" closeOnClick={false} style={{ display: 'inline-flex' }}>
          <Radio disabled selected={false} tabIndex={-1} aria-label="Model C-300" aui={{ scale: 'sm' }} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={4}>
            <Tooltip.Popup>Failed products can't be selected. See Why Not for the reason.</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
