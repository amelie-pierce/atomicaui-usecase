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
    { id: "hcs-about", name: "About dialog", apps: ["hcs","ace","adm","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/HcsAboutDialog.tsx","ace":"src/features/top-navigation/ui/AboutDialog.tsx","adm":"src/features/top-navigation/components/AboutDialog.tsx","pbs":"src/AboutDialog.tsx","hs":"src/hs/AboutDialog.tsx","fd":"src/components/AboutDialog.jsx","agpd":"src/agpd/AboutDialog.tsx","rws":"src/rws/AboutDialog.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
     contextAnatomyOverrides: [{"id":"history-header","lesson":{"explanation":"Bordered header pairs Release history title with a muted version count.","selector":"[data-ug-part=\"history-header\"]","scope":"context"}},{"id":"search","lesson":{"explanation":"Search releases field filters versions with a magnifier icon.","scope":"context"}},{"id":"version-list","lesson":{"explanation":"Release history listbox selects one row with a 4px start border.","scope":"context"}},{"id":"version","lesson":{"explanation":"The bold version 1.0.0 of the selected release row.","selector":"[data-ug-part=\"version\"]","scope":"context"}},{"id":"current-chip","lesson":{"explanation":"The tonal primary CURRENT chip that marks the installed release.","scope":"context"}},{"id":"notes-header","lesson":{"explanation":"Bordered notes header stacks the app name over its summary.","selector":"[data-ug-part=\"notes-header\"]","scope":"context"}},{"id":"release-notes","lesson":{"explanation":"Open Global changes accordion pairs IMPROVEMENT chip with change details.","scope":"context"}}]},
    { id: "pfd-about", name: "About history pane", apps: ["pfd"], source: {"pfd":"src/pfd/AboutDialog.tsx"}, contextAnatomy: PFD_CONTEXT_ANATOMY ,
     contextAnatomyOverrides: [{"id":"history-header","lesson":{"explanation":"Bordered header pairs Release history title with a muted version count.","selector":"[data-ug-part=\"history-header\"]","scope":"context"}},{"id":"search","lesson":{"explanation":"Search releases field filters versions with a magnifier icon.","scope":"context"}},{"id":"version-list","lesson":{"explanation":"Release history listbox selects one row with a 4px start border.","scope":"context"}},{"id":"version","lesson":{"explanation":"The bold version 1.0.0 of the selected release row.","selector":"[data-ug-part=\"version\"]","scope":"context"}},{"id":"current-chip","lesson":{"explanation":"The tonal primary CURRENT chip that marks the installed release.","scope":"context"}},{"id":"notes-header","lesson":{"explanation":"Bordered notes header stacks the app name over its summary.","selector":"[data-ug-part=\"notes-header\"]","scope":"context"}},{"id":"key-features","lesson":{"explanation":"Extra-small list places features such as Dynamic UI under its label.","selector":"[data-ug-part=\"key-features\"]","scope":"context"}},{"id":"toggle-all","lesson":{"explanation":"Right-aligned Collapse all button expands or closes release sections.","selector":"[data-ug-part=\"toggle-all\"]","scope":"context"}},{"id":"release-notes","lesson":{"explanation":"Open Global changes accordion pairs IMPROVEMENT chip with change details.","scope":"context"}}]},
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
     lesson: {"explanation":"Scrim dims the app behind About while the stage stays visible."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The wide About window at scale "sm", min(860px, 100%) wide with a zero gap so the title bar and the two body columns sit flush.',
     lesson: {"title":"Popup container","explanation":"Wide popup frames the title and body with zero gap."}},
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar that names the window "About" and carries the spacer and the close X at its end.',
     lesson: {"explanation":"Raised title bar tops the popup and carries its label."}},
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[data-ug-part="title-text"]',
      text: true,
      description: 'The word "About", the only text the title bar holds.',
     lesson: {"explanation":"The word “About” names this dialog window for users."}},
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The flexible gap that pushes the close X to the far end of the title bar.',
     lesson: {"title":"Flexible spacer","explanation":"Flexible spacer pushes Close to the far title bar edge."}},
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that dismisses the About dialog, labelled "Close About" for assistive technology.',
     lesson: {"title":"Close control","explanation":"The labelled close X dismisses the About dialog."}},
    {
      id: 'body',
      name: 'Body row',
      description: 'The one-row body under the title bar that splits the window into the Release history column and the release notes column; it hides overflow so each column manages its own height.',
     lesson: {"explanation":"The body starts a two-column layout beneath the title bar.","selector":"[data-ug-part=\"body\"]"}},
    {
      id: 'history-column',
      name: 'Release history column',
      description: 'The 224px start column with an end border that holds the Release history heading; in the HCS and PFD scenes it also holds the version count, the search field and the version list.',
     lesson: {"explanation":"The 224px start column holds the release heading and version navigation.","selector":"[data-ug-part=\"history-column\"]"}},
    {
      id: 'history-heading',
      name: 'Release history heading',
      text: true,
      description: 'The bold l4 "Release history" label that names the version list.',
     lesson: {"explanation":"Bold Release history heading labels the version list below.","selector":"[data-ug-part=\"history-heading\"]"}},
    {
      id: 'notes-column',
      name: 'Notes column',
      description: 'The flexible column that fills the rest of the width and shows the notes of the chosen release; the example holds only the "Release notes" placeholder.',
     lesson: {"explanation":"The flexible column shows the selected release notes.","selector":"[data-ug-part=\"notes-column\"]"}},
    {
      id: 'notes-text',
      name: 'Notes text',
      text: true,
      description: 'The p3 "Release notes" placeholder line that stands in for the notes in the Dialog frame.',
     lesson: {"title":"Notes content","explanation":"The placeholder line represents the notes for the selected release.","selector":"[data-ug-part=\"notes-text\"]"}},
    {"id":"footer","name":"Footer actions","description":"Footer holds the Close action last, beneath the dialog body.","selector":"[data-ug-part=\"footer\"]","lesson":{"explanation":"Footer holds the Close action last, beneath the dialog body."}},
    {"id":"footer-close","name":"Close action","description":"Secondary Close button ends the footer and dismisses About.","selector":"[data-ug-part=\"footer-close\"]","lesson":{"explanation":"Secondary Close button ends the footer and dismisses About."}},
  ],
});
