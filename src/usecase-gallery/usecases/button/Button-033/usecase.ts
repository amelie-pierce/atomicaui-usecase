import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Ghost, 28px',
  apps: ['hcs', 'hs', 'pbs', 'adm', 'pfd', 'agpd'],
  cases: [
    { id: 'hcs-rail', name: 'Collapsed rail', apps: ['hcs'], source: { hcs: 'src/components/HcsSplitLayout.tsx' } },
    { id: 'hs-field-help', name: 'Field help', apps: ['hs'], source: { hs: 'src/hs/InputFields.tsx' } },
    { id: 'adm-field-help', name: 'Field help', apps: ['adm'], source: { adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx' } },
    { id: 'pfd-field-help', name: 'Field help', apps: ['pfd', 'agpd'], source: { pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' } },
    { id: 'hs-remove', name: 'Remove', apps: ['hs', 'pbs'], source: { hs: 'src/hs/OutputPane.tsx', pbs: 'src/ResultsSection.tsx' } },
  ],
  source: {
    hcs: 'src/components/HcsSplitLayout.tsx',
    hs: 'src/hs/InputFields.tsx',
    pbs: 'src/ResultsSection.tsx',
    adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx',
    pfd: 'src/pfd/fields.tsx',
    agpd: 'src/agpd/inputs.tsx',
  },
  summary: 'A square transparent IconButton, 28px, runs one quiet action: expand a collapsed panel, explain a field, or remove a row.',
  where: 'A collapsed side rail that stands in for a panel (angle-right expands a horizontal one, angle-down a vertical one, HCS); the circle-question after a field label that opens its help (HS and ADM as a tooltip, PFD and AGPD as a popover); and the last cell of a saved-list row (a trash that removes it, HS and PBS). Real site source: HCS and the Button scans of each app. Built from src/components/HcsSplitLayout.tsx and panelSpec.ts (the rail and its sizes).',
  when: 'Use it as the single trigger of a collapsed panel, for an icon-only control beside a label, or for the destructive action of a row (it opens a confirm dialog, Button-001 Delete confirm). The square profile suits a rail; the expanded panel switches to the 20px header controls of Button-031. Always set aria-label, and name a row button with the row id.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" (28px, unlike the 20px contained header icons) on an IconButton, with a Tooltip carrying the aria-label text. The apps that write the circle-question as a Button with a ContainedIcon child at profile "square" get the same 28px box and glyph. The preview shows the radio group of the places and a toggle of the apps where a place has two or more groups. '
    + 'Collapsed rail: HCS only (the trigger is a Panels.Trigger, the kit trigger that renders the IconButton, whose targetId is the panel id, and a real Panels group holds the Input panel at its 40px collapsed size: the rail is a column that fills the panel height with the trigger at the top centre, beside the viewer pane, which is cut to its title (no canvas); the Input panel holds only its title; the vertical rail of the engineering layout (angle-down, trigger at the start corner) is not shown). '
    + 'Field help: HS (a Button at profile "square" with a ContainedIcon circle-question child after the label, opening a Tooltip above it, 4px offset, up to 384px, so it has no close); ADM (the same square Button with a Tooltip above it, 8px offset, painted solid secondary at scale "sm", up to 256px); PFD and AGPD (one group: the same square Button opening a popover, top, 4px offset, a surface card up to 384px; its close is Button-031). Each help scene keeps one labelled field and one sentence of help text. '
    + 'Remove: HS and PBS (one trash IconButton, aui color "secondary", paint "text", scale "sm" and the default square profile, in the last cell of a saved-list row; the aria-label carries the row id, Remove <job> or <connection>; the app opens a confirm dialog from it; the other columns are left out).',
});
