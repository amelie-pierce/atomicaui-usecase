import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Licence gate country select',
  apps: ['ace'],
  options: [
    { id: "ace-licence-country", name: "Licence gate country", apps: ["ace"], source: {"ace":"src/features/eula/ui/EulaGate.tsx"} },
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
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm", full width, laid out for the ACE licence gate dialog above the accept checkbox.',
      code: `<Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
  {/* … */}
</Field>`,
    },
    {
      id: 'label',
      name: 'Label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Country" label above the licence gate trigger.',
      code: `<Field.Label>Country</Field.Label>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Field.SelectTrigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'The flag-led outlined trigger in the licence gate; unlike the configuration panel the ACE scene states no scale or height.',
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
      description: 'Shows "United States" as the pre-filled country before the licence is accepted.',
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
      description: 'Popup of the trigger width, 4px below the trigger, listing the three countries.',
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
      description: 'A country row with flag, name and a trailing check slot for the chosen country.',
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
      description: 'In the ACE licence gate scene this slot holds a check icon on the chosen row; the base example keeps it empty.',
      code: `<Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>`,
    },
    {
      id: 'check',
      name: 'Check icon',
      token: 'Field.SelectIcon',
      selector: '[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]',
      description: 'The check drawn at the end of the chosen country row in the ACE scene.',
      code: `<Field.SelectIcon name="check" aria-hidden aui={{ scale: 'xs' }} />`,
    },
  ],
});
