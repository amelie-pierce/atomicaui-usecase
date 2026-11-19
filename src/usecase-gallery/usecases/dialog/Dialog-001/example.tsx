import { Dialog, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View aui={{ scale: 'sm', paint: 'text', sx: { width: '224', flex: 'none', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <Type as="strong" role="l4" weight="bold">
                  Release history
                </Type>
              </View>
              <View aui={{ scale: 'sm', paint: 'text', sx: { flex: 'fill', minWidth: '0' } }}>
                <Type as="p" role="p3">
                  Release notes
                </Type>
              </View>
            </View>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
