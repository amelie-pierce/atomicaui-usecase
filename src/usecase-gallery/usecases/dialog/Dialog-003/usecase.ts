import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Calculator dialog',
  apps: ['adm'],
  cases: [
    {
      id: 'adm-calculator',
      name: 'Calculator dialog',
      apps: ['adm'],
      source: { adm: 'src/features/base-plate/components/ThicknessCalculatorDialog.tsx' },
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
      id: 'trigger',
      name: 'Trigger',
      token: 'Dialog.Trigger',
      selector: '[class~="aui-dialog-trigger"]',
      description: 'The secondary solid soft "Thickness Calculator" button of the ADM scene that opens the dialog from the base plate inputs; the example frame shows the dialog already open without it.',
      code: `<Dialog.Trigger type="button" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
  Thickness Calculator
</Dialog.Trigger>`,
    },
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Thickness Calculator while it is open over the ADM base plate page.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default 480px calculator window (520px in the ADM scene) that keeps focus off the first control until the user acts.',
      code: `<Dialog.Popup initialFocus={false}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Thickness Calculator" with the close X at its end.',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  Thickness Calculator
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close" />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The words "Thickness Calculator" at the start of the title bar.',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  Thickness Calculator`,
    },
    {
      id: 'spacer',
      name: 'Spacer',
      token: 'Dialog.Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The flexible gap between the calculator name and the close X.',
      code: `<Dialog.Spacer />`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that returns the user to the base plate inputs without applying the calculation.',
      code: `<Dialog.Close aria-label="Close" />`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body that holds the calculator inputs and result; the example shows a one-line placeholder.',
      code: `<Dialog.Body>
  <Type data-ug-part="calculator-text" as="p" role="p3">
    The calculator inputs and result go here.
  </Type>
</Dialog.Body>`,
    },
    {
      id: 'calculator-text',
      name: 'Calculator text',
      token: 'Type',
      text: true,
      description: 'The p3 placeholder line that stands for the calculator inputs and result (the ADM scene reads "The calculator result goes here.").',
      code: `<Type data-ug-part="calculator-text" as="p" role="p3">
  The calculator inputs and result go here.
</Type>`,
    },
  ],
});
