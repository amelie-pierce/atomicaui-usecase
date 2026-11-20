import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Configuration country select',
  apps: ['hs', 'ace', 'adc', 'fd', 'pfd', 'rws'],
  cases: [
    {
      id: 'hs-configuration-select',
      name: 'Configuration select',
      apps: ['hs', 'ace', 'adc', 'fd', 'pfd', 'rws'],
      source: {
        hs: 'src/hs/SettingsPanel.tsx',
        ace: 'src/features/app-configuration/ui/AppConfigurationDialog.tsx',
        adc: 'src/adc/components/AppConfigurationPopover.tsx',
        fd: 'src/components/SettingsPopover.jsx',
        pfd: 'src/pfd/CountrySelection.tsx',
        rws: 'src/rws/CountryConfiguration.tsx',
      },
    },
  ],
  source: {
    hs: 'src/hs/SettingsPanel.tsx',
    ace: 'src/features/app-configuration/ui/AppConfigurationDialog.tsx',
    adc: 'src/adc/components/AppConfigurationPopover.tsx',
    fd: 'src/components/SettingsPopover.jsx',
    pfd: 'src/pfd/CountrySelection.tsx',
    rws: 'src/rws/CountryConfiguration.tsx',
  },
  summary: 'A select in the App Configuration panel whose trigger and rows lead with an icon (the country flag), written as a field with the label above.',
  where: 'The App Configuration of HS, ADC, FD, PFD and RWS (an anchored popover) and ACE (a dialog), for the country, and in HS, ADC and FD also the language and unit fields.',
  when: 'Use it for an app setting that has a recognisable glyph per option, where the chosen option must show its glyph in the closed field. Use the field select (Select-001) when the options carry no icon. The country select of the ACE licence gate is Select-005.',
  how: 'A Field at scale "sm", width fill and minWidth 0, with a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", scale "sm", width fill and 28px high; it leads with a Field.SelectIcon (the chosen row\'s icon), then Field.SelectValue and Field.SelectChevron. Each Field.SelectItem leads with a Field.SelectIcon, then Field.SelectItemText and a Field.SelectItemIndicator written with `{null}` (no check). The apps draw the flag with an image (ContainedImage in ACE); the scene uses a flag icon, since the gallery uses kit icons only. The scene shows the enabled state (HS, ADC, FD disable a field with one option) and leaves out the popover or dialog around the field, the other configuration fields, and FD and ADC grouped lists (Select-006).',
});
