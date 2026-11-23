import { Dialog, Field, Input, Textarea, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Tell us about your experience.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <form id="feedback-form">
                <View data-ug-part="form-column" aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '16', minWidth: '0' } }}>
                  <Field aui={{ scale: 'sm', sx: { flex: 'none', width: 'fill' } }}>
                    <Field.Label aui={{ scale: 'sm' }}>Email</Field.Label>
                    <Input aui={{ scale: 'sm' }} type="email" required />
                  </Field>
                  <Field aui={{ scale: 'sm', sx: { flex: 'none', width: 'fill' } }}>
                    <Field.Label aui={{ scale: 'sm' }}>Description</Field.Label>
                    <Textarea aui={{ scale: 'sm' }} required rows={4} />
                  </Field>
                </View>
              </form>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="send" dismiss={false} type="submit" form="feedback-form" aui={{ scale: 'sm', color: 'secondary' }}>Submit</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
