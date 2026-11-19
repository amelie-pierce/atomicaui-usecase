import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'IconButton',
  area: 'Panel',
  title: '(to merge)',
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'Transparent contained IconButtons in a panel header collapse, expand, configure and explain the panel.',
  where: 'Panel headers: angle-left collapses the panel, arrows-to-line and arrows-from-line collapse and expand all rows, table-columns configures columns, circle-question opens help. Real site source: HCS Button-011 and Button-013 (help). Built from the Input pane in src/App.tsx (header and sections) and panelSpec.ts.',
  when: 'Use it for an icon-only control in panel chrome. The contained profile is the header standard. Always set aria-label.',
  how: 'Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained". Wrap it in a Tooltip with the same text as the aria-label, as the app does for every icon-only button. In context it is Collapse all at the end of the Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer, above two accordion sections (both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line). The section contents and the Galvanized card are left out. IconButton is a kit part and needs the Font Awesome font to show its glyph.',
});
