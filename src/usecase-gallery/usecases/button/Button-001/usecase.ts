import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog footer: Cancel and Confirm',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'hcs-reset', name: 'Reset confirm', app: 'hcs', source: 'src/components/HcsResetDialog.tsx' },
    { id: 'hcs-accept', name: 'Accept licence', app: 'hcs' },
    { id: 'hcs-feedback', name: 'Send feedback', app: 'hcs' },
    { id: 'ace-reset', name: 'Reset confirm', app: 'ace', source: 'src/features/reset-inputs/ui/ResetInputsAction.tsx' },
    { id: 'ace-accept', name: 'Accept licence', app: 'ace', source: 'src/features/eula/ui/EulaGate.tsx' },
    { id: 'ace-feedback', name: 'Send feedback', app: 'ace', source: 'src/features/top-navigation/ui/FeedbackDialog.tsx' },
    { id: 'ace-delete', name: 'Delete confirm', app: 'ace', source: 'src/features/templates/ui/NewFromTemplateDialog.tsx' },
    { id: 'ace-save', name: 'Save template', app: 'ace', source: 'src/features/templates/ui/SaveAsTemplateDialog.tsx' },
    { id: 'adm-reset', name: 'Reset confirm', app: 'adm', source: 'src/features/top-navigation/components/ResetDialog.tsx' },
    { id: 'adm-accept', name: 'Accept licence', app: 'adm', source: 'src/features/eula/components/EulaGate.tsx' },
    { id: 'adm-feedback', name: 'Send feedback', app: 'adm', source: 'src/features/top-navigation/components/FeedbackDialog.tsx' },
    { id: 'pbs-accept', name: 'Accept licence', app: 'pbs', source: 'src/LicenseGate.tsx' },
    { id: 'pbs-delete', name: 'Delete confirm', app: 'pbs', source: 'src/ResultsSection.tsx' },
    { id: 'hs-reset', name: 'Reset confirm', app: 'hs', source: 'src/App.tsx' },
    { id: 'hs-delete', name: 'Delete confirm', app: 'hs', source: 'src/hs/TemplateDialogs.tsx' },
    { id: 'fd-save', name: 'Save template', app: 'fd', source: 'src/App.jsx' },
    { id: 'adc-reset', name: 'Reset confirm', app: 'adc', source: 'src/adc/Workspace.tsx' },
    { id: 'adc-feedback', name: 'Send feedback', app: 'adc', source: 'src/adc/Workspace.tsx' },
  ],
  source: {
    hcs: 'src/components/F01Experience.tsx',
    ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx',
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    hs: 'src/hs/ShellExtras.tsx',
    fd: 'src/components/Feedback.jsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'A gray solid Cancel and a solid Confirm sit side by side in the footer of a dialog; the dialog types and the apps differ in what surrounds them.',
  where: 'The footer of a confirmation or form dialog: Cancel (or Do Not Accept) left of the action that commits it (Reset, Send, Accept, Delete, Save). The preview has an app toggle and a case radio group; pick the app, then the dialog type. Real site source: HCS Button-001 (confirm) and Button-002 (cancel). Popovers use a ghost Cancel instead (Button-002).',
  when: 'Use the pair whenever a dialog asks for a decision: Confirm is the one action that commits, Cancel is the neutral way out. In brand atomic the near-black fill is color "secondary", not "primary" (orange), and gray is "surface-alt", not "secondary". Use color "error" for the Confirm of an irreversible delete. ADC is the exception: its Confirm is "primary" (orange).',
  how: 'Confirm sets color "secondary" and paint "solid" (aui scale "sm" in HCS and in every licence gate; the other dialogs inherit the popup scale). Cancel is the Dialog.Button default (color "surface-alt", paint "solid"); the licence gate spells it out with scale "sm" and shape "soft". The real dialogs use Dialog.Button or AlertDialog.Button; the preview draws every dialog, AlertDialog included, as a non-modal Dialog because the vendored AlertDialog is forced modal and would block the gallery. The cases are the dialog types; each app has its own, and an app listed in the badges but not in the toggle writes the same dialog as the one shown. '
    + 'HCS: Reset confirm (HcsResetDialog: 560px, raised warning Title, close X), Accept licence (a fill-width popup, Accept enabled after the end is reached) and Send feedback (one Submit, no Cancel). '
    + 'ACE (src/features): Reset confirm has no close X; Accept licence adds a Description (a Country field above the text is left out); Send feedback is Cancel + Send, and HS, PFD, PBS, AGPD and RWS write the same footer (PFD, PBS, AGPD and RWS label Send as Submit); Delete confirm is a raised warning Title with a solid error Delete, as in ADM; Save template keeps Save disabled until the name is valid, as in ADM and HS. '
    + 'ADM: Reset confirm is capped at 480px with a close X; Accept licence has no Description, and PFD, AGPD, RWS, HS and FD write it too (HS and FD add a Country field, left out); Send feedback is 560px wide, as in FD. '
    + 'PBS: Accept licence has no close X; Delete confirm is a header row with only the close X, then Close, a Spacer and a solid error Delete. '
    + 'HS: Reset confirm is a 384px Dialog with a plain Title and a Spacer between Cancel and Reset (FD writes it too); Delete confirm has a plain Title and no close X (FD writes it too). '
    + 'FD: Save template uses plain Buttons with a primary Save. '
    + 'ADC: Reset confirm is split into three buttons (Cancel, a text error "Reset Current Design to Standard" and a solid error "Reset All Designs to Standard") with the close X in a tooltip; Send feedback leads its split footer with a Checkbox and ends with a disabled primary Send. ADC has no licence gate. '
    + 'PFD, AGPD, RWS and PBS have no Reset confirm: Reset acts at once (PBS) or is not in the app. '
    + 'Every scene is cut to the least that shows the footer: titles and fields are short, and body fields beyond Email and Description or a name field (the Summary field, the attach-file dropzone, the "Send me a copy" Switch of ACE, the Country field) are left out. '
    + 'App source paths (repo-relative): HCS src/components/F01Experience.tsx; ACE src/features/*/ui; ADM src/features/*/components; PFD src/pfd/ShellDialogs.tsx and LicenseGate.tsx; PBS src/WorkspaceTools.tsx, LicenseGate.tsx and ResultsSection.tsx; HS src/hs/ShellExtras.tsx, LicenseGate.tsx, TemplateDialogs.tsx and src/App.tsx; FD src/components/Feedback.jsx, LicenseGate.jsx and src/App.jsx; AGPD src/agpd/ShellDialogs.tsx and LicenseGate.tsx; RWS src/rws/ShellDialogs.tsx and LicenseGate.tsx; ADC src/adc/Workspace.tsx.',
});
