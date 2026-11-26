import { Button, Dialog, Field, View } from '../../../../../kit';
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
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Control>
                    <Field.Input type="text" placeholder="Please enter a name" aria-label="Please enter a name" />
                  </Field.Control>
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Button data-ug-part="cancel">Cancel</Button>
              <Button data-ug-part="save" aui={{ color: 'primary' }} disabled>Save</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
