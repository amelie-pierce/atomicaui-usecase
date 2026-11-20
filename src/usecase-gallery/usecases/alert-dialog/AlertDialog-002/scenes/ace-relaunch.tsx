import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ACE EulaGate decline (HS LicenseGate writes the same dialog): an AlertDialog drawn as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog), no close X, one solid secondary Button centred in the footer because it is the only way forward.
export default function AceRelaunchScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>Website Application License Agreement</Dialog.Title>
            <Dialog.Description>
              We can not continue without your agreement to the End User License Agreement (EULA). If you would like to proceed, relaunch the application, and accept the EULA.
            </Dialog.Description>
            <Dialog.Actions align="center">
              <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Re-Launch</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
