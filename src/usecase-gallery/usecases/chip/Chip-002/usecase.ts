import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "beta-banner", name: "Beta notice banner", description: "The warning solid region labelled \"Beta release notice\" that starts with the BETA Chip, then a triangle-exclamation icon and the message." },
  { id: "beta-message", name: "Banner message", description: "The l3 text \"Beta Release: We are actively refining this application.\" with the lead-in in bold." },
];

export default defineUsecase({
  uiType: 'Label chip',
  title: 'Compact soft label',
  apps: ['adc'],
    layers: [
        {"id":"chip","partId":"chip","title":"Chip","explanation":"The secondary solid chip at scale \"xs\" with soft corners that marks the whole app state, shown in the ADC beta notice and beside the menu.","keyIdea":"The app-wide chip gives the beta state a compact label that can travel with the notice.","selector":"[class~=\"aui-chip\"]"},
      ],
options: [
    { id: "adc-beta", contextAnatomy: CONTEXT_ANATOMY, name: "Beta notice", source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [
        {"id":"context-beta-banner","partId":"beta-banner","title":"Beta notice banner","explanation":"The warning solid region labelled \"Beta release notice\" that starts with the BETA Chip, then a triangle-exclamation icon and the message.","keyIdea":"A warning banner keeps the beta status and its supporting message together as one announcement.","selector":"[data-ug-part=\"beta-banner\"]","scope":"context"},
        {"id":"context-beta-message","partId":"beta-message","title":"Banner message","explanation":"The l3 text \"Beta Release: We are actively refining this application.\" with the lead-in in bold.","keyIdea":"The message explains what the beta label means for people using the application.","selector":"[data-ug-part=\"beta-message\"]","scope":"context"},
      ],
    },
  ],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A compact label with soft corners that marks a state of the whole app: BETA in the notice banner, the version beside the menu.',
  where: 'The beta notice and the version label of the ADC Workspace (src/adc/Workspace.tsx).',
  when: 'Use it for a label on a dense bar or banner. Use the solid release label (Chip-001) in lists of notes.',
  how: '`Chip` at `scale: "xs"` and `shape: "soft"`, `paint: "solid"`; the colour is `secondary` on the warning banner (BETA) and `surface-alt` beside the menu (the version). One `Chip.Label`. The scene shows the banner and leaves out its action link.',
  anatomy: [
    {
      id: "chip",
      name: "Chip",
      selector: "[class~=\"aui-chip\"]",
      description: "The secondary solid chip at scale \"xs\" with soft corners that marks the whole app state, shown in the ADC beta notice and beside the menu.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-chip-label\"]",
      text: true,
      description: "The word BETA that states the status.",
    },
  ],
});
