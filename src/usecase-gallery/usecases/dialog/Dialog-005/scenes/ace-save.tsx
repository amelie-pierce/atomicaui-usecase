import type { ContextProps } from '../../../../types';
import { Dialog, Field, View } from '../../../../kit';

// ACE SaveAsTemplateDialog (HS writes the same dialog and ADM the same at 480px; only the width differs): a default-width popup with a raised Title with the close X, and a footer of the default Cancel and a secondary solid Save that stays disabled until the name is valid.
export default function AceSaveScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Label>Template name</Field.Label>
                  <Field.Control>
                    <Field.Input type="text" placeholder="Please enter a name" />
                  </Field.Control>
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button>Cancel</Dialog.Button>
              <Dialog.Button dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Save</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
