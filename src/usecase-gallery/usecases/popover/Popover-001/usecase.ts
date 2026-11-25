import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Help popover',
  apps: ['pfd', 'pbs', 'agpd', 'rws'],
  options: [
    { id: "pbs-help", name: "Field help", apps: ["pbs"], source: {"pbs":"src/InputFields.tsx"} },
    { id: "pfd-help", name: "Field help — UI variant 2", apps: ["pfd"], source: {"pfd":"src/pfd/fields.tsx"} },
    { id: "agpd-help", name: "Field help — UI variant 3", apps: ["agpd","rws"], source: {"agpd":"src/agpd/inputs.tsx","rws":"src/rws/inputs.tsx"} },
  ],
  source: { pfd: 'src/pfd/fields.tsx', pbs: 'src/InputFields.tsx', agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' },
  summary: 'A short text popover opened from a circle-question trigger beside a field label, closed by an X or an outside click.',
  where: 'After the label of an input field in PFD, PBS, AGPD and RWS (HCS, ACE, ADM and HS use a Tooltip for field help). Real source: the help popover of each app (the paths are in the cases).',
  when: 'Use it for help text the user opens on purpose and may need to read for a while, or that holds a link or a diagram. Use a Tooltip for one short hover hint. Do not use it for a form or menu (Popover-002, Popover-003).',
  how: 'The Popover opens from `Popover.Trigger` (a text `Button` with `ContainedIcon` circle-question) above it (`side="top"`, `sideOffset={4}`); the Popup renders a `View` (color surface, solid, profile default, soft, elevation 4). Field help has three groups: PBS (a row, the text fills it and an xs `IconButton` X sits at its end, 320px), PFD (a column, a square Button X in its own row above the text, up to 384px) and AGPD and RWS (a 320px column, an xs `IconButton` X in its own row above the text). The close X itself is Button-029. The scenes leave out the optional image or diagram, and PBS\'s link parser.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Popover.Trigger',
      selector: '[data-base-ui-click-trigger]',
      description: 'The text circle-question button labelled "Material help" beside the field label; it is a compact square in PBS and the example and a square in PFD and AGPD.',
      code: `<Popover.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square-compact', shape: 'soft' }} />}>
  <ContainedIcon name="circle-question" />
</Popover.Trigger>`,
    },
    {
      id: 'trigger-icon',
      name: 'Trigger icon',
      token: 'ContainedIcon',
      selector: '[data-base-ui-click-trigger] [class~="aui-contained-icon"]',
      description: 'The circle-question glyph inside the help trigger.',
      code: `<ContainedIcon name="circle-question" />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Popover.Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The elevated soft surface (surface colour, solid, elevation 4) that opens above the trigger with a 4px offset: 320px wide, and up to 384px in PFD.',
      code: `<Popover.Popup
  initialFocus={false}
  aria-label="Material help"
  render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', alignItems: 'start', gap: '8', width: '320' } }} />}
>`,
    },
    {
      id: 'help-text',
      name: 'Help text',
      token: 'Type',
      text: true,
      description: 'The p3 sentence "Select the base material of the member."; in PBS and the example it fills the row beside the close X, in the other apps it sits under it.',
      code: `<Type data-ug-part="help-text" as="p" role="p3" aui={{ sx: { flex: 'fill' } }}>Select the base material of the member.</Type>`,
    },
    {
      id: 'close-row',
      name: 'Close row',
      token: 'View',
      description: 'The end-aligned row above the text in AGPD that holds only the close X.',
      code: `<View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'IconButton',
      description: 'The X that closes the popover: an xs icon button at the end of the row in PBS, in its own row in AGPD, and a square Button in PFD.',
      code: `<IconButton data-ug-part="close" name="xmark" aria-label="Close" aui={{ scale: 'xs', paint: 'text', profile: 'square-compact', shape: 'soft' }} />`,
    },
  ],
});
