import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Compact select',
  title: 'Cell select',
  apps: ['adc'],
  options: [
    { id: "adc-table-cell", showContext: false, name: "Cell select", apps: ["adc"], source: {"adc":"src/adc/components/ProductsPicker.tsx"} },
  ],
  source: { adc: 'src/adc/components/ProductsPicker.tsx' },
  summary: 'A compact label-less select that fills a table cell and picks one value for the row.',
  where: 'The Hef column of the ADC Products table: each selected anchor row edits its effective embedment from a short list.',
  when: 'Use it for a value picked inside a table row, where the column header is the label. The control is the bare Select, with no Field around it; give it an aria-label because it has no visible one.',
  how: 'ADC: a Select with a Select.Trigger at scale "xs", color "surface", paint "fixed" and width "fill", so it takes the width of its cell; it holds Select.Value and Select.Chevron and carries aria-label "Hef". Select.Portal > Select.Positioner (side "bottom", sideOffset 4) > Select.Popup with matchTriggerWidth > Select.List holds Select.Items, each with Select.ItemText and a Select.ItemIndicator written with `{null}`. The app also shows a plain Button with a chevron in place of the select for rows that are not being edited, and opens the list on mount for the row just chosen (defaultOpen); the scene shows the open select in a fixed-width cell and leaves out the table, the other columns and the expand toggles.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'A bare Select with no Field: an "Hef" labelled (aria-label) outlined trigger at scale "xs" that fills its table cell.',
    },
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows the effective embedment "6.000" for the row.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the end of the compact trigger.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup that matches the cell trigger width, 4px below it, listing 4.500, 6.000 and 7.500.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list of the three Hef embedment values.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'One embedment value row; the chosen 6.000 shows a raised fill.',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The numeric value text, for example "7.500".',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'Empty slot (`{null}`) at the end of each row.',
    },
  ],
});
