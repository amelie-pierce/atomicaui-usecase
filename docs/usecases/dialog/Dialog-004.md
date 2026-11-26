# Dialog-004: Template picker dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-004/usecase.ts`

## What it is

A narrow dialog with a raised title bar and a close X over one radio list of templates with two owners (built in and the user's own).

## When to choose it

Use it to choose one saved starting point from a short list that has two owners (built in and the user's). Do not use it for a short message or a confirm (a plain Dialog, AlertDialog-003), to save a template (Dialog-008, Save template) or for a long searchable list.

## Where it belongs

The File menu item New from template in ACE, ADM, HS and FD (HCS, PFD, PBS, AGPD, RWS and ADC have no template picker). Real site source: the template dialog of each app (the paths are in source and in each case).

## Usage guidance

The Dialog.Popup is the default scale and the default 480px (ADM sets 520px); the Title is raised and carries the name, the Spacer and the close X (Button-031). The Body holds one RadioGroup, each row a Radio at scale "sm" whose states are an outlined tonal surface when unselected and a solid primary when selected, with sx flex "fill" so it takes the row; only the user's own rows add row actions after the Radio, in a flex row with gap 8: three text Buttons Download, Delete (color error) and Edit in ACE and ADM, three icon buttons (download, trash, pen, each with an aria-label) in HS and FD. The example is the Dialog frame you copy (Popup, raised Title with the close X, Body); the radio list is a supporting part shown in In context. The apps write three UIs, one scene each: ACE (an Accordion of the two sections with a Type l4 trigger, Accordion-003), ADM (a 520px Popup, plain sections each headed by a muted Type, no Accordion) and HS and FD (the default-width shell dialog, an Accordion with plain-text triggers and icon-button rows; the Body also scrolls). The scenes leave out the no-match state, the keyboard handlers, the template footer (Cancel and Create, Dialog-008), the delete confirm, the empty state and further rows.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `Button`, `Dialog`, `IconButton`, `Radio`, `RadioGroup`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `error`, `primary`, `raised`, `surface`
- `scale`: `sm`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the New from Template picker. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The narrow default-scale picker window, 480px wide (ADM widens it to 520px). Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar reading "New from Template"; the ACE and HS scenes title it "Templates" and ADM keeps "New from Template". Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The picker name at the start of the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Spacer** — The gap between the picker name and the close X. Selector: `[class~="aui-dialog-spacer"]`.
6. **Close** — The close X that abandons the picker (labelled "Cancel" in the ACE scene and "Close Templates" in the HS scene). Selector: `[class~="aui-dialog-close"]`.
7. **Body** — The body that holds the radio list of templates; the HS and FD version also scrolls (overflow auto). Selector: `[class~="aui-dialog-body"]`.
8. **Template text** — The p3 placeholder line that stands in for the list of templates in the Dialog frame. Part marker: `data-ug-part="template-text"`. Direct text is highlighted.

## Apps

- ACE (`ace`)
- ADM (`adm`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Template picker (`ace-templates`)

Apps: ACE

In context source: ACE: `src/features/templates/ui/NewFromTemplateDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Template choice** — The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection. Selector: `[class~="aui-radio-group"]`.
2. **Template sections** — Default Templates and My Templates as two Accordion sections, both open. Selector: `[class~="aui-accordion"]`.
3. **Section header** — A Type l4 section label ending in a chevron. Selector: `[class~="aui-accordion-trigger"]`.
4. **Template row** — A template row such as "Two-beam connection": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row. Selector: `[class~="aui-radio"]`.
5. **Template name** — The template name inside the radio, such as "Three-beam connection". Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
6. **Row actions** — The Download, Delete (error colour) and Edit text buttons after a user-owned template row. Part marker: `data-ug-part="row-action"`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-004/example.tsx`

```tsx
import { Dialog, Type } from '../../../kit';
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
              New from Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="template-text" as="p" role="p3">
                The list of templates goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-004/options/ace-templates/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Button, Dialog, Radio, RadioGroup, Type, View } from '../../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// Size: this popup is the default 480px wide, narrower than the 860px About popup; the look (raised title bar, close X) is the same.
// ACE New from template (src/features/templates/ui/NewFromTemplateDialog.tsx): the default-width Popup with a raised Title ("Templates") and close X, and a Body holding one RadioGroup over an Accordion of two sections (Default Templates, My Templates; both open), each section title a Type l4. A row is a Radio that fills the row; the user's own templates add three text Buttons after it (Download, Delete in error, Edit), the default ones add none. Left out: more rows, the empty state, the Cancel and Create footer and the delete confirm (Dialog-008, AlertDialog-004).
export default function AceTemplatesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Templates
              <Dialog.Spacer />
              <Dialog.Close aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              <RadioGroup defaultValue="2">
                <Accordion openMultiple defaultValue={['default-templates', 'my-templates']}>
                  <Accordion.Item value="default-templates">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">Default Templates</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }}>
                        <View aui={ROW}>
                          <Radio value="1" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                            <Radio.Label>Two-beam connection</Radio.Label>
                          </Radio>
                        </View>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="my-templates">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">My Templates</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', width: 'fill' } }}>
                        <View aui={ROW}>
                          <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                            <Radio.Label>Three-beam connection</Radio.Label>
                          </Radio>
                          <Button data-ug-part="row-action">Download</Button>
                          <Button data-ug-part="row-action" aui={{ color: 'error' }}>Delete</Button>
                          <Button data-ug-part="row-action">Edit</Button>
                        </View>
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
```

### 2. Template picker — UI variant 2 (`adm-templates`)

Apps: ADM

In context source: ADM: `src/features/templates/components/NewFromTemplateDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Template choice** — The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection. Selector: `[class~="aui-radio-group"]`.
2. **Template section** — A plain section that stacks a muted heading over its radio rows with a gap of 4 (no Accordion). Part marker: `data-ug-part="section"`.
3. **Section heading** — The muted "Default Templates" and "My Templates" labels. Part marker: `data-ug-part="section-heading"`. Direct text is highlighted.
4. **Template row** — A template row such as "Two-beam connection": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row. Selector: `[class~="aui-radio"]`.
5. **Template name** — The template name inside the radio, such as "Three-beam connection". Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
6. **Row actions** — The Download, Delete (error colour) and Edit text buttons after a user-owned template row. Part marker: `data-ug-part="row-action"`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-004/options/adm-templates/example.tsx`

```tsx
import { Dialog, Type } from '../../../../../kit';
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
              New from Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="template-text" as="p" role="p3">
                The list of templates goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-004/options/adm-templates/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Dialog, Radio, RadioGroup, Type, View } from '../../../../../kit';

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
// ADM New from Template (src/features/templates/components/NewFromTemplateDialog.tsx): a Popup 520px wide (the stage caps it), a raised Title and close X, and a Body with one RadioGroup of two plain sections, each headed by a muted Type (Default Templates, My Templates) instead of an Accordion. The user's rows add Download, Delete (error) and Edit text Buttons after the Radio. Left out: more rows, the empty state "No saved templates yet", the Cancel and Create footer and the delete confirm (Dialog-008, AlertDialog-004).
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
                  <View data-ug-part="section" aui={SECTION}>
                    <Type data-ug-part="section-heading" color="muted">Default Templates</Type>
                    <Radio value="1" aui={SELECTION}>
                      <Radio.Label>Two-beam connection</Radio.Label>
                    </Radio>
                  </View>
                  <View data-ug-part="section" aui={SECTION}>
                    <Type data-ug-part="section-heading" color="muted">My Templates</Type>
                    <View aui={ROW}>
                      <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                        <Radio.Label>Three-beam connection</Radio.Label>
                      </Radio>
                      <Button data-ug-part="row-action">Download</Button>
                      <Button data-ug-part="row-action" aui={{ color: 'error' }}>Delete</Button>
                      <Button data-ug-part="row-action">Edit</Button>
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
```

### 3. Template picker — UI variant 3 (`hs-templates`)

Apps: HS, FD

In context source: HS: `src/hs/TemplateDialogs.tsx`; FD: `src/components/TemplatesDialog.jsx`

In context view: Shown.

#### In context structure additions

1. **Template choice** — The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection. Selector: `[class~="aui-radio-group"]`.
2. **Template sections** — Default Templates and My Templates as two Accordion sections, both open. Selector: `[class~="aui-accordion"]`.
3. **Section header** — A plain text section label ending in a chevron. Selector: `[class~="aui-accordion-trigger"]`.
4. **Template row** — A template row such as "Two-beam connection": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row. Selector: `[class~="aui-radio"]`.
5. **Template name** — The template name inside the radio, such as "Three-beam connection". Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
6. **Row actions** — The download, trash and pen icon buttons after a user-owned template row, each with its own aria-label. Part marker: `data-ug-part="row-action"`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-004/options/hs-templates/example.tsx`

```tsx
import { Dialog, Type } from '../../../../../kit';
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
              New from Template
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="template-text" as="p" role="p3">
                The list of templates goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-004/options/hs-templates/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Dialog, IconButton, Radio, RadioGroup, View } from '../../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// Size: this popup is the default 480px wide, narrower than the 860px About popup; the look (raised title bar, close X) is the same.
// HS Templates dialog (src/hs/TemplateDialogs.tsx; FD src/components/TemplatesDialog.jsx writes the same dialog through its own shell): the default-width Popup of the shell dialog with a raised Title ("Templates") and close X, and a Body that scrolls (overflow auto) holding one RadioGroup over an Accordion of two sections whose triggers are plain text. A row is a Radio that fills the row; the user's rows end in three icon buttons (download, trash, pen) with an aria-label each. Left out: more rows, the empty state, the Cancel and Create footer and the delete confirm (Dialog-008, AlertDialog-004).
export default function HsTemplatesScene({ host }: ContextProps) {
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
                          <Radio.Label>Three-beam connection</Radio.Label>
                        </Radio>
                        <IconButton data-ug-part="row-action" name="download" aria-label="Download Three-beam connection" />
                        <IconButton data-ug-part="row-action" name="trash" aria-label="Delete Three-beam connection" />
                        <IconButton data-ug-part="row-action" name="pen" aria-label="Edit Three-beam connection" />
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
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
