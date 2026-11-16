import type { ContextProps } from '../../../../types';
import { Dialog, Field, Type, View } from '../../../../kit';

// The feedback dialog: one Submit, alone at the end of the footer; there is no Cancel (the title X closes it).
export default function FeedbackScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft', sx: { width: '384' } }}>
          <Dialog.Title aui={{ color: 'raised' }}>
            Send feedback
            <Dialog.Spacer />
            <Dialog.Close />
          </Dialog.Title>
          <Dialog.Description>Tell us about your experience.</Dialog.Description>
          <Dialog.Body aui={{ profile: 'default' }}>
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
              <Type as="p" role="p3">Prefer to call? 800-000-0000</Type>
              <Field aui={{ scale: 'sm' }}>
                <Field.Label>Email</Field.Label>
                <Field.Control><Field.Input type="email" required placeholder="name@example.com" /></Field.Control>
              </Field>
              <Field aui={{ scale: 'sm' }}>
                <Field.Label>Summary</Field.Label>
                <Field.Control><Field.Input required placeholder="One line" /></Field.Control>
              </Field>
              <Field aui={{ scale: 'sm' }}>
                <Field.Label>Description</Field.Label>
                <Field.Textarea rows={4} required placeholder="What happened?" />
              </Field>
            </View>
          </Dialog.Body>
          <Dialog.Actions>
            <Dialog.Button dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Submit</Dialog.Button>
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog>
  );
}
