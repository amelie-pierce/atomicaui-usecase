import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// ACE EulaGate (ADM, PFD, HS, FD, AGPD, RWS and PBS render the same dialog without the Description line, which is body text; HS and FD add a Country field, left out; PBS hides the close X): the licence dialog with a plain Title (scale sm, not raised), a Description, the close X that also declines, and the Do Not Accept / Accept pair. Accept is enabled once the text is read to the end.
export default function AceAcceptScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Adhesive Cartridge Estimator: Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using ACE.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
