import type { ContextProps } from '../../../../types';
import { Dialog, View } from '../../../../kit';
import { MockLicenceText } from '../../../../mock-data';

// HCS licence dialog (src/components/F01Experience.tsx): a popup that fills the stage (width and height fill), a raised Title with the close X (Button-031), a Description line under it that does not scroll, then the scrolling Body holding the licence text. The footer (Do Not Accept and Accept, Dialog-007) is left out.
export default function HcsLicenceScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using the HCS prototype.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="licence-text" aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
