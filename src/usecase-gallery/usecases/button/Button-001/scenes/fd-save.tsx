import type { ContextProps } from '../../../../types';
import { Button, Dialog, Field, View } from '../../../../kit';

// FD save-template Modal: a raised Title with the close X, and a footer of two plain Buttons: the default Cancel and a primary (orange) Save that stays disabled until the name is filled. FD writes Button, not Dialog.Button.
export default function FdSaveScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Save as Template" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Input placeholder="Please enter a name" aria-label="Please enter a name" />
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Button>Cancel</Button>
              <Button aui={{ color: 'primary' }} disabled>Save</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
