import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Add to Job List button',

  apps: ['hs'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The Add to Job List Button: a solid secondary (black) small Button, text only, first in the HS Output toolbar row.","keyIdea":"The Add to Job List Button: a solid secondary (black) small Button, text only, first in the HS Output toolbar row.","selector":"[class~=\"aui-button\"]"},
      ],
options: [
    { id: "hs-button", name: "Add selected result", apps: ["hs"], contextAnatomy: [
      { id: "toolbar", name: "Output toolbar", description: "The wrapping row of small controls (8px gap) that starts with Add to Job List." },
      { id: "search", name: "Search field", description: "The Search Table Field with a magnifying-glass icon that fills the rest of the line." },
    ], source: {"hs":"src/hs/OutputPane.tsx"} ,
      contextLayers: [
        {"id":"context-toolbar","partId":"toolbar","title":"Output toolbar","explanation":"The wrapping row of small controls (8px gap) that starts with Add to Job List.","keyIdea":"The wrapping row of small controls (8px gap) that starts with Add to Job List.","selector":"[data-ug-part=\"toolbar\"]","scope":"context"},
        {"id":"context-search","partId":"search","title":"Search field","explanation":"The Search Table Field with a magnifying-glass icon that fills the rest of the line.","keyIdea":"The Search Table Field with a magnifying-glass icon that fills the rest of the line.","selector":"[data-ug-part=\"search\"]","scope":"context"},
      ],
    },
  ],
  source: { hs: 'src/hs/OutputPane.tsx' },
  summary: 'A solid secondary Button, black with white text, adds the chosen result to the job list.',
  where: 'The first item of the HS Output toolbar row, before the search field (ResultsTable `actions` slot from OutputPane.tsx). Real site source: HS src/hs/OutputPane.tsx. No other app has this Button.',
  when: 'Use the labelled Button when one result is chosen elsewhere and must be added to a list; HS disables it until a result is selected or while a job is being edited.',
  how: 'aui color "secondary", paint "solid", scale "sm", text only. In context the button is the first item of a wrapping toolbar row (gap 8). The count, Reset filters, Download CSV and the table are left out. '
    + 'One group, HS only.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Add to Job List Button: a solid secondary (black) small Button, text only, first in the HS Output toolbar row.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Add to Job List\" that adds the chosen result to the job list.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
