import { Dialog, Type } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Calculation Report
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="preview-text" as="p" role="p3">
                The preview of the report goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
