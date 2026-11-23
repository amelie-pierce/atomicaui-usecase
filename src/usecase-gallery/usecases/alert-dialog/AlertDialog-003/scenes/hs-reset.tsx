import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// HS reset dialog (FD copies it): a 384px Dialog with a plain Title (not raised), the close X, and a Spacer between Cancel and Reset so the two sit at opposite ends of the footer.
export default function HsResetScene({ host }: ContextProps) {
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
