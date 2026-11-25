import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a button',
  title: 'Text button tooltip',
  apps: ['pfd', 'rws', 'hs'],
  options: [
    { id: "pfd-image-preview", name: "Image preview", apps: ["pfd"], source: {"pfd":"src/pfd/ResultsTable.tsx"} },
    { id: "rws-image-link", name: "Image preview — UI variant 2", apps: ["rws"], source: {"rws":"src/rws/output.tsx"} },
    { id: "hs-hanger-mark", name: "Image preview — UI variant 3", apps: ["hs"], source: {"hs":"src/hs/SlopeCalculator.tsx"} },
  ],
  source: { pfd: 'src/pfd/ResultsTable.tsx', rws: 'src/rws/output.tsx', hs: 'src/hs/SlopeCalculator.tsx' },
  summary: 'Hovering or focusing a link, cell or mark opens a tooltip that holds a larger image instead of text.',
  where: 'Result tables and drawings: the Model cell of the PFD results table, the image links of the RWS output and the hanger marks of the HS slope calculator.',
  when: 'Use it to preview an image the row or label already links to, without leaving the page. Not for text that explains a control (Tooltip-001, 005).',
  how: 'The trigger is the element the user already points at, written with `render`: PFD a flex View (thumbnail plus product link), RWS the Type anchor itself, HS a Button (scale sm, color secondary, paint solid) with a short mark label. The popup is the kit default; its content is a View of fixed width holding the image: 96px (PFD, above, 4px offset), 192px (RWS) and 160px with a bold title (HS), the last two at the default side with a 4px offset. The scenes use a representative connection image. The scenes show one trigger with the tooltip open and leave out the table, the other rows and marks and the drawing.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Tooltip.Trigger',
      description: 'The element the user already points at: a "Preview" Button in the example, a thumbnail-and-link View in PFD, the "Connection detail" link in RWS, and the solid secondary "A" mark Button in HS.',
    },
    {
      id: 'product-link',
      name: 'Product link',
      token: 'Type',
      text: true,
      description: 'The PFD underlined secondary link "Model C-300" beside the thumbnail.',
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Tooltip.Popup',
      selector: '[class~="aui-tooltip-popup"]',
      description: 'The default tooltip surface, which here holds an image instead of text: 192px wide in the example and RWS, 96px in PFD, 160px in HS.',
    },
    {
      id: 'image',
      name: 'Preview image',
      token: 'Tooltip.Popup',
      selector: '[class~="aui-tooltip-popup"] svg',
      description: 'The representative connection drawing (an svg with role="img") that the tooltip shows, such as "Connection detail" or "Model C-300 connection preview".',
    },
    {
      id: 'preview-title',
      name: 'Preview title',
      token: 'Type',
      text: true,
      description: 'The HS-only bold l4 title "Hanger A" above the image.',
    },
  ],
});
