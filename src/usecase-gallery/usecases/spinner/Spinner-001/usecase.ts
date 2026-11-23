import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Spinner',
  title: 'Small pane spinner',
  apps: ['hcs', 'pfd'],
  cases: [{ id: 'pfd-updating', name: 'Updating results', source: { hcs: 'src/components/F01Results.tsx', pfd: 'src/pfd/OutputPane.tsx' } }],
  source: { hcs: 'src/components/F01Results.tsx', pfd: 'src/pfd/OutputPane.tsx' },
  summary: 'A small default-colour spinner centred in a pane while its results load.',
  where: 'The Output pane while results are checked (HCS F01Results.tsx, PFD OutputPane.tsx).',
  when: 'Use it for a wait inside one pane. Use the large info spinner (Spinner-002) for a whole-window job with a message.',
  how: '`Spinner` at `scale: "sm"` with an `aria-label` naming what loads. The pane is a column View centred both ways (gap 8, minimum height 128). PFD adds a caption under the Spinner; HCS shows the Spinner alone, with the same size and colour, so they are one group. The scene shows PFD\'s caption.',
  anatomy: [
    {
      id: "spinner",
      name: "Spinner",
      token: "Spinner",
      selector: "[class~=\"aui-spinner\"]",
      description: "The small default-colour spinner at scale \"sm\", announced as \"Updating Results\", centred above the caption in the Output pane.",
      code: [
        "<Spinner aui={{ scale: 'sm' }} aria-label=\"Updating Results\" />",
      ].join("\n"),
    },
    {
      id: "ring",
      name: "Ring",
      selector: "[class~=\"aui-spinner-ring\"]",
      description: "The animated ring that turns while HCS and PFD recompute the results.",
      code: [
        "<Spinner aui={{ scale: 'sm' }} aria-label=\"Updating Results\" />",
      ].join("\n"),
    },
  ],
});
