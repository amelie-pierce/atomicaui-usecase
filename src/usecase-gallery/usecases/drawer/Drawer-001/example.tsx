import { Drawer, Menubar } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Drawer open modal={false} swipeDirection="right" disablePointerDismissal>
      <Drawer.Portal container={host}>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup aria-label="Navigation" aui={{ profile: 'no-padding', shape: 'none', sx: { width: '288', height: 'fill' } }}>
            <Drawer.Content>
              <Menubar orientation="vertical" aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fill' } }}>
                <Menubar.Button>Save to device</Menubar.Button>
                <Menubar.Button>Open from device</Menubar.Button>
                <Menubar.Button>About</Menubar.Button>
              </Menubar>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer>
  );
}
