import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field select',
  title: 'Column filter select',
  apps: ['hcs', 'hs', 'pfd'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Small field can shrink inside the column menu.","keyIdea":"The Field gives a compact filter an accessible name inside the column menu.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Search by option\" label above the filter trigger.","keyIdea":"Search by option explains that the select filters columns rather than selecting a product.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Full-width soft outlined trigger uses the default height.","keyIdea":"The soft outlined trigger groups all column-filter choices into one control.","selector":"[class~=\"aui-select-trigger\"]"},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"Chevron signals that the trigger opens column values.","keyIdea":"The chevron hints that the filter’s values appear on demand.","selector":"[class~=\"aui-select-chevron\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Popup aligns to trigger start and matches its width.","keyIdea":"Start alignment preserves a predictable list origin under the trigger.","selector":"[class~=\"aui-select-popup\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"The list holding the Select all, Passed and Failed rows.","keyIdea":"The list exposes Select all, Passed, and Failed as filter scopes.","selector":"[class~=\"aui-select-list\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"Filter row labels options; Select all clears the filter.","keyIdea":"Each row applies one scope, while Select all clears the narrower filter.","selector":"[class~=\"aui-select-item\"]"},
      ],
options: [
    { id: "hcs-column-filter", showContext: true, name: "Column filter", apps: ["hcs","hs"], note: "The list opens below the trigger.", source: {"hcs":"src/components/ColumnMenu.tsx","hs":"src/hs/ColumnMenu.tsx"},
      contextAnatomy: [
        { id: 'column-menu', name: 'Column menu', scope: 'context', selector: '[data-ug-part="column-menu"]', description: 'The menu groups a text search, sort actions and the option filter for one table column.' },
        { id: 'column-search', name: 'Text search', scope: 'context', selector: '[data-ug-part="column-search"]', description: 'The text field narrows the column by free-form text.' },
        { id: 'sort-actions', name: 'Sort actions', scope: 'context', selector: '[data-ug-part="sort-actions"]', description: 'Ascending and descending actions sit above the option filter.' },
      ],
      contextLayers: [
        { id: 'context-column-menu', partId: 'column-menu', scope: 'context', title: 'Column menu', explanation: 'The popover groups controls for one table column.', keyIdea: 'A column menu keeps search, sort and filter actions together.', selector: '[data-ug-part="column-menu"]' },
        { id: 'context-column-search', partId: 'column-search', scope: 'context', title: 'Text search', explanation: 'Free-form search narrows the values in the selected column.', keyIdea: 'Text search handles values that do not fit the fixed option list.', selector: '[data-ug-part="column-search"]' },
        { id: 'context-sort-actions', partId: 'sort-actions', scope: 'context', title: 'Sort actions', explanation: 'The two controls sort the table in either direction.', keyIdea: 'Sorting changes row order while the select filters membership.', selector: '[data-ug-part="sort-actions"]' },
      ],
      contextDocument: { summary: 'A column filter select inside the table column menu.', how: 'The surrounding menu keeps free-form text search and sort actions beside the Search by option field. This HCS and HS variant opens the option list below its trigger.' },
    },
    { id: "pfd-column-filter", showContext: true, name: "Above-trigger filter", apps: ["pfd"], note: "The list opens above the trigger.", source: {"pfd":"src/pfd/ColumnMenu.tsx"},
      componentDocument: { summary: 'A table column filter whose option list opens above the trigger.', how: 'PFD uses the same labeled filter field and choices as HCS and HS, but positions the popup above the trigger to fit the column menu.' },
      componentAnatomy: [
        { id: 'popup', description: 'The trigger-width popup opens 4px above the trigger, aligned to its start.' },
      ],
      contextAnatomy: [
        { id: 'column-menu', name: 'Column menu', scope: 'context', selector: '[data-ug-part="column-menu"]', description: 'The column popover contains the text search, sort actions and fixed-value filter.' },
        { id: 'column-search', name: 'Text search', scope: 'context', selector: '[data-ug-part="column-search"]', description: 'The text field narrows the selected table column.' },
        { id: 'sort-actions', name: 'Sort actions', scope: 'context', selector: '[data-ug-part="sort-actions"]', description: 'Ascending and descending actions sit above the option filter.' },
      ],
      contextLayers: [
        { id: 'context-column-menu', partId: 'column-menu', scope: 'context', title: 'Column menu', explanation: 'The popover gathers tools for filtering and ordering one column.', keyIdea: 'The shared menu frame keeps column operations within reach.', selector: '[data-ug-part="column-menu"]' },
        { id: 'context-column-search', partId: 'column-search', scope: 'context', title: 'Text search', explanation: 'The input searches for arbitrary text within the column.', keyIdea: 'A text query complements the select’s short known-value list.', selector: '[data-ug-part="column-search"]' },
        { id: 'context-sort-actions', partId: 'sort-actions', scope: 'context', title: 'Sort actions', explanation: 'Ascending and descending controls order rows independently of filtering.', keyIdea: 'Sort buttons change order while the select limits matching rows.', selector: '[data-ug-part="sort-actions"]' },
      ],
      contextDocument: { summary: 'A PFD column filter select inside the table column menu.', how: 'Search by text and sort actions share the menu with the fixed-value filter. PFD opens its popup above the trigger to keep the choices inside that column menu.' },
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
  how: 'Column filter (HCS, HS): a Field at scale "sm" (gap 4, minWidth 0) with the label "Search by option" and a Field.Select whose trigger is color "surface", paint "fixed", shape "soft" and width fill, the same trigger as the field select; the Field.SelectPositioner is side "bottom", align "start", sideOffset 4 with alignItemWithTrigger off, so the list sits under the trigger, and the rows are bare Field.SelectItems (Select all first) with no indicator. Column filter (PFD): the same field with side "top", so the list opens above the trigger (measured 36px below the trigger against 92px above). In context shows the filter alongside the menu text search and sort actions; the enabled field stands in for HCS (fewer than two values) and HS (no values) when their real control is disabled.',
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
