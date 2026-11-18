import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ADM licence gate (src/features/eula/components/EulaGate.tsx; ACE, PFD, PBS, HS, FD, AGPD and RWS write the same frame): a popup that fills the stage, a plain Title (scale sm, not raised) with the close X that also declines, then the scrolling Body. ACE puts a Description line under the Title (here it is body text); HS, ACE and FD add a Country field above the text (the ACE one is Select-003), and PBS hides the close X. The footer (Button-001) is left out.
export default function AdmLicenceScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              {children}
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
