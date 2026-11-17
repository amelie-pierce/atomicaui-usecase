import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Popover',
  title: 'Help popover close',
  apps: ['hcs', 'pfd', 'pbs', 'agpd', 'rws', 'fd'],
  cases: [
    { id: 'hcs-help-close', name: 'Help popover close', apps: ['hcs'], source: { hcs: 'src/components/HcsDownloadDurationHelp.tsx' } },
    { id: 'pfd-help-close', name: 'Help popover close', apps: ['pfd'], source: { pfd: 'src/pfd/fields.tsx' } },
    { id: 'pbs-help-close', name: 'Help popover close', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'agpd-help-close', name: 'Help popover close', apps: ['agpd', 'rws'], source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' } },
    { id: 'fd-apps-close', name: 'Apps popover close', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  source: {
    hcs: 'src/components/HcsDownloadDurationHelp.tsx',
    pfd: 'src/pfd/fields.tsx',
    pbs: 'src/InputFields.tsx',
    agpd: 'src/agpd/inputs.tsx',
    rws: 'src/rws/inputs.tsx',
    fd: 'src/App.jsx',
  },
  summary: 'An X button closes a help popover; each app builds the X and its place in the popup differently.',
  where: 'The corner of a popover that explains a field, beside the circle-question trigger of Button-018, and the close of the FD apps popover. HCS has the X in an intro row; PFD above the text; PBS beside it; AGPD and RWS above it at a smaller size; FD in the title row of its apps panel.',
  when: 'Use it to dismiss a popover that has no footer. It is the compact square profile, not the contained header size, so it stays out of the way of the text.',
  how: 'Help popover close, HCS: set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square-compact", plus sx flex "none"; the glyph is xmark and the IconButton needs an aria-label. The popup is a View card (surface, solid, soft, elevation 4) as wide as 34rem, kept inside the stage (an inline min()), above the circle-question trigger (top, start, 8px offset); the X sits at the end of the intro row above two duration notes. PFD: a Button (not an IconButton) with a ContainedIcon xmark at profile "square", scale "sm", secondary, text, alone in its own row at the end (alignSelf end) above the text, in a column up to 384px. PBS: an IconButton at scale "xs", paint "text", profile "square-compact", shape "soft" and no color, at the end of a row beside the help text, in a 320px popup. AGPD and RWS: an IconButton with only scale "xs", right-aligned in its own row above the text, in a 320px column (AGPD also tabIndex -1 in its hover popovers). Apps popover close, FD (own type): a Button with an xmark Icon child, color "secondary", paint "text", scale "sm", at the end of the title row "Explore More Applications" in the 288px apps popover opened from the top bar grip (bottom, end, 8px offset); the grid of app links is left out. Every scene is shown open and keeps one sentence of help text; the optional image or diagram of the PFD, AGPD and RWS popups is left out.',
});
