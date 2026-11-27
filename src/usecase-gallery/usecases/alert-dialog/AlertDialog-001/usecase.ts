import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Confirm with warning icon',
  apps: ['hcs', 'ace', 'adm', 'adc'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"Scrim interrupts the workspace before the Reset Inputs confirmation.","keyIdea":"Dim the editor first so this destructive confirmation interrupts ordinary input work.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Confirm window widths vary by app: 560px or 640px.","keyIdea":"A bounded surface keeps the reset choice readable while app variants adjust its width.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"Raised title names Reset Inputs beside its warning and close controls.","keyIdea":"State the reset decision at the top so people can check the operation before acting.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"icon","partId":"icon","title":"Warning icon","explanation":"Triangle-exclamation glyph signals caution before the warning is read.","keyIdea":"The warning glyph adds a caution cue before users read the consequence.","selector":"[class~=\"aui-dialog-title\"] [class~=\"aui-contained-icon\"]","code":["Dialog.Icon"]},
        {"id":"spacer","partId":"spacer","title":"Spacer","explanation":"Flexible gap pushes the close control to the title bar end.","keyIdea":"Flexible space keeps the close target away from the warning title.","selector":"[class~=\"aui-dialog-spacer\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"Close X dismisses the dialog without changing any inputs.","keyIdea":"The labelled close action leaves the existing inputs untouched.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"description","partId":"description","title":"Description","explanation":"Description explains what the reset changes before users confirm.","keyIdea":"Describe exactly what will be lost before asking for confirmation.","selector":"[class~=\"aui-dialog-description\"]"},
        {"id":"actions","partId":"actions","title":"Footer","explanation":"Footer groups the safe exit and reset choices after the warning.","keyIdea":"Gather every way out or forward after the consequence is clear.","selector":"[class~=\"aui-dialog-actions\"]"},
        {"id":"cancel","partId":"cancel","title":"Cancel","explanation":"Cancel backs out and keeps current inputs unchanged.","keyIdea":"Keeping Cancel first makes backing out the immediate, low-risk choice.","selector":"[data-ug-part=\"cancel\"]"},
        {"id":"confirm","partId":"confirm","title":"Reset","explanation":"Solid confirm button runs the reset named in its label.","keyIdea":"The destructive treatment distinguishes clearing inputs from ordinary dismissal.","selector":"[data-ug-part=\"confirm\"]"},
        {"id":"reset-current","partId":"reset-current","title":"Reset current design","explanation":"ADC offers a text action to reset only this design.","keyIdea":"A narrower target protects other designs when only the current design needs resetting.","selector":"[data-ug-part=\"reset-current\"]"},
      ],
options: [
    { id: "hcs-reset", showContext: false, name: "Reset confirm", apps: ["hcs","ace","adm"], source: {"hcs":"src/components/HcsResetDialog.tsx","ace":"src/features/reset-inputs/ui/ResetInputsAction.tsx","adm":"src/features/top-navigation/components/ResetDialog.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adc-reset", showContext: false, name: "Multiple reset actions", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { hcs: 'src/components/HcsResetDialog.tsx', ace: 'src/features/reset-inputs/ui/ResetInputsAction.tsx', adm: 'src/features/top-navigation/components/ResetDialog.tsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'A confirmation that interrupts the user: a warning icon title with a close X, a description of what is lost, and a Cancel next to the destructive action.',
  where: 'The Reset inputs confirmation of the top bar (HCS, ACE, ADM, ADC). Real source: HcsResetDialog.tsx, ResetInputsAction.tsx (ACE), ResetDialog.tsx (ADM) and the Reset inputs dialog of Workspace.tsx (ADC).',
  when: 'Use it when one explicit choice must be made before an action that erases work. Do not use it for information the user can dismiss (a Dialog) or a one-button notice (AlertDialog-002).',
  how: 'In the apps this is `AlertDialog` with `clickOutsideToClose={false}`: Portal, Backdrop, Viewport, Popup, then a Title (`color: "raised"`) holding `AlertDialog.Icon` (triangle-exclamation, `color: "warning"`), the text, `AlertDialog.Spacer` and `AlertDialog.Close`, a Description and Actions with `AlertDialog.Button`s (Cancel text, the action `color: "secondary"` solid, autoFocus on Cancel). The kit has no modal-free AlertDialog, so the gallery draws it as a non-modal Dialog with the same parts (`Dialog.Icon`, `Dialog.Description`, `Dialog.Actions`, `Dialog.Button`) and the same aui; copy the code with `AlertDialog` in place of `Dialog`. Reset confirm has two groups: HCS, ACE and ADM (scale "sm", soft shape, Cancel and Reset; the popup is 560px in HCS and 480px in ACE and ADM, a size, not a second look) and ADC (default scale, Actions `align="split"` with Cancel, a text error Button and a solid error Button). The scenes leave out the Close tooltip of ADC and the focus handling.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim that interrupts the user before the Reset Inputs confirm; the gallery draws the alert as a non-modal Dialog.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The confirm window at scale "sm" with a soft shape; 560px wide in HCS (480px in ACE and ADM, 640px default scale in ADC).',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar that carries the warning icon, "Warning: Reset Inputs?", the spacer and the close X.',
    },
    {
      id: 'icon',
      name: 'Warning icon',
      selector: '[class~="aui-dialog-title"] [class~="aui-contained-icon"]',
      description: 'The triangle-exclamation glyph in the warning colour that marks this prompt as a caution.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[data-ug-part="title-text"]',
      text: true,
      description: 'The question "Warning: Reset Inputs?" that names what the user is about to do.',
    },
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap that pushes the close X to the end of the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X labelled "Close Reset" that leaves the inputs untouched.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The sentence that says what is lost: "You are about to reset all input fields. This cannot be undone." (ADC explains that project information and design names are preserved).',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that sits at the end in HCS, ACE and ADM; in ADC it is split and wraps three buttons.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The default Cancel that backs out of the reset.',
    },
    {
      id: 'confirm',
      name: 'Reset',
      description: 'The solid destructive button: a secondary Reset in HCS, ACE and ADM, and the solid error "Reset All Designs to Standard" in ADC.',
    },
    {
      id: 'reset-current',
      name: 'Reset current design',
      description: 'The ADC-only text error button "Reset Current Design to Standard" that offers the narrower reset.',
    },
  ],
});
