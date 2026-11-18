import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Dialog footer: Cancel and Confirm',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'hcs-reset', name: 'Reset confirm', apps: ['hcs', 'ace', 'adm'], source: { hcs: 'src/components/HcsResetDialog.tsx', ace: 'src/features/reset-inputs/ui/ResetInputsAction.tsx', adm: 'src/features/top-navigation/components/ResetDialog.tsx' } },
    { id: 'hs-reset', name: 'Reset confirm', apps: ['hs', 'fd'], source: { hs: 'src/App.tsx', fd: 'src/App.jsx' } },
    { id: 'adc-reset', name: 'Reset confirm', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    { id: 'hcs-accept', name: 'Accept licence', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
    {
      id: 'ace-accept',
      name: 'Accept licence',
      apps: ['ace', 'adm', 'pfd', 'hs', 'fd', 'agpd', 'rws', 'pbs'],
      label: 'Other apps',
      source: {
        ace: 'src/features/eula/ui/EulaGate.tsx',
        adm: 'src/features/eula/components/EulaGate.tsx',
        pfd: 'src/pfd/LicenseGate.tsx',
        hs: 'src/hs/LicenseGate.tsx',
        fd: 'src/components/LicenseGate.jsx',
        agpd: 'src/agpd/LicenseGate.tsx',
        rws: 'src/rws/LicenseGate.tsx',
        pbs: 'src/LicenseGate.tsx',
      },
    },
    { id: 'hcs-feedback', name: 'Send feedback', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
    { id: 'adc-feedback', name: 'Send feedback', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    {
      id: 'ace-feedback',
      name: 'Send feedback',
      apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      label: 'Other apps',
      source: {
        ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx',
        adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
        pfd: 'src/pfd/ShellDialogs.tsx',
        pbs: 'src/WorkspaceTools.tsx',
        hs: 'src/hs/ShellExtras.tsx',
        fd: 'src/components/Feedback.jsx',
        agpd: 'src/agpd/ShellDialogs.tsx',
        rws: 'src/rws/ShellDialogs.tsx',
      },
    },
    { id: 'ace-delete', name: 'Delete confirm', apps: ['ace', 'adm'], source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx', adm: 'src/features/templates/components/NewFromTemplateDialog.tsx' } },
    { id: 'pbs-delete', name: 'Delete confirm', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
    { id: 'hs-delete', name: 'Delete confirm', apps: ['hs', 'fd'], source: { hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' } },
    { id: 'ace-save', name: 'Save template', apps: ['ace', 'adm', 'hs'], source: { ace: 'src/features/templates/ui/SaveAsTemplateDialog.tsx', adm: 'src/features/templates/components/SaveAsTemplateDialog.tsx', hs: 'src/hs/TemplateDialogs.tsx' } },
    { id: 'fd-save', name: 'Save template', apps: ['fd'], source: { fd: 'src/App.jsx' } },
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
  summary: 'A gray solid Cancel and a solid Confirm sit side by side in the footer of a dialog; the dialog types differ in what surrounds them, and apps that write a type differently are grouped by distinct UI.',
  where: 'The footer of a confirmation or form dialog: Cancel (or Do Not Accept) left of the action that commits it (Reset, Send, Accept, Delete, Save). The preview has a radio group of the dialog types and, where apps write a type differently, a toggle of app groups under it; the Document lists the same groups, so each row of badges is one distinct UI. Real site source: HCS Button-001 (confirm) and Button-002 (cancel). Popovers use a ghost Cancel instead (Button-002).',
  when: 'Use the pair whenever a dialog asks for a decision: Confirm is the one action that commits, Cancel is the neutral way out. In brand atomic the near-black fill is color "secondary", not "primary" (orange), and gray is "surface-alt", not "secondary". Use color "error" for the Confirm of an irreversible delete. ADC is the exception: its Confirm is "primary" (orange).',
  how: 'Confirm sets color "secondary" and paint "solid" (aui scale "sm" in HCS and in every licence gate; the other dialogs inherit the popup scale). Cancel is the Dialog.Button default (color "surface-alt", paint "solid"); the licence gate spells it out with scale "sm" and shape "soft". The real dialogs use Dialog.Button or AlertDialog.Button; the preview draws every dialog, AlertDialog included, as a non-modal Dialog because the vendored AlertDialog is forced modal and would block the gallery. '
    + 'Each type is listed with its distinct UIs; an app appears in exactly one group per type, and an app a type does not list never has that dialog. Two apps share a group when the container parts (Title style, close X, Description) and the footer (buttons, props, order, placement) match; body fields, wording and the popup width or height do not count, so a size difference is only noted here. '
    + 'Reset confirm: HCS, ACE and ADM (one group; the scene is HCS HcsResetDialog: 560px, raised warning Title, close X, Cancel and a solid secondary Reset; measured in the browser, HCS and ADM render the same elements, styles and positions and differ only in popup width, 560px vs 480px, and the close aria-label, "Close Reset" vs "Close"; ACE is the ADM dialog at the default width without the close X, an app gap); HS and FD (384px, plain Title, close X, and a Spacer between Cancel and Reset); ADC (640px, three buttons: Cancel, a text error "Reset Current Design to Standard" and a solid error "Reset All Designs to Standard", with the close X in a tooltip). PFD, AGPD and RWS have no Reset confirm (Reset acts at once) and neither does PBS. '
    + 'Accept licence: HCS (a raised sm Title with a Description, Accept enabled after the end is reached); Other apps = ACE, ADM, PFD, HS, FD, AGPD, RWS and PBS (a plain sm Title with the close X, the Do Not Accept / Accept pair at the same positions; the scene is the ACE gate with its Description line, which the other apps omit, as body text; the PBS app hides the X, an app gap, not another UI; HS and FD add a Country field, left out). ADC has no licence gate. HCS and ACE keep Accept disabled until the text is read to the end; the other apps never disable it. '
    + 'Send feedback: HCS (384px, one Submit and no Cancel); ADC (a split footer that leads with a "Send me a copy" Checkbox and ends with a disabled primary Send, 560px, close X in a tooltip); Other apps = ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (raised Title with the close X, Cancel + Send; ADM and FD set the popup to 560px, the others use the default width; PFD, PBS, AGPD and RWS label Send as Submit). '
    + 'Delete confirm: ACE and ADM (a raised warning Title, no close X; ACE at the default width, ADM capped at 480px); PBS (no Title: a header row with only the close X, then Close, a Spacer and a solid error Delete); HS and FD (a plain Title, no close X). HCS, PFD, AGPD, RWS and ADC have no delete confirm. '
    + 'Save template: ACE, ADM and HS (a raised Title with the close X, Save disabled until the name is valid; ADM caps the popup at 480px); FD (a primary Save in place of the black one; its Cancel is a plain Button that looks the same). '
    + 'Every scene is cut to the least that shows the footer: titles and fields are short, and body fields beyond Email and Description or a name field (the Summary field, the attach-file dropzone, the "Send me a copy" Switch of ACE, the Country field) are left out. '
    + 'App source paths (repo-relative, one per app and type in the cases): HCS src/components/F01Experience.tsx; ACE src/features/*/ui; ADM src/features/*/components; PFD src/pfd/ShellDialogs.tsx and LicenseGate.tsx; PBS src/WorkspaceTools.tsx, LicenseGate.tsx and ResultsSection.tsx; HS src/hs/ShellExtras.tsx, LicenseGate.tsx, TemplateDialogs.tsx and src/App.tsx; FD src/components/Feedback.jsx, LicenseGate.jsx, TemplatesDialog.jsx and src/App.jsx; AGPD src/agpd/ShellDialogs.tsx and LicenseGate.tsx; RWS src/rws/ShellDialogs.tsx and LicenseGate.tsx; ADC src/adc/Workspace.tsx.',
});
