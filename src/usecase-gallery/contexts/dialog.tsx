import type { ContextProps } from '../types';
import { Dialog } from '../kit';

export default function DialogContext({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Popup initialFocus={false}>
          <Dialog.Title>Reset filters?</Dialog.Title>
          <Dialog.Body>
            <Dialog.Description>Your filters return to their defaults.</Dialog.Description>
          </Dialog.Body>
          <Dialog.Actions align="end">
            {children}
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog>
  );
}
