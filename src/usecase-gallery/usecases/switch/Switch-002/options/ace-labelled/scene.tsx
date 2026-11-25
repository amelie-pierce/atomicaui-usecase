import type { ContextProps } from '../../../../../types';
import { Dialog, Switch } from '../../../../../kit';

export default function AceLabelledScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>Feedback Form<Dialog.Spacer /><Dialog.Close aria-label="Cancel" /></Dialog.Title>
            <Dialog.Body data-ug-part="dialog-body">
              <Switch defaultSelected><Switch.Label>Send me a copy</Switch.Label></Switch>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-actions">
              <Dialog.Button dismiss={false}>Cancel</Dialog.Button>
              <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
