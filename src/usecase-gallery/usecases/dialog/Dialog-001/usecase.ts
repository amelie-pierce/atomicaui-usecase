import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'history-header', name: 'History header', description: 'The bordered strip that puts the Release history heading and the muted "1 version" count on one line.' },
  { id: 'search', name: 'Search field', selector: '[class~="aui-field"]', description: 'The "Search releases" Field with a magnifying-glass icon that filters the version list.' },
  { id: 'version-list', name: 'Version list', selector: '[class~="aui-list"][role="listbox"]', description: 'The "Release history" listbox with one selected row marked by a 4px secondary start border.' },
  { id: 'version', name: 'Version number', description: 'The bold version 1.0.0 of the selected release row.' },
  { id: 'current-chip', name: 'CURRENT chip', selector: '[data-ug-part="history-column"] [class~="aui-chip"]', description: 'The tonal primary CURRENT chip that marks the installed release.' },
  { id: 'notes-header', name: 'App header', description: 'The bordered header above the notes: the app name as an h5 over a muted summary line.' },
  { id: 'release-notes', name: 'Release notes accordion', selector: '[class~="aui-accordion"]', description: 'The accordion of release sections, open on "Global changes (1 update)", whose panel pairs an IMPROVEMENT chip with the change text.' },
];

const PFD_CONTEXT_ANATOMY = [
  { id: 'history-header', name: 'History header', description: 'The bordered strip that puts the Release history heading and the muted "1 version" count on one line.' },
  { id: 'search', name: 'Search field', selector: '[class~="aui-field"]', description: 'The "Search releases" Field with a magnifying-glass icon that filters the version list.' },
  { id: 'version-list', name: 'Version list', selector: '[class~="aui-list"][role="listbox"]', description: 'The "Release history" listbox with one selected row marked by a 4px secondary start border.' },
  { id: 'version', name: 'Version number', description: 'The bold version 1.0.0 of the selected release row.' },
  { id: 'current-chip', name: 'CURRENT chip', selector: '[data-ug-part="history-column"] [class~="aui-chip"]', description: 'The tonal primary CURRENT chip that marks the installed release.' },
  { id: 'notes-header', name: 'App header', description: 'The bordered header above the notes: the app name as an h5 over a muted summary line.' },
  { id: 'key-features', name: 'Key Features list', description: 'The xs List under a muted "Key Features:" label that lists features such as Dynamic UI.' },
  { id: 'toggle-all', name: 'Collapse all button', description: 'The right-aligned xs text button that expands or collapses every release section; shown as Collapse all.' },
  { id: 'release-notes', name: 'Release notes accordion', selector: '[class~="aui-accordion"]', description: 'The accordion of release sections, open on "Global changes (1 update)", whose panel pairs an IMPROVEMENT chip with the change text.' },
];

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'About dialog',
  apps: ['hcs', 'ace', 'adm', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'pfd'],
  options: [
    { id: "hcs-about", name: "About dialog", apps: ["hcs","ace","adm","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/HcsAboutDialog.tsx","ace":"src/features/top-navigation/ui/AboutDialog.tsx","adm":"src/features/top-navigation/components/AboutDialog.tsx","pbs":"src/AboutDialog.tsx","hs":"src/hs/AboutDialog.tsx","fd":"src/components/AboutDialog.jsx","agpd":"src/agpd/AboutDialog.tsx","rws":"src/rws/AboutDialog.tsx"}, contextAnatomy: CONTEXT_ANATOMY },
    { id: "pfd-about", name: "About dialog — UI variant 2", apps: ["pfd"], source: {"pfd":"src/pfd/AboutDialog.tsx"}, contextAnatomy: PFD_CONTEXT_ANATOMY },
  ],
  source: {
    hcs: 'src/components/HcsAboutDialog.tsx',
    ace: 'src/features/top-navigation/ui/AboutDialog.tsx',
    adm: 'src/features/top-navigation/components/AboutDialog.tsx',
    pbs: 'src/AboutDialog.tsx',
    hs: 'src/hs/AboutDialog.tsx',
    fd: 'src/components/AboutDialog.jsx',
    agpd: 'src/agpd/AboutDialog.tsx',
    rws: 'src/rws/AboutDialog.tsx',
    pfd: 'src/pfd/AboutDialog.tsx',
  },
  summary: 'The About dialog of an app: a wide dialog with a raised title bar and a close X, a Release history column beside the notes of the chosen release.',
  where: 'The About item of the top bar menu in nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS; ADC has no About dialog). Real site source: the About dialog of each app (the paths are in source and in each case).',
  when: 'Use it to show what an app is and what changed in each release, with a list of versions to choose from. Do not use it for a short message or a confirm (a plain Dialog, AlertDialog-003), for a list of tutorials (Button-011) or for a long searchable list.',
  how: 'The Dialog.Popup has a zero gap at scale "sm" and is min(860px, viewport minus 28px) wide (the stage width here; the apps also set a 740px height and, below 768px, turn the history into a strip above the notes, left out). The Title is raised and carries the name, the Spacer and the close X (Button-031). The body is one row: a 224px Release history column (a heading and a version count, a search Field with a magnifying-glass icon, a listbox List whose selected row is a solid surface with a 4px secondary start border, version in bold l3 and a tonal primary CURRENT Chip) and a notes column (an app header with an h5 name and a muted p3 summary, then the release notes, an Accordion: Accordion-002). The example is the Dialog frame you copy (Popup, raised Title with the close X, and the two columns); the Accordion of release notes is a supporting part shown in In context. The apps write two UIs: HCS, ACE, ADM, PBS, HS, FD, AGPD and RWS are one group (HCS, ACE, HS, FD, PBS, AGPD and RWS may also show the "Updates for your project" band and the "Updates for other regions" section, left out; the scene is the HCS one); PFD is the other group, with a Key Features list (muted label over an xs List) and a right-aligned xs text button that toggles every section (Collapse all or Expand all) above the notes. The scenes leave out the no-match state, the keyboard handlers and further rows.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim that dims the app behind the About dialog; the dialog is non-modal here so the stage stays visible.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The wide About window at scale "sm", min(860px, 100%) wide with a zero gap so the title bar and the two body columns sit flush.',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar that names the window "About" and carries the spacer and the close X at its end.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[data-ug-part="title-text"]',
      text: true,
      description: 'The word "About", the only text the title bar holds.',
    },
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The flexible gap that pushes the close X to the far end of the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that dismisses the About dialog, labelled "Close About" for assistive technology.',
    },
    {
      id: 'body',
      name: 'Body row',
      description: 'The one-row body under the title bar that splits the window into the Release history column and the release notes column; it hides overflow so each column manages its own height.',
    },
    {
      id: 'history-column',
      name: 'Release history column',
      description: 'The 224px start column with an end border that holds the Release history heading; in the HCS and PFD scenes it also holds the version count, the search field and the version list.',
    },
    {
      id: 'history-heading',
      name: 'Release history heading',
      text: true,
      description: 'The bold l4 "Release history" label that names the version list.',
    },
    {
      id: 'notes-column',
      name: 'Notes column',
      description: 'The flexible column that fills the rest of the width and shows the notes of the chosen release; the example holds only the "Release notes" placeholder.',
    },
    {
      id: 'notes-text',
      name: 'Notes text',
      text: true,
      description: 'The p3 "Release notes" placeholder line that stands in for the notes in the Dialog frame.',
    },
  ],
  layers: [
    { id: 'overlay', title: 'Overlay', selector: '[class~="aui-dialog-backdrop"]', explanation: 'The scrim dims the app behind the About dialog while leaving the stage visible.', keyIdea: 'Separate the dialog from the app beneath it before adding the dialog surface.' },
    { id: 'popup', title: 'Popup container', selector: '[class~="aui-dialog-popup"]', explanation: 'The wide popup defines the surface and zero-gap frame that contains the title and body.', keyIdea: 'Give the content one bounded surface so the dialog reads as a single unit.' },
    { id: 'title', title: 'Title bar', selector: '[class~="aui-dialog-title"]', explanation: 'The raised title bar sits at the start of the popup and carries the dialog label.', keyIdea: 'Identify the purpose of the dialog before users scan its details.' },
    { id: 'title-text', title: 'Title text', selector: '[data-ug-part="title-text"]', explanation: 'The word “About” names the window.', keyIdea: 'Use a short title that tells users what this surface contains.' },
    { id: 'spacer', title: 'Flexible spacer', selector: '[class~="aui-dialog-spacer"]', explanation: 'The spacer pushes the close control to the far edge of the title bar.', keyIdea: 'Use flexible space to keep the title and close action at opposite ends.' },
    { id: 'close', title: 'Close control', selector: '[class~="aui-dialog-close"]', explanation: 'The labelled close X dismisses the About dialog.', keyIdea: 'Keep a clear exit action available in the dialog header.' },
    { id: 'body', title: 'Body row', selector: '[data-ug-part="body"]', explanation: 'The body starts a two-column layout beneath the title bar.', keyIdea: 'Separate the dialog shell from the task-specific information.' },
    { id: 'history-column', title: 'Release history column', selector: '[data-ug-part="history-column"]', explanation: 'The 224px start column holds the release heading and version navigation.', keyIdea: 'Keep version selection in a dedicated, predictable rail.' },
    { id: 'history-heading', title: 'Release history heading', selector: '[data-ug-part="history-heading"]', explanation: 'The bold heading labels the version list.', keyIdea: 'Name a navigation group before presenting its choices.' },
    { id: 'notes-column', title: 'Notes column', selector: '[data-ug-part="notes-column"]', explanation: 'The flexible column shows the selected release notes.', keyIdea: 'Let the main content use the remaining space after navigation.' },
    { id: 'notes-text', title: 'Notes content', selector: '[data-ug-part="notes-text"]', explanation: 'The placeholder line represents the notes for the selected release.', keyIdea: 'Keep the selected item’s details in the content area it controls.' },
    { id: 'footer', title: 'Footer actions', selector: '[data-ug-part="footer"]', explanation: 'The footer holds the Close action button beneath the body, so the way to finish the dialog sits last.', keyIdea: 'Place the dialog’s actions after its content so users decide once they have read it.' },
  ],
});
