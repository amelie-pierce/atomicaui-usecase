import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'output-pane', name: 'Output pane', selector: '[data-ug-part="output-pane"]', description: 'The surface-alt Output section that frames the header row.' },
  { id: 'output-title', name: 'Output title', selector: '[data-ug-part="output-title"]', description: 'The semi-bold Output heading at the start of the header row.' },
  { id: 'header-actions', name: 'Header actions', selector: '[data-ug-part="header-actions"]', description: 'The end-aligned group with the two scroll helpers followed by the tonal Print Output button, wrapping when space runs out.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Back to top and Table Notes buttons',

  apps: ['hcs', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "hcs-output-header", contextAnatomy: CONTEXT_ANATOMY, name: "Output header", apps: ["hcs","pfd","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/useOutputNavigation.tsx","pfd":"src/pfd/useOutputNavigation.tsx","pbs":"src/useOutputNavigation.tsx","hs":"src/hs/useOutputNavigation.tsx","fd":"src/components/useOutputNavigation.jsx","agpd":"src/agpd/outputNavigation.tsx","rws":"src/rws/outputNavigation.tsx"} },
  ],
  source: { hcs: 'src/useOutputNavigation.tsx', pfd: 'src/pfd/useOutputNavigation.tsx', pbs: 'src/useOutputNavigation.tsx', hs: 'src/hs/useOutputNavigation.tsx', fd: 'src/components/useOutputNavigation.jsx', agpd: 'src/agpd/outputNavigation.tsx', rws: 'src/rws/outputNavigation.tsx' },
  summary: 'Two quiet text Buttons with a leading icon sit together in a header: an arrow jumps to the top of a long table and another down to its notes.',
  where: 'The first two items of the Output pane header action group, shown only while the pane is scrolled (they do not float over the table). '
    + 'Real site source: HCS (Back to top, Table Notes), built from src/useOutputNavigation.tsx (thresholds, labels) and the Output pane header in src/App.tsx; PFD, PBS, HS, FD, AGPD and RWS write the same pair in their own useOutputNavigation / outputNavigation file and place it first in their Output header action group (PFD: the only items of its plain header; the others: the start of the action group at the end of their header). '
    + 'ACE, ADM and ADC have no scroll helpers. The lone Download CSV Button of the table toolbar is the Single button Button-002.',
  when: 'Use it for in-page jumps in a long scrolling view, showing each one only when it applies with an aria-label that names the target.',
  how: 'Set aui color "secondary", paint "text" and scale "sm" (profile "default") on both Buttons, each with a Button.Icon before the label: arrow-up for Back to top and arrow-down for Table Notes. '
    + 'HCS, PFD, PBS, HS, FD, AGPD and RWS write the same Buttons. '
    + 'They are the first two items of the Output header action group, shown as they are once the results are scrolled: the apps reveal Back to top after 80px of scroll (hides below 20px) and Table Notes while the notes heading is below the pane, and all seven turn both into square icon Buttons with a Tooltip carrying the same label when the labels do not fit the header row (this scene shows the labelled state). '
    + 'The Print Output Button after them in the scene is HCS\'s neighbour (PFD, PBS, AGPD and RWS print from the menubar, and HS and FD put Configure columns (HS also Fullscreen) between them and Print); Configure columns and the table are left out.',
  anatomy: [
    { id: 'back-to-top', name: 'Back to top', selector: '[class~="aui-button"][aria-label="Back to top"]', description: 'Secondary text button that scrolls to the top of the long table; its accessible name matches the visible label.' },
    { id: 'back-icon', name: 'Arrow-up icon', selector: '[class~="aui-button"][aria-label="Back to top"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrow-up glyph that shows the direction of the jump.' },
    { id: 'table-notes', name: 'Table Notes', selector: '[class~="aui-button"][aria-label="Jump to table notes"]', description: 'Secondary text button that jumps down to the table notes; its accessible name "Jump to table notes" is longer than the visible Table Notes label.' },
    { id: 'notes-icon', name: 'Arrow-down icon', selector: '[class~="aui-button"][aria-label="Jump to table notes"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrow-down glyph that points toward the notes below the table.' },
    { id: 'print', name: 'Print Output', selector: '[class~="aui-button"]:not([aria-label])', description: 'HCS Output header only: the tonal surface Print Output button with a print icon that sits right after the two jump buttons.' },
  ],
});
