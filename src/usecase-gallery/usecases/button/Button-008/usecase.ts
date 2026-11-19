import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Expander, 24px',
  apps: ['hcs', 'hs', 'fd', 'adc'],
  source: {
    hcs: 'src/components/F01Results.tsx',
    hs: 'src/hs/ResultsTable.tsx',
    fd: 'src/components/Results.jsx',
    adc: 'src/adc/components/ProductsPicker.tsx',
  },
  cases: [
    { id: 'hcs-results', name: 'Results table', apps: ['hcs', 'fd'], source: { hcs: 'src/components/F01Results.tsx', fd: 'src/components/Results.jsx' } },
    { id: 'hcs-group', name: 'Group row', apps: ['hcs', 'adc'], source: { hcs: 'src/components/F01Results.tsx', adc: 'src/adc/components/ProductsPicker.tsx' } },
    { id: 'hs-group', name: 'Group row', apps: ['hs'], source: { hs: 'src/hs/ResultsTable.tsx' } },
  ],
  summary: 'A compact chevron Button expands a table row; HCS draws it as a Button (error color on failed rows), the other apps use the table\'s own expand trigger.',
  where: 'The first cell of a table row, before the name. Real site source: HCS Button-010 (the Model cell of ProductRow in src/components/F01Results.tsx; the turn is src/components/F01Results.css) and its group rows (same file); FD Results.jsx (modelCell, Table.ExpandTrigger); HS ResultsTable.tsx (group rows, Table.ExpandTrigger); ADC ProductsPicker.tsx (parent rows of the anchor tree, Table.ExpandTrigger). ACE, ADM, PFD, PBS, AGPD and RWS have no expandable rows.',
  when: 'Use it for a per-row disclosure. In HCS switch color to "error" for rows that failed so the reason stands out (shown in the second row of the scene). Always give it an aria-label (the table trigger takes it from the row\'s expansionLabel); only HCS sets aria-expanded itself.',
  how: 'The example is the HCS Button: aui scale "sm", profile "square-compact", paint "text" and color "surface" (or "error"), with sx minWidth and minHeight "24" for a safe hit area. The glyph is angle-right (weight "solid"), shown in the closed state; the app turns only the icon 90 degrees through CSS when aria-expanded is true (the scene\'s `.ug-results` rule does the same), and the button itself never rotates. The apps are grouped by what the UI looks like, never by the content or data each app shows: every scene uses mock data, so apps with the same UI but different content (HCS and ADC) are one group. The preview groups the apps by distinct UI and the Document lists the same groups. '
    + 'Results table (the Why Not expander of a result row): HCS and FD (the Button above, first element of the Model cell, before the name; the scene is the Model column and two rows, because the button shows in two colors). FD draws the same chevron with the library\'s Table.ExpandTrigger and has no error color, so the HCS format is the standard. '
    + 'Group row (rows that group members under a model or a parent): HCS and ADC (Table.ExpandTrigger, then the group name in semi-bold; ADC sets the trigger to scale "xs" and gap 6 where HCS keeps the table density and gap 4, a size difference only); HS (the same row painted surface-alt solid, so the group reads as a band). '
    + 'Left out of every scene: selection, the thumbnail, the other columns, sorting, the frozen column, the Why Not panel and the member rows.',
});
