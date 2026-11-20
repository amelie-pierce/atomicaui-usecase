import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Help popover',
  apps: ['pfd', 'pbs', 'agpd', 'rws'],
  cases: [
    { id: 'pbs-help', name: 'Field help', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'pfd-help', name: 'Field help', apps: ['pfd'], source: { pfd: 'src/pfd/fields.tsx' } },
    { id: 'agpd-help', name: 'Field help', apps: ['agpd', 'rws'], source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' } },
  ],
  source: { pfd: 'src/pfd/fields.tsx', pbs: 'src/InputFields.tsx', agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' },
  summary: 'A short text popover opened from a circle-question trigger beside a field label, closed by an X or an outside click.',
  where: 'After the label of an input field in PFD, PBS, AGPD and RWS (HCS, ACE, ADM and HS use a Tooltip for field help). Real source: the help popover of each app (the paths are in the cases).',
  when: 'Use it for help text the user opens on purpose and may need to read for a while, or that holds a link or a diagram. Use a Tooltip for one short hover hint. Do not use it for a form or menu (Popover-002, Popover-003).',
  how: 'The Popover opens from `Popover.Trigger` (a text `Button` with `ContainedIcon` circle-question) above it (`side="top"`, `sideOffset={4}`); the Popup renders a `View` (color surface, solid, profile default, soft, elevation 4). Field help has three groups: PBS (a row, the text fills it and an xs `IconButton` X sits at its end, 320px), PFD (a column, a square Button X in its own row above the text, up to 384px) and AGPD and RWS (a 320px column, an xs `IconButton` X in its own row above the text). The close X itself is Button-020. The scenes leave out the optional image or diagram, and PBS\'s link parser.',
});
