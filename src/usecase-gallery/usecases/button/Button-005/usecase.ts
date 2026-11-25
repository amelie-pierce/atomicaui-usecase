import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Try again button',

  apps: ['hcs'],
  options: [
    { id: "results", name: "Results error strip", apps: ["hcs"], source: {"hcs":"src/components/F01Results.tsx"} },
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
      token: "Button",
      description: "The Try again Button under the Results error message: small scale only, taking the default surface-alt color and solid paint.",
      selector: "[class~=\"aui-button\"]",
      code: "<Button aui={{ scale: 'sm' }}>Try again</Button>",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"Try again\" that retries the failed results request.",
      selector: "[class~=\"aui-button\"]",
      text: true,
      code: "Try again",
    },
  ],
});
