import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Acknowledge notice button',

  apps: ['adc'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The OK Button of an ADC notice dialog: solid primary (orange), small, the only action in the footer.","keyIdea":"The OK Button of an ADC notice dialog: solid primary (orange), small, the only action in the footer.","selector":"[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])"},
      ],
options: [
    { id: "adc-ok", name: "Info OK", apps: ["adc"], contextAnatomy: [
      { id: "dialog", name: "Dialog", description: "The open alert dialog." },
      { id: "dialog-title", name: "Dialog title", description: "The raised title bar \"Maximum Number of Designs Reached\"." },
      { id: "error-icon", name: "Error icon", description: "The error-colored circle-xmark icon before the title." },
      { id: "dialog-close", name: "Close button", description: "The X at the end of the title, shown in a \"Close\" tooltip." },
      { id: "message", name: "Message", description: "The text that a Project can contain at most 15 Designs." },
    ], source: {"adc":"src/adc/components/DesignCapacityDialog.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Dialog","explanation":"The open alert dialog.","keyIdea":"The open alert dialog.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"The raised title bar \"Maximum Number of Designs Reached\".","keyIdea":"The raised title bar \"Maximum Number of Designs Reached\".","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-error-icon","partId":"error-icon","title":"Error icon","explanation":"The error-colored circle-xmark icon before the title.","keyIdea":"The error-colored circle-xmark icon before the title.","selector":"[data-ug-part=\"error-icon\"]","scope":"context"},
        {"id":"context-dialog-close","partId":"dialog-close","title":"Close button","explanation":"The X at the end of the title, shown in a \"Close\" tooltip.","keyIdea":"The X at the end of the title, shown in a \"Close\" tooltip.","selector":"[data-ug-part=\"dialog-close\"]","scope":"context"},
        {"id":"context-message","partId":"message","title":"Message","explanation":"The text that a Project can contain at most 15 Designs.","keyIdea":"The text that a Project can contain at most 15 Designs.","selector":"[data-ug-part=\"message\"]","scope":"context"},
      ],
    },
  ],
  source: { adc: 'src/adc/components/DesignCapacityDialog.tsx' },
  summary: 'A solid primary Button, orange with white text, is the lone OK that acknowledges a notice.',
  where: 'The footer of a dialog that only informs. Real site source: ADC src/adc/components/DesignCapacityDialog.tsx (OK of the Maximum Number of Designs Reached notice); the About dialog ends the same way with Close. '
    + 'The other apps use the gray or black single button of Button-007.',
  when: 'Use it where the app colors its one dialog action with the accent. For a plain dismiss use the neutral Button-007, and keep the close X in the Title as the other way out.',
  how: 'Set aui color "primary", paint "solid" and scale "sm" (the Dialog.Button default scale). '
    + 'In context it is the one Dialog.Button of an AlertDialog drawn as a non-modal Dialog, as in AlertDialog-003, with a circle-xmark error icon in the raised Title, the close X inside a "Close" tooltip (top, 8px offset, solid secondary sm) and one paragraph; the real body holds more.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The OK Button of an ADC notice dialog: solid primary (orange), small, the only action in the footer.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"OK\" that acknowledges the Maximum Number of Designs Reached notice.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
      text: true,
    },
  ],
});
