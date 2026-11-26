# Button-031: Close dialog button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-031/usecase.ts`

## What it is

A transparent icon-only IconButton, 20px square, closes a dialog from the end of its Title.

## When to choose it

Use it to dismiss a dialog without acting; it is the same as the neutral Cancel of the footer. Do not use it as the only way out of a dialog that needs a decision, and leave it out where the app forbids closing (the PBS licence gate). Always set aria-label.

## Where it belongs

The Title end of a dialog (the whole dialog use cases are Dialog and AlertDialog). Real site source: the dialogs of every app; PBS also writes a header row holding only the X for its Remove and Duplicate dialogs.

## Usage guidance

The real part is Dialog.Close, an IconButton named "xmark" with paint "text" and profile "contained", taking the popup scale (the example uses IconButton, since Dialog.Close needs a Dialog around it). Dialog close: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (a raised Title with a Spacer and the 20x20 contained X; the scene is HCS, which sets scale "sm", the default, on the Title and the X; measured in the browser, HCS and the others render the same elements and styles and differ only in popup width, 384px vs 480px, and the aria-label; their licence gates set scale "sm" on a plain Title and the X, and PBS drops the X there); ADC (the X wrapped in a Tooltip, a solid secondary sm popup reading "Close", measured 59x28 on hover). Close without Title: PBS only (HeaderClose, the Remove and Duplicate dialogs): no Title, a View row with justifyContent "end" holding only the X. The dialog scenes keep the Title only: no body or footer.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `IconButton`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `contained`, `no-padding`
- `scale`: `sm`
- `color`: `raised`, `secondary`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Popup** — The dialog surface: ADC and PBS use the default width, HCS a 384px popup. Selector: `[class~="aui-dialog-popup"]`.
2. **Title** — The raised title bar of the ADC Feedback Form and HCS Send feedback dialogs, with the heading and a spacer pushing Close to its end; PBS has no title. Selector: `[class~="aui-dialog-title"]`.
3. **Dialog close** — The transparent xmark control at the end of the title (ADC wraps it in a Close tooltip, HCS names it Close Send feedback); in PBS it sits alone in a right-aligned row above the body. Selector: `[class~="aui-dialog-close"]`.
4. **Close button** — The standalone 20px transparent xmark IconButton shown in the example before it is mounted as a Dialog.Close. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
5. **Close tooltip** — ADC only: the secondary tooltip reading Close shown above the close control. Selector: `[class~="aui-tooltip-popup"]`.
6. **Body** — PBS only: the body that carries the confirmation Are you sure you want to delete Connection 1. Selector: `[class~="aui-dialog-body"]`.

## Component layer steps

1. **Popup** — ADC and PBS use default feedback width; HCS uses 384px. Selector: `[class~="aui-dialog-popup"]`.
2. **Title** — Raised title pairs Send feedback or Feedback Form with Close. Selector: `[class~="aui-dialog-title"]`.
3. **Dialog close** — Transparent X closes the dialog; PBS places it above body. Selector: `[class~="aui-dialog-close"]`.
4. **Close button** — Example shows a transparent 20px X before Dialog.Close. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
5. **Close tooltip** — ADC only: the secondary tooltip reading Close shown above the close control. Selector: `[class~="aui-tooltip-popup"]`.
6. **Body** — PBS body asks whether to delete Connection 1. Selector: `[class~="aui-dialog-body"]`.

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

### 1. Title-bar close (`hcs-close`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/components/F01Experience.tsx`; ACE: `src/features/file-persistence/ui/OpenFromDeviceDialog.tsx`; ADM: `src/features/top-navigation/components/FeedbackDialog.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; PBS: `src/WorkspaceTools.tsx`; HS: `src/hs/ShellDialog.tsx`; FD: `src/components/ui.jsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`

In context view: Shown.

#### In context structure additions

1. **Title spacer** — The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar. Selector: `[class~="aui-dialog-spacer"]`.

