import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'About dialog',
  apps: ['hcs', 'ace', 'adm', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'pfd'],
  cases: [
    {
      id: 'hcs-about',
      name: 'About dialog',
      apps: ['hcs', 'ace', 'adm', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: {
        hcs: 'src/components/HcsAboutDialog.tsx',
        ace: 'src/features/top-navigation/ui/AboutDialog.tsx',
        adm: 'src/features/top-navigation/components/AboutDialog.tsx',
        pbs: 'src/AboutDialog.tsx',
        hs: 'src/hs/AboutDialog.tsx',
        fd: 'src/components/AboutDialog.jsx',
        agpd: 'src/agpd/AboutDialog.tsx',
        rws: 'src/rws/AboutDialog.tsx',
      },
    },
    {
      id: 'pfd-about',
      name: 'About dialog',
      apps: ['pfd'],
      source: { pfd: 'src/pfd/AboutDialog.tsx' },
    },
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
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim that dims the app behind the About dialog; the dialog is non-modal here so the stage stays visible.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The wide About window at scale "sm", min(860px, 100%) wide with a zero gap so the title bar and the two body columns sit flush.',
      code: `<Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar that names the window "About" and carries the spacer and the close X at its end.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  About
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close About" />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The word "About", the only text the title bar holds.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  About`,
    },
    {
      id: 'spacer',
      name: 'Spacer',
      token: 'Dialog.Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The flexible gap that pushes the close X to the far end of the title bar.',
      code: `<Dialog.Spacer />`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that dismisses the About dialog, labelled "Close About" for assistive technology.',
      code: `<Dialog.Close aria-label="Close About" />`,
    },
    {
      id: 'body',
      name: 'Body row',
      token: 'View',
      description: 'The one-row body under the title bar that splits the window into the Release history column and the release notes column; it hides overflow so each column manages its own height.',
      code: `<View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>`,
    },
    {
      id: 'history-column',
      name: 'Release history column',
      token: 'View',
      description: 'The 224px start column with an end border that holds the Release history heading; in the HCS and PFD scenes it also holds the version count, the search field and the version list.',
      code: `<View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '224', flex: 'none', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>`,
    },
    {
      id: 'history-heading',
      name: 'Release history heading',
      token: 'Type',
      text: true,
      description: 'The bold l4 "Release history" label that names the version list.',
      code: `<Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
  Release history
</Type>`,
    },
    {
      id: 'history-header',
      name: 'History header',
      token: 'View',
      description: 'The bordered strip in the In context scenes that puts the Release history heading and the muted "1 version" count on one line.',
      code: `<View data-ug-part="history-header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>`,
    },
    {
      id: 'search',
      name: 'Search field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'The "Search releases" field with a magnifying-glass icon that filters the version list.',
      code: `<Field aui={{ scale: 'sm' }}>
  <Field.Control>
    <Field.Icon name="magnifying-glass" />
    <Field.Input type="search" placeholder="Search releases" aria-label="Search releases" />
  </Field.Control>
</Field>`,
    },
    {
      id: 'version-list',
      name: 'Version list',
      token: 'List',
      selector: '[class~="aui-list"][role="listbox"]',
      description: 'The "Release history" listbox with one option; the selected row is a solid surface with a 4px secondary start border.',
      code: `<List role="listbox" aria-label="Release history" aui={{ scale: 'sm', paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column' } }}>`,
    },
    {
      id: 'version',
      name: 'Version number',
      token: 'Type',
      text: true,
      description: 'The bold l3 version "1.0.0" of the selected release row.',
      code: `<Type data-ug-part="version" as="strong" role="l3" weight="bold">
  1.0.0
</Type>`,
    },
    {
      id: 'current-chip',
      name: 'CURRENT chip',
      token: 'Chip',
      selector: '[data-ug-part="history-column"] [class~="aui-chip"]',
      description: 'The tonal primary CURRENT chip that marks the installed release next to its version.',
      code: `<Chip aui={{ scale: 'sm', color: 'primary', paint: 'tonal' }}>
  <Chip.Label>CURRENT</Chip.Label>
</Chip>`,
    },
    {
      id: 'notes-column',
      name: 'Notes column',
      token: 'View',
      description: 'The flexible column that fills the rest of the width and shows the notes of the chosen release; the example holds only the "Release notes" placeholder.',
      code: `<View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { flex: 'fill', minWidth: '0' } }}>`,
    },
    {
      id: 'notes-text',
      name: 'Notes text',
      token: 'Type',
      text: true,
      description: 'The p3 "Release notes" placeholder line that stands in for the notes in the Dialog frame.',
      code: `<Type data-ug-part="notes-text" as="p" role="p3">
  Release notes
</Type>`,
    },
    {
      id: 'notes-header',
      name: 'App header',
      token: 'View',
      description: 'The bordered header above the notes that shows the app name as an h5 (Hinge Connector Selector for HCS, Post-to-Foundation Designer for PFD) over a muted p3 summary.',
      code: `<View data-ug-part="notes-header" as="header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'none', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>`,
    },
    {
      id: 'key-features',
      name: 'Key Features list',
      token: 'List',
      description: 'The PFD-only xs List under a muted "Key Features:" label that lists features such as Dynamic UI.',
      code: `<List data-ug-part="key-features" aui={{ paint: 'text', profile: 'no-padding', scale: 'xs' }}>`,
    },
    {
      id: 'toggle-all',
      name: 'Collapse all button',
      token: 'Button',
      description: 'The PFD-only right-aligned xs text button that expands or collapses every release section; the scene shows its Collapse all state.',
      code: `<Button data-ug-part="toggle-all" aui={{ paint: 'text', scale: 'xs' }}>Collapse all</Button>`,
    },
    {
      id: 'release-notes',
      name: 'Release notes accordion',
      token: 'Accordion',
      selector: '[class~="aui-accordion"]',
      description: 'The accordion of release sections, open on "Global changes (1 update)", whose panel pairs an IMPROVEMENT chip with the change text.',
      code: `<Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
  <Accordion.Item value="global">
    <Accordion.Header>
      <Accordion.Trigger>`,
    },
  ],
});
