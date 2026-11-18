import type { ContextProps } from '../../../../types';
import { ContainedImage, Tooltip, Type, View } from '../../../../kit';

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
                  <ContainedImage src="/images/tooltip-connection.svg" alt="" fit="contain" ratio="4:3" style={{ width: '100%' }} />
                </View>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
