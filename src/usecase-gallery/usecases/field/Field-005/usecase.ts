import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Multi-line field',
  title: 'Textarea',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
  cases: [
    {
      id: 'hs-textarea',
      name: 'Textarea',
      apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'adm', 'ace'],
      note: 'Label above.',
      source: { hcs: 'src/components/F01Experience.tsx', hs: 'src/hs/ShellExtras.tsx', pbs: 'src/WorkspaceTools.tsx', pfd: 'src/pfd/ShellDialogs.tsx', fd: 'src/components/Feedback.jsx', rws: 'src/rws/ShellDialogs.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx' },
    },
    {
      id: 'adc-textarea-beside',
      name: 'Textarea',
      apps: ['adc'],
      note: 'Label beside: a 96px end-aligned label, the textarea fills the rest of the row.',
      source: { adc: 'src/adc/Workspace.tsx' },
    },
    {
      id: 'agpd-textarea-nolabel',
      name: 'Textarea',
      apps: ['agpd'],
      note: 'No label: the box is named by its aria-label and placeholder (the quote notes).',
      source: { agpd: 'src/agpd/QuoteDialog.tsx' },
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', hs: 'src/hs/ShellExtras.tsx', pbs: 'src/WorkspaceTools.tsx', pfd: 'src/pfd/ShellDialogs.tsx', fd: 'src/components/Feedback.jsx', rws: 'src/rws/ShellDialogs.tsx', agpd: 'src/agpd/ShellDialogs.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adc: 'src/adc/components/ProjectInfoField.tsx' },
  summary: 'A labelled field with a multi-line outlined box for free text.',
  where: 'All ten apps: the description of the Send feedback form, the ADC project comment and project fields, the AGPD quote notes and the HCS support form.',
  when: 'Use it for text of several lines, such as a description or a comment; use the Field-002 text field for one line. Put the label above in a stacked form, beside only in the ADC project info rows, and drop the label only when a placeholder and an aria-label name the box (the AGPD quote notes).',
  how: 'Label above (HCS, HS, PBS, PFD, FD, RWS, ADM, ACE; ADC and AGPD have their own groups below): a Field holds a Field.Label and a Field.Textarea; the Field.Textarea draws its own 1px slate outline with a 4px radius and 3/8 padding, so there is no Field.Control around it. The rows are the only difference between the apps (HS, PFD, RWS, AGPD and PBS five; ACE, ADM and FD seven; HCS four; ADC two), as is the placeholder and resizable="vertical" (no visible change), so they share the scene with five rows. Label beside (ADC): the Field is a row aligned to the start with a 96px end-aligned Field.Label and a Field.Textarea filling the rest. No label (AGPD quote notes): a Field with only a Field.Textarea (rows 4) named by its aria-label and placeholder. The apps show the field enabled. The scenes leave out the required asterisk, the help trigger, the placeholder, the error line (Field-003) and the rest of the form.',
});
