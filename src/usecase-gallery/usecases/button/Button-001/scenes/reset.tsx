import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// Reset Inputs confirmation. The app uses an AlertDialog at 560px; the vendored AlertDialog is modal, so
// this is the same shape built from a non-modal Dialog at the kit default width.
export default function ResetScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }}>
          <Dialog.Title aui={{ color: 'raised' }}>
            <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
            Warning: Reset Inputs?
            <Dialog.Spacer />
            <Dialog.Close />
          </Dialog.Title>
          <Dialog.Description>All inputs return to their default values. This cannot be undone.</Dialog.Description>
          <Dialog.Actions>
            {children}
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog>
  );
}
