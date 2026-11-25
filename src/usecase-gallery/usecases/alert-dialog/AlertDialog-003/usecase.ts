import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Reset confirm dialog',

  apps: ['hcs', 'ace', 'adm', 'hs', 'fd', 'adc'],
  options: [
    { id: "hcs-reset", showContext: false, name: "Reset confirm", apps: ["hcs"], source: {"hcs":"src/components/HcsResetDialog.tsx"} },
    { id: "ace-reset", name: "Reset confirm — UI variant 2", apps: ["ace"], source: {"ace":"src/features/reset-inputs/ui/ResetInputsAction.tsx"} },
    { id: "adm-reset", showContext: false, name: "Reset confirm — UI variant 3", apps: ["adm"], source: {"adm":"src/features/top-navigation/components/ResetDialog.tsx"} },
    { id: "hs-reset", name: "Reset confirm — UI variant 4", apps: ["hs","fd"], source: {"hs":"src/App.tsx","fd":"src/App.jsx"} },
    { id: "adc-reset", name: "Reset confirm — UI variant 5", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} },
  ],
  source: { hcs: 'src/components/HcsResetDialog.tsx', ace: 'src/features/reset-inputs/ui/ResetInputsAction.tsx', adm: 'src/features/top-navigation/components/ResetDialog.tsx', hs: 'src/App.tsx', fd: 'src/App.jsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'A confirmation that asks before every input is reset: a warning title, a description of what is lost, and a Cancel next to a solid Reset.',
  where: 'The Reset inputs confirmation of the top bar. Real site source: HCS HcsResetDialog.tsx, ACE ResetInputsAction.tsx, ADM ResetDialog.tsx, HS and FD App.tsx and ADC Workspace.tsx (the paths are in source). '
    + 'PFD, AGPD, RWS and PBS reset at once and have no Reset confirm.',
  when: 'Use it when one explicit choice must be made before an action that erases work. In brand atomic the near-black fill is color "secondary", not "primary" (orange), and gray is "surface-alt", not "secondary". '
    + 'ADC is the exception: its Reset buttons are "error". AlertDialog-001 documents the same Reset action of HCS, ACE, ADM and ADC from the AlertDialog side; fold them when AlertDialog is converted.',
  how: 'In the apps this is AlertDialog with AlertDialog.Button in the footer; the gallery draws it as a non-modal Dialog because the vendored AlertDialog is forced modal (copy the code with AlertDialog in place of Dialog). '
    + 'Reset sets color "secondary" and paint "solid" (scale "sm" in HCS); Cancel is the default (color "surface-alt", paint "solid"). Five groups, one scene each. '
    + 'HCS (the scene is HcsResetDialog: 560px popup, raised warning Title, close X labelled "Close Reset", Cancel and a solid secondary Reset); ADM (480px popup, close X labelled "Close", same Title, body and footer); ACE (the default popup width, 480px measured, and no close X: ResetInputsAction writes none; same Title, body and footer). '
    + 'Measured in the browser, all three render the same Title (28px, bold, raised fill, 18x14 warning icon), body text and footer (Cancel 66x28 then Reset 58x28, same fills, radius, 16px text), so the groups differ only in popup width (HCS 560px vs 480px) and in the close X (HCS and ADM have it, ACE has none). '
    + 'HS and FD (384px, plain Title, close X, and a Spacer between Cancel and Reset). '
    + 'ADC (640px, three buttons: Cancel, a text error "Reset Current Design to Standard" and a solid error "Reset All Designs to Standard", with the close X in a tooltip). Every scene is cut to the least that shows the footer.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the reset confirm shared by five apps.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The 560px soft confirm window at scale "sm" (ADM uses 480px, HS 384px, ADC a 640px cap).',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar with the warning icon and "Warning: Reset Inputs?"; ACE leaves out the close X and HS leaves the bar plain.',
    },
    {
      id: 'icon',
      name: 'Warning icon',
      selector: '[class~="aui-dialog-title"] [class~="aui-contained-icon"]',
      description: 'The warning-coloured triangle-exclamation icon at the start of the title.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The question "Warning: Reset Inputs?".',
    },
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap before the close X in the title bar; HS also places one between Cancel and Reset in its footer.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X labelled "Close Reset"; in ADC it sits in a "Close" tooltip trigger.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The HS-only body that wraps its description instead of placing it directly in the popup.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The warning that all input fields will be reset and that the project configurations erased cannot be recovered.',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that holds Cancel and the destructive button; split and wrapping in ADC.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The default Cancel next to the destructive action.',
    },
    {
      id: 'confirm',
      name: 'Reset',
      description: 'The solid secondary Reset that clears every input in HCS, ACE, ADM and HS.',
    },
    {
      id: 'reset-current',
      name: 'Reset current design',
      description: 'The ADC text error button "Reset Current Design to Standard".',
    },
    {
      id: 'reset-all',
      name: 'Reset all designs',
      description: 'The ADC solid error button "Reset All Designs to Standard".',
    },
    {
      id: 'close-tooltip',
      name: 'Close tooltip',
      selector: '[class~="aui-tooltip-popup"]',
      description: 'The ADC tooltip that labels the close X "Close" on hover.',
    },
  ],
});
