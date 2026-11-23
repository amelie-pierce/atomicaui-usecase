import type { ContextProps } from '../../../../types';
import { Accordion, Dialog, IconButton, Radio, RadioGroup, View } from '../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// Size: this popup is the default 480px wide, narrower than the 860px About popup; the look (raised title bar, close X) is the same.
// HS Templates dialog (src/hs/TemplateDialogs.tsx; FD src/components/TemplatesDialog.jsx writes the same dialog through its own shell): the default-width Popup of the shell dialog with a raised Title ("Templates") and close X, and a Body that scrolls (overflow auto) holding one RadioGroup over an Accordion of two sections whose triggers are plain text. A row is a Radio that fills the row; the user's rows end in three icon buttons (download, trash, pen) with an aria-label each. Left out: more rows, the empty state, the Cancel and Create footer and the delete confirm (Dialog-008, AlertDialog-004).
export default function HsTemplatesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Templates
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Templates" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <RadioGroup defaultValue="2">
                <Accordion openMultiple defaultValue={['default', 'mine']}>
                  <Accordion.Item value="default">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        Default Templates
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={ROW}>
                        <Radio value="1" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                          <Radio.Label>Two-beam connection</Radio.Label>
                        </Radio>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="mine">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        My Templates
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={ROW}>
                        <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                          <Radio.Label>Three-beam connection</Radio.Label>
                        </Radio>
                        <IconButton data-ug-part="row-action" name="download" aria-label="Download Three-beam connection" />
                        <IconButton data-ug-part="row-action" name="trash" aria-label="Delete Three-beam connection" />
                        <IconButton data-ug-part="row-action" name="pen" aria-label="Edit Three-beam connection" />
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </RadioGroup>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
