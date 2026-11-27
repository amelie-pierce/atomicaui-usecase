import { defineUsecase } from '../../../define';

const ABOUT_CONTEXT = [
  { id: "about-dialog", name: "About dialog", selector: "[class~=\"aui-dialog-popup\"]", description: "The Dialog popup titled About that hosts the release notes." },
  { id: "about-title", name: "About title bar", selector: "[class~=\"aui-dialog-title\"]", description: "The raised Dialog.Title reading \"About\", with the Close About button at its end." },
  { id: "about-close", name: "Close button", selector: "[class~=\"aui-dialog-close\"]", description: "The X Dialog.Close (aria-label \"Close About\") that dismisses the dialog." },
  { id: "about-body", name: "Release notes body", description: "The padded View under the title bar that holds the release notes Accordion (the Release history column and app header are left out)." },
];

const ADC_ABOUT_CONTEXT = [
  { id: "about-dialog", name: "About dialog", selector: "[class~=\"aui-dialog-popup\"]", description: "The Dialog popup titled About that hosts the release notes." },
  { id: "about-title", name: "About title bar", selector: "[class~=\"aui-dialog-title\"]", description: "The raised Dialog.Title reading \"About\", with the Close About button at its end." },
  { id: "about-close", name: "Close button", selector: "[class~=\"aui-dialog-close\"]", description: "The X Dialog.Close (aria-label \"Close About\") that dismisses the dialog." },
  { id: "about-body", name: "Dialog body", selector: "[class~=\"aui-dialog-body\"]", description: "The Dialog.Body under the title bar that holds the release Accordion (the app description and Close footer are left out)." },
];

