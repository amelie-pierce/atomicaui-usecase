import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Go to carousel page button',

  apps: ['fd'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"One carousel pager dot: an empty solid Button with no children and an aria-label of \"1 / 3\"; primary (orange) for the current page, surface-alt for the others.","keyIdea":"One carousel pager dot: an empty solid Button with no children and an aria-label of \"1 / 3\"; primary (orange) for the current page, surface-alt for the others.","selector":"[class~=\"aui-button\"][aria-current]"},
      ],
options: [
    { id: "fd-carousel-dots", name: "Carousel footer", apps: ["fd"], contextAnatomy: [
      { id: "pager", name: "Pager", description: "The row that holds one dot per page with an 8px gap." },
      { id: "other-dot", name: "Other pages", description: "The surface-alt dots for the pages that are not current (2 / 3 and 3 / 3)." },
    ], source: {"fd":"src/components/InputPane.jsx"} ,
      contextLayers: [
        {"id":"context-pager","partId":"pager","title":"Pager","explanation":"The row that holds one dot per page with an 8px gap.","keyIdea":"The row that holds one dot per page with an 8px gap.","selector":"[data-ug-part=\"pager\"]","scope":"context"},
        {"id":"context-other-dot","partId":"other-dot","title":"Other pages","explanation":"The surface-alt dots for the pages that are not current (2 / 3 and 3 / 3).","keyIdea":"The surface-alt dots for the pages that are not current (2 / 3 and 3 / 3).","selector":"[data-ug-part=\"other-dot\"]","scope":"context"},
      ],
    },
  ],
  source: { fd: 'src/components/InputPane.jsx' },
  summary: 'An empty solid Button is one dot of a carousel pager; the current page is the primary one.',
  where: 'The footer of the FD input pane carousel: one dot per page of cards.',
  when: 'Use it only as a page indicator that also jumps to its page. It has no label, so always set aria-label ("1 / 3") and aria-current on the current dot.',
  how: 'Set aui paint "solid" and color "primary" for the current page, "surface-alt" for the others, on a Button with no children. '
    + 'Measured with no size class: 16px by 10px, orange rgb(255, 83, 8) when current; the app sizes the dot with its own carousel-dot CSS class, which the kit cannot state, so the scene shows the kit box. '
    + 'A Button with no label and a solid fill is not an icon button, so it stays a Single button.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "One carousel pager dot: an empty solid Button with no children and an aria-label of \"1 / 3\"; primary (orange) for the current page, surface-alt for the others.",
      selector: "[class~=\"aui-button\"][aria-current]",
    },
  ],
});
