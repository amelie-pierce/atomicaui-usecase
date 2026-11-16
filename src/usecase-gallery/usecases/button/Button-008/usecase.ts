import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Row expander',
  apps: ['hcs'],
  summary: 'A compact chevron Button expands a table row, in the error color when the row failed.',
  where: 'The first cell of each result row, to reveal why a product did not pass. Real site source: HCS Button-010.',
  when: 'Use it for a per-row disclosure. Switch color to "error" for rows that failed so the reason stands out (shown in the third row of the scene). Always set aria-label and aria-expanded.',
  how: 'Set aui scale "sm", profile "square-compact", paint "text" and color "surface" (or "error"), with sx minWidth and minHeight "24" for a safe hit area. The glyph is angle-right, shown here in the closed state; the app rotates it 90 degrees through CSS when aria-expanded is true, as the expanded failed row does here with an inline transform. In context it is the first element of the Model cell, before the selection radio, a thumbnail and the model name.',
});
