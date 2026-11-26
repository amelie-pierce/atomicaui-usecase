# AlertDialog-004: Delete confirm dialog

Component family: **AlertDialog** (shown within Dialog)

UI type: **Alert / Confirm**

Source: `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/usecase.ts`

## What it is

A confirmation that asks before a template or a saved result is deleted: a Cancel next to a solid error Delete.

## When to choose it

Use it before an irreversible delete: color "error" marks the Delete. The Remove row button that opens it is Button-038.

## Where it belongs

The confirmation opened from the Delete action of a template (ACE, ADM, HS, FD) or of a saved result (PBS). Real site source: ACE and ADM NewFromTemplateDialog.tsx, PBS ResultsSection.tsx, HS TemplateDialogs.tsx and FD TemplatesDialog.jsx. HCS, PFD, AGPD, RWS and ADC have no delete confirm.

## Usage guidance

In the apps this is AlertDialog; the gallery draws it as a non-modal Dialog because the vendored AlertDialog is forced modal. The footer is the default Cancel (Close in PBS) and a solid error Delete. Three groups. ACE and ADM (a raised warning Title, no close X; ACE at the default width, ADM capped at 480px). PBS (no Title: a header row with only the close X, then Close, a Spacer and a solid error Delete). HS and FD (a plain Title, no close X). Every scene is cut to the least that shows the footer.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `error`, `raised`, `warning`
- `paint`: `solid`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the delete confirm. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The default-width confirm window used by ACE, HS and PBS. Selector: `[class~="aui-dialog-popup"]`.
3. **Title** — The raised title "Warning: Delete Template?" with a solid warning icon and no close X (HS leaves the bar plain, PBS has no title at all). Selector: `[class~="aui-dialog-title"]`.
4. **Warning icon** — The solid triangle-exclamation glyph in the warning colour. Selector: `[class~="aui-dialog-title"] [class~="aui-contained-icon"]`.
5. **Title text** — The question "Warning: Delete Template?". Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
6. **Close row** — The PBS-only end-aligned row that holds a lone close X above the message instead of a title bar. Part marker: `data-ug-part="close-row"`.
7. **Close** — The PBS close X above the message; the other apps have none. Selector: `[class~="aui-dialog-close"]`.
8. **Description** — The message that the deletion cannot be undone and must be confirmed (PBS asks "Are you sure you want to delete Connection 1"). Selector: `[class~="aui-dialog-description"]`.
9. **Footer** — The footer with the back-out and delete buttons; PBS puts a spacer between them. Selector: `[class~="aui-dialog-actions"]`.
10. **Cancel** — The default Cancel (labelled Close in PBS) that keeps the template. Part marker: `data-ug-part="cancel"`.
11. **Delete** — The solid error Delete that removes the template. Part marker: `data-ug-part="delete"`.

## Apps

- ACE (`ace`)
- ADM (`adm`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Delete confirm (`ace-delete`)

Apps: ACE, ADM

In context source: ACE: `src/features/templates/ui/NewFromTemplateDialog.tsx`; ADM: `src/features/templates/components/NewFromTemplateDialog.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/example.tsx`

```tsx
import { Dialog } from '../../../kit';
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
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/options/ace-delete/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ACE NewFromTemplateDialog delete confirm (ADM writes the same dialog capped at 480px; only the width differs): an AlertDialog at the default width with a raised warning Title and no close X; the footer is the default Cancel and a solid error Delete.
export default function AceDeleteScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Delete confirm — UI variant 2 (`pbs-delete`)

Apps: PBS

In context source: PBS: `src/ResultsSection.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/options/pbs-delete/example.tsx`

```tsx
import { Dialog } from '../../../../../kit';
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
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/options/pbs-delete/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';

// PBS RemoveDialog: no Title; a header row holds only the close X at the end. The footer is the default Close, a Spacer, then a solid error Delete at the far end.
export default function PbsDeleteScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
              <Dialog.Close aria-label="Close" />
            </View>
            <Dialog.Body>
              <Dialog.Description>Are you sure you want to delete Connection 1</Dialog.Description>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Close</Dialog.Button>
              <Dialog.Spacer />
              <Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 3. Delete confirm — UI variant 3 (`hs-delete`)

Apps: HS, FD

In context source: HS: `src/hs/TemplateDialogs.tsx`; FD: `src/components/TemplatesDialog.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/options/hs-delete/example.tsx`

```tsx
import { Dialog } from '../../../../../kit';
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
              <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-004/options/hs-delete/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// HS TemplateDialogs delete confirm (FD writes the same dialog): an AlertDialog at the default width with a plain Title (not raised), no close X, the default Cancel and a solid error Delete.
export default function HsDeleteScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Delete Template?
            </Dialog.Title>
            <Dialog.Description>
              You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="delete" dismiss={false} aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
