# Dialog-008: Save template dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-008/usecase.ts`

## What it is

A form dialog that names and saves the current inputs as a template: a Cancel and a Save that stays disabled until the name is valid.

## When to choose it

Use it when the user commits a name for new saved data; keep Save disabled until the name is valid.

## Where it belongs

The Save as template dialog. Real site source: ACE and ADM SaveAsTemplateDialog.tsx, HS TemplateDialogs.tsx and FD src/App.jsx. HCS, PFD, PBS, AGPD, RWS and ADC have no template dialog.

## Usage guidance

Cancel is the Dialog.Button default; Save is color "secondary", paint "solid" (FD: a primary Save in place of the black one, its Cancel a plain Button that looks the same). Two groups. ACE, ADM and HS (a raised Title with the close X, Save disabled until the name is valid; ADM caps the popup at 480px). FD (a primary Save). Body fields beyond the name field are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Dialog`, `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `primary`, `raised`, `secondary`
- `paint`: `solid`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the Save as Template form. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The default-width form window (ADM uses 480px, HS the same default). Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar reading "Save as Template" with the close X at its end. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The words "Save as Template" in the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Close** — The close X that cancels the form (labelled "Cancel" in ACE and "Close Save as Template" in FD). Selector: `[class~="aui-dialog-close"]`.
6. **Body** — The body that holds the template name form; the FD body scrolls with overflow auto. Selector: `[class~="aui-dialog-body"]`.
7. **Form column** — The no-padding column with gap 16 that stacks the form's single field. Part marker: `data-ug-part="form-column"`.
8. **Name field** — The Template name field; FD drops the visible label and relies on the placeholder and aria-label. Selector: `[class~="aui-field"]`.
9. **Name label** — The visible label "Template name" above the input. Selector: `[class~="aui-field-label"]`.
10. **Name input** — The text input with the placeholder "Please enter a name". Selector: `[class~="aui-field"] input`.
11. **Footer** — The footer that holds Cancel and Save at the end. Selector: `[class~="aui-dialog-actions"]`.
12. **Cancel** — The default Dialog.Button that closes the form without saving (FD renders a plain Button that looks the same). Part marker: `data-ug-part="cancel"`.
13. **Save** — The secondary solid Save, disabled until the name is valid; FD swaps it for a primary-coloured Button. Part marker: `data-ug-part="save"`.

## Apps

- ACE (`ace`)
- ADM (`adm`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Save template (`ace-save`)

Apps: ACE, ADM, HS

In context source: ACE: `src/features/templates/ui/SaveAsTemplateDialog.tsx`; ADM: `src/features/templates/components/SaveAsTemplateDialog.tsx`; HS: `src/hs/TemplateDialogs.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-008/example.tsx`

```tsx
import { Dialog, Field, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Label>Template name</Field.Label>
                  <Field.Control>
                    <Field.Input type="text" placeholder="Please enter a name" />
                  </Field.Control>
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="save" dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Save</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-008/options/ace-save/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Field, View } from '../../../../../kit';

// ACE SaveAsTemplateDialog (HS writes the same dialog and ADM the same at 480px; only the width differs): a default-width popup with a raised Title with the close X, and a footer of the default Cancel and a secondary solid Save that stays disabled until the name is valid.
export default function AceSaveScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Label>Template name</Field.Label>
                  <Field.Control>
                    <Field.Input type="text" placeholder="Please enter a name" />
                  </Field.Control>
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="save" dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Save</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Save template — UI variant 2 (`fd-save`)

Apps: FD

In context source: FD: `src/App.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-008/options/fd-save/example.tsx`

```tsx
import { Button, Dialog, Field, View } from '../../../../../kit';
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
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Control>
                    <Field.Input type="text" placeholder="Please enter a name" aria-label="Please enter a name" />
                  </Field.Control>
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Button data-ug-part="cancel">Cancel</Button>
              <Button data-ug-part="save" aui={{ color: 'primary' }} disabled>Save</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-008/options/fd-save/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Dialog, Field, View } from '../../../../../kit';

// FD save-template Modal: a raised Title with the close X, and a footer of two plain Buttons: the default Cancel and a primary (orange) Save that stays disabled until the name is filled. FD writes Button, not Dialog.Button; the Cancel looks the same, the primary Save is what sets FD apart.
export default function FdSaveScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Save as Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Save as Template" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Field>
                  <Field.Input placeholder="Please enter a name" aria-label="Please enter a name" />
                </Field>
              </View>
            </Dialog.Body>
            <Dialog.Actions>
              <Button data-ug-part="cancel">Cancel</Button>
              <Button data-ug-part="save" aui={{ color: 'primary' }} disabled>Save</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
