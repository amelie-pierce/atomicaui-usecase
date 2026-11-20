import type { ContextProps } from '../../../../types';
import { Dialog, Field, View } from '../../../../kit';

// HS, PFD, PBS, AGPD and RWS feedback and save dialogs (HS src/hs/ShellExtras.tsx and src/hs/TemplateDialogs.tsx, PFD src/pfd/ShellDialogs.tsx, PBS src/WorkspaceTools.tsx, AGPD src/agpd/ShellDialogs.tsx, RWS src/rws/ShellDialogs.tsx): the Checkbox is the last row of the Dialog.Body form, below the fields. The mark is the monotone solid check (the default mark; HS, PFD, AGPD and RWS write it as Checkbox.Icon name "check"). Left out: the Description, the upload dropzone, the size error and the footer (Button-013).
export default function HsFormScene({ children, host }: ContextProps) {
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
                {children}
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
