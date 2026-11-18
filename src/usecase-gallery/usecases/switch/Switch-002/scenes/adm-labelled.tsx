import type { ContextProps } from '../../../../types';
import { Dialog, Switch, View } from '../../../../kit';

export default function AdmLabelledScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>Base plate<Dialog.Spacer /><Dialog.Close aria-label="Close" /></Dialog.Title>
            <Dialog.Body>
              <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12' } }}>
                <Switch defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                  <Switch.Label>Include base plate</Switch.Label>
                </Switch>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
