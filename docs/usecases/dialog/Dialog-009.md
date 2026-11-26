# Dialog-009: Send feedback dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-009/usecase.ts`

## What it is

A form dialog that sends the user's feedback: a Cancel and a solid Send (Submit).

## When to choose it

Use it for a short form the user can abandon; Send commits it.

## Where it belongs

The Feedback dialog of the top bar. Real site source: HCS F01Experience.tsx, ADC Workspace.tsx and the FeedbackDialog or ShellDialogs of ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source).

## Usage guidance

Cancel is the Dialog.Button default; Send is color "secondary", paint "solid" (HCS sets scale "sm"). Three groups. HCS (384px, one Submit and no Cancel). ADC (a split footer that leads with a "Send me a copy" Checkbox and ends with a disabled primary Send, 560px, close X in a tooltip). ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (raised Title with the close X, Cancel + Send; ADM and FD set the popup to 560px, the others use the default width; PFD, PBS, AGPD and RWS label Send as Submit). Body fields beyond Email and Description (the Summary field, the attach-file dropzone, the "Send me a copy" Switch of ACE) are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Checkbox`, `Dialog`, `Field`, `Input`, `Textarea`, `Tooltip`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `raised`, `secondary`, `surface`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the feedback form. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The feedback window: 384px wide in HCS, the default width in ACE, and capped at 560px in ADC. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar reading "Send feedback" in HCS and "Feedback Form" in the other apps. Selector: `[class~="aui-dialog-title"]`.
4. **Close** — The close X; it is the only way to leave the HCS form without sending, and ADC wraps it in a "Close" tooltip. Selector: `[class~="aui-dialog-close"]`.
5. **Description** — The HCS line "Tell us about your experience." under the title bar. Selector: `[class~="aui-dialog-description"]`.
6. **Body** — The body that wraps the feedback form; in HCS it is a form with id "feedback-form" that the footer Submit button targets. Selector: `[class~="aui-dialog-body"]`.
7. **Form column** — The column with gap 16 that stacks the Email and Description fields. Part marker: `data-ug-part="form-column"`.
8. **Email field** — The required Email field with its label and an email-typed input. Selector: `[class~="aui-field"]:has(input[type="email"])`.
9. **Email input** — The email input of the form. Selector: `[class~="aui-field"] input[type="email"]`.
10. **Description field** — The Description field with a four-row Textarea for the feedback text. Selector: `[class~="aui-field"]:has(textarea)`.
11. **Description textarea** — The four-row textarea (Field.Textarea in the ACE and ADC scenes) for the feedback text. Selector: `[class~="aui-field"] textarea`.
12. **Footer** — The footer: Submit alone in HCS, Cancel then Send in ACE, and a split footer led by a checkbox in ADC. Selector: `[class~="aui-dialog-actions"]`.
13. **Cancel** — The default Cancel of the ACE and ADC footers; HCS has none. Part marker: `data-ug-part="cancel"`.
14. **Submit** — The submit button: a secondary Submit tied to "feedback-form" in HCS, a secondary solid Send in ACE, and a primary Send kept disabled in ADC. Part marker: `data-ug-part="send"`.

## Component layer steps

1. **Overlay** — Scrim sits behind the feedback form and dims the page. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — Feedback window ranges from default width to 560px across apps. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — Raised title says Send feedback in HCS, Feedback Form elsewhere. Selector: `[class~="aui-dialog-title"]`.
4. **Close** — Close X exits HCS without sending; ADC adds a tooltip. Selector: `[class~="aui-dialog-close"]`.
5. **Description** — The HCS line "Tell us about your experience." under the title bar. Selector: `[class~="aui-dialog-description"]`.
6. **Body** — Feedback body contains the form and links HCS footer Submit. Selector: `[class~="aui-dialog-body"]`.
7. **Form column** — The column with gap 16 that stacks the Email and Description fields. Selector: `[data-ug-part="form-column"]`.
8. **Email field** — The required Email field with its label and an email-typed input. Selector: `[class~="aui-field"]:has(input[type="email"])`.
9. **Email input** — Email input collects the sender’s contact email address. Selector: `[class~="aui-field"] input[type="email"]`.
10. **Description field** — The Description field with a four-row Textarea for the feedback text. Selector: `[class~="aui-field"]:has(textarea)`.
11. **Description textarea** — Four-row textarea collects the user’s written feedback in the form. Selector: `[class~="aui-field"] textarea`.
12. **Footer** — Footer actions vary: Submit, Cancel and Send, or split checkbox. Selector: `[class~="aui-dialog-actions"]`.
13. **Cancel** — The default Cancel of the ACE and ADC footers; HCS has none. Selector: `[data-ug-part="cancel"]`.
14. **Submit** — Send action styles vary and ADC keeps it disabled. Selector: `[data-ug-part="send"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Send feedback (`hcs-feedback`)

Apps: HCS

In context source: HCS: `src/components/F01Experience.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-009/example.tsx`

```tsx
import { Dialog, Field, Input, Textarea, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Tell us about your experience.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <form id="feedback-form">
                <View data-ug-part="form-column" aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '16', minWidth: '0' } }}>
                  <Field aui={{ scale: 'sm', sx: { flex: 'none', width: 'fill' } }}>
                    <Field.Label aui={{ scale: 'sm' }}>Email</Field.Label>
                    <Input aui={{ scale: 'sm' }} type="email" required />
                  </Field>
                  <Field aui={{ scale: 'sm', sx: { flex: 'none', width: 'fill' } }}>
                    <Field.Label aui={{ scale: 'sm' }}>Description</Field.Label>
                    <Textarea aui={{ scale: 'sm' }} required rows={4} />
                  </Field>
                </View>
              </form>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="send" dismiss={false} type="submit" form="feedback-form" aui={{ scale: 'sm', color: 'secondary' }}>Submit</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-009/options/hcs-feedback/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Field, Input, Textarea, View } from '../../../../../kit';

// The feedback dialog: one Submit, alone at the end of the footer; there is no Cancel (the title X closes it).
export default function FeedbackScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Tell us about your experience.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <form id="feedback-form">
                <View data-ug-part="form-column" aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '16', minWidth: '0' } }}>
                  <Field aui={{ scale: 'sm', sx: { flex: 'none', width: 'fill' } }}>
                    <Field.Label aui={{ scale: 'sm' }}>Email</Field.Label>
                    <Input aui={{ scale: 'sm' }} type="email" required />
                  </Field>
                  <Field aui={{ scale: 'sm', sx: { flex: 'none', width: 'fill' } }}>
                    <Field.Label aui={{ scale: 'sm' }}>Description</Field.Label>
                    <Textarea aui={{ scale: 'sm' }} required rows={4} />
                  </Field>
                </View>
              </form>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="send" dismiss={false} type="submit" form="feedback-form" aui={{ scale: 'sm', color: 'secondary' }}>Submit</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Footer copy checkbox (`adc-feedback`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Shown.

#### In context structure additions

1. **Send me a copy checkbox** — The checkbox "Send me a copy of my responses" at the start of the split footer. Selector: `[class~="aui-checkbox"]`.

#### In context layer steps

1. **Send me a copy checkbox** — ADC places the response-copy checkbox first in its split footer. Selector: `[class~="aui-checkbox"]`.
2. **Overlay** — Scrim sits behind the feedback form and dims the page. Selector: `[class~="aui-dialog-backdrop"]`.
3. **Popup** — Feedback window ranges from default width to 560px across apps. Selector: `[class~="aui-dialog-popup"]`.
4. **Title bar** — Raised title says Send feedback in HCS, Feedback Form elsewhere. Selector: `[class~="aui-dialog-title"]`.
5. **Close** — Close X exits HCS without sending; ADC adds a tooltip. Selector: `[class~="aui-dialog-close"]`.
6. **Description** — The HCS line "Tell us about your experience." under the title bar. Selector: `[class~="aui-dialog-description"]`.
7. **Body** — Feedback body contains the form and links HCS footer Submit. Selector: `[class~="aui-dialog-body"]`.
8. **Form column** — The column with gap 16 that stacks the Email and Description fields. Selector: `[data-ug-part="form-column"]`.
9. **Email field** — The required Email field with its label and an email-typed input. Selector: `[class~="aui-field"]:has(input[type="email"])`.
10. **Email input** — Email input collects the sender’s contact email address. Selector: `[class~="aui-field"] input[type="email"]`.
11. **Description field** — The Description field with a four-row Textarea for the feedback text. Selector: `[class~="aui-field"]:has(textarea)`.
12. **Description textarea** — Four-row textarea collects the user’s written feedback in the form. Selector: `[class~="aui-field"] textarea`.
13. **Footer** — Footer actions vary: Submit, Cancel and Send, or split checkbox. Selector: `[class~="aui-dialog-actions"]`.
14. **Cancel** — The default Cancel of the ACE and ADC footers; HCS has none. Selector: `[data-ug-part="cancel"]`.
15. **Submit** — Send action styles vary and ADC keeps it disabled. Selector: `[data-ug-part="send"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-009/options/adc-feedback/example.tsx`

```tsx
import type { CSSProperties } from 'react';
import { Checkbox, Dialog, Field, Tooltip, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
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
              <form id="feedback-form">
                <View data-ug-part="form-column" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                  <Field>
                    <Field.Label>Email</Field.Label>
                    <Field.Control><Field.Input type="email" /></Field.Control>
                  </Field>
                  <Field>
                    <Field.Label>Description</Field.Label>
                    <Field.Textarea rows={4} />
                  </Field>
                </View>
              </form>
            </Dialog.Body>
            <Dialog.Actions align="split">
              <Checkbox aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                <Checkbox.Label>Send me a copy of my responses</Checkbox.Label>
              </Checkbox>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="send" aui={{ color: 'primary', paint: 'solid' }} disabled>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-009/options/adc-feedback/scene.tsx`

```tsx
import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../../types';
import { Checkbox, Dialog, Field, Tooltip, View } from '../../../../../kit';

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
              <View data-ug-part="form-column" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
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
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="send" aui={{ color: 'primary', paint: 'solid' }} disabled>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 3. Form copy checkbox (`ace-feedback`)

Apps: ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: ACE: `src/features/top-navigation/ui/FeedbackDialog.tsx`; ADM: `src/features/top-navigation/components/FeedbackDialog.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; PBS: `src/WorkspaceTools.tsx`; HS: `src/hs/ShellExtras.tsx`; FD: `src/components/Feedback.jsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-009/options/ace-feedback/example.tsx`

```tsx
import { Dialog, Field, Input, Textarea, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Send feedback
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Send feedback" />
            </Dialog.Title>
            <Dialog.Body>
              <form id="feedback-form">
                <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                  <Field>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" required />
                  </Field>
                  <Field>
                    <Field.Label>Description</Field.Label>
                    <Textarea required rows={4} />
                  </Field>
                </View>
              </form>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel" dismiss={false}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="send" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-009/options/ace-feedback/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Field, View } from '../../../../../kit';

// ACE FeedbackDialog (ADM, PFD, PBS, HS, FD, AGPD and RWS write the same dialog, ADM and FD at 560px; PFD, PBS, AGPD and RWS label Send as Submit): a default-width popup with a raised Title and the close X, and a footer of the default Cancel and a secondary solid Send; neither dismisses on its own.
export default function AceFeedbackScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Feedback Form
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
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
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel" dismiss={false}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="send" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Send</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
