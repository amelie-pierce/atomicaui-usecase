import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Selectable rows',
  apps: ['hcs', 'hs', 'fd', 'pbs', 'rws', 'adm', 'ace'],
  source: {
    hcs: 'src/components/F01Results.tsx',
    hs: 'src/hs/ResultsTable.tsx',
    fd: 'src/components/Results.jsx',
    pbs: 'src/ResultsSection.tsx',
    rws: 'src/rws/output.tsx',
    adm: 'src/features/multi-design/components/MultiDesignTable.tsx',
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
  },
  cases: [
    { id: 'hcs-selection', name: 'Row selection', apps: ['hcs'], source: { hcs: 'src/components/F01Results.tsx' } },
    { id: 'hs-selection', name: 'Row selection', apps: ['hs', 'fd', 'pbs'], source: { hs: 'src/hs/ResultsTable.tsx', fd: 'src/components/Results.jsx', pbs: 'src/ResultsSection.tsx' } },
    { id: 'rws-selection', name: 'Row selection', apps: ['rws'], source: { rws: 'src/rws/output.tsx' } },
    { id: 'adm-selection', name: 'Row selection', apps: ['adm'], source: { adm: 'src/features/multi-design/components/MultiDesignTable.tsx' } },
    { id: 'ace-selection', name: 'Row selection', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } },
  ],
  summary: 'A radio in the first cell selects one row of a results table; the selected row is marked by the row surface and an edge bar.',
  where: 'Output tables where one candidate is chosen: HCS F01Results.tsx, HS ResultsTable.tsx, FD Results.jsx, PBS ResultsSection.tsx (edit mode, in the action column), RWS output.tsx (bar only), ADM MultiDesignTable.tsx (Multi design dialog) and ACE CalculationOutput.tsx (the Order model radio).',
  when: 'Use it when the table drives one chosen result. Give every row a selectionLabel (the radio has no visible label) and put the Table.SelectionToggle in the first cell. The expander before the radio in HCS and FD is Button-008 and the row and column buttons are Button-032, Button-029 and Button-033; they are not repeated here.',
  how: 'Root: selectionMode "single", indicatorType "radio", indicatorColumn false, selectionToggleAui scale "sm" with minWidth and minHeight "24", unselected color "surface" paint "tonal" borderColor "outlined", selected color "primary" paint "solid". Each Table.Row has selectionLabel and selected; the radio is a Table.SelectionToggle inside the first Table.Cell. The scenes show the enabled state (HCS shows the radio of a failed row disabled with a tooltip). Five groups, measured in headless Chromium. HCS: rows painted surface-alt rgb(241, 245, 249) with a 4px inset secondary bar rgb(18, 18, 18) on the selected row. HS, FD and PBS: the same radio and bar on white rows rgb(255, 255, 255); the radio sits in the model cell (HS, FD) or in the action column (PBS). RWS: no radio and no indicator column (no radio span, no input); only the selected row paints the 4px bar, because the Show in 3D control selects. ADM: between-rows lines, the selected row painted raised rgb(226, 232, 240) with a 4px primary bar rgb(255, 83, 8), values aligned to the end. ACE: the radio with no rowAui, so the selected row takes the library default (raised rgb(226, 232, 240) and a 1px inset edge, not a 4px bar). The scenes leave out the expander, thumbnails, group rows, the failed-row tooltip and the other columns.',
});
