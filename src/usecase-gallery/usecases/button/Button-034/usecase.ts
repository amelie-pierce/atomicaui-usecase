import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'results-table', name: 'Results table', selector: '[class~="aui-table"]', description: 'The Table whose raised header row holds the Fastener Pattern heading and its info button.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Show column info button',

  apps: ['fd'],
    layers: [
        {"id":"info","partId":"info","title":"Info button","explanation":"Extra-small transparent circle-info explains the Fastener Pattern column.","keyIdea":"The info action opens an explanation for the column heading.","selector":"[class~=\"aui-button\"][aria-label=\"Fastener Pattern\"], [class~=\"aui-button\"][aria-label=\"Column info\"]"},
        {"id":"info-icon","partId":"info-icon","title":"Info icon","explanation":"The circle-info glyph that signals a note about the column.","keyIdea":"The circle glyph signals supporting information about this result field.","selector":"[class~=\"aui-button\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])"},
        {"id":"header-cell","partId":"header-cell","title":"Column header","explanation":"Raised Fastener Pattern cell pairs heading and help icon with 4px gap.","keyIdea":"The raised header combines the column name with its help affordance.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"popup","partId":"popup","title":"Info popover","explanation":"384px solid popover explains fastener counts per row.","keyIdea":"The popover clarifies how fasteners are counted for a row.","selector":"[data-aui-popup-motion][role=\"dialog\"]"},
      ],
options: [
    { id: "fd-header-info", contextAnatomy: CONTEXT_ANATOMY, name: "Header info", apps: ["fd"], source: {"fd":"src/components/Results.jsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Raised Fastener Pattern header and help action sit in the results table.","keyIdea":"The results table places the assisted heading above its data rows.","selector":"[class~=\"aui-table\"]","scope":"context"},
      ],
    },
  ],
  source: { fd: 'src/components/ui.jsx' },
  summary: 'A transparent icon-only button with a circle-info opens an explanation popover from a table column header.',
  where: 'A table column header cell. Real site source: FD src/components/Results.jsx (FastenerPatternInfo). No other app has this control.',
  when: 'Use it to explain one column without adding permanent text; stop its click so it does not sort the column. Always set aria-label.',
  how: 'FD writes a Button (color "secondary", paint "text", scale "xs", shape "soft") with a circle-info Button.Icon, which opens a popover below it; the scene writes that Button, the example shows the IconButton form. '
    + 'The scene keeps one header cell and the first line of the popover. One group, FD only.',
  anatomy: [
    { id: 'info', name: 'Info button', selector: '[class~="aui-button"][aria-label="Fastener Pattern"], [class~="aui-button"][aria-label="Column info"]', description: 'The xs transparent secondary circle-info button that explains a column; in FD it is a Button with Button.Icon beside the Fastener Pattern heading.' },
    { id: 'info-icon', name: 'Info icon', selector: '[class~="aui-button"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The circle-info glyph that signals a note about the column.' },
    { id: 'header-cell', name: 'Column header', selector: '[class~="aui-table-header-cell"]', description: 'The raised Fastener Pattern heading cell that carries the text and the info button with a 4px gap.' },
    { id: 'popup', name: 'Info popover', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The 384px solid popover below the heading that states Fasteners are counted per row.' },
  ],
});
