import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Row expander',
  apps: ['hcs', 'hs', 'fd', 'adc'],
  source: {
    hcs: 'src/components/F01Results.tsx',
    hs: 'src/hs/ResultsTable.tsx',
    fd: 'src/components/Results.jsx',
    adc: 'src/adc/components/ProductsPicker.tsx',
  },
  cases: [
    { id: 'hcs-results', name: 'Results table', apps: ['hcs'], source: { hcs: 'src/components/F01Results.tsx' } },
    { id: 'fd-results', name: 'Results table', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } },
    { id: 'hcs-group', name: 'Group row', apps: ['hcs'], source: { hcs: 'src/components/F01Results.tsx' } },
    { id: 'hs-group', name: 'Group row', apps: ['hs'], source: { hs: 'src/hs/ResultsTable.tsx' } },
    { id: 'adc-group', name: 'Group row', apps: ['adc'], source: { adc: 'src/adc/components/ProductsPicker.tsx' } },
  ],
  summary: 'A compact chevron Button expands a table row; HCS draws it as a Button (error color on failed rows), the other apps use the table\'s own expand trigger.',
  where: 'The first cell of a table row, before the name. Real site source: HCS Button-010 (the Model cell of ProductRow in src/components/F01Results.tsx; the turn is src/components/F01Results.css) and its group rows (same file); FD Results.jsx (modelCell, Table.ExpandTrigger); HS ResultsTable.tsx (group rows, Table.ExpandTrigger); ADC ProductsPicker.tsx (parent rows of the anchor tree, Table.ExpandTrigger). ACE, ADM, PFD, PBS, AGPD and RWS have no expandable rows.',
  when: 'Use it for a per-row disclosure. In HCS switch color to "error" for rows that failed so the reason stands out (shown in the second row of the scene). Always give it an aria-label (the table trigger takes it from the row\'s expansionLabel); only HCS sets aria-expanded itself.',
  how: 'The example is the HCS Button: aui scale "sm", profile "square-compact", paint "text" and color "surface" (or "error"), with sx minWidth and minHeight "24" for a safe hit area. The glyph is angle-right (weight "solid"), shown in the closed state; the app turns only the icon 90 degrees through CSS when aria-expanded is true (the scene\'s `.ug-results` rule does the same), and the button itself never rotates. The preview groups the apps by distinct UI and the Document lists the same groups. '
    + 'Results table (the Why Not expander of a result row): HCS (the Button above, first element of the Model cell, before the selection radio, thumbnail and name; the scene is the Model column and two rows, because the button shows in two colors); FD (Table.ExpandTrigger, the library chevron-right IconButton at the table density with square-compact, soft, text, before the radio and name; it has no error color and the DS rotates it). '
    + 'Group row (rows that group members under a model or a parent): HCS (the row spans the columns; Table.ExpandTrigger and the model number with its member count in semi-bold, gap 4); HS (the same row painted surface-alt solid); ADC (the anchor tree\'s parent row: Table.ExpandTrigger set to scale "xs", gap 6, semi-bold name). '
    + 'Left out of every scene: selection, the thumbnail, the other columns, sorting, the frozen column, the Why Not panel and the member rows.',
});
