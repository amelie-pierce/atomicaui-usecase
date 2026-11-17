import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ACE dialogs (ADM, PFD, PBS, HS, FD, AGPD and RWS write the same Title): a raised Title at the default scale with the Spacer pushing the close X, which sets no aui, to the end.
export default function AceCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Upload JSON File
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Upload JSON File" />
            </Dialog.Title>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
