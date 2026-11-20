import type { ContextProps } from '../../../../types';
import { Dialog, Type, View } from '../../../../kit';

// FD Help Center (src/components/HelpCenter.jsx): a "sm" soft popup whose raised Title centres the name between 40px side paddings (justifyContent center) with the close X placed by the app's own CSS class at the end;
// the Body holds one column View of rows. The app pins the popup with position fixed and its own viewport class; here it is a plain 360px popup. Left out: the help rows' icons and the tutorials list.
export default function FdHelpCenterScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(360px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised', sx: { position: 'relative', justifyContent: 'center', paddingInlineStart: '40', paddingInlineEnd: '40' } }}>
              <span>Help Center</span>
              <Dialog.Close aria-label="Close" aui={{ scale: 'sm' }} style={{ position: 'absolute', insetInlineEnd: 'var(--p-px-8)', margin: 0 }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View as="nav" aria-label="Help Center" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', width: 'fill' } }}>
                <Type as="p" role="p3">
                  Feedback
                </Type>
                <Type as="p" role="p3">
                  Tutorials
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
