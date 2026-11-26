import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// ACE EulaGate.tsx: the country choice sits in the licence agreement dialog before acceptance.
export default function AceLicenceCountryScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop data-ug-part="licence-backdrop" />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} data-ug-part="licence-dialog" aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title data-ug-part="licence-title" aui={{ scale: 'sm' }}>
              Adhesive Cartridge Estimator: Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description data-ug-part="licence-description" aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using ACE.
            </Dialog.Description>
            <Dialog.Body data-ug-part="licence-body" aui={{ scale: 'sm' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <div data-ug-part="licence-copy"><MockLicenceText /></div>
                <div data-ug-part="licence-country">{children}</div>
              </View>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="licence-actions" aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
