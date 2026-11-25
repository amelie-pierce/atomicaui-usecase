import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'trigger', name: 'Trigger', selector: '[class~="aui-dialog-trigger"]', description: 'The secondary solid soft "Thickness Calculator" button on the ADM base plate inputs that opens the dialog; it is written inside the same Dialog root.' },
];

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Calculator dialog',
  apps: ['adm'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the Thickness Calculator while it is open over the ADM base plate page.","keyIdea":"The scrim behind the Thickness Calculator while it is open over the ADM base plate page.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The default 480px calculator window (520px in the ADM scene) that keeps focus off the first control until the user acts.","keyIdea":"The default 480px calculator window (520px in the ADM scene) that keeps focus off the first control until the user acts.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The raised title bar reading \"Thickness Calculator\" with the close X at its end.","keyIdea":"The raised title bar reading \"Thickness Calculator\" with the close X at its end.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"spacer","partId":"spacer","title":"Spacer","explanation":"The flexible gap between the calculator name and the close X.","keyIdea":"The flexible gap between the calculator name and the close X.","selector":"[class~=\"aui-dialog-spacer\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X that returns the user to the base plate inputs without applying the calculation.","keyIdea":"The close X that returns the user to the base plate inputs without applying the calculation.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The scrolling body that holds the calculator inputs and result; the example shows a one-line placeholder.","keyIdea":"The scrolling body that holds the calculator inputs and result; the example shows a one-line placeholder.","selector":"[class~=\"aui-dialog-body\"]"},
      ],
options: [
    { id: "adm-calculator", name: "Calculator dialog", apps: ["adm"], source: {"adm":"src/features/base-plate/components/ThicknessCalculatorDialog.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-trigger","partId":"trigger","title":"Trigger","explanation":"The secondary solid soft \"Thickness Calculator\" button on the ADM base plate inputs that opens the dialog; it is written inside the same Dialog root.","keyIdea":"The secondary solid soft \"Thickness Calculator\" button on the ADM base plate inputs that opens the dialog; it is written inside the same Dialog root.","selector":"[class~=\"aui-dialog-trigger\"]","scope":"context"},
      ],
    },
  ],
  source: {
    adm: 'src/features/base-plate/components/ThicknessCalculatorDialog.tsx',
  },
  summary: 'A dialog with a raised title bar and a close X over a small calculator: the Thickness Calculator of ADM, opened from the base plate inputs.',
  where: 'ADM: the Thickness Calculator opened by a Dialog.Trigger in the base plate feature (src/features/base-plate/components/ThicknessCalculatorDialog.tsx). No other app has a calculator dialog.',
  when: 'Use it for a small side calculation that feeds a value back into the form and should not leave the page. Do not use it for a confirm (AlertDialog-003) or a form that is the main work of the page.',
  how: 'The dialog is opened by a Dialog.Trigger written inside the Dialog root instead of a controlled open (a secondary solid soft button at scale "sm"); the popup, raised Title with the close X (Button-031) and Body measure the same as the template picker. The popup is the default 480px. The example is the Dialog frame you copy (Popup, raised Title with the close X, Body); the calculator fields are supporting parts shown in In context.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Thickness Calculator while it is open over the ADM base plate page.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default 480px calculator window (520px in the ADM scene) that keeps focus off the first control until the user acts.',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Thickness Calculator" with the close X at its end.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The words "Thickness Calculator" at the start of the title bar.',
    },
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The flexible gap between the calculator name and the close X.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that returns the user to the base plate inputs without applying the calculation.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body that holds the calculator inputs and result; the example shows a one-line placeholder.',
    },
    {
      id: 'calculator-text',
      name: 'Calculator text',
      text: true,
      description: 'The p3 placeholder line that stands for the calculator inputs and result (the ADM scene reads "The calculator result goes here.").',
    },
  ],
});
