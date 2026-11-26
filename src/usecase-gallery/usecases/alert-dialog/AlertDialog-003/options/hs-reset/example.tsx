import { Dialog } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ sx: { width: '384' } }}>
            <Dialog.Title>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close reset" />
            </Dialog.Title>
            <Dialog.Body>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Spacer />
              <Dialog.Button data-ug-part="confirm" aui={{ color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
