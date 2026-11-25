import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Try again button',

  apps: ['hcs'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The Try again Button under the Results error message: small scale only, taking the default surface-alt color and solid paint.","keyIdea":"The small retry action offers another calculation attempt beneath the error.","selector":"[class~=\"aui-button\"]"},
      ],
options: [
    { id: "results", name: "Results error strip", apps: ["hcs"], contextAnatomy: [
      { id: "error-strip", name: "Error strip", description: "The solid error alert of the Output pane that holds the message and the Try again button on the next line." },
      { id: "error-message", name: "Error message", description: "The text \"We couldn't check products right now. Please try again.\"" },
    ], source: {"hcs":"src/components/F01Results.tsx"} ,
      contextLayers: [
        {"id":"context-error-strip","partId":"error-strip","title":"Error strip","explanation":"The solid error alert of the Output pane that holds the message and the Try again button on the next line.","keyIdea":"The error strip keeps the failure message and its recovery action together.","selector":"[data-ug-part=\"error-strip\"]","scope":"context"},
        {"id":"context-error-message","partId":"error-message","title":"Error message","explanation":"The text \"We couldn't check products right now. Please try again.\"","keyIdea":"The text \"We couldn't check products right now.","selector":"[data-ug-part=\"error-message\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Results.tsx' },
  summary: 'The default gray Button retries a failed action from an error message: Try again under the Results error.',
  where: 'The Results error strip, under the message (the HCS Output error state). Real site source: HCS F01Results.tsx; no other app has a Retry Button in its source (checked in ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS and ADC).',
  when: 'Use it for a plain recovery action that needs no emphasis; the error View around it carries the colour.',
  how: 'The example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults. '
    + 'In context the scene is the HCS Output error state: a solid error View with the message, then the button; the View sets no flex props, so the button sits under the message. One group, HCS only.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Try again Button under the Results error message: small scale only, taking the default surface-alt color and solid paint.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Try again\" that retries the failed results request.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
