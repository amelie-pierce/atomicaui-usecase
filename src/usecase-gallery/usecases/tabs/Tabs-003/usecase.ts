import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Segmented tabs',
  title: 'Tabs with status icon',
  apps: ['hcs', 'fd'],
options: [
    { id: "hcs-check-tabs", name: "Check result tabs", showContext: false, apps: ["hcs"], source: {"hcs":"src/components/F01Results.tsx"} ,
    },
    { id: "fd-check-tabs", name: "Circle outcome icons", showContext: false, apps: ["fd"], source: {"fd":"src/components/RowExpansion.jsx"} ,
    },
  ],
  source: { hcs: 'src/components/F01Results.tsx', fd: 'src/components/RowExpansion.jsx' },
  summary: 'Tabs that each lead with a pass or fail icon, so the tab strip is also the summary of which checks passed.',
  where: 'Under the title of a result card: HCS lists one tab per check of a product in its Output results (Connection and each design check); FD lists one tab per check category in an expanded Output row. The Output pane tabs are Tabs-001.',
  when: 'Use it when each tab is one check or test with an outcome the user should read before opening it: the icon shows pass or fail and the panel shows the detail. Use plain Tabs (Tabs-001) when the tabs are views with no outcome.',
  how: 'The example is HCS: Tabs, Tabs.List and Tabs.Tab with aui scale "sm", a Tabs.Icon at the start of each Tab (check with color "success" when passed, xmark with color "error" when failed, scale "sm") and a Tabs.Panel per check, with sx gap "12" on the root. scale "sm" computes the same as the default (28px chips, 16px/400, 8px padding, measured), so the other apps leave it off. The In context scene is the strip only. '
    + 'HCS: Tabs.Icon glyphs check and xmark (17.5x14 glyphs, rgb(22, 163, 74) and rgb(231, 80, 76) measured). FD: a plain Icon child instead of Tabs.Icon with the circle-check and circle-exclamation glyphs (20x16, the same two colours once "error" is used), a List with gap "0" and no scale props; the glyph set differs, so it is its own group. FD colours the failed icon "danger", which is not a kit colour, so the app renders it in the text colour, rgb(18, 18, 18); that is an app-side defect against the red "error" of HCS and the scene uses "error". Left out of the scenes: the card title, the other checks, the panels and every selected-tab change.',
  anatomy: [
    {
      id: 'tabs',
      name: 'Tabs',
      selector: '[class~="aui-tabs"]',
      description: 'Check tabs at scale "sm" with a 12px gap between the strip and the panel; Connection is selected first.',
     lesson: {"explanation":"Small check tabs leave a 12px gap above the panel."}},
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-tabs-list"]',
      description: 'Strip of check tabs; reading the icons down the row summarises which checks passed.',
     lesson: {"explanation":"Icon strip quickly summarizes which checks passed or failed."}},
    {
      id: 'tab',
      name: 'Tab',
      selector: '[class~="aui-tabs-tab"]',
      description: 'One check, Connection or Weld, with its status icon before the label.',
     lesson: {"explanation":"One check, Connection or Weld, with its status icon before the label."}},
    {
      id: 'icon',
      name: 'Status icon',
      selector: '[class~="aui-tabs-tab"] > [class~="aui-contained-icon"]',
      description: 'Leading result icon: a success check for Connection and an error xmark for Weld; FD uses circle-check and circle-exclamation through a plain Icon.',
     lesson: {"explanation":"Leading icon marks Connection success or Weld failure across app variants.","code":["Tabs.Icon","Icon"]}},
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-tabs-panel"]',
      description: 'Body for the selected check, "Connection check" or "Weld check".',
     lesson: {"explanation":"Body for the selected check, \"Connection check\" or \"Weld check\"."}},
  ],
});
