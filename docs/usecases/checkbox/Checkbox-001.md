# Checkbox-001: Dialog option checkbox

Component family: **Checkbox**

UI type: **Single checkbox**

Source: `src/usecase-gallery/usecases/checkbox/Checkbox-001/usecase.ts`

## What it is

A Checkbox with its label that answers one optional yes or no question at the end of a dialog form: Send me a copy of my responses.

## When to choose it

Use it for an optional choice that is on or off, has no unit and travels with a form the user submits once. Do not use it for an exclusive choice (a RadioGroup, or a Field.Select when there are many), an on and off setting that applies at once (a Switch) or to select a row (Table-002). The Dialog footer, close and Cancel and Send buttons are Dialog-009 (Send feedback) and Button-031 and are not repeated here.

## Where it belongs

The feedback dialog of eight apps (HS src/hs/ShellExtras.tsx, PFD src/pfd/ShellDialogs.tsx, PBS src/WorkspaceTools.tsx, AGPD src/agpd/ShellDialogs.tsx, RWS src/rws/ShellDialogs.tsx, ADM src/features/top-navigation/components/FeedbackDialog.tsx, FD src/components/Feedback.jsx, ADC src/adc/Workspace.tsx), the Save as template dialog (HS src/hs/TemplateDialogs.tsx, ADM src/features/templates/components/SaveAsTemplateDialog.tsx) and the ADM Thickness calculator and edit modals.

## Usage guidance

The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The box is a bare child of the Dialog.Body form column (View, flex column, gap 16), as the last row. ADM and FD: the same row, but the mark is Checkbox.Icon layer "duotone", which draws the check in Font Awesome 7 Duotone, visibly lighter than the solid check in Font Awesome 7 Pro (ADM writes it on every Checkbox; FD only in this dialog). HS, PFD, PBS, AGPD, RWS: the solid check; PBS and RWS omit scale, which renders the same 22px box. ADC: the Checkbox leads the split Dialog.Actions footer, before Cancel and Send, with no Icon (the same solid mark); the full dialog is Dialog-009 Send feedback. The scenes leave out the Description, the file dropzone and its size error, and show the enabled state and a Send that the app keeps disabled until the form is valid.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Checkbox`, `Dialog`, `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `raised`, `surface`
- `paint`: `solid`, `text`, `tonal`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Checkbox** — The checkable control, at scale "sm", checked by default: a surface-tonal box with an outlined border when off and a solid primary box when on. Selector: `[class~="aui-checkbox"]`.
2. **Indicator** — The small box that shows the checked state for the optional copy of the feedback responses. Selector: `[class~="aui-checkbox-indicator"]`.
3. **Icon** — The "check" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
4. **Label** — The caption "Send me a copy of my responses" beside the box, answering the optional yes or no question at the end of the form. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
5. **Form field** — The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input. Selector: `[class~="aui-field"]`.

## Component layer steps

1. **Checkbox** — The checkable control, at scale "sm", checked by default: a surface-tonal box with an outlined border when off and a solid primary box when on. Selector: `[class~="aui-checkbox"]`.
2. **Indicator** — The small box that shows the checked state for the optional copy of the feedback responses. Selector: `[class~="aui-checkbox-indicator"]`.
3. **Icon** — The "check" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
4. **Label** — The caption "Send me a copy of my responses" beside the box, answering the optional yes or no question at the end of the form. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
5. **Form field** — The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input. Selector: `[class~="aui-field"]`.

## Apps

- ADM (`adm`)
- FD (`fd`)
- HS (`hs`)
- PFD (`pfd`)
- PBS (`pbs`)
- AGPD (`agpd`)
- RWS (`rws`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Dialog option (`adm-form`)

Apps: ADM, FD

In context source: ADM: `src/features/top-navigation/components/FeedbackDialog.tsx`; FD: `src/components/Feedback.jsx`

Note: The checkbox sits in the dialog form.

In context view: Shown.

#### In context structure additions

1. **Feedback dialog** — The Dialog popup titled "Send feedback" (or "Feedback Form") that hosts the checkbox. Selector: `[class~="aui-dialog-popup"]`.
2. **Feedback title bar** — The raised Dialog.Title with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Feedback form body** — The Dialog.Body whose column holds the Email field and, as its last row, the "Send me a copy of my responses" checkbox (the description, dropzone and footer are left out). Selector: `[class~="aui-dialog-body"]`.

#### In context layer steps

1. **Feedback dialog** — The Dialog popup titled "Send feedback" (or "Feedback Form") that hosts the checkbox. Selector: `[class~="aui-dialog-popup"]`.
2. **Feedback title bar** — The raised Dialog.Title with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Feedback form body** — The Dialog.Body whose column holds the Email field and, as its last row, the "Send me a copy of my responses" checkbox (the description, dropzone and footer are left out). Selector: `[class~="aui-dialog-body"]`.
5. **Checkbox** — The checkable control, at scale "sm", checked by default: a surface-tonal box with an outlined border when off and a solid primary box when on. Selector: `[class~="aui-checkbox"]`.
6. **Indicator** — The small box that shows the checked state for the optional copy of the feedback responses. Selector: `[class~="aui-checkbox-indicator"]`.
7. **Icon** — The "check" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
8. **Label** — The caption "Send me a copy of my responses" beside the box, answering the optional yes or no question at the end of the form. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
9. **Form field** — The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input. Selector: `[class~="aui-field"]`.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-001/example.tsx`

```tsx
import { Checkbox } from '../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" layer="duotone" />
      <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-001/options/adm-form/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Dialog, Field, View } from '../../../../../kit';

