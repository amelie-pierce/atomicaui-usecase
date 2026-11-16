import type { ContextProps } from '../types';
import { Dialog, Field, Type } from '../kit';

// Static stand-ins for the three dialogs the real app shows. Only the Reset footer takes the example;
// the Accept and Feedback footers are written out (Accept is disabled until the licence is read).
export default function DialogContext({ children, host }: ContextProps) {
  return (
    <>
      <Dialog open modal={false}>
        <Dialog.Portal container={host}>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close />
            </Dialog.Title>
            <Dialog.Description>All inputs return to their default values.</Dialog.Description>
            <Dialog.Actions>
              {children}
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog>
      <Dialog open modal={false}>
        <Dialog.Portal container={host}>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              License Agreement
              <Dialog.Spacer />
              <Dialog.Close />
            </Dialog.Title>
            <Dialog.Description>Review and accept to start using the app.</Dialog.Description>
            <Dialog.Body aui={{ profile: 'default' }}>
              <Type role="p3" as="p">By using this application you agree to the terms of this license.</Type>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button dismiss={false}>Do Not Accept</Dialog.Button>
              <Dialog.Button dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Accept</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog>
      <Dialog open modal={false}>
        <Dialog.Portal container={host}>
          <Dialog.Popup initialFocus={false} aui={{ sx: { width: '384' } }}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close />
            </Dialog.Title>
            <Dialog.Description>Tell us about your experience.</Dialog.Description>
            <Dialog.Body aui={{ profile: 'default' }}>
              <Field>
                <Field.Label>Email</Field.Label>
                <Field.Input type="email" />
              </Field>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Submit</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
