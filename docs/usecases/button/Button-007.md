# Button-007: Close info dialog button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-007/usecase.ts`

## What it is

Close is the lone button of an info dialog that only informs; its first look, the default gray one, is the example; the Look select shows the other.

## When to choose it

Use one button when closing is the only choice and the dialog holds nothing to decide. The default look is the neutral gray Close; use the dark one only where the app wants the Close to stand out.

## Where it belongs

The footer of an info dialog: the Add to Home Screen dialog in PBS WorkspaceTools.tsx, AGPD and RWS ShellDialogs.tsx, and the Explore More Applications dialog in FD src/App.jsx. PFD writes the Add to Home Screen dialog without a footer, so it has no Close.

## Usage guidance

Secondary solid (PBS, AGPD, RWS): the example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. Dark solid (FD): a plain Button with aui color "secondary" (a black fill) instead of the gray Dialog.Button; the scene writes it. The dialog is an AlertDialog or Modal in the apps and is drawn as a non-modal Dialog here; each scene keeps one paragraph of body text.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Dialog`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `raised`, `secondary`
- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The single Close Button in an info dialog footer, small and default gray (PBS); FD shows the same Close with a black secondary fill. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
2. **Label** — The text "Close" that dismisses the info dialog, the only choice it offers. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`. Direct text is highlighted.

## Component layer steps

1. **Container** — Small Close footer button appears gray in PBS, black in FD. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.

## Apps

- PBS (`pbs`)
- AGPD (`agpd`)
- RWS (`rws`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Secondary solid (`pbs-close`)

Apps: PBS, AGPD, RWS

In context source: PBS: `src/WorkspaceTools.tsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`

In context view: Shown.

#### In context structure additions

1. **Dialog** — The open dialog titled "Add to Your Home Screen". Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The raised title bar with "Add to Your Home Screen" and the close X at the end. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog (aria-label "Close Add to Your Home Screen"). Part marker: `data-ug-part="dialog-close"`.
4. **Dialog body** — The scrollable body with the Android "Add to Home Screen" instructions. Part marker: `data-ug-part="dialog-body"`.
5. **Dialog footer** — The Actions row at the end that holds the single Close button. Part marker: `data-ug-part="dialog-footer"`.

#### In context layer steps

1. **Dialog** — Explore More Applications dialog hosts one information action. Selector: `[data-ug-part="dialog"]`.
2. **Dialog title** — Raised title names the information dialog beside Close. Selector: `[data-ug-part="dialog-title"]`.
3. **Close button** — Title X closes the info dialog with its dialog-specific label. Selector: `[data-ug-part="dialog-close"]`.
4. **Dialog body** — The scrollable body with the Android "Add to Home Screen" instructions. Selector: `[data-ug-part="dialog-body"]`.
5. **Dialog footer** — The Actions row at the end that holds the single Close button. Selector: `[data-ug-part="dialog-footer"]`.
6. **Container** — Small Close footer button appears gray in PBS, black in FD. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-007/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm' }}>Close</Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-007/options/pbs-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Type, View } from '../../../../../kit';

// PBS HomeScreenDialog (AGPD and RWS write the same "Add to Home Screen" ShellDialog): an info dialog whose footer is one default Close, alone at the end.
export default function PbsCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Add to Your Home Screen
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Close Add to Your Home Screen" />
            </Dialog.Title>
            <Dialog.Body data-ug-part="dialog-body" aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <Type as="p" role="p3">
                  On Android devices, tap the menu icon followed by tapping &quot;Add to Home Screen.&quot;
                </Type>
              </View>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-footer">
              <Dialog.Button>Close</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Dark solid (`fd-close`)

Apps: FD

In context source: FD: `src/App.jsx`

In context view: Shown.

#### In context structure additions

1. **Dialog** — The open dialog titled "Explore More Applications". Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The raised title bar with "Explore More Applications" and the close X at the end. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog (aria-label "Close Explore More Applications"). Part marker: `data-ug-part="dialog-close"`.
4. **Dialog body** — The scrollable body with the line "Simpson Strong-Tie design applications." Part marker: `data-ug-part="dialog-body"`.
5. **Dialog footer** — The Actions row at the end that holds the single Close button. Part marker: `data-ug-part="dialog-footer"`.

#### In context layer steps

1. **Dialog** — Explore More Applications dialog hosts one information action. Selector: `[data-ug-part="dialog"]`.
2. **Dialog title** — Raised title names the information dialog beside Close. Selector: `[data-ug-part="dialog-title"]`.
3. **Close button** — Title X closes the info dialog with its dialog-specific label. Selector: `[data-ug-part="dialog-close"]`.
4. **Dialog body** — The scrollable body with the line "Simpson Strong-Tie design applications." Selector: `[data-ug-part="dialog-body"]`.
5. **Dialog footer** — The Actions row at the end that holds the single Close button. Selector: `[data-ug-part="dialog-footer"]`.
6. **Container** — Small Close footer button appears gray in PBS, black in FD. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-007/options/fd-close/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary' }}>Close</Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-007/options/fd-close/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Dialog, Type } from '../../../../../kit';

// FD "Explore More Applications" Modal: the footer is one plain Button with color "secondary" (a black fill), not the gray Dialog.Button the other apps use.
export default function FdCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Explore More Applications
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Close Explore More Applications" />
            </Dialog.Title>
            <Dialog.Body data-ug-part="dialog-body" aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <Type as="p" role="p3">Simpson Strong-Tie design applications.</Type>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-footer">
              <Button aui={{ color: 'secondary' }}>Close</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
