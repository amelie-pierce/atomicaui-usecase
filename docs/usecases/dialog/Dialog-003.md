# Dialog-003: Calculator dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-003/usecase.ts`

## What it is

A dialog with a raised title bar and a close X over a small calculator: the Thickness Calculator of ADM, opened from the base plate inputs.

## When to choose it

Use it for a small side calculation that feeds a value back into the form and should not leave the page. Do not use it for a confirm (AlertDialog-003) or a form that is the main work of the page.

## Where it belongs

ADM: the Thickness Calculator opened by a Dialog.Trigger in the base plate feature (src/features/base-plate/components/ThicknessCalculatorDialog.tsx). No other app has a calculator dialog.

## Usage guidance

The dialog is opened by a Dialog.Trigger written inside the Dialog root instead of a controlled open (a secondary solid soft button at scale "sm"); the popup, raised Title with the close X (Button-031) and Body measure the same as the template picker. The popup is the default 480px. The example is the Dialog frame you copy (Popup, raised Title with the close X, Body); the calculator fields are supporting parts shown in In context.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Type`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `solid`
- `scale`: `sm`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the Thickness Calculator while it is open over the ADM base plate page. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The default 480px calculator window (520px in the ADM scene) that keeps focus off the first control until the user acts. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar reading "Thickness Calculator" with the close X at its end. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The words "Thickness Calculator" at the start of the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Spacer** — The flexible gap between the calculator name and the close X. Selector: `[class~="aui-dialog-spacer"]`.
6. **Close** — The close X that returns the user to the base plate inputs without applying the calculation. Selector: `[class~="aui-dialog-close"]`.
7. **Body** — The scrolling body that holds the calculator inputs and result; the example shows a one-line placeholder. Selector: `[class~="aui-dialog-body"]`.
8. **Calculator text** — The p3 placeholder line that stands for the calculator inputs and result (the ADM scene reads "The calculator result goes here."). Part marker: `data-ug-part="calculator-text"`. Direct text is highlighted.

## Apps

- ADM (`adm`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Calculator dialog (`adm-calculator`)

Apps: ADM

In context source: ADM: `src/features/base-plate/components/ThicknessCalculatorDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Trigger** — The secondary solid soft "Thickness Calculator" button on the ADM base plate inputs that opens the dialog; it is written inside the same Dialog root. Selector: `[class~="aui-dialog-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-003/example.tsx`

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
              Thickness Calculator
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="calculator-text" as="p" role="p3">
                The calculator inputs and result go here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-003/options/adm-calculator/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Type } from '../../../../../kit';

// ADM Thickness Calculator (src/features/base-plate/components/ThicknessCalculatorDialog.tsx): the dialog is opened by a Dialog.Trigger written inside the same Dialog root
// (a secondary solid soft "sm" button), then the usual raised Title with Spacer and close X over a Body. Shown open next to its trigger; the app's information panel, chart and error state are left out.
export default function AdmCalculatorScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Trigger type="button" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
        Thickness Calculator
      </Dialog.Trigger>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Thickness Calculator
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="calculator-text" as="p" role="p3">
                The calculator result goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
