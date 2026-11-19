import type { ContextProps } from '../../../../types';
import { Accordion, Dialog, Radio, RadioGroup, View } from '../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// HS Templates dialog (src/hs/TemplateDialogs.tsx; FD src/components/TemplatesDialog.jsx writes the same dialog): the shell dialog Popup with a raised Title and the close X, and a Body holding a RadioGroup over an Accordion of two groups (Default Templates, My Templates; both open) whose triggers are plain text. Left out: more rows, the empty state, the row actions, the Cancel and Create footer and the delete confirm.
export default function HsTemplateGroupsScene({ host }: ContextProps) {
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
                          <Radio.Label>Header hanger</Radio.Label>
                        </Radio>
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
