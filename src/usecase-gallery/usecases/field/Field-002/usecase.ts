import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Input panel',
  title: 'Text field',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
  cases: [
    {
      id: 'hs-text',
      name: 'Label above',
      apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
      source: { hcs: 'src/components/F01Experience.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/ShellDialogs.tsx', fd: 'src/components/Feedback.jsx', rws: 'src/rws/ShellDialogs.tsx', agpd: 'src/agpd/ShellDialogs.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adc: 'src/adc/components/ProjectInfoField.tsx' },
    },
    {
      id: 'adc-text-beside',
      name: 'Label beside',
      apps: ['adc'],
      source: { adc: 'src/adc/Workspace.tsx' },
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/ShellDialogs.tsx', fd: 'src/components/Feedback.jsx', rws: 'src/rws/ShellDialogs.tsx', agpd: 'src/agpd/ShellDialogs.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adc: 'src/adc/components/ProjectInfoField.tsx' },
  summary: 'A labelled field with one outlined control for a line of text.',
  where: 'All ten apps: the Send feedback form (name, email, subject), the save-as-template name, the HS and PBS connection ID of the input panel and the ADC project info of the project panel.',
  when: 'Use it for a single line of free text, such as a name, an email or an ID, where the label stays visible above the control. Use the label beside only in a form whose rows run label then control (the ADC project info). Use Field-004 for several lines of text and Field-001 for a number with a unit.',
  how: 'Label above (all ten apps): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Control (scale "sm", 28px high) with one Field.Input; the control frame is a surface-coloured outlined row, 3/8 padding and a 4px radius. PBS, RWS, AGPD, PFD, ACE, ADM, FD and ADC write exactly this; HCS writes a bare Input in the Field and renders the same 28px frame. The dialog forms (ACE, ADM, FD, HS, PFD, RWS, AGPD) leave the gap at the default 6px, a spacing difference only. Label beside (ADC): the Field is a row (gap 8, wrapping) with a Field.Label 96px wide, end-aligned, holding a required asterisk in the error colour, and a Field.Control with color "surface" filling the rest of the row. The apps show the field enabled. The scenes leave out the required asterisk of the label above, the help trigger, the placeholder, the error line (Field-003) and the form and dialog around the field.',
});
