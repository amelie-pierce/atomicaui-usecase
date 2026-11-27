# Button-015: Acknowledge notice button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-015/usecase.ts`

## What it is

A solid primary Button, orange with white text, is the lone OK that acknowledges a notice.

## When to choose it

Use it where the app colors its one dialog action with the accent. For a plain dismiss use the neutral Button-007, and keep the close X in the Title as the other way out.

## Where it belongs

The footer of a dialog that only informs. Real site source: ADC src/adc/components/DesignCapacityDialog.tsx (OK of the Maximum Number of Designs Reached notice); the About dialog ends the same way with Close. The other apps use the gray or black single button of Button-007.

## Usage guidance

Set aui color "primary", paint "solid" and scale "sm" (the Dialog.Button default scale). In context it is the one Dialog.Button of an AlertDialog drawn as a non-modal Dialog, as in AlertDialog-003, with a circle-xmark error icon in the raised Title, the close X inside a "Close" tooltip (top, 8px offset, solid secondary sm) and one paragraph; the real body holds more.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Dialog`, `Tooltip`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `error`, `primary`, `raised`, `secondary`
- `paint`: `solid`
- `scale`: `sm`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Container** — The OK Button of an ADC notice dialog: solid primary (orange), small, the only action in the footer. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`. Layer step: **Container** — Small orange OK is the notice dialog’s only footer action.
2. **Label** — The text "OK" that acknowledges the Maximum Number of Designs Reached notice. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`. Direct text is highlighted.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Info OK (`adc-ok`)

Apps: ADC

In context source: ADC: `src/adc/components/DesignCapacityDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Dialog** — The open alert dialog. Part marker: `data-ug-part="dialog"`. Layer step: **Dialog** — Alert dialog shows the notice and its only action.
2. **Dialog title** — The raised title bar "Maximum Number of Designs Reached". Part marker: `data-ug-part="dialog-title"`. Layer step: **Dialog title** — The raised title bar "Maximum Number of Designs Reached".
3. **Error icon** — The error-colored circle-xmark icon before the title. Part marker: `data-ug-part="error-icon"`. Layer step: **Error icon** — Error-coloured circle-xmark appears before the alert dialog title.
4. **Close button** — The X at the end of the title, shown in a "Close" tooltip. Part marker: `data-ug-part="dialog-close"`. Layer step: **Close button** — Title X shows a Close tooltip before dismissing the notice.
5. **Message** — The text that a Project can contain at most 15 Designs. Part marker: `data-ug-part="message"`. Layer step: **Message** — The text that a Project can contain at most 15 Designs.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-015/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return <Button aui={{ color: 'primary', paint: 'solid', scale: 'sm' }}>OK</Button>;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-015/options/adc-ok/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Tooltip } from '../../../../../kit';

// ADC DesignCapacityDialog (the About dialog ends the same way with Close): an AlertDialog whose one footer button is a solid primary (orange) OK, with the close X in a "Close" tooltip.
export default function AdcOkScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              <Dialog.Icon data-ug-part="error-icon" name="circle-xmark" aui={{ color: 'error' }} />
              Maximum Number of Designs Reached
              <Dialog.Spacer />
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger data-ug-part="dialog-close" render={<Dialog.Close aria-label="Close" />} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Close</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Dialog.Title>
            <Dialog.Description data-ug-part="message">
              A Project can contain a maximum of 15 Designs. Please close an existing Design before creating or duplicating a Design.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button aui={{ color: 'primary', paint: 'solid' }}>OK</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
