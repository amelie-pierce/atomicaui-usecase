import { defineUsecase } from '../../../define';

const HCS_CONTEXT = [
  { id: 'results-table', name: 'Results table', selector: '[class~="aui-table"]', description: 'The sortable Connector calculation results Table with the Model and Load (lb) columns.' },
  { id: 'result-rows', name: 'Result rows', selector: '[class~="aui-table-body"]', description: 'The two body rows, ordered by the ascending Load (lb) sort chosen in the menu.' },
];

const PFD_CONTEXT = [
  { id: 'results-table', name: 'Results table', selector: '[class~="aui-table"]', description: 'The sortable Connector calculation results Table with the Model and Load (lb) columns.' },
  { id: 'result-rows', name: 'Result rows', selector: '[class~="aui-table-body"]', description: 'The two body rows, ordered by the ascending Load (lb) sort chosen in the menu.' },
  { id: 'menu-close', name: 'Menu close', selector: '[data-aui-popup-motion][role="dialog"] [class~="aui-button"][aria-label="Close"]', description: 'The Close button at the end of the menu popover, above the Sort radios.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Open column menu button',

  apps: ['hcs', 'hs', 'pfd'],
    layers: [
        {"id":"options","partId":"options","title":"Column options","explanation":"Compact square transparent button opens the menu; apps vary ellipsis direction.","keyIdea":"The compact menu trigger opens sorting choices for its table column.","selector":"[class~=\"aui-button\"][aria-label*=\"column options\" i]"},
        {"id":"options-icon","partId":"options-icon","title":"Icon","explanation":"The vertical or horizontal ellipsis glyph, centred in the button.","keyIdea":"The ellipsis glyph marks a menu of column-specific actions.","selector":"[class~=\"aui-button\"][aria-label*=\"column options\" i] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])","code":["IconButton","ContainedIcon"]},
        {"id":"header-cell","partId":"header-cell","title":"Column header","explanation":"Raised Model and Load headings hold options; Load sorts ascending.","keyIdea":"The raised header holds both the result label and its sort controls.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"popup","partId":"popup","title":"Column menu","explanation":"256px sort menu opens under Load; PFD adds a Close action.","keyIdea":"The menu groups sort direction choices beside the selected column.","selector":"[data-aui-popup-motion][role=\"dialog\"]","code":["Popover.Popup"]},
        {"id":"radio","partId":"radio","title":"Sort option","explanation":"Three sort choices include A to Z, Z to A, and None.","keyIdea":"The radio group makes the active ordering choice visible.","selector":"[class~=\"aui-radio\"]"},
      ],
options: [
    { id: "hcs-column-menu", contextAnatomy: HCS_CONTEXT, name: "Vertical column menu", apps: ["hcs","hs"], source: {"hcs":"src/components/ColumnMenu.tsx","hs":"src/hs/ColumnMenu.tsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Sortable results table has Model and Load columns.","keyIdea":"The table applies the column menu to connector calculation results.","selector":"[class~=\"aui-table\"]","scope":"context"},
        {"id":"context-result-rows","partId":"result-rows","title":"Result rows","explanation":"Two result rows follow the ascending Load sort.","keyIdea":"The rows reflect the ascending load order selected in the menu.","selector":"[class~=\"aui-table-body\"]","scope":"context"},
      ],
    },
    { id: "pfd-column-menu", contextAnatomy: PFD_CONTEXT, name: "Horizontal column menu", apps: ["pfd"], source: {"pfd":"src/pfd/ColumnMenu.tsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Sortable results table has Model and Load columns.","keyIdea":"The PFD table provides a close action after its sort choices.","selector":"[class~=\"aui-table\"]","scope":"context"},
        {"id":"context-result-rows","partId":"result-rows","title":"Result rows","explanation":"Two result rows follow the ascending Load sort.","keyIdea":"The PFD result rows show values ordered by ascending load.","selector":"[class~=\"aui-table-body\"]","scope":"context"},
        {"id":"context-menu-close","partId":"menu-close","title":"Menu close","explanation":"PFD Close action sits above the sort radio group.","keyIdea":"The close control exits the column menu after the sort selection.","selector":"[data-aui-popup-motion][role=\"dialog\"] [class~=\"aui-button\"][aria-label=\"Close\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx', pfd: 'src/pfd/ColumnMenu.tsx' },
  summary: 'A small IconButton opens the menu of a table column header.',
  where: 'The header cell of each table column, beside the column title. '
    + 'Real site source: HCS (the actions slot of the results header in src/components/F01Results.tsx; the menu is src/components/ColumnMenu.tsx), HS (src/hs/ColumnMenu.tsx) and PFD (src/pfd/ColumnMenu.tsx).',
  when: 'Use it for a per-column menu where space is tight. It is smaller than the panel icon buttons and uses the surface color.',
  how: 'HCS: set aui color "surface", paint "text", profile "square-compact", shape "soft" and scale "xs" with the ellipsis-vertical glyph, and pass it to Table.HeaderCell through the actions prop: the kit lays the header out as label then actions, so the kebab sits at the end of each cell. '
    + 'In context the menu is open under the Load (lb) kebab (bottom, end, 4px offset): a View card (surface, solid, soft, elevation 4, 256px) over the table with the Sort radios (Sort A to Z (Smallest to Largest), Sort Z to A (Largest to Smallest), None); Search by text and Search by option are left out. '
    + 'Load is sorted ascending, so its rows run from smallest to largest. The scene shows two of the nine Output columns and two rows. '
    + 'HS renders the same as HCS: its trigger takes color "secondary" while its column is sorted or filtered (the filter glyph while filtered), which computes to the same near-black text, no fill and the same hover as the HCS "surface" kebab, so HCS and HS are one group. '
    + 'PFD (own group): the horizontal ellipsis glyph, secondary while sorted, the menu opens under the trigger towards the next column (bottom, start) and starts with a Close Button (profile "square", scale "sm", secondary text, alignSelf end) above the Sort radios; Search by text and Search by option are left out.',
  anatomy: [
    { id: 'options', name: 'Column options', selector: '[class~="aui-button"][aria-label*="column options" i]', description: 'The xs square-compact transparent button that opens the column menu; HCS uses the ellipsis-vertical glyph and PFD the horizontal ellipsis.' },
    { id: 'options-icon', name: 'Icon', selector: '[class~="aui-button"][aria-label*="column options" i] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The vertical or horizontal ellipsis glyph, centred in the button.' },
    { id: 'header-cell', name: 'Column header', selector: '[class~="aui-table-header-cell"]', description: 'The raised Model and Load (lb) headings; each takes its options button through the actions prop, and Load (lb) is sorted ascending.' },
    { id: 'popup', name: 'Column menu', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The 256px popover opened under the Load (lb) heading with a Sort radio group; PFD adds a Close button at its end.' },
    { id: 'radio', name: 'Sort option', selector: '[class~="aui-radio"]', description: 'The three sort choices (A to Z, Z to A, None), with the ascending one selected in primary.' },
  ],
});
