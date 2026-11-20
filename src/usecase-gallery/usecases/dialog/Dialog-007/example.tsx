import type { CSSProperties } from 'react';
import { Dialog, Type } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
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
