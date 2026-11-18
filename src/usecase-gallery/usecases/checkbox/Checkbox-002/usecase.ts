import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Input panel',
  title: 'Option in an input panel',
  apps: ['hcs', 'hs', 'fd', 'adc', 'ace', 'pbs', 'agpd', 'adm'],
  source: {
    hcs: 'src/App.tsx',
    hs: 'src/hs/InputFields.tsx',
    fd: 'src/components/InputPane.jsx',
    adc: 'src/adc/components/InputSections.tsx',
    ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
    pbs: 'src/InputFields.tsx',
    agpd: 'src/agpd/inputs.tsx',
    adm: 'src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx',
  },
  cases: [
    {
      id: 'hcs-option',
      name: 'Option',
      apps: ['hcs', 'hs', 'fd', 'adc'],
      source: { hcs: 'src/App.tsx', hs: 'src/hs/InputFields.tsx', fd: 'src/components/InputPane.jsx', adc: 'src/adc/components/InputSections.tsx' },
    },
    { id: 'ace-titled', name: 'Option under a title', apps: ['ace'], source: { ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' } },
    { id: 'pbs-titled', name: 'Option under a title', apps: ['pbs', 'agpd'], source: { pbs: 'src/InputFields.tsx', agpd: 'src/agpd/inputs.tsx' } },
    {
      id: 'adm-label-first',
      name: 'Label before the box',
      apps: ['adm'],
      source: { adm: 'src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx' },
    },
  ],
  summary: 'A Checkbox with its Checkbox.Label for one on and off option of an input section, such as Galvanized, Predrill or Same inputs as Left Hip.',
  where: 'The input panels: HCS src/App.tsx (Galvanized), HS src/hs/InputFields.tsx (Same inputs as Left Hip), FD src/components/InputPane.jsx (wood structural panel, Predrill), ADC src/adc/components/InputSections.tsx and EurocodeInputs.tsx (Equal Spacing and the option lists), ACE src/features/estimator/ui/EstimatorInputPanel.tsx (water filled holes, paste over both sides), PBS src/InputFields.tsx (Rotate Post Orientation, Rough Sawn), AGPD src/agpd/inputs.tsx (include plates) and ADM JointDistanceFields.tsx (centre the joint).',
  when: 'Use it for an optional input that is on or off and has no unit. Do not use it for one choice among several (RadioGroup, or a Field.Select when there are many), or a setting that applies the moment it flips (Switch). The Field the box sits next to is Field and the help icon beside a title is Button-018.',
  how: 'Checkbox aui scale "sm" with states unselected color "surface" paint "tonal" borderColor "outlined" and selected color "primary" paint "solid"; Checkbox.Label is 16px regular to its right (the box 22px, the label starts 30px from the box start). The box sits in a column of the input section (View, flex column, gap 8). Four groups, measured in headless Chromium. HCS, HS, FD and ADC: a bare Checkbox with Checkbox.Label, no title (HCS adds a muted note below and sets the label scale "sm", which renders the same 16px; ADC and FD omit scale, the same 22px box). ACE: a Fieldset with a Fieldset.Legend (16px regular) over the Checkbox, 32px from the legend top to the box top (the Fieldset default gap). PBS and AGPD: a View group with a Label span as the title, the same 16px regular, with the box 23px below the title top (a 3px gap), so they are one group; PBS and AGPD differ from ACE by that 9px of spacing. ADM: the Checkbox is a bare control of a Field row with a Field.Label before it, right-aligned (justifyContent "end", gap 8, 22px box at the end), an aria-label on the box and the duotone mark (Checkbox.Icon layer "duotone"). The scenes leave out the neighbouring fields, the help icons and locks of the label rows, and show the enabled state (HCS and ADC disable some options in the app).',
});
