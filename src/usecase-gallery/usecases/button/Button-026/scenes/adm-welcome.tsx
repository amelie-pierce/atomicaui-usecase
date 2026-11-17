import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Dialog, Type } from '../../../../kit';

// ADM Welcome dialog (src/features/top-navigation/components/Tutorials.tsx): a 384px Dialog (the --aui-dialog-width variable, as the app sets it) with a Title and close X, the welcome text in the Body and the footer Close and Start Walkthrough. FD writes the same footer in its Getting Started dialog.
export default function AdmWelcomeScene({ children, host }: ContextProps) {
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
              {children}
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
