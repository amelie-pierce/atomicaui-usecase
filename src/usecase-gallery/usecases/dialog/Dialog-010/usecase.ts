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
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the ADM welcome prompt.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The small 384px welcome window at scale "sm", sized through the --aui-dialog-width variable the app sets.',
      code: `<Dialog.Popup initialFocus={false} aui={{ scale: 'sm' }} style={{ '--aui-dialog-width': 'var(--p-px-384)' } as CSSProperties}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The plain (not raised) title bar reading "Welcome to ADM" with the close X at its end.',
      code: `<Dialog.Title aui={{ scale: 'sm' }}>
  Welcome to ADM
  <Dialog.Spacer />
  <Dialog.Close aui={{ scale: 'sm' }} aria-label="Close" />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The greeting "Welcome to ADM" in the title bar.',
      code: `<Dialog.Title aui={{ scale: 'sm' }}>
  Welcome to ADM`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that dismisses the welcome prompt without starting the tour.',
      code: `<Dialog.Close aui={{ scale: 'sm' }} aria-label="Close" />`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds one welcome sentence.',
      code: `<Dialog.Body aui={{ scale: 'sm' }}>`,
    },
    {
      id: 'welcome-text',
      name: 'Welcome text',
      token: 'Type',
      text: true,
      description: 'The p2 sentence "Welcome to the Anchor Designer." that introduces the tour.',
      code: `<Type data-ug-part="welcome-text" as="p" role="p2">Welcome to the Anchor Designer.</Type>`,
    },
    {
      id: 'actions',
      name: 'Footer',
      token: 'Dialog.Actions',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that offers Close and Start Walkthrough.',
      code: `<Dialog.Actions aui={{ scale: 'sm' }}>`,
    },
    {
      id: 'dismiss-button',
      name: 'Close button',
      token: 'Dialog.Button',
      description: 'The default gray Dialog.Button labelled Close; dismiss={false} leaves closing to the app.',
      code: `<Dialog.Button data-ug-part="dismiss-button" dismiss={false}>Close</Dialog.Button>`,
    },
    {
      id: 'start',
      name: 'Start Walkthrough',
      token: 'Dialog.Button',
      description: 'The solid secondary button that starts the guided tour.',
      code: `<Dialog.Button data-ug-part="start" dismiss={false} aui={{ color: 'secondary', paint: 'solid' }}>Start Walkthrough</Dialog.Button>`,
    },
  ],
});
