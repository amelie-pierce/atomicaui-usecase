import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Column filter select',
  apps: ['hcs', 'hs', 'pfd'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Field at scale \"sm\" with a 4 gap and zero minimum width so the filter can shrink inside the column menu.","keyIdea":"The Field gives a compact filter an accessible name inside the column menu.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Search by option\" label above the filter trigger.","keyIdea":"Search by option explains that the select filters columns rather than selecting a product.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Full-width outlined trigger with the \"soft\" shape and no height override, so it takes the scale default.","keyIdea":"The soft outlined trigger groups all column-filter choices into one control.","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"The chevron that tells the user the trigger opens a list of column values.","keyIdea":"The chevron hints that the filter’s values appear on demand.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup that opens below the trigger, aligned to its start with alignItemWithTrigger off, at the trigger width.","keyIdea":"Start alignment preserves a predictable list origin under the trigger.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list holding the Select all, Passed and Failed rows.","keyIdea":"The list exposes Select all, Passed, and Failed as filter scopes.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"A filter row whose label is written straight into the item; \"Select all\" clears the column filter.","keyIdea":"Each row applies one scope, while Select all clears the narrower filter.","selector":"[class~=\"aui-select-item\"]"},
      ],
options: [
    { id: "hcs-column-filter", showContext: false, name: "Column filter", apps: ["hcs","hs"], note: "The list opens below the trigger.", source: {"hcs":"src/components/ColumnMenu.tsx","hs":"src/hs/ColumnMenu.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "pfd-column-filter", showContext: false, name: "Column filter — UI variant 2", apps: ["pfd"], note: "The list opens above the trigger.", source: {"pfd":"src/pfd/ColumnMenu.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    hcs: 'src/components/ColumnMenu.tsx',
    hs: 'src/hs/ColumnMenu.tsx',
    pfd: 'src/pfd/ColumnMenu.tsx',
  },
  summary: 'The Search by option field of a table column menu: a select that filters the column to one of its known values.',
  where: 'The Search by option field of the column menu popover of the Output table in HCS, HS and PFD, under the Search by text field.',
  when: 'Use it in a table column menu to filter a column to one of its known values; use the text search field above it for free text. Use the field select (Select-001) for an input of a form.',
  how: 'Column filter (HCS, HS): a Field at scale "sm" (gap 4, minWidth 0) with the label "Search by option" and a Field.Select whose trigger is color "surface", paint "fixed", shape "soft" and width fill, the same trigger as the field select; the Field.SelectPositioner is side "bottom", align "start", sideOffset 4 with alignItemWithTrigger off, so the list sits under the trigger, and the rows are bare Field.SelectItems (Select all first) with no indicator. Column filter (PFD): the same field with side "top", so the list opens above the trigger (measured 36px below the trigger against 92px above). Those scenes show the enabled state (HCS disables the field with fewer than two options, HS with none) and leave out the column menu Popover, the sort buttons and the text search field.',
  anatomy: [
    {
      id: 'field',
      name: 'Field',
      selector: '[class~="aui-field"]',
      description: 'Field at scale "sm" with a 4 gap and zero minimum width so the filter can shrink inside the column menu.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-field-label"]',
      description: 'The "Search by option" label above the filter trigger.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-select-trigger"]',
      description: 'Full-width outlined trigger with the "soft" shape and no height override, so it takes the scale default.',
    },
    {
      id: 'value',
      name: 'Value',
      selector: '[class~="aui-select-value"]',
      text: true,
      description: 'Shows the current filter value, "Select all" by default.',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-select-chevron"]',
      description: 'The chevron that tells the user the trigger opens a list of column values.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-select-popup"]',
      description: 'Popup that opens below the trigger, aligned to its start with alignItemWithTrigger off, at the trigger width.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-select-list"]',
      description: 'The list holding the Select all, Passed and Failed rows.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-select-item"]',
      description: 'A filter row whose label is written straight into the item; "Select all" clears the column filter.',
    },
  ],
});
