import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ADM ResetDialog (ACE writes the same dialog at the default width and without the close X; only the width differs): an AlertDialog capped at 480px (the --aui-width variable, as the app sets it) with a raised warning Title and a close X; the footer is the default Cancel and a secondary solid Reset.
export default function AceResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(480px, calc(100vw - var(--p-px-48)))' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button>Cancel</Dialog.Button>
              <Dialog.Button aui={{ color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
