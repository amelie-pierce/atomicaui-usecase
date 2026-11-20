import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, Popover, Type, View } from '../../../../kit';

// PFD Help (src/pfd/fields.tsx): the circle-question trigger opens the popup above it (top, 4px offset); the popup is a View column (surface, solid, soft, elevation 4, gap 8, up to 384px).
// The close is a Button at profile "square" (not square-compact), alone in its own row at the end, above the help text. The optional image is left out.
export default function PfdHelpCloseScene({ host }: ContextProps) {
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
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', maxWidth: '384' } }}
                />
              }
            >
              <Button aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
                <ContainedIcon name="xmark" />
              </Button>
              <Type as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
