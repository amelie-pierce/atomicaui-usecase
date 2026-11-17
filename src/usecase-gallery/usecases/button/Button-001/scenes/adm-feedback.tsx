import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Dialog, Field, View } from '../../../../kit';

// ADM FeedbackDialog (FD writes the same dialog): a 560px popup (the --aui-width variable, as the app sets it) with a raised Title and the close X, and a footer of the default Cancel and a secondary solid Send; neither dismisses on its own.
export default function AdmFeedbackScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(560px, calc(100vw - var(--p-px-48)))' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Feedback Form
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Label>Email</Field.Label>
                  <Field.Control>
                    <Field.Input type="email" />
                  </Field.Control>
                </Field>
                <Field>
                  <Field.Label>Description</Field.Label>
                  <Field.Textarea rows={4} />
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button dismiss={false}>Cancel</Dialog.Button>
              <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
