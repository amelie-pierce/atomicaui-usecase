import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Report preview dialog',
  apps: ['adc'],
  cases: [
    {
      id: 'adc-report',
      name: 'Report preview',
      apps: ['adc'],
      source: { adc: 'src/adc/components/ReportFlow.tsx' },
    },
  ],
  source: {
    adc: 'src/adc/components/ReportFlow.tsx',
  },
  summary: 'A dialog with a raised title bar and a close X over a report preview: the Calculation Report window of ADC.',
  where: 'ADC: the Calculation Report window opened from the report flow (src/adc/components/ReportFlow.tsx, ReportPreviewDialog). No other app has a report preview dialog.',
  when: 'Use it to show a generated document the user reads before exporting it, in a window that does not leave the workspace. Do not use it for a short message or a confirm (a plain Dialog, AlertDialog-003) or to edit the report.',
  how: 'The same raised Title and close X as the About dialog (28px title bar, 20px close X, content starting at the popup edge), with the close X wrapped in a "Close" tooltip, over a Dialog.Body with profile "no-padding" holding one role="document" View that centres the preview text. The app popup is draggable and resizable; the scene is a plain 520px popup and leaves out the generated PDF and the drag and resize handles. The example is the Dialog frame you copy (Popup, raised Title with the close X, Body); the document View is a supporting part shown in In context.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Calculation Report window in ADC; the preview stage stays visible because the dialog is non-modal here.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The plain 520px report window at the default scale; the ADC app makes it draggable and resizable, which the example leaves out.',
      code: `<Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar that names the report "Calculation Report" and ends in the close X.',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  Calculation Report
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close" />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The words "Calculation Report" at the start of the title bar.',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  Calculation Report`,
    },
    {
      id: 'spacer',
      name: 'Spacer',
      token: 'Dialog.Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap that pushes the close X to the end of the title bar, ahead of the "Close" tooltip in the ADC scene.',
      code: `<Dialog.Spacer />`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X of the report window; the ADC scene wraps it in a "Close" tooltip trigger.',
      code: `<Dialog.Close aria-label="Close" />`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body of the report window; in the ADC scene it uses the no-padding profile so the document View reaches the popup edges.',
      code: `<Dialog.Body>
  <Type data-ug-part="preview-text" as="p" role="p3">
    The preview of the report goes here.
  </Type>
</Dialog.Body>`,
    },
    {
      id: 'preview-text',
      name: 'Preview text',
      token: 'Type',
      text: true,
      description: 'The p3 line "The preview of the report goes here." that stands in for the generated report in the Dialog frame.',
      code: `<Type data-ug-part="preview-text" as="p" role="p3">
  The preview of the report goes here.
</Type>`,
    },
    {
      id: 'document',
      name: 'Report document',
      token: 'View',
      description: 'The centred role="document" View of the ADC scene that shows "Report preview for Design 1" over a line about the generated PDF.',
      code: `<View
  data-ug-part="document"
  role="document"
  aria-label="Calculation report preview"`,
    },
  ],
});
