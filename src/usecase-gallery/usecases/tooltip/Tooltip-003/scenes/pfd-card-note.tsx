import type { ContextProps } from '../../../../types';
import { Tooltip, Type, View } from '../../../../kit';

// PFD CardTooltip (src/pfd/SelectionCards.tsx line 118): a selection card (a View as button, min 96px, an image over its label) is the trigger; the Provider has delay 0 so the note opens at once. The popup is the kit default,
// at the default side with a 4px offset, up to 384px wide. The image is representative. Shown open; the scene keeps one card.
export default function PfdCardNoteScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip.Provider delay={0}>
        <Tooltip open>
          <Tooltip.Trigger
            render={<View data-ug-part="trigger" as="button" aria-label="Embedded Strap" aui={{ color: 'surface', paint: 'fixed', shape: 'soft', sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '96', minWidth: '96', gap: '4' } }} {...{ type: 'button' }} />}
          >
            <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-64)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
            <Type data-ug-part="card-label" as="span" role="p3">Embedded Strap</Type>
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
