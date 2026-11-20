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
});
