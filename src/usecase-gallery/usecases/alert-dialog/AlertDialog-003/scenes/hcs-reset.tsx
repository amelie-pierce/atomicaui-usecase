import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// HcsResetDialog: a modal Dialog at scale "sm", 560px wide (a scene-local inline width, since there is no 560 width token) with its backdrop and viewport, the raised warning Title, the close X, Cancel and a solid secondary Reset.
export default function ResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm' }}>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
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
