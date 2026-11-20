import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../types';
import { Checkbox, Dialog, Field, Tooltip, View } from '../../../../kit';

// ADC feedback dialog: a popup capped at 560px (the app caps it by the screen padding; 100% keeps it inside the preview stage) whose close X sits in a "Close" tooltip. The footer is split: the "Send me a copy" Checkbox leads it, then the default Cancel and a primary solid Send, which the app keeps disabled.
export default function AdcFeedbackScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(560px, 100%)' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Feedback Form
              <Dialog.Spacer />
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger render={<Dialog.Close aria-label="Close" />} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Close</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Dialog.Title>
            <Dialog.Body>
              <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                <Field>
                  <Field.Label>Email</Field.Label>
                  <Field.Control>
                    <Field.Input type="email" />
                  </Field.Control>
                </Field>
                <Field>
                  <Field.Label>Description</Field.Label>
                  <Field.Textarea rows={4} />
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions align="split">
              <Checkbox aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
              </Checkbox>
              <Dialog.Button>Cancel</Dialog.Button>
              <Dialog.Button aui={{ color: 'primary', paint: 'solid' }} disabled>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
