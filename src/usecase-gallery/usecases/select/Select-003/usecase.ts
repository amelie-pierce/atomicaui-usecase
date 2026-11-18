import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Configuration',
  title: 'Configuration select with icons',
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
    {
      id: 'ace-licence-country',
      name: 'Licence gate country',
      apps: ['ace'],
      source: { ace: 'src/features/eula/ui/EulaGate.tsx' },
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
  where: 'The App Configuration of HS, ADC, FD, PFD and RWS (an anchored popover) and ACE (a dialog), for the country, and in HS, ADC and FD also the language and unit fields. ACE repeats the country select on its licence gate.',
  when: 'Use it for an app setting that has a recognisable glyph per option, where the chosen option must show its glyph in the closed field. Use the field select (Select-001) when the options carry no icon.',
  how: 'Configuration select (HS, ACE, ADC, FD, PFD, RWS): a Field at scale "sm", width fill and minWidth 0, with a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", scale "sm", width fill and 28px high; it leads with a Field.SelectIcon (the chosen row\'s icon), then Field.SelectValue and Field.SelectChevron. Each Field.SelectItem leads with a Field.SelectIcon, then Field.SelectItemText and a Field.SelectItemIndicator written with `{null}` (no check). The apps draw the flag with an image (ContainedImage in ACE); the scene uses a flag icon, since the gallery uses kit icons only. Licence gate country (ACE): the same flag-led trigger and rows, but the trigger states no scale or height and the chosen row ends with a check icon in its indicator (an indicator holding a 16px icon, where the configuration rows hold none), so it is its own type. The scenes show the enabled state (HS, ADC, FD disable a field with one option) and leave out the popover or dialog around the field, the other configuration fields, and FD and ADC grouped lists (Select-005).',
});
