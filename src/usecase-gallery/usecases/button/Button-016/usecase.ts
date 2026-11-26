import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Show all connection types button',

  apps: ['fd'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The View all Button in the FD carousel footer: primary text paint at the default scale, after the pager dots.","keyIdea":"The text action opens the complete carousel collection from its footer.","selector":"[class~=\"aui-button\"]:not([aria-label*=\" / \"])"},
      ],
options: [
    { id: "fd-carousel-footer", name: "Carousel footer", apps: ["fd"], contextAnatomy: [
      { id: "pager", name: "Carousel footer", description: "The row after the carousel that holds the pager dots, then View all, with an 8px gap." },
      { id: "dot", name: "Pager dots", description: "The two round buttons, one per page (1 / 2 and 2 / 2): the current page in primary, the other in surface-alt." },
    ], source: {"fd":"src/components/InputPane.jsx"} ,
      contextLayers: [
        {"id":"context-pager","partId":"pager","title":"Carousel footer","explanation":"The row after the carousel that holds the pager dots, then View all, with an 8px gap.","keyIdea":"The footer aligns page position with the route to all items.","selector":"[data-ug-part=\"pager\"]","scope":"context"},
        {"id":"context-dot","partId":"dot","title":"Pager dots","explanation":"The two round buttons, one per page (1 / 2 and 2 / 2): the current page in primary, the other in surface-alt.","keyIdea":"The dots show the current page and the remaining carousel page.","selector":"[data-ug-part=\"dot\"]","scope":"context"},
      ],
    },
  ],
  source: { fd: 'src/components/InputPane.jsx' },
  summary: 'A text Button in the primary colour opens the full list from the footer of a carousel.',
  where: 'The footer of the FD input pane carousel (the connection type cards), after the pager dots.',
  when: 'Use it for a quiet link-like action that widens the view: the carousel shows a few cards and this Button opens all of them. A neutral text action is Button-012; the small accent text in a popup is Button-010.',
  how: 'Set aui paint "text" and color "primary" on a Button at the default scale. '
    + 'Measured in the gallery: 28px high, 4px 8px padding, 16px regular text, no fill and no border, orange text rgb(255, 83, 8), so it differs from Button-012 (text colour dark) and from Button-010 (26px, 14px medium, scale "xs"). '
    + 'In context it is the last item of the carousel footer after the two pager dots (Button-020). The cards, the arrows (Button-037) and the dialog it opens are left out.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The View all Button in the FD carousel footer: primary text paint at the default scale, after the pager dots.",
      selector: "[class~=\"aui-button\"]:not([aria-label*=\" / \"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"View all\" that opens every connection type instead of the few cards shown.",
      selector: "[class~=\"aui-button\"]:not([aria-label*=\" / \"])",
      text: true,
    },
  ],
});
