import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Popover',
  title: 'Popover footer',
  apps: ['hcs'],
  source: { hcs: 'src/components/ColumnVisibility.tsx' },
  summary: 'An icon-only reset, a ghost text Cancel and a solid secondary Save close a popover.',
  where: 'The footer of a popover form, such as the column configurator: a reset icon, Cancel, Save. Real site source: HCS Button-016 (src/components/ColumnVisibility.tsx). Dialogs use a gray solid Cancel instead (Button-001).',
  when: 'Use it when the popover is lightweight and the Cancel should not compete with Save. Prefer the filled Cancel of Button-001 in dialogs; the real site spells the two differently.',
  how: 'Cancel sets aui paint "text" (default color, no fill). Save sets scale "sm", color "secondary" and paint "solid". Cancel and Save sit in their own row View so the footer row can use justifyContent "between": reset icon at the start, the pair at the end. Cancel sets only paint "text" (it keeps the default scale, as in the app); Save sets scale "sm". In context the popover is the Configure columns popover of the app, opened under its table-columns trigger at the end of the Output header (bottom, end, 4px offset): a reorderable List of three Output columns (Model locked and always on, a switch and a drag handle on each row, an arrow-up beside Load for the sort), then this footer; the search field, the other six columns and Group by model are left out. Cancel and Save carry no icon; the reset is an IconButton with the rotate-left glyph, name only, aui paint "text", and needs an aria-label.',
});
