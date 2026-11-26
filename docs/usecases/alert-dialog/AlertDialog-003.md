# AlertDialog-003: Reset confirm dialog

Component family: **AlertDialog** (shown within Dialog)

UI type: **Alert / Confirm**

Source: `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/usecase.ts`

## What it is

A confirmation that asks before every input is reset: a warning title, a description of what is lost, and a Cancel next to a solid Reset.

## When to choose it

Use it when one explicit choice must be made before an action that erases work. In brand atomic the near-black fill is color "secondary", not "primary" (orange), and gray is "surface-alt", not "secondary". ADC is the exception: its Reset buttons are "error". AlertDialog-001 documents the same Reset action of HCS, ACE, ADM and ADC from the AlertDialog side; fold them when AlertDialog is converted.

## Where it belongs

The Reset inputs confirmation of the top bar. Real site source: HCS HcsResetDialog.tsx, ACE ResetInputsAction.tsx, ADM ResetDialog.tsx, HS and FD App.tsx and ADC Workspace.tsx (the paths are in source). PFD, AGPD, RWS and PBS reset at once and have no Reset confirm.

## Usage guidance

In the apps this is AlertDialog with AlertDialog.Button in the footer; the gallery draws it as a non-modal Dialog because the vendored AlertDialog is forced modal (copy the code with AlertDialog in place of Dialog). Reset sets color "secondary" and paint "solid" (scale "sm" in HCS); Cancel is the default (color "surface-alt", paint "solid"). Five groups, one scene each. HCS (the scene is HcsResetDialog: 560px popup, raised warning Title, close X labelled "Close Reset", Cancel and a solid secondary Reset); ADM (480px popup, close X labelled "Close", same Title, body and footer); ACE (the default popup width, 480px measured, and no close X: ResetInputsAction writes none; same Title, body and footer). Measured in the browser, all three render the same Title (28px, bold, raised fill, 18x14 warning icon), body text and footer (Cancel 66x28 then Reset 58x28, same fills, radius, 16px text), so the groups differ only in popup width (HCS 560px vs 480px) and in the close X (HCS and ADM have it, ACE has none). HS and FD (384px, plain Title, close X, and a Spacer between Cancel and Reset). ADC (640px, three buttons: Cancel, a text error "Reset Current Design to Standard" and a solid error "Reset All Designs to Standard", with the close X in a tooltip). Every scene is cut to the least that shows the footer.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Tooltip`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `error`, `raised`, `secondary`, `warning`
- `paint`: `solid`, `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the reset confirm shared by five apps. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The 560px soft confirm window at scale "sm" (ADM uses 480px, HS 384px, ADC a 640px cap). Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar with the warning icon and "Warning: Reset Inputs?"; ACE leaves out the close X and HS leaves the bar plain. Selector: `[class~="aui-dialog-title"]`.
4. **Warning icon** — The warning-coloured triangle-exclamation icon at the start of the title. Selector: `[class~="aui-dialog-title"] [class~="aui-contained-icon"]`.
5. **Title text** — The question "Warning: Reset Inputs?". Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
6. **Spacer** — The gap before the close X in the title bar; HS also places one between Cancel and Reset in its footer. Selector: `[class~="aui-dialog-spacer"]`.
7. **Close** — The close X labelled "Close Reset"; in ADC it sits in a "Close" tooltip trigger. Selector: `[class~="aui-dialog-close"]`.
8. **Body** — The HS-only body that wraps its description instead of placing it directly in the popup. Selector: `[class~="aui-dialog-body"]`.
9. **Description** — The warning that all input fields will be reset and that the project configurations erased cannot be recovered. Selector: `[class~="aui-dialog-description"]`.
10. **Footer** — The footer that holds Cancel and the destructive button; split and wrapping in ADC. Selector: `[class~="aui-dialog-actions"]`.
11. **Cancel** — The default Cancel next to the destructive action. Part marker: `data-ug-part="cancel"`.
12. **Reset** — The solid secondary Reset that clears every input in HCS, ACE, ADM and HS. Part marker: `data-ug-part="confirm"`.
13. **Reset current design** — The ADC text error button "Reset Current Design to Standard". Part marker: `data-ug-part="reset-current"`.
14. **Reset all designs** — The ADC solid error button "Reset All Designs to Standard". Part marker: `data-ug-part="reset-all"`.
15. **Close tooltip** — The ADC tooltip that labels the close X "Close" on hover. Selector: `[class~="aui-tooltip-popup"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- HS (`hs`)
- FD (`fd`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Reset confirm (`hcs-reset`)

Apps: HCS

In context source: HCS: `src/components/HcsResetDialog.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/example.tsx`

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
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
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

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/hcs-reset/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// HcsResetDialog: a modal Dialog at scale "sm", 560px wide (a scene-local inline width, since there is no 560 width token) with its backdrop and viewport, the raised warning Title, the close X, Cancel and a solid secondary Reset.
export default function ResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
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

### 2. Reset confirm — UI variant 2 (`ace-reset`)

Apps: ACE

In context source: ACE: `src/features/reset-inputs/ui/ResetInputsAction.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/ace-reset/example.tsx`

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
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
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

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/ace-reset/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ACE ResetInputsAction: a Dialog at the default scale and the default popup width, with the raised warning Title and no close X (the app writes none), Cancel and a solid secondary Reset.
export default function ResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
            </Dialog.Title>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions>
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

### 3. Reset confirm — UI variant 3 (`adm-reset`)

Apps: ADM

In context source: ADM: `src/features/top-navigation/components/ResetDialog.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/adm-reset/example.tsx`

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
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
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

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/adm-reset/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ADM ResetDialog: a Dialog at the default scale, 480px wide (a scene-local inline width, since there is no 480 width token) with the raised warning Title, the close X, Cancel and a solid secondary Reset.
export default function ResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ width: 480 }}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Description>
              You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
            </Dialog.Description>
            <Dialog.Actions>
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

### 4. Reset confirm — UI variant 4 (`hs-reset`)

Apps: HS, FD

In context source: HS: `src/App.tsx`; FD: `src/App.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/hs-reset/example.tsx`

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
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
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

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/hs-reset/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// HS reset dialog (FD copies it): a 384px Dialog with a plain Title (not raised), the close X, and a Spacer between Cancel and Reset so the two sit at opposite ends of the footer.
export default function HsResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ sx: { width: '384' } }}>
            <Dialog.Title>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
              Warning: Reset Inputs?
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close reset" />
            </Dialog.Title>
            <Dialog.Body>
              <Dialog.Description>
                You are about to reset all input fields. This will erase all of your project configurations and cannot be undone.
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Spacer />
              <Dialog.Button data-ug-part="confirm" aui={{ color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 5. Reset confirm — UI variant 5 (`adc-reset`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/adc-reset/example.tsx`

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
          <Dialog.Popup initialFocus={false} style={{ width: 560 }} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
              Warning: Reset Inputs?
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

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-003/options/adc-reset/scene.tsx`

```tsx
import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../../types';
import { Dialog, Tooltip } from '../../../../../kit';

// ADC reset dialog: an AlertDialog capped at 640px (the app caps it by the screen padding; 100% keeps it inside the preview stage) with a raised warning Title whose close X sits in a "Close" tooltip, and a split footer of three buttons: the default Cancel, a text error "Reset Current Design to Standard" and a solid error "Reset All Designs to Standard".
export default function AdcResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(640px, 100%)' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning', paint: 'text' }} />
              Warning: Reset Inputs?
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
            <Dialog.Description>
              Restore factory defaults for the current design or all designs. Project information, design names, tabs, and their order are preserved.
            </Dialog.Description>
            <Dialog.Actions align="split" aui={{ sx: { flexWrap: 'wrap' } }}>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="reset-current" aui={{ color: 'error', paint: 'text', sx: { whiteSpace: 'nowrap' } }}>Reset Current Design to Standard</Dialog.Button>
              <Dialog.Button data-ug-part="reset-all" aui={{ color: 'error', paint: 'solid', sx: { whiteSpace: 'nowrap' } }}>Reset All Designs to Standard</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
