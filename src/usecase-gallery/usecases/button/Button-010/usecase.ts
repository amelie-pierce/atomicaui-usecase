import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Show locked field option button',

  apps: ['agpd'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"Extra-small primary text link opens the Plate Option control.","keyIdea":"The unfilled accent action offers the plate-setting route from the lock explanation.","selector":"[class~=\"aui-button\"]:not([aria-label=\"Thickness is locked\"])"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"288px lock popup shows the current Plate Option above its button.","keyIdea":"The popup explains which plate option currently controls the locked value.","selector":"[data-aui-popup-motion][role=\"dialog\"]"},
      ],
options: [
    { id: "agpd-lock-hint", name: "Lock hint", apps: ["agpd"], contextAnatomy: [
      { id: "lock-trigger", name: "Lock trigger", description: "The square lock button after the field label (aria-label \"Thickness is locked\") that opens the hint on hover or focus." },
      { id: "hint-text", name: "Hint text", description: "The line \"Controlled by Plate Option\" and its current value \"All Plates based on the stock model\"." },
    ], source: {"agpd":"src/agpd/inputs.tsx"} ,
      contextLayers: [
        {"id":"context-lock-trigger","partId":"lock-trigger","title":"Lock trigger","explanation":"Square lock button follows the label and reveals a hint.","keyIdea":"The lock trigger reveals why this field cannot be edited directly.","selector":"[data-ug-part=\"lock-trigger\"]","scope":"context"},
        {"id":"context-hint-text","partId":"hint-text","title":"Hint text","explanation":"Hint shows Plate Option ownership and the current All Plates value.","keyIdea":"The hint pairs the controlling option with its current selected value.","selector":"[data-ug-part=\"hint-text\"]","scope":"context"},
      ],
    },
  ],
  source: { agpd: 'src/agpd/inputs.tsx' },
  summary: 'A small primary text Button in a lock popover reveals the option that controls a locked field.',
  where: 'The popover of the lock icon after a field label in the AGPD input pane (LockHint). It exists only in AGPD; the lock trigger is a square label-row Button like Button-032 and the popover has no close X.',
  when: 'Use it when a field is locked by another setting and the user needs a way to reach that setting: the text names the controlling option and this Button jumps to it.',
  how: 'Set aui paint "text", color "primary" and scale "xs"; it is the only action in the popup, at the start under the explanatory line. '
    + 'In context the lock trigger (profile "square", secondary text) opens a 288px View column (surface, solid, soft, elevation 4, gap 8) above it, shown open: the line "Controlled by Plate Option, currently ...", then this Button. '
    + 'The hover and focus open, the 250 ms hide delay and the rest of the field are left out.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Show Plate Option Button at the start of the lock popup: extra small, primary text paint, with no fill so it reads as an accent link under the explanatory line.",
      selector: "[class~=\"aui-button\"]:not([aria-label=\"Thickness is locked\"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Show Plate Option\" that reveals the option controlling the locked field.",
      selector: "[class~=\"aui-button\"]:not([aria-label=\"Thickness is locked\"])",
      text: true,
    },
    {
      id: "popup",
      name: "Popup",
      description: "The 288px popup that opens from the lock icon, holding the line \"Controlled by Plate Option, currently ...\" above this Button.",
      selector: "[data-aui-popup-motion][role=\"dialog\"]",
    },
  ],
});
