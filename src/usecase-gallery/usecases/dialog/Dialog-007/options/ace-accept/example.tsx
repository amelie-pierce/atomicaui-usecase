import { Dialog, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';
import { MockLicenceText } from '../../../../../mock-data';

export default function Example() {
  const host = useStageHost();
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
              <View aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
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
