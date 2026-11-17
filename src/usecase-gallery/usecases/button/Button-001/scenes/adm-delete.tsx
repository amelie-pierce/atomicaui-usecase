import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Dialog } from '../../../../kit';

// ADM NewFromTemplateDialog delete confirm: an AlertDialog capped at 480px (the --aui-width variable, as the app sets it) with a raised warning Title and no close X; the footer is the default Cancel and a solid error Delete.
export default function AdmDeleteScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(480px, calc(100vw - var(--p-px-48)))' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button>Cancel</Dialog.Button>
              <Dialog.Button aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
