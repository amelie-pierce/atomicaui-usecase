import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';

// HS Tutorials dialog (src/hs/Tutorials.tsx): a 384px Dialog with a Title and close X, then a nav column of one outlined topic row per tutorial (one shown). AGPD and RWS write the same dialog (their Help & Tutorials); the app closes the dialog and starts the tour on click.
export default function HsTopicRowScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Help &amp; Tutorials
              <Dialog.Spacer />
              <Dialog.Close aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View as="nav" aria-label="Help & Tutorials" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
                {children}
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
