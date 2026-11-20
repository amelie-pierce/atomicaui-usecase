import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single checkbox',
  title: 'Checkbox with label',
  apps: ['hcs', 'ace', 'hs', 'pfd', 'pbs', 'agpd', 'rws', 'adm', 'fd', 'adc'],
  source: {
    hcs: 'src/App.tsx',
    ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
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
    { id: 'adm-form', name: 'Dialog option', note: 'The checkbox sits in the dialog form.', apps: ['adm', 'fd'], source: { adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', fd: 'src/components/Feedback.jsx' } },
    {
      id: 'hs-form',
      name: 'Dialog option',
      note: 'The checkbox sits in the dialog form.',
      apps: ['hs', 'pfd', 'pbs', 'agpd', 'rws'],
      source: { hs: 'src/hs/ShellExtras.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
    },
    { id: 'adc-footer', name: 'Dialog option', note: 'The checkbox sits in the dialog footer before the actions.', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    {
      id: 'hcs-option',
      name: 'Input panel option',
      note: 'A bare checkbox without a title.',
      apps: ['hcs', 'hs', 'fd', 'adc'],
      source: { hcs: 'src/App.tsx', hs: 'src/hs/InputFields.tsx', fd: 'src/components/InputPane.jsx', adc: 'src/adc/components/InputSections.tsx' },
    },
    { id: 'ace-titled', name: 'Input panel option', note: 'A title sits above the checkbox; PBS and AGPD use a smaller gap than ACE.', apps: ['ace', 'pbs', 'agpd'], source: { ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx', pbs: 'src/InputFields.tsx', agpd: 'src/agpd/inputs.tsx' } },
    {
      id: 'adm-label-first',
      name: 'Input panel option',
      note: 'The label precedes the right-aligned checkbox.',
      apps: ['adm'],
      source: { adm: 'src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx' },
    },
    { id: 'fd-filter', name: 'Table filter', apps: ['fd'], source: { fd: 'src/components/RowExpansion.jsx' } },
  ],
  summary: 'A Checkbox with its label that answers one yes or no question: Send me a copy of my responses at the end of a dialog form, Galvanized in an input panel, or Show passed validations above a results table. The contexts are the types of one use case.',
  where: 'Dialog option: the feedback dialog of eight apps (HS src/hs/ShellExtras.tsx, PFD src/pfd/ShellDialogs.tsx, PBS src/WorkspaceTools.tsx, AGPD src/agpd/ShellDialogs.tsx, RWS src/rws/ShellDialogs.tsx, ADM src/features/top-navigation/components/FeedbackDialog.tsx, FD src/components/Feedback.jsx, ADC src/adc/Workspace.tsx), the Save as template dialog (HS src/hs/TemplateDialogs.tsx, ADM src/features/templates/components/SaveAsTemplateDialog.tsx) and the ADM Thickness calculator and edit modals. Input panel option: HCS src/App.tsx (Galvanized), HS src/hs/InputFields.tsx (Same inputs as Left Hip), FD src/components/InputPane.jsx (wood structural panel, Predrill), ADC src/adc/components/InputSections.tsx and EurocodeInputs.tsx (Equal Spacing and the option lists), ACE src/features/estimator/ui/EstimatorInputPanel.tsx (water filled holes, paste over both sides), PBS src/InputFields.tsx (Rotate Post Orientation, Rough Sawn), AGPD src/agpd/inputs.tsx (include plates) and ADM JointDistanceFields.tsx (centre the joint). Table filter: the Why not details of an expanded result row in FD (src/components/RowExpansion.jsx, SolutionDetails), the first child of the details column above the checks Table.',
  when: 'Use it for an optional choice that is on or off and has no unit: one that travels with a form the user submits once, one input of an input section, or an on and off filter that applies to the table right below it. Do not use it for an exclusive choice (a RadioGroup, or a Field.Select when there are many), an on and off setting that applies at once (a Switch), a column filter (Dropdown-001) or to select a row (Table-002). A set of Checkboxes under a title, and the read-only one of the print report, are Checkbox-002. A Checkbox that sits in a Field next to the other inputs is Field; the help icon beside a title is Button-025; the Dialog footer, close and Cancel and Send buttons are Button-018 and are not repeated here.',
  how: 'The Checkbox has aui scale "sm" (the same box as the default scale: 22px, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px rgb(148, 163, 184) border), selected color "primary" paint "solid" (rgb(255, 83, 8), no border). Checkbox.Icon name "check" is the mark (the default mark is the same solid check, so apps that omit it render the same), and Checkbox.Label is the caption on its right with an 8px gap: 16px regular, starting 30px from the box start. The three contexts write the same Checkbox and render the same box, mark and label in every group (measured in headless Chromium: 22px box, 4px radius, 16px weight 400 label at 30px); only the container differs, so they are the types of one use case, never separate use cases. '
    + 'Dialog option: the box is a bare child of the Dialog.Body form column (View, flex column, gap 16), as the last row. ADM and FD: the same row, but the mark is Checkbox.Icon layer "duotone", which draws the check in Font Awesome 7 Duotone, visibly lighter than the solid check in Font Awesome 7 Pro (ADM writes it on every Checkbox; FD only in this dialog). HS, PFD, PBS, AGPD, RWS: the solid check; PBS and RWS omit scale, which renders the same 22px box. ADC: the Checkbox leads the split Dialog.Actions footer, before Cancel and Send, with no Icon (the same solid mark); the full dialog is Button-018 Send feedback. The scenes leave out the Description, the file dropzone and its size error, and show the enabled state and a Send that the app keeps disabled until the form is valid. '
    + 'Input panel option: the box sits in a column of the input section (View, flex column, gap 8). HCS, HS, FD and ADC: a bare Checkbox with Checkbox.Label, no title (HCS adds a muted note below and sets the label scale "sm", which renders the same 16px; ADC and FD omit scale, the same 22px box). ACE, PBS and AGPD: a Fieldset with a Fieldset.Legend (16px regular) over the Checkbox, 32px from the legend top to the box top (the Fieldset default gap); PBS and AGPD use a View group with a Label span as the title, the same 16px regular, with the box 23px below the title top (a 3px gap), a 9px spacing difference from ACE, so all three share one group. ADM: the Checkbox is a bare control of a Field row with a Field.Label before it, right-aligned (justifyContent "end", gap 8, 22px box at the end), an aria-label on the box and the duotone mark (Checkbox.Icon layer "duotone"). The scenes leave out the neighbouring fields, the help icons and locks of the label rows, and show the enabled state (HCS and ADC disable some options in the app). '
    + 'Table filter: FD only; the Checkbox is the first child of a View (profile "default", scale "sm", flex column, gap 8) above the checks table, and starts unselected (the unselected box above: white with the 1px border), so the app lists only the failed and warning checks until the reader turns it on and the passed ones appear too. It is the bare Checkbox of Input panel option with a different label, so it is a type here and not a use case of its own (it was Checkbox-001). The scene leaves out the checks table below.',
});
