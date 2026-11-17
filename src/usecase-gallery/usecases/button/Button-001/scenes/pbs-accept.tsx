import type { ContextProps } from '../../../../types';
import { Dialog, View } from '../../../../kit';
import { MockLicenceText } from '../../../../mock-data';

// PBS LicenseGate: the same pair as the other apps, but the Title has no close X (the top bar hides it), so only Do Not Accept declines.
export default function PbsAcceptScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>Website Application License Agreement</Dialog.Title>
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
