import { Dialog, Type } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Templates
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <Type data-ug-part="template-text" as="p" role="p3">
                The list of templates goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
