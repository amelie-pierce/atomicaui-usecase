import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'input-pane', name: 'Input pane', selector: '[data-ug-part="input-pane"]', description: 'The surface-alt Input pane that frames the header and the section card.' },
  { id: 'collapse-input', name: 'Collapse Input', selector: '[class~="aui-button"][aria-label="Collapse Input"]', description: 'The angle-left button at the start of the header that collapses the whole pane, with its Collapse Input tooltip.' },
  { id: 'pane-title', name: 'Pane title', selector: '[data-ug-part="pane-title"]', description: 'The semi-bold Input heading in the header, before the spacer and Collapse all.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Collapse all sections button',

  apps: ['hcs'],
options: [
    { id: "hcs-panel-header", contextAnatomy: CONTEXT_ANATOMY, name: "Panel header", apps: ["hcs"], source: {"hcs":"src/App.tsx"} ,
     contextAnatomyOverrides: [{"id":"input-pane","lesson":{"explanation":"The surface-alt Input pane that frames the header and the section card.","scope":"context"}},{"id":"collapse-input","lesson":{"explanation":"HCS header starts with a pane-collapse button and tooltip.","scope":"context"}},{"id":"pane-title","lesson":{"explanation":"Semi-bold Input title sits beside Collapse all in the header.","scope":"context"}}]},
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A transparent icon-only IconButton collapses every section of the Input pane, and expands them again when all are closed.',
  where: 'The end of the HCS Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer. Real site source: HCS src/App.tsx. No other app has this control.',
  when: 'Use it for panel chrome that acts on every section at once; wrap it in a Tooltip with the same text as the aria-label.',
  how: 'An IconButton with aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained" inside a Tooltip with the same text as the aria-label, as the app does for every icon-only button. '
    + 'In context it sits above two accordion sections, both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line. '
    + 'The section contents and the Galvanized card are left out. One group, HCS only.',
  anatomy: [
    { id: 'collapse', name: 'Collapse all', selector: '[class~="aui-button"][aria-label^="Collapse"]', description: 'The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header.' , lesson: {"explanation":"Transparent secondary button collapses every Input section at once."}},
    { id: 'collapse-icon', name: 'Icon', selector: '[class~="aui-button"][aria-label^="Collapse"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrows-to-line glyph, which becomes expand when all sections are closed.' , lesson: {"explanation":"The arrows-to-line glyph, which becomes expand when all sections are closed.","code":["IconButton"]}},
    { id: 'tooltip', name: 'Tooltip', selector: '[class~="aui-tooltip-popup"]', description: 'The Collapse Input label shown below the button in the HCS panel header.' , lesson: {"explanation":"HCS shows the Collapse Input label beneath its button."}},
    { id: 'item', name: 'Section', selector: '[class~="aui-accordion-item"]', description: 'The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together.' , lesson: {"explanation":"Connection Type and Load Properties sections collapse together."}},
    { id: 'trigger', name: 'Section trigger', selector: '[class~="aui-accordion-trigger"]', description: 'The header row of each section with its icon, semi-bold name and chevron.' , lesson: {"explanation":"Section header pairs its icon and name with a chevron."}},
  ],
});
