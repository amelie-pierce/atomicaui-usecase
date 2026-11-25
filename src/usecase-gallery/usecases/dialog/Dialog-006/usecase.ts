import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Centered-title dialog',
  apps: ['fd'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the Help Center window.","keyIdea":"The scrim behind the Help Center window.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The small 360px Help Center window at scale \"sm\" with a soft shape (FD caps its own copy at 420px and pins it to the screen corner).","keyIdea":"The small 360px Help Center window at scale \"sm\" with a soft shape (FD caps its own copy at 420px and pins it to the screen corner).","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The raised title bar whose \"Help Center\" text is centred between 40px start and end padding, with no Spacer.","keyIdea":"The raised title bar whose \"Help Center\" text is centred between 40px start and end padding, with no Spacer.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"title-text","partId":"title-text","title":"Title text","explanation":"The centred words \"Help Center\" inside the title bar.","keyIdea":"The centred words \"Help Center\" inside the title bar.","selector":"[data-ug-part=\"title-text\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X taken out of the flow and pinned to the inline end with position absolute and an 8px offset.","keyIdea":"The close X taken out of the flow and pinned to the inline end with position absolute and an 8px offset.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The body that holds the navigation column of help rows.","keyIdea":"The body that holds the navigation column of help rows.","selector":"[class~=\"aui-dialog-body\"]"},
        {"id":"help-rows","partId":"help-rows","title":"Help rows","explanation":"The nav View labelled \"Help Center\": a no-padding column with gap 8 whose rows are Feedback and Tutorials in the FD scene.","keyIdea":"The nav View labelled \"Help Center\": a no-padding column with gap 8 whose rows are Feedback and Tutorials in the FD scene.","selector":"[data-ug-part=\"help-rows\"]"},
      ],
options: [
    { id: "fd-help-center", name: "Help Center", showContext: false, source: {"fd":"src/components/HelpCenter.jsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { fd: 'src/components/HelpCenter.jsx' },
  summary: 'A small raised-title dialog whose title is centred between side paddings, with the close X pinned to the end and a column of rows in the body.',
  where: 'The Help Center panel of FD (src/components/HelpCenter.jsx): a popup pinned to the bottom end of the screen, listing help rows and the tutorials. The other apps open the Help Center as a menu (Menubar-003).',
  when: 'Use it for a small floating panel that lists a few navigation rows and stays beside the work, where a centred name suits the panel. A dialog that left-aligns its name is Dialog-001.',
  how: 'The same parts as Dialog-001 (Dialog.Popup at scale "sm", shape "soft", a raised Dialog.Title, Dialog.Close, Dialog.Body) with two differences measured in the gallery against the About dialog: the Title has justifyContent "center" and 40px start and end padding (the Title text is centred, the About one starts at 8px) and there is no Dialog.Spacer, so the close X is taken out of the flow and pinned with position absolute and an 8px inline-end offset (FD does it with its own CSS class; the scene writes the same two declarations inline). Title height (28px), fill and font match Dialog-001. FD also fixes the popup to the screen corner with its own viewport class and caps it at 420px; the scene is a plain 360px popup. The body is one navigation View of rows (no padding, gap 8); the row icons and the tutorials list are left out.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Help Center window.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The small 360px Help Center window at scale "sm" with a soft shape (FD caps its own copy at 420px and pins it to the screen corner).',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar whose "Help Center" text is centred between 40px start and end padding, with no Spacer.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      description: 'The centred words "Help Center" inside the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X taken out of the flow and pinned to the inline end with position absolute and an 8px offset.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds the navigation column of help rows.',
    },
    {
      id: 'help-rows',
      name: 'Help rows',
      description: 'The nav View labelled "Help Center": a no-padding column with gap 8 whose rows are Feedback and Tutorials in the FD scene.',
    },
  ],
});
