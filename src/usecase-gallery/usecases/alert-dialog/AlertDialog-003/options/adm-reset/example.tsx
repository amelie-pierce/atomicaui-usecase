import { Dialog } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ width: 480 }}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel" aui={{ scale: 'sm' }}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
