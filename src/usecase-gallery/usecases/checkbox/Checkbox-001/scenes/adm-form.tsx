import type { ContextProps } from '../../../../types';
import { Checkbox, Dialog, Field, View } from '../../../../kit';

// ADM and FD dialogs (ADM src/features/top-navigation/components/FeedbackDialog.tsx, src/features/templates/components/SaveAsTemplateDialog.tsx, src/features/base-plate/components/ThicknessCalculatorDialog.tsx and the edit modals; FD src/components/Feedback.jsx): the same last-row Checkbox, but the mark is written `<Checkbox.Icon name="check" layer="duotone" />`, which draws the check in Font Awesome Duotone (a lighter check) instead of the solid one. Left out: the Description, the upload dropzone, the size error and the footer (Button-001).
export default function AdmFormScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(480px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" />
            </Dialog.Title>
            <Dialog.Body>
              <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                <Field>
                  <Field.Label>Email</Field.Label>
                  <Field.Control>
                    <Field.Input type="email" />
                  </Field.Control>
                </Field>
                <Checkbox
                  defaultSelected
                  aui={{
                    states: {
                      unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
                      selected: { paint: 'solid', color: 'primary' },
                    },
                  }}
                >
                  <Checkbox.Icon name="check" layer="duotone" />
                  <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
                </Checkbox>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