// ADM and FD dialogs (ADM src/features/top-navigation/components/FeedbackDialog.tsx, src/features/templates/components/SaveAsTemplateDialog.tsx, src/features/base-plate/components/ThicknessCalculatorDialog.tsx and the edit modals; FD src/components/Feedback.jsx): the same last-row Checkbox, but the mark is written `<Checkbox.Icon name="check" layer="duotone" />`, which draws the check in Font Awesome Duotone (a lighter check) instead of the solid one. Left out: the Description, the upload dropzone, the size error and the footer (Dialog-009).
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
```

### 2. Form checkbox (`hs-form`)

Apps: HS, PFD, PBS, AGPD, RWS

In context source: HS: `src/hs/ShellExtras.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; PBS: `src/WorkspaceTools.tsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`

Note: The checkbox sits in the dialog form.

In context view: Shown.

#### In context structure additions

1. **Feedback dialog** — The Dialog popup titled "Send feedback" (or "Feedback Form") that hosts the checkbox. Selector: `[class~="aui-dialog-popup"]`.
2. **Feedback title bar** — The raised Dialog.Title with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Feedback form body** — The Dialog.Body whose column holds the Email field and, as its last row, the "Send me a copy of my responses" checkbox (the description, dropzone and footer are left out). Selector: `[class~="aui-dialog-body"]`.

#### In context layer steps

1. **Feedback dialog** — The Dialog popup titled "Send feedback" (or "Feedback Form") that hosts the checkbox. Selector: `[class~="aui-dialog-popup"]`.
2. **Feedback title bar** — The raised Dialog.Title with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Feedback form body** — The Dialog.Body whose column holds the Email field and, as its last row, the "Send me a copy of my responses" checkbox (the description, dropzone and footer are left out). Selector: `[class~="aui-dialog-body"]`.
5. **Checkbox** — The checkable control, at scale "sm", checked by default: a surface-tonal box with an outlined border when off and a solid primary box when on. Selector: `[class~="aui-checkbox"]`.
6. **Indicator** — The small box that shows the checked state for the optional copy of the feedback responses. Selector: `[class~="aui-checkbox-indicator"]`.
7. **Icon** — The "check" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
8. **Label** — The caption "Send me a copy of my responses" beside the box, answering the optional yes or no question at the end of the form. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
9. **Form field** — The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input. Selector: `[class~="aui-field"]`.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-001/options/hs-form/example.tsx`

```tsx
import { Checkbox } from '../../../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-001/options/hs-form/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Field, View } from '../../../../../kit';

// HS, PFD, PBS, AGPD and RWS feedback and save dialogs (HS src/hs/ShellExtras.tsx and src/hs/TemplateDialogs.tsx, PFD src/pfd/ShellDialogs.tsx, PBS src/WorkspaceTools.tsx, AGPD src/agpd/ShellDialogs.tsx, RWS src/rws/ShellDialogs.tsx): the Checkbox is the last row of the Dialog.Body form, below the fields. The mark is the monotone solid check (the default mark; HS, PFD, AGPD and RWS write it as Checkbox.Icon name "check"). Left out: the Description, the upload dropzone, the size error and the footer (Dialog-009).
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
```

### 3. Footer checkbox (`adc-footer`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

Note: The checkbox sits in the dialog footer before the actions.

In context view: Shown.

#### In context structure additions

1. **Feedback dialog** — The Dialog popup titled "Send feedback" (or "Feedback Form") that hosts the checkbox. Selector: `[class~="aui-dialog-popup"]`.
2. **Feedback title bar** — The raised Dialog.Title with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Footer actions** — The split Dialog.Actions footer: the checkbox at the start, then Cancel and Send. Selector: `[class~="aui-dialog-actions"]`.
5. **Cancel** — The default Dialog.Button that closes the dialog without sending. Part marker: `data-ug-part="cancel"`.
6. **Send** — The solid primary Dialog.Button that submits the feedback. Part marker: `data-ug-part="send"`.

#### In context layer steps

1. **Feedback dialog** — The Dialog popup titled "Send feedback" (or "Feedback Form") that hosts the checkbox. Selector: `[class~="aui-dialog-popup"]`.
2. **Feedback title bar** — The raised Dialog.Title with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Footer actions** — The split Dialog.Actions footer: the checkbox at the start, then Cancel and Send. Selector: `[class~="aui-dialog-actions"]`.
5. **Cancel** — The default Dialog.Button that closes the dialog without sending. Selector: `[data-ug-part="cancel"]`.
6. **Send** — The solid primary Dialog.Button that submits the feedback. Selector: `[data-ug-part="send"]`.
7. **Checkbox** — The checkable control, at scale "sm", checked by default: a surface-tonal box with an outlined border when off and a solid primary box when on. Selector: `[class~="aui-checkbox"]`.
8. **Indicator** — The small box that shows the checked state for the optional copy of the feedback responses. Selector: `[class~="aui-checkbox-indicator"]`.
9. **Icon** — The "check" mark inside the indicator; the HS, PFD, PBS, AGPD, RWS, ADM and FD feedback dialogs show it when the option is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
10. **Label** — The caption "Send me a copy of my responses" beside the box, answering the optional yes or no question at the end of the form. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
11. **Form field** — The feedback-form text fields (name, email, subject) above the checkbox in the dialog scenes, each a Field with a label and an input. Selector: `[class~="aui-field"]`.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-001/options/adc-footer/example.tsx`

```tsx
import { Checkbox } from '../../../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-001/options/adc-footer/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Dialog } from '../../../../../kit';

// ADC feedback dialog (src/adc/Workspace.tsx): the Checkbox leads the split Dialog.Actions footer, before Cancel and Send (Dialog-009 Send feedback shows the whole dialog). No Checkbox.Icon, so the mark is the default solid check. Left out: the Body fields; the app keeps Send disabled until the form is valid, the scene shows it enabled.
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
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="send" aui={{ color: 'primary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
