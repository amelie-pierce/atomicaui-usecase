import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Filled select',
  title: 'Status filter',
  apps: ['fd'],
options: [
    { id: "fd-status-filter", showContext: false, name: "Status filter", apps: ["fd"], source: {"fd":"src/components/Results.jsx"} ,
    },
  ],
  source: { fd: 'src/components/Results.jsx' },
  summary: 'A label-less select in the output toolbar that narrows the results by status.',
  where: 'The FD output toolbar, beside the search field: the Product status filter, shown when the design has failed products.',
  when: 'Use it as a toolbar filter where the visible value names the filter and no label fits. Name it with aria-label on the trigger. Use the field select (Select-001) for a design input.',
  how: 'FD: a Field at scale "sm" (class "status-filter") around a Field.Select; the Field.SelectTrigger carries aria-label "Product status" and only `sx: { width: "full" }`, so it keeps the default kit colour and paint and fills the toolbar slot, with Field.SelectValue and Field.SelectChevron. The Field.SelectPositioner uses sideOffset 5 and the Field.SelectPopup matchTriggerWidth; each row is a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator. The scene shows the filter alone and leaves out the search field, the reset filter button and the solution count.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Label-less Field at scale "sm" with the "status-filter" class that places the select in the output toolbar.',
     lesson: {"explanation":"Label-less small field places the status filter in the toolbar."}},
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Full-width trigger labelled "Product status" for assistive tech only, in the kit default style (no surface or fixed colour).',
     lesson: {"explanation":"Default trigger uses Product status as its accessible name."}},
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows "Passed products", the default status filter.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron at the trigger end.',
     lesson: {"explanation":"End chevron marks the status trigger as a dropdown."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width placed 5px below it, offering Passed, Failed and All products.',
     lesson: {"explanation":"Popup offers Passed, Failed, and All products 5px below."}},
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list of the three status rows.',
     lesson: {"explanation":"Popup list holds Passed, Failed, and All products rows."}},
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A status row; the chosen one is marked by a raised fill.',
     lesson: {"explanation":"A status row; the chosen one is marked by a raised fill."}},
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The status wording, such as "Failed products".',
     lesson: {"explanation":"Status wording names each choice, such as Failed products."}},
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'Empty indicator slot at the row end.',
     lesson: {"explanation":"Empty end slot shows no check for this selected option."}},
  ],
});
