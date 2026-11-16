import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Row expander',
  apps: ['hcs'],
  source: { hcs: 'src/components/F01Results.tsx' },
  cases: [{ id: 'results', name: 'Results table' }],
  summary: 'A compact chevron Button expands a table row, in the error color when the row failed.',
  where: 'The first cell of each result row, to reveal why a product did not pass. Real site source: HCS Button-010 (the Model cell of ProductRow in src/components/F01Results.tsx; the turn is src/components/F01Results.css).',
  when: 'Use it for a per-row disclosure. Switch color to "error" for rows that failed so the reason stands out (shown in the third row of the scene). Always set aria-label and aria-expanded.',
  how: 'Set aui scale "sm", profile "square-compact", paint "text" and color "surface" (or "error"), with sx minWidth and minHeight "24" for a safe hit area. The glyph is angle-right (weight "solid"), shown here in the closed state; the app turns only the icon 90 degrees through CSS when aria-expanded is true (the scene\'s `.ug-results` rule does the same), and the button itself never rotates. In context it is the first element of the Model cell, before the selection radio, the connector thumbnail and the model name. The scene is the Output table: all-cell borders, the Model column frozen, the first row selected (secondary start accent, selected radio), and the failed row open with its expander in the error color, a disabled radio and the Why Not panel (model name, then Connection, Width, Depth, Lateral and Download tabs). Sample rows are placeholders; the structure follows the app.',
});
