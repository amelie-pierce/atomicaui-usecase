import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Data preview table',
  apps: ['adc'],
  cases: [
    {
      id: 'adc-preview',
      name: 'Data preview table',
      apps: ['adc'],
      source: { adc: 'src/adc/components/CapImportSteps.tsx' },
    },
  ],
  source: {
    adc: 'src/adc/components/CapImportSteps.tsx',
  },
  summary: 'A small table that previews the imported data before the user confirms: Field, Value and Status columns under a raised header row.',
  where: 'ADC: the Import step Data Preview (CapImportSteps.tsx). No other app previews imported data in a table.',
  when: 'Use it to show a few facts of imported data that the user reads before continuing, not selects or sorts. For a calculation summary use Table-003; for a scrolling, sortable grid use the Results grid (Table-001).',
  how: 'An all-cells tonal grid (border "all-cells", borderStyle "tonal") at scale "sm" in a soft outlined frame (the four border widths, borderColor "outlined"), with a raised header row (headerCellAui color "raised": FIELD, VALUE, STATUS) and plain left-aligned cells. The scene leaves out the other data rows and the import wizard around it.',
});
