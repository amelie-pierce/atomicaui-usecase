import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Popover, Type, View } from '../../../../../kit';

// AGPD LockHint (src/agpd/inputs.tsx): the lock trigger (a Button at profile "square") after a field label opens a 288px popup above it (top, 4px offset) on hover or focus.
// The popup is a View column: a line saying which option controls the field, then the action, an xs primary text Button at the start. Shown open.
export default function AgpdLockHintScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<Button aria-label="Thickness is locked" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
          <ContainedIcon name="lock" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Thickness is locked"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '288' } }}
                />
              }
            >
              <Type as="p" role="p3">
                Controlled by <Type as="strong" weight="semi-bold">Plate Option</Type> — currently “All Plates based on the stock model”.
              </Type>
              <View aui={{ paint: 'text', profile: 'no-padding' }}>{children}</View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
