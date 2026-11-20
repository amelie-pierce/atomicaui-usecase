import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Label chip',
  title: 'Solid release label',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    {
      id: 'hcs-release-note',
      name: 'Release note row',
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
    },
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
});
