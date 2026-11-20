import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Save column configuration buttons',
  look: 'Text and primary',
  apps: ['hcs', 'hs'],
  cases: [
    { id: 'hcs-configure-columns', name: 'Configure columns', apps: ['hcs'], source: { hcs: 'src/components/ColumnVisibility.tsx' } },
    { id: 'hs-configure-columns', name: 'Configure columns', apps: ['hs'], source: { hs: 'src/hs/ColumnVisibility.tsx' } },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx' },
  summary: 'A reset icon, a Cancel and a solid secondary Save close the Configure columns popover.',
  where: 'The footer of the Configure columns popover, opened from the table-columns IconButton at the end of the Output header: a reset icon at the start, then Cancel and Save. '
    + 'Real site source: HCS src/components/ColumnVisibility.tsx and HS src/hs/ColumnVisibility.tsx. Dialogs use a gray solid Cancel instead (Dialog-008).',
  when: 'Use it when the popover is lightweight and the Cancel should not compete with Save; the reset icon returns the columns to their default.',
  how: 'HCS: Cancel sets aui paint "text" (default color, no fill, default scale); Save sets scale "sm", color "secondary" and paint "solid". '
    + 'Cancel and Save sit in their own row View so the footer row can use justifyContent "between": reset icon at the start, the pair at the end. '
    + 'The reset is an IconButton with the rotate-left glyph, aui paint "text", and needs an aria-label. '
    + 'In context the popover is opened under the table-columns IconButton (contained profile) (bottom, end, 4px offset): a reorderable List of three Output columns, then this footer; the search field, the other columns and Group by model are left out. '
    + 'HS (own group): the same footer, but Save has no scale (default size) and the table-columns trigger has no contained profile.',
});
