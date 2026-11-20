import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Show column info button',
  look: 'Ghost, 20px',
  apps: ['fd'],
  cases: [
    { id: 'fd-header-info', name: 'Header info', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } },
  ],
  source: { fd: 'src/components/ui.jsx' },
  summary: 'A transparent icon-only button with a circle-info opens an explanation popover from a table column header.',
  where: 'A table column header cell. Real site source: FD src/components/Results.jsx (FastenerPatternInfo). No other app has this control.',
  when: 'Use it to explain one column without adding permanent text; stop its click so it does not sort the column. Always set aria-label.',
  how: 'FD writes a Button (color "secondary", paint "text", scale "xs", shape "soft") with a circle-info Button.Icon, which opens a popover below it; the scene writes that Button, the example shows the IconButton form. '
    + 'The scene keeps one header cell and the first line of the popover. One group, FD only.',
});
