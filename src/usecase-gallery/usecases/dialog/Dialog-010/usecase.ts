import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Welcome dialog',
  look: 'Close and Start Walkthrough',
  apps: ['adm', 'fd'],
  cases: [
    { id: 'adm-welcome', name: 'Welcome dialog', apps: ['adm', 'fd'], source: { adm: 'src/features/top-navigation/components/Tutorials.tsx', fd: 'src/components/HelpCenter.jsx' } },
  ],
  source: { adm: 'src/features/top-navigation/components/Tutorials.tsx', fd: 'src/components/HelpCenter.jsx' },
  summary: 'A welcome dialog that offers the guided tour: a gray Close and a solid Start Walkthrough.',
  where: 'The first-run welcome dialog of ADM and FD. Real site source: ADM Tutorials.tsx and FD HelpCenter.jsx. HCS no longer has this dialog; the other apps open the tour from their Help and Tutorials list (Button-011).',
  when: 'Use it to offer the tour once; the app closes the dialog itself and starts the tour, so both buttons set dismiss={false}.',
  how: 'A 384px dialog with a Title and close X and a footer of a gray Close and a solid secondary Start Walkthrough, both Dialog.Buttons with dismiss={false}. '
    + 'Measured in the browser, this footer renders as the Reset confirm footer of HS and FD at the same 384px: the same fills, radius, 16px regular text, 28px height, 6px gap and right alignment, with no Spacer between the buttons. '
    + 'One group, ADM and FD. The scene keeps one line of text; the real ADM dialog adds an image and a Key Features list and FD\'s a description and four features.',
});
