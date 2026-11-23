import { Dialog } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>Website Application License Agreement</Dialog.Title>
            <Dialog.Description>
              We can not continue without your agreement. To proceed, relaunch the application and accept the agreement.
            </Dialog.Description>
            <Dialog.Actions align="center">
              <Dialog.Button data-ug-part="relaunch" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Re-Launch</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
