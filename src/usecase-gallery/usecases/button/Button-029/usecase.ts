import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Close popover button',
  look: 'Ghost, 20px',
  apps: ['hcs', 'pfd', 'pbs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-help-close', name: 'Help popover close', apps: ['hcs'], source: { hcs: 'src/components/HcsDownloadDurationHelp.tsx' } },
    { id: 'pfd-help-close', name: 'Help popover close', apps: ['pfd'], source: { pfd: 'src/pfd/fields.tsx' } },
    { id: 'pbs-help-close', name: 'Help popover close', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'agpd-help-close', name: 'Help popover close', apps: ['agpd', 'rws'], source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' } },
    { id: 'fd-apps-close', name: 'Apps popover close', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/ResultsSection.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A transparent icon-only IconButton, 20px square, closes a popover from its corner.',
  where: 'The corner or title end of a popover: the help popover that opens from the circle-question trigger of a field (HCS, PFD, PBS, AGPD, RWS) and the FD apps popover. '
    + 'The trigger that opens the help is Button-032 or Button-033.',
  when: 'Use it to dismiss a popover without acting. Always set aria-label.',
  how: 'The example is the shared part: an IconButton with paint "text", profile "contained" and an aria-label; the apps differ only in the glyph, the props they set and where the button sits. '
    + 'The Popover is the supporting part the In context scene writes around it; IconButton needs the Font Awesome font to show its glyph. '
    + 'Help popover close: HCS (an IconButton at scale "sm", profile "square-compact", color "secondary", paint "text", shape "soft", sx flex "none", at the end of an intro row in a View card, surface, solid, soft, elevation 4, up to 34rem, above the circle-question trigger; top, start, 8px offset). '
    + 'PFD: a Button (not an IconButton) with a ContainedIcon xmark at profile "square", scale "sm", secondary, text, alone in its own row at the end above the text, in a column up to 384px. '
    + 'PBS: an IconButton at scale "xs", paint "text", profile "square-compact", shape "soft" and no color, at the end of a row beside the help text, in a 320px popup. '
    + 'AGPD and RWS: an IconButton with only scale "xs", right-aligned in its own row above the text, in a 320px column. The optional image or diagram of the PFD, AGPD and RWS popups is left out. '
    + 'Apps popover close: FD only (a Button with an xmark Icon child, color "secondary", paint "text", scale "sm", at the end of the title row "Explore More Applications" in the 288px apps popover opened from the top bar grip; the grid of app links is left out).',
});
