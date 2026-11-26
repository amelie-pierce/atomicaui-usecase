import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'popover', name: 'Configure columns popover', description: 'The elevated popover opened under the table-columns IconButton that holds the column list and this footer.' },
  { id: 'columns', name: 'Column list', description: 'The reorderable List of Output columns, each with a visibility Switch and a drag handle.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Save column configuration buttons',

  apps: ['hcs', 'hs'],
    layers: [
        {"id":"reset","partId":"reset","title":"Reset button","explanation":"The icon-only rotate-left button at the start of the footer that resets the columns to their default order and visibility.","keyIdea":"The reset icon restores the original column order and visibility.","selector":"[data-ug-part=\"reset\"]"},
        {"id":"actions","partId":"actions","title":"Action group","explanation":"The row at the end of the footer that holds Cancel and Save with an 8px gap.","keyIdea":"The footer keeps reset separate from the cancel and save decisions.","selector":"[data-ug-part=\"actions\"]"},
        {"id":"cancel","partId":"cancel","title":"Cancel","explanation":"The text-paint Cancel Button that closes the popover and discards changes (default color, no fill; default scale in HS).","keyIdea":"Cancel closes the popover without applying visibility or order edits.","selector":"[data-ug-part=\"cancel\"]"},
        {"id":"save","partId":"save","title":"Save","explanation":"The solid secondary Save Button that applies the column changes (scale \"sm\" in HCS, default scale in HS).","keyIdea":"Save commits the edited column arrangement to the output table.","selector":"[data-ug-part=\"save\"]"},
      ],
options: [
    { id: "hcs-configure-columns", name: "Configure columns", apps: ["hcs"], contextAnatomy: CONTEXT_ANATOMY, source: {"hcs":"src/components/ColumnVisibility.tsx"} ,
      contextLayers: [
        {"id":"context-popover","partId":"popover","title":"Configure columns popover","explanation":"The elevated popover opened under the table-columns IconButton that holds the column list and this footer.","keyIdea":"The elevated popover keeps column settings attached to their table trigger.","selector":"[data-ug-part=\"popover\"]","scope":"context"},
        {"id":"context-columns","partId":"columns","title":"Column list","explanation":"The reorderable List of Output columns, each with a visibility Switch and a drag handle.","keyIdea":"The list makes each output column independently visible and reorderable.","selector":"[data-ug-part=\"columns\"]","scope":"context"},
      ],
    },
    { id: "hs-configure-columns", name: "Configure columns — UI variant 2", apps: ["hs"], contextAnatomy: CONTEXT_ANATOMY, source: {"hs":"src/hs/ColumnVisibility.tsx"} ,
      contextLayers: [
        {"id":"context-popover","partId":"popover","title":"Configure columns popover","explanation":"The elevated popover opened under the table-columns IconButton that holds the column list and this footer.","keyIdea":"The HCS popover presents the same table settings in its app context.","selector":"[data-ug-part=\"popover\"]","scope":"context"},
        {"id":"context-columns","partId":"columns","title":"Column list","explanation":"The reorderable List of Output columns, each with a visibility Switch and a drag handle.","keyIdea":"The HCS column list connects visibility switches with drag reordering.","selector":"[data-ug-part=\"columns\"]","scope":"context"},
      ],
    },
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
    },
    {
      id: "actions",
      name: "Action group",
      description: "The row at the end of the footer that holds Cancel and Save with an 8px gap.",
    },
    {
      id: "cancel",
      name: "Cancel",
      description: "The text-paint Cancel Button that closes the popover and discards changes (default color, no fill; default scale in HS).",
    },
    {
      id: "save",
      name: "Save",
      description: "The solid secondary Save Button that applies the column changes (scale \"sm\" in HCS, default scale in HS).",
    },
  ],
});
