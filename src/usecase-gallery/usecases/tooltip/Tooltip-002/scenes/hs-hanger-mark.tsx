import type { ContextProps } from '../../../../types';
import { Button, Tooltip, Type, View } from '../../../../kit';

// HS SlopeCalculator (src/hs/SlopeCalculator.tsx line 158): a mark on the drawing is a Button (scale sm, color secondary, paint solid) with a short label; it is the trigger and its popup, kit default, at the default side with a 4px offset,
// holds a bold title and an image 150px wide in a 160px View (shown with a representative connection image). Shown open; the scene keeps one mark.
export default function HsHangerMarkScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', paddingBlockStart: 'calc(var(--p-px-16) * 10)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Button data-ug-part="trigger" aria-label="Hanger mark A" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }} />}>A</Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>
                <View aui={{ paint: 'text', sx: { width: '160' } }}>
                  <Type data-ug-part="preview-title" as="strong" role="l4" weight="bold">Hanger A</Type>
                  <svg viewBox="0 0 192 128" role="img" aria-label="Hanger A connection preview" style={{ width: 'calc(var(--p-px-96) + var(--p-px-48) + var(--p-px-6))', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
                </View>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
