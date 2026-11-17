import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../kit';

// AGPD Help (src/agpd/inputs.tsx; RWS writes the same popup in src/rws/inputs.tsx): the circle-question trigger (a Button at profile "square") opens a 320px popup above it (top, 4px offset).
// The popup is a View column; the close X is an IconButton at scale "xs" with no other props, in its own row at the end above the help text. The optional diagram is left out.
export default function AgpdHelpCloseScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }}
                />
              }
            >
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
                <IconButton name="xmark" aria-label="Close" aui={{ scale: 'xs' }} />
              </View>
              <Type as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
