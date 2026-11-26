import type { ContextProps } from '../../../../../types';
import { Accordion, Dialog, Radio, RadioGroup, Type, View } from '../../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// ACE New from template (src/features/templates/ui/NewFromTemplateDialog.tsx): the Popup with a raised Title and the close X, and a Body holding a RadioGroup over an Accordion of two groups (Default Templates, My Templates; both open) whose trigger titles are Type l4. Left out: more rows, the empty state, the row actions, the Cancel and Create footer and the delete confirm.
export default function AceTemplateGroupsScene({ host }: ContextProps) {
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
                <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['default', 'mine']}>
                  <Accordion.Item value="default">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">Default Templates</Type>
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
                        <Type role="l4">My Templates</Type>
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
                </Accordion></span>
              </RadioGroup>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
