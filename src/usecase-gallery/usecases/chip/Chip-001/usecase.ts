import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "change-row", name: "Change row", description: "One release-note row: a flex row with 8px vertical padding and an outlined bottom border between rows." },
  { id: "chip-column", name: "Chip column", description: "The fixed 160px start column that holds the change Chip (FEATURE, IMPROVEMENT)." },
  { id: "change-text", name: "Change text", description: "The p3 text that describes the change, such as \"Added the Download Duration help.\"" },
];

export default defineUsecase({
  uiType: 'Label chip',
  title: 'Solid release label',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  options: [
    { id: "hcs-release-note", contextAnatomy: CONTEXT_ANATOMY, name: "Release note row", source: {"hcs":"src/components/HcsAboutDialog.tsx","ace":"src/features/top-navigation/ui/AboutDialog.tsx","adm":"src/features/top-navigation/components/AboutDialog.tsx","pfd":"src/pfd/AboutDialog.tsx","pbs":"src/AboutDialog.tsx","hs":"src/hs/AboutDialog.tsx","fd":"src/components/AboutDialog.jsx","agpd":"src/agpd/AboutDialog.tsx","rws":"src/rws/AboutDialog.tsx"} },
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
  },
  summary: 'A small solid label that names the kind of an item, coloured by meaning: success for a feature, warning for an improvement.',
  where: 'The release notes of the About dialog in the nine apps that have one (ADC has no About dialog). Real source: the About dialog of each app (the paths are in source).',
  when: 'Use it to tag an item with a short word in a list. Use a tonal Status chip for a state (Chip-003) and a Dismissible chip for a value the user can remove (Chip-005).',
  how: '`Chip` at `scale: "sm"`, `color` by meaning (`success`, `warning`) and `paint: "solid"`, with one `Chip.Label` in capitals. It sits in a 160px start column so the labels of every row line up with the text beside them. All nine apps write the same Chip (apps differ only in the column width, 96px in HS and 160px in HCS, a size); the scene is the HCS one and leaves out the Accordion around the rows.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The solid success chip at scale \"sm\" that tags a release-note entry as a feature (the warning colour is used for an improvement).",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-chip-label\"]",
      text: true,
      description: "The uppercase kind name FEATURE.",
    },
  ],
});
