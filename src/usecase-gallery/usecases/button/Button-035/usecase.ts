import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Tonal, 28px',
  apps: ['pbs'],
  source: { pbs: 'src/ResultsSection.tsx' },
  cases: [{ id: 'pbs-row', name: 'Row add icon', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } }],
  summary: 'A tonal plus IconButton, 28px square, adds one result row to a list.',
  where: 'The first cell of each result row of a results table. Real site source: PBS src/ResultsSection.tsx (a plus IconButton that adds the row to the Connection List; the app replaces it with a selection radio in edit mode). ADM, PFD, HCS, HS, FD, AGPD, RWS and ADC have no row add icon.',
  when: 'Use it when every row can be added on its own and the cell is too narrow for a label; use the labelled Button of Button-029 when one result is chosen elsewhere. Name it with a Tooltip and aria-label.',
  how: 'Set aui color "secondary", paint "tonal", scale "sm" and shape "soft" on an IconButton with the plus glyph; the default square profile gives the 28px box. In context it sits in the centred first cell of one result row inside a top Tooltip (4px offset) reading Add to Connection List; the table keeps one row and one other column, and the tooltip is closed.',
});
