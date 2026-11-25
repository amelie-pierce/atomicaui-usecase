import { Dialog, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(360px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised', sx: { position: 'relative', justifyContent: 'center', paddingInlineStart: '40', paddingInlineEnd: '40' } }}>
              <span data-ug-part="title-text">Help Center</span>
              <Dialog.Close aria-label="Close Help Center" aui={{ scale: 'sm' }} style={{ position: 'absolute', insetInlineEnd: 'var(--p-px-8)', margin: 0 }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="help-rows" as="nav" aria-label="Help Center" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', width: 'fill' } }}>
                <Type as="p" role="p3">
                  Help rows go here.
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
