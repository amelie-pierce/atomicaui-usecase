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
      token: 'Popover.Trigger',
      selector: '[data-base-ui-click-trigger]',
      description: 'The ellipsis-vertical "Column options" icon button, an xs kebab with a compact square profile; in the table scenes the popover anchors to the Load (lb) kebab instead.',
      code: `<Popover.Trigger render={<IconButton name="ellipsis-vertical" aria-label="Column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />} />`,
    },
    {
      id: 'table',
      name: 'Results table',
      token: 'Table',
      selector: '[class~="aui-table"]',
      description: 'The "Connector calculation results" table of the HCS and PFD scenes whose headers host the kebab.',
      code: `<Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }} sortable style={{ inlineSize: '100%' }}>`,
    },
    {
      id: 'header-cell',
      name: 'Sortable header cell',
      token: 'Table.HeaderCell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'The Load (lb) header, sorted ascending, whose actions slot carries the kebab (vertical dots in HCS, horizontal in PFD).',
      code: `<Table.HeaderCell aui={{ color: 'raised' }} sortDirection="asc" actions={<span ref={setAnchor}><IconButton name="ellipsis-vertical" aria-label="Load (lb) column options" /></span>}>Load (lb)</Table.HeaderCell>`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Popover.Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The 256px elevated column opened under the kebab, aligned to the cell end in HCS and the example and to its start in PFD.',
      code: `<Popover.Popup
  initialFocus={false}
  aria-label="Column options"
  render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }} />}
>`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Button',
      description: 'The PFD square Close button that starts the popup, end-aligned above the Sort choices.',
      code: `<Button data-ug-part="close" aria-label="Close" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { alignSelf: 'end' } }}>
  <ContainedIcon name="xmark" />
</Button>`,
    },
    {
      id: 'sort-group',
      name: 'Sort group',
      token: 'RadioGroup',
      selector: '[class~="aui-radio-group"]',
      description: 'The RadioGroup labelled "Sort" that holds the ordering choices.',
      code: `<RadioGroup defaultValue="asc">
  <RadioGroup.Label>Sort</RadioGroup.Label>`,
    },
    {
      id: 'sort-radio',
      name: 'Sort option',
      token: 'Radio',
      selector: '[class~="aui-radio"]',
      description: 'A sort choice such as "Sort A to Z" or "Sort Z to A"; the table scenes add "(Smallest to Largest)" hints and a None option, selected options are solid primary.',
      code: `<Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z</Radio.Label></Radio>`,
    },
  ],
});
