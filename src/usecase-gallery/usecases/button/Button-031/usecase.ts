import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Close dialog button',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  options: [
    { id: "hcs-close", name: "Dialog close", apps: ["hcs","ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/F01Experience.tsx","ace":"src/features/file-persistence/ui/OpenFromDeviceDialog.tsx","adm":"src/features/top-navigation/components/FeedbackDialog.tsx","pfd":"src/pfd/ShellDialogs.tsx","pbs":"src/WorkspaceTools.tsx","hs":"src/hs/ShellDialog.tsx","fd":"src/components/ui.jsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} },
    { id: "adc-close", name: "Dialog close — UI variant 2", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} },
    { id: "pbs-close", name: "Close without Title", apps: ["pbs"], source: {"pbs":"src/ResultsSection.tsx"} },
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
    { id: 'popup', name: 'Popup', token: 'Dialog.Popup', selector: '[class~="aui-dialog-popup"]', description: 'The dialog surface: ADC and PBS use the default width, HCS a 384px popup.',
      code: `<Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>` },
    { id: 'title', name: 'Title', token: 'Dialog.Title', selector: '[class~="aui-dialog-title"]', description: 'The raised title bar of the ADC Feedback Form and HCS Send feedback dialogs, with the heading and a spacer pushing Close to its end; PBS has no title.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  Send feedback
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close Send feedback" aui={{ scale: 'sm' }} />
</Dialog.Title>` },
    { id: 'dialog-close', name: 'Dialog close', token: 'Dialog.Close', selector: '[class~="aui-dialog-close"]', description: 'The transparent xmark control at the end of the title (ADC wraps it in a Close tooltip, HCS names it Close Send feedback); in PBS it sits alone in a right-aligned row above the body.',
      code: `<Dialog.Close aria-label="Close" />` },
    { id: 'icon-button', name: 'Close button', token: 'IconButton', selector: '[class~="aui-button"]:not([class~="aui-dialog-close"])', description: 'The standalone 20px transparent xmark IconButton shown in the example before it is mounted as a Dialog.Close.',
      code: `<IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />` },
    { id: 'tooltip', name: 'Close tooltip', token: 'Tooltip.Popup', selector: '[class~="aui-tooltip-popup"]', description: 'ADC only: the secondary tooltip reading Close shown above the close control.',
      code: `<Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Close</Tooltip.Popup>` },
    { id: 'body', name: 'Body', token: 'Dialog.Body', selector: '[class~="aui-dialog-body"]', description: 'PBS only: the body that carries the confirmation Are you sure you want to delete Connection 1.',
      code: `<Dialog.Body>
  <Type as="p" role="p3">Are you sure you want to delete Connection 1</Type>
</Dialog.Body>` },
  ],
});
