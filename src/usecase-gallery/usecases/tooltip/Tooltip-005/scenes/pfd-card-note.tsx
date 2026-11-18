import type { ContextProps } from '../../../../types';
import { ContainedIcon, Tooltip, Type, View } from '../../../../kit';

// PFD CardTooltip (src/pfd/SelectionCards.tsx line 118): a selection card (a View as button, min 96px, an image over its label) is the trigger; the Provider has delay 0 so the note opens at once. The popup is the kit default,
// at the default side with a 4px offset, up to 384px wide. The apps draw a ContainedImage; the gallery uses a kit icon. Shown open; the scene keeps one card.
export default function PfdCardNoteScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider delay={0}>
        <Tooltip open>
          <Tooltip.Trigger
            render={<View as="button" aria-label="Embedded Strap" aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '96', minWidth: '96', gap: '4' } }} {...{ type: 'button' }} />}
          >
            <ContainedIcon name="image" aria-hidden />
            <Type as="span" role="p3">Embedded Strap</Type>
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup aui={{ sx: { maxWidth: '384' } }}>Use with a continuous strap along the plate.</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
