import type { ContextProps } from '../../../../types';
import { Button, Dialog, Radio, RadioGroup, Type, View } from '../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const SECTION = { sx: { display: 'flex', flexDirection: 'column', gap: '4', width: 'fill' } } as const;
const ROW = { sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// Size: this popup is 520px wide, narrower than the 860px About popup; the look (raised title bar, close X) is the same.
// ADM New from Template (src/features/templates/components/NewFromTemplateDialog.tsx): a Popup 520px wide (the stage caps it), a raised Title and close X, and a Body with one RadioGroup of two plain sections, each headed by a muted Type (Default Templates, My Templates) instead of an Accordion. The user's rows add Download, Delete (error) and Edit text Buttons after the Radio. Left out: more rows, the empty state "No saved templates yet", the Cancel and Create footer and the delete confirm (Button-001).
export default function AdmTemplatesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              New from Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <RadioGroup defaultValue="2">
                <View aui={{ sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                  <View aui={SECTION}>
                    <Type color="muted">Default Templates</Type>
                    <Radio value="1" aui={SELECTION}>
                      <Radio.Label>Two-beam connection</Radio.Label>
                    </Radio>
                  </View>
                  <View aui={SECTION}>
                    <Type color="muted">My Templates</Type>
                    <View aui={ROW}>
                      <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                        <Radio.Label>Three-beam connection</Radio.Label>
                      </Radio>
                      <Button>Download</Button>
                      <Button aui={{ color: 'error' }}>Delete</Button>
                      <Button>Edit</Button>
                    </View>
                  </View>
                </View>
              </RadioGroup>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
