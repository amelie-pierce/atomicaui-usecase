import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ACE ResetInputsAction: an AlertDialog at the default width with a raised warning Title and no close X; the footer is the default Cancel and a secondary solid Reset.
export default function AceResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
            </Dialog.Title>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button>Cancel</Dialog.Button>
              <Dialog.Button aui={{ color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
