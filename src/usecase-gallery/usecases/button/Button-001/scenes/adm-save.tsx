import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Dialog, Field, View } from '../../../../kit';

// ADM SaveAsTemplateDialog: a 480px popup (the --aui-width variable, as the app sets it) with a raised Title and the close X, and a footer of the default Cancel and a secondary solid Save that stays disabled until the name is valid.
export default function AdmSaveScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(480px, calc(100vw - var(--p-px-48)))' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
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
