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
  anatomy: [
    {
      id: "reset",
      name: "Reset button",
      token: "IconButton",
      description: "The icon-only rotate-left button at the start of the footer that resets the columns to their default order and visibility.",
      code: "<IconButton data-ug-part=\"reset\" name=\"rotate-left\" aria-label=\"Reset columns to default\" aui={{ paint: 'text' }} />",
    },
    {
      id: "actions",
      name: "Action group",
      token: "View",
      description: "The row at the end of the footer that holds Cancel and Save with an 8px gap.",
      code: "<View data-ug-part=\"actions\" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>\n  …\n</View>",
    },
    {
      id: "cancel",
      name: "Cancel",
      token: "Button",
      description: "The text-paint Cancel Button that closes the popover and discards changes (default color, no fill; default scale in HS).",
      code: "<Button data-ug-part=\"cancel\" aui={{ paint: 'text' }}>Cancel</Button>",
    },
    {
      id: "save",
      name: "Save",
      token: "Button",
      description: "The solid secondary Save Button that applies the column changes (scale \"sm\" in HCS, default scale in HS).",
      code: "<Button data-ug-part=\"save\" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>",
    },
  ],
});
