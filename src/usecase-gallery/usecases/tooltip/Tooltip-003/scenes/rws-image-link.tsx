import type { ContextProps } from '../../../../types';
import { Tooltip, Type, View } from '../../../../kit';

// RWS ImageLink (src/rws/output.tsx line 678): a text link is the trigger (the link itself, `render` of the Type anchor); hover or focus opens the popup, kit default, at the default side with a 4px offset,
// holding an image 192px wide (shown with a representative connection image). Shown open; the scene keeps one link.
export default function RwsImageLinkScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', paddingBlockStart: 'calc(var(--p-px-16) * 10)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<Type as="a" href="#" onClick={(event) => event.preventDefault()} role="l4" color="secondary" aui={{ sx: { textDecoration: 'underline', whiteSpace: 'nowrap' } }} />}>Connection detail</Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '192', height: '128', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                  <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: '100%', aspectRatio: '4 / 3' }}>
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
