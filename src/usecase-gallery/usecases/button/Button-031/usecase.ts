import { defineUsecase } from '../../../define';

const TITLE_CONTEXT = [
  { id: 'title-spacer', name: 'Title spacer', selector: '[class~="aui-dialog-spacer"]', description: 'The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar.' },
];

const PBS_CONTEXT = [
  { id: 'close-row', name: 'Close row', selector: '[data-ug-part="close-row"]', description: 'The end-aligned row that holds only the close X above the dialog body, since this dialog has no title.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Close dialog button',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
    layers: [
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The dialog surface: ADC and PBS use the default width, HCS a 384px popup.","keyIdea":"The dialog surface: ADC and PBS use the default width, HCS a 384px popup.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title","explanation":"The raised title bar of the ADC Feedback Form and HCS Send feedback dialogs, with the heading and a spacer pushing Close to its end; PBS has no title.","keyIdea":"The raised title bar of the ADC Feedback Form and HCS Send feedback dialogs, with the heading and a spacer pushing Close to its end; PBS has no title.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"dialog-close","partId":"dialog-close","title":"Dialog close","explanation":"The transparent xmark control at the end of the title (ADC wraps it in a Close tooltip, HCS names it Close Send feedback); in PBS it sits alone in a right-aligned row above the body.","keyIdea":"The transparent xmark control at the end of the title (ADC wraps it in a Close tooltip, HCS names it Close Send feedback); in PBS it sits alone in a right-aligned row above the body.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"icon-button","partId":"icon-button","title":"Close button","explanation":"The standalone 20px transparent xmark IconButton shown in the example before it is mounted as a Dialog.Close.","keyIdea":"The standalone 20px transparent xmark IconButton shown in the example before it is mounted as a Dialog.Close.","selector":"[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])"},
        {"id":"tooltip","partId":"tooltip","title":"Close tooltip","explanation":"ADC only: the secondary tooltip reading Close shown above the close control.","keyIdea":"ADC only: the secondary tooltip reading Close shown above the close control.","selector":"[class~=\"aui-tooltip-popup\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"PBS only: the body that carries the confirmation Are you sure you want to delete Connection 1.","keyIdea":"PBS only: the body that carries the confirmation Are you sure you want to delete Connection 1.","selector":"[class~=\"aui-dialog-body\"]"},
      ],
options: [
    { id: "hcs-close", contextAnatomy: TITLE_CONTEXT, name: "Dialog close", apps: ["hcs","ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/F01Experience.tsx","ace":"src/features/file-persistence/ui/OpenFromDeviceDialog.tsx","adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellDialog.tsx","fd":"src/components/ui.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} ,
      contextLayers: [
        {"id":"context-title-spacer","partId":"title-spacer","title":"Title spacer","explanation":"The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar.","keyIdea":"The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar.","selector":"[class~=\"aui-dialog-spacer\"]","scope":"context"},
      ],
    },
    { id: "adc-close", contextAnatomy: TITLE_CONTEXT, name: "Dialog close — UI variant 2", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [
        {"id":"context-title-spacer","partId":"title-spacer","title":"Title spacer","explanation":"The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar.","keyIdea":"The Dialog.Spacer between the title text and the close X that pushes the X to the end of the raised title bar.","selector":"[class~=\"aui-dialog-spacer\"]","scope":"context"},
      ],
    },
    { id: "pbs-close", contextAnatomy: PBS_CONTEXT, name: "Close without Title", apps: ["pbs"], source: {"pbs":"src/ResultsSection.tsx"} ,
      contextLayers: [
        {"id":"context-close-row","partId":"close-row","title":"Close row","explanation":"The end-aligned row that holds only the close X above the dialog body, since this dialog has no title.","keyIdea":"The end-aligned row that holds only the close X above the dialog body, since this dialog has no title.","selector":"[data-ug-part=\"close-row\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/ResultsSection.tsx', hs: 'src/hs/ShellDialog.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'A transparent icon-only IconButton, 20px square, closes a dialog from the end of its Title.',
  where: 'The Title end of a dialog (the whole dialog use cases are Dialog and AlertDialog). Real site source: the dialogs of every app; PBS also writes a header row holding only the X for its Remove and Duplicate dialogs.',
  when: 'Use it to dismiss a dialog without acting; it is the same as the neutral Cancel of the footer. '
    + 'Do not use it as the only way out of a dialog that needs a decision, and leave it out where the app forbids closing (the PBS licence gate). Always set aria-label.',
  how: 'The real part is Dialog.Close, an IconButton named "xmark" with paint "text" and profile "contained", taking the popup scale (the example uses IconButton, since Dialog.Close needs a Dialog around it). '
    + 'Dialog close: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (a raised Title with a Spacer and the 20x20 contained X; the scene is HCS, which sets scale "sm", the default, on the Title and the X; measured in the browser, HCS and the others render the same elements and styles and differ only in popup width, 384px vs 480px, and the aria-label; their licence gates set scale "sm" on a plain Title and the X, and PBS drops the X there); ADC (the X wrapped in a Tooltip, a solid secondary sm popup reading "Close", measured 59x28 on hover). '
    + 'Close without Title: PBS only (HeaderClose, the Remove and Duplicate dialogs): no Title, a View row with justifyContent "end" holding only the X. The dialog scenes keep the Title only: no body or footer.',
  anatomy: [
    { id: 'popup', name: 'Popup', selector: '[class~="aui-dialog-popup"]', description: 'The dialog surface: ADC and PBS use the default width, HCS a 384px popup.' },
    { id: 'title', name: 'Title', selector: '[class~="aui-dialog-title"]', description: 'The raised title bar of the ADC Feedback Form and HCS Send feedback dialogs, with the heading and a spacer pushing Close to its end; PBS has no title.' },
    { id: 'dialog-close', name: 'Dialog close', selector: '[class~="aui-dialog-close"]', description: 'The transparent xmark control at the end of the title (ADC wraps it in a Close tooltip, HCS names it Close Send feedback); in PBS it sits alone in a right-aligned row above the body.' },
    { id: 'icon-button', name: 'Close button', selector: '[class~="aui-button"]:not([class~="aui-dialog-close"])', description: 'The standalone 20px transparent xmark IconButton shown in the example before it is mounted as a Dialog.Close.' },
    { id: 'tooltip', name: 'Close tooltip', selector: '[class~="aui-tooltip-popup"]', description: 'ADC only: the secondary tooltip reading Close shown above the close control.' },
    { id: 'body', name: 'Body', selector: '[class~="aui-dialog-body"]', description: 'PBS only: the body that carries the confirmation Are you sure you want to delete Connection 1.' },
  ],
});
