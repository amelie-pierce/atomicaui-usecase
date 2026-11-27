import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'table', name: 'Output table', selector: '[class~="aui-table"]', description: 'The table labelled "Output" that stands for the Output tabs; the popup places it straight at the edge.' },
  { id: 'header-cell', name: 'Column heading', selector: '[class~="aui-table-header-cell"]', description: 'The single "Load" column heading.' },
  { id: 'cell', name: 'Value cell', selector: '[class~="aui-table-cell"]', description: 'The "Dead" value cell of the one row.' },
];

export default defineUsecase({
  uiType: 'Dialog without title',
  title: 'Content-only expanded dialog',
  apps: ['hs'],
options: [
    { id: "hs-expanded-output", name: "Expanded output", source: {"hs":"src/hs/OutputTabs.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
     contextAnatomyOverrides: [{"id":"table","lesson":{"explanation":"Output table fills the square popup where output tabs would appear.","scope":"context"}},{"id":"header-cell","lesson":{"explanation":"Single Load column heading anchors the result values.","scope":"context"}},{"id":"cell","lesson":{"explanation":"The \"Dead\" value cell of the one row.","scope":"context"}}]},
  ],
  source: { hs: 'src/hs/OutputTabs.tsx' },
  summary: 'A dialog with no title and no close X: the popup is square, has no padding and fills the screen, and holds content that brings its own controls.',
  where: 'HS Output panel (src/hs/OutputTabs.tsx): the expand control of the Output pane moves the same tabs and table into a full-screen dialog, and the toolbar inside the content collapses it.',
  when: 'Use it to enlarge a panel the user is already working in to the whole screen, where the content keeps its own toolbar with the way back. If the dialog needs its own name or close X, use one with a title bar (Dialog-001, Dialog-005).',
  how: 'A Dialog.Popup with aria-label (it has no Title to name it) and aui shape "none", profile "no-padding" and sx width "fill", height "fill" and gap "0", holding the content directly: there is no Dialog.Title, Dialog.Close or Dialog.Body. A different structure from Dialog-005, which also fills the screen but has a raised Title with a close X and a padded Body (measured: Dialog-005 has a 28px title bar, this one starts with its content at the popup edge). HS renders the content in place while the dialog is closed and inside the popup while open, so the same panel is reused. In the scene a toolbar line and one table row stand for the Output tabs; the stage caps the popup, the app uses the whole viewport.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the expanded HS Output view.',
     lesson: {"explanation":"The scrim behind the expanded HS Output view."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The square, no-padding popup that fills the screen with a zero gap; with no Title it is named by aria-label "Expanded Output".',
     lesson: {"explanation":"No-padding square popup fills the screen and is named Expanded Output."}},
    {
      id: 'content-text',
      name: 'Content text',
      text: true,
      description: 'The p3 line that stands for the content and its own toolbar (the scene reads "Output toolbar").',
    },
  ],
});
