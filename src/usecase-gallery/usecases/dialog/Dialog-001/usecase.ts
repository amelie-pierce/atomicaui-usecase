import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'About',
  title: 'About dialog: release history and notes',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
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
    { id: 'pfd-about', name: 'About dialog', apps: ['pfd'], source: { pfd: 'src/pfd/AboutDialog.tsx' } },
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
  summary: 'A wide dialog with a Release history column beside the app header and the notes of the chosen release, whose changes sit in an Accordion with one coloured Chip each.',
  where: 'The About item of the top bar menu in nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS); ADC has no About dialog. Real site source: the About dialog of each app (the paths are in source).',
  when: 'Use it to show what an app is and what changed in each release, with a list of versions to choose from. Do not use it for a short message or a confirm (a plain Dialog, Button-001) or for a list of tutorials (Button-025).',
  how: 'The Dialog.Popup is scale "sm" with a zero gap and the width the apps set by CSS variable, min(860px, viewport minus 28px) at the app and the stage width here; the apps also set a 740px height and, below 768px, turn the history into a strip above the notes (left out). A raised Title carries the name, the Spacer and the close X (Button-021). The body is one row: a 224px Release history column (a heading and a version count, a search Field with a magnifying-glass icon, a listbox List whose selected row is a solid surface with a 4px secondary start border, version in bold l3 and a tonal primary CURRENT Chip) and a notes column (an app header with an h5 name and a muted p3 summary, then the release notes). The notes are an Accordion (openMultiple, the global section open) whose trigger reads the label in semi-bold l3 and the count in muted l5, and whose rows are a 160px column with a solid Chip (success for a feature, warning for an improvement) next to a p3 text. The example is that Accordion, the part you write per release. The apps write two UIs: HCS, ACE, ADM, PBS, HS, FD, AGPD and RWS are one group (HCS, ACE, HS, FD, PBS, AGPD and RWS may also show the "Updates for your project" band and the "Updates for other regions" section, left out; the scene is the HCS one); PFD is the other group, with a Key Features list (muted label over an xs List) and a right-aligned xs text button that toggles every section (Collapse all or Expand all) above the notes. The scenes leave out the no-match state, the keyboard handlers and the narrow layout.',
});
