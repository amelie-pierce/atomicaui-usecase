import { Dialog, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(840px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'surface' }}>
              REQUEST A QUOTE
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close REQUEST A QUOTE" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View as="form" aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '24', alignItems: 'start' } }}>
                <Type as="p" role="p3">
                  The form fields go here.
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
