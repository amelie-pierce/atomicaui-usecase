import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Dialog, Type } from '../../../../kit';

// ADM Welcome dialog (src/features/top-navigation/components/Tutorials.tsx): a 384px Dialog (the --aui-dialog-width variable, as the app sets it) with a Title and close X, the welcome text in the Body and the footer Close and Start Walkthrough. FD writes the same footer in its Getting Started dialog. The footer is the Cancel and Confirm pair: a default Dialog.Button (gray, here labelled Close) and a solid secondary one (here Start Walkthrough); the app closes the dialog itself, so both use dismiss={false}.
export default function AdmWelcomeScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm' }} style={{ '--aui-dialog-width': 'var(--p-px-384)' } as CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Welcome to ADM
              <Dialog.Spacer />
              <Dialog.Close aui={{ scale: 'sm' }} aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <Type as="p" role="p2">Welcome to the Anchor Designer.</Type>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button dismiss={false}>Close</Dialog.Button>
              <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Start Walkthrough</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
