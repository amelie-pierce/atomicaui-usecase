import { defineUsecase } from '../../../define';

const RESULTS_CONTEXT = [
  { id: 'results-table', name: 'Results table', selector: '[class~="aui-table"]', description: 'The Table of connector results, cut to the Model column; its header cell is raised.' },
  { id: 'failed-expander', name: 'Failed-model expander', selector: '[aria-label="Why Not for Model C-300"]', description: 'The second row\'s expander in the error color for Model C-300, which failed its check.' },
];

const GROUP_CONTEXT = [
  { id: 'results-table', name: 'Results table', selector: '[class~="aui-table"]', description: 'The Table of connector results, cut to the Model column; its header cell is raised.' },
  { id: 'group-label', name: 'Group label', selector: '[data-ug-part="group-label"]', description: 'The semi-bold model name with its member count (A-100 (2)) next to the expander in the group row.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Expand row button',

  apps: ['hcs', 'hs', 'fd', 'adc'],
    layers: [
        {"id":"button","partId":"button","title":"Expand button","explanation":"24px square text control opens Why Not for one model row.","keyIdea":"The row button reveals the explanation attached to a model result.","selector":"[class~=\"aui-button\"][aria-label^=\"Why Not\"]","code":["View"]},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"The solid angle-right glyph that points to the collapsed content.","keyIdea":"The chevron signals that the row can open to show more detail.","selector":"[class~=\"aui-button\"][aria-label^=\"Why Not\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])","code":["View"],"unchanged":true},
        {"id":"expand-trigger","partId":"expand-trigger","title":"Table expand trigger","explanation":"HCS and HS expand group rows before the semi-bold model name.","keyIdea":"The table-owned trigger expands grouped results where no Button is used.","selector":"[class~=\"aui-table-expand-trigger\"]","code":["Button"]},
        {"id":"row","partId":"row","title":"Row","explanation":"Model row or A-100 group row opens with its expander.","keyIdea":"The expandable row represents either one model or a grouped result.","selector":"[class~=\"aui-table-row\"]","code":["Button"],"unchanged":true},
        {"id":"cell","partId":"cell","title":"Model cell","explanation":"Model cell pairs the expander chevron with its name.","keyIdea":"The model cell pairs the result label with its expansion affordance.","selector":"[class~=\"aui-table-cell\"]","code":["Button"],"unchanged":true},
      ],
options: [
    { id: "hcs-results", contextAnatomy: RESULTS_CONTEXT, name: "Results table", apps: ["hcs","fd"], source: {"hcs":"src/components/F01Results.tsx","fd":"src/components/Results.jsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Connector table is cropped to its raised Model column.","keyIdea":"The results table frames the model column and its expandable rows.","selector":"[class~=\"aui-table\"]","scope":"context"},
        {"id":"context-failed-expander","partId":"failed-expander","title":"Failed-model expander","explanation":"Error-coloured expander marks the failed Model C-300 row.","keyIdea":"The failed-model trigger uses error color to identify the row needing attention.","selector":"[aria-label=\"Why Not for Model C-300\"]","scope":"context","code":["View"]},
      ],
    },
    { id: "hcs-group", contextAnatomy: GROUP_CONTEXT, name: "Group model row", apps: ["hcs","adc"], source: {"hcs":"src/components/F01Results.tsx","adc":"src/adc/components/ProductsPicker.tsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Connector table is cropped to its raised Model column.","keyIdea":"The HCS table keeps the grouped result label beside its expander.","selector":"[class~=\"aui-table\"]","scope":"context"},
        {"id":"context-group-label","partId":"group-label","title":"Group label","explanation":"Semi-bold A-100 label shows its two-member count beside the expander.","keyIdea":"The member count clarifies how many models the group contains.","selector":"[data-ug-part=\"group-label\"]","scope":"context"},
      ],
    },
    { id: "hs-group", contextAnatomy: GROUP_CONTEXT, name: "Counted model row", apps: ["hs"], source: {"hs":"src/hs/ResultsTable.tsx"} ,
      contextLayers: [
        {"id":"context-results-table","partId":"results-table","title":"Results table","explanation":"Connector table is cropped to its raised Model column.","keyIdea":"The grouped row sits in the results table above its expanded members.","selector":"[class~=\"aui-table\"]","scope":"context"},
        {"id":"context-group-label","partId":"group-label","title":"Group label","explanation":"Semi-bold A-100 label shows its two-member count beside the expander.","keyIdea":"The A-100 label and count describe the rows available inside the group.","selector":"[data-ug-part=\"group-label\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Results.tsx', hs: 'src/hs/ResultsTable.tsx', fd: 'src/components/Results.jsx', adc: 'src/adc/components/ProductsPicker.tsx' },
  summary: 'A compact chevron Button expands a table row; HCS draws it as a Button (error color on failed rows), the other apps use the table\'s own expand trigger.',
  where: 'The first cell of a table row, before the name. '
    + 'Real site source: HCS (the Model cell of ProductRow in src/components/F01Results.tsx; the turn is src/components/F01Results.css) and its group rows (same file); FD Results.jsx (modelCell, Table.ExpandTrigger); HS ResultsTable.tsx (group rows, Table.ExpandTrigger); ADC ProductsPicker.tsx (parent rows of the anchor tree, Table.ExpandTrigger). '
    + 'ACE, ADM, PFD, PBS, AGPD and RWS have no expandable rows.',
  when: 'Use it for a per-row disclosure. In HCS switch color to "error" for rows that failed so the reason stands out (shown in the second row of the scene). '
    + 'Always give it an aria-label (the table trigger takes it from the row\'s expansionLabel); only HCS sets aria-expanded itself.',
  how: 'The example is the HCS Button: aui scale "sm", profile "square-compact", paint "text" and color "surface" (or "error"), with sx minWidth and minHeight "24" for a safe hit area. '
    + 'The glyph is angle-right (weight "solid"), shown in the closed state; the app turns only the icon 90 degrees through CSS when aria-expanded is true (the scene\'s `.ug-results` rule does the same), and the button itself never rotates. '
    + 'The apps are grouped by what the UI looks like, never by the content or data each app shows: every scene uses mock data, so apps with the same UI but different content (HCS and ADC) are one group. '
    + 'The preview groups the apps by distinct UI and the Document lists the same groups. '
    + 'Results table (the Why Not expander of a result row): HCS and FD (the Button above, first element of the Model cell, before the name; the scene is the Model column and two rows, because the button shows in two colors). '
    + 'FD draws the same chevron with the library\'s Table.ExpandTrigger and has no error color, so the HCS format is the standard. '
    + 'Group row (rows that group members under a model or a parent): HCS and ADC (Table.ExpandTrigger, then the group name in semi-bold; ADC sets the trigger to scale "xs" and gap 6 where HCS keeps the table density and gap 4, a size difference only); HS (the same row painted surface-alt solid, so the group reads as a band). '
    + 'Left out of every scene: selection, the thumbnail, the other columns, sorting, the frozen column, the Why Not panel and the member rows.',
  anatomy: [
    { id: 'button', name: 'Expand button', selector: '[class~="aui-button"][aria-label^="Why Not"]', description: 'The 24px minimum square-compact text Button with aria-expanded false that opens the Why Not explanation of one model row; HCS tints it with the error color on failed rows like Model C-300.' },
    { id: 'chevron', name: 'Chevron', selector: '[class~="aui-button"][aria-label^="Why Not"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The solid angle-right glyph that points to the collapsed content.' },
    { id: 'expand-trigger', name: 'Table expand trigger', selector: '[class~="aui-table-expand-trigger"]', description: 'HCS and HS group rows (A-100 (2)) use the table own expand trigger instead of a Button, placed before the semi-bold group name.' },
    { id: 'row', name: 'Row', selector: '[class~="aui-table-row"]', description: 'The result row that the chevron opens: a model such as Model A-100, or the A-100 (2) group row with an Expand A-100 group label.' },
    { id: 'cell', name: 'Model cell', selector: '[class~="aui-table-cell"]', description: 'The Model cell that holds the chevron and the model name side by side with a gap of 12 (4 in group rows).' },
  ],
});
