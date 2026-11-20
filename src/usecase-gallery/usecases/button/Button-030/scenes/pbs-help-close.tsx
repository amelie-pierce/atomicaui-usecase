import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../kit';

// PBS HelpPopover (src/InputFields.tsx): the circle-question trigger (a Button at profile "square-compact") opens a 320px popup above it (top, 4px offset).
// The popup is a row: the help text fills it and the close X sits at its end, a scale "xs" IconButton with no color of its own.
export default function PbsHelpCloseScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square-compact', shape: 'soft' }} />}
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
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', alignItems: 'start', gap: '8', width: '320' } }}
                />
              }
            >
              <Type as="p" role="p3" aui={{ sx: { flex: 'fill' } }}>Select the base material of the member.</Type>
              <IconButton name="xmark" aria-label="Close" aui={{ scale: 'xs', paint: 'text', profile: 'square-compact', shape: 'soft' }} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
