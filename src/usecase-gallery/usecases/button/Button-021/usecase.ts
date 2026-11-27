import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'popover', name: 'Configure columns popover', description: 'The elevated popover opened under the table-columns IconButton that holds the column list and this footer.' },
  { id: 'columns', name: 'Column list', description: 'The reorderable List of Output columns, each with a visibility Switch and a drag handle.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Save column configuration buttons',

  apps: ['hcs', 'hs'],
options: [
    { id: "hcs-configure-columns", name: "Compact save button", apps: ["hcs"], contextAnatomy: CONTEXT_ANATOMY, source: {"hcs":"src/components/ColumnVisibility.tsx"} ,
     contextAnatomyOverrides: [{"id":"popover","lesson":{"explanation":"Elevated popover contains the output columns and footer actions.","selector":"[data-ug-part=\"popover\"]","scope":"context"}},{"id":"columns","lesson":{"explanation":"Reorderable Output list pairs each column with visibility and drag controls.","selector":"[data-ug-part=\"columns\"]","scope":"context"}}]},
    { id: "hs-configure-columns", name: "Default save button", apps: ["hs"], contextAnatomy: CONTEXT_ANATOMY, source: {"hs":"src/hs/ColumnVisibility.tsx"} ,
     contextAnatomyOverrides: [{"id":"popover","lesson":{"explanation":"Elevated popover contains the output columns and footer actions.","selector":"[data-ug-part=\"popover\"]","scope":"context"}},{"id":"columns","lesson":{"explanation":"Reorderable Output list pairs each column with visibility and drag controls.","selector":"[data-ug-part=\"columns\"]","scope":"context"}}]},
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
  anatomy: [
    {
      id: "reset",
      name: "Reset button",
      description: "The icon-only rotate-left button at the start of the footer that resets the columns to their default order and visibility.",
     lesson: {"explanation":"Start reset icon restores columns to default order and visibility.","selector":"[data-ug-part=\"reset\"]"}},
    {
      id: "actions",
      name: "Action group",
      description: "The row at the end of the footer that holds Cancel and Save with an 8px gap.",
     lesson: {"explanation":"Footer pairs Cancel and Save with an 8px gap.","selector":"[data-ug-part=\"actions\"]"}},
    {
      id: "cancel",
      name: "Cancel",
      description: "The text-paint Cancel Button that closes the popover and discards changes (default color, no fill; default scale in HS).",
     lesson: {"explanation":"Text Cancel closes the popover and discards pending changes.","selector":"[data-ug-part=\"cancel\"]"}},
    {
      id: "save",
      name: "Save",
      description: "The solid secondary Save Button that applies the column changes (scale \"sm\" in HCS, default scale in HS).",
     lesson: {"explanation":"Solid secondary Save applies the output column changes.","selector":"[data-ug-part=\"save\"]"}},
  ],
});
