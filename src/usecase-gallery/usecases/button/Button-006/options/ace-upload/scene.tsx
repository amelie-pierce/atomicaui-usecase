import type { ContextProps } from '../../../../../types';
import { Dialog, FileUpload } from '../../../../../kit';

// ACE OpenFromDeviceDialog (PFD, PBS, HS, FD, AGPD and RWS write the same dialog; FD spells the Cancel as a plain Button, which looks the same): the footer holds one default Cancel, alone at the end, and the close X in the Title does the same.
export default function AceUploadScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Upload JSON File
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body data-ug-part="upload-body">
              <FileUpload multiple={false} messages={{ idle: { text: 'Drop files here', action: 'Browse' } }} />
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-footer">
              <Dialog.Button>Cancel</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
