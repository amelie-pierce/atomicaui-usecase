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
    layers: [
        {"id":"collapse","partId":"collapse","title":"Collapse all","explanation":"The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header.","keyIdea":"The collapse control folds every input section with one action.","selector":"[class~=\"aui-button\"][aria-label^=\"Collapse\"]"},
        {"id":"collapse-icon","partId":"collapse-icon","title":"Icon","explanation":"The arrows-to-line glyph, which becomes expand when all sections are closed.","keyIdea":"The arrows-to-line glyph indicates that sections can be gathered together.","selector":"[class~=\"aui-button\"][aria-label^=\"Collapse\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])"},
        {"id":"tooltip","partId":"tooltip","title":"Tooltip","explanation":"The Collapse Input label shown below the button in the HCS panel header.","keyIdea":"The HCS tooltip names the pane-level collapse action.","selector":"[class~=\"aui-tooltip-popup\"]"},
        {"id":"item","partId":"item","title":"Section","explanation":"The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together.","keyIdea":"The section item represents one expandable group in the input pane.","selector":"[class~=\"aui-accordion-item\"]"},
        {"id":"trigger","partId":"trigger","title":"Section trigger","explanation":"The header row of each section with its icon, semi-bold name and chevron.","keyIdea":"The trigger row combines a section name, icon and disclosure chevron.","selector":"[class~=\"aui-accordion-trigger\"]"},
      ],
options: [
    { id: "hcs-panel-header", contextAnatomy: CONTEXT_ANATOMY, name: "Panel header", apps: ["hcs"], source: {"hcs":"src/App.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"The surface-alt Input pane that frames the header and the section card.","keyIdea":"The input pane frames both its global header and its property sections.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
        {"id":"context-collapse-input","partId":"collapse-input","title":"Collapse Input","explanation":"The angle-left button at the start of the header that collapses the whole pane, with its Collapse Input tooltip.","keyIdea":"The pane control collapses the entire input region, beyond one section.","selector":"[class~=\"aui-button\"][aria-label=\"Collapse Input\"]","scope":"context"},
        {"id":"context-pane-title","partId":"pane-title","title":"Pane title","explanation":"The semi-bold Input heading in the header, before the spacer and Collapse all.","keyIdea":"The header title identifies the panel affected by Collapse all.","selector":"[data-ug-part=\"pane-title\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A transparent icon-only IconButton collapses every section of the Input pane, and expands them again when all are closed.',
  where: 'The end of the HCS Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer. Real site source: HCS src/App.tsx. No other app has this control.',
  when: 'Use it for panel chrome that acts on every section at once; wrap it in a Tooltip with the same text as the aria-label.',
  how: 'An IconButton with aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained" inside a Tooltip with the same text as the aria-label, as the app does for every icon-only button. '
    + 'In context it sits above two accordion sections, both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line. '
    + 'The section contents and the Galvanized card are left out. One group, HCS only.',
  anatomy: [
    { id: 'collapse', name: 'Collapse all', selector: '[class~="aui-button"][aria-label^="Collapse"]', description: 'The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header.' },
    { id: 'collapse-icon', name: 'Icon', selector: '[class~="aui-button"][aria-label^="Collapse"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrows-to-line glyph, which becomes expand when all sections are closed.' },
    { id: 'tooltip', name: 'Tooltip', selector: '[class~="aui-tooltip-popup"]', description: 'The Collapse Input label shown below the button in the HCS panel header.' },
    { id: 'item', name: 'Section', selector: '[class~="aui-accordion-item"]', description: 'The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together.' },
    { id: 'trigger', name: 'Section trigger', selector: '[class~="aui-accordion-trigger"]', description: 'The header row of each section with its icon, semi-bold name and chevron.' },
  ],
});
