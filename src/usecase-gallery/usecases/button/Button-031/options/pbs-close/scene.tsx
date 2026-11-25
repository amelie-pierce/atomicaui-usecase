import type { ContextProps } from '../../../../../types';
import { Dialog, Type, View } from '../../../../../kit';

// PBS HeaderClose (the Remove and Duplicate dialogs): the dialog has no Title; the close X sits alone in a row above the body, pushed to the end with justifyContent.
export default function PbsCloseScene({ host }: ContextProps) {
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
              <Type as="p" role="p3">Are you sure you want to delete Connection 1</Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
