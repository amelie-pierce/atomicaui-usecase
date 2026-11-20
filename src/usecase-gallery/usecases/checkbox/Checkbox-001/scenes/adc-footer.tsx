import type { ContextProps } from '../../../../types';
import { Checkbox, Dialog } from '../../../../kit';

// ADC feedback dialog (src/adc/Workspace.tsx): the Checkbox leads the split Dialog.Actions footer, before Cancel and Send (Dialog-006 Send feedback shows the whole dialog). No Checkbox.Icon, so the mark is the default solid check. Left out: the Body fields; the app keeps Send disabled until the form is valid, the scene shows it enabled.
export default function AdcFooterScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(560px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Feedback Form
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Actions align="split">
              <Checkbox
                defaultSelected
                aui={{
                  states: {
                    unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
                    selected: { paint: 'solid', color: 'primary' },
                  },
                }}
              >
                <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
              </Checkbox>
              <Dialog.Button>Cancel</Dialog.Button>
              <Dialog.Button aui={{ color: 'primary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
