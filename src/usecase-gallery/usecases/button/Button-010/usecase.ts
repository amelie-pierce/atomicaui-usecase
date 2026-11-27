import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Show locked field option button',

  apps: ['agpd'],
options: [
    { id: "agpd-lock-hint", name: "Lock hint", apps: ["agpd"], contextAnatomy: [
      { id: "lock-trigger", name: "Lock trigger", description: "The square lock button after the field label (aria-label \"Thickness is locked\") that opens the hint on hover or focus." , lesson: {"explanation":"Square lock button reveals the Plate Option hint above it.","selector":"[data-ug-part=\"lock-trigger\"]","scope":"context"}},
      { id: "hint-text", name: "Hint text", description: "The line \"Controlled by Plate Option\" and its current value \"All Plates based on the stock model\"." , lesson: {"explanation":"Hint shows Plate Option ownership and the current All Plates value.","selector":"[data-ug-part=\"hint-text\"]","scope":"context"}},
    ], source: {"agpd":"src/agpd/inputs.tsx"} ,
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
     lesson: {"explanation":"Extra-small primary text link opens the Plate Option control."}},
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
     lesson: {"explanation":"288px lock popup shows the current Plate Option above its button."}},
  ],
});
