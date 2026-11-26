# Dialog-002: Report preview dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-002/usecase.ts`

## What it is

A dialog with a raised title bar and a close X over a report preview: the Calculation Report window of ADC.

## When to choose it

Use it to show a generated document the user reads before exporting it, in a window that does not leave the workspace. Do not use it for a short message or a confirm (a plain Dialog, AlertDialog-003) or to edit the report.

## Where it belongs

ADC: the Calculation Report window opened from the report flow (src/adc/components/ReportFlow.tsx, ReportPreviewDialog). No other app has a report preview dialog.

## Usage guidance

The same raised Title and close X as the About dialog (28px title bar, 20px close X, content starting at the popup edge), with the close X wrapped in a "Close" tooltip, over a Dialog.Body with profile "no-padding" holding one role="document" View that centres the preview text. The app popup is draggable and resizable; the scene is a plain 520px popup and leaves out the generated PDF and the drag and resize handles. The example is the Dialog frame you copy (Popup, raised Title with the close X, Body); the document View is a supporting part shown in In context.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`
- `paint`: `solid`, `text`
- `scale`: `sm`
- `profile`: `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the Calculation Report window in ADC; the preview stage stays visible because the dialog is non-modal here. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The plain 520px report window at the default scale; the ADC app makes it draggable and resizable, which the example leaves out. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar that names the report "Calculation Report" and ends in the close X. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The words "Calculation Report" at the start of the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Spacer** — The gap that pushes the close X to the end of the title bar, ahead of the "Close" tooltip in the ADC scene. Selector: `[class~="aui-dialog-spacer"]`.
6. **Close** — The close X of the report window; the ADC scene wraps it in a "Close" tooltip trigger. Selector: `[class~="aui-dialog-close"]`.
7. **Body** — The body of the report window; in the ADC scene it uses the no-padding profile so the document View reaches the popup edges. Selector: `[class~="aui-dialog-body"]`.
8. **Preview text** — The p3 line "The preview of the report goes here." that stands in for the generated report in the Dialog frame. Part marker: `data-ug-part="preview-text"`. Direct text is highlighted.

## Component layer steps

1. **Overlay** — Scrim behind Calculation Report leaves the preview stage visible. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — Plain 520px report window; ADC adds drag and resize behavior. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — Raised title names Calculation Report and ends with Close. Selector: `[class~="aui-dialog-title"]`.
4. **Spacer** — Spacer pushes the Close action to the title bar end. Selector: `[class~="aui-dialog-spacer"]`.
5. **Close** — Report X closes the window; ADC wraps it in a tooltip. Selector: `[class~="aui-dialog-close"]`.
6. **Body** — No-padding body lets the document view reach both popup edges. Selector: `[class~="aui-dialog-body"]`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Report preview (`adc-report`)

Apps: ADC

In context source: ADC: `src/adc/components/ReportFlow.tsx`

In context view: Shown.

#### In context structure additions

1. **Report document** — The centred role="document" View that shows "Report preview for Design 1" over a line about the generated PDF. Part marker: `data-ug-part="document"`.

#### In context layer steps

1. **Report document** — Centered document preview names Design 1 and its generated PDF. Selector: `[data-ug-part="document"]`.
2. **Overlay** — Scrim behind Calculation Report leaves the preview stage visible. Selector: `[class~="aui-dialog-backdrop"]`.
3. **Popup** — Plain 520px report window; ADC adds drag and resize behavior. Selector: `[class~="aui-dialog-popup"]`.
4. **Title bar** — Raised title names Calculation Report and ends with Close. Selector: `[class~="aui-dialog-title"]`.
5. **Spacer** — Spacer pushes the Close action to the title bar end. Selector: `[class~="aui-dialog-spacer"]`.
6. **Close** — Report X closes the window; ADC wraps it in a tooltip. Selector: `[class~="aui-dialog-close"]`.
7. **Body** — No-padding body lets the document view reach both popup edges. Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-002/example.tsx`

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
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Calculation Report
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="preview-text" as="p" role="p3">
                The preview of the report goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-002/options/adc-report/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Tooltip, Type, View } from '../../../../../kit';

// ADC report preview (src/adc/components/ReportFlow.tsx, ReportPreviewDialog): a raised Title whose close X is wrapped in a "Close" tooltip, then a Body with the no-padding profile
// holding one role="document" View that centres the preview text. The app popup is draggable and resizable; here it is a plain 520px popup. Left out: the generated PDF and the drag and resize handles.
export default function AdcReportScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aria-label="Calculation Report" style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Calculation Report
              <Dialog.Spacer />
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger render={<Dialog.Close aria-label="Close" />} />
                  <Tooltip.Portal container={host}>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Close</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Dialog.Title>
            <Dialog.Body aui={{ profile: 'no-padding' }}>
              <View data-ug-part="document"
                role="document"
                aria-label="Calculation report preview"
                aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8', flex: 'fill' } }}
              >
                <Type as="p" role="p1" weight="semi-bold">
                  Report preview for Design 1
                </Type>
                <Type as="p" role="p2">
                  The generated PDF report is shown here.
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
