# Dialog-010: Welcome dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-010/usecase.ts`

## What it is

A welcome dialog that offers the guided tour: a gray Close and a solid Start Walkthrough.

## When to choose it

Use it to offer the tour once; the app closes the dialog itself and starts the tour, so both buttons set dismiss={false}.

## Where it belongs

The first-run welcome dialog of ADM and FD. Real site source: ADM Tutorials.tsx and FD HelpCenter.jsx. HCS no longer has this dialog; the other apps open the tour from their Help and Tutorials list (Button-011).

## Usage guidance

A 384px dialog with a Title and close X and a footer of a gray Close and a solid secondary Start Walkthrough, both Dialog.Buttons with dismiss={false}. Measured in the browser, this footer renders as the Reset confirm footer of HS and FD at the same 384px: the same fills, radius, 16px regular text, 28px height, 6px gap and right alignment, with no Spacer between the buttons. One group, ADM and FD. The scene keeps one line of text; the real ADM dialog adds an image and a Key Features list and FD's a description and four features.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Type`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `secondary`
- `paint`: `solid`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the ADM welcome prompt. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The small 384px welcome window at scale "sm", sized through the --aui-dialog-width variable the app sets. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The plain (not raised) title bar reading "Welcome to ADM" with the close X at its end. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The greeting "Welcome to ADM" in the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Close** — The close X that dismisses the welcome prompt without starting the tour. Selector: `[class~="aui-dialog-close"]`.
6. **Body** — The body that holds one welcome sentence. Selector: `[class~="aui-dialog-body"]`.
7. **Welcome text** — The p2 sentence "Welcome to the Anchor Designer." that introduces the tour. Part marker: `data-ug-part="welcome-text"`. Direct text is highlighted.
8. **Footer** — The footer that offers Close and Start Walkthrough. Selector: `[class~="aui-dialog-actions"]`.
9. **Close button** — The default gray Dialog.Button labelled Close; dismiss={false} leaves closing to the app. Part marker: `data-ug-part="dismiss-button"`.
10. **Start Walkthrough** — The solid secondary button that starts the guided tour. Part marker: `data-ug-part="start"`.

## Component layer steps

1. **Overlay** — The scrim behind the ADM welcome prompt. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The small 384px welcome window at scale "sm", sized through the --aui-dialog-width variable the app sets. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The plain (not raised) title bar reading "Welcome to ADM" with the close X at its end. Selector: `[class~="aui-dialog-title"]`.
4. **Close** — The close X that dismisses the welcome prompt without starting the tour. Selector: `[class~="aui-dialog-close"]`.
5. **Body** — The body that holds one welcome sentence. Selector: `[class~="aui-dialog-body"]`.
6. **Footer** — The footer that offers Close and Start Walkthrough. Selector: `[class~="aui-dialog-actions"]`.
7. **Close button** — The default gray Dialog.Button labelled Close; dismiss={false} leaves closing to the app. Selector: `[data-ug-part="dismiss-button"]`.
8. **Start Walkthrough** — The solid secondary button that starts the guided tour. Selector: `[data-ug-part="start"]`.

## Apps

- ADM (`adm`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Welcome dialog (`adm-welcome`)

Apps: ADM, FD

In context source: ADM: `src/features/top-navigation/components/Tutorials.tsx`; FD: `src/components/HelpCenter.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-010/example.tsx`

```tsx
import type { CSSProperties } from 'react';
import { Dialog, Type } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm' }} style={{ '--aui-dialog-width': 'var(--p-px-384)' } as CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Welcome to ADM
              <Dialog.Spacer />
              <Dialog.Close aui={{ scale: 'sm' }} aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <Type data-ug-part="welcome-text" as="p" role="p2">Welcome to the Anchor Designer.</Type>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="dismiss-button" dismiss={false}>Close</Dialog.Button>
              <Dialog.Button data-ug-part="start" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Start Walkthrough</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-010/options/adm-welcome/scene.tsx`

```tsx
import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../../types';
import { Dialog, Type } from '../../../../../kit';

// ADM Welcome dialog (src/features/top-navigation/components/Tutorials.tsx): a 384px Dialog (the --aui-dialog-width variable, as the app sets it) with a Title and close X, the welcome text in the Body and the footer Close and Start Walkthrough. FD writes the same footer in its Getting Started dialog. The footer is the Cancel and Confirm pair: a default Dialog.Button (gray, here labelled Close) and a solid secondary one (here Start Walkthrough); the app closes the dialog itself, so both use dismiss={false}.
export default function AdmWelcomeScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm' }} style={{ '--aui-dialog-width': 'var(--p-px-384)' } as CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Welcome to ADM
              <Dialog.Spacer />
              <Dialog.Close aui={{ scale: 'sm' }} aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <Type data-ug-part="welcome-text" as="p" role="p2">Welcome to the Anchor Designer.</Type>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="dismiss-button" dismiss={false}>Close</Dialog.Button>
              <Dialog.Button data-ug-part="start" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Start Walkthrough</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
