import type { ContextProps } from '../../../../../types';
import { Drawer, Menubar, View } from '../../../../../kit';

// ACE phone navigation (src/features/top-navigation/ui/AceNavBar.tsx; HS TopBar.tsx is the source of the pattern and ADM, PFD, PBS, FD, AGPD and RWS write the same drawer): the top bar keeps one Menubar.IconButton, and its drawer opens flush under it (ACE 36px, ADM and HS 40px, a size) as a 288px no-padding Popup with a vertical Menubar of Menubar.Buttons. The drawer is non-modal and keeps its backdrop, so the bar toggle closes it.
export default function AceMobileNavScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ blockSize: '100%', inlineSize: '100%', alignSelf: 'stretch' }}>
      <Menubar aria-label="Top bar">
        <Menubar.IconButton name="xmark" aria-label="Close navigation" />
      </Menubar>
      <Drawer open modal={false} swipeDirection="right" disablePointerDismissal>
        <Drawer.Portal container={host}>
          <Drawer.Backdrop style={{ top: 36 }} />
          <Drawer.Viewport style={{ top: 36 }}>
            <Drawer.Popup aria-label="Navigation" aui={{ profile: 'no-padding', shape: 'none', sx: { width: '288', height: 'fill' } }}>
              <Drawer.Content>
                <Menubar orientation="vertical" aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fill' } }}>
                  <Menubar.Button>Save to device</Menubar.Button>
                  <Menubar.Button>Open from device</Menubar.Button>
                  <Menubar.Button>About</Menubar.Button>
                  <Menubar.Button>Print</Menubar.Button>
                </Menubar>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer>
    </View>
  );
}
