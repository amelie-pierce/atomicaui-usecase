import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'IconButton',
  title: '(to merge)',
  apps: ['hcs', 'pfd', 'pbs', 'hs', 'adm', 'agpd', 'rws', 'fd'],
  cases: [
    { id: 'hcs-field-help', name: 'Field help', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'pfd-field-help', name: 'Field help', apps: ['pfd', 'agpd'], source: { pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' } },
    { id: 'pbs-field-help', name: 'Field help', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'rws-field-help', name: 'Field help', apps: ['rws'], source: { rws: 'src/rws/inputs.tsx' } },
    { id: 'hs-field-help', name: 'Field help', apps: ['hs'], source: { hs: 'src/hs/InputFields.tsx' } },
    { id: 'adm-field-help', name: 'Field help', apps: ['adm'], source: { adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx' } },
    { id: 'fd-header-info', name: 'Header info', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } },
  ],
  source: {
    hcs: 'src/App.tsx',
    pfd: 'src/pfd/fields.tsx',
    pbs: 'src/InputFields.tsx',
    hs: 'src/hs/InputFields.tsx',
    adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx',
    agpd: 'src/agpd/inputs.tsx',
    rws: 'src/rws/inputs.tsx',
    fd: 'src/components/Results.jsx',
  },
  summary: 'A transparent circle-question button sits right after a field label and opens its help.',
  where: 'The label row above a field in the Input pane (HCS: Download Duration in Load Properties, src/App.tsx lines 1131-1170 and src/components/HcsDownloadDurationHelp.tsx). Real site source of the other apps is recorded per scene; FD has no field help, only an info trigger in a table header.',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label; the popup or tooltip it opens holds the long explanation.',
  how: 'Field help, HCS: an IconButton with aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph; it opens the popover of IconButton-001. In context it is the Load Properties section: Download Duration alone, the label row (label text, then the icon, a flex row) above its select. The other fields are left out. PFD and AGPD (one group): a Button, not an IconButton, with a ContainedIcon circle-question child at profile "square" (28px), opening a popover. PBS: a Button at profile "square-compact" so the label row keeps its height, opening a 320px popover. RWS: a Button at profile "square" pinned to 20px by sx, opening a 320px popover. HS: the same square Button, but it opens a Tooltip (top, 4px offset, up to 384px), not a popover, so it has no close. ADM: the same square Button with a Tooltip above it (top, 8px offset) painted solid secondary at scale "sm", up to 256px. Header info, FD (own type): a Button with a circle-info Button.Icon, color "secondary", paint "text", scale "xs", in a table column header cell, opening a popover below it. Each scene keeps one labelled field and one sentence of help text.',
});
