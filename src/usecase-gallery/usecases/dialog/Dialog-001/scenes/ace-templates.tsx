import type { ContextProps } from '../../../../types';
import { Accordion, Button, Dialog, Radio, RadioGroup, Type, View } from '../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// Size: this popup is the default 480px wide, narrower than the 860px About popup; the look (raised title bar, close X) is the same.
// ACE New from template (src/features/templates/ui/NewFromTemplateDialog.tsx): the default-width Popup with a raised Title ("Templates") and close X, and a Body holding one RadioGroup over an Accordion of two sections (Default Templates, My Templates; both open), each section title a Type l4. A row is a Radio that fills the row; the user's own templates add three text Buttons after it (Download, Delete in error, Edit), the default ones add none. Left out: more rows, the empty state, the Cancel and Create footer and the delete confirm (Dialog-005, AlertDialog-004).
export default function AceTemplatesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Templates
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <RadioGroup defaultValue="2">
                <Accordion openMultiple defaultValue={['default-templates', 'my-templates']}>
                  <Accordion.Item value="default-templates">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">Default Templates</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }}>
                        <View aui={ROW}>
                          <Radio value="1" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                            <Radio.Label>Two-beam connection</Radio.Label>
                          </Radio>
                        </View>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="my-templates">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">My Templates</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }}>
                        <View aui={ROW}>
                          <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                            <Radio.Label>Three-beam connection</Radio.Label>
                          </Radio>
                          <Button>Download</Button>
                          <Button aui={{ color: 'error' }}>Delete</Button>
                          <Button>Edit</Button>
                        </View>
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
