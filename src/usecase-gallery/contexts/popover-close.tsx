import type { ContextProps } from '../types';
import { Popover, Type, View } from '../kit';

// The help popover: an intro row with the close X at its top-right, then the notes. The popup surface is a View
// (surface, solid, soft, elevation 4); its width is fixed here (the app clamps it to the viewport).
export default function PopoverCloseContext({ children, host }: ContextProps) {
  return (
    <Popover open>
      <Popover.Portal container={host}>
        <Popover.Positioner anchor={host}>
          <Popover.Popup initialFocus={false}>
            <View
              aria-label="Download duration help"
              aui={{ scale: 'sm', color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '384' } }}
              style={{ maxInlineSize: '100%' }}
            >
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'start', gap: '8' } }}>
                <Type as="p" role="p3" style={{ flex: '1 1 auto' }}>Choose how long the load acts on the beam. Each option changes the allowable capacity.</Type>
                {children}
              </View>
              <Type as="p" role="p3"><strong>Short term</strong> - lasts minutes to a day.</Type>
              <Type as="p" role="p3"><strong>Normal</strong> - typical occupancy loads.</Type>
              <Type as="p" role="p3"><strong>Permanent</strong> - constant loads for the life of the structure.</Type>
            </View>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  );
}
