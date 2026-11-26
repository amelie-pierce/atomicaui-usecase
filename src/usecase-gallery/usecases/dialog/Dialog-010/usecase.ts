import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Welcome dialog',

  apps: ['adm', 'fd'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"Scrim dims the ADM workspace behind its welcome prompt.","keyIdea":"The scrim focuses the first-run welcome prompt.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Small 384px Welcome window uses the app-set dialog width.","keyIdea":"A compact popup keeps the welcome message brief and easy to dismiss.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"Plain title says Welcome to ADM with Close at its end.","keyIdea":"The plain title bar identifies the ADM welcome step.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X that dismisses the welcome prompt without starting the tour.","keyIdea":"The close icon dismisses the welcome without beginning the tour.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Body holds only the Welcome to ADM sentence.","keyIdea":"A short body sentence introduces the walkthrough choice.","selector":"[class~=\"aui-dialog-body\"]"},
        {"id":"actions","partId":"actions","title":"Footer","explanation":"The footer that offers Close and Start Walkthrough.","keyIdea":"The footer puts dismissal and tour entry side by side.","selector":"[class~=\"aui-dialog-actions\"]"},
        {"id":"dismiss-button","partId":"dismiss-button","title":"Close button","explanation":"The default gray Dialog.Button labelled Close; dismiss={false} leaves closing to the app.","keyIdea":"Close dismisses this prompt while leaving app state handling to ADM.","selector":"[data-ug-part=\"dismiss-button\"]"},
        {"id":"start","partId":"start","title":"Start Walkthrough","explanation":"The solid secondary button that starts the guided tour.","keyIdea":"Start Walkthrough begins the guided tour from the welcome prompt.","selector":"[data-ug-part=\"start\"]"},
      ],
options: [
    { id: "adm-welcome", name: "Welcome dialog", apps: ["adm","fd"], source: {"adm":"src/features/top-navigation/components/Tutorials.tsx","fd":"src/components/HelpCenter.jsx"}, showContext: false ,
      contextLayers: [

      ],
    },
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
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the ADM welcome prompt.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The small 384px welcome window at scale "sm", sized through the --aui-dialog-width variable the app sets.',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The plain (not raised) title bar reading "Welcome to ADM" with the close X at its end.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The greeting "Welcome to ADM" in the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that dismisses the welcome prompt without starting the tour.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds one welcome sentence.',
    },
    {
      id: 'welcome-text',
      name: 'Welcome text',
      text: true,
      description: 'The p2 sentence "Welcome to the Anchor Designer." that introduces the tour.',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that offers Close and Start Walkthrough.',
    },
    {
      id: 'dismiss-button',
      name: 'Close button',
      description: 'The default gray Dialog.Button labelled Close; dismiss={false} leaves closing to the app.',
    },
    {
      id: 'start',
      name: 'Start Walkthrough',
      description: 'The solid secondary button that starts the guided tour.',
    },
  ],
});
