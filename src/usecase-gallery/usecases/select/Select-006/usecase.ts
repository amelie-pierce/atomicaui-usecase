import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Grouped options',
  apps: ['adc', 'fd'],
  cases: [
    {
      id: 'adc-grouped-options',
      name: 'Grouped options',
      apps: ['adc'],
      source: { adc: 'src/adc/components/DesignField.tsx' },
    },
    {
      id: 'fd-grouped-options',
      name: 'Grouped options',
      apps: ['fd'],
      source: { fd: 'src/components/SettingsPopover.jsx' },
    },
  ],
  source: { adc: 'src/adc/components/DesignField.tsx', fd: 'src/components/SettingsPopover.jsx' },
  summary: 'A select whose rows are split into labelled groups: a heading above each run of related options.',
  where: 'The design fields of the ADC input sections (a product or anchor list split by family) and the grouped lists of the FD settings popover.',
  when: 'Use it when a long list falls into named families the user scans by heading. Use the plain field select (Select-001) for a flat list.',
  how: 'Label beside (ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and a 28px outlined trigger filling the other half; the popup matches the trigger width. Label above (FD): a Field at scale "sm" with the label above a 28px trigger (scale "sm", height 28) that leads with the chosen row\'s icon, and rows that lead with an icon. In both the Field.SelectList holds Field.SelectGroups, each with a Field.SelectGroupLabel heading and its Field.SelectItems (Field.SelectItemText plus an indicator written with `{null}`). The two differ in the label position, the widths (a 137px trigger beside the label, 280px above it) and the icons. The scenes show the enabled state and leave out the option thumbnails of ADC and the other fields of the section and settings popover; the scene uses a flag icon where FD shows its own icons.',
});
