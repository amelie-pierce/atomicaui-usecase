import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Configuration country select',
  apps: ['hs', 'ace', 'adc', 'fd', 'pfd', 'rws'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Field at scale \"sm\", full width with zero minimum width so it fits the configuration panel.","keyIdea":"Field at scale \"sm\", full width with zero minimum width so it fits the configuration panel.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Country\" label above the trigger.","keyIdea":"The \"Country\" label above the trigger.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The 28px outlined trigger (scale \"sm\", color \"surface\", paint \"fixed\") that opens the country list.","keyIdea":"The 28px outlined trigger (scale \"sm\", color \"surface\", paint \"fixed\") that opens the country list.","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"trigger-icon","partId":"trigger-icon","title":"Trigger icon","explanation":"The flag icon that leads the trigger and mirrors the chosen row.","keyIdea":"The flag icon that leads the trigger and mirrors the chosen row.","selector":"[class~=\"aui-select-trigger\"] > [class~=\"aui-contained-icon\"]:not([class~=\"aui-select-chevron\"])"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"The chevron at the end of the trigger.","keyIdea":"The chevron at the end of the trigger.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup of the trigger width, 4px below the trigger, holding three flagged rows.","keyIdea":"Popup of the trigger width, 4px below the trigger, holding three flagged rows.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list of Canada, United States and Mexico rows.","keyIdea":"The list of Canada, United States and Mexico rows.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A country row with its flag icon, name and an empty indicator slot; the chosen row is marked by a raised fill.","keyIdea":"A country row with its flag icon, name and an empty indicator slot; the chosen row is marked by a raised fill.","selector":"[class~=\"aui-select-item\"]"},
        {"id":"item-icon","partId":"item-icon","title":"Item icon","explanation":"The flag icon at the start of each row, before the country name.","keyIdea":"The flag icon at the start of each row, before the country name.","selector":"[class~=\"aui-select-item\"] > [class~=\"aui-contained-icon\"]"},
        {"id":"item-text","partId":"item-text","title":"Item text","explanation":"The country name: Canada, United States or Mexico.","keyIdea":"The country name: Canada, United States or Mexico.","selector":"[class~=\"aui-select-item-text\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"An empty slot (`{null}`) at the end of each row; in this panel the chosen row has no check.","keyIdea":"An empty slot (`{null}`) at the end of each row; in this panel the chosen row has no check.","selector":"[class~=\"aui-select-item-indicator\"]"},
      ],
options: [
    { id: "hs-configuration-select", showContext: false, name: "Configuration select", apps: ["hs","ace","adc","fd","pfd","rws"], source: {"hs":"src/hs/SettingsPanel.tsx","ace":"src/features/app-configuration/ui/AppConfigurationDialog.tsx","adc":"src/adc/components/AppConfigurationPopover.tsx","fd":"src/components/SettingsPopover.jsx","pfd":"src/pfd/CountrySelection.tsx","rws":"src/rws/CountryConfiguration.tsx"} ,
      contextLayers: [

      ],
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
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm", full width with zero minimum width so it fits the configuration panel.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Country" label above the trigger.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The 28px outlined trigger (scale "sm", color "surface", paint "fixed") that opens the country list.',
    },
    {
      id: 'trigger-icon',
      name: 'Trigger icon',
      selector: '[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])',
      description: 'The flag icon that leads the trigger and mirrors the chosen row.',
    },
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows "United States", the default country.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the end of the trigger.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width, 4px below the trigger, holding three flagged rows.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list of Canada, United States and Mexico rows.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A country row with its flag icon, name and an empty indicator slot; the chosen row is marked by a raised fill.',
    },
    {
      id: 'item-icon',
      name: 'Item icon',
      selector: '[class~="aui-select-item"] > [class~="aui-contained-icon"]',
      description: 'The flag icon at the start of each row, before the country name.',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The country name: Canada, United States or Mexico.',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'An empty slot (`{null}`) at the end of each row; in this panel the chosen row has no check.',
    },
  ],
});
