import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'AlertDialog',
  title: 'Confirm with warning icon',
  apps: ['hcs', 'ace', 'adm', 'adc'],
  cases: [
    {
      id: 'hcs-reset',
      name: 'Reset confirm',
      apps: ['hcs', 'ace', 'adm'],
      source: { hcs: 'src/components/HcsResetDialog.tsx', ace: 'src/features/reset-inputs/ui/ResetInputsAction.tsx', adm: 'src/features/top-navigation/components/ResetDialog.tsx' },
    },
    { id: 'adc-reset', name: 'Reset confirm', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
  ],
  source: { hcs: 'src/components/HcsResetDialog.tsx', ace: 'src/features/reset-inputs/ui/ResetInputsAction.tsx', adm: 'src/features/top-navigation/components/ResetDialog.tsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'A confirmation that interrupts the user: a warning icon title with a close X, a description of what is lost, and a Cancel next to the destructive action.',
  where: 'The Reset inputs confirmation of the top bar (HCS, ACE, ADM, ADC). Real source: HcsResetDialog.tsx, ResetInputsAction.tsx (ACE), ResetDialog.tsx (ADM) and the Reset inputs dialog of Workspace.tsx (ADC).',
  when: 'Use it when one explicit choice must be made before an action that erases work. Do not use it for information the user can dismiss (a Dialog) or a one-button notice (AlertDialog-002).',
  how: 'In the apps this is `AlertDialog` with `clickOutsideToClose={false}`: Portal, Backdrop, Viewport, Popup, then a Title (`color: "raised"`) holding `AlertDialog.Icon` (triangle-exclamation, `color: "warning"`), the text, `AlertDialog.Spacer` and `AlertDialog.Close`, a Description and Actions with `AlertDialog.Button`s (Cancel text, the action `color: "secondary"` solid, autoFocus on Cancel). The kit has no modal-free AlertDialog, so the gallery draws it as a non-modal Dialog with the same parts (`Dialog.Icon`, `Dialog.Description`, `Dialog.Actions`, `Dialog.Button`) and the same aui; copy the code with `AlertDialog` in place of `Dialog`. Reset confirm has two groups: HCS, ACE and ADM (scale "sm", soft shape, Cancel and Reset; the popup is 560px in HCS and 480px in ACE and ADM, a size, not a second look) and ADC (default scale, Actions `align="split"` with Cancel, a text error Button and a solid error Button). The scenes leave out the Close tooltip of ADC and the focus handling.',
});
