import type { ContextProps } from '../../../../types';
import { Dialog, View } from '../../../../kit';
import { MockLicenceText } from '../../../../mock-data';

// ADM licence gate (src/features/eula/components/EulaGate.tsx; ACE, PFD, PBS, HS, FD, AGPD and RWS write the same frame): a popup that fills the stage, a plain Title (scale sm, not raised) with the close X that also declines, then the scrolling Body. ACE puts a Description line under the Title (here it is body text); HS, ACE and FD add a Country field above the text (the ACE one is Select-004), and PBS hides the close X. The footer (Dialog-007) is left out.
export default function AdmLicenceScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
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
