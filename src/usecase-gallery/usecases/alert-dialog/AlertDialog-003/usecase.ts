import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'AlertDialog',
  title: 'Reset confirm dialog',
  look: 'Cancel and secondary Reset',
  apps: ['hcs', 'ace', 'adm', 'hs', 'fd', 'adc'],
  cases: [
    { id: 'hcs-reset', name: 'Reset confirm', apps: ['hcs'], source: { hcs: 'src/components/HcsResetDialog.tsx' } },
    { id: 'ace-reset', name: 'Reset confirm', apps: ['ace'], source: { ace: 'src/features/reset-inputs/ui/ResetInputsAction.tsx' } },
    { id: 'adm-reset', name: 'Reset confirm', apps: ['adm'], source: { adm: 'src/features/top-navigation/components/ResetDialog.tsx' } },
    { id: 'hs-reset', name: 'Reset confirm', apps: ['hs', 'fd'], source: { hs: 'src/App.tsx', fd: 'src/App.jsx' } },
    { id: 'adc-reset', name: 'Reset confirm', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
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
});
