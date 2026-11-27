import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
      { id: 'rows', name: 'Result rows', description: 'The table body rows under the header; with Load sorted A to Z they follow the chosen order.' },
      { id: 'other-header', name: 'Neighbouring header cell', description: 'The Model header cell with its own kebab, shown beside the Load (lb) header that the open menu belongs to.' },
    ];

export default defineUsecase({
  uiType: 'Popover',
  title: 'Column menu',
  apps: ['hcs', 'hs', 'pfd'],
    layers: [
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Kebab opens Column options beside the Load header.","keyIdea":"The kebab opens actions for the specific column whose heading contains it.","selector":"[data-base-ui-click-trigger]"},
        {"id":"table","partId":"table","title":"Results table","explanation":"Connector results table places kebab actions in its headers.","keyIdea":"The results table supplies column context for the sort menu shown above it.","selector":"[class~=\"aui-table\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Sortable header cell","explanation":"Sorted Load header holds kebab; dots turn horizontal in PFD.","keyIdea":"The Load heading identifies which column the sort choices will reorder.","selector":"[data-ug-part=\"header-cell\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"256px sort menu opens at the cell end, except PFD.","keyIdea":"The anchored popup groups ordering actions beside the column that they affect.","selector":"[data-aui-popup-motion][role=\"dialog\"]","code":["Popover.Popup"]},
        {"id":"close","partId":"close","title":"Close","explanation":"PFD close button sits above Sort choices in the popup.","keyIdea":"The PFD close control dismisses sorting without changing the current order.","selector":"[data-ug-part=\"close\"]"},
        {"id":"sort-group","partId":"sort-group","title":"Sort group","explanation":"The RadioGroup labelled \"Sort\" that holds the ordering choices.","keyIdea":"A labeled radio group makes the sort direction one mutually exclusive choice.","selector":"[class~=\"aui-radio-group\"]"},
        {"id":"sort-radio","partId":"sort-radio","title":"Sort option","explanation":"Sort choices include hints and None; selected option is solid primary.","keyIdea":"Each radio option states the resulting ordering so users can choose intentionally.","selector":"[class~=\"aui-radio\"]"},
      ],
options: [
    { id: "hcs-column-menu", contextAnatomy: CONTEXT_ANATOMY, name: "End-aligned sort menu", apps: ["hcs","hs"], source: {"hcs":"src/components/ColumnMenu.tsx","hs":"src/hs/ColumnMenu.tsx"} ,
      contextLayers: [
        {"id":"context-rows","partId":"rows","title":"Result rows","explanation":"A to Z sorting orders the table body rows.","keyIdea":"The result rows make the selected ascending order visible beneath the menu.","selector":"[data-ug-part=\"rows\"]","scope":"context"},
        {"id":"context-other-header","partId":"other-header","title":"Neighbouring header cell","explanation":"Model header shows its own kebab beside the open menu’s Load header.","keyIdea":"The neighboring Model header shows that Load sorting applies within the same table.","selector":"[data-ug-part=\"other-header\"]","scope":"context"},
      ],
    },
    { id: "pfd-column-menu", contextAnatomy: CONTEXT_ANATOMY, name: "Closeable sort menu", apps: ["pfd"], source: {"pfd":"src/pfd/ColumnMenu.tsx"} ,
      contextLayers: [
        {"id":"context-rows","partId":"rows","title":"Result rows","explanation":"A to Z sorting orders the table body rows.","keyIdea":"The PFD result rows reveal the chosen Load ordering in its table layout.","selector":"[data-ug-part=\"rows\"]","scope":"context"},
        {"id":"context-other-header","partId":"other-header","title":"Neighbouring header cell","explanation":"Model header shows its own kebab beside the open menu’s Load header.","keyIdea":"The adjacent Model header provides a stable point of comparison for the sorted Load column.","selector":"[data-ug-part=\"other-header\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx', pfd: 'src/pfd/ColumnMenu.tsx' },
  summary: 'A popover of choices opened from the kebab of a table header cell: the Sort radios for that column.',
  where: 'The header cell of the results table in HCS, HS and PFD. Real source: ColumnMenu.tsx of each app.',
  when: 'Use it for the options of one column. Do not use it for a form with a footer (Popover-002).',
  how: 'The kebab `IconButton` (Button-035) is passed through the header cell `actions`; the Popover opens under it (`side="bottom"`, `sideOffset={4}`), a 256px `View` column (surface, solid, soft, elevation 4, gap 12) holding a `RadioGroup`. HCS and HS open to the cell end (`align="end"`); PFD opens towards the next column (`align="start"`) and starts the popup with a Close Button. The scenes leave out the search fields and filters.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[data-base-ui-click-trigger]',
      description: 'The ellipsis-vertical "Column options" icon button, an xs kebab with a compact square profile; in the table scenes the popover anchors to the Load (lb) kebab instead.',
    },
    {
      id: 'table',
      name: 'Results table',
      selector: '[class~="aui-table"]',
      description: 'The "Connector calculation results" table of the HCS and PFD scenes whose headers host the kebab.',
    },
    {
      id: 'header-cell',
      name: 'Sortable header cell',
      selector: '[data-ug-part="header-cell"]',
      description: 'The Load (lb) header, sorted ascending, whose actions slot carries the kebab (vertical dots in HCS, horizontal in PFD).',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The 256px elevated column opened under the kebab, aligned to the cell end in HCS and the example and to its start in PFD.',
    },
    {
      id: 'close',
      name: 'Close',
      description: 'The PFD square Close button that starts the popup, end-aligned above the Sort choices.',
    },
    {
      id: 'sort-group',
      name: 'Sort group',
      selector: '[class~="aui-radio-group"]',
      description: 'The RadioGroup labelled "Sort" that holds the ordering choices.',
    },
    {
      id: 'sort-radio',
      name: 'Sort option',
      selector: '[class~="aui-radio"]',
      description: 'A sort choice such as "Sort A to Z" or "Sort Z to A"; the table scenes add "(Smallest to Largest)" hints and a None option, selected options are solid primary.',
    },
  ],
});
