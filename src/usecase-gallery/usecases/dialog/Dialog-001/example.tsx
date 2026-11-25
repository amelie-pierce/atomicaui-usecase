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
              <span data-ug-part="title-text">About</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '224', flex: 'none', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                  Release history
                </Type>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { flex: 'fill', minWidth: '0' } }}>
                <Type data-ug-part="notes-text" as="p" role="p3">
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
