import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Dialog',
  title: 'Option in a dialog',
  apps: ['hs', 'pfd', 'pbs', 'agpd', 'rws', 'adm', 'fd', 'adc'],
  source: {
    hs: 'src/hs/ShellExtras.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/WorkspaceTools.tsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    fd: 'src/components/Feedback.jsx',
    adc: 'src/adc/Workspace.tsx',
  },
  cases: [
    { id: 'adm-form', name: 'Form option', apps: ['adm', 'fd'], source: { adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', fd: 'src/components/Feedback.jsx' } },
    {
      id: 'hs-form',
      name: 'Form option',
      apps: ['hs', 'pfd', 'pbs', 'agpd', 'rws'],
      source: { hs: 'src/hs/ShellExtras.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
    },
    { id: 'adc-footer', name: 'Footer option', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
  ],
  summary: 'A Checkbox with its label that answers one yes or no question at the end of a dialog form, such as Send me a copy of my responses or Download.',
  where: 'The feedback dialog of eight apps (HS src/hs/ShellExtras.tsx, PFD src/pfd/ShellDialogs.tsx, PBS src/WorkspaceTools.tsx, AGPD src/agpd/ShellDialogs.tsx, RWS src/rws/ShellDialogs.tsx, ADM src/features/top-navigation/components/FeedbackDialog.tsx, FD src/components/Feedback.jsx, ADC src/adc/Workspace.tsx), the Save as template dialog (HS src/hs/TemplateDialogs.tsx, ADM src/features/templates/components/SaveAsTemplateDialog.tsx) and the ADM Thickness calculator and edit modals.',
  when: 'Use it for an optional choice that travels with a form the user submits once. Do not use it for an exclusive choice (a RadioGroup) or an on and off setting that applies at once (a Switch). A Checkbox that sits in a Field next to the other inputs is Field; its Dialog footer, close and Cancel and Send buttons are Button-001 and are not repeated here.',
  how: 'The Checkbox has aui scale "sm" (the same box as the default scale: 22px, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px rgb(148, 163, 184) border), selected color "primary" paint "solid" (rgb(255, 83, 8), no border). Checkbox.Icon name "check" is the mark (the default mark is the same solid check, so apps that omit it render the same), and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The box is a bare child of the Dialog.Body form column (View, flex column, gap 16), as the last row. Three groups of apps, measured in headless Chromium. ADM and FD: the same row, but the mark is Checkbox.Icon layer "duotone", which draws the check in Font Awesome 7 Duotone, visibly lighter than the solid check in Font Awesome 7 Pro (ADM writes it on every Checkbox; FD only in this dialog). HS, PFD, PBS, AGPD, RWS: the solid check; PBS and RWS omit scale, which renders the same 22px box. ADC: the Checkbox leads the split Dialog.Actions footer, before Cancel and Send, with no Icon (the same solid mark); the full dialog is Button-001 Send feedback. The scenes leave out the Description, the file dropzone and its size error, and show the enabled state and a Send that the app keeps disabled until the form is valid.',
});
