# AlertDialog-001: Confirm with warning icon

Component family: **AlertDialog** (shown within Dialog)

UI type: **Alert / Confirm**

Source: `src/usecase-gallery/usecases/alert-dialog/AlertDialog-001/usecase.ts`

## What it is

A confirmation that interrupts the user: a warning icon title with a close X, a description of what is lost, and a Cancel next to the destructive action.

## When to choose it

Use it when one explicit choice must be made before an action that erases work. Do not use it for information the user can dismiss (a Dialog) or a one-button notice (AlertDialog-002).

## Where it belongs

The Reset inputs confirmation of the top bar (HCS, ACE, ADM, ADC). Real source: HcsResetDialog.tsx, ResetInputsAction.tsx (ACE), ResetDialog.tsx (ADM) and the Reset inputs dialog of Workspace.tsx (ADC).

## Usage guidance

In the apps this is `AlertDialog` with `clickOutsideToClose={false}`: Portal, Backdrop, Viewport, Popup, then a Title (`color: "raised"`) holding `AlertDialog.Icon` (triangle-exclamation, `color: "warning"`), the text, `AlertDialog.Spacer` and `AlertDialog.Close`, a Description and Actions with `AlertDialog.Button`s (Cancel text, the action `color: "secondary"` solid, autoFocus on Cancel). The kit has no modal-free AlertDialog, so the gallery draws it as a non-modal Dialog with the same parts (`Dialog.Icon`, `Dialog.Description`, `Dialog.Actions`, `Dialog.Button`) and the same aui; copy the code with `AlertDialog` in place of `Dialog`. Reset confirm has two groups: HCS, ACE and ADM (scale "sm", soft shape, Cancel and Reset; the popup is 560px in HCS and 480px in ACE and ADM, a size, not a second look) and ADC (default scale, Actions `align="split"` with Cancel, a text error Button and a solid error Button). The scenes leave out the Close tooltip of ADC and the focus handling.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `error`, `raised`, `secondary`, `warning`
- `paint`: `solid`, `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim that interrupts the user before the Reset Inputs confirm; the gallery draws the alert as a non-modal Dialog. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The confirm window at scale "sm" with a soft shape; 560px wide in HCS (480px in ACE and ADM, 640px default scale in ADC). Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar that carries the warning icon, "Warning: Reset Inputs?", the spacer and the close X. Selector: `[class~="aui-dialog-title"]`.
4. **Warning icon** — The triangle-exclamation glyph in the warning colour that marks this prompt as a caution. Selector: `[class~="aui-dialog-title"] [class~="aui-contained-icon"]`.
5. **Title text** — The question "Warning: Reset Inputs?" that names what the user is about to do. Selector: `[data-ug-part="title-text"]`. Direct text is highlighted.
6. **Spacer** — The gap that pushes the close X to the end of the title bar. Selector: `[class~="aui-dialog-spacer"]`.
7. **Close** — The close X labelled "Close Reset" that leaves the inputs untouched. Selector: `[class~="aui-dialog-close"]`.
8. **Description** — The sentence that says what is lost: "You are about to reset all input fields. This cannot be undone." (ADC explains that project information and design names are preserved). Selector: `[class~="aui-dialog-description"]`.
9. **Footer** — The footer that sits at the end in HCS, ACE and ADM; in ADC it is split and wraps three buttons. Selector: `[class~="aui-dialog-actions"]`.
10. **Cancel** — The default Cancel that backs out of the reset. Part marker: `data-ug-part="cancel"`.
11. **Reset** — The solid destructive button: a secondary Reset in HCS, ACE and ADM, and the solid error "Reset All Designs to Standard" in ADC. Part marker: `data-ug-part="confirm"`.
12. **Reset current design** — The ADC-only text error button "Reset Current Design to Standard" that offers the narrower reset. Part marker: `data-ug-part="reset-current"`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Reset confirm (`hcs-reset`)

Apps: HCS, ACE, ADM

In context source: HCS: `src/components/HcsResetDialog.tsx`; ACE: `src/features/reset-inputs/ui/ResetInputsAction.tsx`; ADM: `src/features/top-navigation/components/ResetDialog.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-001/example.tsx`

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
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(560px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              <span data-ug-part="title-text">Warning: Reset Inputs?</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm' }}>
              You are about to reset all input fields. This cannot be undone.
            </Dialog.Description>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="cancel" aui={{ scale: 'sm' }}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-001/options/hcs-reset/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// HcsResetDialog (ACE ResetInputsAction and ADM ResetDialog render the same elements; only the popup width, 480px against 560px, and the close aria-label differ): an AlertDialog drawn as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog), 560px capped by the stage.
export default function HcsResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(560px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              <span data-ug-part="title-text">Warning: Reset Inputs?</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm' }}>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="cancel" aui={{ scale: 'sm' }}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Reset confirm — UI variant 2 (`adc-reset`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-001/options/adc-reset/example.tsx`

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
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(560px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              <span data-ug-part="title-text">Warning: Reset Inputs?</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm' }}>
              You are about to reset all input fields. This cannot be undone.
            </Dialog.Description>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="cancel" aui={{ scale: 'sm' }}>Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-001/options/adc-reset/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ADC Workspace Reset inputs (src/adc/Workspace.tsx): the same icon title and close X, but the Actions row is align "split" (Cancel at the start, the two reset choices at the end) with a text error and a solid error Button. Drawn as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog).
export default function AdcResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(640px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning', paint: 'text' }} />
              <span data-ug-part="title-text">Warning: Reset Inputs?</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Description>
              Restore factory defaults for the current design or all designs. Project information and design names are preserved.
            </Dialog.Description>
            <Dialog.Actions align="split" aui={{ sx: { flexWrap: 'wrap' } }}>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="reset-current" aui={{ color: 'error', paint: 'text', sx: { whiteSpace: 'nowrap' } }}>Reset Current Design to Standard</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ color: 'error', paint: 'solid', sx: { whiteSpace: 'nowrap' } }}>Reset All Designs to Standard</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
