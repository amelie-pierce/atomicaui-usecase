import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Column filter select',
  apps: ['hcs', 'hs', 'pfd'],
  cases: [
    {
      id: 'hcs-column-filter',
      name: 'Column filter select',
      apps: ['hcs', 'hs'],
      source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx' },
    },
    {
      id: 'pfd-column-filter',
      name: 'Column filter select',
      apps: ['pfd'],
      source: { pfd: 'src/pfd/ColumnMenu.tsx' },
    },
  ],
  source: { hcs: 'src/components/ColumnMenu.tsx', hs: 'src/hs/ColumnMenu.tsx', pfd: 'src/pfd/ColumnMenu.tsx' },
  summary: 'The Search by option field inside a table column menu: a select that filters the column to one of its values, with Select all first.',
  where: 'The column menu popover of the Output table in HCS, HS and PFD (the header menu with the sort buttons and a text search), under the Search by text field.',
  when: 'Use it to filter a table column to one of its known values from inside the column menu. Use the text search field above it for free text.',
  how: 'Opens below (HCS, HS): a Field at scale "sm" (gap 4, minWidth 0) with the label "Search by option" and a Field.Select whose trigger is color "surface", paint "fixed", shape "soft" and width fill. The Field.SelectPositioner is side "bottom", align "start", sideOffset 4 with alignItemWithTrigger off, so the list sits under the trigger; the rows are bare Field.SelectItems (Select all first) with no indicator. Opens upward (PFD): the same field with side "top", so the list opens above the trigger (measured 36px below the trigger against 92px above). The scenes show the enabled state (HCS disables the field with fewer than two options, HS with none) and leave out the column menu Popover, the sort buttons and the text search field.',
});
