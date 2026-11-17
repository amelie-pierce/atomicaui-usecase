import { Button, Dialog, View } from '../../../../kit';
import type { ContextProps } from '../../../../types';

// ADM Tutorials panel (src/features/top-navigation/components/Tutorials.tsx): a non-modal Help & Tutorials dock (the app pins it to the bottom-right corner, 420px, and centres its title by local CSS; here it is the plain Popup) holding one outlined, full-width text row per topic with the label only, no arrow. PFD writes the same row. The app styles the row with a class (.adm-help-link); the scene writes the same border and layout as aui props, as PFD does.
export default function AdmTopicRowScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Help &amp; Tutorials
              <Dialog.Close aria-label="Close Help & Tutorials" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View as="nav" aria-label="Help & Tutorials" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}>
                <Button aui={{ scale: 'sm', paint: 'text', sx: { width: 'fill', justifyContent: 'between', borderWidth: '1', borderColor: 'outlined' } }}>
                  ADM: General Walkthrough
                </Button>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
