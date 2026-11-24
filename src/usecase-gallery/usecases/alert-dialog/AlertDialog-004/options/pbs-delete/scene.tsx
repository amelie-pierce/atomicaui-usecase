import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';

// PBS RemoveDialog: no Title; a header row holds only the close X at the end. The footer is the default Close, a Spacer, then a solid error Delete at the far end.
export default function PbsDeleteScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
              <Dialog.Close aria-label="Close" />
            </View>
            <Dialog.Body>
              <Dialog.Description>Are you sure you want to delete Connection 1</Dialog.Description>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Close</Dialog.Button>
              <Dialog.Spacer />
              <Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
