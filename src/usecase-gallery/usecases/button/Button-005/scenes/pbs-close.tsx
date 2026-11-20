import type { ContextProps } from '../../../../types';
import { Dialog, Type, View } from '../../../../kit';

// PBS HomeScreenDialog (AGPD and RWS write the same "Add to Home Screen" ShellDialog): an info dialog whose footer is one default Close, alone at the end.
export default function PbsCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Add to Your Home Screen
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Add to Your Home Screen" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Type as="p" role="p3">
                  On Android devices, tap the menu icon followed by tapping &quot;Add to Home Screen.&quot;
                </Type>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button>Close</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
