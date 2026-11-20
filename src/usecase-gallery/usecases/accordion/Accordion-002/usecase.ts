import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Titled accordion',
  title: 'Title with badge and count',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'hcs-release-notes',
      name: 'Release notes',
      apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
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
    { id: 'adc-release-notes', name: 'Release notes', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    {
      id: 'ace-other-regions',
      name: 'Other regions',
      apps: ['ace', 'hs', 'fd'],
      source: { ace: 'src/features/top-navigation/ui/AboutDialog.tsx', hs: 'src/hs/AboutDialog.tsx', fd: 'src/components/AboutDialog.jsx' },
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
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'The release notes of an About dialog as collapsible sections: each a title with a count, opening onto the list of changes with one coloured Chip each.',
  where: 'The About dialog of all ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC): the notes of the chosen release sit in an Accordion whose first section is Global changes. ACE, HS and FD add Updates for other regions with a nested Accordion, one section per region. Real site source: the About dialog of each app (the paths are in source). The dialog shell and the release history column are Dialog-001.',
  when: 'Use it for a short list of grouped notes the reader opens one by one, in a dialog or panel. Do not use it for input sections (Accordion-001) or for a pick-one list in groups (Accordion-003).',
  how: 'An Accordion at scale "sm" (openMultiple, the Global changes section open by default) of plain Accordion.Items. Accordion.Trigger holds one span with the label as Type span role "l3" weight "semi-bold", a space, and the count in parentheses as Type span role "l5" color "muted", then Accordion.Chevron. Accordion.Panel holds the change rows: a flex row with gap 12 and 8px block padding, a 160px column with a solid Chip (success for a feature, warning for an improvement) and the text as Type p3. The example is that Accordion; In context sets it in the About dialog Body. The apps write two UIs, measured in the gallery: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS are one group (trigger 28px, label 16px weight 600 with a 14px muted count; PFD wraps the label in a View span and adds a Collapse all button above, FD writes one Accordion per section, neither changes the render); ADC is the other, with a surface item and trigger (shape "none"), the version line as one Type l4 semi-bold (14px) with no count, and a warning surface label beside the change text. The Other regions type (ACE, HS, FD) puts a second Accordion inside the panel of the Updates for other regions item, its items written like the outer ones. The scenes leave out the Release history column, the app header, the project updates band, further sections and releases, the Close footer and the narrow layout.',
});
