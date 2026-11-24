import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ADC NewProjectDialog (src/adc/components/NewProjectDialog.tsx): the New Project dialog (raised Title with close X, a Body) ends its Body with the User Templates CardGroup under the import dropzone and the clear-designs warning (left out).
export default function AdcNewProjectScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              New Project
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              {children}
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
