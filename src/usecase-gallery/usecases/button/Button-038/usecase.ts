import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Open field help button',
  look: 'Ghost, 28px',
  apps: ['hs', 'adm', 'pfd', 'agpd'],
  cases: [
    { id: 'hs-field-help', name: 'Field help', apps: ['hs'], source: { hs: 'src/hs/InputFields.tsx' } },
    { id: 'adm-field-help', name: 'Field help', apps: ['adm'], source: { adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx' } },
    { id: 'pfd-field-help', name: 'Field help', apps: ['pfd', 'agpd'], source: { pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' } },
  ],
  source: { hs: 'src/hs/InputFields.tsx', adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx', pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' },
  summary: 'A square transparent IconButton with a circle-question, 28px, opens the help of a field from after its label.',
  where: 'After a field label in the input pane (HS and ADM as a tooltip, PFD and AGPD as a popover; the popover is closed by Button-030). The apps whose field-help trigger is a 20px square are in Button-033.',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" on an IconButton. '
    + 'The apps that write the circle-question as a Button with a ContainedIcon child at profile "square" get the same 28px box and glyph. '
    + 'HS (a square Button with a ContainedIcon circle-question child after the label, opening a Tooltip above it, 4px offset, up to 384px, so it has no close); ADM (the same square Button with a Tooltip above it, 8px offset, painted solid secondary at scale "sm", up to 256px); PFD and AGPD (one group: the same square Button opening a popover, top, 4px offset, a surface card up to 384px). '
    + 'Each help scene keeps one labelled field and one sentence of help text.',
});
