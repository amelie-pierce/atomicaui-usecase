import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Filled select',
  title: 'Status filter',
  apps: ['fd'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Label-less Field at scale \"sm\" with the \"status-filter\" class that places the select in the output toolbar.","keyIdea":"Label-less Field at scale \"sm\" with the \"status-filter\" class that places the select in the output toolbar.","selector":"[class~=\"aui-field\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Full-width trigger labelled \"Product status\" for assistive tech only, in the kit default style (no surface or fixed colour).","keyIdea":"Full-width trigger labelled \"Product status\" for assistive tech only, in the kit default style (no surface or fixed colour).","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"The chevron at the trigger end.","keyIdea":"The chevron at the trigger end.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup of the trigger width placed 5px below it, offering Passed, Failed and All products.","keyIdea":"Popup of the trigger width placed 5px below it, offering Passed, Failed and All products.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list of the three status rows.","keyIdea":"The list of the three status rows.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A status row; the chosen one is marked by a raised fill.","keyIdea":"A status row; the chosen one is marked by a raised fill.","selector":"[class~=\"aui-select-item\"]"},
        {"id":"item-text","partId":"item-text","title":"Item text","explanation":"The status wording, such as \"Failed products\".","keyIdea":"The status wording, such as \"Failed products\".","selector":"[class~=\"aui-select-item-text\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"Empty indicator slot at the row end.","keyIdea":"Empty indicator slot at the row end.","selector":"[class~=\"aui-select-item-indicator\"]"},
      ],
options: [
    { id: "fd-status-filter", showContext: false, name: "Status filter", apps: ["fd"], source: {"fd":"src/components/Results.jsx"} ,
      contextLayers: [

      ],
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
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Full-width trigger labelled "Product status" for assistive tech only, in the kit default style (no surface or fixed colour).',
    },
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
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup of the trigger width placed 5px below it, offering Passed, Failed and All products.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list of the three status rows.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A status row; the chosen one is marked by a raised fill.',
    },
    {
      id: 'item-text',
      name: 'Item text',
      selector: '[class~="aui-select-item-text"]',
      description: 'The status wording, such as "Failed products".',
    },
    {
      id: 'indicator',
      name: 'Indicator',
      selector: '[class~="aui-select-item-indicator"]',
      description: 'Empty indicator slot at the row end.',
    },
  ],
});
