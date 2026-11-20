import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Collapse all sections button',
  look: 'Ghost, 20px',
  apps: ['hcs'],
  cases: [
    { id: 'hcs-panel-header', name: 'Panel header', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A transparent icon-only IconButton collapses every section of the Input pane, and expands them again when all are closed.',
  where: 'The end of the HCS Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer. Real site source: HCS src/App.tsx. No other app has this control.',
  when: 'Use it for panel chrome that acts on every section at once; wrap it in a Tooltip with the same text as the aria-label.',
  how: 'An IconButton with aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained" inside a Tooltip with the same text as the aria-label, as the app does for every icon-only button. '
    + 'In context it sits above two accordion sections, both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line. '
    + 'The section contents and the Galvanized card are left out. One group, HCS only.',
});
