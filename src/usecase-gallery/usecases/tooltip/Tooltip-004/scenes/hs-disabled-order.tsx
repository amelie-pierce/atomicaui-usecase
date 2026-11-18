import type { ContextProps } from '../../../../types';
import { Button, Tooltip, View } from '../../../../kit';

// HS OutputPane (src/hs/OutputPane.tsx line 215): a disabled Order Button (color secondary, paint solid, scale sm, soft) cannot be hovered, so an inline span around it (tabIndex 0 while disabled) is the Tooltip.Trigger;
// the popup is the kit default at the default side with a 4px offset and states why the order is blocked. The popup mounts only while the button is disabled. Shown open; the scene keeps the disabled button.
export default function HsDisabledOrderScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', paddingBlockStart: 'calc(var(--p-px-16) * 4)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<View as="span" aui={{ paint: 'text', sx: { display: 'inline' } }} />} tabIndex={0} aria-label="Select a result to order">
            <Button disabled aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>Order</Button>
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>Select a result to order.</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