#### In context layer steps

1. **Title spacer** — Spacer pushes Close to the raised title bar’s end. Selector: `[class~="aui-dialog-spacer"]`.
2. **Popup** — ADC and PBS use default feedback width; HCS uses 384px. Selector: `[class~="aui-dialog-popup"]`.
3. **Title** — Raised title pairs Send feedback or Feedback Form with Close. Selector: `[class~="aui-dialog-title"]`.
4. **Dialog close** — Transparent X closes the dialog; PBS places it above body. Selector: `[class~="aui-dialog-close"]`.
5. **Close button** — Example shows a transparent 20px X before Dialog.Close. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
6. **Close tooltip** — ADC only: the secondary tooltip reading Close shown above the close control. Selector: `[class~="aui-tooltip-popup"]`.
7. **Body** — PBS body asks whether to delete Connection 1. Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-031/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-031/options/hcs-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// HCS dialogs (ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS render the same Title and X at the default popup width, 480px, with another aria-label): a raised Title at scale sm with the Spacer pushing the close X to the end, also at scale sm.
export default function HcsCloseScene({ host }: ContextProps) {
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
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Tooltip close button (`adc-close`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Shown.

#### In context structure additions

1. **Title spacer** — The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar. Selector: `[class~="aui-dialog-spacer"]`.

#### In context layer steps

1. **Title spacer** — Spacer pushes Close to the raised title bar’s end. Selector: `[class~="aui-dialog-spacer"]`.
2. **Popup** — ADC and PBS use default feedback width; HCS uses 384px. Selector: `[class~="aui-dialog-popup"]`.
3. **Title** — Raised title pairs Send feedback or Feedback Form with Close. Selector: `[class~="aui-dialog-title"]`.
4. **Dialog close** — Transparent X closes the dialog; PBS places it above body. Selector: `[class~="aui-dialog-close"]`.
5. **Close button** — Example shows a transparent 20px X before Dialog.Close. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
6. **Close tooltip** — ADC only: the secondary tooltip reading Close shown above the close control. Selector: `[class~="aui-tooltip-popup"]`.
7. **Body** — PBS body asks whether to delete Connection 1. Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-031/options/adc-close/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-031/options/adc-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Tooltip } from '../../../../../kit';

// ADC dialogs: the close X is the trigger of a "Close" tooltip (a solid secondary sm popup above it), inside a raised Title.
export default function AdcCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
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
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 3. Close without Title (`pbs-close`)

Apps: PBS

In context source: PBS: `src/ResultsSection.tsx`

In context view: Shown.

#### In context structure additions

1. **Close row** — The end-aligned row that holds only the close X above the dialog body, since this dialog has no title. Selector: `[data-ug-part="close-row"]`.

#### In context layer steps

1. **Close row** — PBS row aligns its titleless Close button above the body. Selector: `[data-ug-part="close-row"]`.
2. **Popup** — ADC and PBS use default feedback width; HCS uses 384px. Selector: `[class~="aui-dialog-popup"]`.
3. **Title** — Raised title pairs Send feedback or Feedback Form with Close. Selector: `[class~="aui-dialog-title"]`.
4. **Dialog close** — Transparent X closes the dialog; PBS places it above body. Selector: `[class~="aui-dialog-close"]`.
5. **Close button** — Example shows a transparent 20px X before Dialog.Close. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
6. **Close tooltip** — ADC only: the secondary tooltip reading Close shown above the close control. Selector: `[class~="aui-tooltip-popup"]`.
7. **Body** — PBS body asks whether to delete Connection 1. Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-031/options/pbs-close/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-031/options/pbs-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Type, View } from '../../../../../kit';

// PBS HeaderClose (the Remove and Duplicate dialogs): the dialog has no Title; the close X sits alone in a row above the body, pushed to the end with justifyContent.
export default function PbsCloseScene({ host }: ContextProps) {
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
              <Type as="p" role="p3">Are you sure you want to delete Connection 1</Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
