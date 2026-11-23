import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Add to Job List button',
  look: 'Dark solid',
  apps: ['hs'],
  cases: [
    { id: 'hs-button', name: 'Add selected result', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
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
      token: "Button",
      description: "The Add to Job List Button: a solid secondary (black) small Button, text only, first in the HS Output toolbar row.",
      selector: "[class~=\"aui-button\"]",
      code: "<Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm' }}>\n  Add to Job List\n</Button>",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"Add to Job List\" that adds the chosen result to the job list.",
      selector: "[class~=\"aui-button\"]",
      text: true,
      code: "Add to Job List",
    },
  ],
});
