import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Results',
  title: 'Check result tabs',
  apps: ['hcs', 'fd'],
  cases: [
    { id: 'hcs-check-tabs', name: 'Check result tabs', apps: ['hcs'], source: { hcs: 'src/components/F01Results.tsx' } },
    { id: 'fd-check-tabs', name: 'Check result tabs', apps: ['fd'], source: { fd: 'src/components/RowExpansion.jsx' } },
  ],
  source: { hcs: 'src/components/F01Results.tsx', fd: 'src/components/RowExpansion.jsx' },
  summary: 'Tabs that each lead with a pass or fail icon, so the tab strip is also the summary of which checks passed.',
  where: 'Under the title of a result card: HCS lists one tab per check of a product in its Output results (Connection and each design check); FD lists one tab per check category in an expanded Output row. The Output pane tabs are Tabs-001.',
  when: 'Use it when each tab is one check or test with an outcome the user should read before opening it: the icon shows pass or fail and the panel shows the detail. Use plain Tabs (Tabs-001) when the tabs are views with no outcome.',
  how: 'The example is HCS: Tabs, Tabs.List and Tabs.Tab with aui scale "sm", a Tabs.Icon at the start of each Tab (check with color "success" when passed, xmark with color "error" when failed, scale "sm") and a Tabs.Panel per check, with sx gap "12" on the root. scale "sm" computes the same as the default (28px chips, 16px/400, 8px padding, measured), so the other apps leave it off. The Component tab shows the Tabs; the scene is the strip only. '
    + 'HCS: Tabs.Icon glyphs check and xmark (17.5x14 glyphs, rgb(22, 163, 74) and rgb(231, 80, 76) measured). FD: a plain Icon child instead of Tabs.Icon with the circle-check and circle-exclamation glyphs (20x16, the same two colours once "error" is used), a List with gap "0" and no scale props; the glyph set differs, so it is its own group. FD colours the failed icon "danger", which is not a kit colour, so the app renders it in the text colour, rgb(18, 18, 18); that is an app-side defect against the red "error" of HCS and the scene uses "error". Left out of the scenes: the card title, the other checks, the panels and every selected-tab change.',
});
