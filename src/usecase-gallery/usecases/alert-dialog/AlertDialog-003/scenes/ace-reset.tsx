import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ACE ResetInputsAction: a Dialog at the default scale and the default popup width, with the raised warning Title and no close X (the app writes none), Cancel and a solid secondary Reset.
export default function ResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
            </Dialog.Title>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button aui={{ scale: 'sm' }}>Cancel</Dialog.Button>
              <Dialog.Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
