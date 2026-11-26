import { Dialog } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="delete" dismiss={false} aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
