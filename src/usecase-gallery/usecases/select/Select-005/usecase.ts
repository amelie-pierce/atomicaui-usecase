import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Licence gate country select',
  apps: ['ace'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Field at scale \"sm\", full width, laid out for the ACE licence gate dialog above the accept checkbox.","keyIdea":"Field at scale \"sm\", full width, laid out for the ACE licence gate dialog above the accept checkbox.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Country\" label above the licence gate trigger.","keyIdea":"The \"Country\" label above the licence gate trigger.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The flag-led outlined trigger in the licence gate; unlike the configuration panel the ACE scene states no scale or height.","keyIdea":"The flag-led outlined trigger in the licence gate; unlike the configuration panel the ACE scene states no scale or height.","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"trigger-icon","partId":"trigger-icon","title":"Trigger icon","explanation":"The flag icon that leads the trigger and mirrors the chosen row.","keyIdea":"The flag icon that leads the trigger and mirrors the chosen row.","selector":"[class~=\"aui-select-trigger\"] > [class~=\"aui-contained-icon\"]:not([class~=\"aui-select-chevron\"])"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"The chevron at the end of the trigger.","keyIdea":"The chevron at the end of the trigger.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup of the trigger width, 4px below the trigger, listing the three countries.","keyIdea":"Popup of the trigger width, 4px below the trigger, listing the three countries.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list of Canada, United States and Mexico rows.","keyIdea":"The list of Canada, United States and Mexico rows.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A country row with flag, name and a trailing check slot for the chosen country.","keyIdea":"A country row with flag, name and a trailing check slot for the chosen country.","selector":"[class~=\"aui-select-item\"]"},
        {"id":"item-icon","partId":"item-icon","title":"Item icon","explanation":"The flag icon at the start of each row, before the country name.","keyIdea":"The flag icon at the start of each row, before the country name.","selector":"[class~=\"aui-select-item\"] > [class~=\"aui-contained-icon\"]"},
        {"id":"item-text","partId":"item-text","title":"Item text","explanation":"The country name: Canada, United States or Mexico.","keyIdea":"The country name: Canada, United States or Mexico.","selector":"[class~=\"aui-select-item-text\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"In the ACE licence gate scene this slot holds a check icon on the chosen row; the base example keeps it empty.","keyIdea":"In the ACE licence gate scene this slot holds a check icon on the chosen row; the base example keeps it empty.","selector":"[class~=\"aui-select-item-indicator\"]"},
        {"id":"check","partId":"check","title":"Check icon","explanation":"The check drawn at the end of the chosen country row in the ACE scene.","keyIdea":"The check drawn at the end of the chosen country row in the ACE scene.","selector":"[class~=\"aui-select-item-indicator\"] [class~=\"aui-contained-icon\"]"},
      ],
options: [
    { id: "ace-licence-country", showContext: false, name: "Licence gate country", apps: ["ace"], source: {"ace":"src/features/eula/ui/EulaGate.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    ace: 'src/features/eula/ui/EulaGate.tsx',
  },
  summary: 'The country select of the licence gate: the same flag-led trigger and rows, with a check on the chosen row.',
  where: 'ACE only: the licence gate that asks for the country before the licence is accepted (src/features/eula/ui/EulaGate.tsx), a repeat of the country field of the App Configuration dialog.',
  when: 'Use it to ask for the country in a gate the user must pass before working, where the chosen option must show its glyph in the closed field. Use Select-004 for the same field in the app settings.',
  how: 'The same flag-led trigger and rows as the configuration select, but the trigger states no scale or height and the chosen row ends with a check icon in its indicator (an indicator holding a 16px icon, where the configuration rows hold none). The scene shows the enabled state and leaves out the licence text, the Accept button and the other gate fields.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm", full width, laid out for the ACE licence gate dialog above the accept checkbox.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Country" label above the licence gate trigger.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The flag-led outlined trigger in the licence gate; unlike the configuration panel the ACE scene states no scale or height.',
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
      description: 'Shows "United States" as the pre-filled country before the licence is accepted.',
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
      description: 'Popup of the trigger width, 4px below the trigger, listing the three countries.',
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
      description: 'A country row with flag, name and a trailing check slot for the chosen country.',
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
      description: 'In the ACE licence gate scene this slot holds a check icon on the chosen row; the base example keeps it empty.',
    },
    {
      id: 'check',
      name: 'Check icon',
      selector: '[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]',
      description: 'The check drawn at the end of the chosen country row in the ACE scene.',
    },
  ],
});
