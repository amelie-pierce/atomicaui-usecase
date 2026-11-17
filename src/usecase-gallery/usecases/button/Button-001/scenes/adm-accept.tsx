import type { ContextProps } from '../../../../types';
import { Dialog, View } from '../../../../kit';
import { MockLicenceText } from '../../../../mock-data';

// ADM EulaGate (PFD, AGPD and RWS write the same dialog): a plain Title (scale sm, not raised) with the close X that also declines, no Description, and the Do Not Accept / Accept pair, Accept always enabled.
export default function AdmAcceptScene({ host }: ContextProps) {
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
              <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
