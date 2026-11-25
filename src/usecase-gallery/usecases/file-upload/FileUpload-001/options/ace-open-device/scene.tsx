import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ACE OpenFromDeviceDialog (src/features/file-persistence/ui/OpenFromDeviceDialog.tsx; PFD, PBS, HS, FD, AGPD and RWS write it through their ShellDialog, ADC in NewProjectDialog.tsx): a Dialog with a raised Title and close X, the FileUpload in the Body, and a Cancel in the Actions. The dropzone wording is app content.
export default function AceOpenDeviceScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Upload JSON file
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              {children}
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="dialog-cancel">Cancel</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
