import { Dialog, Field, Input, Textarea, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" />
            </Dialog.Title>
            <Dialog.Body>
              <form id="feedback-form">
                <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                  <Field>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" required />
                  </Field>
                  <Field>
                    <Field.Label>Description</Field.Label>
                    <Textarea required rows={4} />
                  </Field>
                </View>
              </form>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel" dismiss={false}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="send" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
