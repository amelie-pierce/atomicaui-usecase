import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Spinner',
  title: 'Small pane spinner',
  apps: ['hcs', 'pfd'],
    layers: [
        {"id":"spinner","partId":"spinner","title":"Spinner","explanation":"Small default-colour spinner announces Updating Results while data recomputes.","keyIdea":"The status wrapper signals that recalculation is still in progress.","selector":"[class~=\"aui-spinner\"]"},
        {"id":"ring","partId":"ring","title":"Ring","explanation":"The animated ring that turns while HCS and PFD recompute the results.","keyIdea":"The rotating ring shows ongoing work without implying a determinate percentage.","selector":"[class~=\"aui-spinner-ring\"]","code":["Spinner"]},
      ],
options: [
    { id: "pfd-updating", name: "Updating results", source: {"hcs":"src/components/F01Results.tsx","pfd":"src/pfd/OutputPane.tsx"}, contextDocument: {
      summary: 'A small spinner and status caption within the Output pane while results update.',
      where: 'The HCS and PFD Output panes while design results are recomputed.',
      when: 'Show the progress state in the pane that is waiting for results.',
      how: 'Center the small Spinner in the pane and include the “Updating Results” caption used by PFD. HCS shows the same spinner without a caption.',
    }, contextAnatomy: [
      { id: "pane", name: "Output pane", selector: '[data-ug-part="pane"]', description: 'The pane that centers the progress indicator while results update.' },
      { id: "caption", name: "Caption", selector: '[data-ug-part="caption"]', text: true, description: 'The “Updating Results” status shown under the spinner in PFD.' },
    ] ,
      contextLayers: [
        {"id":"context-pane","partId":"pane","title":"Output pane","explanation":"The pane that centers the progress indicator while results update.","keyIdea":"The centered output pane keeps the waiting signal associated with the results being recomputed.","selector":"[data-ug-part=\"pane\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Results.tsx', pfd: 'src/pfd/OutputPane.tsx' },
  summary: 'A small default-colour spinner centred in a pane while its results load.',
  where: 'The Output pane while results are checked (HCS F01Results.tsx, PFD OutputPane.tsx).',
  when: 'Use it for a wait inside one pane. Use the large info spinner (Spinner-002) for a whole-window job with a message.',
  how: '`Spinner` at `scale: "sm"` with an `aria-label` naming what loads. It uses the small scale and default colour while results are recomputed.',
  anatomy: [
    {
      id: "spinner",
      name: "Spinner",
      selector: "[class~=\"aui-spinner\"]",
      description: "The small default-colour spinner at scale \"sm\", announced as \"Updating Results\" while results are recomputed.",
    },
    {
      id: "ring",
      name: "Ring",
      selector: "[class~=\"aui-spinner-ring\"]",
      description: "The animated ring that turns while HCS and PFD recompute the results.",
    },
  ],
});
