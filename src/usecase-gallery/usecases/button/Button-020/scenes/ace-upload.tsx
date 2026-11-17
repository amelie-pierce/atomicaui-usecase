import type { ContextProps } from '../../../../types';
import { Dialog, FileUpload } from '../../../../kit';

// ACE OpenFromDeviceDialog (PFD, PBS, HS, FD, AGPD and RWS write the same dialog; FD spells the Cancel as a plain Button, which looks the same): the footer holds one default Cancel, alone at the end, and the close X in the Title does the same.
export default function AceUploadScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Upload JSON File
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <FileUpload multiple={false} messages={{ idle: { text: 'Drop files here', action: 'Browse' } }} />
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button>Cancel</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
