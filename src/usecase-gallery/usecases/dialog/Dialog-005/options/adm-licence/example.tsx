import { Dialog, Type } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <Type data-ug-part="licence-text" role="p2" aui={{ sx: { flex: 'none' } }}>
                Review the application licence agreement before continuing. Your acceptance is required to use this application.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
