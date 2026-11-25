import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Column menu',
  apps: ['hcs', 'hs', 'pfd'],
  options: [
    { id: "hcs-column-menu", name: "Column menu", apps: ["hcs","hs"], source: {"hcs":"src/components/ColumnMenu.tsx","hs":"src/hs/ColumnMenu.tsx"} },
    { id: "pfd-column-menu", name: "Column menu — UI variant 2", apps: ["pfd"], source: {"pfd":"src/pfd/ColumnMenu.tsx"} },
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
      selector: '[class~="aui-table-header-cell"]',
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
