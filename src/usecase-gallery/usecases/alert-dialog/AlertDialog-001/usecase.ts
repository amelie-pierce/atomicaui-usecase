import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Confirm with warning icon',
  apps: ['hcs', 'ace', 'adm', 'adc'],
  options: [
    { id: "hcs-reset", name: "Reset confirm", apps: ["hcs","ace","adm"], source: {"hcs":"src/components/HcsResetDialog.tsx","ace":"src/features/reset-inputs/ui/ResetInputsAction.tsx","adm":"src/features/top-navigation/components/ResetDialog.tsx"} },
    { id: "adc-reset", name: "Reset confirm — UI variant 2", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} },
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
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim that interrupts the user before the Reset Inputs confirm; the gallery draws the alert as a non-modal Dialog.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The confirm window at scale "sm" with a soft shape; 560px wide in HCS (480px in ACE and ADM, 640px default scale in ADC).',
      code: `<Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(560px, 100%)' } as React.CSSProperties}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar that carries the warning icon, "Warning: Reset Inputs?", the spacer and the close X.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
  Warning: Reset Inputs?
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />
</Dialog.Title>`,
    },
    {
      id: 'icon',
      name: 'Warning icon',
      token: 'Dialog.Icon',
      selector: '[class~="aui-dialog-title"] [class~="aui-contained-icon"]',
      description: 'The triangle-exclamation glyph in the warning colour that marks this prompt as a caution.',
      code: `<Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The question "Warning: Reset Inputs?" that names what the user is about to do.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  <Dialog.Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
  Warning: Reset Inputs?`,
    },
    {
      id: 'spacer',
      name: 'Spacer',
      token: 'Dialog.Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap that pushes the close X to the end of the title bar.',
      code: `<Dialog.Spacer />`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X labelled "Close Reset" that leaves the inputs untouched.',
      code: `<Dialog.Close aria-label="Close Reset" aui={{ scale: 'sm' }} />`,
    },
    {
      id: 'description',
      name: 'Description',
      token: 'Dialog.Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The sentence that says what is lost: "You are about to reset all input fields. This cannot be undone." (ADC explains that project information and design names are preserved).',
      code: `<Dialog.Description aui={{ scale: 'sm' }}>
  You are about to reset all input fields. This cannot be undone.
</Dialog.Description>`,
    },
    {
      id: 'actions',
      name: 'Footer',
      token: 'Dialog.Actions',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that sits at the end in HCS, ACE and ADM; in ADC it is split and wraps three buttons.',
      code: `<Dialog.Actions aui={{ scale: 'sm' }}>`,
    },
    {
      id: 'cancel',
      name: 'Cancel',
      token: 'Dialog.Button',
      description: 'The default Cancel that backs out of the reset.',
      code: `<Dialog.Button data-ug-part="cancel" aui={{ scale: 'sm' }}>Cancel</Dialog.Button>`,
    },
    {
      id: 'confirm',
      name: 'Reset',
      token: 'Dialog.Button',
      description: 'The solid destructive button: a secondary Reset in HCS, ACE and ADM, and the solid error "Reset All Designs to Standard" in ADC.',
      code: `<Dialog.Button data-ug-part="confirm" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Reset</Dialog.Button>`,
    },
    {
      id: 'reset-current',
      name: 'Reset current design',
      token: 'Dialog.Button',
      description: 'The ADC-only text error button "Reset Current Design to Standard" that offers the narrower reset.',
      code: `<Dialog.Button data-ug-part="reset-current" aui={{ color: 'error', paint: 'text', sx: { whiteSpace: 'nowrap' } }}>Reset Current Design to Standard</Dialog.Button>`,
    },
  ],
});
