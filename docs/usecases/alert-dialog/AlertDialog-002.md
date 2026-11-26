# AlertDialog-002: Single centered action

Component family: **AlertDialog** (shown within Dialog)

UI type: **Alert / Confirm**

Source: `src/usecase-gallery/usecases/alert-dialog/AlertDialog-002/usecase.ts`

## What it is

A blocking notice with no close X and one solid button centred in the footer, the only way forward.

## When to choose it

Use it when the user cannot continue and has exactly one choice. Do not use it when the user can cancel (AlertDialog-001).

## Where it belongs

Declined licence agreement in EC mode (ACE EulaGate.tsx and HS LicenseGate.tsx): the notice asks the user to relaunch and accept the agreement.

## Usage guidance

In the apps this is `AlertDialog` with `clickOutsideToClose={false}`: Title (`color: "raised"`, text only, no icon, no close), Description, and `AlertDialog.Actions align="center"` holding one `AlertDialog.Button` with `dismiss={false}` and `color: "secondary", paint: "solid"`. The gallery draws it as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog); copy the code with `AlertDialog` in place of `Dialog`. ACE and HS render the same elements, so they are one group. The scene leaves out the reload handler.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `solid`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim that blocks the app after the licence agreement was declined. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The default-size blocking notice, with no close X so it cannot be dismissed. Selector: `[class~="aui-dialog-popup"]`.
3. **Title** — The raised, text-only title "Website Application License Agreement" with no icon and no close X. Selector: `[class~="aui-dialog-title"]`.
4. **Description** — The explanation that the app cannot continue without agreement and that the user must relaunch it and accept (ACE spells out the EULA). Selector: `[class~="aui-dialog-description"]`.
5. **Footer** — The footer with align="center" that centres its single button. Selector: `[class~="aui-dialog-actions"]`.
6. **Re-Launch** — The only way forward: a solid secondary Re-Launch button with dismiss={false} so the notice stays until the app reloads. Part marker: `data-ug-part="relaunch"`.

## Component layer steps

1. **Overlay** — The scrim that blocks the app after the licence agreement was declined. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The default-size blocking notice, with no close X so it cannot be dismissed. Selector: `[class~="aui-dialog-popup"]`.
3. **Title** — The raised, text-only title "Website Application License Agreement" with no icon and no close X. Selector: `[class~="aui-dialog-title"]`.
4. **Description** — The explanation that the app cannot continue without agreement and that the user must relaunch it and accept (ACE spells out the EULA). Selector: `[class~="aui-dialog-description"]`.
5. **Footer** — The footer with align="center" that centres its single button. Selector: `[class~="aui-dialog-actions"]`.
6. **Re-Launch** — The only way forward: a solid secondary Re-Launch button with dismiss={false} so the notice stays until the app reloads. Selector: `[data-ug-part="relaunch"]`.

## Apps

- ACE (`ace`)
- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Relaunch notice (`ace-relaunch`)

Apps: ACE, HS

In context source: ACE: `src/features/eula/ui/EulaGate.tsx`; HS: `src/hs/LicenseGate.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-002/example.tsx`

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
            <Dialog.Title aui={{ color: 'raised' }}>Website Application License Agreement</Dialog.Title>
            <Dialog.Description>
              We can not continue without your agreement. To proceed, relaunch the application and accept the agreement.
            </Dialog.Description>
            <Dialog.Actions align="center">
              <Dialog.Button data-ug-part="relaunch" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Re-Launch</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/alert-dialog/AlertDialog-002/options/ace-relaunch/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ACE EulaGate decline (HS LicenseGate writes the same dialog): an AlertDialog drawn as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog), no close X, one solid secondary Button centred in the footer because it is the only way forward.
export default function AceRelaunchScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>Website Application License Agreement</Dialog.Title>
            <Dialog.Description>
              We can not continue without your agreement to the End User License Agreement (EULA). If you would like to proceed, relaunch the application, and accept the EULA.
            </Dialog.Description>
            <Dialog.Actions align="center">
              <Dialog.Button data-ug-part="relaunch" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Re-Launch</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
