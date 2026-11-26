import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Reset confirm dialog',

  apps: ['hcs', 'ace', 'adm', 'hs', 'fd', 'adc'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"Scrim keeps the reset confirm separate from the active workspace.","keyIdea":"The scrim separates the warning from the workspace before users choose what to reset.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Soft reset window varies from 384px to 640px across apps.","keyIdea":"A fixed dialog boundary gives the destructive choice a readable decision area across app widths.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"Raised warning title names Reset Inputs before users decide.","keyIdea":"Name the reset operation in the header so users can confirm the target before reading details.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"icon","partId":"icon","title":"Warning icon","explanation":"Warning triangle leads the title and signals destructive work.","keyIdea":"This caution symbol identifies the operation as destructive even when the title is scanned quickly.","selector":"[class~=\"aui-dialog-title\"] [class~=\"aui-contained-icon\"]","unchanged":true},
        {"id":"spacer","partId":"spacer","title":"Spacer","explanation":"Flexible gap separates the title from its close control.","keyIdea":"Use the remaining header space to position its close target without crowding the warning.","selector":"[class~=\"aui-dialog-spacer\"]","code":["Dialog"]},
        {"id":"close","partId":"close","title":"Close","explanation":"Close Reset leaves without triggering either reset action.","keyIdea":"Closing the alert is a safe alternative to either reset action.","selector":"[class~=\"aui-dialog-close\"]","code":["Dialog"],"unchanged":true},
        {"id":"body","partId":"body","title":"Body","explanation":"HS wraps its reset warning in a separate dialog body.","keyIdea":"The HS body wrapper keeps the explanation grouped as dialog content instead of loose popup text.","selector":"[class~=\"aui-dialog-body\"]","code":["Dialog"],"unchanged":true},
        {"id":"description","partId":"description","title":"Description","explanation":"Warning says inputs and project settings cannot be recovered.","keyIdea":"Spell out which configuration will be erased so the choice has a concrete consequence.","selector":"[class~=\"aui-dialog-description\"]"},
        {"id":"actions","partId":"actions","title":"Footer","explanation":"Footer groups Cancel and reset actions; ADC wraps its choices.","keyIdea":"Place both outcomes together after the warning, where the decision belongs.","selector":"[class~=\"aui-dialog-actions\"]"},
        {"id":"cancel","partId":"cancel","title":"Cancel","explanation":"Cancel leaves every input unchanged and closes the alert.","keyIdea":"Cancel exits the reset flow while preserving every current input.","selector":"[data-ug-part=\"cancel\"]"},
        {"id":"confirm","partId":"confirm","title":"Reset","explanation":"Secondary Reset clears every input in these apps.","keyIdea":"The primary destructive button clears all inputs covered by this confirmation.","selector":"[data-ug-part=\"confirm\"]","code":["Dialog"]},
        {"id":"reset-current","partId":"reset-current","title":"Reset current design","explanation":"ADC offers a text action to reset only this design.","keyIdea":"Offer a current-design-only action when a full reset would remove too much work.","selector":"[data-ug-part=\"reset-current\"]","code":["Dialog"]},
        {"id":"reset-all","partId":"reset-all","title":"Reset all designs","explanation":"Solid error button resets all designs to standard.","keyIdea":"Reserve a separate all-design action for users who intend to restore every design.","selector":"[data-ug-part=\"reset-all\"]","code":["Dialog"],"unchanged":true},
        {"id":"close-tooltip","partId":"close-tooltip","title":"Close tooltip","explanation":"ADC tooltip labels the close icon while hovered.","keyIdea":"The tooltip names the icon-only exit when pointer users pause over it.","selector":"[class~=\"aui-tooltip-popup\"]","code":["Dialog"],"unchanged":true},
      ],
options: [
    { id: "hcs-reset", showContext: false, name: "Reset confirm", apps: ["hcs"], source: {"hcs":"src/components/HcsResetDialog.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-reset", showContext: false, name: "Reset without close", apps: ["ace"], source: {"ace":"src/features/reset-inputs/ui/ResetInputsAction.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-reset", showContext: false, name: "480px reset dialog", apps: ["adm"], source: {"adm":"src/features/top-navigation/components/ResetDialog.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "hs-reset", showContext: false, name: "Spaced reset footer", apps: ["hs","fd"], source: {"hs":"src/App.tsx","fd":"src/App.jsx"} ,
      contextLayers: [

      ],
    },
    { id: "adc-reset", showContext: false, name: "Wide reset dialog", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [

      ],
    },
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
