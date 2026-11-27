import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Compact select',
  title: 'Cell select',
  apps: ['adc'],
options: [
    { id: "adc-table-cell", showContext: true, name: "Cell select", apps: ["adc"], source: {"adc":"src/adc/components/ProductsPicker.tsx"},
      contextAnatomy: [
        { id: 'products-table', name: 'Products table', scope: 'context', selector: '[data-ug-part="products-table"]', description: 'The product rows and columns that give the bare cell select its meaning.' , lesson: {"explanation":"The table frames the row and its product data.","scope":"context"}},
        { id: 'column-headings', name: 'Column headings', scope: 'context', selector: '[data-ug-part="column-headings"]', description: 'Product, Hef and Weight label the active row values.' , lesson: {"explanation":"Product, Hef and Weight identify each cell in the table.","scope":"context"}},
        { id: 'active-product-row', name: 'Active product row', scope: 'context', selector: '[data-ug-part="active-product-row"]', description: 'Anchor A-240 is the row currently being edited.' , lesson: {"explanation":"Anchor A-240 is selected for editing among neighboring products.","scope":"context"}},
        { id: 'edited-hef-cell', name: 'Edited Hef cell', scope: 'context', selector: '[data-ug-part="edited-hef-cell"]', description: 'The Hef column holds the open Select while the row is being edited.' , lesson: {"explanation":"The Select occupies the Hef cell in the active row.","scope":"context"}},
      ],
      contextDocument: {
        summary: 'A compact label-less Select edits the Hef value in an active ADC Products row.',
        where: 'The Hef cell of the product row being edited in ADC ProductsPicker.',
        how: 'The selected product row remains visible beside neighboring values. The Hef column heading names the field; the bare Select fills that cell and opens its choices in place.',
      },
    },
  ],
  source: { adc: 'src/adc/components/ProductsPicker.tsx' },
  summary: 'A compact label-less select that fills a table cell and picks one value for the row.',
  where: 'The Hef column of the ADC Products table: each selected anchor row edits its effective embedment from a short list.',
  when: 'Use it for a value picked inside a table row, where the column header is the label. The control is the bare Select, with no Field around it; give it an aria-label because it has no visible one.',
  how: 'ADC: a Select with a Select.Trigger at scale "xs", color "surface", paint "fixed" and width "fill", so it takes the width of its cell; it holds Select.Value and Select.Chevron and carries aria-label "Hef". Select.Portal > Select.Positioner (side "bottom", sideOffset 4) > Select.Popup with matchTriggerWidth > Select.List holds Select.Items, each with Select.ItemText and a Select.ItemIndicator written with `{null}`. The app also shows a plain Button with a chevron in place of the select for rows that are not being edited, and opens the list on mount for the row just chosen (defaultOpen); In context shows the open editor in its row among neighboring product values, while leaving out the remaining columns and expand toggles.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'A bare Select with no Field: an "Hef" labelled (aria-label) outlined trigger at scale "xs" that fills its table cell.',
     lesson: {"explanation":"Bare extra-small Select fills its cell with the Hef accessible label."}},
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
     lesson: {"explanation":"The chevron at the end of the compact trigger."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup that matches the cell trigger width, 4px below it, listing 4.500, 6.000 and 7.500.',
     lesson: {"explanation":"Popup matches the cell trigger and lists three sizes."}},
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list of the three Hef embedment values.',
     lesson: {"explanation":"The list of the three Hef embedment values."}},
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'One embedment value row; the chosen 6.000 shows a raised fill.',
     lesson: {"explanation":"One embedment value row; the chosen 6.000 shows a raised fill."}},
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The numeric value text, for example "7.500".',
     lesson: {"explanation":"Numeric option text shows values such as 7.500."}},
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'Empty slot (`{null}`) at the end of each row.',
     lesson: {"explanation":"Empty slot (`{null}`) at the end of each row."}},
  ],
});
