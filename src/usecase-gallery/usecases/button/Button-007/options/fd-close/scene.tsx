import type { ContextProps } from '../../../../../types';
import { Button, Dialog, Type } from '../../../../../kit';

// FD "Explore More Applications" Modal: the footer is one plain Button with color "secondary" (a black fill), not the gray Dialog.Button the other apps use.
export default function FdCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Explore More Applications
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Close Explore More Applications" />
            </Dialog.Title>
            <Dialog.Body data-ug-part="dialog-body" aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <Type as="p" role="p3">Simpson Strong-Tie design applications.</Type>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-footer">
              <Button aui={{ color: 'secondary' }}>Close</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
