import type { ContextProps } from '../../../../types';
import { Button, ContainedImage, Tooltip, Type, View } from '../../../../kit';

// HS SlopeCalculator (src/hs/SlopeCalculator.tsx line 158): a mark on the drawing is a Button (scale sm, color secondary, paint solid) with a short label; it is the trigger and its popup, kit default, at the default side with a 4px offset,
// holds a bold title and an image 150px wide in a 160px View (shown with a representative connection image). Shown open; the scene keeps one mark.
export default function HsHangerMarkScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', paddingBlockStart: 'calc(var(--p-px-16) * 10)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Button aria-label="Hanger mark A" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }} />}>A</Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>
                <View aui={{ paint: 'text', sx: { width: '160' } }}>
                  <Type as="strong" role="l4" weight="bold">Hanger A</Type>
                  <ContainedImage src="/images/tooltip-connection.svg" alt="" fit="contain" ratio="4:3" style={{ width: 'calc(var(--p-px-96) + var(--p-px-48) + var(--p-px-6))' }} />
                </View>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
