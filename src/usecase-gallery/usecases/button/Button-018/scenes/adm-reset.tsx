import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ADM ResetDialog: a Dialog at the default scale, 480px wide (a scene-local inline width, since there is no 480 width token) with the raised warning Title, the close X, Cancel and a solid secondary Reset.
export default function ResetScene({ children, host }: ContextProps) {
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
              {children}
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
