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
});
