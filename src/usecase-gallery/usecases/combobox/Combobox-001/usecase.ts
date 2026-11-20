import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Combobox',
  title: 'Searchable select',
  apps: ['fd'],
  cases: [{ id: 'fd-license-country', name: 'Country picker', source: { fd: 'src/components/LicenseGate.jsx' } }],
  source: { fd: 'src/components/LicenseGate.jsx' },
  summary: 'A select you can type into: the text field filters the list, a chevron opens it, and the chosen option is ticked.',
  where: 'The country picker of the FD licence gate (src/components/LicenseGate.jsx).',
  when: 'Use it for a long list the user can search. Use a Select for a short list and a Field for free text.',
  how: '`Combobox` with `items`, `value`, `itemToStringLabel` and `onValueChange`; `Combobox.InputGroup` (`scale: "sm"`, `width: "fill"`) holds `Combobox.Input` and `Combobox.Trigger` with `Combobox.Icon` chevron-down; `Combobox.Portal` > `Combobox.Positioner` (`side="bottom"`, `sideOffset={4}`) > `Combobox.Popup` (`matchTriggerWidth`) with `Combobox.Empty` and a `Combobox.List` of `Combobox.Item`s ending in `Combobox.ItemIndicator`. FD groups the list by region with `Combobox.Group`, `GroupLabel` and `Collection`, and shows a flag before each label; the example keeps a flat list. A `Field.Label` sits above.',
});