export default defineUsecase({
  uiType: 'Titled accordion',
  title: 'Title with badge and count',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
options: [
    { id: "hcs-release-notes", contextAnatomy: ABOUT_CONTEXT, name: "Release notes", apps: ["hcs","ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"hcs":"src/components/HcsAboutDialog.tsx","ace":"src/features/top-navigation/ui/AboutDialog.tsx","adm":"src/features/top-navigation/components/AboutDialog.tsx","pfd":"src/pfd/AboutDialog.tsx","pbs":"src/AboutDialog.tsx","hs":"src/hs/AboutDialog.tsx","fd":"src/components/AboutDialog.jsx","agpd":"src/agpd/AboutDialog.tsx","rws":"src/rws/AboutDialog.tsx"} ,
     contextAnatomyOverrides: [{"id":"about-dialog","lesson":{"explanation":"About popup holds release notes beside version navigation.","scope":"context"}},{"id":"about-title","lesson":{"explanation":"Raised About title keeps the Close button at its end.","scope":"context"}},{"id":"about-close","lesson":{"explanation":"Close About dismisses the dialog without changing the selected version.","scope":"context"}},{"id":"about-body","lesson":{"explanation":"Padded body holds release notes below the About title bar.","selector":"[data-ug-part=\"about-body\"]","scope":"context"}}]},
    { id: "adc-release-notes", contextAnatomy: ADC_ABOUT_CONTEXT, name: "Dialog release notes", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} ,
     contextAnatomyOverrides: [{"id":"about-dialog","lesson":{"explanation":"About popup frames one release entry in the application shell.","scope":"context"}},{"id":"about-title","lesson":{"explanation":"ADC title bar names the release dialog before version details.","scope":"context"}},{"id":"about-close","lesson":{"explanation":"Close About gives ADC readers a direct exit from release details.","scope":"context"}},{"id":"about-body","lesson":{"explanation":"Dialog body holds the release Accordion beneath the About heading.","scope":"context"}}]},
    { id: "ace-other-regions", contextAnatomy: ABOUT_CONTEXT, name: "Other regions", apps: ["ace","hs","fd"], source: {"ace":"src/features/top-navigation/ui/AboutDialog.tsx","hs":"src/hs/AboutDialog.tsx","fd":"src/components/AboutDialog.jsx"} ,
     contextAnatomyOverrides: [{"id":"about-dialog","lesson":{"explanation":"About popup groups regional notes inside the app workspace.","scope":"context"}},{"id":"about-title","lesson":{"explanation":"Raised About header separates regional notes from the application.","scope":"context"}},{"id":"about-close","lesson":{"explanation":"Close About dismisses the dialog that holds the regional notes.","scope":"context"}},{"id":"about-body","lesson":{"explanation":"Padded body keeps regional update groups below the title bar.","selector":"[data-ug-part=\"about-body\"]","scope":"context"}}]},
  ],
  source: {
    hcs: 'src/components/HcsAboutDialog.tsx',
    ace: 'src/features/top-navigation/ui/AboutDialog.tsx',
    adm: 'src/features/top-navigation/components/AboutDialog.tsx',
    pfd: 'src/pfd/AboutDialog.tsx',
    pbs: 'src/AboutDialog.tsx',
    hs: 'src/hs/AboutDialog.tsx',
    fd: 'src/components/AboutDialog.jsx',
    agpd: 'src/agpd/AboutDialog.tsx',
    rws: 'src/rws/AboutDialog.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'The release notes of an About dialog as collapsible sections: each a title with a count, opening onto the list of changes with one coloured Chip each.',
  where: 'The About dialog of all ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC): the notes of the chosen release sit in an Accordion whose first section is Global changes. ACE, HS and FD add Updates for other regions with a nested Accordion, one section per region. Real site source: the About dialog of each app (the paths are in source). The dialog shell and the release history column are Dialog-001.',
  when: 'Use it for a short list of grouped notes the reader opens one by one, in a dialog or panel. Do not use it for input sections (Accordion-001) or for a pick-one list in groups (Accordion-003).',
  how: 'An Accordion at scale "sm" (openMultiple, the Global changes section open by default) of plain Accordion.Items. Accordion.Trigger holds one span with the label as Type span role "l3" weight "semi-bold", a space, and the count in parentheses as Type span role "l5" color "muted", then Accordion.Chevron. Accordion.Panel holds the change rows: a flex row with gap 12 and 8px block padding, a 160px column with a solid Chip (success for a feature, warning for an improvement) and the text as Type p3. The example is that Accordion; In context sets it in the About dialog Body. The apps write two UIs, measured in the gallery: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS are one group (trigger 28px, label 16px weight 600 with a 14px muted count; PFD wraps the label in a View span and adds a Collapse all button above, FD writes one Accordion per section, neither changes the render); ADC is the other, with a surface item and trigger (shape "none"), the version line as one Type l4 semi-bold (14px) with no count, and a warning surface label beside the change text. The Other regions type (ACE, HS, FD) puts a second Accordion inside the panel of the Updates for other regions item, its items written like the outer ones. The scenes leave out the Release history column, the app header, the project updates band, further sections and releases, the Close footer and the narrow layout.',
  anatomy: [
    {
      id: 'accordion',
      name: 'Accordion',
      selector: '[class~="aui-accordion"]',
      description: 'Release-notes list at scale "sm" with openMultiple and "global" open by default; the ACE scene nests a second Accordion (Europe) inside Updates for other regions, and ADC uses one 1.0 release item.',
     lesson: {"explanation":"Release notes open Global changes first and allow other groups."}},
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-accordion-item"]',
      description: 'One group of changes, for example Global changes.',
     lesson: {"explanation":"One release group collects related changes, such as Global changes."}},
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-accordion-trigger"]',
      description: 'Title row that opens the group; it carries the name and a muted update count.',
     lesson: {"explanation":"Title row opens the group and shows its muted update count."}},
    {
      id: 'label',
      name: 'Title and count',
      selector: '[class~="aui-accordion-trigger-content"]',
      description: 'Semi-bold l3 "Global changes" followed by a muted l5 "(1 update)"; ADC uses the release line "1.0 Released on Jan 01, 2027 (TBD)".',
     lesson: {"explanation":"Bold group name sits beside its muted count, such as one update.","selector":"[class~=\"aui-accordion-trigger-content\"] [data-ug-part=\"section-label\"]"}},
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]',
      description: 'Disclosure chevron at the end of the title row.',
     lesson: {"explanation":"Chevron at the title row's end shows whether notes are open."}},
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-accordion-panel"]',
      description: 'Holds the change entries: a 160px badge column beside the sentence describing the change.',
     lesson: {"explanation":"Panel aligns each change badge beside its explanatory sentence."}},
    {
      id: 'chip',
      name: 'Change chip',
      selector: '[class~="aui-chip"]',
      description: 'Coloured solid chip that tags the type of change: warning IMPROVEMENT here, success FEATURE in the Europe group.',
     lesson: {"explanation":"Solid chip labels each change as IMPROVEMENT or FEATURE."}},
    {
      id: 'chip-label',
      name: 'Chip label',
      selector: '[class~="aui-chip-label"]',
      text: true,
      description: 'Upper-case change type, IMPROVEMENT or FEATURE.',
    },
  ],
});
