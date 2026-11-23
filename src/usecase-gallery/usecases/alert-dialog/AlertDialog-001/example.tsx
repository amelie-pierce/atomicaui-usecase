import { Dialog } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(560px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm' }}>
              You are about to reset all input fields. This cannot be undone.
            </Dialog.Description>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="cancel" aui={{ scale: 'sm' }}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
