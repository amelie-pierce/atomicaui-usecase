import { Button, Dialog, Type, View } from '../../../../kit';
import type { ContextProps } from '../../../../types';

// ACE TutorialsDialog (src/features/top-navigation/ui/TutorialsDialog.tsx): the same dialog as HS, but each topic row stacks the topic name (semi-bold) over its muted description, start-aligned in a column, with no arrow.
export default function AceTopicRowScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { maxHeight: '384' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Help &amp; Tutorials
              <Dialog.Spacer />
              <Dialog.Close aui={{ scale: 'sm' }} aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View as="nav" aria-label="Help & Tutorials" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
                <Button
                  aui={{
                    scale: 'sm',
                    paint: 'text',
                    sx: {
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'between',
                      gap: '4',
                      width: 'fill',
                      textAlign: 'start',
                      whiteSpace: 'normal',
                      borderStyle: 'solid',
                      borderColor: 'outlined',
                      borderBlockStartWidth: '1',
                      borderBlockEndWidth: '1',
                      borderInlineStartWidth: '1',
                      borderInlineEndWidth: '1',
                    },
                  }}
                >
                  <Type as="span" role="p2" weight="semi-bold">ACE: General Tutorial</Type>
                  <Type as="span" role="p3" color="muted">Shows the general features common to all Blueprint-based applications.</Type>
                </Button>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
