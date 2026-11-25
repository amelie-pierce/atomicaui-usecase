import { Button, Dialog, View } from '../../../../../kit';
import type { ContextProps } from '../../../../../types';

// PBS PbsHelpTutorials (src/PbsHelpTutorials.tsx): the same non-modal Help & Tutorials dock as ADM, but the topic row ends with an arrow-right after the label. FD writes the same row (a HelpRow with the arrow). The app styles the row with a class (.pbs-help-link); the scene writes the same border and layout as aui props, as FD does.
export default function PbsTopicRowScene({ host }: ContextProps) {
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
                <Button aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', justifyContent: 'between', gap: '8', width: 'fill', textAlign: 'start', whiteSpace: 'normal', borderColor: 'outlined', borderWidth: '1' } }}>
                  PBS: General Tutorial
                  <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
                </Button>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
