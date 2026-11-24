import { Dialog, Field, View } from '../../../../../kit';
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
            <Dialog.Body>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Label>Template name</Field.Label>
                  <Field.Control>
                    <Field.Input type="text" placeholder="Please enter a name" />
                  </Field.Control>
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="save" dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Save</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
