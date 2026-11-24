import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Configuration country select',
  apps: ['hs', 'ace', 'adc', 'fd', 'pfd', 'rws'],
  options: [
    { id: "hs-configuration-select", name: "Configuration select", apps: ["hs","ace","adc","fd","pfd","rws"], source: {"hs":"src/hs/SettingsPanel.tsx","ace":"src/features/app-configuration/ui/AppConfigurationDialog.tsx","adc":"src/adc/components/AppConfigurationPopover.tsx","fd":"src/components/SettingsPopover.jsx","pfd":"src/pfd/CountrySelection.tsx","rws":"src/rws/CountryConfiguration.tsx"} },
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
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm", full width with zero minimum width so it fits the configuration panel.',
      code: `<Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Country" label above the trigger.',
      code: `<Field.Label>Country</Field.Label>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Field.SelectTrigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The 28px outlined trigger (scale "sm", color "surface", paint "fixed") that opens the country list.',
      code: `<Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
  {/* … */}
</Field.SelectTrigger>`,
    },
    {
      id: 'trigger-icon',
      name: 'Trigger icon',
      token: 'Field.SelectIcon',
      selector: '[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])',
      description: 'The flag icon that leads the trigger and mirrors the chosen row.',
      code: `<Field.SelectIcon name="flag" aria-hidden />`,
    },
    {
      id: 'value',
      name: 'Value',
      token: 'Field.SelectValue',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows "United States", the default country.',
      code: `<Field.SelectValue />`,
    },
    {
      id: 'chevron',
      name: 'Chevron',
      token: 'Field.SelectChevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the end of the trigger.',
      code: `<Field.SelectChevron />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Field.SelectPopup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width, 4px below the trigger, holding three flagged rows.',
      code: `<Field.SelectPopup matchTriggerWidth>
  {/* … */}
</Field.SelectPopup>`,
    },
    {
      id: 'list',
      name: 'List',
      token: 'Field.SelectList',
      selector: '[class~="aui-select-list"]',
      description: 'The list of Canada, United States and Mexico rows.',
      code: `<Field.SelectList>
  {/* … */}
</Field.SelectList>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Field.SelectItem',
      selector: '[class~="aui-select-item"]',
      description: 'A country row with its flag icon, name and an empty indicator slot; the chosen row is marked by a raised fill.',
      code: `<Field.SelectItem value="ca">
  <Field.SelectIcon name="flag" aria-hidden />
  <Field.SelectItemText>Canada</Field.SelectItemText>
  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
</Field.SelectItem>`,
    },
    {
      id: 'item-icon',
      name: 'Item icon',
      token: 'Field.SelectIcon',
      selector: '[class~="aui-select-item"] > [class~="aui-contained-icon"]',
      description: 'The flag icon at the start of each row, before the country name.',
      code: `<Field.SelectIcon name="flag" aria-hidden />`,
    },
    {
      id: 'item-text',
      name: 'Item text',
      token: 'Field.SelectItemText',
      selector: '[class~="aui-select-item-text"]',
      description: 'The country name: Canada, United States or Mexico.',
      code: `<Field.SelectItemText>Canada</Field.SelectItemText>`,
    },
    {
      id: 'indicator',
      name: 'Indicator',
      token: 'Field.SelectItemIndicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'An empty slot (`{null}`) at the end of each row; in this panel the chosen row has no check.',
      code: `<Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>`,
    },
  ],
});
