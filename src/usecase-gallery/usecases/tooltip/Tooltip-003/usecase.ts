import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Preview',
  title: 'Image preview tooltip',
  apps: ['pfd', 'rws', 'hs'],
  cases: [
    { id: 'pfd-image-preview', name: 'Image preview', apps: ['pfd'], source: { pfd: 'src/pfd/ResultsTable.tsx' } },
    { id: 'rws-image-link', name: 'Image preview', apps: ['rws'], source: { rws: 'src/rws/output.tsx' } },
    { id: 'hs-hanger-mark', name: 'Image preview', apps: ['hs'], source: { hs: 'src/hs/SlopeCalculator.tsx' } },
  ],
  source: { pfd: 'src/pfd/ResultsTable.tsx', rws: 'src/rws/output.tsx', hs: 'src/hs/SlopeCalculator.tsx' },
  summary: 'Hovering or focusing a link, cell or mark opens a tooltip that holds a larger image instead of text.',
  where: 'Result tables and drawings: the Model cell of the PFD results table, the image links of the RWS output and the hanger marks of the HS slope calculator.',
  when: 'Use it to preview an image the row or label already links to, without leaving the page. Not for text that explains a control (Tooltip-001, 004).',
  how: 'The trigger is the element the user already points at, written with `render`: PFD a flex View (thumbnail plus product link), RWS the Type anchor itself, HS a Button (scale sm, color secondary, paint solid) with a short mark label. The popup is the kit default; its content is a View of fixed width holding the image: 96px (PFD, above, 4px offset), 192px (RWS) and 160px with a bold title (HS), the last two at the default side with a 4px offset. The scenes use a representative connection image. The scenes show one trigger with the tooltip open and leave out the table, the other rows and marks and the drawing.',
});
