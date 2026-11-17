import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// HCS dialogs: a raised Title at scale sm with the Spacer pushing the close X to the end, also at scale sm.
export default function HcsCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" aui={{ scale: 'sm' }} />
            </Dialog.Title>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
