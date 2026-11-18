import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Input panel',
  title: 'Field error',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
  cases: [
    {
      id: 'hs-error',
      name: 'Field error',
      apps: ['hs', 'pbs', 'pfd', 'fd', 'agpd', 'adm', 'ace'],
      label: 'Error text',
      source: { hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/fields.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/shared/FieldNumberRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
    },
    {
      id: 'hcs-error',
      name: 'Field error',
      apps: ['hcs'],
      label: '14px text',
      source: { hcs: 'src/App.tsx' },
    },
    {
      id: 'rws-error',
      name: 'Field error',
      apps: ['rws'],
      label: 'Red outline',
      source: { rws: 'src/rws/inputs.tsx' },
    },
    {
      id: 'adc-error',
      name: 'Field error',
      apps: ['adc'],
      label: 'Label beside, red outline',
      source: { adc: 'src/adc/Workspace.tsx' },
    },
  ],
  source: { hcs: 'src/App.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/fields.tsx', fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/controls.tsx', adm: 'src/features/design-inputs/components/shared/FieldNumberRow.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx', adc: 'src/adc/Workspace.tsx' },
  summary: 'The message under a field whose value failed validation, in the error colour.',
  where: 'The input panel and the dialog forms of all ten apps: a number out of range, a required name, a duplicate template name, an invalid email.',
  when: 'Use it under the control of the field that failed, one message per field, so the user reads which value to fix beside the value itself. Set the Field to invalid and give the Field.Error `match`; give the message the error colour, because Field.Error has no colour of its own. Add the red outline only where the app does (RWS, ADC).',
  how: 'Error text (HS, PBS, PFD, FD, AGPD, ADM, ACE): the Field has `invalid` and a Field.Error with `match`, color "error" and scale "sm" sits under the Field.Control; the control keeps its slate outline and the message is 16px/20px text in the error colour (rgb 231, 80, 76), 3px below the control. 14px text (HCS): the same Field, but the message is set by the app\'s CSS class (error colour, 14px type, 20px line), written as aui props in the scene. Red outline (RWS): as the first group, plus the control outline in the error colour (borderColor "error" on the Field.Control). Label beside, red outline (ADC): the Field is the row of Field-002 with a Field.Control in color "error" and a Field.Error on its own line (flex-basis full) with the text at the end. The apps show the field enabled. The scenes leave out the unit, the help trigger, the required asterisk and the other fields of the form.',
});
